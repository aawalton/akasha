import { describe, expect, test } from "bun:test"
import { formatPorcelainEntry, PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "./parse-status"

const z = (...records: readonly string[]): string => records.map((r) => `${r}\0`).join("")

describe("parsePorcelainStatusZ", () => {
  test("empty stdout is a clean tree, not an error", () => {
    const r = parsePorcelainStatusZ("")
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.entries).toEqual([])
  })

  test("splits the two status columns from the path without offset arithmetic", () => {
    const r = parsePorcelainStatusZ(z(" M bun.lock"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries).toEqual([
      { index: " ", worktree: "M", path: "bun.lock", origPath: undefined },
    ])
  })

  test("a blank INDEX column survives — this is the whole defect", () => {
    const r = parsePorcelainStatusZ(z(" M bun.lock", " M packages/shared/a.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => e.path)).toEqual(["bun.lock", "packages/shared/a.ts"])
  })

  test("a staged modification keeps its columns distinct from an unstaged one", () => {
    const staged = parsePorcelainStatusZ(z("M  bun.lock"))
    const unstaged = parsePorcelainStatusZ(z(" M bun.lock"))
    expect(staged.ok && staged.entries[0]).toEqual({
      index: "M",
      worktree: " ",
      path: "bun.lock",
      origPath: undefined,
    })
    expect(unstaged.ok && unstaged.entries[0]).toEqual({
      index: " ",
      worktree: "M",
      path: "bun.lock",
      origPath: undefined,
    })
  })

  test("a rename carries the new path, with the original in its own field", () => {
    const r = parsePorcelainStatusZ(z("R  packages/shared/re named.ts", "packages/shared/rn.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries).toEqual([
      {
        index: "R",
        worktree: " ",
        path: "packages/shared/re named.ts",
        origPath: "packages/shared/rn.ts",
      },
    ])
  })

  test("a copy consumes its origin field too, so the next record is not misread", () => {
    const r = parsePorcelainStatusZ(z("C  dest.ts", "src.ts", " M after.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => e.path)).toEqual(["dest.ts", "after.ts"])
  })

  test("untracked and ignored records parse", () => {
    const r = parsePorcelainStatusZ(z("?? new.ts", "!! ignored.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => `${e.index}${e.worktree}`)).toEqual(["??", "!!"])
  })

  test("paths keep bytes that non-z porcelain would C-quote", () => {
    const r = parsePorcelainStatusZ(z('?? un"quoted.ts', "?? ünïcode.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => e.path)).toEqual(['un"quoted.ts', "ünïcode.ts"])
  })

  test("REFUSES a record whose leading status column was eaten by a trim", () => {
    const r = parsePorcelainStatusZ(z("M bun.lock"))
    expect(r.ok).toBe(false)
    if (r.ok) return
    expect(r.error).toContain("M bun.lock")
  })

  test("refuses a record too short to carry two status columns and a path", () => {
    expect(parsePorcelainStatusZ(z("M")).ok).toBe(false)
    expect(parsePorcelainStatusZ(z("M  ")).ok).toBe(false)
  })

  test("refuses a record whose status columns are not status codes", () => {
    expect(parsePorcelainStatusZ(z("Zz path.ts")).ok).toBe(false)
  })

  test("refuses a record with two blank status columns", () => {
    expect(parsePorcelainStatusZ(z("   path.ts")).ok).toBe(false)
  })

  test("a trailing NUL does not manufacture an empty record", () => {
    const r = parsePorcelainStatusZ(" M a.ts\0")
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.entries).toHaveLength(1)
  })
})

describe("formatPorcelainEntry", () => {
  test("round-trips a record back to the line git printed", () => {
    const r = parsePorcelainStatusZ(z(" M bun.lock"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => formatPorcelainEntry(e))).toEqual([" M bun.lock"])
  })

  test("shows a rename as git's arrow form", () => {
    const r = parsePorcelainStatusZ(z("R  new.ts", "old.ts"))
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.entries.map((e) => formatPorcelainEntry(e))).toEqual(["R  old.ts -> new.ts"])
  })
})

describe("PORCELAIN_STATUS_ARGS", () => {
  test("names the byte-exact machine format so call sites do not spell flags", () => {
    expect(PORCELAIN_STATUS_ARGS).toEqual(["status", "--porcelain", "-z"])
  })
})
