import { getCurrentData } from "@akasha/temper-combat-addon/combat-core-events"
import type { CmxFight, CurrentData } from "@akasha/temper-combat-addon/combat-core-types"
import type { UnitEntry } from "@akasha/temper-combat-addon/combat-lib-types"
import { LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import { optionalNumberValue } from "@akasha/temper-combat-addon/combat-ui-stats-panels"

export type ChatReportData = (CurrentData & { units: Record<number, UnitEntry> }) | CmxFight

function hasUnitRegistry(
  this: void,
  data: CurrentData
): data is CurrentData & { units: Record<number, UnitEntry> } {
  return data.units != null
}

export function getCurrentReportData(): ChatReportData | undefined {
  const data = getCurrentData()

  if (hasUnitRegistry(data)) {
    return data
  }
  if (LAST_FIGHTS.length === 0) {
    return undefined
  }
  return LAST_FIGHTS[LAST_FIGHTS.length - 1]
}

export function getSingleTargetDamage(
  data: ChatReportData
): LuaMultiReturn<[damage: number, groupDamage: number, name: string, unittime: number]> {
  let damage = 0
  let groupDamage = 0
  let unittime = 0
  let name = ""

  for (const [, unit] of pairs(data.units)) {
    const totalUnitDamage = unit.damageOutTotal

    if (totalUnitDamage > 0 && unit.isFriendly === false && totalUnitDamage > damage) {
      name = unit.name
      damage = totalUnitDamage
      groupDamage = unit.groupDamageOut
      unittime = (unit.dpsend ?? 0) - (unit.dpsstart ?? 0)
    }
  }

  unittime = unittime > 0 ? unittime / 1000 : data.dpstime
  groupDamage = zo_max(damage, groupDamage)

  return $multi(damage, groupDamage, name, unittime)
}

export function getBossTargetDamage(
  data: ChatReportData
): LuaMultiReturn<
  [
    bossUnits: number,
    totalBossDamage: number,
    totalBossGroupDamage: number,
    bossName: string | undefined,
    bossTime: number,
  ]
> {
  if (data.bossfight !== true) {
    return $multi(0, 0, 0, undefined, 0)
  }

  let totalBossDamage = 0
  let bossDamage = 0
  let bossUnits = 0
  let totalBossGroupDamage = 0
  let bossName: string | undefined
  let starttime: number | undefined
  let endtime: number | undefined

  for (const [, unit] of pairs(data.units)) {
    const totalUnitDamage = unit.damageOutTotal

    if (unit.bossId != null && totalUnitDamage > 0) {
      totalBossDamage = totalBossDamage + totalUnitDamage
      totalBossGroupDamage = totalBossGroupDamage + unit.groupDamageOut
      bossUnits = bossUnits + 1

      starttime = zo_min(starttime ?? unit.dpsstart ?? 0, unit.dpsstart ?? 0)
      endtime = zo_max(endtime ?? unit.dpsend ?? 0, unit.dpsend ?? 0)

      if (totalUnitDamage > bossDamage) {
        bossName = unit.name
        bossDamage = totalUnitDamage
      }
    }
  }

  if (bossUnits === 0 || starttime == null || endtime == null) {
    return $multi(0, 0, 0, undefined, 0)
  }

  let bossTime = (endtime - starttime) / 1000
  bossTime = bossTime > 0 ? bossTime : data.dpstime

  return $multi(bossUnits, totalBossDamage, totalBossGroupDamage, bossName, bossTime)
}

export function getSelectionDamage(
  data: ChatReportData,
  selection: Record<number, unknown> | undefined
): LuaMultiReturn<[units: number, damage: number, bossName: string, damageTime: number]> {
  let units = 0
  let damage = 0
  let starttime: number | undefined
  let endtime: number | undefined
  let bossDamage = 0
  let bossName = ""

  const unitdata = data.units
  const resolvedSelection = selection ?? unitdata

  for (const [unitId] of pairs(resolvedSelection)) {
    const unit = unitdata[unitId]
    if (unit == null) {
      continue
    }
    const totalUnitDamage = unit.damageOutTotal

    if (totalUnitDamage > 0 && unit.isFriendly === false) {
      units = units + 1
      damage = damage + totalUnitDamage
      starttime =
        unit.dpsstart != null ? zo_min(starttime ?? unit.dpsstart, unit.dpsstart) : starttime
      endtime = unit.dpsend != null ? zo_max(endtime ?? unit.dpsend, unit.dpsend) : endtime

      if (totalUnitDamage > bossDamage) {
        bossName = unit.name
        bossDamage = totalUnitDamage
      }
    }
  }

  let damageTime = starttime != null && endtime != null ? (endtime - starttime) / 1000 : 0
  damageTime = damageTime > 0 ? damageTime : data.dpstime

  return $multi(units, damage, bossName, damageTime)
}

interface HealTimedUnitEntry extends UnitEntry {
  hpsstart?: number
  hpsend?: number
}

export function getSelectionHeal(
  data: ChatReportData,
  selection: Record<number, unknown> | undefined
): LuaMultiReturn<
  [units: number | undefined, healing: number | undefined, healTime: number | undefined]
> {
  let units = 0
  let healing = 0
  let starttime: number | undefined
  let endtime: number | undefined

  const unitdata = data.units
  const resolvedSelection = selection ?? unitdata
  const calcdata = "calculated" in data ? data.calculated?.units : undefined

  if (calcdata == null) {
    return $multi(undefined, undefined, undefined)
  }

  for (const [unitId] of pairs(resolvedSelection)) {
    const unit: HealTimedUnitEntry | undefined = unitdata[unitId]
    if (unit == null) {
      continue
    }
    const totalUnitHeal = optionalNumberValue(calcdata[unitId]?.["healingOutTotal"])

    if (totalUnitHeal != null && unit.isFriendly === true) {
      units = units + 1
      healing = healing + totalUnitHeal
      starttime = zo_min(starttime ?? unit.hpsstart ?? 0, unit.hpsstart ?? 0)
      endtime = zo_max(endtime ?? unit.hpsend ?? 0, unit.hpsend ?? 0)
    }
  }

  if (starttime == null || endtime == null) {
    return $multi(undefined, undefined, undefined)
  }

  let healTime = (endtime - starttime) / 1000
  healTime = healTime > 0 ? healTime : data.dpstime

  return $multi(units, healing, healTime)
}

export function getUnitsByName(data: ChatReportData, unitId: number): Record<number, boolean> {
  const selectedUnits: Record<number, boolean> = {}

  const units = data.units
  const unitName = units[unitId]?.name

  for (const [id, unit] of pairs(units)) {
    if (unit.name === unitName) {
      selectedUnits[id] = true
    }
  }

  return selectedUnits
}

export function getTimedataPrefix(data: ChatReportData): string {
  if (data === getCurrentReportData()) {
    return ""
  }

  const date = "date" in data ? data.date : undefined
  const time = "time" in data ? data.time : undefined

  const datestring = typeof date === "number" ? GetDateStringFromTimestamp(date) : date
  return string.format("[%s, %s] ", datestring, time)
}
