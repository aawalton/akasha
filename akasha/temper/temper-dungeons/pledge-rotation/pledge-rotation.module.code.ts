import { diffEsoDays, getEsoDayStr } from "@akasha/day/eso-day"
import type { Dungeon } from "../dungeon-registry/dungeon-registry.module.code.ts"

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

export function getTodaysPledges(
  dungeons: readonly Dungeon[],
  givers: readonly QuestGiver[],
  nowSec: number
): readonly TodaysPledge[] {
  const today = getEsoDayStr(new Date(nowSec * 1000))

  return givers.map((giver) => {
    const daysSinceEpoch = diffEsoDays(today, giver.epoch)
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
