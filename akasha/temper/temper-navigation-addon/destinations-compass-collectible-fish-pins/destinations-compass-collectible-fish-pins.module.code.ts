import {
  DESTINATIONS_FISH_TYPE_FOUL,
  DESTINATIONS_FISH_TYPE_LAKE,
  DESTINATIONS_FISH_TYPE_OCEAN,
  DESTINATIONS_FISH_TYPE_RIVER,
} from "../destinations-fishing-fish-types/destinations-fishing-fish-types.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  getMapTextureName,
  MAP_STATE,
} from "../destinations-pins-map-context/destinations-pins-map-context.module.code.ts"
import {
  AchIndex,
  AchStore,
  CollectibleIndex,
  CollectibleStore,
  FishIndex,
  FishStore,
  rowNumber,
  rowString,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { getCharacterSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function collectibleFishCompassPins(this: void): undefined {
  const cssv = getCharacterSavedVariables()
  if (!LibMapPins.IsEnabled(PIN_TYPES.COLLECTIBLES) && !LibMapPins.IsEnabled(PIN_TYPES.FISHING)) {
    return
  }
  if (cssv.filters[PIN_TYPES.COLLECTIBLES] !== true && cssv.filters[PIN_TYPES.FISHING] !== true) {
    return
  }
  if (GetMapType() >= MAPTYPE_WORLD) return
  getMapTextureName()
  if (MAP_STATE.mapTextureName === undefined) return
  const data = AchStore[MAP_STATE.mapTextureName]
  if (data === undefined) return
  for (const pinData of data) {
    const pinType = rowNumber(pinData, AchIndex.TYPE)
    const x = rowNumber(pinData, AchIndex.X)
    const y = rowNumber(pinData, AchIndex.Y)
    if (pinType >= 40 && pinType <= 44) {
      if (
        cssv.filters[PIN_TYPES.FISHING_COMPASS] !== true ||
        !LibMapPins.IsEnabled(PIN_TYPES.FISHING)
      ) {
        return
      }
      const fishID = rowNumber(pinData, AchIndex.ID)
      const requiredTotal = GetAchievementNumCriteria(fishID)
      let countF = 0
      let countL = 0
      let countO = 0
      let countR = 0
      let countFN = 0
      let countLN = 0
      let countON = 0
      let countRN = 0
      let countFND = 0
      let countLND = 0
      let countOND = 0
      let countRND = 0
      const fishdata = FishStore[fishID] ?? []
      for (const fishEntry of fishdata) {
        const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
        if (fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
          countF = countF + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
          countL = countL + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
          countO = countO + 1
        } else if (fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
          countR = countR + 1
        }
      }
      for (let i = 1; i <= requiredTotal; i++) {
        for (const fishEntry of fishdata) {
          const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
          const fishNumber = rowNumber(fishEntry, FishIndex.FISHNUMBER)
          if (fishNumber === i) {
            if (pinType === 40 && fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) {
                countFN = countFN + 1
              } else {
                countFND = countFND + 1
              }
            } else if (pinType === 41 && fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) {
                countRN = countRN + 1
              } else {
                countRND = countRND + 1
              }
            } else if (pinType === 42 && fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) {
                countON = countON + 1
              } else {
                countOND = countOND + 1
              }
            } else if (pinType === 43 && fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) {
                countLN = countLN + 1
              } else {
                countLND = countLND + 1
              }
            }
          }
        }
      }
      if (
        (countFN >= 1 && countF >= 1 && countF !== countFND) ||
        (countLN >= 1 && countL >= 1 && countL !== countLND) ||
        (countON >= 1 && countO >= 1 && countO !== countOND) ||
        (countRN >= 1 && countR >= 1 && countR !== countRND)
      ) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.FISHING, pinData, x, y)
      } else if (cssv.filters[PIN_TYPES.FISHINGDONE] === true) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.FISHINGDONE, pinData, x, y)
      }
    } else if (pinType === 30) {
      if (
        cssv.filters[PIN_TYPES.COLLECTIBLES_COMPASS] !== true ||
        !LibMapPins.IsEnabled(PIN_TYPES.COLLECTIBLES)
      ) {
        return
      }
      const collectibleID = rowNumber(pinData, AchIndex.ID)
      const requiredTotal = GetAchievementNumCriteria(collectibleID)
      const collectibledata = CollectibleStore[collectibleID] ?? []
      const collectibleCode = rowString(pinData, AchIndex.KEYCODE)
      let countCN = 0
      for (let i = 1; i <= requiredTotal; i++) {
        for (const collectibleEntry of collectibledata) {
          const collectibleNumber = rowNumber(collectibleEntry, CollectibleIndex.NUMBER)
          if (collectibleNumber === i) {
            const [findStart] = string.find(collectibleCode, tostring(i))
            if (findStart !== undefined) {
              const [, completed] = GetAchievementCriterion(collectibleID, i)
              if (completed === 1) {
                countCN = countCN + 1
              }
            }
          }
        }
      }
      if (countCN === 0) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.COLLECTIBLES, pinData, x, y)
      } else if (cssv.filters[PIN_TYPES.COLLECTIBLESDONE] === true) {
        COMPASS_PINS.pinManager.CreatePin(PIN_TYPES.COLLECTIBLESDONE, pinData, x, y)
      }
    }
  }
}
