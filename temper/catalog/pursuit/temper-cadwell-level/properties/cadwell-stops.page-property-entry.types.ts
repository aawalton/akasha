import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { StopIndex } from "akasha/temper/catalog/pursuit/temper-cadwell-level/properties/stop-index.number-property.types.ts"
import type { ZoneIndex } from "akasha/temper/catalog/pursuit/temper-cadwell-level/properties/zone-index.number-property.types.ts"
import type { PoiName } from "akasha/temper/catalog/thing/properties/poi-name.text-property.types.ts"
import type { ZoneName } from "akasha/temper/thing/properties/zone-name.text-property.types.ts"

export type CadwellStops = "jsonl"

export type CadwellStopsRow = {
  id: Id
  zoneIndex: ZoneIndex
  zoneName: ZoneName
  stopIndex: StopIndex
  poiName: PoiName
}
