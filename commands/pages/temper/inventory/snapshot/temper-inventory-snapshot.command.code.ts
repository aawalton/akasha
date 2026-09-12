import { existsSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { jsonOneLine as jsonOneLineArgument } from "akasha/commands/arguments/pages/json-one-line.argument.ts"
import { latest as latestArgument } from "akasha/commands/arguments/pages/latest.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { snapshot as snapshotArgument } from "akasha/commands/arguments/pages/snapshot.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventorySnapshot as page } from "akasha/commands/pages/temper/inventory/snapshot/temper-inventory-snapshot.command.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  listedAt,
  listedById,
  slugsOfType,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"

const NAMED = [latestArgument, snapshotArgument, outputArgument, jsonOneLineArgument]

const SPACES = 2

const PAGE_TYPE = "temper-inventory-snapshot"

const DATA_PROPERTY = "data"

const HELD = "json"

const ACCOUNT_PAGE = "accountPage"

type Page = { readonly path: string; readonly id: string }

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

function dataFileFor(root: string, found: Page): string | null {
  const beside = besideAt(found.path, DATA_PROPERTY, HELD)
  if (beside === null) return null
  const at = join(root, beside)
  return existsSync(at) ? at : null
}

export async function temperInventorySnapshot(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const root = resolve(given.root)

  const named = taken.snapshot

  let found: Page | null
  try {
    found = named === undefined ? pageLatest(root) : pageNamed(root, named)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (found === null) {
    return refused(
      named === undefined
        ? `the account ${USER_ID} carries no ${PAGE_TYPE} page, so there is none to read`
        : `no ${PAGE_TYPE} page is reached by \`${named}\`, as an id or as a slug`,
      DATA
    )
  }

  const dataFile = dataFileFor(root, found)
  if (dataFile === null) {
    return refused(
      `snapshot ${found.id} carries no data file, which is how a reading whose pieces ` +
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

  const said = taken.jsonOneLine ? JSON.stringify(db) : JSON.stringify(db, null, SPACES)
  if (taken.output === undefined) return told(said.split("\n"))

  const at = resolve(root, taken.output)
  try {
    await writeFile(at, `${said}\n`, "utf8")
  } catch (thrown) {
    return refused(`the record was not written to ${at} — ${whyOf(thrown)}`, OPERATIONAL)
  }
  return told([`wrote snapshot ${found.id} into ${at}, read whole from ${dataFile}`])
}
