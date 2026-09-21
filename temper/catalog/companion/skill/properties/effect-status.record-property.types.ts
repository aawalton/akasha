import type { Duration } from "akasha/temper/catalog/companion/skill/properties/duration.number-property.types.ts"
import type { StatusDistance } from "akasha/temper/catalog/companion/skill/properties/status-distance.number-property.types.ts"
import type { StatusMagnitude } from "akasha/temper/catalog/companion/skill/properties/status-magnitude.number-property.types.ts"
import type { StatusName } from "akasha/temper/catalog/companion/skill/properties/status-name.text-property.types.ts"

export type EffectStatus = {
  status?: StatusName
  duration?: Duration
  magnitude?: StatusMagnitude
  distance?: StatusDistance
}
