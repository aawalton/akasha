import {
  asEsoDialogDescriptor,
  asGlobalTable,
  asReopenSaveData,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  ADDON_MENU_SAVED_VARS_KEY,
  TEMPER_ADDON_MENU_DEFAULTS_DIALOG,
  TEMPER_ADDON_MENU_RELOAD_DIALOG,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-constants/addon-menu-constants.module.code.ts"
import {
  controlsForReload,
  lam,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-state/addon-menu-state.module.code.ts"
import type { LamControl } from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"
import {
  isSame,
  refreshReloadUIButton,
} from "akasha/temper/addon/pages/hud/temper-addon-menu/modules/addon-menu-util/addon-menu-util.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-addon-menu/addon-menu-string-ids/addon-menu-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

function getDefaultsDialog(this: void): EsoDialogDescriptor {
  let dialog = ESO_Dialogs[TEMPER_ADDON_MENU_DEFAULTS_DIALOG]
  if (!dialog) {
    dialog = {
      canQueue: true,
      title: { text: SI_INTERFACE_OPTIONS_RESET_TO_DEFAULT_TOOLTIP },
      mainText: { text: SI_OPTIONS_RESET_PROMPT },
      buttons: [
        { text: SI_OPTIONS_RESET, callback: (): undefined => undefined },
        { text: SI_DIALOG_CANCEL },
      ],
    }
    ESO_Dialogs[TEMPER_ADDON_MENU_DEFAULTS_DIALOG] = dialog
  }
  return asEsoDialogDescriptor(dialog)
}

function showDefaultsDialog(this: void, panel: LamControl): undefined {
  const dialog = getDefaultsDialog()
  const firstButton = dialog.buttons[0]
  if (firstButton !== undefined) {
    firstButton.callback = (): undefined => {
      panel.ForceDefaults?.()
      refreshReloadUIButton()
    }
  }
  ZO_Dialogs_ShowDialog(TEMPER_ADDON_MENU_DEFAULTS_DIALOG)
}

function discardChangesOnReloadControls(this: void): undefined {
  for (const reloadControl of controlsForReload) {
    const getFunc = reloadControl.data.getFunc
    const startValue = reloadControl.startValue ?? []
    if (getFunc !== undefined && !isSame(startValue, [getFunc()])) {
      reloadControl.UpdateValue?.(false, ...startValue)
    }
  }
  lam.requiresReload = false
  lam.applyButton?.SetHidden(true)
}

function storePanelForReopening(this: void): undefined {
  const saveData = asReopenSaveData(ZO_Ingame_SavedVariables[ADDON_MENU_SAVED_VARS_KEY] ?? {})
  saveData.reopenPanel = lam.currentAddonPanel?.GetName()
  ZO_Ingame_SavedVariables[ADDON_MENU_SAVED_VARS_KEY] = saveData
}

export function retrievePanelForReopening(this: void): LamControl | undefined {
  const raw = ZO_Ingame_SavedVariables[ADDON_MENU_SAVED_VARS_KEY]
  if (raw !== undefined) {
    ZO_Ingame_SavedVariables[ADDON_MENU_SAVED_VARS_KEY] = undefined
    const saveData = asReopenSaveData(raw)
    if (saveData.reopenPanel !== undefined) {
      return asGlobalTable(_G)[saveData.reopenPanel]
    }
  }
  return undefined
}

export function handleReloadUIPressed(this: void): undefined {
  storePanelForReopening()
  ReloadUI("ingame")
}

export function handleLoadDefaultsPressed(this: void): undefined {
  if (lam.currentAddonPanel !== undefined) {
    showDefaultsDialog(lam.currentAddonPanel)
  }
}

function getReloadDialog(this: void): undefined {
  if (!ESO_Dialogs[TEMPER_ADDON_MENU_RELOAD_DIALOG]) {
    ESO_Dialogs[TEMPER_ADDON_MENU_RELOAD_DIALOG] = {
      canQueue: true,
      title: { text: L.RELOAD_DIALOG_TITLE },
      mainText: { text: L.RELOAD_DIALOG_TEXT },
      buttons: [
        {
          text: L.RELOAD_DIALOG_RELOAD_BUTTON,
          callback: (): undefined => {
            ReloadUI("ingame")
          },
        },
        {
          text: L.RELOAD_DIALOG_DISCARD_BUTTON,
          callback: discardChangesOnReloadControls,
        },
      ],
      noChoiceCallback: discardChangesOnReloadControls,
    }
  }
}

export function showReloadDialogIfNeeded(this: void): undefined {
  if (lam.requiresReload) {
    getReloadDialog()
    ZO_Dialogs_ShowDialog(TEMPER_ADDON_MENU_RELOAD_DIALOG)
  }
}
