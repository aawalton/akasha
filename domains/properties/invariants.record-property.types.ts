import type { InvariantKind } from "akasha/domains/properties/invariant-kind.relation-property.types.ts"
import type { InvariantStatement } from "akasha/domains/properties/invariant-statement.standard-agent-english-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type Invariants = List<{
  invariantKind: InvariantKind
  statement: InvariantStatement
}>
