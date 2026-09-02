import type { Dungeon } from "../dungeon-registry/dungeon-registry.module.code.ts"
import { getEsoResetTimestampSec } from "../eso-reset/eso-reset.module.code.ts"

export interface QuestGiver {
  id: string
  name: string
  epoch: string
  cycleLength: number
}

export interface TodaysPledge {
  giverName: string
  dungeonKey: string
  dungeonLabel: string
}

const SECONDS_PER_DAY = 86_400

function esoDayNumber(nowSec: number): number {
  return Math.floor(getEsoResetTimestampSec(nowSec) / SECONDS_PER_DAY)
}

function epochDayNumber(epochDate: string): number {
  const parts = epochDate.split("-")
  const [yearStr, monthStr, dayStr] = parts
  if (yearStr === undefined || monthStr === undefined || dayStr === undefined) {
    throw new Error(`epochDayNumber: expected YYYY-MM-DD, got ${epochDate}`)
  }
  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)
  const yAdj = month <= 2 ? year - 1 : year
  const era = Math.floor(yAdj / 400)
  const yoe = yAdj - era * 400
  const monthIndex = month > 2 ? month - 3 : month + 9
  const doy = Math.floor((153 * monthIndex + 2) / 5) + day - 1
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy
  return era * 146097 + doe - 719468
}

export function getTodaysPledges(
  dungeons: readonly Dungeon[],
  givers: readonly QuestGiver[],
  nowSec: number
): readonly TodaysPledge[] {
  const currentDay = esoDayNumber(nowSec)

  return givers.map((giver) => {
    const daysSinceEpoch = currentDay - epochDayNumber(giver.epoch)
    const cycleLength = giver.cycleLength
    const index = ((daysSinceEpoch % cycleLength) + cycleLength) % cycleLength
    const slot = dungeons.find((d) => d.questGiverId === giver.id && d.rotationPosition === index)
    if (!slot) {
      throw new Error(
        `getTodaysPledges: ${giver.name} rotation has no dungeon at position ${index}`
      )
    }
    return {
      giverName: giver.name,
      dungeonKey: slot.key,
      dungeonLabel: slot.label,
    }
  })
}
