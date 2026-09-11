import type { Groups } from "akasha/alan/harness/readouts/properties/groups.relation-property.types.ts"
import type { Label } from "akasha/alan/harness/readouts/properties/label.text-property.types.ts"
import type { Place } from "akasha/alan/harness/readouts/properties/place.number-property.types.ts"
import type { ReadoutEnabled } from "akasha/alan/harness/readouts/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "akasha/alan/harness/readouts/properties/scale.relation-property.types.ts"
import type { Unit } from "akasha/alan/harness/readouts/properties/unit.text-property.types.ts"
import type { ValueColor } from "akasha/alan/values/properties/value-color.relation-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Value = Domain & {
  label: Label
  color?: ValueColor
  place: Place
  unit?: Unit
  scale?: Scale
  groups?: Groups
  enabled?: ReadoutEnabled
}
