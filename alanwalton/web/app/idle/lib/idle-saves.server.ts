import { writePage } from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { assertNotProtectedSaveUser } from "./idle-protected-user"
import { type IdleSave, parseIdleSave, toJsonSave } from "./idle-save"

const PAGE_TYPE = "idle-save"

const WRITER = "idle-saves"

const SAVE_KEYS: readonly string[] = ["user-id", "state"]

function userIdOf(values: Readonly<Record<string, unknown>>): string {
  const held = values["user-id"]
  return typeof held === "string" ? held : ""
}

export async function loadSave(userId: string): Promise<IdleSave | null> {
  const asked = await askComposed({
    "page-type": PAGE_TYPE,
    where: { "user-id": { is: userId } },
    keys: SAVE_KEYS,
  })
  if (!asked.ok) throw new Error(`idle loadSave failed: ${asked.why}`)
  const mine = asked.answer.rows.find((row) => userIdOf(row.values) === userId)
  if (mine === undefined) return null
  return parseIdleSave(mine.values.state)
}

export async function loadAllSaves(): Promise<ReadonlyArray<{ userId: string; save: IdleSave }>> {
  const asked = await askComposed({ "page-type": PAGE_TYPE, keys: SAVE_KEYS })
  if (!asked.ok) throw new Error(`idle loadAllSaves failed: ${asked.why}`)
  const held: { userId: string; save: IdleSave }[] = []
  for (const row of asked.answer.rows) {
    const userId = userIdOf(row.values)
    if (userId === "") continue
    held.push({ userId, save: parseIdleSave(row.values.state) })
  }
  return held
}

export async function upsertSave(
  userId: string,
  save: IdleSave,
  opts?: { readonly isDevTestWrite?: boolean }
): Promise<void> {
  if (opts?.isDevTestWrite === true) assertNotProtectedSaveUser(userId)
  const landed = await writePage(
    PAGE_TYPE,
    userId,
    { "user-id": userId, state: JSON.stringify(toJsonSave(save)) },
    WRITER
  )
  if (!landed.ok) throw new Error(`idle upsertSave failed: ${landed.why}`)
}
