import {
  DEST_PIN_TEXT_COLOR_FISH,
  DEST_PIN_TEXT_COLOR_FISH_DONE,
  DEST_PIN_TEXT_COLORBAIT_FISH,
  DEST_PIN_TEXT_COLORTITLE_FISH,
  DEST_PIN_TEXT_COLORWATER_FISH,
} from "../destinations-colors/destinations-colors.module.code.ts"
import {
  baitAndWaterForPinType,
  baitLeftForPinType,
  scanFishingBait,
} from "../destinations-fishing-bait/destinations-fishing-bait.module.code.ts"
import {
  DESTINATIONS_FISH_TYPE_FOUL,
  DESTINATIONS_FISH_TYPE_LAKE,
  DESTINATIONS_FISH_TYPE_OCEAN,
  DESTINATIONS_FISH_TYPE_RIVER,
} from "../destinations-fishing-fish-types/destinations-fishing-fish-types.module.code.ts"
import { PIN_TYPES } from "../destinations-pin-type-constants/destinations-pin-type-constants.module.code.ts"
import {
  ACH_STATE,
  sharedAchievementsPinData,
} from "../destinations-pins-ach-callbacks/destinations-pins-ach-callbacks.module.code.ts"
import {
  AchIndex,
  FishIDs,
  FishIndex,
  FishStore,
  rowNumber,
} from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import { DRTV } from "../destinations-runtime-variables/destinations-runtime-variables.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

export function fishpinTypeCallback(this: void): undefined {
  if (GetMapType() >= MAPTYPE_WORLD) return
  DRTV.pinName = PIN_TYPES.FISHING
  sharedAchievementsPinData()
  const mapData = ACH_STATE.mapData
  if (mapData === undefined) return
  const sv = getSavedVariables()
  if (sv.filters[PIN_TYPES.FISHING_SHOW_BAIT_LEFT] === true) {
    scanFishingBait()
  }
  for (const pinData of mapData) {
    DRTV.pinType = rowNumber(pinData, AchIndex.TYPE)
    if (DRTV.pinType >= 40 && DRTV.pinType <= 44) {
      const pinType = DRTV.pinType
      const fishID = rowNumber(pinData, AchIndex.ID)
      let completedTotal = 0
      const requiredTotal = GetAchievementNumCriteria(fishID)
      for (let i = 1; i <= requiredTotal; i++) {
        const [, completed] = GetAchievementCriterion(fishID, i)
        if (completed === 1) {
          completedTotal = completedTotal + 1
        }
      }
      if (completedTotal === requiredTotal) return
      const { fishingBait, waterType } = baitAndWaterForPinType(pinType)
      DRTV.pinTag = []
      let countF = 0
      let countL = 0
      let countO = 0
      let countR = 0
      let countFN = 0
      let countLN = 0
      let countON = 0
      let countRN = 0
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
              if (completed === 0) countFN = countFN + 1
            } else if (pinType === 41 && fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countRN = countRN + 1
            } else if (pinType === 42 && fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countON = countON + 1
            } else if (pinType === 43 && fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
              const [, completed] = GetAchievementCriterion(fishID, i)
              if (completed === 0) countLN = countLN + 1
            }
          }
        }
      }
      DRTV.pinTag.push(
        DEST_PIN_TEXT_COLORTITLE_FISH.Colorize(zo_strformat("<<1>>", FishIDs[fishID]))
      )
      if (sv.filters[PIN_TYPES.FISHING_SHOW_FISHNAME] === true) {
        for (let i = 1; i <= requiredTotal; i++) {
          for (const fishEntry of fishdata) {
            let fishFound = false
            let fishMiss = false
            const fishLoc = rowNumber(fishEntry, FishIndex.LOCATION)
            const fishNumber = rowNumber(fishEntry, FishIndex.FISHNUMBER)
            const [fishName, completed] = GetAchievementCriterion(fishID, i)
            if (fishNumber === i) {
              if (pinType === 40 && fishLoc === DESTINATIONS_FISH_TYPE_FOUL) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 41 && fishLoc === DESTINATIONS_FISH_TYPE_RIVER) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 42 && fishLoc === DESTINATIONS_FISH_TYPE_OCEAN) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              } else if (pinType === 43 && fishLoc === DESTINATIONS_FISH_TYPE_LAKE) {
                if (completed === 0) {
                  fishMiss = true
                } else if (LibMapPins.IsEnabled(PIN_TYPES.FISHINGDONE)) {
                  fishFound = true
                }
              }
            }
            if (fishMiss) {
              DRTV.pinTag.push(
                DEST_PIN_TEXT_COLOR_FISH.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
              )
            } else if (fishFound) {
              DRTV.pinTag.push(
                DEST_PIN_TEXT_COLOR_FISH_DONE.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
              )
            }
            if (pinType === 44 && fishNumber === i) {
              if (completed === 0) {
                DRTV.pinTag.push(
                  DEST_PIN_TEXT_COLOR_FISH.Colorize(zo_strformat("<<1>>", "[" + fishName + "]"))
                )
              } else {
                DRTV.pinTag.push(
                  DEST_PIN_TEXT_COLOR_FISH_DONE.Colorize(
                    zo_strformat("<<1>>", "[" + fishName + "]")
                  )
                )
              }
            }
          }
        }
      }
      if (fishingBait !== undefined && sv.filters[PIN_TYPES.FISHING_SHOW_BAIT] === true) {
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLORBAIT_FISH.Colorize(zo_strformat("<<1>>", "<" + fishingBait + ">"))
        )
        if (sv.filters[PIN_TYPES.FISHING_SHOW_BAIT_LEFT] === true) {
          const fishingBaitLeft = baitLeftForPinType(pinType)
          if (fishingBaitLeft !== undefined) {
            DRTV.pinTag.push(
              DEST_PIN_TEXT_COLORBAIT_FISH.Colorize(
                zo_strformat("<<1>>", "{" + fishingBaitLeft + "}")
              )
            )
          }
        }
      }
      if (waterType !== undefined && sv.filters[PIN_TYPES.FISHING_SHOW_WATER] === true) {
        DRTV.pinTag.push(
          DEST_PIN_TEXT_COLORWATER_FISH.Colorize(zo_strformat("<<1>>", "(" + waterType + ")"))
        )
      }
      if (countFN >= 1 || countLN >= 1 || countON >= 1 || countRN >= 1) {
        if (countF >= 1 || countL >= 1 || countO >= 1 || countR >= 1) {
          LibMapPins.CreatePin(
            PIN_TYPES.FISHING,
            DRTV.pinTag,
            rowNumber(pinData, AchIndex.X),
            rowNumber(pinData, AchIndex.Y)
          )
        }
      }
    }
  }
}
