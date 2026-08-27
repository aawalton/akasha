import { describe, expect, test } from "bun:test"
import { emptyTally, type ImportTally } from "./health-import"
import { importReading } from "./health-import-reading"
import { readingHeadline } from "./reading"
import type { ImportOutcome } from "./health-import-run"

const AT = Date.parse("2026-08-07T12:00:00Z")

function outcome(over: {
  tally?: Partial<ImportTally>
  write?: Partial<ImportOutcome["write"]>
  resumedFrom?: number
}): ImportOutcome {
  const tally = { ...emptyTally(), recordLines: 10, converted: 10, ...over.tally }
  return {
    sourceFile: "/Users/walton/Downloads/export.zip",
    exportedAtMs: AT,
    tally,
    perMetric: {
      activeEnergy: { count: 7, earliestMs: AT, latestMs: AT },
      stepCount: { count: 3, earliestMs: AT, latestMs: AT },
    },
    write: {
      received: 10,
      distinct: 10,
      inserted: 10,
      unchanged: 0,
      valueChanged: 0,
      ...over.write,
    },
    batches: 1,
    samplesWritten: 10,
    resumedFrom: over.resumedFrom ?? 0,
  }
}

describe("importReading", () => {
  test("a clean run reads as imported and says what it examined", () => {
    const v = importReading(outcome({}), { dryRun: false, observedAtMs: AT })
    expect(v.state).toBe("imported")
    expect(readingHeadline(v)).toContain("the-imported-export")
  })

  test("no answer borrows a gate's word, this verb refusing nothing", () => {
    for (const built of [
      outcome({}),
      outcome({ tally: { converted: 9, unparseable: 1 } }),
      outcome({ write: { valueChanged: 2 } }),
    ]) {
      const line = readingHeadline(importReading(built, { dryRun: false, observedAtMs: AT }))
      expect(line).not.toContain("PASS")
      expect(line).not.toContain("FAIL")
    }
  })

  test("a record that did not reach the table reads lossy — the objective is that every one does", () => {
    const v = importReading(
      outcome({
        tally: { converted: 9, rejected: { ...emptyTally().rejected, "unit-unrecognised": 1 } },
      }),
      { dryRun: false, observedAtMs: AT }
    )
    expect(v.state).toBe("lossy")
    expect(v.findings).not.toBeEmpty()
  })

  test("an unparseable line reads lossy rather than passing quietly", () => {
    const v = importReading(outcome({ tally: { converted: 9, unparseable: 1 } }), {
      dryRun: false,
      observedAtMs: AT,
    })
    expect(v.state).toBe("lossy")
  })

  test("an overwritten value reads unsettled — the run cannot say which it was", () => {
    const v = importReading(outcome({ write: { valueChanged: 2 } }), {
      dryRun: false,
      observedAtMs: AT,
    })
    expect(v.state).toBe("unsettled")
    expect(v.findings.some((f) => f.at === "valueChanged")).toBe(true)
  })

  test("a placeholder source name is surfaced, since it is part of the dedupe key", () => {
    const v = importReading(outcome({ tally: { sourceDefaulted: 3 } }), {
      dryRun: false,
      observedAtMs: AT,
    })
    expect(v.state).toBe("unsettled")
    expect(v.findings.some((f) => f.at === "sourceDefaulted")).toBe(true)
  })

  test("a loss outranks a doubt: missing records are reported before unverifiable ones", () => {
    const v = importReading(
      outcome({ tally: { converted: 9, unparseable: 1, sourceDefaulted: 3 } }),
      { dryRun: false, observedAtMs: AT }
    )
    expect(v.state).toBe("lossy")
  })

  test("a dry run reads conversion only — it wrote nothing, so it claims nothing about rows", () => {
    const v = importReading(outcome({ write: { valueChanged: 2 } }), {
      dryRun: true,
      observedAtMs: AT,
    })
    expect(v.state).toBe("imported")
    expect(readingHeadline(v)).toContain("nothing was written")
  })

  test("a resumed run says on the line that it did not certify the earlier part", () => {
    const v = importReading(outcome({ resumedFrom: 4 }), { dryRun: false, observedAtMs: AT })
    expect(readingHeadline(v)).toContain("not certified here")
  })

  test("the denominator is the filtered stream, never the whole archive", () => {
    const v = importReading(outcome({}), { dryRun: false, observedAtMs: AT })
    expect(readingHeadline(v)).toContain("export records for the two imported metrics")
  })
})
