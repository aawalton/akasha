import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { DecisionGroup } from "akasha/domain/decision-kind/decision-group/decision-group.relation-property.types.ts"

export type DecisionKind = Domain & {
  decisionGroup: DecisionGroup
}
