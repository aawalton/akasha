import { lib } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-lib/lib-sets-lib.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings/eso-lib-sets-strings.type-declaration.d.ts"

export const checkIfPTSAPIVersionIsLive = lib.checkIfPTSAPIVersionIsLive

export const zogcn = GetCollectibleName

export const cyrodiilAndBattlegroundText =
  GetString(SI_CAMPAIGNRULESETTYPE1) + "/" + GetString(SI_LEADERBOARDTYPE4)
