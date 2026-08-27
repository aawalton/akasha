import { describe, expect, test } from "bun:test"
import { type AnyVerdict, verdictFindingLines, verdictHeadline } from "../../../../tools/lib/verdict-channel"

function renderVerdict(verdict: AnyVerdict): string {
  return [verdictHeadline(verdict), ...verdictFindingLines(verdict)].join("\n")
}
import { decideLintExit, deriveLintVerdict } from "./lint-verdict-core.ts"

const AT = 1_700_000_000_000

const INFO_FIXTURE = JSON.stringify({
  summary: {
    changed: 0,
    unchanged: 2,
    matches: 0,
    duration: 2836113,
    errors: 0,
    warnings: 0,
    infos: 1,
    skipped: 0,
    suggestedFixesSkipped: 0,
    diagnosticsNotPrinted: 0,
    scannerDuration: 491947,
  },
  diagnostics: [
    {
      severity: "info",
      message: "Unnecessary use of boolean literals in conditional expression.",
      category: "lint/complexity/noUselessTernary",
      location: { path: "a.ts", start: { line: 2, column: 10 }, end: { line: 2, column: 26 } },
      advices: [],
    },
  ],
  command: "check",
})

const RULE_ERROR_FIXTURE = JSON.stringify({
  summary: {
    changed: 0,
    unchanged: 2,
    matches: 0,
    duration: 2673386,
    errors: 1,
    warnings: 0,
    infos: 0,
    skipped: 0,
    suggestedFixesSkipped: 0,
    diagnosticsNotPrinted: 0,
    scannerDuration: 599561,
  },
  diagnostics: [
    {
      severity: "error",
      message: "This variable y is unused.",
      category: "lint/correctness/noUnusedVariables",
      location: { path: "a.ts", start: { line: 2, column: 9 }, end: { line: 2, column: 10 } },
      advices: [],
    },
  ],
  command: "check",
})

const FORMAT_ERROR_FIXTURE = JSON.stringify({
  summary: {
    changed: 0,
    unchanged: 2,
    matches: 0,
    duration: 2837574,
    errors: 1,
    warnings: 0,
    infos: 0,
    skipped: 0,
    suggestedFixesSkipped: 0,
    diagnosticsNotPrinted: 0,
    scannerDuration: 502139,
  },
  diagnostics: [
    {
      severity: "error",
      message: "Formatter would have printed the following content:",
      category: "format",
      location: { path: "a.ts", start: { line: 0, column: 0 }, end: { line: 0, column: 0 } },
      advices: [],
    },
  ],
  command: "check",
})

const COUNTS = {
  changed: 0,
  unchanged: 2,
  skipped: 0,
} as const

describe("deriveLintVerdict — the three severity-misread trap cases", () => {
  test("trap 1: an info diagnostic present (noUselessTernary) → PASS verdict, exit 0", () => {
    const v = deriveLintVerdict(INFO_FIXTURE, 0, ".", 2, AT)
    expect(v.kind).toBe("pass")
    expect(decideLintExit(v)).toBe(0)
    expect(v.kind === "pass" && v.evidence.errors).toBe(0)
    expect(v.kind === "pass" && v.evidence.infos).toBe(1)
    expect(renderVerdict(v)).toContain("PASS")
  })

  test("trap 2: an error diagnostic present (noUnusedVariables) → FAIL verdict, exit 1", () => {
    const v = deriveLintVerdict(RULE_ERROR_FIXTURE, 1, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).toBe(1)
    expect(v.kind === "fail" && v.evidence.errors).toBe(1)
    expect(v.kind === "fail" && v.evidence.errorsByCategory).toEqual({
      format: 0,
      rule: 1,
      other: 0,
    })
    expect(renderVerdict(v)).toContain("FAIL")
  })

  test("trap 3: an unformatted new file → FAIL attributed as FORMAT, not rule", () => {
    const v = deriveLintVerdict(FORMAT_ERROR_FIXTURE, 1, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).toBe(1)
    expect(v.kind === "fail" && v.evidence.errors).toBe(1)
    expect(v.kind === "fail" && v.evidence.errorsByCategory.format).toBe(1)
    expect(v.kind === "fail" && v.evidence.errorsByCategory.rule).toBe(0)
    expect(renderVerdict(v)).toContain("format")
  })
})

describe("deriveLintVerdict — verdict is derived from exit code AND error count together", () => {
  test("warnings without errors are non-blocking → PASS", () => {
    const fixture = JSON.stringify({
      summary: { ...COUNTS, errors: 0, warnings: 210, infos: 2 },
      diagnostics: [{ severity: "warning", category: "lint/suspicious/noExplicitAny" }],
    })
    const v = deriveLintVerdict(fixture, 0, ".", 2, AT)
    expect(v.kind).toBe("pass")
    expect(v.kind === "pass" && v.evidence.warnings).toBe(210)
  })

  test("unparseable biome stdout → FAIL, never a silent pass", () => {
    const v = deriveLintVerdict("not json at all", 1, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).not.toBe(0)
    expect(v.evidence.measured).toBe(false)
  })

  test("exit code disagreeing with error count → FAIL", () => {
    const fixture = JSON.stringify({
      summary: { ...COUNTS, errors: 1, warnings: 0, infos: 0 },
      diagnostics: [{ severity: "error", category: "lint/correctness/noUnusedVariables" }],
    })
    const v = deriveLintVerdict(fixture, 0, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).not.toBe(0)
    expect(v.evidence.measured).toBe(false)
  })

  test("process killed by signal (null exit) → FAIL", () => {
    const v = deriveLintVerdict(RULE_ERROR_FIXTURE, null, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).not.toBe(0)
    expect(v.evidence.measured).toBe(false)
  })
})

describe("the verb's own three exit codes, which the channel's two do not carry", () => {
  test("a tree biome READ and found dirty exits differently from one it could not read", () => {
    const dirty = deriveLintVerdict(RULE_ERROR_FIXTURE, 1, ".", 2, AT)
    const unread = deriveLintVerdict("not json at all", 1, ".", 2, AT)
    expect(dirty.kind).toBe(unread.kind)
    expect(decideLintExit(dirty)).toBe(1)
    expect(decideLintExit(unread)).toBe(2)
  })

  test("a clean tree exits 0, so neither refusal is firing on everything", () => {
    expect(decideLintExit(deriveLintVerdict(INFO_FIXTURE, 0, ".", 2, AT))).toBe(0)
  })
})

describe("deriveLintVerdict — a fail carries biome's own location and rule", () => {
  test("a positioned rule error names path, line, column and the full category", () => {
    const v = deriveLintVerdict(RULE_ERROR_FIXTURE, 1, ".", 2, AT)
    expect(v.kind).toBe("fail")
    expect(v.kind === "fail" && v.findings).toHaveLength(2)
    expect(v.kind === "fail" && v.findings[0].at).toBeNull()
    expect(v.kind === "fail" && v.findings[1].at).toBe("a.ts:2:9")
    expect(v.kind === "fail" && v.findings[1].detail).toBe(
      "lint/correctness/noUnusedVariables — This variable y is unused."
    )
    expect(renderVerdict(v)).toContain("[a.ts:2:9] lint/correctness/noUnusedVariables")
  })

  test("a whole-file format error names the file and no position", () => {
    const v = deriveLintVerdict(FORMAT_ERROR_FIXTURE, 1, ".", 2, AT)
    expect(v.kind === "fail" && v.findings[1].at).toBe("a.ts")
    expect(v.kind === "fail" && v.findings[1].detail).toContain("format")
  })

  test("a diagnostic biome gave no location for is rendered unattributed, not dropped", () => {
    const fixture = JSON.stringify({
      summary: { ...COUNTS, errors: 1, warnings: 0, infos: 0 },
      diagnostics: [{ severity: "error", category: "internalError/panic" }],
    })
    const v = deriveLintVerdict(fixture, 1, ".", 2, AT)
    expect(v.kind === "fail" && v.findings).toHaveLength(2)
    expect(v.kind === "fail" && v.findings[1].at).toBeNull()
    expect(renderVerdict(v)).toContain("[unattributed] internalError/panic")
  })

  test("non-blocking diagnostics are not listed under a refusal", () => {
    const fixture = JSON.stringify({
      summary: { ...COUNTS, errors: 1, warnings: 1, infos: 0 },
      diagnostics: [
        {
          severity: "warning",
          category: "lint/suspicious/noExplicitAny",
          location: { path: "w.ts" },
        },
        {
          severity: "error",
          category: "lint/correctness/noUnusedImports",
          location: { path: "e.ts", start: { line: 4, column: 1 } },
        },
      ],
    })
    const v = deriveLintVerdict(fixture, 1, ".", 2, AT)
    expect(v.kind === "fail" && v.findings).toHaveLength(2)
    expect(v.kind === "fail" && v.findings[1].at).toBe("e.ts:4:1")
    expect(renderVerdict(v)).not.toContain("w.ts")
  })
})

describe("deriveLintVerdict — every pass verdict states its file population", () => {
  const cleanFixture = (changed: number, unchanged: number): string =>
    JSON.stringify({
      summary: { changed, unchanged, skipped: 0, errors: 0, warnings: 0, infos: 0 },
      diagnostics: [],
    })

  test("filesOpened is changed + unchanged, not the skip counter", () => {
    const v = deriveLintVerdict(cleanFixture(3, 325), 0, "packages/foo", 328, AT)
    expect(v.kind === "pass" && v.evidence.filesOpened).toBe(328)
    expect(v.kind === "pass" && v.evidence.trackedLintable).toBe(328)
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBe(0)
  })

  test("a pass verdict over a MIXED target names both counts and the shortfall", () => {
    const v = deriveLintVerdict(cleanFixture(0, 12_817), 0, ".", 13_474, AT)
    expect(v.kind).toBe("pass")
    expect(v.kind === "pass" && v.evidence.filesOpened).toBe(12_817)
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBe(657)
    const rendered = renderVerdict(v)
    expect(rendered).toContain("over 12817 of 13474 files")
    expect(rendered).toContain("657 tracked lintable file(s) under . were NOT opened")
  })

  test("full coverage states the denominator explicitly rather than omitting the clause", () => {
    const v = deriveLintVerdict(cleanFixture(0, 328), 0, "packages/foo", 328, AT)
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBe(0)
    expect(renderVerdict(v)).toContain("over 328 of 328 files")
  })

  test("a FAIL verdict states the same population — the denominator is not pass-only", () => {
    const fixture = JSON.stringify({
      summary: { changed: 0, unchanged: 12_817, skipped: 0, errors: 1, warnings: 0, infos: 0 },
      diagnostics: [{ severity: "error", category: "lint/correctness/noUnusedVariables" }],
    })
    const v = deriveLintVerdict(fixture, 1, ".", 13_474, AT)
    expect(v.kind).toBe("fail")
    expect(renderVerdict(v)).toContain("over 12817 of 13474 files")
  })

  test("ZERO files opened is an anomaly, never a pass verdict", () => {
    const v = deriveLintVerdict(cleanFixture(0, 0), 0, "packages/all-excluded", 42, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).not.toBe(0)
    expect(v.evidence.measured).toBe(false)
    expect(v.reason).toContain("0 files")
  })

  test("an unavailable denominator is STATED, never guessed", () => {
    const v = deriveLintVerdict(cleanFixture(0, 12_817), 0, ".", null, AT)
    expect(v.kind).toBe("pass")
    expect(v.kind === "pass" && v.evidence.trackedLintable).toBeNull()
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBeNull()
    expect(renderVerdict(v)).toContain("denominator not computed")
  })

  test("a reference smaller than what biome opened degrades to unavailable", () => {
    const v = deriveLintVerdict(cleanFixture(0, 12_817), 0, ".", 10, AT)
    expect(v.kind).toBe("pass")
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBeNull()
    expect(renderVerdict(v)).toContain("denominator not computed")
  })

  test("a summary missing the coverage counts is an anomaly, not a zero", () => {
    const fixture = JSON.stringify({
      summary: { errors: 0, warnings: 0, infos: 0 },
      diagnostics: [],
    })
    const v = deriveLintVerdict(fixture, 0, ".", 13_474, AT)
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).not.toBe(0)
    expect(v.evidence.measured).toBe(false)
  })
})
