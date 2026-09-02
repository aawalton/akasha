import type { CompletionOverride } from "@akasha/temper-player-completion/completion-override"
import type {
  CharactersConfigGlobal,
  SavedVariablesData,
  TaskData,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

export interface CharactersConfigView {
  characterPriority: SavedVariablesData["characterPriority"] | readonly string[]
  tasks: Record<string, TaskData>
  completionOverrides: Record<string, CompletionOverride[]>
}

function isCharactersConfig(value: unknown): value is CharactersConfigGlobal {
  if (!isObjectRecord(value)) return false
  return typeof value["version"] === "number"
}

function activeCharactersConfig(): CharactersConfigGlobal | undefined {
  const candidate: unknown = globalThis.TemperCharactersConfig
  if (!isCharactersConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return candidate
}

export function getCharactersConfig(): CharactersConfigView {
  const cfg = activeCharactersConfig()
  const sv = getSavedVariables()
  return {
    characterPriority: cfg?.characterPriority ?? sv.characterPriority,
    tasks: cfg?.tasks ?? sv.tasks,
    completionOverrides: cfg?.completionOverrides ?? sv.completionOverrides ?? {},
  }
}

export function getCompletionOverridesForCharacter(charId: string): CompletionOverride[] {
  return getCharactersConfig().completionOverrides[charId] ?? []
}
