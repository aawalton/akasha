import type { FigureOffScale } from "akasha/alan/harness/readout/group/properties/figure-off-scale.boolean-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type ReadoutGroup = Domain & {
  figureOffScale?: FigureOffScale
}
