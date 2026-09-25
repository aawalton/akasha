import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import {
  asControl,
  asControlHandler,
  asCtControl,
  asScrollView,
  asSliderView,
  asTreeNode,
  controlsTree,
  nilName,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-casts/housing-build-casts.module.code.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const ROW_HEIGHT = 25

const FIRST_ROW = 15

const SECOND_ROW = FIRST_ROW + ROW_HEIGHT + spaceOf("2")

const LIST_TOP = SECOND_ROW + ROW_HEIGHT + spaceOf("2")

const FIELD_RIGHT = 335

const PORT_LEFT = 670

const DROPDOWN_LEFT = FIELD_RIGHT + spaceOf("2")

const WIDE_BUTTON = 175

const SEND_LEFT = PORT_LEFT - spaceOf("4") - WIDE_BUTTON

const MAIN_LEFT = SEND_LEFT - spaceOf("4") - WIDE_BUTTON

export function buildHouseTab(this: void): undefined {
  const c = controlsTree(houseTravel.controls)
  const config = houseTravel.config
  const constants = houseTravel.constants
  const ctrlNames = constants.controls
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const house = asTreeNode({})
  c.house = house

  const houseControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  house.control = houseControl
  houseControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  houseControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  houseControl.SetDrawLayer(0)

  const labelPlayer = WINDOW_MANAGER.CreateControl(ctrlNames.BODY_EDITBOX, houseControl, CT_LABEL)
  house.labelPlayer = labelPlayer
  labelPlayer.SetDimensions(80, 25)
  labelPlayer.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 5, FIRST_ROW)
  labelPlayer.SetText(constants.LABEL_PLAYER ?? "")
  labelPlayer.SetFont(config.fonts.header)
  labelPlayer.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)

  const [editboxbg, editbox] = houseTravel.CreateEditbox(houseControl)
  house.editboxbg = editboxbg
  house.editbox = editbox
  editboxbg.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 85, FIRST_ROW)
  editboxbg.SetDimensions(config.search.width, 25)

  const editboxControl = asEditControl(editbox)
  editboxControl.SetText("")
  editboxControl.SetMaxInputChars(128)
  editboxControl.SetHandler("OnTextChanged", asControlHandler(houseTravel.SearchTextChanged))
  editboxControl.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 85, FIRST_ROW)
  editboxControl.SetDimensions(config.search.width, 25)

  const combobox = WINDOW_MANAGER.CreateControlFromVirtual(
    ctrlNames.BODY_DROPDOWN,
    houseControl,
    "ZO_ScrollableComboBox"
  )
  house.combobox = combobox
  combobox.SetAnchor(TOPLEFT, houseControl, TOPLEFT, DROPDOWN_LEFT, FIRST_ROW)
  combobox.SetDimensions(PORT_LEFT - spaceOf("2") - DROPDOWN_LEFT, ROW_HEIGHT)
  const dropdown = ZO_ComboBox_ObjectFromContainer(combobox)
  house.dropdown = dropdown
  houseTravel.CreateDropdownEntries(dropdown)

  const buttonPort = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonPort = buttonPort
  buttonPort.SetAnchor(TOPLEFT, houseControl, TOPLEFT, PORT_LEFT, FIRST_ROW)
  buttonPort.SetDimensions(125, 25)
  buttonPort.SetText(constants.BUTTON_PORT ?? "")
  buttonPort.SetClickSound("Click")
  buttonPort.SetHandler("OnClicked", asControlHandler(houseTravel.HouseTravel))

  const buttonAddFavorite = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonAddFavorite = buttonAddFavorite
  buttonAddFavorite.SetAnchor(TOPLEFT, houseControl, TOPLEFT, PORT_LEFT, SECOND_ROW)
  buttonAddFavorite.SetDimensions(125, 25)
  buttonAddFavorite.SetText(constants.BUTTON_ADD_FAVORITE ?? "")
  buttonAddFavorite.SetClickSound("Click")
  buttonAddFavorite.SetHandler("OnClicked", asControlHandler(houseTravel.AddToFavorite))

  const buttonPortMain = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonPortMain = buttonPortMain
  buttonPortMain.SetAnchor(TOPLEFT, houseControl, TOPLEFT, MAIN_LEFT, SECOND_ROW)
  buttonPortMain.SetDimensions(WIDE_BUTTON, ROW_HEIGHT)
  buttonPortMain.SetText(constants.BUTTON_MAIN_RESIDENCE ?? "")
  buttonPortMain.SetClickSound("Click")
  buttonPortMain.SetHandler("OnClicked", asControlHandler(houseTravel.PortToMainResidence))

  const buttonSendVisitCard = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    nilName(),
    houseControl,
    "ZO_DefaultButton"
  )
  house.buttonSendVisitCard = buttonSendVisitCard
  buttonSendVisitCard.SetAnchor(TOPLEFT, houseControl, TOPLEFT, SEND_LEFT, SECOND_ROW)
  buttonSendVisitCard.SetDimensions(WIDE_BUTTON, ROW_HEIGHT)
  buttonSendVisitCard.SetText(constants.BUTTON_SEND_VISITCARD ?? "")
  buttonSendVisitCard.SetClickSound("Click")
  buttonSendVisitCard.SetHandler("OnClicked", asControlHandler(houseTravel.SendVisitCard))

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(ctrlNames.SCROLL_CONTROL, houseControl, CT_SCROLL)
  )
  house.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      LIST_TOP -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, houseControl, TOPLEFT, 5, LIST_TOP)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  house.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 40)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 0)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(houseTravel.FavoritePanelOnMouseWheel))

  const slider = asSliderView(
    WINDOW_MANAGER.CreateControl(undefined, houseControl, asCtControl(CT_SLIDER))
  )
  house.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      LIST_TOP
  )
  slider.SetAnchor(TOPRIGHT, houseControl, TOPRIGHT, 0, LIST_TOP)
  slider.SetOrientation(ORIENTATION_VERTICAL)
  slider.SetMouseEnabled(true)
  slider.SetMinMax(0, 100)
  slider.SetThumbTexture(
    "esoui/art/buttons/smoothsliderbutton_up.dds",
    undefined,
    undefined,
    25,
    50
  )
  slider.SetValueStep(1)
  slider.SetHandler("OnValueChanged", asControlHandler(houseTravel.AdjustSlider))

  houseTravel.CreateFavorites()
  house.searchBox = houseTravel.CreateSearchBox(houseControl, 85, 38, config.search.width)
}

function asEditControl(value: Control): EditControl {
  return value as EditControl
}
