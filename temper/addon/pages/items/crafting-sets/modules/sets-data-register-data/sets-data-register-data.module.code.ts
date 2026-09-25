import { BLACKLISTED_SET_IDS } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-gen-blacklisted-set-ids/sets-gen-blacklisted-set-ids.module.code.ts"
import { SPECIAL_BONUS_SETS } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-gen-special-bonus-sets/sets-gen-special-bonus-sets.module.code.ts"
import { SET_DATA } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-set-data/sets-set-data.data-table.code.ts"
import { SET_INFO } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-set-info/sets-set-info.data-table.code.ts"
import "akasha/temper/addon/type/sets-api/sets-api.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

lib.setDataPreloaded = SET_DATA
lib.zoneIdsOfNewAPIVersionOnly = []

lib.blacklistedSetIds = BLACKLISTED_SET_IDS
lib.specialBonusSets = SPECIAL_BONUS_SETS
lib.setsOfNewerAPIVersion = []
lib.setInfo = SET_INFO
lib.noSetIdSets = {}
