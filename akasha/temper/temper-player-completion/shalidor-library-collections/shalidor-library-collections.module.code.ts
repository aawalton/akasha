import type { LoreCollectionEntry } from "@akasha/temper-completion/lore-library-types"
import { SHALIDOR_LIBRARY_COLLECTIONS_00 } from "../shalidor-library-collections-00/shalidor-library-collections-00.module.code.ts"
import { SHALIDOR_LIBRARY_COLLECTIONS_01 } from "../shalidor-library-collections-01/shalidor-library-collections-01.module.code.ts"

export const SHALIDORS_LIBRARY_CATEGORY_INDEX = 1

export const SHALIDOR_LIBRARY_COLLECTIONS: readonly LoreCollectionEntry[] = [
  ...SHALIDOR_LIBRARY_COLLECTIONS_00,
  ...SHALIDOR_LIBRARY_COLLECTIONS_01,
]
