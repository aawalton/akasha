import { resolveCharacterNameById } from "akasha/temper/addon/items-addon/modules/inventory-character-names/inventory-character-names.module.code.ts"
import type { MatchedRuleResult } from "akasha/temper/addon/items-addon/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { isSavedVariablesReady } from "akasha/temper/addon/items-addon/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { addToTally } from "akasha/temper/addon/items-addon/modules/inventory-tally/inventory-tally.module.code.ts"
export interface BankTransitionSummary {
  totalUnits: number
  characters: Array<{ label: string; count: number }>
}

export type BankTransitionTally = Record<string, number>

export function newBankTransitionTally(): BankTransitionTally {
  return {}
}

export function tallyBankTransition(
  tally: BankTransitionTally,
  bagId: number,
  slotIndex: number,
  matched: MatchedRuleResult,
  currentCharId: string
): undefined {
  const allocation = matched.useAllocation
  if (allocation !== undefined) {
    if (allocation.currentCharQty > 0) addToTally(tally, currentCharId, allocation.currentCharQty)
    for (const dep of allocation.otherCharDeposits) {
      addToTally(tally, dep.charId, dep.qty)
    }
    return
  }

  const charId = extractCharId(matched.destination)
  if (charId === undefined) return
  const [stackCount] = GetSlotStackSize(bagId, slotIndex)
  if (stackCount === 0) return
  addToTally(tally, charId, stackCount)
}

export function summarizeBankTransitions(
  tally: BankTransitionTally
): BankTransitionSummary | undefined {
  if (!isSavedVariablesReady()) return undefined

  let totalUnits = 0
  const characters: Array<{ label: string; count: number }> = []
  for (const [charId, count] of Object.entries(tally)) {
    if (count <= 0) continue
    totalUnits += count
    characters.push({ label: resolveCharacterNameById(charId) ?? charId, count })
  }
  if (characters.length === 0) return undefined

  table.sort(characters, function (this: void, a, b): boolean {
    return a.count > b.count
  })

  return { totalUnits, characters }
}

function extractCharId(destination: string | undefined): string | undefined {
  if (destination === undefined) return undefined
  if (destination.startsWith("character-worn:")) {
    const id = destination.substring("character-worn:".length)
    return id !== "" ? id : undefined
  }
  if (destination.startsWith("character:")) {
    const id = destination.substring("character:".length)
    return id !== "" ? id : undefined
  }
  return undefined
}
