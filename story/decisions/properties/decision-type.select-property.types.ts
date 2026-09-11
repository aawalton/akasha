import type { decisionType } from "akasha/story/decisions/properties/decision-type.select-property.ts"

export type DecisionType = (typeof decisionType.values)[number]
