import {
  filterAchievements,
  soleValue,
} from "akasha/temper/addon/pages/characters/modules/pithka-achievements/pithka-achievements.module.code.ts"
import { savedVarsDb } from "akasha/temper/addon/pages/characters/modules/pithka-saved-vars/pithka-saved-vars.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-16/eso-enums-16.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

const RAID_CATEGORY = 0

const CALLBACKS: ((this: void) => undefined)[] = []

export function registerScoresCallback(this: void, fn: (this: void) => undefined): undefined {
  CALLBACKS.push(fn)
}

function maxValue(this: void, values: Record<string, number | undefined>): number {
  let max = 0
  for (const key in values) {
    const numeric = tonumber(values[key])
    if (numeric !== undefined && numeric > max) max = numeric
  }
  return max
}

function scoresOf(this: void, abbv: string): Record<string, number | undefined> | undefined {
  return savedVarsDb()?.scores[abbv]
}

export function highestScore(this: void, abbv: string): number {
  const scores = scoresOf(abbv)
  if (scores === undefined) return 0
  return maxValue(scores)
}

export function sortedScores(this: void, abbv: string): [string, number][] | undefined {
  const scores = scoresOf(abbv)
  if (scores === undefined) return undefined
  const names: string[] = []
  for (const name in scores) names.push(name)
  names.sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0))
  return names.map((name) => [name, scores[name] ?? 0])
}

function saveScore(this: void, newScore: number | undefined, abbv: string | undefined): undefined {
  const db = savedVarsDb()
  if (db === undefined) return
  if (newScore === undefined || newScore === 0) return
  if (abbv === undefined) return
  const name = GetUnitName("player")
  const scores = db.scores[abbv] ?? {}
  db.scores[abbv] = scores
  const saved = scores[name]
  if (saved === undefined || newScore > saved) {
    scores[name] = newScore
    for (const fn of CALLBACKS) fn()
  }
}

export function fetchTrials(this: void, nextFetch = 1): undefined {
  let lbMax = 0
  for (const row of filterAchievements({ TYPE: "trial" })) {
    if (row.LBINDEX !== undefined && row.LBINDEX > lbMax) lbMax = row.LBINDEX
  }
  if (nextFetch > lbMax) return
  QueryRaidLeaderboardData(RAID_CATEGORY, nextFetch)
}

export function fetchEndless(this: void): undefined {
  QueryEndlessDungeonLeaderboardData(ENDLESS_DUNGEON_GROUP_TYPE_SOLO, 0)
}

function onTrialScores(
  this: void,
  _event: number,
  _raidCategory: number,
  lbIndex: number
): undefined {
  const [, bestScore] = GetRaidLeaderboardLocalPlayerInfo(lbIndex)
  saveScore(bestScore, soleValue({ LBINDEX: lbIndex }, "ABBV"))
  fetchTrials(lbIndex + 1)
}

function saveEndlessScores(this: void, endlessDungeonId: number): undefined {
  const [, bestSolo] = GetEndlessDungeonLeaderboardLocalPlayerInfo(
    ENDLESS_DUNGEON_GROUP_TYPE_SOLO,
    endlessDungeonId
  )
  const [, bestDuo] = GetEndlessDungeonLeaderboardLocalPlayerInfo(
    ENDLESS_DUNGEON_GROUP_TYPE_DUO,
    endlessDungeonId
  )
  if (bestSolo > 0) saveScore(bestSolo, soleValue({ IAINDEX: 0 }, "ABBV"))
  if (bestDuo > 0) saveScore(bestDuo, soleValue({ IAINDEX: 1 }, "ABBV"))
}

function onEndlessScores(
  this: void,
  _event: number,
  groupType: number,
  endlessDungeonId: number
): undefined {
  saveEndlessScores(endlessDungeonId)
  if (groupType === ENDLESS_DUNGEON_GROUP_TYPE_SOLO) {
    QueryEndlessDungeonLeaderboardData(ENDLESS_DUNGEON_GROUP_TYPE_DUO, endlessDungeonId)
  }
}

export function registerScoreEvents(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent(
    "TemperCharactersPithkaScores",
    EVENT_RAID_LEADERBOARD_DATA_RECEIVED,
    onTrialScores
  )
  EVENT_MANAGER.RegisterForEvent(
    "TemperCharactersPithkaScores",
    EVENT_ENDLESS_DUNGEON_LEADERBOARD_DATA_RECEIVED,
    onEndlessScores
  )
}
