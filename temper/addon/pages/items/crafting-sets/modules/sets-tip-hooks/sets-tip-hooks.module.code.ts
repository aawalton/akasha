import {
  asPresent,
  asStringOpt,
  asStrRecordOpt,
  asUnknownArray,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asActivatedFlagView,
  asBoolThunkOpt,
  asHooksCountView,
  asLibAddonMenu2SurfaceOpt,
  asNeededHookArray,
  asNever,
  asNumKeyTable,
  asSlotTable,
  asSvFetchThunk,
  asTooltipCtrlProbe,
  asVoidThunk,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-casts/sets-tip-casts.module.code.ts"
import {
  itemTooltip,
  langToUse,
  popupTooltip,
  tooltipGameDataEntryToAddAfter,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-header/sets-tip-header.module.code.ts"
import {
  addTooltipLine,
  tooltipItemCheck,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-render/sets-tip-render.module.code.ts"
import { MENU_STATE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-settings-state/sets-tip-settings-state.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-writ-tooltip/eso-writ-tooltip.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const EM = EVENT_MANAGER
const MAJOR = lib.name

const slots = asSlotTable(lib)
const getSetsTooltipSavedVariables = asSvFetchThunk(slots["_getSetsTooltipSavedVariables"])
const createSetTooltipPreviewSlashCommand = asVoidThunk(
  slots["_createSetTooltipPreviewSlashCommand"]
)
const loadLAMSettingsMenu = asBoolThunkOpt(slots["_loadLAMSettingsMenu"])

const tooltipsHooked = new LuaMap<boolean, boolean>()
tooltipsHooked.set(true, false)
tooltipsHooked.set(false, false)

let customAddonTooltipControlHooksCount = 0
const tooltipSetDataWithoutItemIdsCached = lib.tooltipSetDataWithoutItemIdsCached

function tooltipOnAddGameDataGamepad(
  this: void,
  tooltipControl: unknown,
  tooltipData: unknown
): undefined {
  const [isSet, setId, itemLink] = tooltipItemCheck(tooltipControl, tooltipData, true)
  if (!isSet) {
    return
  }
  const setData =
    asStrRecordOpt(tooltipSetDataWithoutItemIdsCached[asPresent(setId)]) ??
    lib.GetSetInfo(setId, true, langToUse)
  if (setData === undefined) {
    return
  }
  addTooltipLine(asNever(tooltipControl), setData, itemLink, true)
}

function tooltipOnAddGameData(
  this: void,
  tooltipControl: unknown,
  tooltipData: unknown
): undefined {
  if (!STATE.anyTooltipInfoToAdd) {
    return
  }
  if (tooltipData === tooltipGameDataEntryToAddAfter) {
    const [isSet, setId, itemLink] = tooltipItemCheck(tooltipControl, tooltipData)
    if (!isSet) {
      return
    }
    const setData =
      asStrRecordOpt(tooltipSetDataWithoutItemIdsCached[asPresent(setId)]) ??
      lib.GetSetInfo(setId, true, langToUse)
    if (setData === undefined) {
      return
    }
    addTooltipLine(asNever(tooltipControl), setData, itemLink)
  }
}

function hookCustomTooltipControlChecks(this: void, customTooltipControl: unknown): boolean {
  const ctrl = asTooltipCtrlProbe(customTooltipControl)
  const ttCtrlName =
    ctrl !== undefined && ctrl.GetName !== undefined ? ctrl.GetName.call(ctrl) : undefined
  if (ttCtrlName !== undefined && ttCtrlName !== "" && !lib.customTooltipHooks.hooked[ttCtrlName]) {
    const ctrlPresent = asPresent(ctrl)
    const ttCtrltype =
      ctrlPresent.GetType !== undefined ? ctrlPresent.GetType.call(ctrlPresent) : undefined
    if (customTooltipControl !== undefined && ttCtrltype === CT_TOOLTIP) {
      return true
    }
  }
  return false
}

function initGamePadTooltip(this: void, tooltip: object): undefined {
  ZO_PostHook(tooltip, "LayoutItem", (tt: never, itemLink: never) => {
    tooltipOnAddGameDataGamepad(tt, itemLink)
  })
}

function hookCustomAddonTooltipControl(
  this: void,
  ctrl: {
    GetName: (this: unknown) => string
    GetHandler: (
      this: unknown,
      event: string
    ) => ((this: void, ...args: unknown[]) => void) | undefined
    SetHandler: (this: unknown, event: string, fn: (this: void, ...args: unknown[]) => void) => void
  }
): undefined {
  const origOnAddGameData = ctrl.GetHandler.call(ctrl, "OnAddGameData")
  if (origOnAddGameData === undefined) {
    ctrl.SetHandler.call(ctrl, "OnAddGameData", tooltipOnAddGameData)
  } else {
    ctrl.SetHandler.call(ctrl, "OnAddGameData", (...args: unknown[]) => {
      origOnAddGameData(...args)
      tooltipOnAddGameData(args[0], args[1])
    })
  }
  lib.customTooltipHooks.hooked[ctrl.GetName.call(ctrl)] = true
}

function hookTooltipControls(
  this: void,
  onlyAddonAdded?: boolean,
  customAddonTooltipCtrl?: unknown
): undefined {
  const svData = lib.svData
  if (svData === undefined) {
    return
  }
  const onlyAddonAddedResolved = onlyAddonAdded ?? false

  if (svData["modifyTooltips"] === true) {
    const isInGamepadMode = IsInGamepadPreferredMode()
    if (!lib.IsConsole && !isInGamepadMode) {
      if (!onlyAddonAddedResolved && tooltipsHooked.get(false) !== true) {
        ZO_PreHookHandler(popupTooltip, "OnAddGameData", asNever(tooltipOnAddGameData))
        ZO_PreHookHandler(itemTooltip, "OnAddGameData", asNever(tooltipOnAddGameData))
        ZO_PreHook("ZO_PopupTooltip_SetLink", (itemLink: unknown) => {
          STATE.lastTooltipItemLink = asStringOpt(itemLink)
        })
        tooltipsHooked.set(false, true)
      }
    } else if (lib.IsConsole || isInGamepadMode) {
      if (!onlyAddonAddedResolved && tooltipsHooked.get(true) !== true) {
        for (const [tooltipType] of pairs(GAMEPAD_TOOLTIPS.tooltips)) {
          initGamePadTooltip(GAMEPAD_TOOLTIPS.GetTooltip.call(GAMEPAD_TOOLTIPS, tooltipType))
        }
        tooltipsHooked.set(true, true)
      }
    }

    const customTooltipHooksNeeded = asNumKeyTable(lib.customTooltipHooks.needed)
    if (
      customTooltipHooksNeeded !== undefined &&
      asUnknownArray(customTooltipHooksNeeded).length > 0
    ) {
      let wasHookedInLoop = 0
      if (onlyAddonAddedResolved === true && customAddonTooltipCtrl !== undefined) {
        if (hookCustomTooltipControlChecks(customAddonTooltipCtrl) === true) {
          hookCustomAddonTooltipControl(asNever(customAddonTooltipCtrl))
          wasHookedInLoop = wasHookedInLoop + 1
        }
      } else {
        for (const [, toHookData] of ipairs(asNeededHookArray(customTooltipHooksNeeded))) {
          const ttCtrlName = toHookData !== undefined ? toHookData.tooltipCtrlName : undefined
          if (ttCtrlName !== undefined && ttCtrlName !== "") {
            const ttCtrl = GetControl(ttCtrlName)
            if (hookCustomTooltipControlChecks(ttCtrl) === true) {
              hookCustomAddonTooltipControl(asNever(ttCtrl))
              wasHookedInLoop = wasHookedInLoop + 1
            }
          }
        }
      }
      if (wasHookedInLoop > 0) {
        customAddonTooltipControlHooksCount = customAddonTooltipControlHooksCount + 1
        asHooksCountView(lib.customTooltipHooks).hooksCount = customAddonTooltipControlHooksCount
      }
    }
  }
}
lib.HookTooltipControls = hookTooltipControls

function registerCustomTooltipHook(
  this: void,
  tooltipCtrlName: string,
  addonName: string
): boolean {
  if (tooltipCtrlName === "" || addonName === "") {
    return false
  }
  const ttCtrl = GetControl(tooltipCtrlName)
  if (!hookCustomTooltipControlChecks(ttCtrl)) {
    return false
  }
  const needed = asUnknownArray(lib.customTooltipHooks.needed)
  needed[needed.length] = { tooltipCtrlName, addonName }
  if (lib.customTooltipHooks.eventPlayerActivatedCalled) {
    hookTooltipControls(true, ttCtrl)
  }
  return true
}
lib.RegisterCustomTooltipHook = registerCustomTooltipHook

asHooksCountView(lib.customTooltipHooks).hooksCount = customAddonTooltipControlHooksCount

function onPlayerActivatedTooltips(this: void): undefined {
  EM.UnregisterForEvent(MAJOR + "_Tooltips", EVENT_PLAYER_ACTIVATED)

  STATE.setPreviewTooltipSV = asStrRecordOpt(lib.getSetsSetPreviewTooltipSavedVariables())
  if (lib.svData === undefined || STATE.setPreviewTooltipSV === undefined) {
    return
  }

  createSetTooltipPreviewSlashCommand()

  STATE.tooltipSV = getSetsTooltipSavedVariables()
  if (lib.svData === undefined || STATE.tooltipSV === undefined) {
    return
  }

  STATE.useCustomTooltip = lib.IsSetsCustomTooltipEnabled()
  lib.IsSetsTooltipEnabled()

  if (!lib.IsConsole && !IsInGamepadPreferredMode()) {
    if (!MENU_STATE.lam) {
      return
    }
    loadLAMSettingsMenu()
  }

  hookTooltipControls()
  asActivatedFlagView(lib.customTooltipHooks).eventPlayerActivatedCalled = true
}

function loadTooltipHooks(this: void, wasInputModeChanged?: boolean): undefined {
  const wasInputModeChangedResolved = wasInputModeChanged ?? false
  if (!lib.IsConsole && !IsInGamepadPreferredMode()) {
    MENU_STATE.lam = asLibAddonMenu2SurfaceOpt(lib.libAddonMenu)
  }

  if (!wasInputModeChangedResolved) {
    EM.RegisterForEvent(MAJOR + "_Tooltips", EVENT_PLAYER_ACTIVATED, onPlayerActivatedTooltips)
  } else {
    onPlayerActivatedTooltips()
  }
}
lib.loadTooltipHooks = loadTooltipHooks
