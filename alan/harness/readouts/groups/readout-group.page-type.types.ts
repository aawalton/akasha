import type { FigureOffScale } from "akasha/alan/harness/readouts/groups/properties/figure-off-scale.boolean-property.types.ts"
import type { SortOrder } from "akasha/alan/harness/readouts/groups/properties/sort-order.select-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type ReadoutGroup = Domain & {
  sortOrder?: SortOrder
  figureOffScale?: FigureOffScale
}
