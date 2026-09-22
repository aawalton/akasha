import {
  asGlobalTable,
  asPresent,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-set-type-ids/lib-sets-set-type-ids.type-declaration.d.ts"

const G = asGlobalTable(globalThis)

const POSSIBLE_SET_TYPES: { [index: number]: string } = {
  [1]: "LIBSETS_SETTYPE_ARENA",
  [2]: "LIBSETS_SETTYPE_BATTLEGROUND",
  [3]: "LIBSETS_SETTYPE_CRAFTED",
  [4]: "LIBSETS_SETTYPE_CYRODIIL",
  [5]: "LIBSETS_SETTYPE_DAILYRANDOMDUNGEONANDICREWARD",
  [6]: "LIBSETS_SETTYPE_DUNGEON",
  [7]: "LIBSETS_SETTYPE_IMPERIALCITY",
  [8]: "LIBSETS_SETTYPE_MONSTER",
  [9]: "LIBSETS_SETTYPE_OVERLAND",
  [10]: "LIBSETS_SETTYPE_SPECIAL",
  [11]: "LIBSETS_SETTYPE_TRIAL",
  [12]: "LIBSETS_SETTYPE_MYTHIC",
  [13]: "LIBSETS_SETTYPE_IMPERIALCITY_MONSTER",
  [14]: "LIBSETS_SETTYPE_CYRODIIL_MONSTER",
  [15]: "LIBSETS_SETTYPE_CLASS",
}

for (const [setTypeId, setTypeName] of ipairs(POSSIBLE_SET_TYPES)) {
  G[setTypeName] = setTypeId
}

export const SET_TYPE_ITERATION_BEGIN = LIBSETS_SETTYPE_ARENA

export const SET_TYPE_ITERATION_END = asNumber(
  G[asPresent(POSSIBLE_SET_TYPES[lengthOf(POSSIBLE_SET_TYPES)])]
)

G["LIBSETS_SETTYPE_ITERATION_BEGIN"] = SET_TYPE_ITERATION_BEGIN
G["LIBSETS_SETTYPE_ITERATION_END"] = SET_TYPE_ITERATION_END

function lengthOf(this: void, t: { [index: number]: string }): number {
  let n = 0
  for (const [k] of ipairs(t)) {
    n = k
  }
  return n
}
function asNumber(this: void, value: unknown): number {
  return tonumber(value) ?? 0
}
