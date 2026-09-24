import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { LorePinMapId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-id.number-property.types.ts"
import type { LorePinMapX } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-x.number-property.types.ts"
import type { LorePinMapY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-y.number-property.types.ts"
import type { ShalidorPin6 } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/shalidor-pin-6.number-property.types.ts"
import type { ShalidorPinLocationDetails } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/shalidor-pin-location-details.number-property.types.ts"
import type { ShalidorPinMapOrder } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/shalidor-pin-map-order.number-property.types.ts"
import type { ShalidorPinWorldY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/shalidor-pin-world-y.number-property.types.ts"
import type { EsoZoneId } from "akasha/temper/catalog/world/zone/properties/eso-zone-id.number-property.types.ts"

export type ShalidorPins = "jsonl"

export type ShalidorPinsRow = {
  id: Id
  mapId: LorePinMapId
  mapOrder: ShalidorPinMapOrder
  mapX: LorePinMapX
  mapY: LorePinMapY
  esoZoneId?: EsoZoneId
  shalidor6?: ShalidorPin6
  worldY?: ShalidorPinWorldY
  locationDetails?: ShalidorPinLocationDetails
}
