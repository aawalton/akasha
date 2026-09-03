import { existsSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { listedAt, listedById, slugsOfType } from "@akasha/indexes"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { valueAt } from "@akasha/pages-system/page-value"
import { USER_ID } from "@akasha/supabase-auth/user-id"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const LATEST = "--latest"

const OUT = "--out"

const JSON_FLAG = "--json"

const SPACES = 2

const PAGE_TYPE = "temper-inventory-snapshot"

const DATA_PROPERTY = "data"

const HELD = "json"

const ACCOUNT_PAGE = "accountPage"

type Standing = { readonly path: string; readonly id: string }

export type Read =
  | {
      readonly named: string | null
      readonly latest: boolean
      readonly outPath: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let named: string | null = null
  let latest = false
  let outPath: string | null = null
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === LATEST) {
      latest = true
      continue
    }
    if (one === JSON_FLAG) {
      json = true
      continue
    }
    if (one === OUT) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${OUT}\` names the file written to, and no file followed it`)
        continue
      }
      outPath = value
      continue
    }
    if (one.startsWith("--")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${LATEST}\`, \`${OUT}\` and \`${JSON_FLAG}\``
      )
      continue
    }
    if (named !== null) {
      refusals.push(
        `\`${one}\` follows the snapshot already named, and one call reads one snapshot`
      )
      continue
    }
    named = one
  }
  if (named !== null && latest) {
    refusals.push(`a call names a snapshot or says \`${LATEST}\`, and this said both`)
  }
  if (named === null && !latest) {
    refusals.push(`name the snapshot read, or say \`${LATEST}\` for the newest one`)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, latest, outPath, json }
}

function standingNamed(root: string, said: string): Standing | null {
  const byId = listedById(root, said)
  if (byId !== null) return { path: byId.path, id: byId.id }
  const bySlug = listedAt(root, PAGE_TYPE, said)[0]
  return bySlug === undefined ? null : { path: bySlug.path, id: bySlug.id }
}

// A snugly ordered slug does the sorting: the page type holds that a slug opens
// with `at-` ahead of the moment the reading was taken, so the widest slug is
// the newest reading and no page body is read to find it.
function standingLatest(root: string): Standing | null {
  const slugs = [...slugsOfType(root, PAGE_TYPE)].sort().reverse()
  for (const slug of slugs) {
    const found = listedAt(root, PAGE_TYPE, slug)[0]
    if (found === undefined) continue
    const value = valueAt(found.path, root)
    if (value === null || value[ACCOUNT_PAGE] !== USER_ID) continue
    return { path: found.path, id: found.id }
  }
  return null
}

function dataFileFor(root: string, standing: Standing): string | null {
  const beside = besideAt(standing.path, DATA_PROPERTY, HELD)
  if (beside === null) return null
  const at = join(root, beside)
  return existsSync(at) ? at : null
}

export async function temperInventorySnapshot(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  const root = given === undefined ? process.cwd() : resolve(given.root)

  let standing: Standing | null
  try {
    standing = read.latest ? standingLatest(root) : standingNamed(root, read.named ?? "")
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (standing === null) {
    return refused(
      read.latest
        ? `the account ${USER_ID} carries no ${PAGE_TYPE} page, so there is none to read`
        : `no ${PAGE_TYPE} page is reached by \`${read.named ?? ""}\`, as an id or as a slug`,
      DATA
    )
  }

  const dataFile = dataFileFor(root, standing)
  if (dataFile === null) {
    return refused(
      `snapshot ${standing.id} carries no data file, which is how a reading whose pieces ` +
        "rejoined to no JSON document stands",
      DATA
    )
  }

  let db: unknown
  try {
    db = JSON.parse(await readFile(dataFile, "utf8"))
  } catch (thrown) {
    return refused(`${dataFile} holds no whole JSON document — ${whyOf(thrown)}`, DATA)
  }

  const said = read.json ? JSON.stringify(db) : JSON.stringify(db, null, SPACES)
  if (read.outPath === null) return { report: said.split("\n"), refusals: [], code: 0 }

  const at = resolve(root, read.outPath)
  try {
    await writeFile(at, `${said}\n`, "utf8")
  } catch (thrown) {
    return refused(`the record was not written to ${at} — ${whyOf(thrown)}`, OPERATIONAL)
  }
  return {
    report: [`wrote snapshot ${standing.id} into ${at}, read whole from ${dataFile}`],
    refusals: [],
    code: 0,
  }
}
