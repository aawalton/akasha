import {
  COMBAT_MECHNIC_FLAG_TABLE_LOAD,
  COMBAT_MECHNIC_FLAG_TABLE_LOAD_LEGACY,
  COMBAT_MECHNIC_FLAG_TABLE_SAVE,
  COMBAT_RESULT_TABLE_LOAD,
  COMBAT_RESULT_TABLE_SAVE,
  LAYOUT_BOSSHP,
  LAYOUT_COMBAT,
  LAYOUT_DEATH,
  LAYOUT_EVENT,
  LAYOUT_MESSAGE,
  LAYOUT_PERFORMANCE,
  LAYOUT_POWER,
  LAYOUT_SIZE,
  LAYOUT_SKILL,
  LAYOUT_STATS,
  LAYOUT_STATS_ADV,
  LAYOUTS,
  LOG_TYPE_TO_LAYOUT,
  STAT_TABLE_CONVERT,
} from "@akasha/temper-combat-addon/combat-encoding-tables"
import { LOG_LEVEL_WARNING, log } from "@akasha/temper-combat-addon/combat-fight-data-log"
import type { CombatLogLine, Fight } from "@akasha/temper-combat-addon/combat-fight-data-types"
import { LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE } from "@akasha/temper-combat-addon/combat-lib-constants"

const CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"

const CHARS: string[] = []
const VALUES: Record<string, number> = {}
for (let i = 1; i <= 64; i++) {
  const newchar = string.sub(CHARSET, i, i)
  CHARS[i - 1] = newchar
  VALUES[newchar] = i - 1
}

export function lineField(line: CombatLogLine, index: number): number {
  const value = line[index]
  if (value === undefined) {
    return error("combat log line is missing field " + tostring(index))
  }
  return value
}

function getChar(value: number, logstringdata: string[], length: number): boolean | undefined {
  const char = CHARS[zo_floor(value) % 64]
  if (char === undefined) {
    return true
  }
  logstringdata.push(char)

  const newvalue = zo_floor(value / 64)
  if (length > 1) {
    getChar(newvalue, logstringdata, length - 1)
  }
  return undefined
}

function encodeLine(line: CombatLogLine, layout: readonly number[]): string {
  const logstringdata: string[] = []
  for (let i = 0; i < layout.length; i++) {
    const size = layout[i]
    if (size === undefined) continue
    const fieldValue = line[i]
    if (fieldValue !== undefined) {
      const invalid = getChar(fieldValue, logstringdata, size)
      if (invalid === true) {
        log(
          LOG_LEVEL_WARNING,
          "Invalid value during log encoding: %s (type: %d, value %d) ",
          tostring(fieldValue),
          lineField(line, 0),
          i + 1
        )
      }
    }
  }
  return logstringdata.join("")
}

function getValue(
  value: number,
  logstring: string,
  length: number,
  offset: number
): LuaMultiReturn<[number, number] | []> {
  const newchar = string.sub(logstring, offset, offset)
  if (newchar === "") {
    return $multi()
  }
  const charValue = VALUES[newchar]
  if (charValue === undefined) {
    return error("invalid character in encoded combat log: " + newchar)
  }
  value = value * 64 + charValue
  offset = offset - 1
  if (length > 1) {
    const [nextOffset, nextValue] = getValue(value, logstring, length - 1, offset)
    if (nextOffset === undefined || nextValue === undefined) {
      return $multi()
    }
    offset = nextOffset
    value = nextValue
  }
  return $multi(offset, value)
}

function decodeLine(logstring: string, layout: readonly number[]): CombatLogLine {
  let offset = 0
  const line: CombatLogLine = []

  for (let i = 0; i < layout.length; i++) {
    const size = layout[i]
    if (size === undefined) continue
    offset = offset + size
    const [, value] = getValue(0, logstring, size, offset)
    line[i] = value
  }
  return line
}

export function encodeCombatLogLine(
  line: CombatLogLine,
  fight: Fight
): LuaMultiReturn<[string, number] | []> {
  const unitConversion = fight.unitConversion
  if (unitConversion === undefined) {
    return error("encodeCombatLogLine requires reduceUnitIds to have run")
  }
  const layoutId = LOG_TYPE_TO_LAYOUT[lineField(line, 0)]
  if (layoutId === undefined) {
    return $multi()
  } else if (layoutId === LAYOUT_COMBAT) {
    line[2] = COMBAT_RESULT_TABLE_SAVE[lineField(line, 2)]
    line[3] = unitConversion[lineField(line, 3)]
    line[4] = unitConversion[lineField(line, 4)]
    const abilityId = lineField(line, 5)
    line[5] = abilityId > 0 ? abilityId : 0
    line[7] = line[7] ?? 0
  } else if (layoutId === LAYOUT_EVENT) {
    line[2] = unitConversion[lineField(line, 2)] ?? 0
    line[7] = line[7] ?? 0
  } else if (layoutId === LAYOUT_STATS) {
    if (line[4] === LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE) {
      line[2] = lineField(line, 2) * 100
      line[3] = lineField(line, 3) * 100
    }
    line[2] = zo_round(lineField(line, 2)) + 8388608
  } else if (layoutId === LAYOUT_STATS_ADV) {
    line[2] = zo_round(10 * (lineField(line, 2) + 838860))
    line[3] = zo_round(lineField(line, 3) * 10)
  } else if (layoutId === LAYOUT_POWER) {
    line[2] = line[2] ?? -3
    line[3] = lineField(line, 3) + 131072
    line[4] = COMBAT_MECHNIC_FLAG_TABLE_SAVE[lineField(line, 4)]
    line[5] = line[5] ?? 0
  } else if (layoutId === LAYOUT_MESSAGE && typeof line[2] !== "number") {
    return $multi()
  } else if (layoutId === LAYOUT_MESSAGE) {
    line[3] = line[3] ?? 0
  } else if (layoutId === LAYOUT_DEATH) {
    line[3] = unitConversion[lineField(line, 3)]
    line[4] = line[4] ?? 0

    if (lineField(line, 2) > 2) {
      line[4] = unitConversion[lineField(line, 4)]
    }
  } else if (layoutId === LAYOUT_SKILL) {
    line[5] = line[5] ?? 0
    if (lineField(line, 2) > 64) {
      line[2] = lineField(line, 2) - 40
    }
  } else if (layoutId === LAYOUT_PERFORMANCE) {
    line[2] = zo_floor(lineField(line, 2))
    line[3] = zo_floor(lineField(line, 3))
    line[4] = zo_floor(lineField(line, 4))
    line[5] = zo_floor(lineField(line, 5))
  } else if (layoutId !== LAYOUT_SKILL && layoutId !== LAYOUT_BOSSHP) {
    return $multi()
  }

  const layout = LAYOUTS[layoutId]
  const size = LAYOUT_SIZE[layoutId]
  if (layout === undefined || size === undefined) {
    return $multi()
  }
  const logstring = encodeLine(line, layout)

  return $multi(logstring, size)
}

export function decodeCombatLogLine(line: string, fight: Fight): CombatLogLine | undefined {
  const linetype = VALUES[string.sub(line, 1, 1)]
  if (linetype === undefined) {
    return undefined
  }
  const layoutId = LOG_TYPE_TO_LAYOUT[linetype]
  if (layoutId === undefined) {
    return undefined
  }
  const layout = LAYOUTS[layoutId]
  if (layout === undefined) {
    return undefined
  }
  const logdata = decodeLine(line, layout)

  if (layoutId === LAYOUT_COMBAT) {
    logdata[2] = COMBAT_RESULT_TABLE_LOAD[lineField(logdata, 2)]
    logdata[7] = logdata[7] ?? 0
  } else if (layoutId === LAYOUT_EVENT) {
    if (logdata[2] === 0) {
      logdata[2] = undefined
    }
  } else if (layoutId === LAYOUT_STATS || layoutId === LAYOUT_STATS_ADV) {
    const svversion = fight.svversion
    if (svversion === undefined) {
      return error("fight has no svversion")
    }
    if (svversion < 5) {
      logdata[4] = STAT_TABLE_CONVERT[lineField(logdata, 4)]
    }
    logdata[2] = lineField(logdata, 2) - 8388608
    if (logdata[4] === LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE) {
      logdata[2] = lineField(logdata, 2) / 100
      logdata[3] = lineField(logdata, 3) / 100
    }
  } else if (layoutId === LAYOUT_POWER) {
    const abilityId = lineField(logdata, 2)
    if (abilityId === 262141) {
      logdata[2] = undefined
    } else if (abilityId > 262140) {
      logdata[2] = abilityId - 262144
    }

    logdata[3] = lineField(logdata, 3) - 131072
    const svversion = fight.svversion
    if (svversion === undefined) {
      return error("fight has no svversion")
    }
    if (svversion >= 12) {
      logdata[4] = COMBAT_MECHNIC_FLAG_TABLE_LOAD[lineField(logdata, 4)]
    } else {
      if (lineField(logdata, 4) > (COMBAT_MECHANIC_FLAGS_ITERATION_END ?? 64)) {
        logdata[4] = lineField(logdata, 4) - 64
      }

      if (GetAPIVersion() >= 101034 && (fight.APIversion ?? 0) < 101034) {
        logdata[4] = COMBAT_MECHNIC_FLAG_TABLE_LOAD_LEGACY[lineField(logdata, 4)]
      }
    }

    if (logdata[5] === 0) {
      logdata[5] = undefined
    }
  } else if (layoutId === LAYOUT_MESSAGE) {
    logdata[3] = logdata[3] ?? 0
  } else if (layoutId === LAYOUT_DEATH) {
    if (logdata[4] === 0) {
      logdata[4] = undefined
    }
  } else if (layoutId === LAYOUT_SKILL) {
    if (logdata[5] === 0) {
      logdata[5] = undefined
    }
    if (lineField(logdata, 2) > 30) {
      logdata[2] = lineField(logdata, 2) + 40
    }
  } else if (layoutId !== LAYOUT_PERFORMANCE && layoutId !== LAYOUT_BOSSHP) {
    return undefined
  }

  return logdata
}
