import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetNewLoreBookInfo,
  loreBooksGetNewLoreCollectionInfo,
} from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  BOOK_LOCALIZATION,
  BOOK_SHELF_LOCALIZATION,
  BOOK_STACK_LOCALIZATION,
} from "../lorebooks-locales/lorebooks-locales.module.code.ts"
import { STATE } from "../lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"

function asObject(value: unknown): object {
  return value as object
}

function myPrint(text: string): undefined {
  const chatEditControl = CHAT_SYSTEM.textEntry.editControl
  if (!chatEditControl.HasFocus()) {
    StartChatInput()
  }
  chatEditControl.InsertText(text)
}

export function createEideticLorebookLocation(): undefined {
  SetMapToPlayerLocation()
  CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  LibMapData_Internal.UpdateMapInfo()
  const [zone] = LibMapPins.GetZoneAndSubzone(true, false, true)
  let outText = GetString(LBOOKS_LBPOS_ERROR)
  const zoneId = LibMapData.zoneId
  const worldX = LibMapData.worldX
  const worldY = LibMapData.worldY
  const worldZ = LibMapData.worldZ
  const x = LibMapData.normalizedX
  const y = LibMapData.normalizedY
  const xpos = LibMapData.libGPSX
  const ypos = LibMapData.libGPSY
  const mapId = LibMapData.mapId
  const parentZoneMapId = LibMapData.parentZoneMapId
  const isDungeon = LibMapData.isDungeon
  let bookName = ""
  let categoryIndex = 0
  let collectionIndex: number | string = ""
  let bookIndex: number | string = ""

  const reticleName = LibMapData.reticleInteractionName
  let isBookshelf = false
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_SHELF_LOCALIZATION[STATE.currentBookshelfLocale]
  }
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_STACK_LOCALIZATION[STATE.currentBookshelfLocale]
  }
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_LOCALIZATION[STATE.currentBookshelfLocale]
  }

  if (STATE.currentOpenBook != null) {
    bookName = STATE.currentOpenBook
  }

  if (STATE.shownBookId == null) {
    d(GetString(LBOOKS_LBPOS_OPEN_BOOK))
    return
  }

  const [resolvedCategory, resolvedCollection, resolvedBook] = GetLoreBookIndicesFromBookId(
    STATE.shownBookId
  )
  categoryIndex = resolvedCategory ?? 0
  if (resolvedCollection != null) collectionIndex = resolvedCollection
  if (resolvedBook != null) bookIndex = resolvedBook

  if (collectionIndex != null && bookIndex != null) {
    if (typeof collectionIndex === "number" && typeof bookIndex === "number") {
      loreBooksGetNewLoreBookInfo(LORE_LIBRARY_EIDETIC, collectionIndex, bookIndex)
    }
  }

  const numericCollection = typeof collectionIndex === "number" ? collectionIndex : 0
  const [collectionName] = loreBooksGetNewLoreCollectionInfo(categoryIndex, numericCollection)

  if (categoryIndex === LORE_LIBRARY_SHALIDOR) {
    outText = string.format(
      "[%d] = { %ds, %ds, %d, %s, %s, moreInfo }, -- %s, %s",
      mapId,
      worldX,
      worldY,
      worldZ,
      tostring(collectionIndex),
      tostring(bookIndex),
      bookName,
      zone
    )
  } else if (categoryIndex === LORE_LIBRARY_EIDETIC) {
    const cnf = '"cn"'
    const nf = '"n"'
    const ef = '"e"'
    const dfField = '"d"'
    const mdf = '"pm"'
    const smf = '"sm"'
    const pxf = '"px"'
    const pyf = '"py"'
    const xf = '"x"'
    const yf = '"y"'
    const pnxf = '"pnx"'
    const pnyf = '"pny"'
    const mf = '"m"'
    const zf = '"z"'
    if (isDungeon === true) {
      outText = string.format(
        "[%d] = { [%s] = %s, [%s] = %s, [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, [%s] = %s, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s",
        STATE.shownBookId,
        cnf,
        '"' + collectionName + '"',
        nf,
        '"' + bookName + '"',
        ef,
        pxf,
        xpos,
        pyf,
        ypos,
        mdf,
        mapId,
        dfField,
        tostring(isDungeon),
        smf,
        mapId,
        pnxf,
        x,
        pnyf,
        y,
        zone
      )
    } else {
      outText = string.format(
        "[%d] = { [%s] = %s, [%s] = %s, [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s",
        STATE.shownBookId,
        cnf,
        '"' + collectionName + '"',
        nf,
        '"' + bookName + '"',
        ef,
        pxf,
        xpos,
        pyf,
        ypos,
        mdf,
        mapId,
        smf,
        mapId,
        pnxf,
        x,
        pnyf,
        y,
        zone
      )
    }
    if (isBookshelf) {
      outText = string.format(
        "[%d] = { [%s] = { [%d] = 1, }, }, [%d] = { { [%s] = %.10f, [%s] = %.10f, [%s] = %d, }, },  -- Bookshelf: %s, %s",
        STATE.shownBookId,
        mf,
        parentZoneMapId,
        mapId,
        xf,
        x,
        yf,
        y,
        zf,
        zoneId,
        bookName,
        zone
      )
    }
  }
  myPrint(outText)
}

export function createFakeEideticLorebookLocation(): undefined {
  LibMapData_Internal.UpdateMapInfo()
  const [zone] = LibMapPins.GetZoneAndSubzone(true, false, true)
  const x = LibMapData.normalizedX
  const y = LibMapData.normalizedY
  const xpos = LibMapData.libGPSX
  const ypos = LibMapData.libGPSY
  const mapId = LibMapData.mapId

  const ef = '"e"'
  const mdf = '"pm"'
  const smf = '"sm"'
  const pxf = '"px"'
  const pyf = '"py"'
  const fpf = '"fp"'
  const pnxf = '"pnx"'
  const pnyf = '"pny"'
  const shownBookId = "fake"
  const bookName = "fake Eidetic Memory location"
  const outText = string.format(
    "[%s] = { [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, [%s] = true, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s, %s",
    shownBookId,
    ef,
    pxf,
    xpos,
    pyf,
    ypos,
    mdf,
    mapId,
    fpf,
    smf,
    mapId,
    pnxf,
    x,
    pnyf,
    y,
    bookName,
    zone
  )
  myPrint(outText)
}

export function createFakeLorebookPin(): undefined {
  LibMapData_Internal.UpdateMapInfo()
  const [zone] = LibMapPins.GetZoneAndSubzone(true, false, true)
  const x = LibMapData.normalizedX
  const y = LibMapData.normalizedY
  const mapId = LibMapData.mapId

  const bookName = "fake Shalidor's Library location"
  const outText = string.format(
    "[%s] = { %.10f, %.10f, 0, 0, moreinfo }, -- %s, %s",
    mapId,
    x,
    y,
    bookName,
    zone
  )
  myPrint(outText)
}

function isEmptyOrNil(t: unknown): boolean {
  if (t == null || t === "") {
    return true
  }
  return type(t) === "table" ? ZO_IsTableEmpty(asObject(t)) : false
}

function isIn(searchValue: unknown, searchTable: Record<string | number, unknown>): boolean {
  if (isEmptyOrNil(searchValue)) {
    return false
  }
  for (const [, v] of pairs(searchTable)) {
    if (searchValue === v) {
      return true
    }
    if (typeof searchValue === "string" && typeof v === "string") {
      const [found] = string.find(string.lower(v), string.lower(searchValue))
      if (found != null) {
        return true
      }
    }
  }
  return false
}

export { isEmptyOrNil, isIn }
