import type { Formula } from "akasha/story/mechanic/derived/properties/formula.module-property-group.ts"
import type { Mechanic } from "akasha/story/mechanic/mechanic.page-type.types.ts"

export type MetricDerived = Mechanic & {
  formula: Formula
}
