import type { propositionStatus } from "./proposition-status.select-property.ts"

export type PropositionStatus = (typeof propositionStatus.values)[number]
