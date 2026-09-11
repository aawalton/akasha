import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { Attributes } from "akasha/graph/edges/properties/attributes.relation-property.types.ts"
import type { Index } from "akasha/graph/edges/properties/index.relation-property.types.ts"

export type GraphEdge = Domain & {
  index?: Index
  attributes?: Attributes
}
