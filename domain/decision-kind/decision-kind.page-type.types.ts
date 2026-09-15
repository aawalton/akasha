import type { DecisionGroup } from "akasha/domain/decision-kind/properties/decision-group.relation-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type DecisionKind = Domain & {
  decisionGroup: DecisionGroup
}
