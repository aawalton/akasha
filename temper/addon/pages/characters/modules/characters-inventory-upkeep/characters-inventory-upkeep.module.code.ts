import { getEsoDayStringFromSec } from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  getSavedVariables,
  type SavedCharacterEntry,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import type { TaskProgress } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-task-progress/completion-task-progress.module.code.ts"
import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const BANK_LABEL = "Bank"

const UNORDERED = 1_000_000

function today(): string {
  return getEsoDayStringFromSec(GetTimeStamp())
}

export function isInventoryKept(
  completion: Pick<CharacterCompletion, "bankVisitDate" | "inventoryCheck"> | undefined,
  day: string
): boolean {
  if (completion === undefined) return false
  const check = completion.inventoryCheck
  return (
    completion.bankVisitDate === day &&
    check !== undefined &&
    check.date === day &&
    check.misplaced === 0
  )
}

export function recordBankVisit(charEntry: SavedCharacterEntry): undefined {
  charEntry.bankVisitDate = today()
}

export function recordInventoryCheck(charEntry: SavedCharacterEntry): undefined {
  const day = today()
  if (isInventoryKept(charEntry, day)) return
  const plan = globalThis.TemperItems?.getInventoryActionSummary()
  if (plan === undefined) return
  charEntry.inventoryCheck = { date: day, misplaced: plan.totalSlots }
}

export function resolveInventoryUpkeep(
  completion: Pick<CharacterCompletion, "bankVisitDate" | "inventoryCheck"> | undefined
): TaskProgress {
  return { current: isInventoryKept(completion, today()) ? 1 : 0, total: 1 }
}

function nextCharacterNotKept(day: string, currentId: string): string | undefined {
  const waiting: SavedCharacterEntry[] = []
  for (const [charId, entry] of Object.entries(getSavedVariables().characters)) {
    if (charId === currentId) continue
    if (!isInventoryKept(entry, day)) waiting.push(entry)
  }
  waiting.sort((a, b) => {
    const order = (a.priorityOrder ?? UNORDERED) - (b.priorityOrder ?? UNORDERED)
    if (order !== 0) return order
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
  return waiting[0]?.name
}

export function getInventoryUpkeepHint(): readonly string[] {
  const day = today()
  const currentId = GetCurrentCharacterId()
  const current = getSavedVariables().characters[currentId]
  if (isInventoryKept(current, day)) {
    const next = nextCharacterNotKept(day, currentId)
    return next === undefined ? [] : [`Next: ${next}`]
  }

  const venues = globalThis.TemperItems?.getInventoryActionSummary()?.venues ?? []
  const lines = venues.map((venue) => venue.line)
  const bankInPlan = venues.some((venue) => venue.label === BANK_LABEL)
  if (current?.bankVisitDate !== day && !bankInPlan) lines.unshift(`${BANK_LABEL} — visit today`)
  return lines
}
