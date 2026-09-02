import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-eso-sandbox"

import { GREEN, RED, RESET } from "../next-boss-colors/next-boss-colors.module.code.ts"
import {
  SPAWNTIME_DEFAULT,
  SPAWNTIME_EVENT,
} from "../next-boss-constants/next-boss-constants.module.code.ts"
import { ICT } from "../next-boss-state/next-boss-state.module.code.ts"

function respawnFor(this: void, district: string): number {
  return ICT.timetable[district] ?? 0
}

function nameForIndex(this: void, i: number): string {
  const id = ICT.datas[i]
  return id === undefined ? "" : GetString(id)
}

ICT.secondsToClock = function (this: void, sec: number): string {
  return string.format("%02d:%02d", Math.floor(sec / 60), sec % 60)
}

ICT.updateTimers = function (this: void): undefined {
  for (const [boss, lastSeen] of Object.entries(ICT.fallbackTimes)) {
    if (lastSeen > 0) {
      ICT.fallbackTimes[boss] = lastSeen - 1
    }
  }

  let districtString = ""
  let timerString = ""
  let color = ""

  let highestIndex = ICT.savedVariables.ccw_cw === true ? 1 : 6
  let highestValue = 0
  for (let i = 1; i <= 6; i++) {
    const remaining = respawnFor(nameForIndex(i)) - GetTimeStamp()
    if (remaining > highestValue) {
      highestIndex = i
      highestValue = remaining
    }
  }

  const districtMolag = nameForIndex(0)
  let remainingMolag = respawnFor(districtMolag) - GetTimeStamp()
  if (remainingMolag > 0) {
    color = RED
    if (ICT.savedVariables.chatdebug === true && respawnFor(districtMolag) === 0) {
      d(`${districtMolag} is up again.`)
    }
  } else {
    color = GREEN
    remainingMolag = 0
  }

  districtString = `${districtString}${color}${districtMolag}${RESET}\n`
  timerString = `${timerString}${ICT.secondsToClock(remainingMolag)}\n`

  if (ICT.savedVariables.maptimers === true) {
    const label = ICT.ui.districts[districtMolag]
    if (label !== undefined) {
      label.SetText(color + ICT.secondsToClock(remainingMolag))
    }
  }

  let modifier = 1
  let endpoint = 5
  let nextdistrict = ICT.nextcw[highestIndex] ?? -1
  if (ICT.savedVariables.ccw_cw === true) {
    modifier = -1
    endpoint = -5
    nextdistrict = ICT.nextccw[highestIndex] ?? -1
  }

  const start = nextdistrict + 6
  const stop = start + endpoint
  for (let i = start; modifier === 1 ? i <= stop : i >= stop; i += modifier) {
    const district = nameForIndex(i)
    let remaining = respawnFor(district) - GetTimeStamp()
    if (remaining > 0) {
      color = RED
      if (ICT.savedVariables.chatdebug === true && respawnFor(district) === 0) {
        d(`${district} is up again.`)
      }
    } else {
      color = GREEN
      remaining = 0
    }

    districtString = `${districtString}${color}${district}${RESET}\n`
    timerString = `${timerString}${ICT.secondsToClock(remaining)}\n`

    if (ICT.savedVariables.maptimers === true) {
      const label = ICT.ui.districts[district]
      if (label !== undefined) {
        label.SetText(color + ICT.secondsToClock(remaining))
      }
    }

    ICT.saveTimers()
  }

  if (ICT.savedVariables.timetable === true) {
    ICTDistricLabel.SetText(districtString)
    ICTTimerLabel.SetText(timerString)
  }

  return undefined
}

ICT.unitDead = function (this: void, unitName: string | undefined): undefined {
  if (unitName === undefined) {
    return undefined
  }
  const district = ICT.locations[unitName]
  if (district !== undefined) {
    if (unitName === GetString(SI_ICTHENEXTBOSS_MOLAG)) {
      ICT.startTimer(district, ICT.spawntimeMolag, true)
    } else {
      ICT.startTimer(district, ICT.spawntime, true)
    }
    ICT.fallbackTimes[unitName] = 0
    if (ICT.savedVariables.chatdebug === true) {
      d(`${unitName} died. (in the last ${ICT.fallbackMaxTime}s)`)
    }
  }
  return undefined
}

ICT.saveTimers = function (this: void): undefined {
  for (let i = 0; i <= 6; i++) {
    const district = nameForIndex(i)
    ICT.savedVariables.saved_timers[district] = respawnFor(district)
    ICT.savedVariables.saved_timers.data = GetCurrentCampaignId()
  }
  return undefined
}

ICT.restoreTimers = function (this: void): undefined {
  if (ICT.savedVariables.saved_timers.data === GetCurrentCampaignId()) {
    for (let i = 0; i <= 6; i++) {
      const district = nameForIndex(i)
      const respawn = ICT.savedVariables.saved_timers[district]
      if (respawn !== undefined) {
        if (respawn > GetTimeStamp()) {
          ICT.timetable[district] = respawn
        }
      }
    }
  }
  return undefined
}

ICT.resetTimers = function (this: void): undefined {
  if (ICT.savedVariables.saved_timers.data !== GetCurrentCampaignId()) {
    for (let i = 0; i <= 6; i++) {
      ICT.timetable[nameForIndex(i)] = 0
    }
  }
  return undefined
}

ICT.markDistrict = function (this: void, districtId: number): undefined {
  const district = ICT.datas[districtId]
  if (district === undefined) {
    return undefined
  }
  ICT.markDead(district)
  return undefined
}

ICT.getDistrictId = function (this: void, district: string): number {
  let districtId = 0
  for (let index = 0; index <= 6; index++) {
    if (district === nameForIndex(index)) {
      districtId = index
    }
  }
  return districtId
}

ICT.markDead = function (this: void, districtStringId: number): undefined {
  const district = GetString(districtStringId)
  d(district)
  if (ICT.timetable[district] !== undefined) {
    if (districtStringId === SI_ICTHENEXTBOSS_CAN) {
      ICT.startTimer(district, ICT.spawntimeMolag, false)
    } else {
      ICT.startTimer(district, ICT.spawntime, false)
    }
  }
  return undefined
}

ICT.startTimer = function (
  this: void,
  district: string,
  spawntime: number,
  share: boolean
): undefined {
  if (share === true) {
    ICT.shareCode(ICT.getDistrictId(district) * 123456 + 123456)
  }
  ICT.timetable[district] = GetTimeStamp() + spawntime
  return undefined
}

ICT.editSpawnTime = function (this: void): undefined {
  ICT.spawntime = ICT.savedVariables.eventtimers === true ? SPAWNTIME_EVENT : SPAWNTIME_DEFAULT
  return undefined
}

ICT.switchDirection = function (this: void): undefined {
  ICT.savedVariables.ccw_cw = !ICT.savedVariables.ccw_cw
  return undefined
}
