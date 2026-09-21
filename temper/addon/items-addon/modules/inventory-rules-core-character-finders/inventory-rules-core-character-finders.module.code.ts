import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import {
  knownChapterCountForStyleByCharData,
  knowsMotifByCharData,
} from "akasha/temper/addon/items-addon/modules/inventory-rules-core-motif-knowledge/inventory-rules-core-motif-knowledge.module.code.ts"
import { getTemperCharactersData } from "akasha/temper/addon/items-addon/modules/inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
import { STYLE_TO_CHAPTERS } from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"
import { parseMotifBookName } from "akasha/temper/items/core/modules/motif-name-parser/motif-name-parser.module.code.ts"
import type {
  CharacterId,
  ItemKey,
  UseDestinationContext,
} from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"

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
