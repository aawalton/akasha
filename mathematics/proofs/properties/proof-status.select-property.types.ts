import type { proofStatus } from "akasha/mathematics/proofs/properties/proof-status.select-property.ts"

export type ProofStatus = (typeof proofStatus.values)[number]
