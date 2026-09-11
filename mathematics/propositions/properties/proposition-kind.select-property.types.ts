import type { propositionKind } from "akasha/mathematics/propositions/properties/proposition-kind.select-property.ts"

export type PropositionKind = (typeof propositionKind.values)[number]
