import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Attributes } from "./properties/attributes.relation-property.types.ts"
import type { Index } from "./properties/index.relation-property.types.ts"

export type GraphEdge = Domain & {
  index?: Index
  attributes?: Attributes
}
