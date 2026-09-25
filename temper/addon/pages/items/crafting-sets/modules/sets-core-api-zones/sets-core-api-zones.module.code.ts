import { asTypeBoolMapOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import {
  SETS_TABLEKEY_DUNGEON_ZONE_IDS,
  SETS_TABLEKEY_PUBLIC_DUNGEON_ZONE_IDS,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-const-base/sets-const-base.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { lib as zones } from "akasha/temper/addon/pages/items/crafting-station/modules/zone-lib-state/zone-lib-state.module.code.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

function isZoneIn(this: void, key: string, zoneId: number | undefined): boolean {
  if (zoneId === undefined) {
    return false
  }
  return asTypeBoolMapOpt(lib.setDataPreloaded[key])?.[zoneId] === true
}

function isDungeonZoneId(this: void, zoneId: number | undefined): boolean {
  return isZoneIn(SETS_TABLEKEY_DUNGEON_ZONE_IDS, zoneId)
}
lib.IsDungeonZoneId = isDungeonZoneId

function isPublicDungeonZoneId(this: void, zoneId: number | undefined): boolean {
  return isZoneIn(SETS_TABLEKEY_PUBLIC_DUNGEON_ZONE_IDS, zoneId)
}
lib.IsPublicDungeonZoneId = isPublicDungeonZoneId

function getZoneName(this: void, zoneId: number | undefined, lang?: string): string | undefined {
  if (zoneId === undefined) {
    return undefined
  }
  if (lang === undefined || lang === lib.clientLang) {
    return ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))
  }
  return zones.GetZoneName(zoneId, lang)
}
lib.GetZoneName = getZoneName
