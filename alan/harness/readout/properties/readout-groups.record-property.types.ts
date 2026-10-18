import type { Label } from "akasha/alan/harness/readout/properties/label.text-property.types.ts"
import type { Place } from "akasha/alan/harness/readout/properties/place.number-property.types.ts"
import type { ReadoutGroup } from "akasha/alan/harness/readout/properties/readout-group.relation-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type ReadoutGroups = List<{
  group: ReadoutGroup
  place: Place
  label?: Label
}>
