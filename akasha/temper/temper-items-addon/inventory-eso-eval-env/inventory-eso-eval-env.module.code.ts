import { signatureMatchesItem } from "@akasha/temper-items-core/equipment-signature-matcher"
import type { ItemKey } from "@akasha/temper-items-rules-core/use-destination-types"
import type { EvalEnv } from "@akasha/temper-items-rules-eval/eval-env"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { isCompanionWornSlotFilled } from "../inventory-rules-core-character-finders-companion/inventory-rules-core-character-finders-companion.module.code.ts"
import {
  characterNeedsTrait,
  isDeconUsefulForCharacter,
  isDeconUsefulForCurrent,
} from "../inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"
import { knowsMotifByCharData } from "../inventory-rules-core-motif-knowledge/inventory-rules-core-motif-knowledge.module.code.ts"
import { bankCountInBag } from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { countScripts } from "../inventory-scribing-knowledge/inventory-scribing-knowledge.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"

function knowsItemKeyForCurrent(itemKey: ItemKey, itemLink: string | undefined): boolean {
  if (itemLink !== undefined && itemLink !== "") {
    switch (itemKey.kind) {
      case "recipe":
        return IsItemLinkRecipeKnown(itemLink)
      case "motif":
        return IsItemLinkBookKnown(itemLink)
      case "script":
        return IsCraftedAbilityScriptUnlocked(itemKey.scriptId)
      case "consumable":
        return false
      default:
        throw new Error("unexpected itemKey.kind")
    }
  }
  return knowsItemKeyForOther(itemKey, tostring(GetCurrentCharacterId()))
}

function knowsItemKeyForOther(itemKey: ItemKey, charId: string): boolean {
  const characters = getTemperCharactersData()
  if (!characters) return false
  const charData = asObjectRecord(characters[charId])
  if (!charData) return false
  switch (itemKey.kind) {
    case "recipe": {
      const recipes = asObjectRecord(charData["recipes"])
      if (!recipes) return false
      for (const listValue of Object.values(recipes)) {
        if (Array.isArray(listValue)) {
          for (const id of listValue) {
            if (id === itemKey.resultItemId) return true
          }
        } else {
          const listRecord = asObjectRecord(listValue)
          if (listRecord) {
            for (const v of Object.values(listRecord)) {
              if (v === itemKey.resultItemId) return true
            }
          }
        }
      }
      return false
    }
    case "motif":
      return knowsMotifByCharData(charData, itemKey.styleId, itemKey.chapterId)
    case "script": {
      const scribing = asObjectRecord(charData["scribing"])
      const scripts = asObjectRecord(scribing?.scripts)
      if (!scripts) return false
      const entry = asObjectRecord(scripts[itemKey.scriptId])
      return entry?.unlocked === true
    }
    case "consumable":
      return false
    default:
      throw new Error("unexpected itemKey.kind")
  }
}

function getKnownScriptsForCurrent(): Set<number> {
  const result = new Set<number>()
  const numAbilities = GetNumCraftedAbilities()
  for (let i = 1; i <= numAbilities; i++) {
    const craftedAbilityId = GetCraftedAbilityIdAtIndex(i)
    if (craftedAbilityId === 0) continue
    const slots = [SCRIBING_SLOT_PRIMARY, SCRIBING_SLOT_SECONDARY, SCRIBING_SLOT_TERTIARY]
    for (const slot of slots) {
      const numScripts = GetNumScriptsInSlotForCraftedAbility(craftedAbilityId, slot)
      for (let j = 1; j <= numScripts; j++) {
        const scriptId = GetScriptIdAtSlotIndexForCraftedAbility(craftedAbilityId, slot, j)
        if (scriptId === 0) continue
        if (IsCraftedAbilityScriptUnlocked(scriptId)) result.add(scriptId)
      }
    }
  }
  return result
}

function getKnownScriptsForOther(charId: string): Set<number> {
  const result = new Set<number>()
  const characters = getTemperCharactersData()
  if (!characters) return result
  const charData = asObjectRecord(characters[charId])
  if (!charData) return result
  const scribing = asObjectRecord(charData["scribing"])
  const scripts = asObjectRecord(scribing?.scripts)
  if (!scripts) return result
  for (const [scriptIdStr, entry] of Object.entries(scripts)) {
    const e = asObjectRecord(entry)
    if (!e || e.unlocked !== true) continue
    const scriptId = tonumber(scriptIdStr)
    if (scriptId !== undefined) result.add(scriptId)
  }
  return result
}

export function buildEsoEvalEnv(): EvalEnv {
  const compiled = getCompiledConfig()
  const currentId = tostring(GetCurrentCharacterId())

  return {
    isKnownByCharacter: (itemKey, charId) => {
      if (charId === currentId) return knowsItemKeyForCurrent(itemKey, undefined)
      return knowsItemKeyForOther(itemKey, charId)
    },
    isKnownByAnyCharacter: (itemKey) => {
      const priority = compiled?.characterPriority
      if (priority && priority.length > 0) {
        for (const charId of priority) {
          if (charId === currentId) {
            if (knowsItemKeyForCurrent(itemKey, undefined)) return true
          } else {
            if (knowsItemKeyForOther(itemKey, charId)) return true
          }
        }
        return false
      }
      return knowsItemKeyForCurrent(itemKey, undefined)
    },

    isTraitResearched: (charId, craftingType, traitName) => {
      const characters = getTemperCharactersData()
      if (!characters) return "unknown"
      const charData = asObjectRecord(characters[charId])
      if (!charData) return false
      return !characterNeedsTrait(charData, craftingType, traitName)
    },

    isCraftingRankBelowCap: (charId, craftingType) => {
      if (charId === currentId) return isDeconUsefulForCurrent(craftingType)
      return isDeconUsefulForCharacter(craftingType, charId)
    },

    matchesWantedEquipment: (facts) => {
      if (!compiled) return false
      for (const sig of compiled.wantedEquipment) {
        if (signatureMatchesItem(sig, facts)) return true
      }
      return false
    },
    matchesWantedCompanionEquipment: (facts) => {
      if (!compiled) return false
      for (const sig of compiled.wantedCompanionEquipment) {
        if (signatureMatchesItem(sig, facts)) return true
      }
      return false
    },
    isCompanionWornSlotFilled: (companionName, facts) =>
      isCompanionWornSlotFilled(
        companionName,
        facts.equipType,
        facts.traitType,
        facts.quality,
        facts.armorType,
        facts.weaponType
      ),
    findCharacterForWantedEquipment: (facts) => {
      if (!compiled) return undefined
      for (const sig of compiled.wantedEquipment) {
        if (signatureMatchesItem(sig, facts)) return sig.esoCharId
      }
      return undefined
    },
    findCompanionForWantedEquipment: (facts) => {
      if (!compiled) return undefined
      for (const sig of compiled.wantedCompanionEquipment) {
        if (!signatureMatchesItem(sig, facts)) continue
        if (
          isCompanionWornSlotFilled(
            sig.companionName,
            sig.equipType,
            sig.traitType,
            sig.quality,
            sig.armorType,
            sig.weaponType
          )
        )
          continue
        return sig.companionName
      }
      return undefined
    },

    getConsumableStock: (itemId, charId) => {
      if (charId === currentId) return bankCountInBag(BAG_BACKPACK, itemId, true)
      const stockByChar = compiled?.consumableStock[itemId]
      if (!stockByChar) return 0
      return stockByChar[charId] ?? 0
    },
    getConsumableWanters: (itemId) => {
      if (!compiled) return []
      return compiled.wantedConsumables[itemId] ?? []
    },
    getBankStock: (itemId) => {
      let total = bankCountInBag(BAG_BANK, itemId, true)
      if (IsESOPlusSubscriber()) total += bankCountInBag(BAG_SUBSCRIBER_BANK, itemId, true)
      return total
    },

    getCooldownGroup: () => null,
    isCooldownExpired: (groupKey) => {
      const sv = getSavedVariables()
      const expiry = sv.openCooldowns?.[groupKey]
      if (expiry === undefined) return true
      return GetTimeStamp() >= expiry
    },
    getTransmuteCrystalAmount: () => {
      if (CURT_TRANSMUTE_CRYSTALS === undefined) return "unknown"
      return GetCurrencyAmount(CURT_TRANSMUTE_CRYSTALS, CURRENCY_LOCATION_ACCOUNT)
    },
    getTransmuteCrystalCap: () => {
      if (CURT_TRANSMUTE_CRYSTALS === undefined) return "unknown"
      return GetMaxPossibleCurrency(CURT_TRANSMUTE_CRYSTALS, CURRENCY_LOCATION_ACCOUNT)
    },

    getKnownScripts: (charId) => {
      if (charId === currentId) return getKnownScriptsForCurrent()
      return getKnownScriptsForOther(charId)
    },
    getTotalScriptCount: () => countScripts().total,

    getCharacterPriority: () => {
      if (compiled?.characterPriority && compiled.characterPriority.length > 0) {
        return compiled.characterPriority
      }
      return [currentId]
    },
    getCurrentCharacter: () => currentId,
    getAllCharacters: () => {
      const characters = getTemperCharactersData()
      if (characters) {
        const ids: string[] = []
        for (const id of Object.keys(characters)) {
          ids.push(id)
        }
        if (ids.length > 0) return ids
      }
      if (compiled?.characterPriority && compiled.characterPriority.length > 0) {
        return compiled.characterPriority
      }
      return [currentId]
    },
  }
}
