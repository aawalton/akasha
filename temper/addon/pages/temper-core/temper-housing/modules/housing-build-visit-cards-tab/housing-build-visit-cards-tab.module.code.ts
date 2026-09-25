import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
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
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-declarations/housing-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const ROW_HEIGHT = 25

const NAME_ROW = 8

const HOUSE_ROW = NAME_ROW + ROW_HEIGHT + spaceOf("1")

const BUTTON_ROW = HOUSE_ROW + ROW_HEIGHT + spaceOf("2")

const LIST_TOP = BUTTON_ROW + ROW_HEIGHT + spaceOf("2")

const BUTTON = 125

const WIDE_BUTTON = 175

const SEND_LEFT = BUTTON + spaceOf("1")

const PORT_LEFT = SEND_LEFT + WIDE_BUTTON + spaceOf("1")

const REMOVE_LEFT = PORT_LEFT + BUTTON + spaceOf("1")

export function buildVcTab(this: void): undefined {
  const c = controlsTree(houseTravel.controls)
  const config = houseTravel.config
  const constants = houseTravel.constants
  const body = asTreeNode(c.body)
  const bodyControl = asControl(body.control)

  const vc = asTreeNode({})
  c.vc = vc

  const vcControl = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL)
  vc.control = vcControl
  vcControl.SetDimensions(
    config.size.width,
    config.size.height - config.size.headerHeightOffset - config.size.headerHeight - config.size.gap
  )
  vcControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight)
  vcControl.SetDrawLayer(0)

  const nameLabel = WINDOW_MANAGER.CreateControl(undefined, vcControl, CT_LABEL)
  vc.nameLabel = nameLabel
  nameLabel.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 8, NAME_ROW)
  nameLabel.SetFont(config.fonts.header)
  nameLabel.SetWrapMode(ELLIPSIS)
  nameLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  nameLabel.SetText(constants.VC_PLAYER ?? "")
  nameLabel.SetDimensions(config.vc.size.width - 6, 25)

  const houseLabel = WINDOW_MANAGER.CreateControl(undefined, vcControl, CT_LABEL)
  vc.houseLabel = houseLabel
  houseLabel.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 8, HOUSE_ROW)
  houseLabel.SetFont(config.fonts.header)
  houseLabel.SetWrapMode(ELLIPSIS)
  houseLabel.SetColor(config.color.default.R, config.color.default.G, config.color.default.B)
  houseLabel.SetText(constants.VC_HOUSE ?? "")
  houseLabel.SetDimensions(config.vc.size.width - 6, 25)

  const addFavoriteButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.addFavoriteButton = addFavoriteButton
  addFavoriteButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 0, BUTTON_ROW)
  addFavoriteButton.SetDimensions(BUTTON, ROW_HEIGHT)
  addFavoriteButton.SetText(constants.BUTTON_ADD_FAVORITE ?? "")
  addFavoriteButton.SetClickSound("Click")
  addFavoriteButton.SetHandler("OnClicked", asControlHandler(houseTravel.VCAddFavorite))

  const vcButton = CreateControlFromVirtual<ButtonControl>(nilName(), vcControl, "ZO_DefaultButton")
  vc.vcButton = vcButton
  vcButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, SEND_LEFT, BUTTON_ROW)
  vcButton.SetDimensions(WIDE_BUTTON, ROW_HEIGHT)
  vcButton.SetText(constants.BUTTON_SEND_VISITCARD ?? "")
  vcButton.SetClickSound("Click")
  vcButton.SetHandler("OnClicked", asControlHandler(houseTravel.VCSendVC))

  const portButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.portButton = portButton
  portButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, PORT_LEFT, BUTTON_ROW)
  portButton.SetDimensions(BUTTON, ROW_HEIGHT)
  portButton.SetText(constants.BUTTON_PORT ?? "")
  portButton.SetClickSound("Click")
  portButton.SetHandler("OnClicked", asControlHandler(houseTravel.VCPort))

  const removeButton = CreateControlFromVirtual<ButtonControl>(
    nilName(),
    vcControl,
    "ZO_DefaultButton"
  )
  vc.removeButton = removeButton
  removeButton.SetAnchor(TOPLEFT, vcControl, TOPLEFT, REMOVE_LEFT, BUTTON_ROW)
  removeButton.SetDimensions(BUTTON, ROW_HEIGHT)
  removeButton.SetText(constants.BUTTON_REMOVE ?? "")
  removeButton.SetClickSound("Click")
  removeButton.SetHandler("OnClicked", asControlHandler(houseTravel.VCRemoveVC))

  addFavoriteButton.SetEnabled(false)
  vcButton.SetEnabled(false)
  portButton.SetEnabled(false)
  removeButton.SetEnabled(false)

  const scrollControl = asScrollView(
    WINDOW_MANAGER.CreateControl(constants.controls.VC_SCROLL_CONTROL, vcControl, CT_SCROLL)
  )
  vc.scrollControl = scrollControl
  scrollControl.SetDimensions(
    config.size.width - 10,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      LIST_TOP -
      5
  )
  scrollControl.SetAnchor(TOPLEFT, vcControl, TOPLEFT, 5, LIST_TOP)
  scrollControl.SetScrollBounding(SCROLL_BOUNDING_CONTAINED)

  const scrollPanel = WINDOW_MANAGER.CreateControl(undefined, scrollControl, CT_CONTROL)
  vc.scrollPanel = scrollPanel
  scrollPanel.SetDimensions(config.size.width - 10, 40)
  scrollPanel.SetAnchor(TOPLEFT, scrollControl, TOPLEFT, 0, 0)
  scrollPanel.SetMouseEnabled(true)
  scrollPanel.SetHandler("OnMouseWheel", asControlHandler(houseTravel.VCPanelOnMouseWheel))

  const slider = asSliderView(
    WINDOW_MANAGER.CreateControl(undefined, vcControl, asCtControl(CT_SLIDER))
  )
  vc.slider = slider
  slider.SetDimensions(
    25,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      LIST_TOP
  )
  slider.SetAnchor(TOPRIGHT, vcControl, TOPRIGHT, 0, LIST_TOP)
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
  slider.SetHandler("OnValueChanged", asControlHandler(houseTravel.VCAdjustSlider))

  houseTravel.UpdateVisitCardList()
}
