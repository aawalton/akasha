import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { Direction } from "akasha/graph/predicate/properties/direction.text-property.types.ts"
import type { Edges } from "akasha/graph/predicate/properties/edges.relation-property.types.ts"
import type { Follows } from "akasha/graph/predicate/properties/follows.record-property.types.ts"

export type GraphPredicate = Domain & {
  edges: Edges
  direction: Direction
  follows?: Follows
}
