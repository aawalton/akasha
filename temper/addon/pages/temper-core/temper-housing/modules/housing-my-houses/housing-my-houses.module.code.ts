import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import type { SortedMyHouse } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-types/housing-types.module.code.ts"

interface TlwView {
  IsHidden: (this: TlwView) => boolean
}
function asTlwView(value: unknown): TlwView {
  return value as TlwView
}

interface ScrollPanelView {
  SetDimensions: (this: ScrollPanelView, width: number, height: number) => void
  SetSimpleAnchor: (
    this: ScrollPanelView,
    relativeTo: unknown,
    offsetX: number,
    offsetY: number
  ) => void
}
interface SliderView {
  IsHidden: (this: SliderView) => boolean
  GetValue: (this: SliderView) => number
  SetValue: (this: SliderView, value: number) => void
}
interface MyHousesControlsView {
  scrollPanel: ScrollPanelView
  slider: SliderView
  scrollControl: unknown
}
function asMyHousesControlsView(value: unknown): MyHousesControlsView {
  return value as MyHousesControlsView
}

interface RowBackdropView {
  SetDimensions: (this: RowBackdropView, width: number, height: number) => void
  SetHidden: (this: RowBackdropView, hidden: boolean) => void
  ClearAnchors: (this: RowBackdropView) => void
  SetAnchor: (
    this: RowBackdropView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetCenterColor: (this: RowBackdropView, r: number, g: number, b: number, a: number) => void
  SetEdgeColor: (
    this: RowBackdropView,
    r: number,
    g: number,
    b: number,
    a: number,
    weight: number
  ) => void
  SetAlpha: (this: RowBackdropView, alpha: number) => void
}
interface RowLabelView {
  SetDimensions: (this: RowLabelView, width: number, height: number) => void
  SetHidden: (this: RowLabelView, hidden: boolean) => void
  ClearAnchors: (this: RowLabelView) => void
  SetAnchor: (
    this: RowLabelView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetText: (this: RowLabelView, text: string) => void
  SetFont: (this: RowLabelView, font: string) => void
  SetColor: (this: RowLabelView, r: number, g: number, b: number) => void
  SetMouseEnabled: (this: RowLabelView, enabled: boolean) => void
  SetHandler: (this: RowLabelView, event: string, handler: (this: void) => void) => void
}
interface RowButtonView {
  SetHidden: (this: RowButtonView, hidden: boolean) => void
  ClearAnchors: (this: RowButtonView) => void
  SetAnchor: (
    this: RowButtonView,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetDimensions: (this: RowButtonView, width: number, height: number) => void
  SetText: (this: RowButtonView, text: string) => void
  SetClickSound: (this: RowButtonView, sound: string) => void
  SetHandler: (this: RowButtonView, event: string, handler: (this: void) => void) => void
}
interface PurchasedHouseRowView {
  backDrop?: RowBackdropView
  name?: RowLabelView
  location?: RowLabelView
  VCButton?: RowButtonView
  portInsideButton?: RowButtonView
  portOutsideButton?: RowButtonView
}
function asPurchasedHouseRowView(value: unknown): PurchasedHouseRowView {
  return value as PurchasedHouseRowView
}

function asRowBackdropView(value: unknown): RowBackdropView {
  return value as RowBackdropView
}
function asRowLabelView(value: unknown): RowLabelView {
  return value as RowLabelView
}
function asRowButtonView(value: unknown): RowButtonView {
  return value as RowButtonView
}
function asControl(value: unknown): Control {
  return value as Control
}

interface VirtualControlFactory {
  CreateControlFromVirtual: (
    this: VirtualControlFactory,
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ) => Control
}
function asVirtualControlFactory(value: unknown): VirtualControlFactory {
  return value as VirtualControlFactory
}

type HouseId = number
function asHouseId(value: unknown): HouseId {
  return value as HouseId
}

function onPlayerDeactivated(this: void): undefined {
  const savedVars = houseTravel.savedVars
  if (
    savedVars !== undefined &&
    savedVars.port_mode === houseTravel.constants.PORT_MODE_ON_DEACTIVATE &&
    asTlwView(houseTravel.controls.TLW).IsHidden() === false
  ) {
    houseTravel.CloseWindow()
  }
}
houseTravel.OnPlayerDeactivated = onPlayerDeactivated

function sortMyHousesByHouse(this: void, houseA: SortedMyHouse, houseB: SortedMyHouse): boolean {
  if (houseA.houseName === undefined && houseB.houseName === undefined) {
    return true
  } else if (houseA.houseName !== undefined && houseB.houseName === undefined) {
    return true
  } else if (houseA.houseName === undefined && houseB.houseName !== undefined) {
    return false
  }
  return houseA.houseName < houseB.houseName
}
houseTravel.SortMyHousesByHouse = sortMyHousesByHouse

function sortMyHousesByLocation(this: void, houseA: SortedMyHouse, houseB: SortedMyHouse): boolean {
  if (houseA.location === undefined && houseB.location === undefined) {
    return true
  } else if (houseA.location !== undefined && houseB.location === undefined) {
    return true
  } else if (houseA.location === undefined && houseB.location !== undefined) {
    return false
  }
  if (houseA.location < houseB.location) {
    return true
  } else if (houseA.location > houseB.location) {
    return false
  } else {
    return houseTravel.SortMyHousesByHouse(houseA, houseB)
  }
}
houseTravel.SortMyHousesByLocation = sortMyHousesByLocation

function getSortedMyHousesList(this: void): SortedMyHouse[] {
  let sortFunction: (this: void, houseA: SortedMyHouse, houseB: SortedMyHouse) => boolean
  if (houseTravel.addonState.selectedMyHousesSort === houseTravel.constants.SORT_ID_HOUSE) {
    sortFunction = houseTravel.SortMyHousesByHouse
  } else {
    sortFunction = houseTravel.SortMyHousesByLocation
  }
  const purchasedHouses: SortedMyHouse[] = []
  if (houseTravel.purchasedHouses !== undefined) {
    let currentIndex = 0
    for (const key in houseTravel.purchasedHouses) {
      const refId = asHouseId(key)
      const source = houseTravel.purchasedHouses[refId]
      if (source === undefined) {
        continue
      }
      purchasedHouses[currentIndex] = {
        houseId: refId,
        houseName: source.name,
        location: source.location,
      }
      currentIndex = currentIndex + 1
    }
    table.sort(purchasedHouses, sortFunction)
  }
  return purchasedHouses
}
houseTravel.GetSortedMyHousesList = getSortedMyHousesList

function updateMyHouses(this: void): undefined {
  const sortedMyHousesList = houseTravel.GetSortedMyHousesList()
  const myHouses = asMyHousesControlsView(houseTravel.controls.myHouses)

  for (let i = 0; i < sortedMyHousesList.length; i = i + 1) {
    const rowId = i + 1
    const entry = sortedMyHousesList[i]
    if (entry === undefined) {
      continue
    }
    if (houseTravel.controls.purchasedHouses[rowId] === undefined) {
      houseTravel.controls.purchasedHouses[rowId] = {}
    }
    const row = asPurchasedHouseRowView(houseTravel.controls.purchasedHouses[rowId])

    if (row.backDrop === undefined) {
      row.backDrop = asRowBackdropView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(myHouses.scrollPanel), CT_BACKDROP)
      )
    }
    const backDrop = row.backDrop
    backDrop.SetDimensions(houseTravel.config.size.width - 30, 25)
    backDrop.SetHidden(false)
    backDrop.ClearAnchors()
    backDrop.SetAnchor(TOPLEFT, myHouses.scrollPanel, TOPLEFT, 5, 25 * i + 15)
    backDrop.SetCenterColor(
      houseTravel.config.color.backDropLine.R,
      houseTravel.config.color.backDropLine.G,
      houseTravel.config.color.backDropLine.B,
      0.0
    )
    backDrop.SetEdgeColor(
      houseTravel.config.color.backDropLine.R,
      houseTravel.config.color.backDropLine.G,
      houseTravel.config.color.backDropLine.B,
      0.0,
      0
    )
    backDrop.SetAlpha(1)

    if (row.name === undefined) {
      row.name = asRowLabelView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(backDrop), CT_LABEL)
      )
    }
    const nameLabel = row.name
    nameLabel.SetDimensions(235, 25)
    nameLabel.SetHidden(false)
    nameLabel.ClearAnchors()
    nameLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 0, 0)
    nameLabel.SetText(entry.houseName)
    nameLabel.SetFont(houseTravel.config.fonts.header)
    nameLabel.SetColor(
      houseTravel.config.color.default.R,
      houseTravel.config.color.default.G,
      houseTravel.config.color.default.B
    )
    nameLabel.SetMouseEnabled(true)
    nameLabel.SetHandler("OnMouseEnter", () => houseTravel.BdMyHousesOnMouseEnter(rowId))
    nameLabel.SetHandler("OnMouseExit", () => houseTravel.BdMyHousesOnMouseExit(rowId))

    if (row.location === undefined) {
      row.location = asRowLabelView(
        WINDOW_MANAGER.CreateControl(undefined, asControl(backDrop), CT_LABEL)
      )
    }
    const locationLabel = row.location
    locationLabel.SetDimensions(155, 25)
    locationLabel.SetHidden(false)
    locationLabel.ClearAnchors()
    locationLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 235, 0)
    locationLabel.SetText(entry.location)
    locationLabel.SetFont(houseTravel.config.fonts.header)
    locationLabel.SetColor(
      houseTravel.config.color.default.R,
      houseTravel.config.color.default.G,
      houseTravel.config.color.default.B
    )
    locationLabel.SetMouseEnabled(true)
    locationLabel.SetHandler("OnMouseEnter", () => houseTravel.BdMyHousesOnMouseEnter(rowId))
    locationLabel.SetHandler("OnMouseExit", () => houseTravel.BdMyHousesOnMouseExit(rowId))

    if (row.VCButton === undefined) {
      row.VCButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const vcButton = row.VCButton
    vcButton.SetHidden(false)
    vcButton.ClearAnchors()
    vcButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 390, 0)
    vcButton.SetDimensions(50, 25)
    vcButton.SetText(houseTravel.constants.BUTTON_VC ?? "")
    vcButton.SetClickSound("Click")
    vcButton.SetHandler("OnClicked", () => houseTravel.MyHousesToVC(entry.houseId))
    vcButton.SetHandler("OnMouseEnter", () => houseTravel.BdMyHousesOnMouseEnter(rowId))
    vcButton.SetHandler("OnMouseExit", () => houseTravel.BdMyHousesOnMouseExit(rowId))

    let value = houseTravel.GetFavoriteIdFromMyHouseId(
      entry.houseId,
      houseTravel.constants.PORT_TYPE_INSIDE
    )
    houseTravel.CreatePortMyHouseFavorite(
      rowId,
      60,
      25,
      440,
      asControl(backDrop),
      value,
      houseTravel.constants.PORT_TYPE_INSIDE,
      entry.houseId
    )
    if (row.portInsideButton === undefined) {
      row.portInsideButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const portInsideButton = row.portInsideButton
    portInsideButton.SetHidden(false)
    portInsideButton.ClearAnchors()
    portInsideButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 500, 0)
    portInsideButton.SetDimensions(105, 25)
    portInsideButton.SetText(houseTravel.constants.MYHOUSES_PORT_INSIDE ?? "")
    portInsideButton.SetClickSound("Click")
    portInsideButton.SetHandler("OnClicked", () =>
      houseTravel.PortToMyHousesById(entry.houseId, false)
    )
    portInsideButton.SetHandler("OnMouseEnter", () => houseTravel.BdMyHousesOnMouseEnter(rowId))
    portInsideButton.SetHandler("OnMouseExit", () => houseTravel.BdMyHousesOnMouseExit(rowId))

    value = houseTravel.GetFavoriteIdFromMyHouseId(
      entry.houseId,
      houseTravel.constants.PORT_TYPE_OUTSIDE
    )
    houseTravel.CreatePortMyHouseFavorite(
      rowId,
      60,
      25,
      605,
      asControl(backDrop),
      value,
      houseTravel.constants.PORT_TYPE_OUTSIDE,
      entry.houseId
    )
    if (row.portOutsideButton === undefined) {
      row.portOutsideButton = asRowButtonView(
        asVirtualControlFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          asControl(backDrop),
          "ZO_DefaultButton"
        )
      )
    }
    const portOutsideButton = row.portOutsideButton
    portOutsideButton.SetHidden(false)
    portOutsideButton.ClearAnchors()
    portOutsideButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 665, 0)
    portOutsideButton.SetDimensions(105, 25)
    portOutsideButton.SetText(houseTravel.constants.MYHOUSES_FRONT_DOOR ?? "")
    portOutsideButton.SetClickSound("Click")
    portOutsideButton.SetHandler("OnClicked", () =>
      houseTravel.PortToMyHousesById(entry.houseId, true)
    )
    portOutsideButton.SetHandler("OnMouseEnter", () => houseTravel.BdMyHousesOnMouseEnter(rowId))
    portOutsideButton.SetHandler("OnMouseExit", () => houseTravel.BdMyHousesOnMouseExit(rowId))
  }
  myHouses.scrollPanel.SetDimensions(
    houseTravel.config.size.width - 10,
    sortedMyHousesList.length * 25 + 15
  )

  houseTravel.AdjustMyHousesSliderSize()
}
houseTravel.UpdateMyHouses = updateMyHouses

function myHousesPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const myHouses = asMyHousesControlsView(houseTravel.controls.myHouses)
  if (myHouses.slider.IsHidden() === false) {
    let size = 100 / houseTravel.GetNumPurchasedHouses()
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + myHouses.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    myHouses.slider.SetValue(position)
  }
}
houseTravel.MyHousesPanelOnMouseWheel = myHousesPanelOnMouseWheel

function myHousesAdjustSlider(this: void): undefined {
  const myHouses = asMyHousesControlsView(houseTravel.controls.myHouses)
  let size =
    25 * houseTravel.GetNumPurchasedHouses() +
    10 -
    (houseTravel.config.size.height -
      houseTravel.config.size.headerHeightOffset -
      houseTravel.config.size.headerHeight -
      houseTravel.config.size.gap -
      40)
  if (size < 0) {
    size = 0
  }

  const slide = (size / 100) * myHouses.slider.GetValue()

  myHouses.scrollPanel.SetSimpleAnchor(myHouses.scrollControl, 0, -slide)
}
houseTravel.MyHousesAdjustSlider = myHousesAdjustSlider
