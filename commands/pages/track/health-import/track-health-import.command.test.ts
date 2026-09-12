import { expect, test } from "bun:test"
import type {
  ImportOutcome,
  ImportRunDeps,
} from "akasha/alan/harness/health-samples-import/health-import-run/health-import-run.module.code.ts"
import {
  MAX_IMPORT_BATCH,
  NO_LOWER_BOUND,
} from "akasha/alan/harness/health-samples-import/health-import-run/health-import-run.module.code.ts"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  healthImported,
  linesOf,
  resumable,
  type Taken,
  taken,
  trackHealthImport,
} from "akasha/commands/pages/track/health-import/track-health-import.command.code.ts"

const SOURCE = "/Users/nobody/Downloads/export.zip"

const REACHED = "the writer was reached"

const CALLED = "akasha track health-import"

const GIVEN: Given = { root: ".", calledAs: CALLED, from: ".", writer: null, agentId: null }

function held(argv: readonly string[]): Taken {
  const said = taken(argv, CALLED)
  if ("refused" in said) throw new Error(said.refused)
  return said
}

function outcomeOf(): ImportOutcome {
  return {
    sourceFile: SOURCE,
    exportedAtMs: undefined,
    tally: {
      recordLines: 0,
      unparseable: 0,
      converted: 0,
      sourceDefaulted: 0,
      rejected: {
        "metric-not-imported": 0,
        "unit-unrecognised": 0,
        "value-not-a-number": 0,
        "span-inverted": 0,
      },
    },
    perMetric: {
      activeEnergy: { count: 0, earliestMs: undefined, latestMs: undefined },
      stepCount: { count: 0, earliestMs: undefined, latestMs: undefined },
    },
    write: { received: 0, distinct: 0, inserted: 0, unchanged: 0, valueChanged: 0 },
    batches: 0,
    samplesWritten: 0,
    resumedFrom: 0,
  }
}

const NOTHING_THERE: ImportRunDeps = {
  openStream: async function* () {
    yield "NOFILE"
  },
  writeBatch: async () => {
    throw new Error(REACHED)
  },
}

const EMPTY_EXPORT: ImportRunDeps = {
  openStream: async function* () {
    yield `FILE\t${SOURCE}`
  },
  writeBatch: async () => {
    throw new Error(REACHED)
  },
}

const BROKEN_REACH: ImportRunDeps = {
  openStream: async function* () {
    yield `FILE\t${SOURCE}`
    throw new Error("ssh answered 255")
  },
  writeBatch: async () => {
    throw new Error(REACHED)
  },
}

test("a word of its own is refused, because this call takes flags alone", async () => {
  const answer = await trackHealthImport(["weather"], GIVEN)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`weather`")
})

test("the subject is no longer said, so naming it is refused as a word of its own", async () => {
  const answer = await trackHealthImport(["health"], GIVEN)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain(CALLED)
})

test("a flag this command does not take is refused by name", async () => {
  const answer = await trackHealthImport(["--json"], GIVEN)
  expect(answer.code).toBe(1)
  expect(answer.refusals[0]).toContain("`--json`")
})

test("a day not written as a civil day is refused", () => {
  const said = taken(["--since", "2026-9-1"], CALLED)
  expect(said).toEqual({ refused: expect.stringContaining("YYYY-MM-DD") })
})

test("a batch outside one to a thousand is refused", () => {
  expect(taken(["--batch", "0"], CALLED)).toEqual({ refused: expect.stringContaining("1 to 1000") })
  expect(taken(["--batch", "1001"], CALLED)).toEqual({
    refused: expect.stringContaining("1 to 1000"),
  })
  expect(taken(["--batch", "ten"], CALLED)).toEqual({
    refused: expect.stringContaining("1 to 1000"),
  })
})

test("a value named twice is refused rather than chosen between", () => {
  const said = taken(["--since", "2026-08-01", "--since", "2026-08-02"], CALLED)
  expect(said).toEqual({ refused: expect.stringContaining("named twice") })
})

test("a flag taking a value and given none is refused", () => {
  expect(taken(["--file-path"], CALLED)).toEqual({
    refused: expect.stringContaining("names none after it"),
  })
  expect(taken(["--since", "--dry-run"], CALLED)).toEqual({
    refused: expect.stringContaining("names none after it"),
  })
})

test("a call naming nothing takes the whole history a thousand readings at a time", () => {
  expect(held([])).toEqual({
    path: undefined,
    since: NO_LOWER_BOUND,
    batch: MAX_IMPORT_BATCH,
    dryRun: false,
    restart: false,
  })
})

test("a value is read whether it follows its flag or is joined to it", () => {
  expect(held([`--file-path=${SOURCE}`]).path).toBe(SOURCE)
  expect(held(["--file-path", SOURCE]).path).toBe(SOURCE)
})

test("an export the macbook does not hold is refused as the data's fault", async () => {
  const answer = await healthImported(held([]), NOTHING_THERE, 0)
  expect(answer.code).toBe(DATA)
  expect(answer.refusals[0]).toContain("Export All Health Data")
  expect(answer.refusals.some((one) => one.includes("--restart"))).toBe(false)
})

test("a refusal that is not the missing export says the run can be taken up", () => {
  const said = resumable({ report: [], refusals: ["ssh answered 255"], code: OPERATIONAL })
  expect(said.refusals[said.refusals.length - 1]).toContain("--restart")
})

test("a report with no refusal is left as it was", () => {
  const said = { report: ["import\thealth\t/x.zip"], refusals: [], code: OK }
  expect(resumable(said)).toEqual(said)
})

test("a dry run reads the export, reaches no writer, and says nothing was written", async () => {
  const answer = await healthImported(held(["--dry-run"]), EMPTY_EXPORT, 0)
  expect(answer.code).toBe(0)
  expect(answer.report[0]).toBe(`import\thealth\t${SOURCE}`)
  expect(answer.report.some((one) => one.startsWith("dry-run"))).toBe(true)
  expect(answer.report.some((one) => one.startsWith("batches"))).toBe(false)
})

test("a run over an export holding no record reaches no writer and counts nothing", async () => {
  const answer = await healthImported(held([]), EMPTY_EXPORT, 0)
  expect(answer.code).toBe(0)
  expect(answer.report).toContain("batches\t0")
  expect(answer.report).toContain("inserted\t0")
  expect(answer.report).toContain("already filed\t0")
})

test("a reach that breaks is refused as an operational fault, and the run can be taken up", async () => {
  const answer = await healthImported(held([]), BROKEN_REACH, 0)
  expect(answer.code).toBe(OPERATIONAL)
  expect(answer.refusals[0]).toContain("255")
  expect(answer.refusals.some((one) => one.startsWith("thrown at "))).toBe(true)
  expect(answer.refusals[answer.refusals.length - 1]).toContain("--restart")
})

test("a dry run's report names no batch and no row, and a run's report names both", () => {
  const outcome = outcomeOf()
  const dry = linesOf(outcome, true)
  expect(dry[dry.length - 1]).toContain("dry-run")
  expect(dry.some((one) => one.startsWith("inserted"))).toBe(false)
  const wet = linesOf(outcome, false)
  expect(wet).toContain("batches\t0")
  expect(wet).toContain("inserted\t0")
})

test("a report carries a count and an instant for each metric and no reading's own value", () => {
  const said = linesOf(outcomeOf(), true)
  expect(said).toContain("activeEnergy\t0 records\tearliest —\tlatest —")
  expect(said).toContain("stepCount\t0 records\tearliest —\tlatest —")
  expect(said).toContain("record lines\t0")
})
