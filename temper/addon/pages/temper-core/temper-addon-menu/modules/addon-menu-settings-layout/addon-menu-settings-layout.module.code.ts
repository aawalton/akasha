import {
  createAddonList,
  createSearchFilterBox,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-addon-list/addon-menu-addon-list.module.code.ts"
import {
  handleLoadDefaultsPressed,
  handleReloadUIPressed,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-dialogs/addon-menu-dialogs.module.code.ts"
import {
  lam,
  wm,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-string-ids/addon-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function createAddonSettingsWindow(this: void): Control {
  const tlw = wm.CreateTopLevelWindow("TemperAddonMenuSettingsWindow")
  tlw.SetHidden(true)
  tlw.SetDimensions(1010, 914)

  ZO_ReanchorControlForLeftSidePanel(tlw)

  const bgLeft = wm.CreateControl("$(parent)BackgroundLeft", tlw, CT_TEXTURE)
  bgLeft.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_left.dds")
  bgLeft.SetDimensions(1024, 1024)
  bgLeft.SetAnchor(TOPLEFT, undefined, TOPLEFT)
  bgLeft.SetDrawLayer(DL_BACKGROUND)
  bgLeft.SetExcludeFromResizeToFitExtents(true)

  const bgRight = wm.CreateControl("$(parent)BackgroundRight", tlw, CT_TEXTURE)
  bgRight.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_right.dds")
  bgRight.SetDimensions(64, 1024)
  bgRight.SetAnchor(TOPLEFT, bgLeft, TOPRIGHT)
  bgRight.SetDrawLayer(DL_BACKGROUND)
  bgRight.SetExcludeFromResizeToFitExtents(true)

  const underlayLeft = wm.CreateControl("$(parent)UnderlayLeft", tlw, CT_TEXTURE)
  underlayLeft.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_indexArea_left.dds")
  underlayLeft.SetDimensions(256, 1024)
  underlayLeft.SetAnchor(TOPLEFT, bgLeft, TOPLEFT)
  underlayLeft.SetDrawLayer(DL_BACKGROUND)
  underlayLeft.SetExcludeFromResizeToFitExtents(true)

  const underlayRight = wm.CreateControl("$(parent)UnderlayRight", tlw, CT_TEXTURE)
  underlayRight.SetTexture("EsoUI/Art/Miscellaneous/centerscreen_indexArea_right.dds")
  underlayRight.SetDimensions(128, 1024)
  underlayRight.SetAnchor(TOPLEFT, underlayLeft, TOPRIGHT)
  underlayRight.SetDrawLayer(DL_BACKGROUND)
  underlayRight.SetExcludeFromResizeToFitExtents(true)

  const title = wm.CreateControl("$(parent)Title", tlw, CT_LABEL)
  title.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 70)
  title.SetFont("ZoFontWinH1")
  title.SetModifyTextType(MODIFY_TEXT_TYPE_UPPERCASE)

  const divider = wm.CreateControlFromVirtual("$(parent)Divider", tlw, "ZO_Options_Divider")
  divider.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 108)

  const srchBox = createSearchFilterBox("$(parent)SearchFilter", tlw)
  srchBox.SetAnchor(TOPLEFT, undefined, TOPLEFT, 63, 120)
  srchBox.SetDimensions(260, 30)

  const addonList = createAddonList("$(parent)AddonList", tlw)
  addonList.SetAnchor(TOPLEFT, undefined, TOPLEFT, 65, 160)
  addonList.SetDimensions(285, 665)

  lam.addonList = addonList

  const panelContainer = wm.CreateControl("$(parent)PanelContainer", tlw, CT_CONTROL)
  panelContainer.SetAnchor(TOPLEFT, undefined, TOPLEFT, 365, 120)
  panelContainer.SetDimensions(645, 675)

  const defaultButton = wm.CreateControlFromVirtual(
    "$(parent)ResetToDefaultButton",
    tlw,
    "ZO_DialogButton"
  )
  ZO_KeybindButtonTemplate_Setup(
    defaultButton,
    "OPTIONS_LOAD_DEFAULTS",
    handleLoadDefaultsPressed,
    GetString(SI_OPTIONS_DEFAULTS)
  )
  defaultButton.SetAnchor(TOPLEFT, panelContainer, BOTTOMLEFT, 0, 2)
  lam.defaultButton = defaultButton

  const applyButton = wm.CreateControlFromVirtual("$(parent)ApplyButton", tlw, "ZO_DialogButton")
  ZO_KeybindButtonTemplate_Setup(
    applyButton,
    "OPTIONS_APPLY_CHANGES",
    handleReloadUIPressed,
    GetString(SI_ADDON_MANAGER_RELOAD)
  )
  applyButton.SetAnchor(TOPRIGHT, panelContainer, BOTTOMRIGHT, 0, 2)
  applyButton.SetHidden(true)
  lam.applyButton = applyButton

  return tlw
}
