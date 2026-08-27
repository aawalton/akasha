import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scriptKindFor } from "./syntax-scanner-entry.ts"
import { scanTimezoneViolations } from "./ts-timezone-violations.ts"

const parse = (source: string, filePath = "temper/x.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, scriptKindFor(filePath))

const findingsOf = (src: string, filePath = "temper/x.ts", allowEsoZoneOffsets = false) =>
  scanTimezoneViolations(parse(src, filePath), allowEsoZoneOffsets)

const rulesOf = (src: string, filePath = "temper/x.ts", allowEsoZoneOffsets = false) =>
  findingsOf(src, filePath, allowEsoZoneOffsets).map((f) => f.rule)

describe("scanTimezoneViolations — t00-parse rule", () => {
  test("new Date(<expr> + 'T00:00:00') is flagged", () => {
    const src = `const today = "2024-01-01"\nconst d = new Date(today + "T00:00:00")\n`
    expect(rulesOf(src)).toEqual(["t00-parse"])
  })

  test("new Date(<expr> + 'T00:00') minimum precision is flagged", () => {
    const src = `const d = new Date(s + "T00:00")\n`
    expect(rulesOf(src)).toEqual(["t00-parse"])
  })

  test("new Date(<expr> + 'T00:00:00.000') sub-second precision is flagged", () => {
    const src = `const d = new Date(s + "T00:00:00.000")\n`
    expect(rulesOf(src)).toEqual(["t00-parse"])
  })

  test("new Date(`${expr}T00:00:00`) template literal suffix is flagged", () => {
    const src = "const d = new Date(`${today}T00:00:00`)\n"
    expect(rulesOf(src)).toEqual(["t00-parse"])
  })

  test("new Date(0) numeric arg is not flagged", () => {
    expect(rulesOf(`const d = new Date(0)\n`)).toEqual([])
  })

  test("new Date() no args is not flagged", () => {
    expect(rulesOf(`const d = new Date()\n`)).toEqual([])
  })

  test("string literal containing T00:00:00 outside new Date is not flagged", () => {
    expect(rulesOf(`const s = "T00:00:00"\n`)).toEqual([])
  })

  test("new Date(other) Date arg is not flagged", () => {
    expect(rulesOf(`const d = new Date(other)\n`)).toEqual([])
  })
})

describe("scanTimezoneViolations — hour-offset-constant rule", () => {
  test("Date.now() - X * 3600 * 1000 chain is flagged in ESO domain", () => {
    const src = `const d = Date.now() - 6 * 3600 * 1000\n`
    expect(rulesOf(src, "temper/x.ts")).toEqual(["hour-offset-constant"])
  })

  test("X * 3600000 single literal is flagged in ESO domain", () => {
    const src = `const d = Date.now() - 6 * 3600000\n`
    expect(rulesOf(src, "shared/tasks/x.ts")).toEqual(["hour-offset-constant"])
  })

  test("3_600_000 with underscore separators is flagged in ESO domain", () => {
    const src = `const d = Date.now() - hours * 3_600_000\n`
    expect(rulesOf(src, "shared/recurrence/x.ts")).toEqual(["hour-offset-constant"])
  })

  test("when allowEsoZoneOffsets is true, hour-offset is not flagged", () => {
    const src = `const d = Date.now() - 6 * 3600 * 1000\n`
    expect(rulesOf(src, "infra/scripts/foo.ts", true)).toEqual([])
  })

  test("MS_PER_DAY = 86_400_000 day-duration constant is not flagged (no DST risk)", () => {
    const src = `const MS_PER_DAY = 86_400_000\nconst window = Date.now() - 7 * MS_PER_DAY\n`
    expect(rulesOf(src, "temper/x.ts")).toEqual([])
  })

  test("X * 86400 * 1000 day chain is not flagged (no DST risk)", () => {
    const src = `const d = Date.now() + 1 * 86400 * 1000\n`
    expect(rulesOf(src, "temper/x.ts")).toEqual([])
  })

  test("multiplication with no 3600 or 3600000 literal is not flagged", () => {
    expect(rulesOf(`const d = ttl * 1000\n`)).toEqual([])
  })

  test("3600 literal alone (no * 1000) is not flagged", () => {
    expect(rulesOf(`const seconds = 3600\n`)).toEqual([])
  })
})

describe("scanTimezoneViolations — iana-zone-literal rule", () => {
  test("'America/New_York' literal is flagged", () => {
    expect(rulesOf(`const z = "America/New_York"\n`)).toEqual(["iana-zone-literal"])
  })

  test("'Europe/London' literal is flagged", () => {
    expect(rulesOf(`const z = "Europe/London"\n`)).toEqual(["iana-zone-literal"])
  })

  test("'Asia/Tokyo' literal is flagged", () => {
    expect(rulesOf(`const z = "Asia/Tokyo"\n`)).toEqual(["iana-zone-literal"])
  })

  test("three-segment 'America/Argentina/Buenos_Aires' literal is flagged", () => {
    expect(rulesOf(`const z = "America/Argentina/Buenos_Aires"\n`)).toEqual(["iana-zone-literal"])
  })

  test("non-IANA-shaped literal is not flagged", () => {
    expect(rulesOf(`const x = "foo/bar"\n`)).toEqual([])
  })

  test("URL-like literal containing zone substring is not flagged", () => {
    expect(rulesOf(`const url = "https://example.com/America/New_York"\n`)).toEqual([])
  })

  test("template literal prefix is not a single literal — not flagged", () => {
    const src = "const z = `America/${city}`\n"
    expect(rulesOf(src)).toEqual([])
  })
})

describe("scanTimezoneViolations — output shape", () => {
  test("file path passes through verbatim", () => {
    const src = `const d = new Date(s + "T00:00:00")\n`
    const f = findingsOf(src, "foo/src/bar.ts")[0]
    expect(f?.file).toBe("foo/src/bar.ts")
  })

  test("line and column are 1-indexed at the violation site", () => {
    const src = `\nconst d = new Date(s + "T00:00:00")\n`
    const f = findingsOf(src)[0]
    expect(f?.line).toBe(2)
    expect(f?.column).toBe(11)
  })

  test("multiple violations in one file emit one finding each", () => {
    const src = `const a = new Date(s + "T00:00:00")\nconst b = "America/New_York"\n`
    expect(rulesOf(src)).toEqual(["t00-parse", "iana-zone-literal"])
  })

  test(".tsx file is also scanned", () => {
    const src = `export const X = () => <div>{"America/New_York"}</div>\n`
    expect(rulesOf(src, "temper/x.tsx")).toEqual(["iana-zone-literal"])
  })

  test("file with no violations emits no findings", () => {
    const src = `function f() { return 1 }\nexport const x = 1\n`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanTimezoneViolations — utc-day-slice rule", () => {
  test("the pre-fix cardio-ingest construction is flagged", () => {
    const src = `const today = new Date().toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual(["utc-day-slice"])
  })

  test("the gfs-promoter todayUtc retention-bucket site is not flagged", () => {
    const src = `const summary = { todayUtc: new Date().toISOString().slice(0, 10) }\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("a Utc-marked function name declares the domain", () => {
    const src = `function todayUtc(): string {\n  return new Date().toISOString().slice(0, 10)\n}\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("a Utc-marked const declares the domain", () => {
    const src = `const TODAY_UTC = new Date().toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("an inline construction with no receiving binding is flagged", () => {
    const src = "const d = `Generated ${new Date().toISOString().slice(0, 10)}`\n"
    expect(rulesOf(src)).toEqual(["utc-day-slice"])
  })

  test("slicing a supplied instant is out of scope", () => {
    const src = `const day = new Date(epochMs).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("slicing a supplied instant with offset arithmetic is out of scope", () => {
    const src = `const since = new Date(nowMs - days * 86400000).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("routing through the canonical helper is not flagged", () => {
    const src = `const today = getEsoDayStr(new Date())\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("a different slice window is not flagged", () => {
    const src = `const month = new Date().toISOString().slice(0, 7)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("a bare toISOString with no slice is not flagged", () => {
    const src = `const stamp = new Date().toISOString()\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("the nearest binding wins over an outer Utc-marked one", () => {
    const src = `const outerUtc = { inner: new Date().toISOString().slice(0, 10) }\n`
    expect(rulesOf(src)).toEqual(["utc-day-slice"])
  })
})

describe("scanTimezoneViolations — utc-day-slice rule, Date.now() spelling", () => {
  test("new Date(Date.now()) with an unmarked binding is flagged", () => {
    const src = `const today = new Date(Date.now()).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual(["utc-day-slice"])
  })

  test("new Date(Date.now()) inline with no receiving binding is flagged", () => {
    const src = "const d = `Generated ${new Date(Date.now()).toISOString().slice(0, 10)}`\n"
    expect(rulesOf(src)).toEqual(["utc-day-slice"])
  })

  test("a Utc marker still declares the domain for the Date.now() spelling", () => {
    const src = `const todayUtc = new Date(Date.now()).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("arithmetic on Date.now() is a supplied instant and stays out of scope", () => {
    const src = `const since = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("a non-Date .now() receiver is not the wall clock and is not flagged", () => {
    const src = `const day = new Date(performance.now()).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })

  test("Date.now() alongside a second argument is not the wall-clock read", () => {
    const src = `const day = new Date(Date.now(), 1).toISOString().slice(0, 10)\n`
    expect(rulesOf(src)).toEqual([])
  })
})
