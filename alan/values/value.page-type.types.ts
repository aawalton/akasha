import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Groups } from "../harness/readouts/properties/groups.relation-property.ts"
import type { Label } from "../harness/readouts/properties/label.text-property.ts"
import type { Place } from "../harness/readouts/properties/place.number-property.ts"
import type { QueryArgument } from "../harness/readouts/properties/query-argument.text-property.ts"
import type { QueryKey } from "../harness/readouts/properties/query-key.text-property.ts"
import type { QuerySlug } from "../harness/readouts/properties/query-slug.text-property.ts"
import type { ReadoutEnabled } from "../harness/readouts/properties/readout-enabled.boolean-property.types.ts"
import type { Scale } from "../harness/readouts/properties/scale.relation-property.ts"
import type { Unit } from "../harness/readouts/properties/unit.text-property.ts"
import type { ValueColor } from "./properties/value-color.relation-property.ts"

export type Value = Domain & {
  label: Label
  color?: ValueColor
  place: Place
  unit?: Unit
  scale?: Scale
  groups?: Groups
  querySlug?: QuerySlug
  queryKey?: QueryKey
  queryArgument?: QueryArgument
  enabled?: ReadoutEnabled
}
