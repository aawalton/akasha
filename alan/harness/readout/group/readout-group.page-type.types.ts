import type { FigureOffScale } from "akasha/alan/harness/readout/group/properties/figure-off-scale.boolean-property.types.ts"
import type { SortOrder } from "akasha/alan/harness/readout/group/properties/sort-order.select-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ReadoutGroup = Domain & {
  sortOrder?: SortOrder
  figureOffScale?: FigureOffScale
}
