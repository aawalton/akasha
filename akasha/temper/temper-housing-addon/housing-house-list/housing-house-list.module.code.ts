import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-interface-extra-3"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { getPtfSavedVars, portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { PurchasedHouse } from "../housing-types/housing-types.module.code.ts"

interface ListSlider {
  IsHidden: (this: ListSlider) => boolean
  GetValue: (this: ListSlider) => number
  SetValue: (this: ListSlider, value: number) => void
}
interface ListPanel {
  slider: ListSlider
}
function asListPanel(value: unknown): ListPanel {
  return value as ListPanel
}

function createHouseList(this: void): Record<number, string> {
  const data = ZO_COLLECTIBLE_DATA_MANAGER.GetAllCollectibleDataObjects()
  const retHouses: Record<number, string> = {}
  portToFriend.purchasedHouses = {}
  for (const collectible of data) {
    if (collectible.IsHouse() === true) {
      retHouses[collectible.GetReferenceId()] = collectible.GetFormattedName()
      if (collectible.IsLocked() === false) {
        const refId = collectible.GetReferenceId()
        const purchased: PurchasedHouse = {
          name: collectible.GetFormattedName(),
          location: zo_strformat("<<C:1>>", collectible.GetHouseLocation()),
        }
        portToFriend.purchasedHouses[refId] = purchased
      }
    }
  }
  return retHouses
}
portToFriend.CreateHouseList = createHouseList

function getNumPurchasedHouses(this: void): number {
  let ret = 0
  for (const [, house] of pairs(portToFriend.purchasedHouses)) {
    if (house !== undefined) {
      ret = ret + 1
    }
  }
  return ret
}
portToFriend.GetNumPurchasedHouses = getNumPurchasedHouses

function libraryPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const library = asListPanel(portToFriend.controls.library)
  if (library.slider.IsHidden() === false) {
    const size = 100 / portToFriend.libData.currentData.length
    let position = -delta * size * 2 + library.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    library.slider.SetValue(position)
  }
}
portToFriend.LibraryPanelOnMouseWheel = libraryPanelOnMouseWheel

function favoritePanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const house = asListPanel(portToFriend.controls.house)
  if (house.slider.IsHidden() === false) {
    const savedVars = getPtfSavedVars()
    let size = 100 / savedVars.favorites.length
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + house.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    house.slider.SetValue(position)
  }
}
portToFriend.FavoritePanelOnMouseWheel = favoritePanelOnMouseWheel
