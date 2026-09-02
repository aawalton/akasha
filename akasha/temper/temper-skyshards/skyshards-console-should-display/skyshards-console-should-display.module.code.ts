import {
  CONSOLE_STATE,
  getDb,
} from "../skyshards-console-state/skyshards-console-state.module.code.ts"
import { PINS_COMPASS } from "../skyshards-constants/skyshards-constants.module.code.ts"
import {
  getImmersiveModeCondition,
  getLocalData,
} from "../skyshards-data-accessors/skyshards-data-accessors.module.code.ts"

type ReadonlyNumberArray = readonly number[]

export function updateSkyshardsData(this: void, zone: string, subzone: string): undefined {
  CONSOLE_STATE.skyshards = getLocalData(zone, subzone)
  COMPASS_PINS.RefreshPins(PINS_COMPASS)
  CONSOLE_STATE.lastZone = GetMapTileTexture()
}

function allConditionAchievementsCompleted(
  this: void,
  conditionData: number | readonly number[] | boolean | undefined
): boolean {
  if (type(conditionData) === "table") {
    for (const [, achievementIndex] of ipairs(conditionData as ReadonlyNumberArray)) {
      const [, , , , completed] = GetAchievementInfo(achievementIndex)
      if (!completed) {
        return false
      }
    }
    return true
  }
  const [, , , , completed] = GetAchievementInfo(conditionData as number)
  return completed
}

export function shouldDisplaySkyshards(this: void): boolean {
  const db = getDb()

  if (db.immersiveMode === 1) {
    return true
  }

  let mapIndex = GetCurrentMapIndex()

  if (mapIndex == null && IsInImperialCity()) {
    mapIndex = GetImperialCityMapIndex()
  }

  if (mapIndex == null) {
    const measurements = LibGPS3 != null ? LibGPS3.GetCurrentMapMeasurement() : undefined
    if (measurements != null) {
      mapIndex = measurements.mapIndex
    }
  }

  if (mapIndex != null) {
    const conditionData = getImmersiveModeCondition(db.immersiveMode, mapIndex)
    if (db.immersiveMode === 2) {
      return allConditionAchievementsCompleted(conditionData)
    } else if (db.immersiveMode === 3) {
      if (mapIndex !== 14) {
        return conditionData as boolean
      }
    } else if (db.immersiveMode === 4) {
      return allConditionAchievementsCompleted(conditionData)
    } else if (db.immersiveMode === 5) {
      return allConditionAchievementsCompleted(conditionData)
    }
  }

  return true
}
