import { getCompiledConfig } from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  type CharacterId,
  characterId,
} from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"
import { carriesStorage } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function carriesStorageHere(): boolean {
  return carriesStorage(getCompiledConfig()?.characterPriority, tostring(GetCurrentCharacterId()))
}

export function buildCompiledCharacterPriority(
  currentChar: CharacterId
): ReadonlyArray<CharacterId> {
  const compiled = getCompiledConfig()
  const raw = compiled?.characterPriority
  const priority: CharacterId[] = []
  if (raw !== undefined) {
    for (const id of raw) priority.push(characterId(id))
  }
  if (priority.length === 0) return [currentChar]
  return priority
}
