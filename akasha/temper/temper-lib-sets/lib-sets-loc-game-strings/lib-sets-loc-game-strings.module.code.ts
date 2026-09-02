import { asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

export const lib = LibSets

export const fallbackLang = lib.fallbackLang

export const undauntedStr = GetString(SI_VISUALARMORTYPE4)
export const dungeonStr = GetString(SI_ZONEDISPLAYTYPE2)
export const setTypeArenaName = asPresent(lib.setTypesToName[LIBSETS_SETTYPE_ARENA])
