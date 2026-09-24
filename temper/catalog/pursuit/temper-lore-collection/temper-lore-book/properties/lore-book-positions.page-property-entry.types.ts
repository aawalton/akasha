import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { LorePinAlternate } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-alternate.record-property.types.ts"
import type { LorePinDungeon } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-dungeon.boolean-property.types.ts"
import type { LorePinFp } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-fp.boolean-property.types.ts"
import type { LorePinI } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-i.number-property.types.ts"
import type { LorePinL } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-l.boolean-property.types.ts"
import type { LorePinLocationDetail } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-location-detail.number-property.types.ts"
import type { LorePinMapId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-id.number-property.types.ts"
import type { LorePinMapX } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-x.number-property.types.ts"
import type { LorePinMapY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-map-y.number-property.types.ts"
import type { LorePinMn } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-mn.number-property.types.ts"
import type { LorePinPnx } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-pnx.number-property.types.ts"
import type { LorePinPny } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-pny.number-property.types.ts"
import type { LorePinQc } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-qc.boolean-property.types.ts"
import type { LorePinQp } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-qp.boolean-property.types.ts"
import type { LorePinR } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-r.boolean-property.types.ts"
import type { LorePinSm } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-sm.number-property.types.ts"
import type { LorePinX } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-x.number-property.types.ts"
import type { LorePinY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-y.number-property.types.ts"
import type { LorePinZ } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-z.number-property.types.ts"
import type { LorePinZoneMapId } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-zone-map-id.number-property.types.ts"
import type { LorePinZoneX } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-zone-x.number-property.types.ts"
import type { LorePinZoneY } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-zone-y.number-property.types.ts"
import type { LorePinZt } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/properties/lore-pin-zt.number-property.types.ts"

export type LoreBookPositions = "jsonl"

export type LoreBookPositionsRow = {
  id: Id
  mapId?: LorePinMapId
  mapX?: LorePinMapX
  mapY?: LorePinMapY
  zoneMapId?: LorePinZoneMapId
  zoneX?: LorePinZoneX
  zoneY?: LorePinZoneY
  dungeon?: LorePinDungeon
  locationDetail?: LorePinLocationDetail
  mn?: LorePinMn
  fp?: LorePinFp
  qc?: LorePinQc
  qp?: LorePinQp
  l?: LorePinL
  r?: LorePinR
  x?: LorePinX
  y?: LorePinY
  z?: LorePinZ
  pnx?: LorePinPnx
  pny?: LorePinPny
  zt?: LorePinZt
  i?: LorePinI
  sm?: LorePinSm
  alternate?: LorePinAlternate
}
