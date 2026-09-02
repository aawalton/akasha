import { findCooldownGroup } from "@akasha/temper-items-core/cooldown-groups"
import { isCraftingRankBelowCap } from "@akasha/temper-items-core/crafting-passive-ranks"
import { signatureMatchesItem } from "@akasha/temper-items-core/equipment-signature-matcher"
import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { TOTAL_SCRIPT_COUNT } from "@akasha/temper-items-rules-core/scribing-total-script-count"
import type { EvalEnv, WantedEquipmentFacts } from "@akasha/temper-items-rules-eval/eval-env"
import { assertNever } from "@akasha/utils-narrow/assert-never"

export interface WebEnvExtras {
  readonly itemIdToCooldownGroup?: ReadonlyMap<number, string>
}

export function buildWebEvalEnv(
  ctx: RuleMatcherContext | undefined,
  extras: WebEnvExtras = {}
): EvalEnv {
  if (ctx === undefined) return UNKNOWN_ENV
  const itemIdToCooldownGroup = extras.itemIdToCooldownGroup
  return {
    isKnownByCharacter: (itemKey, charId) => {
      switch (itemKey.kind) {
        case "recipe": {
          const recipes = ctx.knownRecipesByCharacter.get(charId)
          if (recipes === undefined) return false
          return recipes.has(itemKey.resultItemId)
        }
        case "motif": {
          const knownChapters = lookupKnownMotifChapters(ctx, charId, itemKey.styleId)
          if (knownChapters === undefined) return false
          if (itemKey.chapterId === null) {
            const styleChapters = STYLE_TO_CHAPTERS[itemKey.styleId]
            if (styleChapters === undefined || styleChapters.length === 0) return false
            return knownChapters.size === styleChapters.length
          }
          return knownChapters.has(itemKey.chapterId)
        }
        case "script": {
          const scripts = ctx.knownScriptsByCharacter.get(charId)
          if (scripts === undefined) return false
          return scripts.has(itemKey.scriptId)
        }
        case "consumable":
          return false
        default:
          return assertNever(itemKey)
      }
    },
    isKnownByAnyCharacter: (itemKey) => {
      const characters = collectAllCharacterIds(ctx)
      for (const charId of characters) {
        switch (itemKey.kind) {
          case "recipe": {
            if (ctx.knownRecipesByCharacter.get(charId)?.has(itemKey.resultItemId)) return true
            break
          }
          case "motif": {
            const knownChapters = lookupKnownMotifChapters(ctx, charId, itemKey.styleId)
            if (knownChapters !== undefined) {
              if (itemKey.chapterId === null) {
                const styleChapters = STYLE_TO_CHAPTERS[itemKey.styleId]
                if (
                  styleChapters !== undefined &&
                  styleChapters.length > 0 &&
                  knownChapters.size === styleChapters.length
                ) {
                  return true
                }
              } else if (knownChapters.has(itemKey.chapterId)) {
                return true
              }
            }
            break
          }
          case "script": {
            if (ctx.knownScriptsByCharacter.get(charId)?.has(itemKey.scriptId)) return true
            break
          }
          case "consumable":
            return false
          default:
            return assertNever(itemKey)
        }
      }
      return false
    },

    isTraitResearched: (charId, craftingType, traitName) => {
      const charMap = ctx.researchedTraitsByCharacter.get(charId)
      if (charMap === undefined) return "unknown"
      const craftMap = charMap.get(craftingType)
      if (craftMap === undefined) return "unknown"
      const known = craftMap.get(traitName.toLowerCase())
      if (known === undefined) return "unknown"
      return known
    },

    isCraftingRankBelowCap: (charId, craftingType) => {
      const charMap = ctx.craftingLevels.get(charId)
      if (charMap === undefined) return "unknown"
      const rank = charMap.get(craftingType)
      if (rank === undefined) return "unknown"
      return isCraftingRankBelowCap(rank, craftingType)
    },

    matchesWantedEquipment: (facts) => {
      const item = factsToMatchable(facts)
      for (const sig of ctx.wantedEquipment) {
        if (signatureMatchesItem(sig, item)) return true
      }
      return false
    },
    matchesWantedCompanionEquipment: (facts) => {
      const item = factsToMatchable(facts)
      for (const sig of ctx.wantedCompanionEquipment) {
        if (signatureMatchesItem(sig, item)) return true
      }
      return false
    },
    isCompanionWornSlotFilled: () => "unknown",
    findCharacterForWantedEquipment: (facts) => {
      const item = factsToMatchable(facts)
      for (const sig of ctx.wantedEquipment) {
        if (signatureMatchesItem(sig, item)) return sig.esoCharId
      }
      return undefined
    },
    findCompanionForWantedEquipment: (facts) => {
      const item = factsToMatchable(facts)
      for (const sig of ctx.wantedCompanionEquipment) {
        if (signatureMatchesItem(sig, item)) return sig.companionName
      }
      return undefined
    },

    getConsumableStock: (itemId, charId) => {
      const charStock = ctx.consumableStock.get(itemId)
      if (charStock === undefined) return 0
      return charStock.get(charId) ?? 0
    },
    getConsumableWanters: (itemId) => {
      return ctx.wantedConsumables.get(itemId) ?? []
    },
    getBankStock: (itemId) => {
      return ctx.bankStock.get(itemId) ?? 0
    },

    getCooldownGroup: (itemId) => {
      if (itemIdToCooldownGroup === undefined) return null
      const group = itemIdToCooldownGroup.get(itemId)
      return group ?? null
    },
    isCooldownExpired: (groupKey) => {
      const expiresAt = ctx.openCooldowns.get(groupKey)
      if (expiresAt === undefined) return true
      return Date.now() >= expiresAt
    },
    getTransmuteCrystalAmount: () =>
      ctx.transmuteCrystalAmount === undefined ? "unknown" : ctx.transmuteCrystalAmount,
    getTransmuteCrystalCap: () =>
      ctx.transmuteCrystalCap === undefined ? "unknown" : ctx.transmuteCrystalCap,

    getKnownScripts: (charId) => {
      const scripts = ctx.knownScriptsByCharacter.get(charId)
      if (scripts === undefined) return new Set<number>()
      return scripts
    },
    getTotalScriptCount: () => TOTAL_SCRIPT_COUNT,

    getCharacterPriority: () => ctx.characterPriority,
    getCurrentCharacter: () => "unknown",
    getAllCharacters: () => collectAllCharacterIds(ctx),
  }
}

const UNKNOWN_ENV: EvalEnv = {
  isKnownByCharacter: () => "unknown",
  isKnownByAnyCharacter: () => "unknown",
  isTraitResearched: () => "unknown",
  isCraftingRankBelowCap: () => "unknown",
  matchesWantedEquipment: () => "unknown",
  matchesWantedCompanionEquipment: () => "unknown",
  isCompanionWornSlotFilled: () => "unknown",
  findCharacterForWantedEquipment: () => "unknown",
  findCompanionForWantedEquipment: () => "unknown",
  getConsumableStock: () => "unknown",
  getConsumableWanters: () => "unknown",
  getBankStock: () => "unknown",
  getCooldownGroup: () => "unknown",
  isCooldownExpired: () => "unknown",
  getTransmuteCrystalAmount: () => "unknown",
  getTransmuteCrystalCap: () => "unknown",
  getKnownScripts: () => "unknown",
  getTotalScriptCount: () => "unknown",
  getCharacterPriority: () => "unknown",
  getCurrentCharacter: () => "unknown",
  getAllCharacters: () => "unknown",
}

export function buildItemIdToCooldownGroup(
  classifiedItems: readonly ClassifiedInventoryItem[]
): ReadonlyMap<number, string> {
  const result = new Map<number, string>()
  for (const ci of classifiedItems) {
    if (ci.item.isContainer !== true) continue
    if (result.has(ci.item.itemId)) continue
    const group = findCooldownGroup({ itemName: ci.item.itemName })
    if (group !== undefined) result.set(ci.item.itemId, group.key)
  }
  return result
}

function factsToMatchable(facts: WantedEquipmentFacts): {
  equipType: number
  traitType: number
  quality: number
  armorType?: number
  weaponType?: number
} {
  return {
    equipType: facts.equipType,
    traitType: facts.traitType,
    quality: facts.quality,
    armorType: facts.armorType,
    weaponType: facts.weaponType,
  }
}

function lookupKnownMotifChapters(
  ctx: RuleMatcherContext,
  charId: string,
  styleId: number
): ReadonlySet<number> | undefined {
  const byStyleId = ctx.knownMotifsByStyleIdByCharacter.get(charId)?.get(styleId)
  if (byStyleId !== undefined) return byStyleId
  return ctx.knownMotifsByCharacter.get(charId)?.get(styleId)
}

function collectAllCharacterIds(ctx: RuleMatcherContext): readonly string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const id of ctx.characterPriority) {
    if (seen.has(id)) continue
    seen.add(id)
    result.push(id)
  }
  const sources: ReadonlyArray<ReadonlyMap<string, unknown>> = [
    ctx.knownRecipesByCharacter,
    ctx.knownMotifsByCharacter,
    ctx.knownMotifsByStyleIdByCharacter,
    ctx.knownScriptsByCharacter,
    ctx.researchedTraitsByCharacter,
    ctx.craftingLevels,
    ctx.characterLevels,
  ]
  for (const map of sources) {
    for (const id of map.keys()) {
      if (seen.has(id)) continue
      seen.add(id)
      result.push(id)
    }
  }
  return result
}
