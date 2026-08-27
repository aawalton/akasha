import { describe, expect, test } from "bun:test"
import {
  type BypassPredicate,
  type CheckScript,
  classifyEmission,
  reconcileChokepoint,
} from "./verdict-emitter-chokepoint.ts"

const declared = (...files: readonly string[]): ReadonlyMap<string, BypassPredicate> =>
  new Map(files.map((f) => [f, "writes-its-own-verdict" as const]))

const script = (file: string, route: CheckScript["route"]): CheckScript => ({ file, route })

const reconcile = (scripts: readonly CheckScript[], bypass: ReadonlyMap<string, BypassPredicate>) =>
  reconcileChokepoint({ scripts, bypass, ratchetCeiling: bypass.size })

describe("classifyEmission reads where a verdict leaves a script", () => {
  test("a call to either emitter is routed, generic call form included", () => {
    expect(classifyEmission("exitOnResult({ violations, options: { population } })")).toBe("routed")
    expect(classifyEmission("exitOnResult<ColorLiteralViolation>({ violations })")).toBe("routed")
    expect(classifyEmission("reportViolations(v, { population })")).toBe("routed")
  })

  test("writing a verdict to a standard stream, or deciding an exit code, is a bypass", () => {
    expect(classifyEmission('process.stdout.write("OK — all 2 scanners clean.")')).toBe("bypass")
    expect(classifyEmission('console.log("PASS")')).toBe("bypass")
    expect(classifyEmission("process.exit(findings.length === 0 ? 0 : 1)")).toBe("bypass")
  })

  test("routing outranks self-emission, so a routed check that also prints is not a bypass", () => {
    const source = 'process.stdout.write("scanning…")\nexitOnResult({ violations, options })'
    expect(classifyEmission(source)).toBe("routed")
  })

  test("a verdict written straight to a file descriptor is a bypass, not silence", () => {
    expect(classifyEmission('writeSync(1, "[planted] OK — all 999 clean\\n")')).toBe("bypass")
    expect(classifyEmission('fs.writeSync(2, "refused\\n")')).toBe("bypass")
    expect(classifyEmission('Bun.stdout.write("OK\\n")')).toBe("bypass")
  })

  test("any console method is a bypass, not only the ones a list would have held", () => {
    expect(classifyEmission('console.debug("PASS")')).toBe("bypass")
    expect(classifyEmission('console.trace("PASS")')).toBe("bypass")
  })

  test("a library module in the checks directory emits nothing and is neither", () => {
    expect(classifyEmission("export const isContract = (v: unknown): boolean => v !== null")).toBe(
      "inert"
    )
  })
})

describe("the bypass set is closed — a surface in none of the three fails", () => {
  test("an undeclared bypass is the violation this check exists for", () => {
    const { violations } = reconcile([script("check-typesafety-bundle.ts", "bypass")], declared())
    expect(violations).toHaveLength(1)
    expect(violations[0]?.kind).toBe("undeclared-bypass")
    expect(violations[0]?.file).toBe("check-typesafety-bundle.ts")
  })

  test("a declared bypass passes, and a routed script passes without being listed", () => {
    const { violations } = reconcile(
      [script("check-typesafety-bundle.ts", "bypass"), script("check-repo-paths.ts", "routed")],
      declared("check-typesafety-bundle.ts")
    )
    expect(violations).toEqual([])
  })

  test("an inert library module passes without being listed", () => {
    expect(
      reconcile([script("check-unused-deps-types.ts", "inert")], declared()).violations
    ).toEqual([])
  })
})

describe("an entry's warrant is re-derived, and its expiry is reported rather than refused", () => {
  test("a listed file that has since been routed holds nothing, and is named as resolved", () => {
    const { violations, resolved } = reconcile(
      [script("check-typesafety-bundle.ts", "routed")],
      declared("check-typesafety-bundle.ts")
    )
    expect(violations).toEqual([])
    expect(resolved).toEqual([{ kind: "routed-out", file: "check-typesafety-bundle.ts" }])
  })

  test("a listed file that has stopped printing at all is resolved the same way", () => {
    const { violations, resolved } = reconcile(
      [script("check-x.ts", "inert")],
      declared("check-x.ts")
    )
    expect(violations).toEqual([])
    expect(resolved).toEqual([{ kind: "emits-nothing", file: "check-x.ts" }])
  })

  test("a listed file that is no longer a check script at all is resolved, not refused", () => {
    const { violations, resolved } = reconcile(
      [script("check-a.ts", "routed")],
      declared("check-gone.ts")
    )
    expect(violations).toEqual([])
    expect(resolved).toEqual([{ kind: "not-in-corpus", file: "check-gone.ts" }])
  })

  test("a resolved entry does not soften an undeclared bypass beside it", () => {
    const { violations } = reconcile(
      [script("check-old.ts", "routed"), script("check-new.ts", "bypass")],
      declared("check-old.ts")
    )
    expect(violations.map((v) => v.kind)).toEqual(["undeclared-bypass"])
  })
})

describe("the ratchet is held by equality, and each direction names its own act", () => {
  test("a list larger than its declared size fails, which is a bypass parked unreviewed", () => {
    const { violations } = reconcileChokepoint({
      scripts: [script("check-a.ts", "bypass")],
      bypass: declared("check-a.ts"),
      ratchetCeiling: 0,
    })
    expect(violations).toHaveLength(1)
    expect(violations[0]?.kind).toBe("ratchet-mismatch")
    expect(violations[0]?.message).toContain("GREW")
    expect(violations[0]?.message).toContain("raise BYPASS_SIZE to 1")
  })

  test("a list SMALLER than its declared size fails too — headroom is the defect", () => {
    const { violations } = reconcileChokepoint({
      scripts: [],
      bypass: declared(),
      ratchetCeiling: 3,
    })
    expect(violations).toHaveLength(1)
    expect(violations[0]?.kind).toBe("ratchet-mismatch")
    expect(violations[0]?.message).toContain("SHRANK")
    expect(violations[0]?.message).toContain("lower BYPASS_SIZE to 0")
  })

  test("each direction tells a reader who made no such edit what to do", () => {
    const grew = reconcileChokepoint({
      scripts: [script("check-a.ts", "bypass")],
      bypass: declared("check-a.ts"),
      ratchetCeiling: 0,
    }).violations
    const shrank = reconcileChokepoint({
      scripts: [],
      bypass: declared(),
      ratchetCeiling: 3,
    }).violations
    expect(grew[0]?.message).toContain("sibling")
    expect(shrank[0]?.message).toContain("sibling")
  })
})

describe("the tally is the count projection of the pass that explains it", () => {
  test("every script lands in exactly one bucket, so the four sum to the corpus", () => {
    const { tally } = reconcile(
      [
        script("check-a.ts", "routed"),
        script("check-b.ts", "routed"),
        script("check-c.ts", "bypass"),
        script("check-d.ts", "bypass"),
        script("check-e.ts", "inert"),
      ],
      declared("check-c.ts")
    )
    expect(tally).toEqual({ scripts: 5, routed: 2, bypass: 1, inert: 1, undeclaredBypass: 1 })
    expect(tally.routed + tally.bypass + tally.inert + tally.undeclaredBypass).toBe(tally.scripts)
  })
})
