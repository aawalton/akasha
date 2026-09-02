import {
  asNumber,
  asNumberArray,
  asRecord,
  asString,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  ChunkedData,
  ItemDescriptor,
  ItemInput,
} from "../knowledge-types/knowledge-types.module.code.ts"

function asItemDescriptor(value: ItemInput): ItemDescriptor {
  return value as ItemDescriptor
}

type MaybeChunkedData = ChunkedData | undefined
function asMaybeChunkedData(value: unknown): MaybeChunkedData {
  return value as MaybeChunkedData
}

type StyleIdReturn = number
function asStyleIdReturn(value: number | undefined): StyleIdReturn {
  return value as StyleIdReturn
}

INTERNAL.Msg = function (this: void, text: string): undefined {
  CHAT_ROUTER.AddSystemMessage(text)
}

INTERNAL.MsgTag = function (this: void, text: string): undefined {
  CHAT_ROUTER.AddSystemMessage(string.format("[%s] %s", INTERNAL.name, text))
}

INTERNAL.GetItemLink = function (this: void, itemId: number, linkStyle?: number): string {
  return string.format(
    "|H%d:item:%d:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
    linkStyle ?? LINK_STYLE_DEFAULT,
    itemId
  )
}

INTERNAL.GetCharRawData = function (this: void, server, charId, category) {
  const byServer = INTERNAL.characters[server]
  if (byServer === undefined) {
    return undefined
  }
  const byChar = byServer[charId]
  if (byChar === undefined) {
    return undefined
  }
  return asMaybeChunkedData(asRecord(byChar)[category])
}

INTERNAL.TranslateItem = function (this: void, item: ItemInput) {
  let itemId = 0
  let itemLink = ""
  let styleId = 0
  let styleIdSet = false

  if (type(item) === "number") {
    itemId = asNumber(item)
    itemLink = INTERNAL.GetItemLink(asNumber(item))
  } else if (type(item) === "string") {
    itemId = GetItemLinkItemId(asString(item))
    itemLink = asString(item)
  } else if (type(item) === "table") {
    const desc = asItemDescriptor(item)
    if (type(desc.styleId) === "number") {
      styleId = asNumber(desc.styleId)
      styleIdSet = true
      const data = INTERNAL.GetStyleMotifItems(styleId)
      if (data !== undefined) {
        if (type(desc.chapterId) === "number" && desc.chapterId !== ITEM_STYLE_CHAPTER_ALL) {
          itemId = data.chapters[asNumber(desc.chapterId)] ?? itemId
        } else {
          itemId = data.books[0] ?? itemId
        }
      }
    }
    if (type(desc.itemId) === "number") {
      itemId = asNumber(desc.itemId)
    }
    if (type(desc.itemLink) === "string") {
      itemLink = asString(desc.itemLink)
    }
    if (itemId === 0 && itemLink !== "") {
      itemId = GetItemLinkItemId(itemLink)
    } else if (itemId !== 0 && itemLink === "") {
      itemLink = INTERNAL.GetItemLink(itemId)
    }
  }

  return $multi(itemId, itemLink, asStyleIdReturn(styleIdSet ? styleId : undefined))
}

INTERNAL.GetItemCategoryAndQuality = function (this: void, item: ItemInput) {
  const [itemId, itemLink, styleId] = INTERNAL.TranslateItem(item)
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)

  if (itemType === ITEMTYPE_NONE) {
    if (styleId !== undefined) {
      return $multi(INTERNAL.CATEGORY_MOTIF, INTERNAL.GetStyleQuality(styleId))
    } else {
      return $multi(INTERNAL.CATEGORY_INVALID)
    }
  } else if (itemType === ITEMTYPE_RECIPE) {
    const quality = INTERNAL.ItemQualityTranslation[GetItemLinkFunctionalQuality(itemLink)]
    if (
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_FOOD ||
      specializedItemType === SPECIALIZED_ITEMTYPE_RECIPE_PROVISIONING_STANDARD_DRINK
    ) {
      return $multi(INTERNAL.CATEGORY_RECIPE, quality)
    } else {
      return $multi(INTERNAL.CATEGORY_PLAN, quality)
    }
  } else if (itemType === ITEMTYPE_RACIAL_STYLE_MOTIF) {
    const [motifStyleId] = INTERNAL.GetMotifStyleAndChapter(itemId)
    return $multi(INTERNAL.CATEGORY_MOTIF, INTERNAL.GetStyleQuality(motifStyleId))
  } else if (
    itemType === ITEMTYPE_CRAFTED_ABILITY ||
    itemType === ITEMTYPE_CRAFTED_ABILITY_SCRIPT
  ) {
    const refId = GetItemLinkItemUseReferenceId(itemLink)
    if (refId > 0) {
      if (itemType === ITEMTYPE_CRAFTED_ABILITY) {
        return $multi(INTERNAL.CATEGORY_SCRIBING, SCRIBING_SLOT_NONE, [itemLink, refId])
      } else {
        return $multi(INTERNAL.CATEGORY_SCRIBING, GetCraftedAbilityScriptScribingSlot(refId), [
          itemLink,
          refId,
        ])
      }
    }
  }

  return $multi(INTERNAL.CATEGORY_NONE)
}

INTERNAL.GetMasterListParam = function (this: void, key: string): number {
  const masterList = INTERNAL.vars.masterList
  if (masterList !== undefined && type(asRecord(masterList)[key]) === "number") {
    return asNumber(asRecord(masterList)[key])
  } else {
    return -1
  }
}

INTERNAL.CanSave = function (this: void, account?: string): boolean {
  const noSave = INTERNAL.vars.noSave
  if (noSave !== undefined && noSave[zo_strlower(account ?? INTERNAL.userId)] === true) {
    return false
  } else {
    return true
  }
}

INTERNAL.GetCaches = function (this: void, server, charId) {
  if (INTERNAL.caches[server] === undefined) {
    INTERNAL.caches[server] = {}
  }
  if (INTERNAL.caches[server][charId] === undefined) {
    INTERNAL.caches[server][charId] = {}
  }
  return INTERNAL.caches[server][charId]
}

INTERNAL.GetKnowledge = function (this: void, server, charId, category) {
  const resolvedServer = server ?? INTERNAL.server

  const caches = INTERNAL.GetCaches(resolvedServer, charId)
  if (caches[category] === undefined) {
    caches[category] = {}
    const data = INTERNAL.GetCharRawData(resolvedServer, charId, category)
    if (data !== undefined) {
      const encoded = LCCC.Unchunk(data)
      let field = 0

      const idList = asNumberArray(INTERNAL.ids[category])

      caches[category][asNumber(idList[0])] = false

      for (const [i, id] of ipairs(idList)) {
        const j = ((i - 1) % INTERNAL.FIELD_BITS) + 1
        if (j === 1) {
          const k = zo_ceil(i / INTERNAL.ENCODE_BITS)
          ;[field] = LCCC.ReadAndDecode(encoded, k, INTERNAL.FIELD_BYTES)
        }
        const bit = BitLShift(1, INTERNAL.FIELD_BITS - j)
        if (BitAnd(field, bit) === bit) {
          caches[category][id] = true
        }
      }
    }
  }
  return caches[category]
}
