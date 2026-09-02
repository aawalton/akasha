import {
  API_VERSION,
  LOST_TREASURE_BLANK_SAVED_VARS,
} from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import {
  deleteAllNotificationsInDatabase,
  notificationsAdd,
} from "../lost-treasure-notifications/lost-treasure-notifications.module.code.ts"
import { getSavedVars } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import type { PinData } from "../lost-treasure-types/lost-treasure-types.module.code.ts"

const logger = createLogger("mining")

const MINING_ACTIVE_TIME = ZO_ONE_DAY_IN_SECONDS * 7

const STATE = { isActive: false }

function hasBlankSavedVars(this: void, miningTimeStamp: number, miningAPIVersion: number): boolean {
  return (
    miningTimeStamp === LOST_TREASURE_BLANK_SAVED_VARS ||
    miningAPIVersion === LOST_TREASURE_BLANK_SAVED_VARS
  )
}

function isWithinMiningActiveTime(this: void, now: number, miningTimeStamp: number): boolean {
  const timeDiff = GetDiffBetweenTimeStamps(now, miningTimeStamp)
  const withinTime = timeDiff < MINING_ACTIVE_TIME
  logger.Debug(
    "timeDiff %d/%d, isWithinMiningActiveTime %s",
    timeDiff,
    MINING_ACTIVE_TIME,
    tostring(withinTime)
  )
  return withinTime
}

export function miningIsActive(this: void): boolean {
  return STATE.isActive
}

function isStored(this: void, pinData: PinData): boolean {
  const db = getSavedVars()
  const mapIdData = db.mining.data[pinData.mapId]
  if (mapIdData !== undefined) {
    for (const [, pinLayoutData] of ipairs(mapIdData)) {
      if (pinLayoutData.itemId === pinData.itemId) {
        logger.Debug("%d has been found", pinData.itemId)
        return true
      }
    }
  }
  logger.Debug("%d has not been found", pinData.itemId)
  return false
}

function store(this: void, pinData: PinData, _overwriteMiningState?: boolean): undefined {
  const db = getSavedVars()
  const mapData = db.mining.data[pinData.mapId] ?? []
  db.mining.data[pinData.mapId] = mapData
  mapData.push(pinData)

  logger.Debug(
    "new item %d %s has been stored. hasNotMapOpened: %s, hasNotBookOpened: %s",
    pinData.itemId,
    pinData.itemName,
    "nil",
    "nil"
  )

  notificationsAdd(pinData)
}

export function miningAdd(this: void, pinData: PinData, overwriteMiningState?: boolean): undefined {
  if (miningIsActive() || overwriteMiningState === true) {
    if (!isStored(pinData)) {
      store(pinData, overwriteMiningState)
    } else {
      logger.Info("Item %s is stored already.", pinData.itemId)
    }
  } else {
    logger.Info("Mining not active! Tried to add %s", pinData.itemId)
  }
}

export function initializeMining(this: void): undefined {
  STATE.isActive = false

  const db = getSavedVars()
  const miningData = db.mining
  const currentAPIVersion = API_VERSION

  const miningTimeStamp = miningData.APITimeStamp
  const miningAPIVersion = miningData.APIVersion

  const hasNewAPIVersion = currentAPIVersion > miningAPIVersion
  const now = GetTimeStamp()

  let additionalText = ": AN ISSUE HAS BEEN ENCOUNTERED"
  if (hasBlankSavedVars(miningTimeStamp, miningAPIVersion) || hasNewAPIVersion) {
    db.mining.APIVersion = currentAPIVersion
    db.mining.APITimeStamp = now
    if (hasNewAPIVersion) {
      ZO_ClearTable(db.mining.data)
      additionalText = "due to a new game API Version."
    } else {
      additionalText = "due to blank SavedVars."
    }
    STATE.isActive = true
  } else if (isWithinMiningActiveTime(now, miningTimeStamp)) {
    additionalText = "within active mining time."
    STATE.isActive = true
  }

  if (STATE.isActive) {
    logger.Info("initialized: Mining is ACTIVE " + additionalText)
  } else {
    deleteAllNotificationsInDatabase()
    logger.Info("initialized: Mining is NOT active")
  }
}
