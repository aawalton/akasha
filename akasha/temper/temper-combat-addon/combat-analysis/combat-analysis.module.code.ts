import {
  basicTable,
  CATEGORY_LIST,
  type CategoryKey,
  sumUnitTables,
} from "@akasha/temper-combat-addon/combat-categories"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type { CmxFight, CoreLogLine } from "@akasha/temper-combat-addon/combat-core-types"
import { TRIAL_DUMMY_BUFFS } from "@akasha/temper-combat-addon/combat-data-tables"
import {
  acquireBarStats,
  getCalculated,
  getEmptyFightStats,
  setCurrentBar,
} from "@akasha/temper-combat-addon/combat-fight-model"
import {
  finalizeBarData,
  finalizePerformanceData,
  finalizeResourceStats,
  finalizeSkillTimings,
  finalizeStats,
} from "@akasha/temper-combat-addon/combat-finalize"
import { finalizeUnitBuffs } from "@akasha/temper-combat-addon/combat-finalize-buffs"
import {
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_QUICKSLOT,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  processLogDamage,
  processLogHeal,
  processLogHealSelf,
} from "@akasha/temper-combat-addon/combat-process-log-damage"
import {
  processLogEffects,
  processLogResources,
  processLogStats,
} from "@akasha/temper-combat-addon/combat-process-log-effects"
import {
  processBossHp,
  processLogSkillTimings,
  processMessages,
  processPerformanceStats,
  processQuickslotEvents,
} from "@akasha/temper-combat-addon/combat-process-log-timings"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"

const DESIRED_TIME = 0.01
const STEP_SIZE = 20

const CHUNK_UPDATE_NAMESPACE = "TemperCombat_chunk"

const PROCESS_LOG: Record<number, (fight: CmxFight, logline: CoreLogLine) => undefined> = {
  [LIBCOMBAT_EVENT_DAMAGE_OUT]: processLogDamage,
  [LIBCOMBAT_EVENT_DAMAGE_IN]: processLogDamage,
  [LIBCOMBAT_EVENT_DAMAGE_SELF]: processLogDamage,
  [LIBCOMBAT_EVENT_HEAL_OUT]: processLogHeal,
  [LIBCOMBAT_EVENT_HEAL_IN]: processLogHeal,
  [LIBCOMBAT_EVENT_HEAL_SELF]: processLogHealSelf,
  [LIBCOMBAT_EVENT_EFFECTS_IN]: processLogEffects,
  [LIBCOMBAT_EVENT_EFFECTS_OUT]: processLogEffects,
  [LIBCOMBAT_EVENT_GROUPEFFECTS_IN]: processLogEffects,
  [LIBCOMBAT_EVENT_GROUPEFFECTS_OUT]: processLogEffects,
  [LIBCOMBAT_EVENT_RESOURCES]: processLogResources,
  [LIBCOMBAT_EVENT_PLAYERSTATS]: processLogStats,
  [LIBCOMBAT_EVENT_SKILL_TIMINGS]: processLogSkillTimings,
  [LIBCOMBAT_EVENT_MESSAGES]: processMessages,
  [LIBCOMBAT_EVENT_BOSSHP]: processBossHp,
  [LIBCOMBAT_EVENT_PERFORMANCE]: processPerformanceStats,
  [LIBCOMBAT_EVENT_QUICKSLOT]: processQuickslotEvents,
}

function initTrialDummies(fight: CmxFight): undefined {
  for (const [unitId, unit] of pairs(fight.units)) {
    if (unit.isTrialDummy === true) {
      for (const [abilityId] of pairs(TRIAL_DUMMY_BUFFS)) {
        const fakeLogLine: CoreLogLine = [
          LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
          fight.combatstart,
          unitId,
          abilityId,
          EFFECT_RESULT_GAINED,
          BUFF_EFFECT_TYPE_DEBUFF,
          0,
          COMBAT_UNIT_TYPE_TARGET_DUMMY,
          0,
        ]
        processLogEffects(fight, fakeLogLine)
      }
    }
  }
  return undefined
}

export function calculateFight(fight: CmxFight): undefined {
  fight.cindex = 0
  fight.calculated = getEmptyFightStats()

  const data = fight.calculated

  const startBar = fight.startBar
  if (startBar === undefined) {
    error("fight startBar missing in calculation")
  }
  setCurrentBar(startBar)
  const barStats = acquireBarStats(fight, startBar)
  barStats.onTimes = fight.dpsstart != null ? [fight.dpsstart] : []

  data.groupDamageOut = fight.groupDamageOut
  data.groupDamageIn = fight.groupDamageIn
  data.groupDPSOut = fight.groupDPSOut
  data.groupHPSOut = fight.groupHPSOut
  data.groupHPSIn = fight.groupHPSIn
  data.groupDPSIn = fight.groupDPSIn

  fight.calculating = true
  const cpData = fight.CP
  const greenDiscipline = cpData !== undefined ? cpData[1] : undefined
  fight.special["wrathCP"] =
    greenDiscipline !== undefined ? greenDiscipline.slotted[276] : undefined

  const titleBar = TemperCombat_Report_TitleFightTitleBar
  titleBar.SetValue(0)
  titleBar.SetHidden(false)

  initTrialDummies(fight)
  calculateChunk(fight)
  return undefined
}

export function accumulateStats(fight: CmxFight): undefined {
  const data = getCalculated(fight)

  for (const [, unit] of pairs(data.units)) {
    for (const [tablekey, list] of pairs(CATEGORY_LIST)) {
      const abilities = unit[tablekey]

      for (const [, ability] of pairs(abilities)) {
        const get = (key: CategoryKey): number => ability[key] ?? 0

        if (tablekey === "damageOut") {
          ability["damageOutTotal"] =
            get("damageOutNormal") + get("damageOutCritical") + get("damageOutBlocked")
          ability["hitsOutTotal"] =
            get("hitsOutNormal") + get("hitsOutCritical") + get("hitsOutBlocked")
          ability["DPSOut"] = get("damageOutTotal") / fight.dpstime
        } else if (tablekey === "damageIn") {
          ability["damageInTotal"] =
            get("damageInNormal") + get("damageInCritical") + get("damageInBlocked")
          ability["hitsInTotal"] =
            get("hitsInNormal") + get("hitsInCritical") + get("hitsInBlocked")
          ability["DPSIn"] = get("damageInTotal") / fight.dpstime
        } else if (tablekey === "healingOut") {
          ability["healingOutTotal"] = get("healingOutNormal") + get("healingOutCritical")
          ability["healsOutTotal"] = get("healsOutNormal") + get("healsOutCritical")
          ability["healingOutAbsolute"] = get("healingOutTotal") + get("healingOutOverflow")
          ability["healsOutAbsolute"] = get("healsOutTotal") + get("healsOutOverflow")
          ability["HPSOut"] = get("healingOutTotal") / fight.hpstime
          ability["HPSAOut"] = get("healingOutAbsolute") / fight.hpstime
        } else if (tablekey === "healingIn") {
          ability["healingInTotal"] = get("healingInNormal") + get("healingInCritical")
          ability["healsInTotal"] = get("healsInNormal") + get("healsInCritical")
          ability["healingInAbsolute"] = get("healingInTotal") + get("healingInOverflow")
          ability["healsInAbsolute"] = get("healsInTotal") + get("healsInOverflow")
          ability["HPSIn"] = get("healingInTotal") / fight.hpstime
        }

        for (const [, key] of ipairs(list)) {
          unit[key] = (unit[key] ?? 0) + get(key)
        }
      }
    }

    sumUnitTables(data, unit, basicTable)
  }
  return undefined
}

export function finalize(fight: CmxFight): undefined {
  log("calc", LOG_LEVEL_DEBUG, "Start end routine")
  const scalcms = GetGameTimeSeconds()
  TemperCombat_Report_TitleFightTitleName.SetText(GetString(SI_TEMPER_COMBAT_FINALIZING))

  const data = getCalculated(fight)

  finalizeUnitBuffs(fight)
  accumulateStats(fight)
  finalizeResourceStats(fight)
  finalizeStats(fight)
  finalizeSkillTimings(fight)
  finalizeBarData(fight)
  finalizePerformanceData(fight)

  const playerid = fight.playerid
  const playerUnit = playerid != null ? data.units[playerid] : undefined
  data.buffs = playerUnit !== undefined ? playerUnit.buffs : {}

  fight.calculating = false
  fight.cindex = undefined
  data.temp = undefined

  TemperCombat_Report_TitleFightTitleBar.SetHidden(true)
  log(
    "calc",
    LOG_LEVEL_DEBUG,
    "Time for final calculations: %.2f ms",
    (GetGameTimeSeconds() - scalcms) * 1000
  )
  return undefined
}

export function calculateChunk(fight: CmxFight): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CHUNK_UPDATE_NAMESPACE)

  const db = getDb()
  const scalcms = GetGameTimeSeconds()
  const logdata = fight.log
  const istart = fight.cindex ?? 0
  const iend = zo_min(istart + db.chunksize, logdata.length)

  for (let i = istart; i < iend; i++) {
    const logline = logdata[i]
    if (logline === undefined) {
      continue
    }
    const logType = logline[0]

    const handler = typeof logType === "number" ? PROCESS_LOG[logType] : undefined
    if (handler !== undefined) {
      handler(fight, logline)
    }
  }

  const titleBar = TemperCombat_Report_TitleFightTitleBar
  const fightlabel = TemperCombat_Report_TitleFightTitleName

  if (iend >= logdata.length) {
    return finalize(fight)
  }
  fight.cindex = iend
  EVENT_MANAGER.RegisterForUpdate(CHUNK_UPDATE_NAMESPACE, 20, () => {
    calculateChunk(fight)
  })

  const chunktime = GetGameTimeSeconds() - scalcms
  const newchunksize = zo_min(
    zo_ceil(((DESIRED_TIME / zo_max(chunktime, 0.001)) * db.chunksize) / STEP_SIZE) * STEP_SIZE,
    20000
  )
  log(
    "calc",
    LOG_LEVEL_DEBUG,
    "Chunk calculation time: %.2f ms, new chunk size: %d",
    chunktime * 1000,
    newchunksize
  )

  db.chunksize = newchunksize
  const progress = iend / logdata.length
  fightlabel.SetText(string.format("%s (%.1f%%)", GetString(SI_TEMPER_COMBAT_CALC), 100 * progress))

  titleBar.SetValue(progress)
  return undefined
}
