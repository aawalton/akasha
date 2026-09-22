import {
  DEFAULT_ITEM_FONT,
  DIVIDER,
  HEADER_FONT,
  MENU_ADD_OPTION_HEADER,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-constants/custom-menu-constants.module.code.ts"
import type {
  LcmRowControl,
  MenuEntry,
  Submenu,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/eso-menu/eso-menu.module.code.ts"
import { getValueOrCallback } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/menu-row-setup/menu-row-setup.module.code.ts"
import {
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_HIGHLIGHT,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/submenu-text-colors/submenu-text-colors.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-filters/eso-world-map-filters.type-declaration.d.ts"

export function updateSubmenuAnchors(this: void, self: Submenu): undefined {
  let previousItem: Control = self.control
  const items = self.items
  let width = 0
  let height = 0
  const padding = menu.menuPad
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item === undefined) {
      continue
    }
    const [textWidth, textHeight] = item.nameLabel.GetTextDimensions()
    width = zo_max(textWidth + padding * 2, width)
    height = height + textHeight
    item.ClearAnchors()
    if (i === 0) {
      item.SetAnchor(TOPLEFT, previousItem, TOPLEFT, padding, padding)
      item.SetAnchor(TOPRIGHT, previousItem, TOPRIGHT, -padding, padding)
    } else {
      item.SetAnchor(TOPLEFT, previousItem, BOTTOMLEFT, 0, item.itemYPad ?? 0)
      item.SetAnchor(TOPRIGHT, previousItem, BOTTOMRIGHT, 0, item.itemYPad ?? 0)
    }
    item.SetHidden(false)
    item.SetDimensions(textWidth, textHeight)
    previousItem = item
  }
  self.control.SetDimensions(width + padding * 2, height + padding * 2)
}

export function addSubmenuItem(
  this: void,
  self: Submenu,
  entry: MenuEntry,
  myfont: string | undefined,
  normalColor: ZoColorDef | undefined,
  highlightColor: ZoColorDef | undefined,
  itemYPad: number | undefined
): undefined {
  const visible: typeof entry.visible = entry.visible !== undefined ? entry.visible : true
  const isVisible = getValueOrCallback(visible, menu)
  if (isVisible === false || isVisible === undefined) {
    return
  }

  const itemType = entry.itemType ?? MENU_ADD_OPTION_LABEL
  let item: LcmRowControl
  if (itemType === MENU_ADD_OPTION_LABEL) {
    const pool = entry.label !== DIVIDER ? self.itemPool : self.dividerPool
    const [acquired] = pool.AcquireObject()
    item = acquired
  } else if (itemType === MENU_ADD_OPTION_CHECKBOX) {
    const [acquired] = self.itemPool.AcquireObject()
    item = acquired
  } else if (itemType === MENU_ADD_OPTION_HEADER) {
    const [acquired] = self.headerPool.AcquireObject()
    item = acquired
  } else {
    error(`Unknown menu entry itemType: ${itemType}`)
  }

  item.OnSelect = entry.callback
  item.tooltip = entry.tooltip
  item.itemYPad = itemYPad ?? 0
  item.index = self.items.length
  self.items[item.index] = item

  const nameControl = item.nameLabel
  const entryFont = getValueOrCallback(entry.myfont, menu, item) ?? myfont
  const normColor = getValueOrCallback(entry.normalColor, menu, item) ?? normalColor
  const highColor = getValueOrCallback(entry.highlightColor, menu, item) ?? highlightColor
  let resolvedFont: string
  if (itemType === MENU_ADD_OPTION_HEADER) {
    resolvedFont = entryFont ?? HEADER_FONT
    nameControl.normalColor = normColor ?? ZO_WHITE
  } else {
    resolvedFont = entryFont ?? DEFAULT_ITEM_FONT
    nameControl.normalColor = normColor ?? DEFAULT_TEXT_COLOR
  }
  nameControl.highlightColor = highColor ?? DEFAULT_TEXT_HIGHLIGHT
  nameControl.SetFont(resolvedFont)

  let text = getValueOrCallback(entry.label, menu, item) ?? ""

  let checkboxItemControl: LcmRowControl | undefined
  if (itemType === MENU_ADD_OPTION_CHECKBOX) {
    const [acquired] = self.checkBoxPool.AcquireObject()
    checkboxItemControl = acquired
    checkboxItemControl.SetParent(item)
    checkboxItemControl.menuIndex = item.index
    checkboxItemControl.ClearAnchors()
    checkboxItemControl.SetHidden(false)
    checkboxItemControl.SetAnchor(LEFT, undefined, LEFT, 2, -1)
    text = ` |u18:0::|u${text}`
    ZO_CheckButton_SetCheckState(
      checkboxItemControl,
      getValueOrCallback(entry.checked, menu, item) ?? false
    )
  }
  item.checkbox = checkboxItemControl

  nameControl.SetText(text)
  const [, textHeight] = nameControl.GetTextDimensions()
  item.storedHeight = textHeight

  const disabledValue = getValueOrCallback(entry.disabled ?? false, menu, item)
  const enabled = disabledValue !== true
  const colorToUse = enabled ? nameControl.normalColor : ZO_DEFAULT_DISABLED_COLOR
  const [er, eg, eb, ea] = colorToUse.UnpackRGBA()
  nameControl.SetColor(er, eg, eb, ea)
  item.SetMouseEnabled(enabled)
  if (checkboxItemControl !== undefined) {
    checkboxItemControl.SetMouseEnabled(enabled)
    checkboxItemControl.SetAlpha(enabled ? 1 : 0.6)
  }
}
