import {
  asLsmCastNumberNumber,
  asLsmCastRecordStringRecordStringRecordStringUnknown,
  asLsmCastRecordStringRecordStringUnknown,
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastSetHiddenThisUnknownHiddenBooleanUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
  asLsmCastThisVoidObjectUnknownMixinsUnknownUndefined,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSelfComboBoxObjectNewValueUnknownUndef,
  asLsmCastThisVoidSelfComboBoxObjectUndefined,
  asLsmComboBoxOptions,
  asLsmEventContainer,
  asObject,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { comboBoxClass } from "../scrollable-menu-combobox-class/scrollable-menu-combobox-class.module.code.ts"
import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const constants = lib.constants
const comboBoxConstants = asLsmCastRecordStringUnknown(constants.comboBox)
const comboBoxMappingConstants = asLsmCastRecordStringUnknown(comboBoxConstants.mapping)
const COMBO_BOX_DEFAULTS = asLsmCastRecordStringUnknown(comboBoxConstants.defaults)
const COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES = asLsmCastRecordStringUnknown(
  comboBoxConstants.defaultsContextualInitValues
)

const LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY = asLsmCastRecordStringString(
  comboBoxMappingConstants.LSMOptionsKeyToZO_ComboBoxOptionsKey
)
const LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS = asLsmCastRecordStringUnknown(
  comboBoxMappingConstants.LSMOptionsToZO_ComboBoxOptionsCallbacks
)

const libUtil = lib.Util
const mixinTableAndSkipExisting = asLsmCastThisVoidObjectUnknownMixinsUnknownUndefined(
  libUtil.mixinTableAndSkipExisting
)

const tos = tostring

comboBoxClass.SetDefaults = function (this: ComboBoxObject): undefined {
  this.defaults = asLsmCastRecordStringUnknown({})
  for (const [k, v] of pairs(COMBO_BOX_DEFAULTS)) {
    if (v && asLsmCastRecordStringUnknown(this)[k] !== v) {
      asLsmCastRecordStringUnknown(this.defaults)[k] = v
    }
  }
}

comboBoxClass.ResetToDefaults = function (
  this: ComboBoxObject,
  initExistingComboBox?: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 134)
  }
  const defaults = ZO_DeepTableCopy(COMBO_BOX_DEFAULTS)
  zo_mixin(defaults, asObject(this.defaults))

  if (initExistingComboBox === true) {
    mixinTableAndSkipExisting(this, defaults, COMBO_BOX_DEFAULTS_CONTEXTUAL_INIT_VALUES, undefined)
  } else {
    zo_mixin(asObject(this), defaults)
  }
  this.SetOptions(undefined)
}

comboBoxClass.SetOption = function (
  this: ComboBoxObject,
  lsmOptionsKey: string,
  doDebugNow?: boolean
): undefined {
  const currentZoComboBoxValueKey = LSM_OPTIONS_KEY_TO_ZO_COMBO_BOX_OPTIONS_KEY[lsmOptionsKey]
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 135, tos(lsmOptionsKey), tos(currentZoComboBoxValueKey))
  }
  if (currentZoComboBoxValueKey === undefined) {
    return
  }
  const selfRec = asLsmCastRecordStringUnknown(this)
  const currentValue = selfRec[currentZoComboBoxValueKey]

  const options = this.GetOptions()
  const lsmDebug = asLsmCastRecordStringRecordStringRecordStringUnknown(_G.LSM_Debug)
  if (doDebugNow) {
    asLsmCastRecordStringUnknown(lsmDebug.SetOption)[lsmOptionsKey] = {
      selfBefore: ZO_ShallowTableCopy(this),
      before: ZO_ShallowTableCopy(options),
    }
  }
  let newValue: unknown =
    (options !== undefined && getValueOrCallback(options[lsmOptionsKey], options)) || undefined
  if (doDebugNow) {
    d(">options: " + tos(options) + "; newValue: " + tos(newValue))
  }
  if (newValue === undefined) {
    newValue = currentValue
    if (doDebugNow) {
      d(
        ">LSMOptionsKey: " +
          tos(lsmOptionsKey) +
          " -> Is nil in options. newValue = currentValue: " +
          tos(newValue)
      )
    }
  }
  if (newValue === undefined) {
    return
  }
  asLsmCastRecordStringUnknown(this.updatedOptions)[lsmOptionsKey] = newValue

  const setOptionFuncOrKey = LSM_OPTIONS_TO_ZO_COMBO_BOX_OPTIONS_CALLBACKS[lsmOptionsKey]
  if (type(setOptionFuncOrKey) === "function") {
    asLsmCastThisVoidSelfComboBoxObjectNewValueUnknownUndef(setOptionFuncOrKey)(this, newValue)
  } else {
    selfRec[currentZoComboBoxValueKey] = newValue
  }

  if (doDebugNow) {
    const setOptionDump = asLsmCastRecordStringUnknown(
      asLsmCastRecordStringRecordStringUnknown(lsmDebug.SetOption)[lsmOptionsKey]
    )
    setOptionDump.after = ZO_ShallowTableCopy(options)
    setOptionDump.selfAfter = ZO_ShallowTableCopy(this)
  }
}

comboBoxClass.UpdateOptions = function (
  this: ComboBoxObject,
  options: LsmComboBoxOptions | undefined,
  onInit?: unknown,
  isContextMenu?: unknown,
  initExistingComboBox?: unknown
): undefined {
  onInit = onInit || false
  let optionsChanged = this.optionsChanged

  const doDebugNow = false

  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 136, tos(options), tos(onInit), tos(optionsChanged))
  }
  if (doDebugNow) {
    d("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    d(
      libDebug.prefix +
        "comboBoxClass:UpdateOptions - options: " +
        tos(options) +
        ", onInit: " +
        tos(onInit) +
        ", isContextMenu: " +
        tos(isContextMenu) +
        ", initExistingComboBox: " +
        tos(initExistingComboBox) +
        ", optionsChanged: " +
        tos(optionsChanged)
    )
  }
  if (onInit === true) {
    if (doDebugNow) {
      d(">1 onInit -> optionsChanged = false")
    }
    optionsChanged = false
  } else {
    optionsChanged = optionsChanged || options !== this.options
    if (doDebugNow) {
      d(">2 optionsChanged: " + tos(optionsChanged))
    }
  }

  const areOptionsEmpty = ZO_IsTableEmpty(asObject(options))
  if (!isContextMenu && (optionsChanged === true || onInit === true) && areOptionsEmpty) {
    optionsChanged = false
    const isInit = (onInit === true && initExistingComboBox) || undefined
    if (doDebugNow) {
      d(">>3 resetting options to defaults! isInit: " + tos(isInit))
    }
    this.ResetToDefaults(isInit)
  } else if (isContextMenu || optionsChanged === true || ZO_IsTableEmpty(asObject(this.options))) {
    optionsChanged = false

    if (areOptionsEmpty && isContextMenu) {
      if (doDebugNow) {
        d(">options are nil - using contextMenu defaults")
      }
      options = asLsmComboBoxOptions(COMBO_BOX_DEFAULTS)
    }
    options = options || asLsmComboBoxOptions({})

    if (type(options) !== "table") {
      options = asLsmComboBoxOptions({ visibleRowsDropdown: options })
    }

    if (doDebugNow) {
      d(">4 OptionsChanged or empty self.options -> Setting options to self now: " + tos(options))
    }

    this.SetOptions(options)

    this.updatedOptions = asLsmCastRecordStringUnknown({})

    if (doDebugNow) {
      _G.LSM_Debug = asLsmCastRecordStringUnknownUndefined(_G.LSM_Debug) || {}
      asLsmCastRecordStringUnknown(_G.LSM_Debug)["SetOption"] = {}
    }

    if (!ZO_IsTableEmpty(asObject(options))) {
      for (const [key] of pairs(asLsmCastRecordStringUnknown(options))) {
        if (doDebugNow) {
          d(">>setting option key: " + tos(key))
        }
        this.SetOption(key, doDebugNow)
      }
    }

    this.updatedOptions = undefined

    if (doDebugNow) {
      d("> SetOption and for ... do SetOptions looped - END ")
    }
  }

  this.AddCustomEntryTemplates(options, isContextMenu)
}

comboBoxClass.UpdateResults = function (
  this: ComboBoxObject,
  _comingFromFilters?: unknown
): undefined {
  const submenu = this.m_submenu
  if (submenu?.IsDropdownVisible()) {
    submenu.HideDropdown()
  }
  this.Show()
}

comboBoxClass.ShowDropdown = function (this: ComboBoxObject): undefined {
  if (this.m_preshowDropdownFn) {
    asLsmCastThisVoidSelfComboBoxObjectUndefined(this.m_preshowDropdownFn)(this)
  }

  if (!this.IsDropdownVisible()) {
    this.UpdateDropdownHeader()
  }
  this.ShowDropdownInternal()
}

comboBoxClass.ShowDropdownInternal = function (this: ComboBoxObject): undefined {
  const selfVar = this
  const container = asLsmEventContainer(this.m_container)
  container.RegisterForEvent(
    EVENT_GLOBAL_MOUSE_UP,
    function (this: void, ...args: unknown[]): undefined {
      selfVar.OnGlobalMouseUp(...asLsmCastNumberNumber(args))
    }
  )
}

comboBoxClass.ShowDropdownOnMouseUp = function (this: ComboBoxObject): undefined {
  if (this.IsEnabled()) {
    asLsmCastSetHiddenThisUnknownHiddenBooleanUndefined(this.m_dropdownObject).SetHidden(false)
    this.AddMenuItems()

    this.SetVisible(true)
  } else {
    const container = asLsmEventContainer(this.m_container)
    container.UnregisterForEvent(EVENT_GLOBAL_MOUSE_UP)
  }
}
