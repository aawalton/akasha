import type { propositionStatus } from "akasha/mathematics/propositions/properties/proposition-status.select-property.ts"

export type PropositionStatus = (typeof propositionStatus.values)[number]
