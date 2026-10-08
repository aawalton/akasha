import type { Answer as Said } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Kind } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Running = {
  readonly checks: boolean
  readonly writerOwesReading: boolean
  readonly readersOweReading: boolean
}

const AUTHORED: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

const RUNS_CHECKS = "runsChecks"

export function runningOf(kind: Kind | undefined): Running {
  if (kind === undefined) return AUTHORED
  const { runsChecks, writerOwesReading, readersOweReading } = kind
  return { checks: runsChecks, writerOwesReading, readersOweReading }
}

export function checkedBy(value: Value | null): boolean {
  return value === null || value[RUNS_CHECKS] !== false
}

export function stamped(said: Said, owed: boolean, owing: boolean, checked = true): Said {
  if (owed && owing && checked) return said
  return {
    edits: said.edits.map((one) => ({
      ...one,
      ...(owed ? {} : { readersOweReading: false }),
      ...(owing ? {} : { writerOwesReading: false }),
      ...(checked ? {} : { runsChecks: false }),
    })),
    refused: said.refused,
    told: said.told,
  }
}
