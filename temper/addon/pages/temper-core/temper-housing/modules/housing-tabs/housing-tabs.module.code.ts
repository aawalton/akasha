import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-declarations/housing-declarations.type-declaration.d.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  setTabChosen,
  styleTab,
} from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"

interface TabNode {
  label: LabelControl
  button: ButtonControl
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

interface TabControl extends Control {
  label: LabelControl
  button: ButtonControl
}
function asTabControl(value: unknown): TabControl {
  return value as TabControl
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

  control.label = WINDOW_MANAGER.CreateControl(undefined, control, CT_LABEL)
  control.label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
  styleText(control.label, "muted")
  control.label.SetWrapMode(ELLIPSIS)
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
  styleTab(button)

  return control
}
houseTravel.CreateTabControl = createTabControl

function showTab(this: void, tab: TabNode, chosen: boolean): undefined {
  setTabChosen(tab.button, chosen)
  styleText(tab.label, chosen ? "heading" : "muted")
  return undefined
}

function tabSelected(this: void, index: number): undefined {
  const constants = houseTravel.constants
  const tabControl = getTabControlNode()
  showTab(tabControl.houseTab, index === constants.TAB_HOUSE)
  showTab(tabControl.vcTab, index === constants.TAB_VC)
  showTab(tabControl.myHousesTab, index === constants.TAB_MYHOUSES)
  showTab(tabControl.libraryTab, index === constants.TAB_LIBRARY)
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

function tabOnPointer(this: void, _index: number): undefined {
  return undefined
}
houseTravel.TabOnMouseEnter = tabOnPointer
houseTravel.TabOnMouseExit = tabOnPointer
