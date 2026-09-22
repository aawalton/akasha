import { ASSISTANT_COLLECTIBLES } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/assistant-collectibles/assistant-collectibles.module.code.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

declare const _G: Record<string, number | undefined>

export function createBindings(this: void): undefined {
  for (const collectibleId of Object.values(ASSISTANT_COLLECTIBLES)) {
    const [name] = GetCollectibleInfo(collectibleId)
    const stringId = `SI_BINDING_NAME_PERSONNALASSISTANT_${collectibleId}`
    const existing = _G[stringId]
    if (existing === undefined || GetString(existing) === "") {
      ZO_CreateStringId(stringId, ZO_CachedStrFormat(SI_COLLECTIBLE_NAME_FORMATTER, name))
    }
  }
  return undefined
}
