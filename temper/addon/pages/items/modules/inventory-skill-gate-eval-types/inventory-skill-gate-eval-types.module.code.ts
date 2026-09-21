export interface SkillGateLineEval {
  skillLineId: string
  resolved: string
}

export interface SkillGateCharEval {
  charId: string
  isCurrent: boolean
  lines: SkillGateLineEval[]
  eligible: boolean
}

export interface SkillGateEval {
  schemaVersion: number
  timestamp: number
  ruleIndex: number
  mode: string
  skillLineIds: string[]
  currentCharId: string
  tcDataPresent: boolean
  tcCharCount: number
  evals: SkillGateCharEval[]
  firstEligible?: string
  realDispatch?: SkillGateRealDispatch
}

export interface SkillGateRealDispatch {
  bagId: number
  slotIndex: number
  stackCount: number
  currentCharEligible: boolean
  resolvedTargetQuantity: number
  resolvedDestination?: string
  findMatched: boolean
  findMatchedAction?: string
  findMatchedDestination?: string
  findMatchedRuleIndex?: number
}
