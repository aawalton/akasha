import type { CharacterCompletion } from "@akasha/temper-completion/completion-progress"
import type { AnyCompletionCardId } from "../completion-card-id/completion-card-id.module.code.ts"
import { characterCheckerFor } from "../completion-item-picker/completion-item-picker.module.code.ts"

export interface NextCharacterInput {
  id: string
  name: string
  sortOrder: number | null
  completion: CharacterCompletion | null
}

export interface CompletionCharacterEntry extends NextCharacterInput {
  firstName: string
}

export interface NextCharacterResult {
  characterId: string
  characterName: string
}

export function resolveNextCharacter(
  characters: readonly NextCharacterInput[],
  cardId: AnyCompletionCardId,
  itemPath?: readonly (string | number)[] | null
): NextCharacterResult | null {
  const checker = characterCheckerFor(cardId)
  if (!checker) return null

  const sorted = [...characters].sort((a, b) => {
    const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER
    const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.name.localeCompare(b.name)
  })

  const isItemComplete = checker.isItemComplete
  const checkComplete =
    itemPath != null && itemPath.length > 0 && isItemComplete != null
      ? (completion: CharacterCompletion | null) => isItemComplete(completion, itemPath)
      : (completion: CharacterCompletion | null) => checker.isCardComplete(completion)

  for (const character of sorted) {
    if (!checkComplete(character.completion)) {
      return { characterId: character.id, characterName: character.name }
    }
  }

  return null
}
