import type { CoreLogLine } from "@akasha/temper-combat-addon/combat-core-types"
import {
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type { BuffBarEntry } from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { getFightData, getSelections } from "@akasha/temper-combat-addon/combat-ui-state"

type EffectLogLine = [
  event: number,
  timems: number,
  unitId: number,
  abilityId: number | undefined,
  changeType: number,
  slot6: number | string | undefined,
  slot7: number | string | undefined,
  slot8: number | string | undefined,
  effectSlot: number,
]

function isEffectLine(line: CoreLogLine): line is EffectLogLine {
  const event = line[0]
  return (
    event === LIBCOMBAT_EVENT_EFFECTS_IN ||
    event === LIBCOMBAT_EVENT_EFFECTS_OUT ||
    event === LIBCOMBAT_EVENT_GROUPEFFECTS_IN ||
    event === LIBCOMBAT_EVENT_GROUPEFFECTS_OUT
  )
}

export function acquireBuffData(buffName: string): BuffBarEntry[] | undefined {
  const fightData = getFightData()
  if (fightData == null || fightData.log == null) {
    return undefined
  }

  const db = getDb()
  const rightpanel = db.FightReport.rightpanel

  const category = db.FightReport.category

  const selections = getSelections()
  const unitselections: Record<number, unknown> | undefined =
    rightpanel === "buffs" ? { [assert(fightData.playerid)]: 1 } : selections.unit[category]

  const logData = fightData.log

  const combatstart = fightData.combatstart / 1000
  const combattime = fightData.combattime

  const timeData: BuffBarEntry[] = []

  let first = true
  let lastSlot: number | undefined
  let lastUnit: number | undefined

  const slots: Record<number, number | undefined> = {}

  const showGroupBuffs = db.FightReport.ShowGroupBuffsInPlots

  for (const lineData of logData) {
    if (!isEffectLine(lineData)) {
      continue
    }

    const [result, timems, unitId, abilityId, changeType] = lineData
    const effectSlot = lineData[8]

    const isResult = result === LIBCOMBAT_EVENT_EFFECTS_IN || result === LIBCOMBAT_EVENT_EFFECTS_OUT
    const isGroupResult =
      showGroupBuffs &&
      (result === LIBCOMBAT_EVENT_GROUPEFFECTS_IN || result === LIBCOMBAT_EVENT_GROUPEFFECTS_OUT)

    if (
      (isResult || isGroupResult) &&
      getFormattedAbilityName(abilityId) === buffName &&
      ((unitselections != null && unitselections[unitId] != null) || unitselections == null)
    ) {
      const deltatime = timems / 1000 - combatstart

      if (changeType === EFFECT_RESULT_GAINED && deltatime < combattime) {
        slots[effectSlot] = deltatime
        first = false
        lastSlot = effectSlot
        lastUnit = unitId
      } else if (changeType === EFFECT_RESULT_FADED) {
        const starttime = first ? 0 : slots[effectSlot]

        if (starttime != null && deltatime > starttime && deltatime > 0) {
          const previoustimes = timeData[timeData.length - 1]

          if (
            previoustimes != null &&
            zo_abs(starttime - previoustimes[1]) < 0.02 &&
            previoustimes[2] === unitId
          ) {
            previoustimes[1] = deltatime
          } else {
            table.insert(timeData, [starttime, deltatime, unitId])
          }
        }

        lastSlot = undefined
      }
    }
  }

  if (lastSlot != null) {
    const calculated = assert(fightData.calculated)
    const unittime = assert(calculated.units[assert(lastUnit)]).endtime
    const endtime = unittime != null ? unittime / 1000 - combatstart : fightData.combattime

    const startedAt = assert(slots[lastSlot])
    if (startedAt < endtime) {
      table.insert(timeData, [startedAt, endtime])
    }
  }

  return timeData
}
