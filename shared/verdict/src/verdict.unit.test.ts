import { describe, expect, test } from "bun:test"
import {
  type AnyVerdict,
  renderCoverage,
  renderVerdict,
  type Verdict,
  type VerdictCoverage,
  verdictExitCode,
} from "./verdict"

const neverReached = (x: never): number => {
  throw new Error(`unreachable: ${String(x)}`)
}

const asAnyVerdict = (wire: unknown): AnyVerdict => wire as AnyVerdict

type Subject = "the-worktree" | "the-live-rule-set"
interface Evidence {
  readonly sampled: number
}

type Gate = Verdict<Subject, Evidence>

const coverage: VerdictCoverage = { observed: 12, declared: 40, unit: "files" }
const evidence: Evidence = { sampled: 12 }

describe("a pass cannot be constructed without its subject", () => {
  test("omitting `subject` is a type error", () => {
    // @ts-expect-error — no `subject`: a pass is a claim ABOUT something.
    const v: Gate = { kind: "pass", reason: "ok", observedAtMs: 1, coverage, evidence }
    expect(v.kind).toBe("pass")
  })

  test("a subject outside the declared vocabulary is a type error", () => {
    const v: Gate = {
      kind: "pass",
      // @ts-expect-error — "some-tree" is not in this family's subject vocabulary.
      subject: "some-tree",
      reason: "ok",
      observedAtMs: 1,
      coverage,
      evidence,
    }
    expect(v.kind).toBe("pass")
  })

  test("omitting `coverage` is a type error", () => {
    // @ts-expect-error — a pass with no stated population is the silence this exists to end.
    const v: Gate = {
      kind: "pass",
      subject: "the-worktree",
      reason: "ok",
      observedAtMs: 1,
      evidence,
    }
    expect(v.kind).toBe("pass")
  })
})

describe("a fail must name at least one finding", () => {
  test("an empty findings list is a type error", () => {
    const v: Gate = {
      kind: "fail",
      subject: "the-worktree",
      reason: "bad",
      observedAtMs: 1,
      coverage,
      evidence,
      // @ts-expect-error — a fail that names nothing that failed is not a fail.
      findings: [],
    }
    expect(v.kind).toBe("fail")
  })
})

describe("the union is closed at two, and the two retired kinds cannot be written back", () => {
  test("neither retired word is a kind this union carries", () => {
    // @ts-expect-error — a gate that could not observe emits a fail, and what stopped it is a finding.
    const unknown: Gate["kind"] = "unknown"
    // @ts-expect-error — a question that did not arise is a pass over a population of zero.
    const notApplicable: Gate["kind"] = "not-applicable"
    expect([unknown, notApplicable]).toHaveLength(2)
  })

  test("a switch over pass and fail is exhaustive, with nothing left to default to", () => {
    const collapse = (v: Gate): number => {
      switch (v.kind) {
        case "pass":
          return 0
        case "fail":
          return 1
        default:
          return neverReached(v)
      }
    }
    expect(
      collapse({
        kind: "pass",
        subject: "the-worktree",
        reason: "ok",
        observedAtMs: 1,
        coverage,
        evidence,
      })
    ).toBe(0)
  })
})

describe("what the retired kinds carried is still sayable", () => {
  test("a gate that could not look is a fail naming what stopped it", () => {
    const blinded: Gate = {
      kind: "fail",
      subject: "the-worktree",
      reason: "2 of 3 validations did not run",
      observedAtMs: 1,
      coverage: { observed: 1, declared: 3, unit: "validations" },
      evidence,
      findings: [{ detail: "shellcheck is not installed", at: "shellcheck" }],
    }
    expect(verdictExitCode(blinded)).not.toBe(0)
    expect(renderVerdict(blinded)).toContain("shellcheck is not installed")
    expect(renderVerdict(blinded)).toContain("1 of 3")
  })

  test("a question that did not arise is a pass whose denominator is zero", () => {
    const nothingToAsk: Gate = {
      kind: "pass",
      subject: "the-worktree",
      reason: "the tree carries no .lua, so no rule had anything to weigh",
      observedAtMs: 1,
      coverage: { observed: 0, declared: 0, unit: "lua files" },
      evidence,
    }
    expect(verdictExitCode(nothingToAsk)).toBe(0)
    expect(renderVerdict(nothingToAsk)).toContain("0 of 0")
    expect(renderVerdict(nothingToAsk).toLowerCase()).not.toContain("not computed")
  })
})

describe("verdictExitCode", () => {
  const at = 1
  const base = { subject: "the-worktree", observedAtMs: at, coverage, evidence } as const

  test("maps the two kinds onto 0 and 1, and only a pass reaches 0", () => {
    expect(verdictExitCode({ ...base, kind: "pass", reason: "ok" })).toBe(0)
    expect(
      verdictExitCode({
        ...base,
        kind: "fail",
        reason: "bad",
        findings: [{ detail: "x", at: null }],
      })
    ).toBe(1)
  })

  test("a kind the table does not carry exits 2, and never a code that reads as pass", () => {
    const fromAProducerThisBuildDoesNotKnow = asAnyVerdict({
      ...base,
      kind: "aborted",
      reason: "emitted by a version this build does not carry",
    })

    expect(verdictExitCode(fromAProducerThisBuildDoesNotKnow)).toBe(2)
    expect(verdictExitCode(fromAProducerThisBuildDoesNotKnow)).not.toBe(0)
  })
})

describe("renderCoverage keeps an uncomputed denominator apart from a zero one", () => {
  test("a null denominator says so, and never fabricates one", () => {
    const line = renderCoverage({ observed: 3, declared: null, unit: "files" })
    expect(line).toContain("3")
    expect(line).toContain("files")
    expect(line.toLowerCase()).toContain("not computed")
    expect(line).not.toContain("3 of 3")
    expect(line).not.toContain("of 0")
  })

  test("an empty population renders as an observed zero, not as an absent denominator", () => {
    const line = renderCoverage({ observed: 0, declared: 0, unit: "rules" })
    expect(line).toContain("0 of 0")
    expect(line.toLowerCase()).not.toContain("not computed")
  })

  test("a shortfall names both numbers", () => {
    expect(renderCoverage({ observed: 12, declared: 40, unit: "files" })).toContain("12 of 40")
  })
})

describe("renderVerdict never renders a non-pass as a pass", () => {
  const base = { subject: "the-worktree", observedAtMs: 1, coverage, evidence } as const

  test("a blinded gate reads as FAIL, carrying what stopped it and never a pass word", () => {
    const line = renderVerdict({
      ...base,
      kind: "fail",
      reason: "biome was killed by a signal, so nothing here was linted",
      findings: [{ detail: "biome exited on SIGKILL", at: null }],
    })
    expect(line).toContain("FAIL")
    expect(line).toContain("biome was killed by a signal")
    expect(line).not.toContain("PASS")
    expect(line).not.toContain("OK")
  })

  test("a pass names its subject and its population", () => {
    const line = renderVerdict({ ...base, kind: "pass", reason: "no errors" })
    expect(line).toContain("PASS")
    expect(line).toContain("the-worktree")
    expect(line).toContain("12 of 40")
  })

  test("a fail lists every finding, and an unattributed one is not given a name", () => {
    const line = renderVerdict({
      ...base,
      kind: "fail",
      reason: "2 failures",
      findings: [
        { detail: "expected 1 to be 2", at: "packages/x/y.unit.test.ts" },
        { detail: "a fail line before any header", at: null },
      ],
    })
    expect(line).toContain("FAIL")
    expect(line).toContain("packages/x/y.unit.test.ts")
    expect(line).toContain("expected 1 to be 2")
    expect(line).toContain("a fail line before any header")
    expect(line.toLowerCase()).toContain("unattributed")
  })

  const foreign = (extra: Record<string, unknown>): AnyVerdict =>
    asAnyVerdict({
      subject: "the-worktree",
      observedAtMs: 1,
      reason: "emitted by a version this build does not carry",
      coverage,
      evidence,
      kind: "aborted",
      ...extra,
    })

  test("an unrecognized kind renders as unreadable, never as a headline of `undefined`", () => {
    const line = renderVerdict(foreign({}))
    expect(line).not.toContain("undefined")
    expect(line).toContain("the-worktree")
    expect(line).toContain("aborted")
    expect(line).not.toContain("PASS")
    expect(line).not.toContain("OK")
  })

  test("an unrecognized kind CARRYING findings is caught too, not saved by a throw", () => {
    const line = renderVerdict(
      foreign({ findings: [{ detail: "something", at: "packages/x/y.ts" }] })
    )
    expect(line).not.toContain("undefined")
    expect(line).toContain("aborted")
    expect(line).not.toContain("PASS")
  })
})
