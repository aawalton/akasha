import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

const wm = WINDOW_MANAGER

interface SearchSlider extends Control {
  SetOrientation: (this: SearchSlider, orientation: number) => void
  SetMinMax: (this: SearchSlider, min: number, max: number) => void
  SetValueStep: (this: SearchSlider, step: number) => void
  SetValue: (this: SearchSlider, value: number) => void
  GetValue: (this: SearchSlider) => number
  SetThumbTexture: (
    this: SearchSlider,
    filename: string,
    disabledFilename: undefined,
    highlightedFilename: undefined,
    thumbWidth: number,
    thumbHeight: number
  ) => void
}

interface SearchScroll extends Control {
  SetScrollBounding: (this: SearchScroll, bounding: number) => void
}

interface SearchBody extends Control {
  SetSimpleAnchor: (this: SearchBody, relativeTo: Control, offsetX: number, offsetY: number) => void
}

interface SearchBoxControl extends Control {
  backdrop: BackdropControl
  scrollControl: SearchScroll
  bodyControl: SearchBody
  slider: SearchSlider
}

interface HouseControls {
  control: Control
  searchBox: SearchBoxControl
}

function asSearchSlider(value: unknown): SearchSlider {
  return value as SearchSlider
}
function asSearchScroll(value: unknown): SearchScroll {
  return value as SearchScroll
}
function asSearchBody(value: unknown): SearchBody {
  return value as SearchBody
}
function asSearchBoxControl(value: unknown): SearchBoxControl {
  return value as SearchBoxControl
}
function asHouseControls(value: unknown): HouseControls {
  return value as HouseControls
}
function asControl(value: unknown): Control {
  return value as Control
}
function asCtControl(value: number): CtControl {
  return value as CtControl
}

function createEditbox(this: void, container: Control): LuaMultiReturn<[Control, Control]> {
  const bd = wm.CreateControlFromVirtual("", container, "ZO_EditBackdrop")
  const editbox = wm.CreateControlFromVirtual("", bd, "ZO_DefaultEditForBackdrop")
  return $multi(bd, editbox)
}
portToFriend.CreateEditbox = createEditbox

function createSearchBox(
  this: void,
  container: Control,
  offsetX: number,
  offsetY: number,
  width: number
): Control {
  const house = asHouseControls(portToFriend.controls.house)
  const control = asSearchBoxControl(wm.CreateControl("", container, CT_CONTROL))
  control.SetAnchor(TOPLEFT, house.control, TOPLEFT, offsetX, offsetY)
  control.SetDimensions(width, 0)
  control.SetHidden(true)
  control.SetDrawLayer(1)
  control.SetMouseEnabled(true)
  control.SetHandler("OnMouseWheel", (self, delta) => {
    if (typeof delta === "number") {
      portToFriend.SearchBoxOnMouseWheel(asControl(self), delta)
    }
  })

  control.backdrop = CreateControlFromVirtual(
    portToFriend.constants.controls.SEARCH_BODY_BACKDROP,
    control,
    "ZO_SliderBackdrop"
  )
  control.backdrop.SetCenterColor(
    portToFriend.config.color.searchBackdrop.R,
    portToFriend.config.color.searchBackdrop.G,
    portToFriend.config.color.searchBackdrop.B,
    portToFriend.config.color.searchBackdrop.A
  )
  control.backdrop.SetEdgeColor(
    portToFriend.config.color.searchBackdropEdge.R,
    portToFriend.config.color.searchBackdropEdge.G,
    portToFriend.config.color.searchBackdropEdge.B,
    portToFriend.config.color.searchBackdropEdge.A
  )
  control.backdrop.SetDrawLayer(1)

  control.scrollControl = asSearchScroll(wm.CreateControl("", control, CT_SCROLL))
  control.scrollControl.SetDimensions(width - 18, 0)
  control.scrollControl.SetAnchor(TOPLEFT, control, TOPLEFT, 2, 4)
  control.scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)
  control.scrollControl.SetDrawLayer(2)

  control.bodyControl = asSearchBody(wm.CreateControl("", control.scrollControl, CT_CONTROL))
  control.bodyControl.SetDimensions(width - 18, 0)
  control.bodyControl.SetAnchor(TOPLEFT, control.scrollControl, TOPLEFT, 0, 0)
  control.bodyControl.SetDrawLayer(2)
  control.bodyControl.SetHandler("OnMouseWheel", (self, delta) => {
    if (typeof delta === "number") {
      portToFriend.SearchBoxOnMouseWheel(asControl(self), delta)
    }
  })

  control.slider = asSearchSlider(wm.CreateControl("", control, asCtControl(CT_SLIDER)))
  control.slider.SetDrawLayer(4)
  control.slider.SetDrawLevel(1)
  control.slider.SetDimensions(18, 100)
  control.slider.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 0)
  control.slider.SetOrientation(ORIENTATION_VERTICAL)
  control.slider.SetMouseEnabled(true)
  control.slider.SetMinMax(0, 100)
  control.slider.SetThumbTexture(
    "esoui/art/buttons/smoothsliderbutton_up.dds",
    undefined,
    undefined,
    18,
    50
  )
  control.slider.SetValueStep(1)
  control.slider.SetHandler("OnValueChanged", portToFriend.AdjustSearchSlider)

  return control
}
portToFriend.CreateSearchBox = createSearchBox

function searchBoxOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const searchBox = asHouseControls(portToFriend.controls.house).searchBox
  if (searchBox.slider.IsHidden() === false) {
    const searchResult = portToFriend.addonState.searchResult ?? []
    let size = 100 / searchResult.length
    if (size < 1) {
      size = 1
    }
    let position = -delta * size + searchBox.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    searchBox.slider.SetValue(position)
  }
}
portToFriend.SearchBoxOnMouseWheel = searchBoxOnMouseWheel

function adjustSearchSlider(this: void): undefined {
  if (portToFriend.addonState.searchResult !== undefined) {
    const searchBox = asHouseControls(portToFriend.controls.house).searchBox
    let size =
      portToFriend.config.search.height * portToFriend.addonState.searchResult.length -
      portToFriend.config.search.height * portToFriend.config.search.max
    if (size < 0) {
      size = 0
    }

    const slide = (size / 100) * searchBox.slider.GetValue()

    searchBox.bodyControl.SetSimpleAnchor(searchBox.scrollControl, 0, -slide)
  } else {
  }
}
portToFriend.AdjustSearchSlider = adjustSearchSlider

interface WindowControlsTree {
  TLW: Control
  vc?: { TLW?: Control }
}
function asWindowControlsTree(value: unknown): WindowControlsTree {
  return value as WindowControlsTree
}

interface SavedPositionWithVc {
  x: number
  y: number
  vc?: { x: number; y: number }
}
function asSavedPositionWithVc(value: unknown): SavedPositionWithVc {
  return value as SavedPositionWithVc
}

function saveWindowLocation(this: void): undefined {
  const savedVars = portToFriend.savedVars
  if (savedVars === undefined) {
    return
  }
  const controls = asWindowControlsTree(portToFriend.controls)
  const position = asSavedPositionWithVc({})
  savedVars.position = position
  position.x = controls.TLW.GetLeft()
  position.y = controls.TLW.GetTop()
  if (controls.vc !== undefined && controls.vc.TLW !== undefined) {
    position.vc = { x: controls.vc.TLW.GetLeft(), y: controls.vc.TLW.GetTop() }
  }
}
portToFriend.SaveWindowLocation = saveWindowLocation

function openWindow(this: void, callback?: (this: void) => void): undefined {
  const tlw = asWindowControlsTree(portToFriend.controls).TLW
  tlw.SetHidden(false)
  SetGameCameraUIMode(!tlw.IsHidden())
  portToFriend.CreateGuildAndFriendList()
  if (callback !== undefined && type(callback) === "function") {
    portToFriend.addonState.windowCallback = callback
  }
}
portToFriend.OpenWindow = openWindow

function closeWindow(this: void): undefined {
  const tlw = asWindowControlsTree(portToFriend.controls).TLW
  tlw.SetHidden(true)
  SetGameCameraUIMode(!tlw.IsHidden())
  const callback = portToFriend.addonState.windowCallback
  if (callback !== undefined && type(callback) === "function") {
    portToFriend.addonState.windowCallback = undefined
    callback()
  }
}
portToFriend.CloseWindow = closeWindow

function showHelp(this: void): undefined {
  const c = portToFriend.constants
  d(portToFriend.slashCmd + (c.CMD_HELP_1 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_2 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_3 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_4 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_5 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_6 ?? ""))
  d(portToFriend.slashCmd + (c.CMD_HELP_7 ?? ""))
}
portToFriend.ShowHelp = showHelp
