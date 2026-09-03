import { readFileSync } from "node:fs"
import { errnoCodeOf } from "@akasha/utils-process/pid-signal"

const STAT_TAIL_START_TIME_INDEX = 19

const PROC = "/proc"

const SEPARATOR = /[-.]/

export interface SeatProcKey {
  readonly pid: number
  readonly startTicks: number
}

export const SEAT_PRESENCES = ["present", "absent", "unknown"] as const

export type SeatPresence = (typeof SEAT_PRESENCES)[number]

export type ProcStartReading =
  | { readonly kind: "ticks"; readonly ticks: number }
  | { readonly kind: "no-such-process" }
  | { readonly kind: "unreadable"; readonly because: string }

export function readProcStart(pid: number, procRoot: string = PROC): ProcStartReading {
  const at = `${procRoot}/${pid}/stat`
  let raw: string
  try {
    raw = readFileSync(at, "utf8")
  } catch (err) {
    const code = errnoCodeOf(err)
    if (code === "ENOENT") return { kind: "no-such-process" }
    return { kind: "unreadable", because: `${at} gave ${code ?? String(err)}` }
  }
  const close = raw.lastIndexOf(")")
  if (close === -1) return { kind: "unreadable", because: `${at} names no command` }
  const ticks = Number(raw.slice(close + 2).split(" ")[STAT_TAIL_START_TIME_INDEX])
  if (!Number.isInteger(ticks)) return { kind: "unreadable", because: `${at} states no start time` }
  return { kind: "ticks", ticks }
}

export function readProcStartTicks(pid: number): number | null {
  const reading = readProcStart(pid)
  return reading.kind === "ticks" ? reading.ticks : null
}

export function readSeatProcKey(pid: number): SeatProcKey | null {
  const startTicks = readProcStartTicks(pid)
  return startTicks === null ? null : { pid, startTicks }
}

export function formatSeatProcKey(key: SeatProcKey): string {
  return `${key.pid}-${key.startTicks}`
}

export function parseSeatProcKey(value: string): SeatProcKey | null {
  const halves = value.split(SEPARATOR)
  if (halves.length !== 2) return null
  const pid = Number(halves[0])
  const startTicks = Number(halves[1])
  if (!Number.isInteger(pid) || !Number.isInteger(startTicks)) return null
  return { pid, startTicks }
}

export function seatProcKeyPresence(key: SeatProcKey, procRoot: string = PROC): SeatPresence {
  const reading = readProcStart(key.pid, procRoot)
  if (reading.kind === "unreadable") return "unknown"
  if (reading.kind === "no-such-process") return "absent"
  return reading.ticks === key.startTicks ? "present" : "absent"
}

export function seatProcKeyStands(key: SeatProcKey): boolean {
  return seatProcKeyPresence(key) === "present"
}

export function statedProcessPresence(stated: unknown, procRoot: string = PROC): SeatPresence {
  if (typeof stated !== "string" || stated === "") return "unknown"
  const key = parseSeatProcKey(stated)
  return key === null ? "unknown" : seatProcKeyPresence(key, procRoot)
}
