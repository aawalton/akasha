import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import {
  type CompanionQuestPage,
  companionQuestGroupsOf,
  readCompanionQuestGroupsWith,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import {
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import {
  hasCompanionQuestLeft,
  pickFirstActionableCompanionQuest,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-actionability/completion-companion-quest-actionability.module.code.ts"

interface CompanionRapportSource {
  companionId: string
  defId: number
  name: string
  sources: readonly string[]
}

interface CompanionRapportPage {
  readonly key?: unknown
  readonly firstName?: unknown
  readonly esoCompanionId?: unknown
  readonly rapportDailies?: unknown
}

let heldSources: readonly CompanionRapportSource[] | null = null

function dailiesOf(rows: unknown): readonly string[] {
  const dailies: string[] = []
  if (!Array.isArray(rows)) return dailies
  for (const row of rows) {
    if (typeof row !== "object" || row === null) continue
    const { questName } = row as Record<string, unknown>
    if (typeof questName === "string") dailies.push(questName)
  }
  return dailies
}

function rapportSources(): readonly CompanionRapportSource[] {
  if (heldSources !== null) return heldSources
  const found: CompanionRapportSource[] = []
  for (const page of $pagesOfType<CompanionRapportPage>(temperEsoCompanion)) {
    const { key, firstName, esoCompanionId, rapportDailies } = page
    if (typeof key !== "string" || typeof esoCompanionId !== "number") continue
    if (!Array.isArray(rapportDailies)) continue
    found.push({
      companionId: key,
      defId: esoCompanionId,
      name: typeof firstName === "string" ? firstName : key,
      sources: dailiesOf(rapportDailies),
    })
  }
  found.sort((one, other) => (one.companionId < other.companionId ? -1 : 1))
  heldSources = found
  return found
}

readCompanionQuestGroupsWith(() =>
  companionQuestGroupsOf($pagesOfType<CompanionQuestPage>(temperEsoCompanion))
)

export function companionIdOfDefId(defId: number): string | undefined {
  return rapportSources().find((entry) => entry.defId === defId)?.companionId
}

function defIdOf(this: void, companionId: string): number | undefined {
  return rapportSources().find((entry) => entry.companionId === companionId)?.defId
}

export interface CompanionRapportEnrichment {
  companionName: string
  questName: string | undefined
  sources: readonly string[]
  currentPoints: number
}

export interface CompanionQuestEnrichment {
  companionName: string
  questName: string
}

export function pickFirstUnfinishedCompanion(
  rapport: Record<number, number> | undefined,
  completedQuestIds: ReadonlySet<number>
): CompanionRapportEnrichment | undefined {
  for (const entry of rapportSources()) {
    const raw = rapport?.[entry.defId]
    const currentPoints = raw === undefined ? 0 : clampRapportProgress(raw)
    const rapportLeft = currentPoints < MAX_COMPANION_RAPPORT
    if (!rapportLeft && !hasCompanionQuestLeft(entry.companionId, completedQuestIds)) continue
    const quest = pickFirstActionableCompanionQuest(
      completedQuestIds,
      rapport ?? {},
      defIdOf,
      entry.companionId
    )
    return {
      companionName: entry.name,
      questName: quest?.questName,
      sources: rapportLeft ? entry.sources : [],
      currentPoints,
    }
  }
  return undefined
}

export function pickFirstTakeableCompanionQuest(
  rapport: Record<number, number> | undefined,
  completedQuestIds: ReadonlySet<number>
): CompanionQuestEnrichment | undefined {
  const pick = pickFirstActionableCompanionQuest(completedQuestIds, rapport ?? {}, defIdOf)
  if (pick === undefined) return undefined
  return { companionName: pick.companionName, questName: pick.questName }
}
