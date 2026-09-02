export type MasterCraftOutcome =
  | "not-in-interaction"
  | "idempotency-skip"
  | "no-result-link"
  | "set-mismatch"
  | "trait-mismatch"
  | "insufficient-mats"
  | "crafted"

export interface MasterCraftTrace {
  timestamp: number
  craftType: number
  setId: number
  templateId: number
  traitType: number
  mode: number
  interactionType: number
  atConsolidated: boolean
  basePattern: number
  resolvedPattern: number
  materialIndex: number
  numMats: number
  styleId: number
  traitIndex: number
  resultLink?: string
  resultSetId?: number
  resultTrait?: number
  maxIter?: number
  existingMatchQuality?: number
  existingMatchLink?: string
  outcome: MasterCraftOutcome
}
