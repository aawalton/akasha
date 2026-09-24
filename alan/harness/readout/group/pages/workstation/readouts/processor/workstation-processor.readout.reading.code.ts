import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"

const CPU_LINE = /^cpu\s+(.*)$/m

const COUNTED_FIELDS = 8

const IDLE = 3

const IOWAIT = 4

const WHOLE = 100

export type ProcessorTimes = {
  readonly busy: number
  readonly total: number
}

export function processorTimesIn(stat: string): ProcessorTimes | null {
  const said = firstCapture(CPU_LINE.exec(stat))
  if (said === null) return null
  const fields = said.trim().split(/\s+/).slice(0, COUNTED_FIELDS).map(Number)
  if (fields.length <= IOWAIT || fields.some((one) => !Number.isFinite(one))) return null
  const total = fields.reduce((sum, one) => sum + one, 0)
  const idle = (fields[IDLE] ?? 0) + (fields[IOWAIT] ?? 0)
  return { busy: total - idle, total }
}

export function processorIn(before: ProcessorTimes, after: ProcessorTimes): number | null {
  const total = after.total - before.total
  if (total <= 0) return null
  const busy = after.busy - before.busy
  return Math.min(WHOLE, Math.max(0, (busy / total) * WHOLE))
}
