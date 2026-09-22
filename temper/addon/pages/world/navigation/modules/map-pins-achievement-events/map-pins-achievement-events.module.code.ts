import { ACHIEVEMENTS_ID } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-achievements-id/map-pins-achievements-id.module.code.ts"
import { BOSSES_ACHIEVEMENTS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-bosses-achievements/map-pins-bosses-achievements.module.code.ts"
import { refreshCompass } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-compass-pins/map-pins-compass-pins.module.code.ts"
import type {
  IdSet,
  NumberMap,
} from "akasha/temper/addon/pages/world/navigation/modules/map-pins-data-types/map-pins-data-types.module.code.ts"
import { FISHING_ACHIEVEMENTS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-fishing-achievements/map-pins-fishing-achievements.module.code.ts"
import { getSavedVars } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-saved-variables/map-pins-saved-variables.module.code.ts"
import { SKY_SHARDS_ACHIEVEMENTS } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-sky-shards-achievements/map-pins-sky-shards-achievements.module.code.ts"
import {
  getPinTypeId,
  STATE,
} from "akasha/temper/addon/pages/world/navigation/modules/map-pins-state/map-pins-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"

const achievementsId: NumberMap = ACHIEVEMENTS_ID
const skyShardsAchievements: IdSet = SKY_SHARDS_ACHIEVEMENTS
const fishingAchievements: IdSet = FISHING_ACHIEVEMENTS
const bossesAchievements: IdSet = BOSSES_ACHIEVEMENTS

function parseLuaCapture(this: void, captured: string | undefined): string | undefined {
  return captured
}

export function onAchievementUpdate(this: void, achievementId: number): undefined {
  STATE.lastAchivement = achievementId

  const refreshPins = (name: number): undefined => {
    const namespace = "CallLater_" + tostring(name)
    EVENT_MANAGER.RegisterForUpdate(namespace, 1000, () => {
      EVENT_MANAGER.UnregisterForUpdate(namespace)
      ZO_WorldMap_RefreshCustomPinsOfType(name)
      if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(name)
    })
  }

  const zoneAchPin = achievementsId[achievementId]
  if (skyShardsAchievements[achievementId] === true) {
    refreshPins(getPinTypeId(3))
  } else if (fishingAchievements[achievementId] === true && getSavedVars()[17] === true) {
    refreshPins(getPinTypeId(17))
  } else if (zoneAchPin !== undefined) {
    refreshPins(getPinTypeId(zoneAchPin))
  } else if (bossesAchievements[achievementId] === true) {
    const [achName] = GetAchievementCriterion(achievementId, 1)
    const [explorerCapture] = string.match(achName, "Explorer")
    const [groupChallengeCapture] = string.match(achName, "Group Challenge")
    const explorer = parseLuaCapture(explorerCapture)
    const groupChallenge = parseLuaCapture(groupChallengeCapture)
    if (explorer !== undefined || groupChallenge !== undefined) {
      refreshPins(getPinTypeId(1))
    }
  }
}

export function onSkyshardsUpdated(this: void): undefined {
  ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(3))
  refreshCompass(3)
}

export function onBookLearned(this: void, _eventCode: number, categoryIndex: number): undefined {
  if (categoryIndex === 1) {
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(5))
    refreshCompass(5)
  }
}
