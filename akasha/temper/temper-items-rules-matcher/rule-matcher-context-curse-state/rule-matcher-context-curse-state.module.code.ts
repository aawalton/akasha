import type { CompletionCharacterInput } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"

function getCompletionField(completion: unknown, field: string): unknown {
  if (!isObjectRecord(completion)) return undefined
  return completion[field]
}

export function compileCurseStates(
  characters: readonly CompletionCharacterInput[]
): Map<string, "vampire" | "werewolf"> {
  const result = new Map<string, "vampire" | "werewolf">()
  for (const char of characters) {
    const curseState = getCompletionField(char.completion, "curseState")
    if (typeof curseState !== "string") continue
    if (curseState !== "vampire" && curseState !== "werewolf") continue
    result.set(char.esoCharacterId, curseState)
  }
  return result
}

export function buildGetCharacterCurseState(
  curseStatesByCharacter: ReadonlyMap<string, "vampire" | "werewolf">
): (charId: string) => "vampire" | "werewolf" | undefined {
  return (charId) => curseStatesByCharacter.get(charId)
}
