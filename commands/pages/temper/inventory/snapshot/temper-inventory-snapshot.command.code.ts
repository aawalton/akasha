import { existsSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  listedAt,
  listedById,
  slugsOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

const LATEST = "--latest"

const OUTPUT = "--output"

const JSON_FLAG = "--json"

const SPACES = 2

const PAGE_TYPE = "temper-inventory-snapshot"

const DATA_PROPERTY = "data"

const HELD = "json"

const ACCOUNT_PAGE = "accountPage"

type Page = { readonly path: string; readonly id: string }

export type Read =
  | {
      readonly named: string | null
      readonly latest: boolean
      readonly outputPath: string | null
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let named: string | null = null
  let latest = false
  let outputPath: string | null = null
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
    if (one === OUTPUT) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${OUTPUT}\` names the file written to, and no file followed it`)
        continue
      }
      outputPath = value
      continue
    }
    if (one.startsWith("--")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${LATEST}\`, \`${OUTPUT}\` and \`${JSON_FLAG}\``
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
  return { named, latest, outputPath, json }
}

function pageNamed(root: string, said: string): Page | null {
  const byId = listedById(root, said)
  if (byId !== null) return { path: byId.path, id: byId.id }
  const bySlug = listedAt(root, PAGE_TYPE, said)[0]
  return bySlug === undefined ? null : { path: bySlug.path, id: bySlug.id }
}

function pageLatest(root: string): Page | null {
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

function dataFileFor(root: string, page: Page): string | null {
  const beside = besideAt(page.path, DATA_PROPERTY, HELD)
  if (beside === null) return null
  const at = join(root, beside)
  return existsSync(at) ? at : null
}

export async function temperInventorySnapshot(
  argv: readonly string[] = [],
  given?: Given
): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return refusedBy(read.refused)
  const root = given === undefined ? process.cwd() : resolve(given.root)

  let page: Page | null
  try {
    page = read.latest ? pageLatest(root) : pageNamed(root, read.named ?? "")
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (page === null) {
    return refused(
      read.latest
        ? `the account ${USER_ID} carries no ${PAGE_TYPE} page, so there is none to read`
        : `no ${PAGE_TYPE} page is reached by \`${read.named ?? ""}\`, as an id or as a slug`,
      DATA
    )
  }

  const dataFile = dataFileFor(root, page)
  if (dataFile === null) {
    return refused(
      `snapshot ${page.id} carries no data file, which is how a reading whose pieces ` +
        "rejoined to no JSON document remains",
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
  if (read.outputPath === null) return told(said.split("\n"))

  const at = resolve(root, read.outputPath)
  try {
    await writeFile(at, `${said}\n`, "utf8")
  } catch (thrown) {
    return refused(`the record was not written to ${at} — ${whyOf(thrown)}`, OPERATIONAL)
  }
  return told([`wrote snapshot ${page.id} into ${at}, read whole from ${dataFile}`])
}
