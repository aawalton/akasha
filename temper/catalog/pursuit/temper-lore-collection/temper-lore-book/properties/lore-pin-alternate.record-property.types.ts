import type { LorePinFp } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-fp.boolean-property.types.ts"
import type { LorePinMapId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-id.number-property.types.ts"
import type { LorePinMapX } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-x.number-property.types.ts"
import type { LorePinMapY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-y.number-property.types.ts"

export type LorePinAlternate = {
  fp?: LorePinFp
  mapId?: LorePinMapId
  mapX?: LorePinMapX
  mapY?: LorePinMapY
}
