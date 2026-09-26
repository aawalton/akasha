import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  ADDS,
  BLUE,
  GREEN,
  RED,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-vateshran-adds/combat-alerts-vateshran-adds.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

let currentWing: string | undefined
let gateIndex = 0

function hasPattern(this: void, text: string, pattern: string): boolean {
  const [found] = string.find(text, pattern)
  return found !== undefined
}

function getWing(this: void): string | undefined {
  const mapTileTexture = string.lower(GetMapTileTexture())

  if (hasPattern(mapTileTexture, "map02")) {
    return BLUE
  } else if (hasPattern(mapTileTexture, "map03")) {
    return GREEN
  } else if (hasPattern(mapTileTexture, "map04")) {
    return RED
  }
  return undefined
}

let scoreBatch: Record<number, number> = {}

function onScoreBatch(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "VHScoreTimeout")

  const wing = getWing()

  if (wing !== undefined) {
    if (wing !== currentWing) {
      CRUTCH.dbgOther(string.format("|cFF7777Starting new wing %s|r", wing))
      currentWing = wing
      gateIndex = 0
    }

    let isBoss = false
    if (
      scoreBatch[RAID_POINT_REASON_SOLO_ARENA_PICKUP_ONE] !== undefined ||
      scoreBatch[RAID_POINT_REASON_SOLO_ARENA_PICKUP_TWO] !== undefined ||
      scoreBatch[RAID_POINT_REASON_SOLO_ARENA_PICKUP_THREE] !== undefined ||
      scoreBatch[RAID_POINT_REASON_SOLO_ARENA_PICKUP_FOUR] !== undefined
    ) {
      isBoss = true
    }

    const wingAdds = ADDS[wing] ?? {}
    gateIndex = gateIndex + 1
    let baselineData = wingAdds[gateIndex]
    if (baselineData === undefined) {
      CRUTCH.dbgOther(
        string.format("|cFF0000No baseline data found for %s gate %d|r", wing, gateIndex)
      )
    } else {
      CRUTCH.dbgSpam(string.format("checking wing %s gateIndex %d", wing, gateIndex))
      if (isBoss && baselineData.normal !== undefined) {
        let missedNormal = 0
        let missedBannermen = 0
        let missedChampion = 0

        while (baselineData !== undefined && baselineData.boss !== true) {
          missedNormal = missedNormal + (baselineData.normal ?? 0)
          missedBannermen = missedBannermen + (baselineData.bannermen ?? 0)
          missedChampion = missedChampion + (baselineData.champion ?? 0)
          gateIndex = gateIndex + 1
          baselineData = wingAdds[gateIndex]
        }

        let message = ""
        if (missedNormal !== 0) {
          message = string.format("%s; |cFF5555%d|r normal adds", message, missedNormal)
        }
        if (missedBannermen !== 0) {
          message = string.format("%s; |cFF5555%d|r bannermen", message, missedBannermen)
        }
        if (missedChampion !== 0) {
          message = string.format("%s; |cFF5555%d|r champions", message, missedChampion)
        }
        if (message !== "") {
          CHAT_ROUTER.AddSystemMessage("Missed adds (lots of skipping)" + message)
        }
      } else if (isBoss) {
        CRUTCH.dbgOther("this is a boss")
      } else if (scoreBatch[RAID_POINT_REASON_KILL_BOSS] !== undefined) {
        CRUTCH.dbgOther("moar score")
      } else {
        if (baselineData.normal === undefined) {
          gateIndex = gateIndex + 1
          baselineData = wingAdds[gateIndex]
          CHAT_ROUTER.AddSystemMessage(
            "|cFF5555You skipped the Brimstone Caretaker?! It's worth 15k points!|r"
          )
        }

        if (baselineData !== undefined) {
          const missedNormal =
            (baselineData.normal ?? 0) - (scoreBatch[RAID_POINT_REASON_KILL_NORMAL_MONSTER] ?? 0)
          const missedBannermen =
            (baselineData.bannermen ?? 0) - (scoreBatch[RAID_POINT_REASON_KILL_BANNERMEN] ?? 0)
          const missedChampion =
            (baselineData.champion ?? 0) - (scoreBatch[RAID_POINT_REASON_KILL_CHAMPION] ?? 0)

          let message = ""
          if (missedNormal !== 0) {
            message = string.format(
              "%s; |cFF5555%d|r normal adds (%s)",
              message,
              missedNormal,
              tostring(baselineData.normalName)
            )
          }
          if (missedBannermen !== 0) {
            message = string.format(
              "%s; |cFF5555%d|r bannermen (%s)",
              message,
              missedBannermen,
              tostring(baselineData.bannermenName)
            )
          }
          if (missedChampion !== 0) {
            message = string.format(
              "%s; |cFF5555%d|r champions (%s)",
              message,
              missedChampion,
              tostring(baselineData.championName)
            )
          }
          if (message !== "") {
            CHAT_ROUTER.AddSystemMessage("Missed adds" + message)
          }
        }
      }
    }
  }

  scoreBatch = {}
}

function onScoreUpdate(
  this: void,
  _eventCode: number,
  scoreUpdateReason: number,
  _scoreAmount: number,
  _totalScore: number
): undefined {
  if (scoreUpdateReason === RAID_POINT_REASON_LIFE_REMAINING) return

  scoreBatch[scoreUpdateReason] = (scoreBatch[scoreUpdateReason] ?? 0) + 1

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "VHScoreTimeout", 100, onScoreBatch)
}

function onStarted(this: void): undefined {
  scoreBatch = {}
  currentWing = undefined
  gateIndex = 0
}

function registerVateshran(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Vateshran Hollows")

  if (CRUTCH.savedOptions.vateshran.showMissedAdds) {
    EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "VHStarted", EVENT_RAID_TRIAL_STARTED, onStarted)

    EVENT_MANAGER.RegisterForEvent(
      CRUTCH.name + "VHScore",
      EVENT_RAID_TRIAL_SCORE_UPDATE,
      onScoreUpdate
    )
  }
}

function unregisterVateshran(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "VHStarted", EVENT_RAID_TRIAL_STARTED)

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "VHScore", EVENT_RAID_TRIAL_SCORE_UPDATE)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Vateshran Hollows")
}

registerZone(1227, registerVateshran, unregisterVateshran)
