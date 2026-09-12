import type { Kind } from "akasha/commands/modules/calling/calling.module.code.ts"

export type Running = {
  readonly checks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

const AUTHORED: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export function runningOf(kind: Kind | undefined): Running {
  if (kind === undefined) return AUTHORED
  const { runsChecks, writerOwesReading, readersOweReading } = kind
  return { checks: runsChecks, writerOwesReading, readersOweReading }
}
