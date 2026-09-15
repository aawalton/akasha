import type { InvariantKind } from "akasha/domain/properties/invariant-kind.relation-property.types.ts"
import type { InvariantStatement } from "akasha/domain/properties/invariant-statement.standard-agent-english-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Invariants = List<{
  invariantKind: InvariantKind
  statement: InvariantStatement
}>
