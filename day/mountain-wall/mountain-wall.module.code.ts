import { pad2 } from "../string/day-string.module.code.ts"
import { denverOffsetMs } from "../us-zone-offset/us-zone-offset.module.code.ts"

const MS_PER_HOUR = 3_600_000
const LOOKAHEAD_MS = MS_PER_HOUR
const TWELVE_HOUR_REPEAT_MS = 12 * MS_PER_HOUR
const TWENTY_FOUR_HOUR_REPEAT_MS = 24 * MS_PER_HOUR
const SAVING_OFFSET_MS = -6 * MS_PER_HOUR
const STANDARD_OFFSET_MS = -7 * MS_PER_HOUR
const DENVER_OFFSETS_MS = [SAVING_OFFSET_MS, STANDARD_OFFSET_MS] as const
const DAYS_REACHED = [-2, -1, 0, 1] as const
const BARE_TIME = /^(\d{1,2}):(\d{2})$/
const WALL_DATETIME = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{1,2}):(\d{2})(?::(\d{2}))?$/
const ZONED = /(?:[zZ]|[+-]\d{2}:?\d{2})$/
const LAST_HOUR = 23
const LAST_MINUTE = 59
const LAST_SECOND = 59
const NOON_HOUR = 12
const FIRST_TWELVE_HOUR = 1
const YEAR_WIDTH = 4

export type MountainWall = {
  readonly year: number
  readonly month: number
  readonly day: number
  readonly hour: number
  readonly minute: number
  readonly second: number
}

export type MountainWallRefusal =
  | "shape"
  | "range"
  | "no-such-day"
  | "skipped"
  | "struck-twice"
  | "two-readings"
  | "no-reading"

export type MountainWallReading =
  | { readonly read: "instant"; readonly at: Date; readonly iso: string }
  | { readonly read: "refused"; readonly because: MountainWallRefusal; readonly saying: string }

function refused(because: MountainWallRefusal, saying: string): MountainWallReading {
  return { read: "refused", because, saying }
}

function reached(atMs: number): MountainWallReading {
  const at = new Date(atMs)
  return { read: "instant", at, iso: at.toISOString() }
}

export function mountainWallAt(instant: Date): MountainWall {
  const ms = instant.getTime()
  const shifted = new Date(ms + denverOffsetMs(ms))
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
    hour: shifted.getUTCHours(),
    minute: shifted.getUTCMinutes(),
    second: shifted.getUTCSeconds(),
  }
}

export function instantsForMountainWall(wall: MountainWall): readonly number[] {
  const wallAsUtcMs = Date.UTC(
    wall.year,
    wall.month - 1,
    wall.day,
    wall.hour,
    wall.minute,
    wall.second,
    0
  )
  const found: number[] = []
  for (const offset of DENVER_OFFSETS_MS) {
    const candidateMs = wallAsUtcMs - offset
    if (denverOffsetMs(candidateMs) === offset) found.push(candidateMs)
  }
  return found
}

export function mountainWallSaid(wall: MountainWall): string {
  const year = String(wall.year).padStart(YEAR_WIDTH, "0")
  return `${year}-${pad2(wall.month)}-${pad2(wall.day)} ${pad2(wall.hour)}:${pad2(wall.minute)}`
}

function isRealDay(year: number, month: number, day: number): boolean {
  const built = new Date(Date.UTC(year, month - 1, day))
  return (
    built.getUTCFullYear() === year &&
    built.getUTCMonth() + 1 === month &&
    built.getUTCDate() === day
  )
}

function readsOnTwelveHourClock(hour: number): boolean {
  return hour >= FIRST_TWELVE_HOUR && hour <= NOON_HOUR
}

export function hoursAWallTimeMayName(hour: number): readonly number[] {
  if (readsOnTwelveHourClock(hour)) return [hour % 24, (hour + NOON_HOUR) % 24]
  return [hour]
}

export function windowAround(hour: number, now: Date): { oldestMs: number; newestMs: number } {
  const repeatMs = readsOnTwelveHourClock(hour) ? TWELVE_HOUR_REPEAT_MS : TWENTY_FOUR_HOUR_REPEAT_MS
  return {
    oldestMs: now.getTime() - (repeatMs - LOOKAHEAD_MS),
    newestMs: now.getTime() + LOOKAHEAD_MS,
  }
}

function askForADate(saying: string): string {
  return `${saying} — name the date and time you mean`
}

function readBareTime(hour: number, minute: number, now: Date): MountainWallReading {
  const { oldestMs, newestMs } = windowAround(hour, now)
  const here = mountainWallAt(now)
  const inWindow: number[] = []
  const skipped: MountainWall[] = []
  for (const dayStep of DAYS_REACHED) {
    const reachedDay = new Date(Date.UTC(here.year, here.month - 1, here.day + dayStep))
    for (const wallHour of hoursAWallTimeMayName(hour)) {
      const wall = {
        year: reachedDay.getUTCFullYear(),
        month: reachedDay.getUTCMonth() + 1,
        day: reachedDay.getUTCDate(),
        hour: wallHour,
        minute,
        second: 0,
      }
      const instants = instantsForMountainWall(wall)
      if (instants.length === 0) {
        const nominalMs = Date.UTC(
          wall.year,
          wall.month - 1,
          wall.day,
          wall.hour,
          wall.minute,
          0,
          0
        )
        const nearby = DENVER_OFFSETS_MS.some((offset) => {
          const atMs = nominalMs - offset
          return atMs > oldestMs && atMs <= newestMs
        })
        if (nearby) skipped.push(wall)
        continue
      }
      for (const atMs of instants) {
        if (atMs > oldestMs && atMs <= newestMs && !inWindow.includes(atMs)) inWindow.push(atMs)
      }
    }
  }
  if (inWindow.length === 1) return reached(inWindow[0] as number)
  if (inWindow.length > 1) {
    const readings = inWindow.map((atMs) => mountainWallSaid(mountainWallAt(new Date(atMs))))
    const doubled = readings.find((said, at) => readings.indexOf(said) !== at)
    if (doubled !== undefined) {
      return refused(
        "struck-twice",
        askForADate(`the Mountain clock struck ${doubled} twice, so ${doubled} names two instants`)
      )
    }
    return refused(
      "two-readings",
      askForADate(`${readings.join(" and ")} both answer to that time near now`)
    )
  }
  if (skipped.length > 0) {
    const gap = mountainWallSaid(skipped[0] as MountainWall)
    return refused("skipped", askForADate(`the Mountain clock skipped ${gap}, so no instant is it`))
  }
  return refused(
    "no-reading",
    askForADate("no Mountain instant near now reads as that time, the clock having turned")
  )
}

function readDatedWallTime(wall: MountainWall): MountainWallReading {
  const said = mountainWallSaid(wall)
  const instants = instantsForMountainWall(wall)
  if (instants.length === 0) {
    return refused(
      "skipped",
      askForADate(`the Mountain clock skipped ${said}, so no instant is it`)
    )
  }
  if (instants.length > 1) {
    return refused(
      "struck-twice",
      askForADate(`the Mountain clock struck ${said} twice, so ${said} names two instants`)
    )
  }
  return reached(instants[0] as number)
}

export function readMountainWallTime(said: string, now: Date): MountainWallReading {
  const trimmed = said.trim()
  const bare = BARE_TIME.exec(trimmed)
  if (bare !== null) {
    const hour = Number(bare[1])
    const minute = Number(bare[2])
    if (hour > LAST_HOUR || minute > LAST_MINUTE) {
      return refused(
        "range",
        `"${said}" is no time on a clock — an hour runs 0 to ${LAST_HOUR} and a minute 0 to ${LAST_MINUTE}`
      )
    }
    return readBareTime(hour, minute, now)
  }
  const dated = WALL_DATETIME.exec(trimmed)
  if (dated !== null) {
    const year = Number(dated[1])
    const month = Number(dated[2])
    const day = Number(dated[3])
    const hour = Number(dated[4])
    const minute = Number(dated[5])
    const second = dated[6] === undefined ? 0 : Number(dated[6])
    if (!isRealDay(year, month, day)) {
      return refused("no-such-day", `"${said}" is no day on a calendar`)
    }
    if (hour > LAST_HOUR || minute > LAST_MINUTE || second > LAST_SECOND) {
      return refused(
        "range",
        `"${said}" is no time on a clock — an hour runs 0 to ${LAST_HOUR} and a minute 0 to ${LAST_MINUTE}`
      )
    }
    return readDatedWallTime({ year, month, day, hour, minute, second })
  }
  if (ZONED.test(trimmed)) {
    const at = new Date(trimmed)
    if (Number.isNaN(at.getTime())) {
      return refused("shape", `"${said}" closes like a timestamp but is none`)
    }
    return reached(at.getTime())
  }
  return refused(
    "shape",
    `"${said}" is no time — write H:MM, or "YYYY-MM-DD HH:MM" as a Mountain wall time, or a whole timestamp closing in Z or an offset`
  )
}
