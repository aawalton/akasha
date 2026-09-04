import { constants } from "node:os"

export const STOP_REASON = {
  deliberate: "deliberate",
  reaped: "reaped",
  crashReaped: "crash-reaped",
  childCrashed: "child-crashed",
} as const

export type StopReason = (typeof STOP_REASON)[keyof typeof STOP_REASON]

export interface ChildExitStatus {
  readonly exitCode: number | null
  readonly signal: string | null
}

const SIGNAL_NAME_BY_NUMBER: ReadonlyMap<number, string> = new Map(
  Object.entries(constants.signals).map(([name, number]) => [number, name] as const)
)

export function decodeWaitStatus(raw: number): ChildExitStatus {
  const termSignal = raw & 0x7f
  if (termSignal !== 0) {
    return { exitCode: null, signal: SIGNAL_NAME_BY_NUMBER.get(termSignal) ?? `SIG${termSignal}` }
  }
  return { exitCode: (raw >> 8) & 0xff, signal: null }
}

export function collapseChildExitStatus(status: ChildExitStatus): number {
  if (status.exitCode !== null) return status.exitCode
  if (status.signal === null) return 0
  const number = [...SIGNAL_NAME_BY_NUMBER].find(([, name]) => name === status.signal)?.[0]
  return number === undefined ? 0 : 128 + number
}

export interface ChildExitObservation {
  readonly status: ChildExitStatus
  readonly supervisorKilled: boolean
  readonly shuttingDown: boolean
}

export interface ChildExitClassification {
  readonly crashed: boolean
  readonly stopReason: StopReason
  readonly reason: string
  readonly status: ChildExitStatus
}

const deliberate = (status: ChildExitStatus, reason: string): ChildExitClassification => ({
  crashed: false,
  stopReason: STOP_REASON.deliberate,
  reason,
  status,
})

const crashed = (status: ChildExitStatus, reason: string): ChildExitClassification => ({
  crashed: true,
  stopReason: STOP_REASON.childCrashed,
  reason,
  status,
})

export function classifyChildExit(observation: ChildExitObservation): ChildExitClassification {
  const { status, supervisorKilled, shuttingDown } = observation
  if (shuttingDown) return deliberate(status, "supervisor was already shutting down")
  if (supervisorKilled) return deliberate(status, "the supervisor issued the kill")
  if (status.signal !== null) return crashed(status, `child killed by ${status.signal}`)
  if (status.exitCode === null) return crashed(status, "child exit status could not be observed")
  if (status.exitCode !== 0) return crashed(status, `child exited ${status.exitCode}`)
  return deliberate(status, "child exited cleanly")
}

export interface ShutdownExitWrite {
  readonly stampCleanExit: boolean
  readonly stopReason: StopReason
  readonly recordCrash: boolean
}

export function decideShutdownExitWrite(
  classification: ChildExitClassification | null
): ShutdownExitWrite {
  const crash = classification?.crashed === true
  return {
    stampCleanExit: !crash,
    stopReason: classification?.stopReason ?? STOP_REASON.deliberate,
    recordCrash: crash,
  }
}
