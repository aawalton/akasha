type WallClock = { y: number; mo: number; d: number; h: number; mi: number; s: number }

function parseWallClock(trimmed: string): WallClock | null {
  if (trimmed === "" || trimmed.startsWith("0000-00-00")) return null
  const [datePart, timePart] = trimmed.split(/[ T]/)
  if (datePart == null || timePart == null) return null
  const date = datePart.split("-").map(Number)
  const time = timePart.split(":").map(Number)
  if (date.length !== 3 || time.length < 2) return null
  const wall: WallClock = {
    y: date[0] ?? Number.NaN,
    mo: date[1] ?? Number.NaN,
    d: date[2] ?? Number.NaN,
    h: time[0] ?? Number.NaN,
    mi: time[1] ?? Number.NaN,
    s: time[2] ?? 0,
  }
  if (Object.values(wall).some((n) => !Number.isFinite(n))) return null
  return wall
}

function zoneOffsetMs(utcMs: number, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const parts = dtf.formatToParts(new Date(utcMs))
  const field = (type: string): number => {
    const part = parts.find((p) => p.type === type)
    return part ? Number(part.value) : 0
  }
  const asUtc = Date.UTC(
    field("year"),
    field("month") - 1,
    field("day"),
    field("hour"),
    field("minute"),
    field("second")
  )
  return asUtc - utcMs
}

export function zonedWallClockToInstant(wall: string, timeZone: string): number | null {
  const parsed = parseWallClock(wall.trim())
  if (parsed == null) return null
  const naiveUtc = Date.UTC(parsed.y, parsed.mo - 1, parsed.d, parsed.h, parsed.mi, parsed.s)
  const offset1 = zoneOffsetMs(naiveUtc, timeZone)
  const offset2 = zoneOffsetMs(naiveUtc - offset1, timeZone)
  return naiveUtc - offset2
}
