import { asNumber } from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBSAVEDVARS_SCOPE_MAX,
  LIBSAVEDVARS_SCOPE_MIN,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import type { LsvTable } from "../saved-vars-types/saved-vars-types.module.code.ts"

export function shiftOptionalParams(
  this: void,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  defaultToAccount?: unknown,
  profile?: unknown,
  displayName?: unknown,
  characterName?: unknown,
  characterId?: unknown,
  characterKeyType?: unknown
): LuaMultiReturn<
  [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]
> {
  if (version !== undefined && type(version) !== "number") {
    return shiftOptionalParams(
      undefined,
      version,
      namespace,
      defaults,
      defaultToAccount,
      profile,
      displayName,
      characterName,
      characterId
    )
  } else if (namespace !== undefined && type(namespace) !== "string") {
    return shiftOptionalParams(
      version,
      undefined,
      namespace,
      defaults,
      defaultToAccount,
      profile,
      displayName,
      characterName,
      characterId
    )
  } else if (defaults !== undefined && type(defaults) !== "table") {
    return shiftOptionalParams(
      version,
      namespace,
      undefined,
      defaults,
      defaultToAccount,
      profile,
      displayName,
      characterName,
      characterId
    )
  } else if (defaultToAccount !== undefined && type(defaultToAccount) !== "boolean") {
    return shiftOptionalParams(
      version,
      namespace,
      defaults,
      true,
      defaultToAccount,
      profile,
      displayName,
      characterName,
      characterId
    )
  }

  return $multi(
    version,
    namespace,
    defaults,
    defaultToAccount,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )
}

export function tableDiffKeys(this: void, table1: LsvTable, table2: LsvTable): LsvTable {
  const diff: LsvTable = {}
  for (const [key1, value1] of pairs(table1)) {
    if (table2[key1] === undefined) {
      diff[key1] = value1
    }
  }
  return diff
}

export function tableMerge(this: void, table1: LsvTable, table2: LsvTable): LsvTable {
  const merged = ZO_ShallowTableCopy(table1)
  for (const [key2, value2] of pairs(table2)) {
    if (table1[key2] === undefined) {
      merged[key2] = value2
    }
  }
  return merged
}

export function tableFilterKeys(this: void, tbl: LsvTable, keyTable: LsvTable): LsvTable {
  const filtered: LsvTable = {}
  for (const [key, value] of pairs(tbl)) {
    if (keyTable[key] !== undefined) {
      filtered[key] = value
    }
  }
  return filtered
}

export function validateScope(this: void, scope: unknown): undefined {
  if (scope === undefined) {
    return
  }
  if (type(scope) !== "number") {
    error(`Invalid type for parameter 'scope'. Expected 'number'. Got '${type(scope)}' instead.`, 2)
  }
  const value = asNumber(scope)
  if (value < LIBSAVEDVARS_SCOPE_MIN || value > LIBSAVEDVARS_SCOPE_MAX) {
    error(
      `Invalid value for parameter 'scope'.  Valid values must be between ${tostring(LIBSAVEDVARS_SCOPE_MIN)} and ${tostring(LIBSAVEDVARS_SCOPE_MAX)}.`,
      2
    )
  }
}
