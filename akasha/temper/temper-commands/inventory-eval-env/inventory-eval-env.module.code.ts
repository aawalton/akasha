import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"
import type { EvalEnv } from "@akasha/temper-items-rules-eval/eval-env"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CharacterKnowledge } from "../inventory-characters-reading/inventory-characters-reading.module.code.ts"

export interface CliEvalEnvDeps {
  readonly charactersById: ReadonlyMap<string, CharacterKnowledge>
  readonly characterPriority: ReadonlyArray<string>
  readonly wantedConsumables: Record<string, unknown>
}

/**
 * `STYLE_TO_CHAPTERS` is typed as total over `number`, but it is a lookup table
 * with gaps: a style id it has never heard of reads back `undefined`. The
 * `| undefined` here is what is actually true.
 */
function chaptersOfStyle(styleId: number): readonly number[] | undefined {
  return STYLE_TO_CHAPTERS[styleId]
}

const UNKNOWN = "unknown"

export function buildCliEvalEnv(deps: CliEvalEnvDeps): EvalEnv {
  const { charactersById, characterPriority, wantedConsumables } = deps
  return {
    isKnownByCharacter: (itemKey, charId) => knowsItemForChar(charactersById, charId, itemKey),
    isKnownByAnyCharacter: (itemKey) => {
      for (const charId of charactersById.keys()) {
        if (knowsItemForChar(charactersById, charId, itemKey)) return true
      }
      return false
    },

    getCharacterPriority: () => characterPriority,
    getCurrentCharacter: () => UNKNOWN,
    getAllCharacters: () => Array.from(charactersById.keys()),

    getConsumableWanters: (itemId) => {
      if (
        Object.hasOwn(wantedConsumables, String(itemId)) ||
        Object.hasOwn(wantedConsumables, itemId.toString())
      ) {
        return []
      }
      return []
    },
    getConsumableStock: () => UNKNOWN,
    getBankStock: () => UNKNOWN,

    getKnownScripts: (charId) => {
      const held = charactersById.get(charId)
      if (held === undefined) return new Set<number>()
      return held.unlockedScriptIds
    },
    getTotalScriptCount: () => UNKNOWN,

    isTraitResearched: () => UNKNOWN,
    isCraftingRankBelowCap: () => UNKNOWN,
    matchesWantedEquipment: () => UNKNOWN,
    matchesWantedCompanionEquipment: () => UNKNOWN,
    isCompanionWornSlotFilled: () => UNKNOWN,
    findCharacterForWantedEquipment: () => UNKNOWN,
    findCompanionForWantedEquipment: () => UNKNOWN,
    getCooldownGroup: () => UNKNOWN,
    isCooldownExpired: () => UNKNOWN,
    getTransmuteCrystalAmount: () => UNKNOWN,
    getTransmuteCrystalCap: () => UNKNOWN,
  }
}

function knowsItemForChar(
  charactersById: ReadonlyMap<string, CharacterKnowledge>,
  charId: string,
  itemKey: ItemKey
): boolean {
  const held = charactersById.get(charId)
  if (held === undefined) return false
  switch (itemKey.kind) {
    case "recipe":
      return held.recipeResultItemIds.has(itemKey.resultItemId)
    case "motif": {
      const knownChapters =
        held.motifKnowledgeByStyle.get(itemKey.styleId) ??
        held.motifChaptersByStyle.get(itemKey.styleId)
      if (knownChapters === undefined) return false
      if (itemKey.chapterId === null) {
        const styleChapters = chaptersOfStyle(itemKey.styleId)
        if (styleChapters === undefined || styleChapters.length === 0) return false
        return knownChapters.size === styleChapters.length
      }
      return knownChapters.has(itemKey.chapterId)
    }
    case "script":
      return held.unlockedScriptIds.has(itemKey.scriptId)
    case "consumable":
      return false
    default:
      return assertNever(itemKey)
  }
}
