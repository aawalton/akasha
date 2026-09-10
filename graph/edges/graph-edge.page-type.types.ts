import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { Attributes } from "./properties/attributes.relation-property.ts"
import type { Index } from "./properties/index.relation-property.ts"

export type GraphEdge = Domain & {
  index?: Index
  attributes?: Attributes
}
