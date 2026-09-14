const MEM_TOTAL = "MemTotal"

const MEM_AVAILABLE = "MemAvailable"

const WHOLE = 100

function kilobytesOf(meminfo: string, name: string): number | null {
  const matched = new RegExp(`^${name}:\\s+(\\d+)\\s+kB`, "m").exec(meminfo)
  const said = matched?.[1]
  if (said === undefined) return null
  const read = Number.parseInt(said, 10)
  return Number.isFinite(read) ? read : null
}

export function memoryIn(meminfo: string): number | null {
  const total = kilobytesOf(meminfo, MEM_TOTAL)
  const available = kilobytesOf(meminfo, MEM_AVAILABLE)
  if (total === null || available === null || total <= 0) return null
  return Math.min(WHOLE, Math.max(0, ((total - available) / total) * WHOLE))
}
