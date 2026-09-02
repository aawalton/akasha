import { pruneEmptyStorage } from "../craft-storage-prune/craft-storage-prune.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export function migrateStoragePrune(): undefined {
  pruneEmptyStorage(STATE.Account.storage)
}
