import { BOOK_DATA } from "../lorebooks-book-data/lorebooks-book-data.module.code.ts"
import { BOOKSHELF_DATA } from "../lorebooks-bookshelf-data/lorebooks-bookshelf-data.module.code.ts"
import {
  LBOOKS_IMMERSIVE_EXPLORATION,
  LBOOKS_IMMERSIVE_WAYSHRINES,
  LBOOKS_IMMERSIVE_ZONEMAINQUEST,
  LBOOKS_IMMERSIVE_ZONEQUESTS,
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  MISSING_TITLE,
  PLACEHOLDER_TEXTURE,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
  SHALIDOR_LOCATION_X,
  SHALIDOR_LOCATION_Y,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import { LIBRARY_DATA } from "../lorebooks-library-data/lorebooks-library-data.module.code.ts"
import { STATE } from "../lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import {
  EXPLORATION_ACHIEVEMENT_IDS,
  MAIN_QUEST_ACHIEVEMENT_IDS,
  ZONE_QUEST_ACHIEVEMENT_IDS,
} from "../lorebooks-shalidor-achievements/lorebooks-shalidor-achievements.module.code.ts"
import { SHALIDOR_LOCATIONS } from "../lorebooks-shalidor-locations/lorebooks-shalidor-locations.module.code.ts"
import type {
  BookshelfEntry,
  EideticBook,
  EideticBookTable,
  EideticBookZoneEntry,
  ShalidorDataTable,
  ShalidorMapData,
  ShalidorPinEntry,
} from "../lorebooks-types/lorebooks-types.module.code.ts"

export function loreBooksGetBookData(): EideticBookTable {
  return BOOK_DATA
}

export function loreBooksGetNewEideticDataFromBookId(bookId: number): EideticBook {
  if (BOOK_DATA[bookId] === undefined) {
    BOOK_DATA[bookId] = { k: bookId }
  }
  return BOOK_DATA[bookId]
}

export function loreBooksGetNewEideticData(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): EideticBook {
  const [, , , bookId] = loreBooksGetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
  return loreBooksGetNewEideticDataFromBookId(bookId)
}

const EIDETIC_DATA_CACHE: Record<number, EideticBookZoneEntry[] | undefined> = {}
const EIDETIC_DATA_CACHE_ORDER: number[] = []
const EIDETIC_DATA_CACHE_LIMIT = 3

function touchEideticCacheOrder(mapId: number): undefined {
  for (const i of $range(1, EIDETIC_DATA_CACHE_ORDER.length)) {
    if (EIDETIC_DATA_CACHE_ORDER[i - 1] === mapId) {
      EIDETIC_DATA_CACHE_ORDER.splice(i - 1, 1)
      break
    }
  }
  EIDETIC_DATA_CACHE_ORDER.unshift(mapId)

  if (EIDETIC_DATA_CACHE_ORDER.length > EIDETIC_DATA_CACHE_LIMIT) {
    const oldestMapId = EIDETIC_DATA_CACHE_ORDER.pop()
    if (oldestMapId !== undefined) {
      EIDETIC_DATA_CACHE[oldestMapId] = undefined
    }
  }
}

export function loreBooksGetEideticData(
  mapId: number | undefined,
  zMapId: number | undefined
): EideticBookZoneEntry[] {
  const eideticInZone: EideticBookZoneEntry[] = []
  if (mapId === undefined) return eideticInZone
  const cached = EIDETIC_DATA_CACHE[mapId]
  if (cached !== undefined) {
    touchEideticCacheOrder(mapId)
    return cached
  }

  const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)

  for (const collectionIndex of $range(1, numCollections)) {
    const [, , , totalBooks] = loreBooksGetNewLoreCollectionInfo(
      LORE_LIBRARY_EIDETIC,
      collectionIndex
    )
    for (const bookIndex of $range(1, totalBooks)) {
      const eideticBookZoneData = loreBooksGetNewEideticData(
        LORE_LIBRARY_EIDETIC,
        collectionIndex,
        bookIndex
      )
      const [, , , bookId] = loreBooksGetNewLoreBookInfo(
        LORE_LIBRARY_EIDETIC,
        collectionIndex,
        bookIndex
      )
      const zones = eideticBookZoneData.e
      if (zones !== undefined) {
        for (const booksData of zones) {
          if (booksData.pm === mapId || booksData.zm === zMapId) {
            booksData.c = collectionIndex
            booksData.b = bookIndex
            booksData.k = bookId
            if (eideticBookZoneData.q !== undefined) {
              booksData.q = eideticBookZoneData.q
            }
            eideticInZone.push(booksData)
          }
        }
      }
    }
  }

  EIDETIC_DATA_CACHE[mapId] = eideticInZone
  touchEideticCacheOrder(mapId)
  return eideticInZone
}

function getNumKnownBooksInCollection(
  categoryIndex: number | undefined,
  collectionIndex: number | undefined,
  booksInCollection: number | undefined
): number {
  let numKnownBooks = 0
  if (
    categoryIndex !== undefined &&
    collectionIndex !== undefined &&
    booksInCollection !== undefined
  ) {
    for (const bookIndex of $range(1, booksInCollection)) {
      const [, , known] = loreBooksGetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
      if (known) {
        numKnownBooks = numKnownBooks + 1
      }
    }
  }
  return numKnownBooks
}

export function loreBooksGetMissingEideticBooks(): undefined {
  const categoryIndex = LORE_LIBRARY_EIDETIC
  const [, numCollections] = GetLoreCategoryInfo(categoryIndex)

  for (const collectionIndex of $range(1, numCollections)) {
    const [collectionName, , , totalBooks, hidden] = loreBooksGetNewLoreCollectionInfo(
      categoryIndex,
      collectionIndex
    )
    if (!hidden) {
      for (const bookIndex of $range(1, totalBooks)) {
        const [, , , bookId] = loreBooksGetNewLoreBookInfo(
          categoryIndex,
          collectionIndex,
          bookIndex
        )
        if (BOOK_DATA[bookId] !== undefined && BOOK_DATA[bookId].c === undefined) {
          df(
            "Book |H1:book:%s|h|h (#%d) is still Unknown. Collection %s (3/%d)",
            tostring(bookId),
            bookId,
            collectionName,
            collectionIndex
          )
        }
      }
    }
  }
}

export function loreBooksGetNewLoreBookInfo(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): LuaMultiReturn<[string, string, boolean, number]> {
  const [titleFromGame, icon, known, bookId] = GetLoreBookInfo(
    categoryIndex,
    collectionIndex,
    bookIndex
  )

  let title = titleFromGame
  if (title === undefined || title === "") {
    const fallback = BOOK_DATA[bookId]
    const fallbackEn = fallback?.en
    if (fallback !== undefined && fallbackEn !== undefined) {
      title = fallbackEn
    } else {
      title = MISSING_TITLE
    }
  }

  return $multi(
    title,
    icon !== undefined && icon !== "" ? icon : PLACEHOLDER_TEXTURE,
    known,
    bookId
  )
}

function resolveLocalizedField(
  valueFromGame: string | undefined,
  fallback: string | undefined
): string | undefined {
  if (valueFromGame !== undefined && valueFromGame !== "") {
    return valueFromGame
  }
  if (fallback !== undefined && fallback !== "") {
    return fallback
  }
  return undefined
}

export function loreBooksGetNewLoreCollectionInfo(
  categoryIndex: number,
  collectionIndex: number
): LuaMultiReturn<[string, string, number, number, boolean, string, number]> {
  const cacheKey = `${categoryIndex}:${collectionIndex}`
  const cached = STATE.collectionInfoCache[cacheKey]
  if (cached !== undefined) {
    return $multi(cached[0], cached[1], cached[2], cached[3], cached[4], cached[5], cached[6])
  }

  const [
    nameFromGame,
    descFromGame,
    ,
    totalBooksFromGame,
    ,
    gamepadIconFromGame,
    collectionIdFromGame,
  ] = GetLoreCollectionInfo(categoryIndex, collectionIndex)
  const category = LIBRARY_DATA[categoryIndex]
  const data = category !== undefined ? category[collectionIndex] : undefined

  const name = resolveLocalizedField(nameFromGame, data?.n)
  const description = resolveLocalizedField(descFromGame, data?.d)
  let totalBooks = totalBooksFromGame
  if (
    (totalBooks === undefined || totalBooks === 0) &&
    data !== undefined &&
    data.t !== undefined
  ) {
    totalBooks = data.t
  }

  const hidden = false

  let gamepadIcon = gamepadIconFromGame
  if (
    (gamepadIcon === undefined || gamepadIcon === "") &&
    data !== undefined &&
    data.g !== undefined
  ) {
    gamepadIcon = data.g
  }

  let collectionId = collectionIdFromGame
  if (
    (collectionId === undefined || collectionId === 0) &&
    data !== undefined &&
    data.k !== undefined
  ) {
    collectionId = data.k
  }

  if (name === undefined || totalBooks === undefined) {
    return $multi("", "", 0, 0, true, "/esoui/art/icons/icon_missing.dds", 0)
  }

  const numKnownBooks = getNumKnownBooksInCollection(categoryIndex, collectionIndex, totalBooks)

  const result: readonly [string, string, number, number, boolean, string, number] = [
    name,
    description ?? "",
    numKnownBooks,
    totalBooks,
    hidden,
    gamepadIcon ?? "",
    collectionId ?? 0,
  ]

  STATE.collectionInfoCache[cacheKey] = result
  return $multi(result[0], result[1], result[2], result[3], result[4], result[5], result[6])
}

function areAllWayshrinesUnlocked(): boolean {
  for (const nodeIndex of $range(1, GetNumFastTravelNodes())) {
    const [known, , , , , , poiType, isShownInCurrentMap] = GetFastTravelNodeInfo(nodeIndex)
    if (isShownInCurrentMap && poiType === POI_TYPE_WAYSHRINE && !known) {
      return false
    }
  }
  return true
}

export function loreBooksGetImmersiveModeCondition(
  mode: number,
  mapIndex: number
): number | readonly number[] | boolean | undefined {
  if (mode === LBOOKS_IMMERSIVE_ZONEMAINQUEST) {
    return MAIN_QUEST_ACHIEVEMENT_IDS[mapIndex]
  } else if (mode === LBOOKS_IMMERSIVE_WAYSHRINES) {
    return areAllWayshrinesUnlocked()
  } else if (mode === LBOOKS_IMMERSIVE_EXPLORATION) {
    return EXPLORATION_ACHIEVEMENT_IDS[mapIndex]
  } else if (mode === LBOOKS_IMMERSIVE_ZONEQUESTS) {
    return ZONE_QUEST_ACHIEVEMENT_IDS[mapIndex]
  }
  return undefined
}

export function loreBooksGetLocalData(mapId: number): ShalidorMapData | undefined {
  return SHALIDOR_LOCATIONS[mapId]
}

export interface ShalidorBookHit {
  data: ShalidorPinEntry
  mapId: number
  locX: number
  locY: number
}

export function loreBooksGetDataOfBook(
  categoryIndex: number,
  collectionIndex: number | undefined,
  bookIndex: number | undefined
): ShalidorBookHit[] {
  const results: ShalidorBookHit[] = []
  if (categoryIndex === LORE_LIBRARY_SHALIDOR) {
    if (collectionIndex !== undefined && bookIndex !== undefined) {
      for (const [mapId, mapData] of pairs(SHALIDOR_LOCATIONS)) {
        for (const bookEntry of mapData) {
          if (
            bookEntry[SHALIDOR_COLLECTIONINDEX] === collectionIndex &&
            bookEntry[SHALIDOR_BOOKINDEX] === bookIndex
          ) {
            results[results.length] = {
              data: bookEntry,
              mapId,
              locX: bookEntry[SHALIDOR_LOCATION_X],
              locY: bookEntry[SHALIDOR_LOCATION_Y],
            }
          }
        }
      }
    }
  }
  return results
}

export function loreBooksGetAllData(): ShalidorDataTable {
  return SHALIDOR_LOCATIONS
}

export function loreBooksGetNewShalidorBookInfo(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): LuaMultiReturn<[string, string, boolean, number]> {
  const [titleFromGame, icon, known, bookId] = GetLoreBookInfo(
    categoryIndex,
    collectionIndex,
    bookIndex
  )
  const title = titleFromGame !== undefined && titleFromGame !== "" ? titleFromGame : MISSING_TITLE
  return $multi(
    title,
    icon !== undefined && icon !== "" ? icon : PLACEHOLDER_TEXTURE,
    known,
    bookId
  )
}

export function loreBooksGetBookshelfDataFromMapId(
  mapId: number
): readonly BookshelfEntry[] | undefined {
  if (BOOKSHELF_DATA[mapId] === undefined) {
    return undefined
  }
  return BOOKSHELF_DATA[mapId]
}
