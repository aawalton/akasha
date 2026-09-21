import { pruneEmptyStorage } from "akasha/temper/addon/pages/crafting/modules/craft-storage-prune/craft-storage-prune.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/crafting/modules/crafting-state/crafting-state.module.code.ts"

export function migrateStoragePrune(): undefined {
  pruneEmptyStorage(STATE.Account.storage)
}
