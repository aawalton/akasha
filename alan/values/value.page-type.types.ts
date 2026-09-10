import type { Domain } from "../../domains/domain.page-type.ts"
import type { Groups } from "../../readouts/properties/groups.relation-property.ts"
import type { Label } from "../../readouts/properties/label.text-property.ts"
import type { Place } from "../../readouts/properties/place.number-property.ts"
import type { QueryArgument } from "../../readouts/properties/query-argument.text-property.ts"
import type { QueryKey } from "../../readouts/properties/query-key.text-property.ts"
import type { QuerySlug } from "../../readouts/properties/query-slug.text-property.ts"
import type { ReadoutEnabled } from "../../readouts/properties/readout-enabled.boolean-property.ts"
import type { Scale } from "../../readouts/properties/scale.relation-property.ts"
import type { Unit } from "../../readouts/properties/unit.text-property.ts"
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
