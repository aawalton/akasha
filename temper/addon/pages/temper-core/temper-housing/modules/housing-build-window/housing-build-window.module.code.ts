import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import {
  asControl,
  asControlHandler,
  asNumber,
  asTreeNode,
  controlsTree,
} from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-build-casts/housing-build-casts.module.code.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import { paintPanel } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-housing/housing-declarations/housing-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function nilWidth(this: void): number {
  return asNumber(undefined)
}

export function buildWindow(this: void): undefined {
  const c = controlsTree(houseTravel.controls)
  const config = houseTravel.config
  const constants = houseTravel.constants
  const ctrlNames = constants.controls

  const bodyHeight =
    config.size.height -
    config.size.headerHeightOffset -
    config.size.headerHeight -
    config.size.gap +
    config.tabHeight

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(ctrlNames.TLW_NAME)
  c.TLW = tlw
  tlw.SetDimensions(config.size.width + FRAME_PADDING * 2, FRAME_TOP + bodyHeight + FRAME_PADDING)
  if (houseTravel.savedVars === undefined || houseTravel.savedVars.position === undefined) {
    tlw.SetAnchor(CENTER, GuiRoot, CENTER, 0, 0)
  } else {
    tlw.SetAnchor(
      TOPLEFT,
      GuiRoot,
      TOPLEFT,
      houseTravel.savedVars.position.x,
      houseTravel.savedVars.position.y
    )
  }
  tlw.SetMovable(config.isMovable)
  tlw.SetMouseEnabled(config.isMouseEnabled)
  tlw.SetClampedToScreen(config.isClampedToScreen)
  tlw.SetDrawLayer(3)
  tlw.SetDrawLevel(0)
  tlw.SetHandler("OnMoveStop", asControlHandler(houseTravel.SaveWindowLocation))
  tlw.SetHidden(true)

  frameWindow(tlw, constants.HEADER_TITLE ?? "", function (this: void): undefined {
    houseTravel.CloseWindow()
  })

  const body = asTreeNode({})
  c.body = body
  const bodyControl = WINDOW_MANAGER.CreateControl(ctrlNames.BODY_CONTROL, tlw, CT_CONTROL)
  body.control = bodyControl
  bodyControl.SetDimensions(config.size.width, bodyHeight)
  bodyControl.SetAnchor(TOPLEFT, tlw, TOPLEFT, FRAME_PADDING, FRAME_TOP)
  bodyControl.SetDrawLayer(0)

  const tabControl = asTreeNode(WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_CONTROL))
  body.tabControl = tabControl
  const tabControlAsControl = asControl(tabControl)
  tabControlAsControl.SetDimensions(nilWidth(), config.tabHeight - config.tabOffset)
  tabControlAsControl.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabOffset)

  tabControl.houseTab = houseTravel.CreateTabControl(
    tabControlAsControl,
    config.tabOffset,
    constants.TAB_HOUSE,
    constants.TAB_HOUSE_TITLE ?? ""
  )
  tabControl.vcTab = houseTravel.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth,
    constants.TAB_VC,
    constants.TAB_VC_TITLE ?? ""
  )
  tabControl.myHousesTab = houseTravel.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth * 2,
    constants.TAB_MYHOUSES,
    constants.TAB_MYHOUSES_TITLE ?? ""
  )
  tabControl.libraryTab = houseTravel.CreateTabControl(
    tabControlAsControl,
    config.tabOffset + config.tabWidth * 3,
    constants.TAB_LIBRARY,
    constants.TAB_LIBRARY_TITLE ?? ""
  )

  const bodyEdge = WINDOW_MANAGER.CreateControl(undefined, bodyControl, CT_BACKDROP)
  body.edge = bodyEdge
  bodyEdge.SetAnchor(TOPLEFT, bodyControl, TOPLEFT, 0, config.tabHeight + config.tabOffset)
  bodyEdge.SetDimensions(
    config.size.width,
    config.size.height -
      config.size.headerHeightOffset -
      config.size.headerHeight -
      config.size.gap -
      config.tabOffset -
      4
  )
  paintPanel(bodyEdge)
}
