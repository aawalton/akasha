import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "../completion-card-registry/completion-card-registry.module.code.ts"
import {
  CUMULATIVE_ACCOUNT_CARDS,
  CUMULATIVE_CHARACTER_CARDS,
} from "../completion-cumulative-cards/completion-cumulative-cards.module.code.ts"

export interface ScopeRollup {
  readonly count: number
  readonly total: number
}

function sumScope(entries: Iterable<ScopeRollup>): ScopeRollup {
  let count = 0
  let total = 0
  for (const entry of entries) {
    count += entry.count
    total += entry.total
  }
  return { count, total }
}

export function sumAccountScope(accountSummary: AccountSummaryData): ScopeRollup {
  return sumScope(CUMULATIVE_ACCOUNT_CARDS.map((card) => accountSummary[card.id]))
}

export function sumCharacterScope(characterSummary: CharacterSummaryData): ScopeRollup {
  return sumScope(CUMULATIVE_CHARACTER_CARDS.map((card) => characterSummary[card.id]))
}

export function sumCompanionScope(companionSummary: CompanionSummaryData): ScopeRollup {
  return sumScope(Object.values(companionSummary))
}

export function computeOverallCompletionScore(
  accountSummary: AccountSummaryData,
  characterSummary: CharacterSummaryData,
  companionSummary: CompanionSummaryData
): number {
  return (
    sumAccountScope(accountSummary).count +
    sumCharacterScope(characterSummary).count +
    sumCompanionScope(companionSummary).count
  )
}
