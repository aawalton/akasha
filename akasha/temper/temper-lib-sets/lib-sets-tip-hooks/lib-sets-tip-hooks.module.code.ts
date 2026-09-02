import {
  asAnyObject,
  asPresent,
  asString,
  asStrRecordOpt,
  asUnknownArray,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
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
} from "../lib-sets-tip-casts/lib-sets-tip-casts.module.code.ts"
import {
  itemTooltip,
  langToUse,
  popupTooltip,
  tooltipGameDataEntryToAddAfter,
} from "../lib-sets-tip-header/lib-sets-tip-header.module.code.ts"
import {
  addTooltipLine,
  tooltipItemCheck,
} from "../lib-sets-tip-render/lib-sets-tip-render.module.code.ts"
import { MENU_STATE } from "../lib-sets-tip-settings-state/lib-sets-tip-settings-state.module.code.ts"
import { STATE } from "../lib-sets-tip-state/lib-sets-tip-state.module.code.ts"

const lib = LibSets

const EM = EVENT_MANAGER
const MAJOR = lib.name

const slots = asSlotTable(lib)
const getLibSetsTooltipSavedVariables = asSvFetchThunk(slots["_getLibSetsTooltipSavedVariables"])
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
  addTooltipLine(asNever(tooltipControl), asPresent(setData), itemLink, true)
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
    addTooltipLine(asNever(tooltipControl), asPresent(setData), itemLink)
  }
}

function hookCustomTooltipControlChecks(this: void, customTooltipControl: unknown): boolean {
  const ctrl = asTooltipCtrlProbe(customTooltipControl)
  const ttCtrlName =
    ctrl !== undefined && ctrl.GetName !== undefined
      ? asPresent(ctrl.GetName).call(ctrl)
      : undefined
  if (ttCtrlName !== undefined && ttCtrlName !== "" && !lib.customTooltipHooks.hooked[ttCtrlName]) {
    const ctrlPresent = asPresent(ctrl)
    const ttCtrltype =
      ctrlPresent.GetType !== undefined
        ? asPresent(ctrlPresent.GetType).call(ctrlPresent)
        : undefined
    if (customTooltipControl !== undefined && ttCtrltype === CT_TOOLTIP) {
      return true
    }
  }
  return false
}

function initGamePadTooltip(this: void, tooltip: unknown): undefined {
  ZO_PostHook(asAnyObject(tooltip), "LayoutItem", (tt: never, itemLink: never) => {
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
  if (ctrl.GetHandler.call(ctrl, "OnAddGameData") === undefined) {
    ctrl.SetHandler.call(ctrl, "OnAddGameData", tooltipOnAddGameData)
  } else {
    const origOnAddGameData = asPresent(ctrl.GetHandler.call(ctrl, "OnAddGameData"))
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
          STATE.lastTooltipItemLink = asString(itemLink)
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

asHooksCountView(lib.customTooltipHooks).hooksCount = customAddonTooltipControlHooksCount

function onPlayerActivatedTooltips(this: void): undefined {
  EM.UnregisterForEvent(MAJOR + "_Tooltips", EVENT_PLAYER_ACTIVATED)

  STATE.setPreviewTooltipSV = asStrRecordOpt(lib.getLibSetsSetPreviewTooltipSavedVariables())
  if (lib.svData === undefined || STATE.setPreviewTooltipSV === undefined) {
    return
  }

  createSetTooltipPreviewSlashCommand()

  STATE.tooltipSV = getLibSetsTooltipSavedVariables()
  if (lib.svData === undefined || STATE.tooltipSV === undefined) {
    return
  }

  STATE.useCustomTooltip = lib.IsLibSetsCustomTooltipEnabled()
  lib.IsLibSetsTooltipEnabled()

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
