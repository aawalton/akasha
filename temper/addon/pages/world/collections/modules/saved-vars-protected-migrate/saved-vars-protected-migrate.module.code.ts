import {
  asIndexable,
  asManagerInstance,
  asSavedVarsInfo,
  asString,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_ID_KEY,
  SAVED_VARS_CHARACTER_NAME_KEY,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  SavedVarsInfo,
  SavedVarsManagerInstance,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function stringifyPath(this: void, path: readonly unknown[]): string[] {
  return path.map((key) => tostring(key))
}

export function migrateToMegaserverProfiles(
  this: void,
  defaultKeyType: number | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers: boolean | undefined,
  toSavedVarsInfo: SavedVarsInfo | undefined
): LuaMultiReturn<
  [Record<string, SavedVarsManagerInstance> | undefined, SavedVarsManagerInstance]
> {
  let keyTypeDefault = defaultKeyType
  let toInfo = toSavedVarsInfo

  if (keyTypeDefault === undefined) {
    if (fromSavedVarsInfo.keyType === undefined) {
      keyTypeDefault = SAVED_VARS_CHARACTER_NAME_KEY
      fromSavedVarsInfo.keyType = SAVED_VARS_CHARACTER_NAME_KEY
    } else {
      keyTypeDefault = fromSavedVarsInfo.keyType
    }
  }

  if (toInfo !== undefined) {
    if (toInfo.keyType === undefined) {
      toInfo.keyType = keyTypeDefault
    }
  } else {
    toInfo = asSavedVarsInfo(ZO_DeepTableCopy(fromSavedVarsInfo))
    toInfo.keyType = keyTypeDefault
  }

  const isAccountWide = toInfo.keyType === SAVED_VARS_ACCOUNT_KEY

  SAVED_VARS.protected.Debug(
    `migrateToMegaserverProfiles performing migration to ${
      isAccountWide
        ? "account-wide"
        : toInfo.keyType === SAVED_VARS_CHARACTER_ID_KEY
          ? "character-ID-specific"
          : "character-name-specific"
    } settings.`
  )

  let profiles: string[]
  if (isAccountWide && (copyToAllServers === undefined || copyToAllServers)) {
    profiles = SAVED_VARS.lib.GetWorldNames()
  } else {
    profiles = [GetWorldName()]
  }
  if (toInfo.profile === undefined) {
    toInfo.profile = GetWorldName()
  } else if (!ZO_IsElementInNumericallyIndexedTable(profiles, toInfo.profile)) {
    profiles.unshift(toInfo.profile)
  }

  SAVED_VARS.protected.Debug(`#profiles: ${tostring(profiles.length)}`)

  const toSavedVarsInfoList: SavedVarsInfo[] = []
  for (const profile of profiles) {
    SAVED_VARS.protected.Debug(`profile: ${tostring(profile)}`)
    const toProfileSavedVarsInfo = asSavedVarsInfo({})
    ZO_ShallowTableCopy(toInfo, toProfileSavedVarsInfo)
    setmetatable(toProfileSavedVarsInfo, getmetatable(toInfo))
    toProfileSavedVarsInfo.profile = profile
    toSavedVarsInfoList.push(toProfileSavedVarsInfo)
  }

  SAVED_VARS.protected.Debug(`#toSavedVarsInfoList: ${tostring(toSavedVarsInfoList.length)}`)

  const [toSavedVarsManagers, from] = SAVED_VARS.protected.Migrate(
    keyTypeDefault,
    fromSavedVarsInfo,
    toSavedVarsInfoList[0],
    ...toSavedVarsInfoList.slice(1)
  )

  if (toSavedVarsManagers === undefined) {
    SAVED_VARS.protected.Debug("toSavedVarsManagers is nil. Exiting MegaServer profiles migration.")
    return $multi(undefined, from)
  }
  const toSavedVarsManagersByProfile: Record<string, SavedVarsManagerInstance> = {}
  for (const i of $range(1, toSavedVarsManagers.length)) {
    const to = asManagerInstance(toSavedVarsManagers[i - 1])
    const profile = asString(asSavedVarsInfo(toSavedVarsInfoList[i - 1]).profile)
    toSavedVarsManagersByProfile[profile] = to

    SAVED_VARS.protected.Debug(
      `Saved vars manager detected for ${tostring(to.name)} (${tostring(
        to.name === undefined ? undefined : asIndexable(_G)[to.name]
      )}) profile ${tostring(profile)}: path ${
        to.rawSavedVarsTablePath !== undefined
          ? table.concat(stringifyPath(to.rawSavedVarsTablePath), " > ")
          : ""
      } at index ${tostring(i)}`
    )
  }
  return $multi(toSavedVarsManagersByProfile, from)
}
