import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import { DAILY_WRIT_COUNT } from "@akasha/temper-player-completion-state/completion-daily-writs-state"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import { tallyDone } from "../characters-progress-tally/characters-progress-tally.module.code.ts"
import { getRecipeTotals } from "../characters-recipes/characters-recipes.module.code.ts"

const isUnlocked = (entry: { unlocked: boolean }): boolean => entry.unlocked

export function resolveDailyWrits(charData: SavedCharacterEntry | undefined): TaskProgress {
  const dw = charData?.dailyWrits
  const today = getEsoDayStringFromSec(GetTimeStamp())
  if (dw === undefined || dw.date !== today) return { current: 0, total: DAILY_WRIT_COUNT }
  return { current: dw.completed, total: DAILY_WRIT_COUNT }
}

export function resolveRecipes(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const recipes = charData?.recipes
  if (recipes === undefined) return undefined

  const totals = getRecipeTotals()

  if (itemPath !== undefined && itemPath.length > 0) {
    const listIndex = Number(itemPath[0])
    const known = recipes[listIndex]
    const knownCount = known !== undefined ? known.length : 0
    const total = totals[listIndex] !== undefined ? totals[listIndex] : knownCount
    return { current: knownCount, total }
  }

  let current = 0
  let total = 0
  for (const [, listTotal] of Object.entries(totals)) {
    total += listTotal
  }
  for (const [, known] of Object.entries(recipes)) {
    current += known.length
  }
  if (total === 0) total = current
  return { current, total }
}

function scriptSlot(pathEntry: string | number): number | undefined {
  if (typeof pathEntry === "number") return pathEntry
  if (pathEntry === "focusScripts") return 1
  if (pathEntry === "signatureScripts") return 2
  if (pathEntry === "affixScripts") return 3
  return undefined
}

export function resolveScribing(
  charData: SavedCharacterEntry | undefined,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  const scribing = charData?.scribing
  if (scribing === undefined) return undefined

  if (itemPath !== undefined && itemPath.length > 0) {
    const section = String(itemPath[0])
    if (section === "grimoires") return tallyDone(scribing.grimoires, isUnlocked)
    if (section === "scripts") {
      const slotEntry = itemPath[1]
      if (slotEntry === undefined) return tallyDone(scribing.scripts, isUnlocked)
      const slot = scriptSlot(slotEntry)
      if (slot === undefined) return undefined
      return tallyDone(scribing.scripts, isUnlocked, (script) => script.slot === slot)
    }
    return undefined
  }

  const grimoires = tallyDone(scribing.grimoires, isUnlocked)
  const scripts = tallyDone(scribing.scripts, isUnlocked)
  return {
    current: grimoires.current + scripts.current,
    total: grimoires.total + scripts.total,
  }
}
