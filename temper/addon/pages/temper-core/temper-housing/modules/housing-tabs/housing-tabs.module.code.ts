import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-declarations/housing-declarations.type-declaration.d.ts"

interface TabBackdrop {
  SetCenterColor: (this: TabBackdrop, r: number, g: number, b: number, a?: number) => void
}
interface TabNode {
  backdrop: TabBackdrop
}
interface BodyPanelControl {
  SetHidden: (this: BodyPanelControl, hidden: boolean) => void
}
interface BodyPanel {
  control: BodyPanelControl
}
interface TabControlNode {
  houseTab: TabNode
  vcTab: TabNode
  myHousesTab: TabNode
  libraryTab: TabNode
}

function asTabControlNode(value: unknown): TabControlNode {
  return value as TabControlNode
}
function asBodyPanel(value: unknown): BodyPanel {
  return value as BodyPanel
}

interface BodyControls {
  tabControl: unknown
}
function asBodyControls(value: unknown): BodyControls {
  return value as BodyControls
}

interface EdgeBackdropControl {
  SetAnchor: (
    this: EdgeBackdropControl,
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  SetDimensions: (this: EdgeBackdropControl, width: number, height: number) => void
  SetEdgeTexture: (
    this: EdgeBackdropControl,
    texture: string | undefined,
    width: number,
    height: number,
    padding: number,
    inner: number
  ) => void
  SetCenterColor: (this: EdgeBackdropControl, r: number, g: number, b: number, a?: number) => void
  SetEdgeColor: (this: EdgeBackdropControl, r: number, g: number, b: number, a?: number) => void
}

interface TabControl extends Control {
  backdrop: BackdropControl
  edge: EdgeBackdropControl
  label: LabelControl
  button: ButtonControl
}
function asTabControl(value: unknown): TabControl {
  return value as TabControl
}
function asEdgeBackdropControl(value: unknown): EdgeBackdropControl {
  return value as EdgeBackdropControl
}

function getTabControlNode(this: void): TabControlNode {
  return asTabControlNode(asBodyControls(houseTravel.controls.body).tabControl)
}

function createTabControl(
  this: void,
  rootControl: Control,
  offset: number,
  index: number,
  title: string
): Control {
  const config = houseTravel.config
  const control = asTabControl(WINDOW_MANAGER.CreateControl(undefined, rootControl, CT_CONTROL))
  control.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.SetAnchor(TOPLEFT, rootControl, TOPLEFT, offset, config.tabOffset)

  control.backdrop = WINDOW_MANAGER.CreateControl(undefined, control, CT_BACKDROP)
  control.backdrop.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.backdrop.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.backdrop.SetCenterColor(
    config.color.tabNotSelected.r,
    config.color.tabNotSelected.g,
    config.color.tabNotSelected.b,
    config.color.tabNotSelected.a
  )
  control.backdrop.SetEdgeColor(0, 0, 0, 0)

  control.edge = asEdgeBackdropControl(
    WINDOW_MANAGER.CreateControl(undefined, control, CT_BACKDROP)
  )
  control.edge.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.edge.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.edge.SetEdgeTexture(undefined, 1, 1, 2, 0)
  control.edge.SetCenterColor(0, 0, 0, 0)
  control.edge.SetEdgeColor(
    config.color.edgeColor.r,
    config.color.edgeColor.g,
    config.color.edgeColor.b,
    config.color.edgeColor.a
  )

  control.label = WINDOW_MANAGER.CreateControl(undefined, control, CT_LABEL)
  control.label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  control.label.SetFont(config.tabFont)
  control.label.SetWrapMode(ELLIPSIS)
  control.label.SetColor(
    config.color.tabFontColor.r,
    config.color.tabFontColor.g,
    config.color.tabFontColor.b
  )
  control.label.SetText(title)
  control.label.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  control.label.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  control.label.SetVerticalAlignment(TEXT_ALIGN_CENTER)

  control.button = WINDOW_MANAGER.CreateControl(undefined, control, CT_BUTTON)
  const button = control.button
  button.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  button.SetDimensions(config.tabWidth, config.tabHeight - config.tabOffset)
  button.SetHandler("OnClicked", () => {
    houseTravel.TabSelected(index)
  })
  button.SetHandler("OnMouseEnter", () => {
    houseTravel.TabOnMouseEnter(index)
  })
  button.SetHandler("OnMouseExit", () => {
    houseTravel.TabOnMouseExit(index)
  })

  return control
}
houseTravel.CreateTabControl = createTabControl

function tabSelected(this: void, index: number): undefined {
  const color = houseTravel.config.color.tabNotSelected
  const constants = houseTravel.constants
  const tabControl = getTabControlNode()
  if (index !== constants.TAB_HOUSE) {
    tabControl.houseTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_VC) {
    tabControl.vcTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_MYHOUSES) {
    tabControl.myHousesTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  if (index !== constants.TAB_LIBRARY) {
    tabControl.libraryTab.backdrop.SetCenterColor(color.r, color.g, color.b, color.a)
  }
  houseTravel.addonState.selectedTab = index

  const house = asBodyPanel(houseTravel.controls.house)
  const vc = asBodyPanel(houseTravel.controls.vc)
  const myHouses = asBodyPanel(houseTravel.controls.myHouses)
  const library = asBodyPanel(houseTravel.controls.library)

  if (index === constants.TAB_HOUSE) {
    house.control.SetHidden(false)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_VC) {
    house.control.SetHidden(true)
    vc.control.SetHidden(false)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_MYHOUSES) {
    house.control.SetHidden(true)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(false)
    library.control.SetHidden(true)
  }
  if (index === constants.TAB_LIBRARY) {
    house.control.SetHidden(true)
    vc.control.SetHidden(true)
    myHouses.control.SetHidden(true)
    library.control.SetHidden(false)
  }
}
houseTravel.TabSelected = tabSelected

function getTabBackdropForIndex(this: void, index: number): TabBackdrop | undefined {
  const constants = houseTravel.constants
  const tabControl = getTabControlNode()
  if (index === constants.TAB_HOUSE) {
    return tabControl.houseTab.backdrop
  }
  if (index === constants.TAB_VC) {
    return tabControl.vcTab.backdrop
  }
  if (index === constants.TAB_MYHOUSES) {
    return tabControl.myHousesTab.backdrop
  }
  if (index === constants.TAB_LIBRARY) {
    return tabControl.libraryTab.backdrop
  }
  return undefined
}

function tabOnMouseEnter(this: void, index: number): undefined {
  const control = getTabBackdropForIndex(index)
  const color = houseTravel.config.color.tabMouseOver
  if (control !== undefined) {
    control.SetCenterColor(color.r, color.g, color.b, color.a)
  }
}
houseTravel.TabOnMouseEnter = tabOnMouseEnter

function tabOnMouseExit(this: void, index: number): undefined {
  const control = getTabBackdropForIndex(index)
  let color = houseTravel.config.color.tabSelected
  if (index !== houseTravel.addonState.selectedTab) {
    color = houseTravel.config.color.tabNotSelected
  }
  if (control !== undefined) {
    control.SetCenterColor(color.r, color.g, color.b, color.a)
  }
}
houseTravel.TabOnMouseExit = tabOnMouseExit
