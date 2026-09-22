import type { Groups } from "akasha/alan/harness/readout/properties/groups.multi-relation-property.types.ts"
import type { Label } from "akasha/alan/harness/readout/properties/label.text-property.types.ts"
import type { Place } from "akasha/alan/harness/readout/properties/place.number-property.types.ts"
import type { ReadoutEnabled } from "akasha/alan/harness/readout/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "akasha/alan/harness/readout/properties/scale.relation-property.types.ts"
import type { Unit } from "akasha/alan/harness/readout/properties/unit.text-property.types.ts"
import type { ValueColor } from "akasha/alan/value/properties/value-color.relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Value = Domain & {
  label: Label
  color?: ValueColor
  place: Place
  unit?: Unit
  scale?: Scale
  groups?: Groups
  enabled?: ReadoutEnabled
}
