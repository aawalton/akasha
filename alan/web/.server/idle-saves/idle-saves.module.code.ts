import type { IdleSave } from "@akasha/idle-system/save"
import { unheld, unwritten } from "../../pages-unheld/pages-unheld.module.code.ts"

const PAGE_TYPE = "idle-save"
export async function loadSave(userId: string): Promise<IdleSave | null> {
  throw new Error(unheld(PAGE_TYPE, `the save of \`${userId}\``))
}

export async function loadAllSaves(): Promise<ReadonlyArray<{ userId: string; save: IdleSave }>> {
  throw new Error(unheld(PAGE_TYPE, "every save"))
}

export async function upsertSave(
  userId: string,
  _save: IdleSave,
  _opts?: { readonly isDevTestWrite?: boolean }
): Promise<void> {
  throw new Error(unwritten(PAGE_TYPE, `the save of \`${userId}\``))
}
