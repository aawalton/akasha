import { describe, expect, test } from "bun:test"
import { type AnyVerdict, verdictFindingLines, verdictHeadline } from "../../../../../instructions/tools/lib/verdict-channel"

function renderVerdict(verdict: AnyVerdict): string {
  return [verdictHeadline(verdict), ...verdictFindingLines(verdict)].join("\n")
}
import { decideLintExit, deriveLintVerdict } from "./lint-verdict-core.ts"
import { foldLintVerdicts } from "./lint-verdict-fold.ts"

const AT = 1_700_000_000_000

describe("foldLintVerdicts — the aggregate over a multi-path request", () => {
  const clean = (unchanged: number): string =>
    JSON.stringify({
      summary: { changed: 0, unchanged, skipped: 0, errors: 0, warnings: 0, infos: 0 },
      diagnostics: [],
    })

  const failing = (unchanged: number, errors: number): string =>
    JSON.stringify({
      summary: { changed: 0, unchanged, skipped: 0, errors, warnings: 2, infos: 1 },
      diagnostics: Array.from({ length: errors }, () => ({
        severity: "error",
        category: "lint/correctness/noUnusedVariables",
      })),
    })

  const measured = (target: string, files: number, declared: number | null = files) =>
    deriveLintVerdict(clean(files), 0, target, declared, AT)

  const opensNothing = (target: string) => deriveLintVerdict(clean(0), 0, target, 0, AT)

  const fails = (target: string, files: number, errors: number) =>
    deriveLintVerdict(failing(files, errors), 1, target, files, AT)

  test("one member is returned unchanged — every CI and worker invocation is single-path", () => {
    const only = measured("packages/foo", 328)
    expect(foldLintVerdicts([only])).toBe(only)
  })

  test("one member that opened nothing is returned unchanged, refusal intact", () => {
    const only = opensNothing("CLAUDE.md")
    expect(foldLintVerdicts([only])).toBe(only)
    expect(decideLintExit(foldLintVerdicts([only]))).toBe(2)
  })

  test("every member measured and clean → PASS over the named paths", () => {
    const v = foldLintVerdicts([measured("packages/a", 12), measured("packages/b", 30)])
    expect(v.kind).toBe("pass")
    expect(decideLintExit(v)).toBe(0)
    expect(v.coverage).toEqual({ observed: 2, declared: 2, unit: "named paths" })
    expect(v.reason).toContain("42 files")
    expect(v.kind === "pass" && v.evidence.filesOpened).toBe(42)
    expect(v.kind === "pass" && v.evidence.target).toBe("packages/a packages/b")
  })

  test("THE DEFECT: a member that opened nothing forbids a pass over the request", () => {
    const v = foldLintVerdicts([measured("packages/a", 1), opensNothing("CLAUDE.md")])
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).toBe(2)
    expect(v.coverage).toEqual({ observed: 1, declared: 2, unit: "named paths" })
    expect(v.reason).toContain("1 of 2")
  })

  test("the refused member is NAMED, so the reader knows which path to fix", () => {
    const v = foldLintVerdicts([measured("packages/a", 1), opensNothing("CLAUDE.md")])
    expect(v.kind === "fail" && v.findings).toHaveLength(1)
    expect(v.kind === "fail" && v.findings[0]?.at).toBe("CLAUDE.md")
    expect(v.kind === "fail" && v.findings[0]?.detail).toContain("opened 0 files")
  })

  test("a failing member → FAIL, because one observed error proves the request unclean", () => {
    const v = foldLintVerdicts([measured("packages/a", 10), fails("packages/b", 5, 3)])
    expect(v.kind).toBe("fail")
    expect(decideLintExit(v)).toBe(1)
    expect(v.coverage).toEqual({ observed: 2, declared: 2, unit: "named paths" })
    expect(v.kind === "fail" && v.evidence.errors).toBe(3)
    expect(v.kind === "fail" && v.findings[0].at).toBe("packages/b")
  })

  test("a fail outranks an unknown, and the unknown member is STILL disclosed", () => {
    const v = foldLintVerdicts([fails("packages/b", 5, 1), opensNothing("CLAUDE.md")])
    expect(v.kind).toBe("fail")
    expect(v.kind === "fail" && v.findings.map((f) => f.at)).toEqual(["packages/b", "CLAUDE.md"])
    expect(v.coverage).toEqual({ observed: 1, declared: 2, unit: "named paths" })
  })

  test("a passing member contributes no finding — findings are the non-passes", () => {
    const v = foldLintVerdicts([measured("packages/a", 1), fails("packages/b", 5, 1)])
    expect(v.kind === "fail" && v.findings.map((f) => f.at)).toEqual(["packages/b"])
  })

  test("evidence sums across members, and the file-level shortfall survives", () => {
    const v = foldLintVerdicts([measured("packages/a", 10, 12), fails("packages/b", 5, 2)])
    expect(v.kind === "fail" && v.evidence.filesOpened).toBe(15)
    expect(v.kind === "fail" && v.evidence.trackedLintable).toBe(17)
    expect(v.kind === "fail" && v.evidence.filesNotOpened).toBe(2)
    expect(v.kind === "fail" && v.evidence.warnings).toBe(2)
    expect(v.kind === "fail" && v.evidence.errorsByCategory).toEqual({
      format: 0,
      rule: 2,
      other: 0,
    })
    expect(renderVerdict(v)).toContain("2 tracked lintable file(s)")
  })

  test("a sum with a missing term is not a sum — one absent denominator absents them all", () => {
    const v = foldLintVerdicts([measured("packages/a", 10, null), measured("packages/b", 5)])
    expect(v.kind === "pass" && v.evidence.trackedLintable).toBeNull()
    expect(v.kind === "pass" && v.evidence.filesNotOpened).toBeNull()
  })

  test("biomeExitCode is NOT OBSERVED on an aggregate — there was no single process", () => {
    const v = foldLintVerdicts([measured("packages/a", 1), measured("packages/b", 1)])
    expect(v.kind === "pass" && v.evidence.biomeExitCode).toBeNull()
  })

  test("the aggregate's target and timestamp derive from the members, not from a caller", () => {
    const later = deriveLintVerdict(clean(1), 0, "packages/b", 1, AT + 5_000)
    const v = foldLintVerdicts([measured("packages/a", 1), later])
    expect(v.kind === "pass" && v.evidence.target).toBe("packages/a packages/b")
    expect(v.observedAtMs).toBe(AT + 5_000)
  })
})
