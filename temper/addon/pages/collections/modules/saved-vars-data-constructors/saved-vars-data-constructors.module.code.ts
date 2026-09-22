import {
  asDataInstance,
  asDataSource,
  asIndexable,
  asManagerInstance,
  asSavedVarsInfo,
  asSavedVarsTable,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_ID_KEY,
  SAVED_VARS_NAME,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import {
  shiftOptionalParams,
  tableDiffKeys,
  tableMerge,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import { DATA_STATE } from "akasha/temper/addon/pages/collections/modules/saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  SavedVarsDataClass,
  SavedVarsTable,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function newAccountWide(
  this: void,
  self: SavedVarsDataClass,
  savedVariableTable: string,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: string,
  displayName?: string
): DataInstance {
  const [v, ns, def, , prof, disp] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName
  )

  SAVED_VARS.protected.Debug(
    "SavedVarsData:NewAccountWide(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>)",
    DATA_STATE.debugMode,
    savedVariableTable,
    v,
    ns,
    def,
    prof,
    disp
  )

  const data = asDataInstance({ __dataSource: asDataSource({ defaultToAccount: true }) })
  setmetatable(data, self)

  initAccountWide(data, savedVariableTable, v, ns, def, prof, disp)

  return data
}

export function newCharacterSettings(
  this: void,
  self: SavedVarsDataClass,
  savedVariableTable: string,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): DataInstance {
  const [v, ns, def, , prof, disp, charName, charId, charKey] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )

  SAVED_VARS.protected.Debug(
    "SavedVarsData:NewCharacterSettings(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>, <<7>>, <<8>>, <<9>>)",
    DATA_STATE.debugMode,
    savedVariableTable,
    v,
    ns,
    def,
    prof,
    disp,
    charName,
    charId,
    charKey
  )

  const data = asDataInstance({ __dataSource: asDataSource({ defaultToAccount: false }) })
  setmetatable(data, self)

  initCharacterSettings(
    data,
    savedVariableTable,
    v,
    ns,
    def,
    def,
    prof,
    disp,
    charName,
    charId,
    charKey
  )

  return data
}

export function addAccountWideToggle(
  this: void,
  self: DataInstance | undefined,
  savedVariableTableName?: unknown,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: unknown,
  displayName?: unknown
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }

  SAVED_VARS.protected.Debug(
    "SavedVarsData:AddAccountWideToggle(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>)",
    DATA_STATE.debugMode,
    savedVariableTableName,
    version,
    namespace,
    defaults,
    profile,
    displayName
  )

  const [v, ns, def0, , prof0, disp0] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName
  )
  let defaultsVal: unknown = def0
  let profileVal: unknown = prof0
  let displayNameVal: unknown = disp0
  let nameVal: unknown = savedVariableTableName

  const ds = self.__dataSource

  if (nameVal === undefined) {
    nameVal = asManagerInstance(ds.character).name
  }

  const characterDefaults = asSavedVarsTable(
    ZO_ShallowTableCopy(asManagerInstance(ds.character).defaults)
  )
  characterDefaults[SAVED_VARS_NAME] = undefined
  if (defaultsVal === undefined) {
    defaultsVal = characterDefaults
  } else {
    ds.pinnedAccountKeys = tableDiffKeys(asSavedVarsTable(defaultsVal), characterDefaults)
    defaultsVal = tableMerge(asSavedVarsTable(defaultsVal), characterDefaults)
  }

  if (profileVal === undefined) {
    profileVal = asManagerInstance(ds.character).profile
  }

  if (displayNameVal === undefined) {
    displayNameVal = asManagerInstance(ds.character).displayName
  }

  initAccountWide(self, nameVal, v, ns, defaultsVal, profileVal, displayNameVal)
  initToggle(self)

  return self
}

export function addCharacterSettingsToggle(
  this: void,
  self: DataInstance | undefined,
  savedVariableTableName?: unknown,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: unknown,
  displayName?: unknown,
  characterName?: unknown,
  characterId?: unknown,
  characterKeyType?: unknown
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }

  const [v, ns, def0, , prof0, disp0, charName0, charId0, charKey0] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )

  SAVED_VARS.protected.Debug(
    "SavedVarsData:AddCharacterSettingsToggle(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>, <<7>>, <<8>>, <<9>>)",
    DATA_STATE.debugMode,
    savedVariableTableName,
    v,
    ns,
    def0,
    prof0,
    disp0,
    charName0,
    charId0,
    charKey0
  )

  let defaultsVal: unknown = def0
  let profileVal: unknown = prof0
  let displayNameVal: unknown = disp0
  let nameVal: unknown = savedVariableTableName

  const ds = self.__dataSource

  if (nameVal === undefined) {
    nameVal = asManagerInstance(ds.account).name
  }

  let trimDefaults: SavedVarsTable | undefined
  if (defaultsVal === undefined) {
    defaultsVal = {}
    trimDefaults = asSavedVarsTable(ZO_ShallowTableCopy(asManagerInstance(ds.account).defaults))
  } else {
    ds.pinnedAccountKeys = tableDiffKeys(
      asManagerInstance(ds.account).defaults,
      asSavedVarsTable(defaultsVal)
    )
    const defaultsNotOnAccount = tableDiffKeys(
      asSavedVarsTable(defaultsVal),
      asManagerInstance(ds.account).defaults
    )
    const [firstNotOnAccount] = next(defaultsNotOnAccount)
    if (firstNotOnAccount !== undefined) {
      asManagerInstance(ds.account).defaults = tableMerge(
        asManagerInstance(ds.account).defaults,
        defaultsNotOnAccount
      )
    }
  }

  if (profileVal === undefined) {
    profileVal = asManagerInstance(ds.account).profile
  }

  if (displayNameVal === undefined) {
    displayNameVal = asManagerInstance(ds.account).displayName
  }

  initCharacterSettings(
    self,
    nameVal,
    v,
    ns,
    defaultsVal,
    trimDefaults,
    profileVal,
    displayNameVal,
    charName0,
    charId0,
    charKey0
  )
  initToggle(self)

  return self
}

function initAccountWide(
  this: void,
  self: DataInstance,
  savedVariableTable: unknown,
  version: unknown,
  namespace: unknown,
  defaults: unknown,
  profile: unknown,
  displayName: unknown
): undefined {
  self.__dataSource.account = SAVED_VARS.manager.New(
    asSavedVarsInfo({
      keyType: SAVED_VARS_ACCOUNT_KEY,
      name: savedVariableTable,
      version,
      namespace,
      defaults,
      profile: profile ?? GetWorldName(),
      displayName,
    })
  )
}

function initCharacterSettings(
  this: void,
  self: DataInstance,
  savedVariableTable: unknown,
  version: unknown,
  namespace: unknown,
  defaults: unknown,
  trimDefaults: unknown,
  profile: unknown,
  displayName: unknown,
  characterName: unknown,
  characterId: unknown,
  characterKeyType: unknown
): undefined {
  self.__dataSource.character = SAVED_VARS.manager.New(
    asSavedVarsInfo({
      keyType: characterKeyType ?? SAVED_VARS_CHARACTER_ID_KEY,
      name: savedVariableTable,
      version,
      namespace,
      defaults,
      trimDefaults,
      profile: profile ?? GetWorldName(),
      displayName,
      characterName,
      characterId,
    })
  )
}

function initToggle(this: void, self: DataInstance): undefined {
  const ds = self.__dataSource

  if (ds.character === undefined) {
    SAVED_VARS.protected.Debug(
      "Trying to initialized toggle failed. No character-specific saved vars manager found.",
      DATA_STATE.debugMode
    )
    return
  }

  if (ds.account === undefined) {
    SAVED_VARS.protected.Debug(
      "Trying to initialized toggle failed. No account-wide saved vars manager found.",
      DATA_STATE.debugMode
    )
    return
  }

  const [rawChar] = ds.character.LoadRawTableData()
  const characterRawDataTable = rawChar
  const marker =
    characterRawDataTable !== undefined
      ? asIndexable(characterRawDataTable)[SAVED_VARS_NAME]
      : undefined
  const markerActive = marker !== undefined ? asIndexable(marker).accountSavedVarsActive : undefined

  if (
    characterRawDataTable === undefined ||
    (marker !== undefined && markerActive !== undefined && markerActive !== false) ||
    (ds.defaultToAccount && (marker === undefined || markerActive !== false))
  ) {
    ds.active = ds.account
  } else {
    ds.active = ds.character

    const charDefaults = ds.character.defaults
    const accDefaults = ds.account.defaults
    const [firstCharDefault] = next(charDefaults)
    const [firstAccDefault] = next(accDefaults)
    if (
      (charDefaults === undefined || firstCharDefault === undefined) &&
      accDefaults !== undefined &&
      firstAccDefault !== undefined
    ) {
      ds.character.defaults = asSavedVarsTable(ZO_ShallowTableCopy(accDefaults))
    }
  }

  ds.character.defaults[SAVED_VARS_NAME] = { accountSavedVarsActive: ds.defaultToAccount }
  ds.character.trimDefaults[SAVED_VARS_NAME] = { accountSavedVarsActive: ds.defaultToAccount }
}
