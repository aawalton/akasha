import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import {
  getHouseSavedVars,
  houseTravel,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { PurchasedHouse } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

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
  houseTravel.purchasedHouses = {}
  for (const collectible of data) {
    if (collectible.IsHouse() === true) {
      retHouses[collectible.GetReferenceId()] = collectible.GetFormattedName()
      if (collectible.IsLocked() === false) {
        const refId = collectible.GetReferenceId()
        const purchased: PurchasedHouse = {
          name: collectible.GetFormattedName(),
          location: zo_strformat("<<C:1>>", collectible.GetHouseLocation()),
        }
        houseTravel.purchasedHouses[refId] = purchased
      }
    }
  }
  return retHouses
}
houseTravel.CreateHouseList = createHouseList

function getNumPurchasedHouses(this: void): number {
  let ret = 0
  for (const [, house] of pairs(houseTravel.purchasedHouses)) {
    if (house !== undefined) {
      ret = ret + 1
    }
  }
  return ret
}
houseTravel.GetNumPurchasedHouses = getNumPurchasedHouses

function libraryPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const library = asListPanel(houseTravel.controls.library)
  if (library.slider.IsHidden() === false) {
    const size = 100 / houseTravel.libData.currentData.length
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
houseTravel.LibraryPanelOnMouseWheel = libraryPanelOnMouseWheel

function favoritePanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const house = asListPanel(houseTravel.controls.house)
  if (house.slider.IsHidden() === false) {
    const savedVars = getHouseSavedVars()
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
houseTravel.FavoritePanelOnMouseWheel = favoritePanelOnMouseWheel
