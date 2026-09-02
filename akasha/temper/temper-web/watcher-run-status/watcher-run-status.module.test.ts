import { describe, expect, test } from "bun:test"
import {
  deriveWatcherRunVerdict,
  readReportedOperations,
  summarizeWatcherRun,
  type WatcherRunOperation,
} from "./watcher-run-status.module.code.ts"

const RAN_AT = "2026-07-25T13:04:29.560Z"
const REPORTED_AT = "2026-07-25T13:21:16.992Z"

function op(over: Partial<WatcherRunOperation> = {}): WatcherRunOperation {
  return { name: "characters", state: "synced", ranAt: RAN_AT, detail: null, ...over }
}

describe("readReportedOperations", () => {
  test("an absent blob yields no operations rather than throwing", () => {
    expect(readReportedOperations(undefined)).toEqual({ reportedAt: null, operations: [] })
    expect(readReportedOperations(null)).toEqual({ reportedAt: null, operations: [] })
  })

  test("a blob of the wrong shape yields no operations", () => {
    expect(readReportedOperations("nope").operations).toEqual([])
    expect(readReportedOperations(42).operations).toEqual([])
    expect(readReportedOperations({ operations: "not-an-array" }).operations).toEqual([])
  })

  test("reads the live shape the watcher actually writes", () => {
    const parsed = readReportedOperations({
      watcherVersion: "dev",
      reportedAt: REPORTED_AT,
      operations: [
        { kind: "import", name: "characters", path: "/x", state: "synced", ranAt: RAN_AT },
        {
          kind: "import",
          name: "dataMining",
          path: "/y",
          state: "upload_failed",
          ranAt: RAN_AT,
          detail: "HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items",
        },
      ],
    })
    expect(parsed.reportedAt).toBe(REPORTED_AT)
    expect(parsed.operations).toHaveLength(2)
    expect(parsed.operations[1]).toEqual({
      name: "dataMining",
      state: "upload_failed",
      ranAt: RAN_AT,
      detail: "HTTP 502 from https://tempereso.com/api/watcher/upsert-mined-items",
    })
  })

  test("an entry carrying extra fields a newer exe wrote still parses", () => {
    const parsed = readReportedOperations({
      operations: [{ name: "characters", state: "synced", ranAt: RAN_AT, futureField: 7 }],
    })
    expect(parsed.operations[0]?.state).toBe("synced")
  })

  test("an entry with an unreadable state becomes null, never a state", () => {
    const parsed = readReportedOperations({ operations: [{ name: "characters" }] })
    expect(parsed.operations[0]).toEqual({
      name: "characters",
      state: null,
      ranAt: null,
      detail: null,
    })
  })

  test("a state string this build does not know becomes null rather than a guess", () => {
    const parsed = readReportedOperations({
      operations: [{ name: "characters", state: "quantum_tunnelled" }],
    })
    expect(parsed.operations[0]?.state).toBeNull()
  })

  test("an unnamed entry is dropped — name is the merge key and nothing identifies it", () => {
    const parsed = readReportedOperations({
      operations: [{ state: "synced" }, { name: "characters", state: "synced" }],
    })
    expect(parsed.operations.map((o) => o.name)).toEqual(["characters"])
  })

  test("an unusable instant reads as unknown, never as 1970", () => {
    const parsed = readReportedOperations({
      reportedAt: "not-a-date",
      operations: [{ name: "characters", state: "synced", ranAt: "also-not-a-date" }],
    })
    expect(parsed.reportedAt).toBeNull()
    expect(parsed.operations[0]?.ranAt).toBeNull()
  })
})

describe("deriveWatcherRunVerdict", () => {
  test("no operations at all is never-reported", () => {
    expect(deriveWatcherRunVerdict({ reportedAt: null, operations: [] })).toBe("never-reported")
  })

  test("a report whose instant is known but which carries no operations is still never-reported", () => {
    expect(deriveWatcherRunVerdict({ reportedAt: REPORTED_AT, operations: [] })).toBe(
      "never-reported"
    )
  })

  test("entries with unreadable states are nothing-readable, NOT working", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op({ state: null }), op({ name: "inventory", state: null })],
      })
    ).toBe("nothing-readable")
  })

  test("an all-skipped run is nothing-readable — attempting nothing confirms nothing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op({ state: "skipped" }), op({ name: "inventory", state: "skipped" })],
      })
    ).toBe("nothing-readable")
  })

  test("at least one synced with nothing failing is working", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "skipped" })],
      })
    ).toBe("working")
  })

  test("a missing file is files-missing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "file_not_found" })],
      })
    ).toBe("files-missing")
  })

  test("an unparseable file is parse-failing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "inventory", state: "parse_failed" })],
      })
    ).toBe("parse-failing")
  })

  test("a failed upload is upload-failing", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [op(), op({ name: "dataMining", state: "upload_failed" })],
      })
    ).toBe("upload-failing")
  })

  test("thirteen synced and one upload_failed is upload-failing, not working", () => {
    const operations = [
      ...Array.from({ length: 13 }, (_, i) => op({ name: `ok-${i}` })),
      op({ name: "dataMining", state: "upload_failed", detail: "HTTP 502" }),
    ]
    expect(deriveWatcherRunVerdict({ reportedAt: REPORTED_AT, operations })).toBe("upload-failing")
  })

  test("a missing file outranks a parse failure and a failed upload", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [
          op({ name: "a", state: "upload_failed" }),
          op({ name: "b", state: "parse_failed" }),
          op({ name: "c", state: "file_not_found" }),
        ],
      })
    ).toBe("files-missing")
  })

  test("a parse failure outranks a failed upload", () => {
    expect(
      deriveWatcherRunVerdict({
        reportedAt: REPORTED_AT,
        operations: [
          op({ name: "a", state: "upload_failed" }),
          op({ name: "b", state: "parse_failed" }),
        ],
      })
    ).toBe("parse-failing")
  })
})

describe("summarizeWatcherRun", () => {
  test("carries the operations that decided the verdict, so the two cannot disagree", () => {
    const summary = summarizeWatcherRun({
      reportedAt: REPORTED_AT,
      operations: [
        op({ name: "characters" }),
        op({ name: "inventory", state: "file_not_found", detail: "no such file" }),
        op({ name: "completion", state: "file_not_found" }),
      ],
    })
    expect(summary.verdict).toBe("files-missing")
    expect(summary.decidingOperations.map((o) => o.name)).toEqual(["inventory", "completion"])
  })

  test("working's deciding set is the synced operations — the positive evidence itself", () => {
    const summary = summarizeWatcherRun({
      reportedAt: REPORTED_AT,
      operations: [op({ name: "characters" }), op({ name: "inventory", state: "skipped" })],
    })
    expect(summary.verdict).toBe("working")
    expect(summary.decidingOperations.map((o) => o.name)).toEqual(["characters"])
  })

  test("a cannot-determine verdict names no deciding operation it cannot point at", () => {
    const summary = summarizeWatcherRun({ reportedAt: null, operations: [] })
    expect(summary.verdict).toBe("never-reported")
    expect(summary.decidingOperations).toEqual([])
  })

  test("every deciding operation is one of the input operations", () => {
    const operations = [op({ name: "a" }), op({ name: "b", state: "parse_failed" })]
    const summary = summarizeWatcherRun({ reportedAt: REPORTED_AT, operations })
    for (const deciding of summary.decidingOperations) {
      expect(operations).toContain(deciding)
    }
  })
})
