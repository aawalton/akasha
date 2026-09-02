import { getImmersiveModeCondition } from "../skyshards-data-accessors/skyshards-data-accessors.module.code.ts"
import { getDb } from "../skyshards-pc-state/skyshards-pc-state.module.code.ts"

type ReadonlyNumberArray = readonly number[]

function allConditionsCompleted(
  this: void,
  conditionData: number | readonly number[] | boolean | undefined
): boolean {
  if (type(conditionData) === "table") {
    for (const achievementIndex of conditionData as ReadonlyNumberArray) {
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
    const measurements = LibGPS3?.GetCurrentMapMeasurement()
    if (measurements != null) {
      mapIndex = measurements.mapIndex
    }
  }

  if (mapIndex != null) {
    const conditionData = getImmersiveModeCondition(db.immersiveMode, mapIndex)
    if (db.immersiveMode === 2) {
      return allConditionsCompleted(conditionData)
    } else if (db.immersiveMode === 3) {
      if (mapIndex !== 14) {
        return conditionData as boolean
      }
    } else if (db.immersiveMode === 4) {
      return allConditionsCompleted(conditionData)
    } else if (db.immersiveMode === 5) {
      return allConditionsCompleted(conditionData)
    }
  }

  return true
}
