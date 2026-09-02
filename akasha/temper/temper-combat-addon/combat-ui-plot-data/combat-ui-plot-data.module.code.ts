import type { CoreLogLine, DamageCategory } from "@akasha/temper-combat-addon/combat-core-types"
import {
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type { PlotData, XYPoint } from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { YAXIS_LEFT, YAXIS_RIGHT } from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { getFightData } from "@akasha/temper-combat-addon/combat-ui-state"

type GraphData = Record<number, number | undefined>

function getGraphData(category: DamageCategory | undefined):
  | {
      data: GraphData
      category: DamageCategory
    }
  | undefined {
  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const calcData = assert(fightData.calculated)

  const resolved = category ?? getDb().FightReport.category

  const graph: Record<DamageCategory, GraphData> | undefined = calcData.graph
  const data = graph != null ? graph[resolved] : undefined

  if (data == null) {
    return undefined
  }

  return { data, category: resolved }
}

export function smooth(this: void, category?: DamageCategory): PlotData | undefined {
  const fightData = getFightData()
  const graph = getGraphData(category)
  if (fightData == null || graph == null) {
    return undefined
  }
  const data = graph.data

  const totaltime = fightData.combattime

  const smoothWindow = getDb().FightReport.SmoothWindow

  const xyData: XYPoint[] = []

  const t2 = zo_ceil(totaltime) - smoothWindow

  for (let t = 0; t <= t2; t++) {
    let sum = 0

    for (let i = 0; i <= smoothWindow - 1; i++) {
      sum = sum + (data[t + i] ?? 0)
    }

    const x = t + smoothWindow / 2

    const y = sum / smoothWindow

    if (t === 0) {
      table.insert(xyData, [0, y])
    }

    table.insert(xyData, [x, y])

    if (t === t2) {
      table.insert(xyData, [totaltime, y])
    }
  }

  return { xyData, yAxisSide: YAXIS_LEFT, absoluteYRange: 1 }
}

export function total(this: void, category?: DamageCategory): PlotData | undefined {
  const fightData = getFightData()
  const graph = getGraphData(category)
  if (fightData == null || graph == null) {
    return undefined
  }
  const data = graph.data

  const xyData: XYPoint[] = []

  const t2 = zo_ceil(fightData.combattime)

  let sum = 0

  let t0: number
  let tmax: number

  const combatstart = fightData.combatstart ?? fightData.dpsstart ?? fightData.hpsstart ?? 0
  const dpsstart = fightData.dpsstart ?? combatstart
  const dpsend = fightData.dpsend ?? combatstart + 1
  const hpsstart = fightData.hpsstart ?? combatstart
  const hpsend = fightData.hpsend ?? combatstart + 1

  if (graph.category === "healingOut" || graph.category === "healingIn") {
    t0 = (hpsstart - combatstart) / 1000
    tmax = (hpsend - combatstart) / 1000
  } else {
    t0 = (dpsstart - combatstart) / 1000
    tmax = (dpsend - combatstart) / 1000
  }

  const startpoint = zo_max(getDb().FightReport.SmoothWindow / 2, t0)

  for (let t = 0; t <= t2; t++) {
    sum = sum + (data[t] ?? 0)

    if (t >= startpoint && t <= zo_ceil(tmax)) {
      const x = t

      const y = sum / (zo_min(tmax, t) - t0)

      table.insert(xyData, [x, y])
    }
  }

  return { xyData, yAxisSide: YAXIS_LEFT, absoluteYRange: 1 }
}

export function absolute(this: void, category?: DamageCategory): PlotData | undefined {
  const fightData = getFightData()
  const graph = getGraphData(category)
  if (fightData == null || graph == null) {
    return undefined
  }
  const data = graph.data

  const xyData: XYPoint[] = []

  const t2 = zo_ceil(fightData.combattime)

  let sum = 0

  for (let t = 0; t <= t2; t++) {
    sum = sum + (data[t] ?? 0)

    table.insert(xyData, [t, sum])
  }

  for (const point of xyData) {
    point[1] = point[1] / sum
  }

  return { xyData, yAxisSide: YAXIS_RIGHT, absoluteYRange: sum }
}

type Slot = number | string | undefined

type ResourceLogLine = [number, number, Slot, Slot, number, number?]

function isResourceLine(line: CoreLogLine): line is ResourceLogLine {
  return line[0] === LIBCOMBAT_EVENT_RESOURCES
}

type BossHPLogLine = [number, number, Slot, number, number]

function isBossHPLine(line: CoreLogLine): line is BossHPLogLine {
  return line[0] === LIBCOMBAT_EVENT_BOSSHP
}

type PerformanceLogLine = [number, number, ...(number | undefined)[]]

function isPerformanceLine(line: CoreLogLine, event: number): line is PerformanceLogLine {
  return line[0] === event
}

type PlayerStatsLogLine = [number, number, Slot, number, number]

function isPlayerStatsLine(line: CoreLogLine): line is PlayerStatsLogLine {
  return line[0] === LIBCOMBAT_EVENT_PLAYERSTATS
}

const POWER_TYPE_KEY_TABLE: Record<number, number> = {
  [COMBAT_MECHANIC_FLAGS_HEALTH]: LIBCOMBAT_STAT_MAXHEALTH,
  [COMBAT_MECHANIC_FLAGS_MAGICKA]: LIBCOMBAT_STAT_MAXMAGICKA,
  [COMBAT_MECHANIC_FLAGS_STAMINA]: LIBCOMBAT_STAT_MAXSTAMINA,
}

let OLD_X = 0
let oldY: number | undefined

export function updateXYData(xyData: XYPoint[], x: number, y: number): undefined {
  if (xyData.length === 0) {
    OLD_X = -1
    oldY = y
  }

  if (x - 1 > OLD_X && oldY != null && oldY !== y) {
    table.insert(xyData, [OLD_X + 1, oldY])
  }

  if (x - 2 > OLD_X && oldY != null) {
    table.insert(xyData, [x - 1, oldY])
  }

  if (x > OLD_X) {
    table.insert(xyData, [x, y])

    OLD_X = x
  }

  oldY = y
  return undefined
}

export function resourceAbsolute(this: void, powerType?: number): PlotData | undefined {
  const fightData = getFightData()
  if (powerType == null || fightData == null || fightData.log == null) {
    return undefined
  }

  const logData = fightData.log

  const combatstart = fightData.combatstart / 1000

  const xyData: XYPoint[] = []

  let value: number | undefined

  for (const lineData of logData) {
    if (isResourceLine(lineData) && lineData[4] === powerType) {
      const powerValue = lineData[5]
      if (powerValue != null) {
        const deltatime = zo_floor(lineData[1] / 1000 - combatstart)

        value = powerValue

        updateXYData(xyData, deltatime, value)
      }
    }
  }

  if (value != null) {
    updateXYData(xyData, fightData.combattime, value)
  }

  const maxValue =
    powerType === COMBAT_MECHANIC_FLAGS_ULTIMATE
      ? 500
      : assert(assert(fightData.calculated).stats[assert(POWER_TYPE_KEY_TABLE[powerType])]).max

  for (const point of xyData) {
    point[1] = point[1] / maxValue
  }

  return { xyData, yAxisSide: YAXIS_RIGHT, absoluteYRange: maxValue }
}

export function bossHPAbsolute(this: void): PlotData | undefined {
  const fightData = getFightData()
  if (fightData == null || fightData.log == null) {
    return undefined
  }

  const combatstart = fightData.combatstart / 1000

  const xyData: XYPoint[] = []

  let x = -1

  for (const lineData of fightData.log) {
    if (isBossHPLine(lineData)) {
      const deltatime = zo_floor(lineData[1] / 1000 - combatstart)

      if (deltatime > x) {
        x = deltatime

        const y = lineData[3] / lineData[4]

        table.insert(xyData, [x, y])
      }
    }
  }

  return { xyData, yAxisSide: YAXIS_RIGHT, absoluteYRange: 0 }
}

export function performancePlot(this: void, dataType?: number): PlotData | undefined {
  const fightData = getFightData()
  if (fightData == null || fightData.log == null || dataType == null) {
    return undefined
  }

  const combatstart = fightData.combatstart / 1000

  const xyData: XYPoint[] = []

  let x = -1

  const event = dataType === 7 ? LIBCOMBAT_EVENT_SKILL_TIMINGS : LIBCOMBAT_EVENT_PERFORMANCE
  const key = dataType === 7 ? 6 : dataType

  for (const lineData of fightData.log) {
    if (!isPerformanceLine(lineData, event)) {
      continue
    }

    const value = lineData[key - 1]
    if (value != null) {
      const deltatime = lineData[1] / 1000 - combatstart

      const isSkill = dataType !== 7 || assert(lineData[2]) % 10 > 2

      if (deltatime > x && isSkill) {
        x = deltatime

        table.insert(xyData, [x, value])
      }
    }
  }

  return { xyData, yAxisSide: YAXIS_LEFT, absoluteYRange: 1 }
}

export function statAbsolute(this: void, statId?: number): PlotData | undefined {
  const fightData = getFightData()
  if (fightData == null || fightData.log == null || statId == null) {
    return undefined
  }

  const combatstart = fightData.combatstart / 1000

  const xyData: XYPoint[] = []

  let maxvalue = 0

  let value: number | undefined

  for (const lineData of fightData.log) {
    if (isPlayerStatsLine(lineData) && lineData[4] === statId) {
      value = lineData[3]

      maxvalue = zo_max(value, maxvalue)

      const deltatime = zo_floor(lineData[1] / 1000 - combatstart)

      updateXYData(xyData, deltatime, value)
    }
  }

  updateXYData(xyData, fightData.combattime, assert(value))

  for (const point of xyData) {
    point[1] = point[1] / maxvalue
  }

  return { xyData, yAxisSide: YAXIS_RIGHT, absoluteYRange: maxvalue }
}
