import { asPresent } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"
import "akasha/temper/addon/pages/lib-sets/lib-sets-set-type-ids/lib-sets-set-type-ids.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-sets/modules/lib-sets-const-settype-ids/lib-sets-const-settype-ids.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings/eso-lib-sets-strings.type-declaration.d.ts"

export const fallbackLang = lib.fallbackLang

export const undauntedStr = GetString(SI_VISUALARMORTYPE4)
export const dungeonStr = GetString(SI_ZONEDISPLAYTYPE2)
export const setTypeArenaName = asPresent(lib.setTypesToName[LIBSETS_SETTYPE_ARENA])
