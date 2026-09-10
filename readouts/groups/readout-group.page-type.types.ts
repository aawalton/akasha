import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { FigureOffScale } from "./properties/figure-off-scale.boolean-property.ts"
import type { SortOrder } from "./properties/sort-order.text-property.ts"

export type ReadoutGroup = Domain & {
  sortOrder?: SortOrder
  figureOffScale?: FigureOffScale
}
