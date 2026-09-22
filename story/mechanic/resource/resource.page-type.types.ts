import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"
import type { ResourceMaxValue } from "akasha/story/mechanic/resource/properties/resource-max-value.number-property.types.ts"
import type { ResourceMinValue } from "akasha/story/mechanic/resource/properties/resource-min-value.number-property.types.ts"
import type { ResourceValue } from "akasha/story/mechanic/resource/properties/resource-value.number-property.types.ts"

export type Resource = Mechanic & {
  value: ResourceValue
  minValue?: ResourceMinValue
  maxValue?: ResourceMaxValue
}
