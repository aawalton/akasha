import {
  type InventoryHintLine,
  itemNote,
  type ShownItem,
} from "akasha/temper/addon/pages/characters/modules/characters-inventory-hint-items/characters-inventory-hint-items.module.code.ts"
import { getEsoDayStringFromSec } from "akasha/temper/catalog/world/group-dungeon/modules/eso-reset/eso-reset.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import {
  getSavedVariables,
  type SavedCharacterEntry,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import type { TaskProgress } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-task-progress/completion-task-progress.module.code.ts"
import "akasha/temper/addon/type/temper-items-global/temper-items-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

const BANK_LABEL = "Bank"

const UNORDERED = 1_000_000

function today(): string {
  return getEsoDayStringFromSec(GetTimeStamp())
}

function isInventoryKept(
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

function characterName(this: void, characterId: string): string | undefined {
  return getSavedVariables().characters[characterId]?.name
}

function shownItem(item: TemperItemsPlanItem, label: string): ShownItem {
  const name = zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(item.link))
  const [r, g, b] = GetItemQualityColor(GetItemLinkDisplayQuality(item.link)).UnpackRGB()
  return {
    name,
    count: item.count,
    note: itemNote(item.destination, item.verb, label, characterName),
    rgb: [r, g, b],
  }
}

export function getInventoryUpkeepHint(): readonly InventoryHintLine[] {
  const day = today()
  const currentId = GetCurrentCharacterId()
  const current = getSavedVariables().characters[currentId]
  if (isInventoryKept(current, day)) {
    const next = nextCharacterNotKept(day, currentId)
    return next === undefined ? [] : [{ text: `Next: ${next}` }]
  }

  const venues = globalThis.TemperItems?.getInventoryActionSummary()?.venues ?? []
  const lines: InventoryHintLine[] = venues.map(
    (venue): InventoryHintLine => ({
      text: venue.line,
      venue: venue.label,
      items: (venue.items ?? []).map((item) => shownItem(item, venue.label)),
    })
  )
  const bankInPlan = venues.some((venue) => venue.label === BANK_LABEL)
  if (current?.bankVisitDate !== day && !bankInPlan) {
    lines.unshift({ text: `${BANK_LABEL} — visit today` })
  }
  return lines
}
