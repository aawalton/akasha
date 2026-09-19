import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { USER_ID } from "akasha/alan/harness/supabase-auth/modules/user-id/user-id.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { jsonOneLine as jsonOneLineArgument } from "akasha/command/argument/pages/json-one-line.argument.ts"
import { output as outputArgument } from "akasha/command/argument/pages/output.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperInventorySnapshot as page } from "akasha/command/pages/temper/inventory/snapshot/temper-inventory-snapshot.command.ts"
import {
  accountInventory,
  inventoryDatabase,
} from "akasha/temper/command/modules/inventory-snapshot-reading/inventory-snapshot-reading.module.code.ts"

const NAMED = [outputArgument, jsonOneLineArgument]

const SPACES = 2

const PAGE_TYPE = "temper-account"

export async function temperInventorySnapshot(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken

  let header: Awaited<ReturnType<typeof accountInventory>>
  try {
    header = await accountInventory(USER_ID)
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
  if (header === null) {
    return refused(`no ${PAGE_TYPE} page is reached by ${USER_ID}, so there is none to read`, DATA)
  }

  const db = await inventoryDatabase(header.slug)
  if (db === null) {
    return refused(
      `the account ${header.slug} carries no data file, which is where the whole reading sits`,
      DATA
    )
  }

  const said = taken.jsonOneLine ? JSON.stringify(db) : JSON.stringify(db, null, SPACES)
  if (taken.output === undefined) return told(said.split("\n"))

  const at = resolve(resolve(given.root), taken.output)
  try {
    await writeFile(at, `${said}\n`, "utf8")
  } catch (thrown) {
    return refused(`the record was not written to ${at} — ${whyOf(thrown)}`, OPERATIONAL)
  }
  return told([`wrote the inventory of ${header.slug} into ${at}`])
}
