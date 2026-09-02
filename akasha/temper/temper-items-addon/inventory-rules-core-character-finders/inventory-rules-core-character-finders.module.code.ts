import { STYLE_TO_CHAPTERS } from "@akasha/temper-items-core/motif-chapter-set"
import { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"
import {
  claimItemForCharacter,
  resolveUseDestination,
} from "@akasha/temper-items-rules-core/use-destination-resolver"
import {
  type CharacterId,
  characterId,
  type ItemKey,
  type UseDestinationContext,
} from "@akasha/temper-items-rules-core/use-destination-types"
import { asObjectRecord } from "@akasha/utils-narrow/as-object-record"
import { buildCompiledCharacterPriority } from "../inventory-character-priority/inventory-character-priority.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import {
  characterNeedsTrait,
  inferDeconCraftingType,
  isDeconUsefulForCharacter,
  isDeconUsefulForCurrent,
} from "../inventory-rules-core-inspire/inventory-rules-core-inspire.module.code.ts"
import {
  knownChapterCountForStyleByCharData,
  knowsMotifByCharData,
} from "../inventory-rules-core-motif-knowledge/inventory-rules-core-motif-knowledge.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
export function findInspireCharacterIdByPriority(itemLink: string): string | undefined {
  const craftingType = inferDeconCraftingType(itemLink)
  if (craftingType === CRAFTING_TYPE_INVALID) return undefined

  const compiled = getCompiledConfig()
  if (!compiled?.characterPriority || compiled.characterPriority.length === 0) {
    if (isDeconUsefulForCurrent(craftingType)) {
      return tostring(GetCurrentCharacterId())
    }
    return undefined
  }

  const currentId = tostring(GetCurrentCharacterId())

  for (const charId of compiled.characterPriority) {
    if (charId === currentId) {
      if (isDeconUsefulForCurrent(craftingType)) return charId
    } else {
      if (isDeconUsefulForCharacter(craftingType, charId)) return charId
    }
  }

  return undefined
}

export function buildUnlockItemKey(itemLink: string, itemType: number): ItemKey | undefined {
  if (itemType === ITEMTYPE_RECIPE) {
    const resultLink = GetItemLinkRecipeResultItemLink(itemLink, LINK_STYLE_BRACKETS)
    if (resultLink === "") return undefined
    const resultItemId = GetItemLinkItemId(resultLink)
    if (resultItemId === 0) return undefined
    return { kind: "recipe", resultItemId }
  }

  const useType = GetItemLinkItemUseType(itemLink)
  if (useType === ITEM_USE_TYPE_CRAFTED_ABILITY_SCRIPT) {
    const scriptId = GetItemLinkItemUseReferenceId(itemLink)
    if (scriptId === 0) return undefined
    return { kind: "script", scriptId }
  }

  const [, specializedType] = GetItemLinkItemType(itemLink)
  if (
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_BOOK ||
    specializedType === SPECIALIZED_ITEMTYPE_RACIAL_STYLE_MOTIF_CHAPTER
  ) {
    const rawName = GetItemLinkName(itemLink)
    const name = zo_strformat("<<1>>", rawName)
    const parsed = parseMotifBookName(name)
    if (parsed === undefined) return undefined
    return { kind: "motif", styleId: parsed.styleId, chapterId: parsed.chapterId }
  }

  return undefined
}

export function buildUnlockContext(
  characterPriority: ReadonlyArray<CharacterId>,
  currentId: CharacterId,
  itemLink: string
): UseDestinationContext {
  const characters = getTemperCharactersData()
  return {
    characterPriority,
    knowsItem: (charId, itemKey) => {
      if (charId === currentId) {
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
      if (!characters) return true
      const charData = asObjectRecord(characters[charId])
      if (!charData) return true
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
    },
    knownChapterCountForStyle: (charId, styleId) => {
      if (charId === currentId) {
        const styleChapters = STYLE_TO_CHAPTERS[styleId]
        if (styleChapters === undefined || styleChapters.length === 0) return 0
        let count = 0
        for (const chapter of styleChapters) {
          if (IsSmithingStyleKnown(styleId, chapter)) count++
        }
        return count
      }
      if (!characters) return 0
      const charData = asObjectRecord(characters[charId])
      if (!charData) return 0
      return knownChapterCountForStyleByCharData(charData, styleId)
    },
  }
}

export function findUnlockCharacterIdByPriority(
  itemLink: string,
  itemType: number,
  claims?: Map<CharacterId, Set<string>>
): string | undefined {
  const useType = GetItemLinkItemUseType(itemLink)
  if (useType === ITEM_USE_TYPE_COLLECTIBLE_GRANT) {
    const collectibleId = GetItemLinkItemUseReferenceId(itemLink)
    if (IsCollectibleUnlocked(collectibleId)) return undefined
    return tostring(GetCurrentCharacterId())
  }

  const [, specializedType] = GetItemLinkItemType(itemLink)

  if (
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_COLLECTIBLE_FRAGMENT ||
    specializedType === SPECIALIZED_ITEMTYPE_TROPHY_RUNEBOX_FRAGMENT
  ) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    if (!CanCombinationFragmentBeUnlocked(grantedCollectibleId)) return undefined
    return tostring(GetCurrentCharacterId())
  }

  if (specializedType === SPECIALIZED_ITEMTYPE_COLLECTIBLE_STYLE_PAGE) {
    const grantedCollectibleId = GetItemLinkContainerCollectibleId(itemLink)
    if (grantedCollectibleId === 0) return undefined
    if (IsCollectibleUnlocked(grantedCollectibleId)) return undefined
    return tostring(GetCurrentCharacterId())
  }

  const itemKey = buildUnlockItemKey(itemLink, itemType)
  if (itemKey === undefined) return undefined

  const currentIdStr = tostring(GetCurrentCharacterId())
  const currentId = characterId(currentIdStr)
  const priority = buildCompiledCharacterPriority(currentId)

  const ctx = buildUnlockContext(priority, currentId, itemLink)
  const claimsMap: ReadonlyMap<CharacterId, ReadonlySet<string>> = claims ??
  new Map<CharacterId, Set<string>>()
  const resolved = resolveUseDestination(itemKey, ctx, claimsMap)
  if (resolved === undefined) return undefined
  if (claims !== undefined) {
    claimItemForCharacter(claims, resolved, itemKey)
  }
  return resolved
}

export function findResearchCharacterIdByPriority(itemLink: string): string | undefined {
  const compiled = getCompiledConfig()
  if (!compiled?.characterPriority || compiled.characterPriority.length === 0) {
    if (CanItemLinkBeTraitResearched(itemLink)) {
      return tostring(GetCurrentCharacterId())
    }
    return undefined
  }

  const currentId = tostring(GetCurrentCharacterId())
  const traitType = GetItemLinkTraitType(itemLink)
  if (traitType === 0) return undefined
  const craftingType = GetItemLinkCraftingSkillType(itemLink)
  if (craftingType === 0) return undefined
  const traitName = GetString("SI_ITEMTRAITTYPE", traitType)

  const characters = getTemperCharactersData()

  for (const charId of compiled.characterPriority) {
    if (charId === currentId) {
      if (CanItemLinkBeTraitResearched(itemLink)) return charId
    } else {
      if (!characters) continue
      const charData = asObjectRecord(characters[charId])
      if (!charData) continue
      if (characterNeedsTrait(charData, craftingType, traitName)) return charId
    }
  }

  return undefined
}

export function findConsumableCharacterIdByPriority(
  itemId: number,
  claims?: Map<CharacterId, Set<string>>
): string | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const wantedChars = compiled.wantedConsumables[itemId]
  if (!wantedChars || wantedChars.length === 0) return undefined

  const priority: ReadonlyArray<CharacterId> = wantedChars.map((id) => characterId(id))
  const ctx: UseDestinationContext = {
    characterPriority: priority,
    knowsItem: () => false,
    knownChapterCountForStyle: () => 0,
  }
  const itemKey: ItemKey = { kind: "consumable", itemId }
  const claimsMap: ReadonlyMap<CharacterId, ReadonlySet<string>> = claims ??
  new Map<CharacterId, Set<string>>()
  const resolved = resolveUseDestination(itemKey, ctx, claimsMap)
  if (resolved !== undefined && claims !== undefined) {
    claimItemForCharacter(claims, resolved, itemKey)
  }
  return resolved
}

export function findEquipCharacterIdByPriority(itemLink: string): string | undefined {
  const compiled = getCompiledConfig()
  if (!compiled || compiled.wantedEquipment.length === 0) return undefined

  const equipType = GetItemLinkEquipType(itemLink)
  const traitType = GetItemLinkTraitType(itemLink)
  if (equipType === 0 || traitType === 0) return undefined

  const armorType = GetItemLinkArmorType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const quality = GetItemLinkDisplayQuality(itemLink)

  for (const sig of compiled.wantedEquipment) {
    if (sig.equipType !== equipType) continue
    if (sig.traitType !== traitType) continue
    if (sig.quality !== quality) continue
    if (sig.armorType !== undefined && sig.armorType !== armorType) continue
    if (sig.weaponType !== undefined && sig.weaponType !== weaponType) continue
    return sig.esoCharId
  }

  return undefined
}
