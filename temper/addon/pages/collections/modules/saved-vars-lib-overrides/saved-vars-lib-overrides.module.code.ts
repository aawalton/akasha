import {
  asSavedVarsAccountWideFn,
  asSavedVarsNewFn,
  asSavedVarsWritable,
  asZoSavedVars,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_ID_KEY,
  SAVED_VARS_CHARACTER_NAME_KEY,
  SAVED_VARS_NAME,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import { LIB_STATE } from "akasha/temper/addon/pages/collections/modules/saved-vars-lib-state/saved-vars-lib-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  RegisteredSavedVarsInfo,
  SavedVarsTable,
  SavedVarsWritable,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function toCode(this: void, input: unknown): string {
  if (type(input) === "string") {
    return `'${tostring(input)}'`
  }
  return tostring(input)
}

function codeFormat(this: void, format: string, ...args: unknown[]): string {
  const params: string[] = []
  for (const i of $range(1, args.length)) {
    params.push(toCode(args[i - 1]))
  }
  return zo_strformat(format, ...params)
}

function registerSavedVars(
  this: void,
  savedVars: SavedVarsTable,
  savedVariableTableName: string,
  version: number,
  namespace: string | undefined,
  defaults: SavedVarsTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): undefined {
  const [rawSavedVarsTable, parent, key, savedVariableTable, path] =
    SAVED_VARS.protected.GetSavedVarsTable(
      savedVariableTableName,
      namespace,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )

  let keyType: number
  if (characterName === undefined) {
    keyType = SAVED_VARS_ACCOUNT_KEY
  } else if (characterKeyType !== undefined) {
    keyType = characterKeyType
  } else {
    keyType = SAVED_VARS_CHARACTER_NAME_KEY
  }

  const info: RegisteredSavedVarsInfo = {
    addonName: LIB_STATE.currentAddonName,
    name: savedVariableTableName,
    table: savedVariableTable,
    keyType,
    defaults,
    version,
    namespace,
    profile,
    displayName,
    characterName,
    characterId,
    rawSavedVarsTable,
    rawSavedVarsTablePath: path,
    rawSavedVarsTableParent: parent,
    rawSavedVarsTableKey: key,
  }

  if (SAVED_VARS.protected.debugMode) {
    let format: string
    if (key === SAVED_VARS_ACCOUNT_KEY) {
      format = "ZO_SavedVars:New(<<1>>,<<2>>,<<3>>,<<4>>,<<5>>,<<6>>,<<7>>,<<8>>,<<9>>)"
    } else {
      format = "ZO_SavedVars:NewAccountWide(<<1>>,<<2>>,<<3>>,<<4>>,<<5>>,<<6>>)"
    }
    const message = codeFormat(
      format,
      savedVariableTableName,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    SAVED_VARS.protected.Debug(message)
  }

  LIB_STATE.savedVarRegistry.set(savedVars, info)
}

function onAddonLoaded(this: void, _eventCode: number, name: string): undefined {
  LIB_STATE.currentAddonName = name
}

export function installLibOverrides(this: void): undefined {
  const sv = asSavedVarsWritable(ZO_SavedVars)
  const origSavedVarsNew = asSavedVarsNewFn(ZO_SavedVars.New)
  const origSavedVarsNewAccountWide = asSavedVarsAccountWideFn(ZO_SavedVars.NewAccountWide)

  function newOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ): SavedVarsTable {
    const savedVars = origSavedVarsNew(
      asZoSavedVars(this),
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    registerSavedVars(
      savedVars,
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    return savedVars
  }

  function newCharacterNameSettingsOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string
  ): SavedVarsTable {
    return this.New(
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      GetDisplayName(),
      GetUnitName("player"),
      GetCurrentCharacterId(),
      SAVED_VARS_CHARACTER_NAME_KEY
    )
  }

  function newCharacterIdSettingsOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string
  ): SavedVarsTable {
    return this.New(
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      GetDisplayName(),
      GetUnitName("player"),
      GetCurrentCharacterId(),
      SAVED_VARS_CHARACTER_ID_KEY
    )
  }

  function newAccountWideOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: SavedVarsTable,
    profile?: string,
    displayName?: string
  ): SavedVarsTable {
    const savedVars = origSavedVarsNewAccountWide(
      asZoSavedVars(this),
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName
    )
    registerSavedVars(
      savedVars,
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName
    )
    return savedVars
  }

  sv.New = newOverride
  sv.NewCharacterNameSettings = newCharacterNameSettingsOverride
  sv.NewCharacterIdSettings = newCharacterIdSettingsOverride
  sv.NewAccountWide = newAccountWideOverride

  EVENT_MANAGER.RegisterForEvent(SAVED_VARS_NAME, EVENT_ADD_ON_LOADED, onAddonLoaded)

  return undefined
}
