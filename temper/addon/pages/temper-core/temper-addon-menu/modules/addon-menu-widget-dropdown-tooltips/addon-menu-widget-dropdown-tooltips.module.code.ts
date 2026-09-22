import {
  asControl,
  asZoComboBoxRow,
} from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import type { Valued } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import { getStringFromValue } from "akasha/temper/addon/pages/temper-core/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-combobox/addon-menu-eso-combobox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function doShowTooltip(
  this: void,
  control: Control,
  tooltip: Valued<string | number> | undefined
): undefined {
  if (tooltip === undefined) {
    return
  }
  const tooltipText = getStringFromValue(tooltip)
  if (tooltipText !== "") {
    InitializeTooltip(InformationTooltip, control, TOPLEFT, 0, 0, BOTTOMRIGHT)
    SetTooltipText(InformationTooltip, tostring(tooltipText))
    InformationTooltipTopLevel.BringWindowToTop()
  }
}

function showTooltip(this: void, control: ZoComboBoxRow): undefined {
  doShowTooltip(control, control.dataEntry?.data?.tooltip)
}

function hideTooltip(this: void): undefined {
  ClearTooltip(InformationTooltip)
}

export function setupTooltips(this: void, comboBox: ZoComboBox): undefined {
  SecurePostHook(
    asControl(ZO_ComboBoxDropdown_Keyboard),
    "OnEntryMouseEnter",
    (...args: never[]) => {
      const comboBoxRowCtrl = asZoComboBoxRow(args[0])
      const lComboBox = comboBoxRowCtrl.m_owner
      if (lComboBox !== undefined && lComboBox === comboBox) {
        showTooltip(comboBoxRowCtrl)
      }
    }
  )

  SecurePostHook(asControl(ZO_ComboBoxDropdown_Keyboard), "OnEntryMouseExit", () => {
    hideTooltip()
  })
}
