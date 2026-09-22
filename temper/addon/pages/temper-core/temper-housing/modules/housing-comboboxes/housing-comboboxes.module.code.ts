import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"

let UNIQUE_NAME_COUNTER = 0

function nextUniqueSuffix(this: void): number {
  UNIQUE_NAME_COUNTER = UNIQUE_NAME_COUNTER + 1
  return UNIQUE_NAME_COUNTER
}

interface HouseComboBoxItem {
  name: string | number
}
interface HouseComboBox {
  SetSortsItems: (this: HouseComboBox, sortsItems: boolean) => void
  ClearItems: (this: HouseComboBox) => void
  CreateItemEntry: (
    this: HouseComboBox,
    name: string | number,
    callback: (this: void, control: Control, text: string | number, choice: unknown) => void
  ) => HouseComboBoxItem
  AddItem: (this: HouseComboBox, entry: HouseComboBoxItem, suppressUpdate?: unknown) => void
  SetSelectedItem: (this: HouseComboBox, itemName: string | number) => void
}

interface FavoriteComboboxControls {
  combobox?: Control
  comboboxButton?: Control
  dropdown?: HouseComboBox
}

interface MyHouseFavoriteControls {
  combobox?: Control
  comboboxButton?: Control
  dropdown?: HouseComboBox
  backDrop?: Control
  houseId?: number
}

interface MyHousesControls {
  portFavorites?: Record<number, Record<number, MyHouseFavoriteControls>>
}

function asHouseComboBox(value: unknown): HouseComboBox {
  return value as HouseComboBox
}
function asFavoriteComboboxControls(value: unknown): FavoriteComboboxControls {
  return value as FavoriteComboboxControls
}
function asMyHousesControls(value: unknown): MyHousesControls {
  return value as MyHousesControls
}
type BuiltPortFavorites = Record<number, Record<number, MyHouseFavoriteControls>>
function asBuiltPortFavorites(value: unknown): BuiltPortFavorites {
  return value as BuiltPortFavorites
}

function favoriteCallback(
  this: void,
  _control: Control | undefined,
  text: string | number,
  _choice: unknown,
  index: number
): undefined {
  if (houseTravel.savedVars === undefined) {
    return
  }
  const favorites = houseTravel.savedVars.favorites
  if (favorites !== undefined && favorites.length > 0) {
    const favId = tonumber(text)
    const favControls = asFavoriteComboboxControls(houseTravel.controls.favorites[index])
    const favorite = favorites[index]
    if (favorite === undefined) {
      return
    }
    if (favId !== undefined && favId > 0 && favId <= 10) {
      favorite.id = favId
      if (favControls.dropdown !== undefined) {
        favControls.dropdown.SetSelectedItem(favId)
      }
      for (let i = 0; i < favorites.length; i = i + 1) {
        const other = favorites[i]
        if (other === undefined) {
          continue
        }
        if (other.id === favId && i !== index) {
          houseTravel.FavoriteCallback(undefined, favId + 1, undefined, i)
          break
        }
      }
    } else {
      favorite.id = undefined
      if (favControls.dropdown !== undefined) {
        favControls.dropdown.SetSelectedItem("-")
      }
    }
  }
}
houseTravel.FavoriteCallback = favoriteCallback

function myHouseFavoriteCallback(
  this: void,
  _control: Control | undefined,
  text: string | number,
  _choice: unknown,
  index: number,
  portType: number
): undefined {
  if (houseTravel.savedVars === undefined) {
    return
  }
  const favorites = houseTravel.savedVars.myHousesFavorites[portType]
  if (favorites !== undefined) {
    const id = tonumber(text)
    const myHouses = asMyHousesControls(houseTravel.controls.myHouses)
    const portFavorites = asBuiltPortFavorites(myHouses.portFavorites)
    const portTypeFavorites = portFavorites[portType]
    if (portTypeFavorites === undefined) {
      return
    }
    const slot = portTypeFavorites[index]
    if (slot === undefined) {
      return
    }
    const houseId = slot.houseId
    if (id !== undefined && id > 0 && id <= 10) {
      for (const [key, value] of pairs(favorites)) {
        if (value === houseId) {
          favorites[key] = undefined
        }
      }
      favorites[id] = houseId
    } else {
      for (const [key, value] of pairs(favorites)) {
        if (value === houseId) {
          favorites[key] = undefined
        }
      }
    }
    houseTravel.UpdateMyHouses()
  }
}
houseTravel.MyHouseFavoriteCallback = myHouseFavoriteCallback

function getFavoriteIdFromMyHouseId(this: void, id: number, portType: number): number | undefined {
  if (houseTravel.savedVars === undefined) {
    return undefined
  }
  const favorites = houseTravel.savedVars.myHousesFavorites[portType]
  if (favorites !== undefined) {
    for (const [key, value] of pairs(favorites)) {
      if (value === id) {
        return key
      }
    }
  }
  return undefined
}
houseTravel.GetFavoriteIdFromMyHouseId = getFavoriteIdFromMyHouseId

function createFavoriteCombobox(
  this: void,
  index: number,
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
  container: Control,
  value: number | undefined
): undefined {
  if (
    index !== undefined &&
    index > 0 &&
    width !== undefined &&
    height !== undefined &&
    offsetX !== undefined &&
    offsetY !== undefined &&
    container !== undefined
  ) {
    if (houseTravel.controls.favorites[index] === undefined) {
      houseTravel.controls.favorites[index] = {}
    }
    const favControls = asFavoriteComboboxControls(houseTravel.controls.favorites[index])
    if (favControls.combobox === undefined) {
      const gameTime = GetGameTimeMilliseconds()
      const rand = nextUniqueSuffix()
      const comboboxName =
        "HouseTravel_Combobox_Favorites_" + tostring(rand) + "_" + tostring(gameTime)
      favControls.combobox = WINDOW_MANAGER.CreateControlFromVirtual(
        comboboxName,
        container,
        "ZO_ComboBox"
      )
      favControls.comboboxButton = WINDOW_MANAGER.GetControlByName(comboboxName + "OpenDropdown")
      const comboboxButton = favControls.comboboxButton
      if (comboboxButton !== undefined) {
        comboboxButton.SetHandler("OnMouseEnter", () => {
          houseTravel.BdOnMouseEnter(index)
        })
        comboboxButton.SetHandler("OnMouseExit", () => {
          houseTravel.BdOnMouseExit(index)
        })
      }
    }
    if (favControls.combobox !== undefined) {
      const combobox = favControls.combobox
      combobox.ClearAnchors()
      combobox.SetAnchor(TOPLEFT, container, TOPLEFT, offsetX, offsetY)
      combobox.SetDimensions(width, height)
      combobox.SetHandler("OnMouseEnter", () => {
        houseTravel.BdOnMouseEnter(index)
      })
      combobox.SetHandler("OnMouseExit", () => {
        houseTravel.BdOnMouseExit(index)
      })

      if (favControls.dropdown === undefined) {
        favControls.dropdown = asHouseComboBox(ZO_ComboBox_ObjectFromContainer(combobox))
      }
      const dropdown = favControls.dropdown

      dropdown.SetSortsItems(false)
      dropdown.ClearItems()

      let entry = dropdown.CreateItemEntry("-", (control, text, choice) => {
        houseTravel.FavoriteCallback(control, text, choice, index)
      })
      dropdown.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      for (let i = 1; i <= 10; i = i + 1) {
        entry = dropdown.CreateItemEntry(i, (control, text, choice) => {
          houseTravel.FavoriteCallback(control, text, choice, index)
        })
        dropdown.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      }
      if (value === undefined) {
        dropdown.SetSelectedItem("-")
      } else {
        dropdown.SetSelectedItem(value)
      }
    }
  }
}
houseTravel.CreateFavoriteCombobox = createFavoriteCombobox

function createPortMyHouseFavorite(
  this: void,
  index: number,
  width: number,
  height: number,
  offsetX: number,
  container: Control,
  value: number | undefined,
  portType: number,
  id: number
): undefined {
  if (
    index !== undefined &&
    index > 0 &&
    width !== undefined &&
    height !== undefined &&
    offsetX !== undefined &&
    container !== undefined &&
    portType !== undefined
  ) {
    const myHouses = asMyHousesControls(houseTravel.controls.myHouses)
    if (myHouses.portFavorites === undefined) {
      myHouses.portFavorites = {}
    }
    if (myHouses.portFavorites[portType] === undefined) {
      myHouses.portFavorites[portType] = {}
    }
    if (myHouses.portFavorites[portType][index] === undefined) {
      myHouses.portFavorites[portType][index] = {}
    }
    const slot = myHouses.portFavorites[portType][index]
    if (slot.combobox === undefined) {
      const gameTime = GetGameTimeMilliseconds()
      const rand = nextUniqueSuffix()
      const comboboxName =
        "HouseTravel_Combobox_Favorites_" +
        tostring(portType) +
        "_" +
        tostring(index) +
        "_" +
        tostring(rand) +
        "_" +
        tostring(gameTime)
      slot.combobox = WINDOW_MANAGER.CreateControlFromVirtual(
        comboboxName,
        container,
        "ZO_ComboBox"
      )
      slot.comboboxButton = WINDOW_MANAGER.GetControlByName(comboboxName + "OpenDropdown")
      const comboboxButton = slot.comboboxButton
      if (comboboxButton !== undefined) {
        comboboxButton.SetHandler("OnMouseEnter", () => {
          houseTravel.BdMyHousesOnMouseEnter(index)
        })
        comboboxButton.SetHandler("OnMouseExit", () => {
          houseTravel.BdMyHousesOnMouseExit(index)
        })
      }
    }
    slot.backDrop = container
    slot.houseId = id

    const combobox = slot.combobox
    if (combobox !== undefined) {
      combobox.SetAnchor(TOPLEFT, container, TOPLEFT, offsetX, 0)
      combobox.SetDimensions(width, height)
      combobox.SetHandler("OnMouseEnter", () => {
        houseTravel.BdMyHousesOnMouseEnter(index)
      })
      combobox.SetHandler("OnMouseExit", () => {
        houseTravel.BdMyHousesOnMouseExit(index)
      })

      if (slot.dropdown === undefined) {
        slot.dropdown = asHouseComboBox(ZO_ComboBox_ObjectFromContainer(combobox))
      }
    }
    const dropdown = slot.dropdown
    if (dropdown !== undefined) {
      dropdown.SetSortsItems(false)
      dropdown.ClearItems()

      let entry = dropdown.CreateItemEntry("-", (control, text, choice) => {
        houseTravel.MyHouseFavoriteCallback(control, text, choice, index, portType)
      })
      dropdown.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      for (let i = 1; i <= 10; i = i + 1) {
        entry = dropdown.CreateItemEntry(i, (control, text, choice) => {
          houseTravel.MyHouseFavoriteCallback(control, text, choice, index, portType)
        })
        dropdown.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      }
      if (value === undefined) {
        dropdown.SetSelectedItem("-")
      } else {
        dropdown.SetSelectedItem(value)
      }
    }
  }
}
houseTravel.CreatePortMyHouseFavorite = createPortMyHouseFavorite
