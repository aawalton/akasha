import {
  asNumber,
  asNumberArray,
  asString,
} from "../knowledge-casts/knowledge-casts.module.code.ts"
import { LCCC } from "../knowledge-lccc/knowledge-lccc.module.code.ts"
import { INTERNAL, PUBLIC } from "../knowledge-state/knowledge-state.module.code.ts"
import type {
  Category,
  CharacterListEntry,
  CharacterRecord,
  Server,
} from "../knowledge-types/knowledge-types.module.code.ts"

function asCharacterRecord(value: CharacterRecord | undefined): CharacterRecord {
  return value as CharacterRecord
}

type CategoryByLuaIndex = Record<number, Category | undefined>
function asCategoryByLuaIndex(value: Category[]): CategoryByLuaIndex {
  return value as CategoryByLuaIndex
}

type ServerList = Server[]
function asServerList(value: Array<string | number>): ServerList {
  return value as ServerList
}

type Timestamp = number | undefined
function asTimestamp(value: unknown): Timestamp {
  return value as Timestamp
}

PUBLIC.ITEM_CATEGORY_NONE = 0
PUBLIC.ITEM_CATEGORY_RECIPE = 1
PUBLIC.ITEM_CATEGORY_PLAN = 2
PUBLIC.ITEM_CATEGORY_MOTIF = 3
PUBLIC.ITEM_CATEGORY_SCRIBING = 4

PUBLIC.ITEM_CATEGORIES = {
  [PUBLIC.ITEM_CATEGORY_RECIPE]: asString(INTERNAL.CategoryLabels[INTERNAL.CATEGORY_RECIPE]),
  [PUBLIC.ITEM_CATEGORY_PLAN]: asString(INTERNAL.CategoryLabels[INTERNAL.CATEGORY_PLAN]),
  [PUBLIC.ITEM_CATEGORY_MOTIF]: asString(INTERNAL.CategoryLabels[INTERNAL.CATEGORY_MOTIF]),
  [PUBLIC.ITEM_CATEGORY_SCRIBING]: asString(INTERNAL.CategoryLabels[INTERNAL.CATEGORY_SCRIBING]),
}

PUBLIC.KNOWLEDGE_INVALID = INTERNAL.KNOWLEDGE_INVALID
PUBLIC.KNOWLEDGE_NODATA = INTERNAL.KNOWLEDGE_NODATA
PUBLIC.KNOWLEDGE_KNOWN = INTERNAL.KNOWLEDGE_KNOWN
PUBLIC.KNOWLEDGE_UNKNOWN = INTERNAL.KNOWLEDGE_UNKNOWN

PUBLIC.EVENT_INITIALIZED = 1
PUBLIC.EVENT_UPDATE_REFRESH = 2

PUBLIC.GetServerList = function (this: void): Server[] {
  return asServerList(LCCC.GetSortedKeys(INTERNAL.characters, INTERNAL.server))
}

PUBLIC.GetFilteredServerList = function (this: void): Server[] {
  if (INTERNAL.cachedFilteredServerList === undefined) {
    const filtered: Server[] = []
    for (const [i, server] of ipairs(PUBLIC.GetServerList())) {
      const [firstKey] = next(PUBLIC.GetCharacterList(server))
      if (i === 1 || firstKey !== undefined) {
        filtered.push(server)
      }
    }
    INTERNAL.cachedFilteredServerList = filtered
  }
  return INTERNAL.cachedFilteredServerList
}

PUBLIC.GetCharacterList = function (this: void, server?: Server): CharacterListEntry[] {
  if (!INTERNAL.initialized) {
    return []
  }

  const resolvedServer = server ?? INTERNAL.server

  if (INTERNAL.cachedCharLists[resolvedServer] === undefined) {
    const results: CharacterListEntry[] = []

    const byServer = INTERNAL.characters[resolvedServer]
    if (byServer !== undefined) {
      const charIds: string[] = []
      for (const [id] of pairs(byServer)) {
        if (INTERNAL.IsCharacterEnabled(resolvedServer, id)) {
          charIds.push(id)
        }
      }
      INTERNAL.Sort(resolvedServer, charIds, true)

      for (const [, id] of ipairs(charIds)) {
        const data = asCharacterRecord(byServer[id])
        results.push({
          id: id,
          account: data.account,
          name: data.name,
        })
      }
    }

    INTERNAL.cachedCharLists[resolvedServer] = results
  }

  return INTERNAL.cachedCharLists[resolvedServer]
}

PUBLIC.GetItemLinkFromItemId = INTERNAL.GetItemLink

PUBLIC.GetItemName = function (this: void, item): string {
  let resolved = item
  if (type(resolved) === "number") {
    resolved = PUBLIC.GetItemLinkFromItemId(asNumber(resolved))
  } else if (type(resolved) !== "string") {
    return ""
  }
  return zo_strformat(SI_TOOLTIP_ITEM_NAME, GetItemLinkName(asString(resolved)))
}

const TRANSLATE_CATEGORY: Record<Category, number> = {
  [INTERNAL.CATEGORY_RECIPE]: PUBLIC.ITEM_CATEGORY_RECIPE,
  [INTERNAL.CATEGORY_PLAN]: PUBLIC.ITEM_CATEGORY_PLAN,
  [INTERNAL.CATEGORY_MOTIF]: PUBLIC.ITEM_CATEGORY_MOTIF,
  [INTERNAL.CATEGORY_SCRIBING]: PUBLIC.ITEM_CATEGORY_SCRIBING,
}

PUBLIC.GetItemCategory = function (this: void, item): number {
  const [category] = INTERNAL.GetItemCategoryAndQuality(item)

  if (category !== false && category !== undefined) {
    return asNumber(TRANSLATE_CATEGORY[category])
  } else {
    return PUBLIC.ITEM_CATEGORY_NONE
  }
}

PUBLIC.GetItemKnowledgeForCharacter = function (this: void, item, server?, charId?) {
  const [category] = INTERNAL.GetItemCategoryAndQuality(item)
  if (!INTERNAL.initialized) {
    return category !== false && category !== undefined
      ? PUBLIC.KNOWLEDGE_NODATA
      : PUBLIC.KNOWLEDGE_INVALID
  }
  const [itemId, itemLink, styleId] = INTERNAL.TranslateItem(item)
  return INTERNAL.GetItemKnowledge(
    server ?? INTERNAL.server,
    charId ?? INTERNAL.charId,
    category,
    itemId,
    itemLink,
    styleId
  )
}

PUBLIC.GetItemKnowledgeList = function (
  this: void,
  item,
  server?,
  includedCharIds?,
  accountFilter?
) {
  const results: CharacterListEntry[] = []

  const [category, qualityRaw] = INTERNAL.GetItemCategoryAndQuality(item)

  if (category !== false && category !== undefined) {
    const resolvedServer = server ?? INTERNAL.server
    const [itemId, itemLink, styleId] = INTERNAL.TranslateItem(item)

    let quality = qualityRaw
    if (category === INTERNAL.CATEGORY_SCRIBING) {
      quality = 1
    }

    for (const [, character] of ipairs(PUBLIC.GetCharacterList(resolvedServer))) {
      const included = includedCharIds !== undefined && includedCharIds[character.id] === true
      const qualified =
        included ||
        (INTERNAL.AccountFilter(accountFilter, character) === true &&
          INTERNAL.GetEffectiveParameterValue(resolvedServer, character.id, category) >
            asNumber(quality))
      if (qualified) {
        results.push({
          id: character.id,
          account: character.account,
          name: character.name,
          knowledge: INTERNAL.GetItemKnowledge(
            resolvedServer,
            character.id,
            category,
            itemId,
            itemLink,
            styleId
          ),
        })
      }
    }
  }

  return results
}

PUBLIC.IsKnowledgeUsable = function (this: void, knowledge): boolean {
  return knowledge === PUBLIC.KNOWLEDGE_KNOWN || knowledge === PUBLIC.KNOWLEDGE_UNKNOWN
}

PUBLIC.GetItemIdsForCategory = function (this: void, category): number[] {
  if (!INTERNAL.initialized) {
    return []
  }

  const categoryKey: Category | undefined =
    category !== undefined ? asCategoryByLuaIndex(INTERNAL.Categories)[category] : undefined

  if (categoryKey !== undefined) {
    let ids = INTERNAL.idsPublic[categoryKey]
    if (ids === undefined) {
      ids = []
      const blacklist = INTERNAL.InvalidIds
      for (const [, id] of ipairs(asNumberArray(INTERNAL.ids[categoryKey]))) {
        if (blacklist[id] !== true) {
          ids.push(id)
        }
      }
      INTERNAL.idsPublic[categoryKey] = ids
    }
    return ids
  } else {
    return []
  }
}

PUBLIC.GetSourceItemIdFromResultItem = function (this: void, resultItem): number {
  if (!INTERNAL.initialized) {
    return 0
  }

  if (INTERNAL.cachedResultIds === undefined) {
    const results: Record<number, number> = {}
    for (const [, category] of ipairs([PUBLIC.ITEM_CATEGORY_RECIPE, PUBLIC.ITEM_CATEGORY_PLAN])) {
      for (const [, itemId] of ipairs(PUBLIC.GetItemIdsForCategory(category))) {
        const resultId = GetItemLinkItemId(
          GetItemLinkRecipeResultItemLink(PUBLIC.GetItemLinkFromItemId(itemId))
        )
        if (results[resultId] === undefined) {
          results[resultId] = itemId
        }
      }
    }
    INTERNAL.cachedResultIds = results
  }
  const key =
    type(resultItem) === "number" ? asNumber(resultItem) : GetItemLinkItemId(asString(resultItem))
  return INTERNAL.cachedResultIds[key] ?? 0
}

PUBLIC.GetMotifStyles = INTERNAL.GetStyleIds

PUBLIC.GetStyleAndChapterFromMotif = function (this: void, item) {
  const [itemId, itemLink, styleId] = INTERNAL.TranslateItem(item)
  return INTERNAL.GetMotifStyleAndChapter(itemId, itemLink, styleId)
}

PUBLIC.GetMotifItemsFromStyle = INTERNAL.GetStyleMotifItems

PUBLIC.GetMotifChapterNames = function (this: void): Array<{ id: number; name: string }> {
  if (INTERNAL.chapters === undefined) {
    const chapters: Array<{ id: number; name: string }> = []

    for (let i = 1; i <= ITEM_STYLE_CHAPTER_MAX_VALUE; i++) {
      chapters.push({
        id: i,
        name: zo_strformat("<<m:1>>", GetString("SI_ITEMSTYLECHAPTER", i), 2),
      })
    }

    table.sort(
      chapters,
      (a: { id: number; name: string }, b: { id: number; name: string }): boolean => {
        return a.name < b.name
      }
    )

    INTERNAL.chapters = chapters
  }

  return INTERNAL.chapters
}

PUBLIC.GetMotifStyleQuality = function (this: void, styleId): number {
  return INTERNAL.GetStyleQuality(styleId) + 2
}

PUBLIC.GetMotifKnowledgeForCharacter = function (this: void, styleId, chapterId?, ...rest) {
  const resolvedChapterId = chapterId ?? ITEM_STYLE_CHAPTER_ALL

  const items = PUBLIC.GetMotifItemsFromStyle(styleId)

  if (type(items) === "table" && items !== undefined) {
    if (
      resolvedChapterId === ITEM_STYLE_CHAPTER_ALL ||
      items.chapters[resolvedChapterId] === undefined
    ) {
      return PUBLIC.GetItemKnowledgeForCharacter(asNumber(items.books[0]), ...rest)
    } else {
      return PUBLIC.GetItemKnowledgeForCharacter(items.chapters[resolvedChapterId], ...rest)
    }
  } else {
    return INTERNAL.KNOWLEDGE_INVALID
  }
}

PUBLIC.GetLastScanTime = function (this: void, server?, charId?): number {
  const resolvedServer = server ?? INTERNAL.server
  const resolvedCharId = charId ?? INTERNAL.charId
  return asTimestamp(INTERNAL.GetCharRawData(resolvedServer, resolvedCharId, "timestamp")) ?? 0
}

PUBLIC.GetRawCharacterSettings = function (this: void, server?, charId?) {
  const resolvedServer = server ?? INTERNAL.server
  const resolvedCharId = charId ?? INTERNAL.charId
  return INTERNAL.GetCharacterParams(resolvedServer, resolvedCharId)
}
