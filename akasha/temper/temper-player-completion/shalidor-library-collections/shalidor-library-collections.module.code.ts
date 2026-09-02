import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import type { LoreCollectionEntry } from "@akasha/temper-completion/lore-library-types"

export const SHALIDORS_LIBRARY_CATEGORY_INDEX = 1

function shalidorCollections(): readonly LoreCollectionEntry[] {
  for (const category of LORE_LIBRARY_DATA) {
    if (category.categoryIndex === SHALIDORS_LIBRARY_CATEGORY_INDEX) return category.collections
  }
  return []
}

export const SHALIDOR_LIBRARY_COLLECTIONS: readonly LoreCollectionEntry[] = shalidorCollections()
