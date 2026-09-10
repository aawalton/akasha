import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Groups } from "../harness/readouts/properties/groups.relation-property.types.ts"
import type { Label } from "../harness/readouts/properties/label.text-property.ts"
import type { Place } from "../harness/readouts/properties/place.number-property.types.ts"
import type { ReadoutEnabled } from "../harness/readouts/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "../harness/readouts/properties/scale.relation-property.types.ts"
import type { Unit } from "../harness/readouts/properties/unit.text-property.ts"
import type { ValueColor } from "./properties/value-color.relation-property.types.ts"

export type Value = Domain & {
  label: Label
  color?: ValueColor
  place: Place
  unit?: Unit
  scale?: Scale
  groups?: Groups
  enabled?: ReadoutEnabled
}
