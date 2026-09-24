import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"

interface SliderControl extends Control {
  GetValue: (this: SliderControl) => number
  SetValue: (this: SliderControl, value: number) => void
}

interface ScrollPanelControl extends Control {
  SetSimpleAnchor: (
    this: ScrollPanelControl,
    control: Control,
    offsetX: number,
    offsetY: number
  ) => void
}

interface PanelControls {
  slider: SliderControl
  scrollPanel: ScrollPanelControl
  scrollControl: Control
}

function asPanelControls(value: unknown): PanelControls {
  return value as PanelControls
}

function adjustLibrarySlider(this: void): undefined {
  const currentDataCount = houseTravel.GetFilteredLibraryData().length
  let size =
    25 * currentDataCount +
    25 -
    (houseTravel.config.size.height -
      houseTravel.config.size.headerHeightOffset -
      houseTravel.config.size.headerHeight -
      houseTravel.config.size.gap -
      100)
  if (size < 0) {
    size = 0
  }

  const library = asPanelControls(houseTravel.controls.library)
  const slide = (size / 100) * library.slider.GetValue()

  library.scrollPanel.SetSimpleAnchor(library.scrollControl, 0, -slide)
}
houseTravel.AdjustLibrarySlider = adjustLibrarySlider

function adjustSlider(this: void): undefined {
  if (houseTravel.savedVars !== undefined && houseTravel.savedVars.favorites !== undefined) {
    let size =
      25 * houseTravel.savedVars.favorites.length +
      25 -
      (houseTravel.config.size.height -
        houseTravel.config.size.headerHeightOffset -
        houseTravel.config.size.headerHeight -
        houseTravel.config.size.gap -
        80)
    if (size < 0) {
      size = 0
    }

    const house = asPanelControls(houseTravel.controls.house)
    const slide = (size / 100) * house.slider.GetValue()

    house.scrollPanel.SetSimpleAnchor(house.scrollControl, 0, -slide)
  }
}
houseTravel.AdjustSlider = adjustSlider

function adjustLibrarySliderSize(this: void): undefined {
  const currentDataCount = houseTravel.GetFilteredLibraryData().length
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    houseTravel.config.size.height -
    houseTravel.config.size.headerHeightOffset -
    houseTravel.config.size.headerHeight -
    houseTravel.config.size.gap -
    100

  const library = asPanelControls(houseTravel.controls.library)
  if (totalSize <= screenSize) {
    if (houseTravel.addonState.isScrollable === true) {
      library.slider.SetValue(0)
    }
    library.slider.SetHidden(true)
    houseTravel.addonState.isScrollable = false
  } else {
    library.slider.SetHidden(false)
    houseTravel.addonState.isScrollable = true
  }
}
houseTravel.AdjustLibrarySliderSize = adjustLibrarySliderSize

function adjustMyHousesSliderSize(this: void): undefined {
  const currentDataCount = houseTravel.GetNumPurchasedHouses()
  const totalSize = 25 * currentDataCount + 25
  const screenSize =
    houseTravel.config.size.height -
    houseTravel.config.size.headerHeightOffset -
    houseTravel.config.size.headerHeight -
    houseTravel.config.size.gap -
    40

  const myHouses = asPanelControls(houseTravel.controls.myHouses)
  if (totalSize <= screenSize) {
    if (houseTravel.addonState.isMyHousesScrollable === true) {
      myHouses.slider.SetValue(0)
    }
    myHouses.slider.SetHidden(true)
    houseTravel.addonState.isMyHousesScrollable = false
  } else {
    myHouses.slider.SetHidden(false)
    houseTravel.addonState.isMyHousesScrollable = true
  }
}
houseTravel.AdjustMyHousesSliderSize = adjustMyHousesSliderSize

function adjustSliderSize(this: void): undefined {
  const favoriteCount =
    houseTravel.savedVars !== undefined ? houseTravel.savedVars.favorites.length : 0
  const totalSize = 25 * favoriteCount + 25
  const screenSize =
    houseTravel.config.size.height -
    houseTravel.config.size.headerHeightOffset -
    houseTravel.config.size.headerHeight -
    houseTravel.config.size.gap -
    80

  const house = asPanelControls(houseTravel.controls.house)
  if (totalSize <= screenSize) {
    if (houseTravel.addonState.isScrollable === true) {
      house.slider.SetValue(0)
    }
    house.slider.SetHidden(true)
    houseTravel.addonState.isScrollable = false
  } else {
    house.slider.SetHidden(false)
    houseTravel.addonState.isScrollable = true
  }
}
houseTravel.AdjustSliderSize = adjustSliderSize
