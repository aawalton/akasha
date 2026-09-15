import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { DecisionGroup } from "akasha/domain/invariant-kind/decision-group/decision-group.relation-property.types.ts"

export type InvariantKind = Domain & {
  decisionGroup: DecisionGroup
}
