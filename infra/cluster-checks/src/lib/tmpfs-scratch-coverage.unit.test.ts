import { describe, expect, test } from "bun:test"
import {
  type CoverageInput,
  type PendingEntry,
  reconcileTmpfsScratch,
} from "./tmpfs-scratch-coverage.ts"

function input(overrides: {
  detected?: readonly string[]
  pending?: readonly PendingEntry[]
  declaredSize?: number
  existing?: readonly string[]
}): CoverageInput {
  const detected = overrides.detected ?? []
  const pending = overrides.pending ?? []
  const existing = new Set(overrides.existing ?? [...detected, ...pending.map((p) => p.path)])
  return {
    detected,
    config: { pending, exceptions: {} },
    declaredSize: overrides.declaredSize ?? pending.length,
    fileExists: (relPath) => existing.has(relPath),
  }
}

const run = (o: Parameters<typeof input>[0]) => reconcileTmpfsScratch(input(o))
const kinds = (o: Parameters<typeof input>[0]): readonly string[] =>
  run(o).violations.map((v) => v.kind)
const resolvedKinds = (o: Parameters<typeof input>[0]): readonly string[] =>
  run(o).resolved.map((r) => r.kind)

const at = (path: string, entriesPerRun: number | null = null): PendingEntry =>
  entriesPerRun === null
    ? { path, entriesPerRun: null, unmeasured: "no run reaches this site in the fixture" }
    : { path, entriesPerRun }

describe("reconcileTmpfsScratch — the gate", () => {
  test("clean when every detected file is on the ratchet", () => {
    const out = run({ detected: ["a.ts", "b.ts"], pending: [at("a.ts", 9), at("b.ts", 4)] })
    expect(out.violations).toEqual([])
    expect(out.tally).toMatchObject({ detected: 2, pending: 2, exceptions: 0, unclassified: 0 })
  })

  test("a detected file absent from the config is a violation", () => {
    expect(kinds({ detected: ["new.ts"], pending: [] })).toEqual(["unclassified"])
  })

  test("the violation names the compliant alternative", () => {
    const [v] = run({ detected: ["new.ts"], pending: [] }).violations
    expect(v?.message).toContain("/var/tmp")
  })

  test("the violation refuses an exit-handler sweep as teardown", () => {
    const [v] = run({ detected: ["new.ts"], pending: [] }).violations
    expect(v?.message).toContain(`process.on("exit")`)
  })

  test("the violation says the ratchet is not where a new site goes", () => {
    const [v] = run({ detected: ["new.ts"], pending: [] }).violations
    expect(v?.message?.toLowerCase()).toContain("shrink")
  })
})

describe("reconcileTmpfsScratch — equality in both directions", () => {
  test("a declared size above the list length is a violation", () => {
    expect(kinds({ detected: ["a.ts"], pending: [at("a.ts")], declaredSize: 2 })).toEqual([
      "size-mismatch",
    ])
  })

  test("a declared size below the list length is a violation", () => {
    expect(
      kinds({ detected: ["a.ts", "b.ts"], pending: [at("a.ts"), at("b.ts")], declaredSize: 1 })
    ).toEqual(["size-mismatch"])
  })

  test("burning one down requires the size to move with it", () => {
    expect(kinds({ detected: [], pending: [], declaredSize: 0 })).toEqual([])
  })

  test("a shrink is named as a shrink and answered by lowering the constant", () => {
    const [v] = run({ detected: ["a.ts"], pending: [at("a.ts")], declaredSize: 2 }).violations
    expect(v?.message).toContain("SHRANK")
    expect(v?.message).toContain("lower PENDING_SIZE to 1")
  })

  test("a grow is named as a grow and answered by repairing the file, not the constant", () => {
    const [v] = run({
      detected: ["a.ts", "b.ts"],
      pending: [at("a.ts"), at("b.ts")],
      declaredSize: 1,
    }).violations
    expect(v?.message).toContain("GREW")
    expect(v?.message).toContain("drop the entry you added")
    expect(v?.message).toContain("leave PENDING_SIZE at 1")
  })

  test("each direction tells a reader who made no such edit what to do", () => {
    const shrank = run({ detected: ["a.ts"], pending: [at("a.ts")], declaredSize: 2 }).violations
    const grew = run({
      detected: ["a.ts", "b.ts"],
      pending: [at("a.ts"), at("b.ts")],
      declaredSize: 1,
    }).violations
    expect(shrank[0]?.message).toContain("sibling")
    expect(grew[0]?.message).toContain("sibling")
  })
})

describe("reconcileTmpfsScratch — an entry resolved elsewhere is reported, never refused", () => {
  test("an entry naming a file that no longer exists holds nothing", () => {
    const o = { detected: [], pending: [at("gone.ts")], declaredSize: 1, existing: [] }
    expect(kinds(o)).toEqual([])
    expect(resolvedKinds(o)).toEqual(["file-gone"])
  })

  test("an entry whose file no longer creates tmpfs scratch holds nothing", () => {
    const o = { detected: [], pending: [at("fixed.ts")], declaredSize: 1, existing: ["fixed.ts"] }
    expect(kinds(o)).toEqual([])
    expect(resolvedKinds(o)).toEqual(["burned-down"])
  })

  test("the resolved entry names the file, so the next list edit knows what to drop", () => {
    const out = run({ detected: [], pending: [at("fixed.ts")], declaredSize: 1 })
    expect(out.resolved.map((r) => r.file)).toEqual(["fixed.ts"])
  })

  test("a resolved entry does not soften an arriving violation beside it", () => {
    expect(
      kinds({
        detected: ["new.ts"],
        pending: [at("fixed.ts")],
        declaredSize: 1,
        existing: ["new.ts", "fixed.ts"],
      })
    ).toEqual(["unclassified"])
  })
})

describe("reconcileTmpfsScratch — the ranking is held, not merely written once", () => {
  test("measured weights must descend", () => {
    expect(
      kinds({ detected: ["a.ts", "b.ts"], pending: [at("a.ts", 3), at("b.ts", 900)] })
    ).toEqual(["misordered"])
  })

  test("unmeasured entries sort after every measured one", () => {
    expect(
      kinds({ detected: ["a.ts", "b.ts"], pending: [at("a.ts", null), at("b.ts", 5)] })
    ).toEqual(["misordered"])
  })

  test("descending with an unmeasured tail is clean", () => {
    expect(
      kinds({
        detected: ["a.ts", "b.ts", "c.ts"],
        pending: [at("a.ts", 900), at("b.ts", 3), at("c.ts", null)],
      })
    ).toEqual([])
  })

  test("the violation names the entry that ranks above its predecessor", () => {
    const [v] = run({
      detected: ["a.ts", "b.ts", "c.ts"],
      pending: [at("a.ts", 900), at("b.ts", 3), at("c.ts", 50)],
    }).violations
    expect(v?.file).toBe("c.ts")
  })

  test("equal weights are not misordered", () => {
    expect(kinds({ detected: ["a.ts", "b.ts"], pending: [at("a.ts", 5), at("b.ts", 5)] })).toEqual(
      []
    )
  })
})

describe("reconcileTmpfsScratch — what a deferred site costs is stated or measured", () => {
  test("an unmeasured entry saying nothing is a violation", () => {
    expect(kinds({ detected: ["a.ts"], pending: [{ path: "a.ts", entriesPerRun: null }] })).toEqual(
      ["unstated-cost"]
    )
  })

  test("a statement of whitespace is no statement", () => {
    expect(
      kinds({
        detected: ["a.ts"],
        pending: [{ path: "a.ts", entriesPerRun: null, unmeasured: "   " }],
      })
    ).toEqual(["unstated-cost"])
  })

  test("an unmeasured entry that states what run would measure it is clean", () => {
    expect(
      kinds({
        detected: ["a.ts"],
        pending: [{ path: "a.ts", entriesPerRun: null, unmeasured: "needs a live cluster" }],
      })
    ).toEqual([])
  })

  test("a measured zero needs no statement", () => {
    expect(kinds({ detected: ["a.ts"], pending: [{ path: "a.ts", entriesPerRun: 0 }] })).toEqual([])
  })

  test("a statement beside a number is a violation", () => {
    expect(
      kinds({
        detected: ["a.ts"],
        pending: [{ path: "a.ts", entriesPerRun: 4, unmeasured: "needs a live cluster" }],
      })
    ).toEqual(["unstated-cost"])
  })

  test("the violation names the entry, so the repair has an address", () => {
    const [v] = run({
      detected: ["a.ts"],
      pending: [{ path: "a.ts", entriesPerRun: null }],
    }).violations
    expect(v?.file).toBe("a.ts")
  })
})

describe("reconcileTmpfsScratch — the tally is a partition", () => {
  test("every detected file lands in exactly one bucket", () => {
    const out = run({ detected: ["a.ts", "new.ts"], pending: [at("a.ts", 1)] })
    const { detected, pending, exceptions, unclassified } = out.tally
    expect(pending + exceptions + unclassified).toBe(detected)
  })
})
