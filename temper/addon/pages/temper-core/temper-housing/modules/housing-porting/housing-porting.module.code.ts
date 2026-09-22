import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

interface EditboxControl {
  GetText: (this: EditboxControl) => string
}
function asEditboxControl(value: unknown): EditboxControl {
  return value as EditboxControl
}

interface HouseControls {
  editbox: unknown
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}

interface TlwControl {
  IsHidden: (this: TlwControl) => boolean
  SetHidden: (this: TlwControl, hidden: boolean) => void
}
function asTlwControl(value: unknown): TlwControl {
  return value as TlwControl
}

function portToFavoriteBinding(this: void, favId: number): boolean {
  const favorites = houseTravel.savedVars?.favorites
  if (favorites !== undefined && favId > 0 && favId <= 10) {
    for (let i = 0; i < favorites.length; i = i + 1) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (favorite.id !== undefined && favorite.id === favId) {
        houseTravel.JumpToHouse(favorite.name, favorite.houseId)
        return true
      }
    }
  }
  d(houseTravel.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
houseTravel.PortToFavoriteBinding = portToFavoriteBinding

function portToMyHouseBinding(this: void, id: number, portType: number): boolean {
  const favorites = houseTravel.savedVars?.myHousesFavorites[portType]
  if (favorites !== undefined && id > 0 && id <= 10) {
    let portOutside = false
    if (portType === houseTravel.constants.PORT_TYPE_OUTSIDE) {
      portOutside = true
    }
    const houseId = favorites[id]
    if (houseId !== undefined) {
      houseTravel.PortToMyHousesById(houseId, portOutside)
      return true
    }
  }
  d(houseTravel.constants.INVALID_FAVORITE_ID ?? "")
  return false
}
houseTravel.PortToMyHouseBinding = portToMyHouseBinding

function jumpToHouse(this: void, name: string, id: number): undefined {
  if (name !== "" && id !== undefined && id > 0) {
    if (name === GetDisplayName() || zo_strtrim(name) === "") {
      RequestJumpToHouse(id)
    } else {
      JumpToSpecificHouse(name, id)
    }
  }
}
houseTravel.JumpToHouse = jumpToHouse

function version12NameFix(this: void, id: number): undefined {
  const favorites = houseTravel.savedVars?.favorites
  if (favorites === undefined) {
    return
  }
  const favorite = favorites[id - 1]
  if (favorite === undefined) {
    return
  }
  if (
    favorite.name.toLowerCase() === GetUnitName("player").toLowerCase() ||
    favorite.name.toLowerCase() === GetDisplayName().toLowerCase()
  ) {
    favorite.name = GetDisplayName()
  }
}
houseTravel.Version12NameFix = version12NameFix

function portToLibraryEntry(this: void, id: number): undefined {
  const entries = houseTravel.GetFilteredLibraryData()
  if (id !== undefined && id > 0) {
    const entry = entries[id - 1]
    if (entry === undefined) {
      return
    }
    houseTravel.JumpToHouse(entry.name, entry.houseId)
    if (houseTravel.savedVars?.port_mode === houseTravel.constants.PORT_MODE_ON_CLICK) {
      houseTravel.CloseWindow()
    }
  }
}
houseTravel.PortToLibraryEntry = portToLibraryEntry

function portToFavorite(this: void, id: number): undefined {
  const favorites = houseTravel.savedVars?.favorites
  if (favorites !== undefined && id !== undefined && id > 0) {
    const favorite = favorites[id - 1]
    if (favorite === undefined) {
      return
    }
    houseTravel.JumpToHouse(favorite.name, favorite.houseId)
    if (houseTravel.savedVars?.port_mode === houseTravel.constants.PORT_MODE_ON_CLICK) {
      houseTravel.CloseWindow()
    }
  }
}
houseTravel.PortToFavorite = portToFavorite

function portToMyHousesById(this: void, id: number, outside: boolean): undefined {
  RequestJumpToHouse(id, outside)
  if (houseTravel.savedVars?.port_mode === houseTravel.constants.PORT_MODE_ON_CLICK) {
    houseTravel.CloseWindow()
  }
}
houseTravel.PortToMyHousesById = portToMyHousesById

function removeFavorite(this: void, id: number): undefined {
  if (id !== undefined && id > 0) {
    const favorites = houseTravel.savedVars?.favorites
    if (favorites !== undefined) {
      favorites.splice(id - 1, 1)
    }
    houseTravel.CreateFavorites()
    houseTravel.BdOnMouseEnter(id)
  }
}
houseTravel.RemoveFavorite = removeFavorite

function entryExists(this: void, name: string, houseId: number): boolean {
  const favorites = houseTravel.savedVars?.favorites
  if (favorites !== undefined) {
    for (let i = 0; i < favorites.length; i = i + 1) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (favorite.name === name && favorite.houseId === houseId) {
        return true
      }
    }
  }
  return false
}
houseTravel.EntryExists = entryExists

function addFavorite(this: void, name: string, houseId: number): undefined {
  if (houseId > 0) {
    name = zo_strtrim(name)
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      name === ""
    ) {
      name = GetDisplayName()
    }
    if (houseTravel.EntryExists(name, houseId) === false) {
      const favorites = houseTravel.savedVars?.favorites
      if (favorites !== undefined) {
        favorites[favorites.length] = { name: "", houseId: 0 }
        const added = favorites[favorites.length - 1]
        if (added === undefined) {
          return
        }
        added.name = name
        added.houseId = houseId
      }
      houseTravel.CreateFavorites()
    }
  }
}
houseTravel.AddFavorite = addFavorite

function addToFavorite(this: void): undefined {
  const house = asHouseControls(houseTravel.controls.house)
  const name = asEditboxControl(house.editbox).GetText()
  const houseId = houseTravel.addonState.houseId
  houseTravel.AddFavorite(name, houseId)
}
houseTravel.AddToFavorite = addToFavorite

function openWindowKeyBinding(this: void): undefined {
  const tlw = asTlwControl(houseTravel.controls.TLW)
  tlw.SetHidden(!tlw.IsHidden())
  SetGameCameraUIMode(!tlw.IsHidden())
  if (tlw.IsHidden() === false) {
    houseTravel.CreateGuildAndFriendList()
  }
  if (tlw.IsHidden() === true) {
    const callback = houseTravel.addonState.windowCallback
    if (callback !== undefined && type(callback) === "function") {
      houseTravel.addonState.windowCallback = undefined
      callback()
    }
  }
}
houseTravel.OpenWindowKeyBinding = openWindowKeyBinding

function houseTravelHouseTab(this: void): undefined {
  if (houseTravel.addonState.houseId > 0) {
    const house = asHouseControls(houseTravel.controls.house)
    let name = asEditboxControl(house.editbox).GetText()
    if (
      name.toLowerCase() === GetUnitName("player").toLowerCase() ||
      name.toLowerCase() === GetDisplayName().toLowerCase() ||
      zo_strtrim(name) === ""
    ) {
      name = GetDisplayName()
    }
    houseTravel.JumpToHouse(name, houseTravel.addonState.houseId)
  }
}
houseTravel.HouseTravel = houseTravelHouseTab

function getIdFromName(this: void, name: string): number {
  let id = 0
  for (const [key] of pairs(houseTravel.HOUSES)) {
    if (name === houseTravel.HOUSES[key]) {
      id = key
      break
    }
  }
  return id
}
houseTravel.GetIdFromName = getIdFromName
