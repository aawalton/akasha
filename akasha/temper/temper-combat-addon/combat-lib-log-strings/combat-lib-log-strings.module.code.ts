import {
  LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  LIBCOMBAT_EVENT_DEATH,
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
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { isLogLine } from "@akasha/temper-combat-addon/combat-lib-log-lines"
import {
  type CombatLogLine,
  CRIT_FORMAT,
  type FormattedLogLine,
  formatBossHpLine,
  formatDeathLine,
  formatMessageLine,
  formatPerformanceLine,
  formatPlayerStatsLine,
  formatSkillTimingsLine,
  getAbilityString,
  getUnitName,
  type LogColor,
  UNIT_TYPE_STRING,
} from "@akasha/temper-combat-addon/combat-lib-log-strings-format"
import {
  getLogFormatString,
  STRING_CRITICAL,
  STRING_FORMAT_ABSORBED,
  STRING_FORMAT_HEALABSORB,
  STRING_FORMAT_TARGET_BLOCK,
  STRING_FORMAT_TARGET_NORMAL,
  STRING_FORMAT_TARGETSELF_BLOCK,
  STRING_FORMAT_TARGETSELF_NORMAL,
  STRING_FORMAT_TARGETSELF_SELF,
  STRING_GAINED,
  STRING_LOST,
  STRING_NOGAINED,
  STRING_ULTIMATE,
  STRING_YOU,
} from "@akasha/temper-combat-addon/combat-lib-log-strings-text"
import { getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import type { Fight } from "@akasha/temper-combat-addon/combat-lib-types"

export function getCombatLogString(
  fight: Fight | undefined,
  logline: CombatLogLine,
  fontsize: number,
  showIds: boolean
): FormattedLogLine {
  const fightRef = fight ?? getCurrentFight()

  if (!isLogLine(logline)) {
    return $multi(undefined, undefined)
  }

  const logtype = logline[0]

  let color: LogColor | undefined
  let text: string | undefined

  const timeValue = fightRef.combatstart < 0 ? 0 : (logline[1] - fightRef.combatstart) / 1000
  const timeString = string.format("|ccccccc[%.3fs]|r", timeValue)
  const logFormat = getLogFormatString(logtype)

  const units = fightRef.units

  if (logtype === LIBCOMBAT_EVENT_DAMAGE_OUT) {
    const result = logline[2]
    const targetUnitId = logline[4]
    const abilityId = logline[5]
    const hitValue = logline[6]
    const damageType = logline[7]
    const overflow = logline[8] ?? 0

    const crit =
      result === ACTION_RESULT_CRITICAL_DAMAGE || result === ACTION_RESULT_DOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const targetname = getUnitName(units, targetUnitId)
    const targetFormat =
      result === ACTION_RESULT_BLOCKED_DAMAGE
        ? STRING_FORMAT_TARGET_BLOCK
        : STRING_FORMAT_TARGET_NORMAL

    const targetString = ZO_CachedStrFormat(targetFormat, targetname)

    const ability = getAbilityString(abilityId, damageType, fontsize, showIds)

    const hitValueString =
      overflow > 0 ? ZO_CachedStrFormat(STRING_FORMAT_ABSORBED, hitValue, overflow) : hitValue

    color = [1.0, 0.6, 0.6]
    text = ZO_CachedStrFormat(logFormat, timeString, crit, targetString, ability, hitValueString)
  } else if (logtype === LIBCOMBAT_EVENT_DAMAGE_IN) {
    const result = logline[2]
    const sourceUnitId = logline[3]
    const abilityId = logline[5]
    const hitValue = logline[6]
    const damageType = logline[7]
    const overflow = logline[8] ?? 0

    const crit =
      result === ACTION_RESULT_CRITICAL_DAMAGE || result === ACTION_RESULT_DOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const sourceName = getUnitName(units, sourceUnitId)

    const targetString =
      result === ACTION_RESULT_BLOCKED_DAMAGE
        ? STRING_FORMAT_TARGETSELF_BLOCK
        : STRING_FORMAT_TARGETSELF_NORMAL

    const ability = getAbilityString(abilityId, damageType, fontsize, showIds)

    const hitValueString =
      overflow > 0 ? ZO_CachedStrFormat(STRING_FORMAT_ABSORBED, hitValue, overflow) : hitValue

    color = [0.8, 0.4, 0.4]

    text = ZO_CachedStrFormat(
      logFormat,
      timeString,
      sourceName,
      crit,
      targetString,
      ability,
      hitValueString
    )
  } else if (logtype === LIBCOMBAT_EVENT_DAMAGE_SELF) {
    const result = logline[2]
    const abilityId = logline[5]
    const hitValue = logline[6]
    const damageType = logline[7]
    const overflow = logline[8] ?? 0

    const crit =
      result === ACTION_RESULT_CRITICAL_HEAL || result === ACTION_RESULT_HOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const targetString =
      result === ACTION_RESULT_BLOCKED_DAMAGE
        ? STRING_FORMAT_TARGETSELF_BLOCK
        : STRING_FORMAT_TARGETSELF_SELF

    const ability = getAbilityString(abilityId, damageType, fontsize)

    const hitValueString =
      overflow > 0 ? ZO_CachedStrFormat(STRING_FORMAT_ABSORBED, hitValue, overflow) : hitValue

    color = [0.8, 0.4, 0.4]
    text = ZO_CachedStrFormat(logFormat, timeString, crit, targetString, ability, hitValueString)
  } else if (logtype === LIBCOMBAT_EVENT_HEAL_OUT) {
    const result = logline[2]
    const targetUnitId = logline[4]
    const abilityId = logline[5]
    const hitValue = logline[6]

    const crit =
      result === ACTION_RESULT_CRITICAL_HEAL || result === ACTION_RESULT_HOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const targetname = getUnitName(units, targetUnitId)

    const ability = getAbilityString(abilityId, "heal", fontsize, showIds)

    color = [0.6, 1.0, 0.6]
    text = ZO_CachedStrFormat(logFormat, timeString, crit, targetname, ability, hitValue)
  } else if (logtype === LIBCOMBAT_EVENT_HEAL_IN) {
    const result = logline[2]
    const sourceUnitId = logline[3]
    const abilityId = logline[5]
    const hitValue = logline[6]

    const crit =
      result === ACTION_RESULT_CRITICAL_HEAL || result === ACTION_RESULT_HOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const sourceName = getUnitName(units, sourceUnitId)

    const ability = getAbilityString(abilityId, "heal", fontsize, showIds)

    color = [0.4, 0.8, 0.4]

    text = ZO_CachedStrFormat(logFormat, timeString, sourceName, crit, ability, hitValue)
  } else if (logtype === LIBCOMBAT_EVENT_HEAL_SELF) {
    const result = logline[2]
    const abilityId = logline[5]
    const hitValue = logline[6]

    const crit =
      result === ACTION_RESULT_CRITICAL_HEAL || result === ACTION_RESULT_HOT_TICK_CRITICAL
        ? ZO_CachedStrFormat(CRIT_FORMAT, STRING_CRITICAL)
        : ""

    const ability = getAbilityString(abilityId, "heal", fontsize, showIds)

    color = [0.8, 1.0, 0.6]
    text =
      result === ACTION_RESULT_DAMAGE_SHIELDED
        ? ZO_CachedStrFormat(STRING_FORMAT_HEALABSORB, timeString, ability, hitValue)
        : ZO_CachedStrFormat(logFormat, timeString, crit, ability, hitValue)
  } else if (
    logtype === LIBCOMBAT_EVENT_EFFECTS_IN ||
    logtype === LIBCOMBAT_EVENT_EFFECTS_OUT ||
    logtype === LIBCOMBAT_EVENT_GROUPEFFECTS_IN ||
    logtype === LIBCOMBAT_EVENT_GROUPEFFECTS_OUT
  ) {
    const unitId = logline[2]
    const abilityId = logline[3]
    const changeType = logline[4]
    const effectType = logline[5]
    const stacks = logline[6]
    const sourceType = logline[7]

    if (unitId == null || units[unitId] == null) {
      return $multi(undefined, undefined)
    }

    const unitString = fightRef.playerid === unitId ? STRING_YOU : getUnitName(units, unitId)

    const changeTypeString =
      changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED
        ? STRING_GAINED
        : changeType === EFFECT_RESULT_FADED
          ? STRING_LOST
          : undefined

    const unitTypeString = sourceType != null ? UNIT_TYPE_STRING[sourceType] : undefined
    const source = unitTypeString == null ? "" : ZO_CachedStrFormat(" from <<1>>", unitTypeString)

    const colorKey = effectType === BUFF_EFFECT_TYPE_DEBUFF ? "debuff" : "buff"

    const buff = getAbilityString(abilityId, colorKey, fontsize, showIds, stacks)

    color = [0.8, 0.8, 0.8]

    text = ZO_CachedStrFormat(logFormat, timeString, unitString, changeTypeString, buff, source)
  } else if (logtype === LIBCOMBAT_EVENT_RESOURCES) {
    const abilityId = logline[2]
    const powerValueChange: number | undefined = logline[3]
    const powerType = logline[4]

    if (powerValueChange != null) {
      let changeColor: string
      let changeString: string

      if (powerValueChange > 0) {
        changeColor = "|c00cc00"
        changeString = STRING_GAINED
      } else if (powerValueChange === 0) {
        changeColor = "|cffffff"
        changeString = STRING_NOGAINED
      } else {
        changeColor = "|cff3333"
        changeString = STRING_LOST
      }

      const changeTypeString = ZO_CachedStrFormat("<<1>><<2>>|r", changeColor, changeString)

      const amount = powerValueChange !== 0 ? tostring(zo_abs(powerValueChange)) : ""

      const resource =
        powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
          ? GetString(SI_ATTRIBUTES2)
          : powerType === COMBAT_MECHANIC_FLAGS_STAMINA
            ? GetString(SI_ATTRIBUTES3)
            : powerType === COMBAT_MECHANIC_FLAGS_ULTIMATE
              ? STRING_ULTIMATE
              : undefined

      const ability =
        abilityId != null
          ? ZO_CachedStrFormat(
              "(<<1>>)",
              getAbilityString(abilityId, "resource", fontsize, showIds)
            )
          : ""

      color =
        powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
          ? [0.7, 0.7, 1]
          : powerType === COMBAT_MECHANIC_FLAGS_STAMINA
            ? [0.7, 1, 0.7]
            : powerType === COMBAT_MECHANIC_FLAGS_ULTIMATE
              ? [1, 1, 0.7]
              : color
      text = ZO_CachedStrFormat(logFormat, timeString, changeTypeString, amount, resource, ability)
    } else {
      return $multi(undefined, undefined)
    }
  } else if (logtype === LIBCOMBAT_EVENT_PLAYERSTATS) {
    return formatPlayerStatsLine(logline, timeString, logFormat)
  } else if (logtype === LIBCOMBAT_EVENT_MESSAGES) {
    return formatMessageLine(logline, timeString)
  } else if (logtype === LIBCOMBAT_EVENT_SKILL_TIMINGS) {
    return formatSkillTimingsLine(logline, timeString)
  } else if (logtype === LIBCOMBAT_EVENT_BOSSHP) {
    return formatBossHpLine(logline, fightRef, timeString, logFormat)
  } else if (logtype === LIBCOMBAT_EVENT_PERFORMANCE) {
    return formatPerformanceLine(logline, timeString, logFormat)
  } else if (logtype === LIBCOMBAT_EVENT_DEATH) {
    return formatDeathLine(logline, fightRef, timeString, fontsize, showIds)
  }

  return $multi(text, color)
}
