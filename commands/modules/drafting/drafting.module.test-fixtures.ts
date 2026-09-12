import type { Kind } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Running } from "akasha/commands/modules/drafting/drafting.module.code.ts"

export const NOTHING_RUNS: Running = {
  checks: false,
  writerOwesReading: false,
  readersOweReading: false,
}

export const BOTH_RUN: Running = { checks: true, writerOwesReading: true, readersOweReading: true }

export const CHECKS_RUN: Running = {
  checks: true,
  writerOwesReading: false,
  readersOweReading: false,
}

export const kindOf = (
  runsChecks: boolean,
  writerOwesReading: boolean,
  readersOweReading: boolean
): Kind => ({ slug: "held", runsChecks, writerOwesReading, readersOweReading })
