import type { decisionType } from "./decision-type.select-property.ts"

export type DecisionType = (typeof decisionType.values)[number]
