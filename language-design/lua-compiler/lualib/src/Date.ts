declare function GetTimeStamp(this: void): number
declare function GetGameTimeMilliseconds(this: void): number

function parseLuaMatch(values: LuaMultiReturn<string[]>): LuaMultiReturn<string[]> {
  return values
}

function parseIsoMatchCaptures(iso: string, pattern: string): LuaMultiReturn<string[]> {
  return parseLuaMatch(string.match(iso, pattern))
}

const MS_PER_SECOND = 1000
const MS_PER_MINUTE = 60 * MS_PER_SECOND
const MS_PER_HOUR = 60 * MS_PER_MINUTE
const MS_PER_DAY = 24 * MS_PER_HOUR

let anchorEpochMs: number | undefined
let anchorGameMs: number | undefined

function daysFromCivil(year: number, month1: number, day: number): number {
  const yAdj = month1 <= 2 ? year - 1 : year
  const era = Math.floor(yAdj / 400)
  const yoe = yAdj - era * 400
  const monthIndex = month1 > 2 ? month1 - 3 : month1 + 9
  const doy = Math.floor((153 * monthIndex + 2) / 5) + day - 1
  const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy
  return era * 146097 + doe - 719468
}

interface CivilDate {
  year: number
  month1: number
  day: number
}

function civilFromDays(days: number): CivilDate {
  const shifted = days + 719468
  const era = Math.floor((shifted >= 0 ? shifted : shifted - 146096) / 146097)
  const doe = shifted - era * 146097
  const yoe = Math.floor(
    (doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365
  )
  const y = yoe + era * 400
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100))
  const mp = Math.floor((5 * doy + 2) / 153)
  const d = doy - Math.floor((153 * mp + 2) / 5) + 1
  const m = mp < 10 ? mp + 3 : mp - 9
  const year = y + (m <= 2 ? 1 : 0)
  return { year, month1: m, day: d }
}

interface DivMod {
  quotient: number
  remainder: number
}

function floorDivMod(ms: number, divisor: number): DivMod {
  const quotient = Math.floor(ms / divisor)
  const remainder = ms - quotient * divisor
  return { quotient, remainder }
}

function isLuaString(value: unknown): value is string {
  return type(value) === "string"
}

function pad2(n: number): string {
  return string.format("%02d", n)
}

function pad3(n: number): string {
  return string.format("%03d", n)
}

function pad4(n: number): string {
  return string.format("%04d", n)
}

export class Date {
  private epochMs: number

  constructor(ms?: number) {
    this.epochMs = ms === undefined ? Date.now() : ms
  }

  public static now(this: void): number {
    if (anchorEpochMs === undefined || anchorGameMs === undefined) {
      anchorEpochMs = GetTimeStamp() * MS_PER_SECOND
      anchorGameMs = GetGameTimeMilliseconds()
      return anchorEpochMs
    }
    const delta = GetGameTimeMilliseconds() - anchorGameMs
    if (delta < 0) {
      anchorEpochMs = GetTimeStamp() * MS_PER_SECOND
      anchorGameMs = GetGameTimeMilliseconds()
      return anchorEpochMs
    }
    return anchorEpochMs + delta
  }

  public static UTC(
    this: void,
    year: number,
    month: number,
    day: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): number {
    const h = hours === undefined ? 0 : hours
    const mi = minutes === undefined ? 0 : minutes
    const s = seconds === undefined ? 0 : seconds
    const milli = ms === undefined ? 0 : ms
    const days = daysFromCivil(year, month + 1, day)
    return days * MS_PER_DAY + h * MS_PER_HOUR + mi * MS_PER_MINUTE + s * MS_PER_SECOND + milli
  }

  public static parse(this: void, iso: string): number {
    const withMsPattern = "^(%d%d%d%d)%-(%d%d)%-(%d%d)T(%d%d):(%d%d):(%d%d)%.(%d%d%d)Z$"
    const noMsPattern = "^(%d%d%d%d)%-(%d%d)%-(%d%d)T(%d%d):(%d%d):(%d%d)Z$"

    let [y, mo, d, h, mi, s, msStr] = parseIsoMatchCaptures(iso, withMsPattern)
    if (!isLuaString(y)) {
      ;[y, mo, d, h, mi, s] = parseIsoMatchCaptures(iso, noMsPattern)
      if (!isLuaString(y)) {
        return 0 / 0
      }
    }
    const year = tonumber(y)
    const month = tonumber(mo)
    const day = tonumber(d)
    const hours = tonumber(h)
    const minutes = tonumber(mi)
    const seconds = tonumber(s)
    const millis = !isLuaString(msStr) ? 0 : tonumber(msStr)
    if (
      year === undefined ||
      month === undefined ||
      day === undefined ||
      hours === undefined ||
      minutes === undefined ||
      seconds === undefined ||
      millis === undefined
    ) {
      return 0 / 0
    }
    return Date.UTC(year, month - 1, day, hours, minutes, seconds, millis)
  }

  public getTime(): number {
    return this.epochMs
  }

  public getFullYear(): number {
    const days = Math.floor(this.epochMs / MS_PER_DAY)
    return civilFromDays(days).year
  }

  public getMonth(): number {
    const days = Math.floor(this.epochMs / MS_PER_DAY)
    return civilFromDays(days).month1 - 1
  }

  public getDate(): number {
    const days = Math.floor(this.epochMs / MS_PER_DAY)
    return civilFromDays(days).day
  }

  public getDay(): number {
    const days = Math.floor(this.epochMs / MS_PER_DAY)
    return ((days % 7) + 11) % 7
  }

  public getHours(): number {
    const dayMs = floorDivMod(this.epochMs, MS_PER_DAY).remainder
    return Math.floor(dayMs / MS_PER_HOUR)
  }

  public getMinutes(): number {
    const dayMs = floorDivMod(this.epochMs, MS_PER_DAY).remainder
    const hourMs = dayMs - Math.floor(dayMs / MS_PER_HOUR) * MS_PER_HOUR
    return Math.floor(hourMs / MS_PER_MINUTE)
  }

  public getSeconds(): number {
    const dayMs = floorDivMod(this.epochMs, MS_PER_DAY).remainder
    const minuteMs = dayMs - Math.floor(dayMs / MS_PER_MINUTE) * MS_PER_MINUTE
    return Math.floor(minuteMs / MS_PER_SECOND)
  }

  public toISOString(): string {
    const days = Math.floor(this.epochMs / MS_PER_DAY)
    const civil = civilFromDays(days)
    const dayMs = this.epochMs - days * MS_PER_DAY
    const hours = Math.floor(dayMs / MS_PER_HOUR)
    const afterHours = dayMs - hours * MS_PER_HOUR
    const minutes = Math.floor(afterHours / MS_PER_MINUTE)
    const afterMinutes = afterHours - minutes * MS_PER_MINUTE
    const seconds = Math.floor(afterMinutes / MS_PER_SECOND)
    const millis = afterMinutes - seconds * MS_PER_SECOND
    return (
      pad4(civil.year) +
      "-" +
      pad2(civil.month1) +
      "-" +
      pad2(civil.day) +
      "T" +
      pad2(hours) +
      ":" +
      pad2(minutes) +
      ":" +
      pad2(seconds) +
      "." +
      pad3(millis) +
      "Z"
    )
  }
}
