import type { TimingValue } from "akasha/temper/catalog/companion/rotation-timing/properties/timing-value.number-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionRotationTiming = TemperCompanionThing & {
  key: Key
  timingValue: TimingValue
}
