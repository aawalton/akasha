import type { IdleSave } from "@akasha/idle-system/save"
import { unheld, unwritten } from "../../pages-unheld/pages-unheld.module.code.ts"

const PAGE_TYPE = "idle-save"

// EVERY IDLE SAVE IS UNREACHABLE, AND A MISSING SAVE IS THE MOST DANGEROUS THING TO FAKE HERE.
// These read and wrote `idle-save` pages through `@shared/pages-query`, which asked this pod's
// own checkout. That reach is severed, and `idle-save` is no page type the pages system service
// holds, so there is nothing to read and nowhere for a save to land.
//
// `loadSave` answered `null` for a player who has never played. Keeping that would hand a
// returning player a fresh game — and then `upsertSave` would write that fresh game over the one
// they actually have. Refusing to read is the only thing that keeps the save they have.
export async function loadSave(userId: string): Promise<IdleSave | null> {
  throw new Error(unheld(PAGE_TYPE, `the save of \`${userId}\``))
}

export async function loadAllSaves(): Promise<ReadonlyArray<{ userId: string; save: IdleSave }>> {
  throw new Error(unheld(PAGE_TYPE, "every save"))
}

// `upsertSave` returned `void`, so a caller reads a return as a save that landed. It never did.
export async function upsertSave(
  userId: string,
  _save: IdleSave,
  _opts?: { readonly isDevTestWrite?: boolean }
): Promise<void> {
  throw new Error(unwritten(PAGE_TYPE, `the save of \`${userId}\``))
}
