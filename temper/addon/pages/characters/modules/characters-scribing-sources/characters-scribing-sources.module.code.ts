import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import { motifStylesDroppedBy } from "akasha/temper/addon/pages/characters/modules/characters-scribing-source-motif-styles/characters-scribing-source-motif-styles.module.code.ts"
import { SCRIBING_SOURCES } from "akasha/temper/addon/pages/characters/modules/characters-scribing-source-table/characters-scribing-source-table.module.code.ts"
import { fightersGuildDaily } from "akasha/temper/catalog/skill/temper-scribing-source/pages/fighters-guild-daily/fighters-guild-daily.temper-scribing-source.ts"
import { magesGuildDaily } from "akasha/temper/catalog/skill/temper-scribing-source/pages/mages-guild-daily/mages-guild-daily.temper-scribing-source.ts"
import { undauntedDelveDailies } from "akasha/temper/catalog/skill/temper-scribing-source/pages/undaunted-delve-dailies/undaunted-delve-dailies.temper-scribing-source.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"
import { extractLoreKnownSet } from "akasha/temper/player/completion/temper-player-completion/modules/completion-lore-library-progress/completion-lore-library-progress.module.code.ts"
import type { TaskData } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

export type ScriptType = "focus" | "signature" | "affix"

export interface ScribingSourceAchievement {
  achievementId: number
  name: string
}

export interface ScribingSource {
  scriptType: ScriptType
  slug: string
  label: string
  achievements: ScribingSourceAchievement[]
}

export interface ScribingSourceSubRow {
  label: string
  achievementName: string
  current: number
  total: number
  unlearnedMotifStyles: number | undefined
}

export interface ScribingGuildDailyFallback {
  label: string
  unlearnedMotifStyles: number | undefined
}

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

export function countUnlearnedMotifStyles(
  scribingSourceSlug: string,
  knownLoreBooks: ReadonlySet<string> | undefined
): number | undefined {
  if (knownLoreBooks === undefined) return undefined
  const styles = motifStylesDroppedBy(scribingSourceSlug)
  if (styles.length === 0) return undefined
  const category = LORE_LIBRARY_DATA.find((c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX)
  if (category === undefined) return undefined

  let unlearned = 0
  for (const style of styles) {
    const collection = category.collections.find((c) => c.collectionIndex === style.collectionIndex)
    if (collection === undefined) continue
    const learned = collection.books.every((book) =>
      knownLoreBooks.has(
        `${CRAFTING_MOTIFS_CATEGORY_INDEX}:${collection.collectionIndex}:${book.bookIndex}`
      )
    )
    if (!learned) unlearned++
  }
  return unlearned
}

export function withUnlearnedMotifStyles(text: string, unlearned: number | undefined): string {
  if (unlearned === undefined || unlearned === 0) return text
  return `${text} (${unlearned} ${unlearned === 1 ? "motif" : "motifs"})`
}

function currentKnownLoreBooks(): ReadonlySet<string> | undefined {
  const loreLibrary = currentCharacterEntry()?.loreLibrary
  return loreLibrary === undefined ? undefined : extractLoreKnownSet(loreLibrary)
}

export function getScribingScriptType(task: TaskData): ScriptType | undefined {
  const cardId = task.completionCardId
  if (cardId !== "scribing-knowledge" && cardId !== "account-scribing-knowledge") return undefined
  const path = task.completionItemPath
  if (path === undefined || path.length < 2 || path[0] !== "scripts") return undefined
  const slot = path[1]
  if (slot === "focusScripts") return "focus"
  if (slot === "signatureScripts") return "signature"
  if (slot === "affixScripts") return "affix"
  return undefined
}

export function getScribingSourceSubRows(scriptType: ScriptType): ScribingSourceSubRow[] {
  const achievements = getSavedVariables().account.achievements
  if (achievements === undefined) return []

  const rows: ScribingSourceSubRow[] = []
  const knownLoreBooks = currentKnownLoreBooks()

  for (const source of SCRIBING_SOURCES) {
    if (source.scriptType !== scriptType) continue
    const unlearnedMotifStyles = countUnlearnedMotifStyles(source.slug, knownLoreBooks)

    for (const ach of source.achievements) {
      const entry = achievements[ach.achievementId]
      if (entry?.completed) continue

      if (entry === undefined) {
        rows.push({
          label: source.label,
          achievementName: ach.name,
          current: 0,
          total: 1,
          unlearnedMotifStyles,
        })
        break
      }

      const cp = entry.criteriaProgress
      const criteria = cp.criteria === undefined ? [] : Object.entries(cp.criteria)
      let current = 0
      let total = 0
      for (const [, c] of criteria) {
        current += c.numCompleted
        total += c.numRequired
      }

      if (total > 1) {
        rows.push({
          label: source.label,
          achievementName: ach.name,
          current,
          total,
          unlearnedMotifStyles,
        })
        break
      }

      rows.push({
        label: source.label,
        achievementName: ach.name,
        current: 0,
        total: cp.totalSteps <= 1 ? 1 : cp.totalSteps,
        unlearnedMotifStyles,
      })
      break
    }
  }

  return rows
}

const GUILD_DAILY_FALLBACK: Record<ScriptType, { label: string; slug: string }> = {
  focus: { label: "Mages Guild Daily", slug: magesGuildDaily.slug },
  signature: { label: "Fighters Guild Daily", slug: fightersGuildDaily.slug },
  affix: { label: "Undaunted Delve Daily", slug: undauntedDelveDailies.slug },
}

export function getScribingGuildDailyFallback(scriptType: ScriptType): ScribingGuildDailyFallback {
  const fallback = GUILD_DAILY_FALLBACK[scriptType]
  return {
    label: fallback.label,
    unlearnedMotifStyles: countUnlearnedMotifStyles(fallback.slug, currentKnownLoreBooks()),
  }
}
