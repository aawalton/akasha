import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Attributes } from "akasha/graph/edge/properties/attributes.relation-property.types.ts"
import type { Index } from "akasha/graph/edge/properties/index.relation-property.types.ts"

export type GraphEdge = Domain & {
  index?: Index
  attributes?: Attributes
}
