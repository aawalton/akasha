import type { decisionType } from "akasha/story/decision/properties/decision-type.select-property.ts"

export type DecisionType = (typeof decisionType.values)[number]
