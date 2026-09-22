import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Attributes } from "akasha/graph/edge/properties/attributes.multi-relation-property.types.ts"

export type GraphEdge = Domain & {
  attributes?: Attributes
}
