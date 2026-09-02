import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetDataOfBook,
  loreBooksGetNewEideticData,
  loreBooksGetNewLoreBookInfo,
} from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import { getQuestLocation } from "../lorebooks-quest-location/lorebooks-quest-location.module.code.ts"

function requireGps(): LibGps3 {
  if (LibGPS3 === undefined) {
    throw new Error("LoreBooks requires LibGPS3 (declared DependsOn)")
  }
  return LibGPS3
}
const GPS = requireGps()

interface LoreLibraryRowOwner {
  EnterRow: (this: LoreLibraryRowOwner, row: unknown) => void
  ExitRow: (this: LoreLibraryRowOwner, row: unknown) => void
}

interface LoreLibraryRowControl extends Control {
  known?: boolean
  categoryIndex: number
  collectionIndex: number
  bookIndex: number
  owner: LoreLibraryRowOwner
}

interface EideticRowZoneEntry {
  pm?: number
  px?: number
  py?: number
  pnx?: number
  pny?: number
  r?: boolean
  fp?: boolean
  zt?: number
  d?: boolean
}

type UnknownArgsStringFn = (...args: unknown[]) => string
function asLoreLibraryRowControl(value: unknown): LoreLibraryRowControl {
  return value as LoreLibraryRowControl
}
function asEideticRowZoneEntry(value: unknown): EideticRowZoneEntry {
  return value as EideticRowZoneEntry
}
function asUnknownArgsStringFn(value: unknown): UnknownArgsStringFn {
  return value as UnknownArgsStringFn
}

export function onRowMouseUp(this: void, control: Control, button: number): undefined {
  if (button === MOUSE_BUTTON_INDEX_RIGHT) {
    ClearMenu()

    const row = asLoreLibraryRowControl(control)

    if (row.known === true) {
      AddMenuItem(GetString(SI_LORE_LIBRARY_READ), () => {
        ZO_LoreLibrary_ReadBook(row.categoryIndex, row.collectionIndex, row.bookIndex)
      })
    }

    if (IsChatSystemAvailableForCurrentPlatform()) {
      AddMenuItem(GetString(SI_ITEM_ACTION_LINK_TO_CHAT), () => {
        const link = ZO_LinkHandler_CreateChatLink(
          asUnknownArgsStringFn(GetLoreBookLink),
          row.categoryIndex,
          row.collectionIndex,
          row.bookIndex
        )
        ZO_LinkHandler_InsertLink(link)
      })
    }

    if (row.categoryIndex === LORE_LIBRARY_SHALIDOR) {
      const lorebookInfoOnBook = loreBooksGetDataOfBook(
        row.categoryIndex,
        row.collectionIndex,
        row.bookIndex
      )
      for (const resultData of lorebookInfoOnBook) {
        let fakePin = false
        if (resultData.data[5] !== undefined && resultData.data[5] === 9999) {
          fakePin = true
        }

        if (!fakePin) {
          const targetMapId = resultData.mapId
          const targetLocX = resultData.locX
          const targetLocY = resultData.locY
          AddMenuItem(
            zo_strformat(
              "<<1>> : <<2>>x<<3>>",
              zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameById(targetMapId)),
              targetLocX * 100,
              targetLocY * 100
            ),
            () => {
              SetMapToMapId(targetMapId)
              GPS.SetPlayerChoseCurrentMap()
              CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
              PingMap(
                MAP_PIN_TYPE_RALLY_POINT,
                MAP_TYPE_LOCATION_CENTERED,
                targetLocX,
                targetLocY,
                undefined
              )
              PingMap(
                MAP_PIN_TYPE_PLAYER_WAYPOINT,
                MAP_TYPE_LOCATION_CENTERED,
                targetLocX,
                targetLocY,
                undefined
              )
              if (!ZO_WorldMap_IsWorldMapShowing()) {
                if (IsInGamepadPreferredMode()) {
                  SCENE_MANAGER.Push("gamepad_worldMap")
                } else {
                  MAIN_MENU_KEYBOARD.ShowCategory(MENU_CATEGORY_MAP)
                }
                zo_callLater(() => {
                  ZO_WorldMap_GetPanAndZoom().PanToNormalizedPosition(targetLocX, targetLocY)
                }, 1000)
              }
            }
          )
        }
      }
    } else if (row.categoryIndex === LORE_LIBRARY_EIDETIC) {
      const bookData = loreBooksGetNewEideticData(
        row.categoryIndex,
        row.collectionIndex,
        row.bookIndex
      )
      const hasEideticBooks = bookData.c !== undefined && NonContiguousCount(bookData.e ?? {}) >= 1

      if (hasEideticBooks && bookData.e !== undefined) {
        for (const rawData of bookData.e) {
          const data = asEideticRowZoneEntry(rawData)
          const mapId = data.pm ?? 0
          const mapName = GetMapNameById(mapId)
          const libgpsCoordinates = data.px !== undefined && data.py !== undefined
          const normalizedCoordinates = data.pnx !== undefined && data.pny !== undefined

          if (
            data.r !== true &&
            data.fp !== true &&
            (libgpsCoordinates || normalizedCoordinates) &&
            data.zt === undefined
          ) {
            let xLoc: number | undefined
            let yLoc: number | undefined
            if (libgpsCoordinates) {
              const measurement = GPS.GetMapMeasurementByMapId(mapId)
              if (measurement !== undefined) {
                ;[xLoc, yLoc] = measurement.ToLocal(data.px ?? 0, data.py ?? 0)
              }
            }
            if (normalizedCoordinates) {
              xLoc = data.pnx
              yLoc = data.pny
            }
            if (xLoc !== undefined && yLoc !== undefined) {
              const pinX = xLoc
              const pinY = yLoc
              const xTooltip = string.format("%0.02f", zo_round(pinX * 10000) / 100)
              const yTooltip = string.format("%0.02f", zo_round(pinY * 10000) / 100)
              AddMenuItem(
                zo_strformat(
                  "<<1>> (<<2>>x<<3>>)",
                  zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, mapName),
                  xTooltip,
                  yTooltip
                ),
                () => {
                  SetMapToMapId(mapId)
                  GPS.SetPlayerChoseCurrentMap()
                  CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
                  PingMap(
                    MAP_PIN_TYPE_RALLY_POINT,
                    MAP_TYPE_LOCATION_CENTERED,
                    pinX,
                    pinY,
                    undefined
                  )
                  PingMap(
                    MAP_PIN_TYPE_PLAYER_WAYPOINT,
                    MAP_TYPE_LOCATION_CENTERED,
                    pinX,
                    pinY,
                    undefined
                  )
                  if (!ZO_WorldMap_IsWorldMapShowing()) {
                    if (IsInGamepadPreferredMode()) {
                      SCENE_MANAGER.Push("gamepad_worldMap")
                    } else {
                      MAIN_MENU_KEYBOARD.ShowCategory(MENU_CATEGORY_MAP)
                    }
                    zo_callLater(() => {
                      ZO_WorldMap_GetPanAndZoom().PanToNormalizedPosition(pinX, pinY)
                    }, 1000)
                  }
                }
              )
            }
          }
        }
      }
    }

    ShowMenu(control)
  }
}

export function onMouseEnter(
  this: void,
  self: Control,
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): undefined {
  const row = asLoreLibraryRowControl(self)

  if (categoryIndex === LORE_LIBRARY_EIDETIC) {
    const bookData = loreBooksGetNewEideticData(categoryIndex, collectionIndex, bookIndex)
    const hasEideticData = bookData.c !== undefined
    if (hasEideticData) {
      const [bookName] = loreBooksGetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
      InitializeTooltip(InformationTooltip, self, BOTTOMLEFT, 0, 0, TOPRIGHT)
      {
        const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
        InformationTooltip.AddLine(bookName, "ZoFontGameOutline", sr, sg, sb)
      }
      ZO_Tooltip_AddDivider(InformationTooltip)

      let addDivider = false
      const entryWeight: Record<string, Record<number, boolean>> = {}
      if (bookData.q !== undefined) {
        const questName = GetQuestName(bookData.q)
        const questDetails = getQuestLocation(bookData.q)
        let questInfo: string
        if (questDetails !== "") {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK_ZONENAME), questDetails, questName)
        } else {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK), questDetails, questName)
        }
        if (questName !== undefined) {
          const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
          InformationTooltip.AddLine(questInfo, "", hr, hg, hb)
        }
      } else if (
        bookData.r === true &&
        bookData.m !== undefined &&
        NonContiguousCount(bookData.m) >= 1
      ) {
        {
          const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
          InformationTooltip.AddLine(GetString(LBOOKS_RANDOM_POSITION), "", hr, hg, hb)
        }
        ZO_Tooltip_AddDivider(InformationTooltip)

        for (const [mapId] of pairs(bookData.m)) {
          const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
          InformationTooltip.AddLine(
            zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameById(mapId)),
            "",
            sr,
            sg,
            sb
          )
        }
      } else if (bookData.e !== undefined) {
        for (const rawData of bookData.e) {
          const data = asEideticRowZoneEntry(rawData)
          const isFakePin = data.fp === true
          if (!isFakePin) {
            let insert = true
            const isRandom = data.r === true
            const inDungeon = data.d === true
            const hasZoneTag = data.zt !== undefined

            const mapId = data.pm ?? 0
            const [, , , zoneIndex] = GetMapInfoById(mapId)
            let zoneNameZondId: string | undefined
            if (hasZoneTag && data.zt !== undefined) {
              zoneNameZondId = zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetZoneNameById(data.zt))
            }

            let weight = 0
            if (isRandom) {
              weight = weight + 1
            }
            if (inDungeon) {
              weight = weight + 2
            }

            const zoneName = zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetZoneNameByIndex(zoneIndex))
            const mapName = zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameById(mapId))

            let bookPosition: string
            if (zoneName !== mapName && !hasZoneTag) {
              bookPosition = zo_strformat("<<1>> - <<2>>", mapName, zoneName)
              const wp = entryWeight[bookPosition]
              if (wp !== undefined && wp[weight] === true) {
                insert = false
              }
            } else {
              if (hasZoneTag && zoneNameZondId !== undefined) {
                bookPosition = zoneNameZondId
              } else {
                bookPosition = mapName
              }
              const wp = entryWeight[bookPosition]
              if (wp !== undefined && wp[weight] === true) {
                insert = false
              }
            }

            let weightSet = entryWeight[bookPosition]
            if (weightSet === undefined) {
              weightSet = {}
              entryWeight[bookPosition] = weightSet
            }
            weightSet[weight] = true

            if (insert) {
              if (addDivider) {
                ZO_Tooltip_AddDivider(InformationTooltip)
              }
              addDivider = true

              {
                const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
                InformationTooltip.AddLine(bookPosition, "", hr, hg, hb)
              }

              if (hasZoneTag) {
                const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
                InformationTooltip.AddLine(GetString(LBOOKS_PIN_UPDATE), "", hr, hg, hb)
              }
            }
          }
        }
      }
    }
  }

  row.owner.EnterRow(self)
}

export function onMouseExit(this: void, self: Control): undefined {
  ClearTooltip(InformationTooltip)
  const row = asLoreLibraryRowControl(self)
  row.owner.ExitRow(self)
}
