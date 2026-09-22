import {
  asIndexable,
  asManagerInstance,
  asRenameCallback,
  asSavedVarsTable,
  asSettingsList,
  asVersionUpdateFn,
  type RenameCallbackFn,
  type VersionUpdateFn,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_NAME,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import {
  getAccountSavedVarsActive,
  getSavedVarsManagers,
  loadAllSavedVars,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-active/saved-vars-data-active.module.code.ts"
import {
  tableDiffKeys,
  validateScope,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import {
  DATA_STATE,
  DO_NOT_OVERWRITE,
  rawipairs,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  SavedVarsTable,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const ACCOUNT_WIDE_NAME = "Account-wide Settings"

const ACCOUNT_WIDE_TOOLTIP = "All the settings below will be the same for each of your characters."

export function setAccountSavedVarsActive(
  this: void,
  self: DataInstance | undefined,
  accountActive: boolean,
  initializeCharacterWithAccount?: boolean
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }
  SAVED_VARS.protected.Debug(
    "SavedVarsData:SetAccountSavedVarsActive(<<1>>, <<2>>)",
    DATA_STATE.debugMode,
    accountActive,
    initializeCharacterWithAccount
  )

  const ds = self.__dataSource
  if (
    ds.character === undefined ||
    ds.account === undefined ||
    asIndexable(ds.character.savedVars)[SAVED_VARS_NAME] === undefined
  ) {
    return self
  }

  asIndexable(asIndexable(ds.character.savedVars)[SAVED_VARS_NAME]).accountSavedVarsActive =
    accountActive

  const initWithAccount = initializeCharacterWithAccount === true || ds.defaultToAccount

  if (accountActive) {
    ds.active = ds.account
    return self
  }

  ds.active = ds.character

  const [characterRawDataTable] = ds.character.LoadRawTableData()

  if (initWithAccount && ds.account.savedVars !== undefined) {
    const [accountRaw] = ds.account.LoadRawTableData()
    let accountVars: SavedVarsTable | undefined = accountRaw
    if (ds.pinnedAccountKeys !== undefined) {
      accountVars = tableDiffKeys(asSavedVarsTable(accountVars), ds.pinnedAccountKeys)
    }

    SAVED_VARS.protected.Debug(
      "Copying the following settings from account-wide scope to character settings:",
      DATA_STATE.debugMode
    )
    for (const [key, value] of pairs(asSavedVarsTable(accountVars))) {
      SAVED_VARS.protected.Debug("<<1>>: <<2>>", DATA_STATE.debugMode, key, tostring(value))
    }

    SAVED_VARS.lib.DeepSavedVarsCopy(accountVars, characterRawDataTable, DO_NOT_OVERWRITE)
  } else {
    SAVED_VARS.lib.DeepSavedVarsCopy(ds.character.defaults, characterRawDataTable, DO_NOT_OVERWRITE)
  }

  return self
}

export function getLibAddonMenuAccountCheckbox(
  this: void,
  self: DataInstance | undefined,
  initializeCharacterWithAccount?: boolean
): SavedVarsTable | undefined {
  if (self === undefined) {
    return undefined
  }
  SAVED_VARS.protected.Debug(
    "SavedVarsData:GetLibAddonMenuAccountCheckbox(<<1>>)",
    DATA_STATE.debugMode,
    initializeCharacterWithAccount
  )

  let initWithAccount = initializeCharacterWithAccount
  if (initWithAccount === undefined) {
    initWithAccount = true
  }

  return {
    type: "checkbox",
    name: ACCOUNT_WIDE_NAME,
    tooltip: ACCOUNT_WIDE_TOOLTIP,
    getFunc: (): boolean | undefined => {
      loadAllSavedVars(self)
      return getAccountSavedVarsActive(self)
    },
    setFunc: (value: boolean): undefined => {
      loadAllSavedVars(self)
      setAccountSavedVarsActive(self, value, initWithAccount)
    },
    default: (): boolean => {
      const active = self.__dataSource.active
      if (active !== undefined && rawget(active, "savedVars") !== undefined) {
        return rawget(active, "keyType") === SAVED_VARS_ACCOUNT_KEY
      }
      return self.__dataSource.defaultToAccount
    },
  }
}

export function version(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  onVersionUpdate?: VersionUpdateFn
): DataInstance {
  let scopeArg: unknown = scope
  let onUpdate = onVersionUpdate
  if (type(scopeArg) === "function") {
    onUpdate = asVersionUpdateFn(scopeArg)
    scopeArg = undefined
  }
  SAVED_VARS.protected.Debug(
    "SavedVarsData:Version(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    onUpdate
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).Version(versionNum, asVersionUpdateFn(onUpdate))
  }
  return self
}

export function removeSettings(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  settingsToRemove?: unknown,
  ...rest: string[]
): DataInstance {
  if (type(versionNum) !== "number") {
    error(
      `Invalid type for argument 'version'. Expected 'number'. Got '${type(versionNum)}' instead.`
    )
  }
  const params: unknown[] = [...rest]
  let scopeArg: unknown = scope
  let settings: unknown = settingsToRemove
  if (scopeArg !== undefined && type(scopeArg) !== "number") {
    params.unshift(settings)
    settings = scopeArg
    scopeArg = undefined
  }
  if (type(settings) === "string") {
    params.unshift(settings)
    settings = params
  }

  SAVED_VARS.protected.Debug(
    "SavedVarsData:RemoveSettings(<<1>>, <<2>>, <<3>> (<<4>>))",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    tostring(settings),
    settings !== undefined ? asSettingsList(settings).length : undefined
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).RemoveSettings(versionNum, asSettingsList(settings))
  }

  return self
}

export function renameSettings(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  renameMap?: SavedVarsTable,
  callback?: RenameCallbackFn
): DataInstance {
  let scopeArg: unknown = scope
  let map = renameMap
  let cb = callback
  if (scopeArg !== undefined && type(scopeArg) !== "number") {
    cb = asRenameCallback(map)
    map = asSavedVarsTable(scopeArg)
    scopeArg = undefined
  }
  SAVED_VARS.protected.Debug(
    "SavedVarsData:RenameSettings(<<1>>, <<2>>, <<3>>, <<4>>)",
    DATA_STATE.debugMode,
    versionNum,
    scopeArg,
    tostring(map),
    tostring(cb)
  )
  validateScope(scopeArg)
  const svManagers = getSavedVarsManagers(self, scopeArg)
  for (const [, svManager] of rawipairs(svManagers)) {
    asManagerInstance(svManager).RenameSettings(versionNum, map, cb)
  }

  return self
}

export function renameSettingsAndInvert(
  this: void,
  self: DataInstance,
  versionNum: number,
  scope?: unknown,
  renameMap?: SavedVarsTable
): DataInstance {
  SAVED_VARS.protected.Debug(
    "SavedVarsData:RenameSettingsAndInvert(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    versionNum,
    scope,
    tostring(renameMap)
  )
  return renameSettings(self, versionNum, scope, renameMap, SAVED_VARS.protected.Invert)
}
