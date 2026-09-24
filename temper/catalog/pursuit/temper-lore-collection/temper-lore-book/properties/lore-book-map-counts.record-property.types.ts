import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { LoreBookMapCount } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-map-count.number-property.types.ts"
import type { LoreBookMapFlagged } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-book-map-flagged.boolean-property.types.ts"
import type { LorePinMapId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-id.number-property.types.ts"

export type LoreBookMapCounts = List<{
  mapId: LorePinMapId
  mapCount?: LoreBookMapCount
  mapFlagged?: LoreBookMapFlagged
}>
