import type { DecisionKind } from "akasha/domain/properties/decision-kind.relation-property.types.ts"
import type { DecisionStatement } from "akasha/domain/properties/decision-statement.standard-agent-english-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"

export type Decisions = List<{
  decisionKind: DecisionKind
  statement: DecisionStatement
}>
