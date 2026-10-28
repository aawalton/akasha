import { resolveCharacterNameById } from "akasha/temper/addon/pages/items/modules/inventory-character-names/inventory-character-names.module.code.ts"
import type { MatchedRuleResult } from "akasha/temper/addon/pages/items/modules/inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { isSavedVariablesReady } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
export interface BankTransitionSummary {
  totalStacks: number
  characters: Array<{ label: string; count: number }>
}

interface HeldUnits {
  units: number
  stackSize: number
}

export type BankTransitionTally = Record<string, Record<string, HeldUnits>>

export function newBankTransitionTally(): BankTransitionTally {
  return {}
}

function addUnits(
  tally: BankTransitionTally,
  charId: string,
  itemKey: string,
  units: number,
  stackSize: number
): undefined {
  if (units <= 0) return
  let held = tally[charId]
  if (held === undefined) {
    held = {}
    tally[charId] = held
  }
  const one = held[itemKey]
  if (one === undefined) {
    held[itemKey] = { units, stackSize }
  } else {
    one.units += units
  }
}

function stacksOfUnits(units: number, stackSize: number): number {
  if (units <= 0) return 0
  if (stackSize <= 0) return 1
  return math.ceil(units / stackSize)
}

export function tallyBankTransition(
  tally: BankTransitionTally,
  bagId: number,
  slotIndex: number,
  matched: MatchedRuleResult,
  currentCharId: string
): undefined {
  const [stackCount, stackSize] = GetSlotStackSize(bagId, slotIndex)
  const itemKey = `${GetItemId(bagId, slotIndex)}`
  const allocation = matched.useAllocation
  if (allocation !== undefined) {
    addUnits(tally, currentCharId, itemKey, allocation.currentCharQty, stackSize)
    for (const dep of allocation.otherCharDeposits) {
      addUnits(tally, dep.charId, itemKey, dep.qty, stackSize)
    }
    return
  }

  const charId = extractCharId(matched.destination)
  if (charId === undefined) return
  addUnits(tally, charId, itemKey, stackCount, stackSize)
}

export function summarizeBankTransitions(
  tally: BankTransitionTally
): BankTransitionSummary | undefined {
  if (!isSavedVariablesReady()) return undefined

  let totalStacks = 0
  const characters: Array<{ label: string; count: number }> = []
  for (const [charId, held] of Object.entries(tally)) {
    let count = 0
    for (const [, one] of Object.entries(held)) count += stacksOfUnits(one.units, one.stackSize)
    if (count <= 0) continue
    totalStacks += count
    characters.push({ label: resolveCharacterNameById(charId) ?? charId, count })
  }
  if (characters.length === 0) return undefined

  table.sort(characters, function (this: void, a, b): boolean {
    return a.count > b.count
  })

  return { totalStacks, characters }
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
