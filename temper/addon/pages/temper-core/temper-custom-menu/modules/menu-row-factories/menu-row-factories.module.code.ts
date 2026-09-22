import type {
  LcmLabel,
  LcmRowControl,
  PooledRow,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/eso-menu/eso-menu.module.code.ts"
import {
  setupDivider,
  setupHeader,
} from "akasha/temper/addon/pages/temper-core/temper-custom-menu/modules/menu-row-setup/menu-row-setup.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

let upInside: LcmRowControl | undefined

export function resetMenuItem(this: void, button: PooledRow): undefined {
  button.SetHidden(true)
  button.ClearAnchors()
  button.menuIndex = undefined
  button.OnSelect = undefined
  button.tooltip = undefined
}

export function resetCheckBox(this: void, checkBox: PooledRow): undefined {
  resetMenuItem(checkBox)
  ZO_CheckButton_SetToggleFunction(checkBox, undefined)
  ZO_CheckButton_SetUnchecked(checkBox)
}

export function menuItemFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuItem",
    menu,
    "ZO_MenuItem",
    pool.GetNextControlId()
  )
  const label = control.GetNamedChild<LcmLabel>("Name")
  if (label !== undefined) {
    control.nameLabel = label
  }
  control.SetHandler("OnMouseEnter", () => {
    upInside = control
    ZO_Menu_EnterItem(control)
  })
  control.SetHandler("OnMouseExit", () => {
    upInside = undefined
    ZO_Menu_ExitItem(control)
  })
  control.SetHandler("OnMouseDown", IgnoreMouseDownEditFocusLoss)
  control.SetHandler("OnMouseUp", () => {
    if (upInside !== undefined) {
      ZO_Menu_ClickItem(upInside, 1)
    }
  })
  return control
}

export function checkBoxFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  return CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuItemCheckButton",
    menu,
    "ZO_MenuItemCheckButton",
    pool.GetNextControlId()
  )
}

export function dividerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuDivider",
    menu,
    "ZO_NotificationsRowButton",
    pool.GetNextControlId()
  )
  setupDivider(control)
  return control
}

export function headerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuHeader",
    menu,
    "ZO_AddOnSectionHeaderRow",
    pool.GetNextControlId()
  )
  setupHeader(control)
  return control
}
