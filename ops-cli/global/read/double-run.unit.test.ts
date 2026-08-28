import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { apart, heldAt, reachedIn } from "./double-run.ts"

function held(
  of: Record<string, { oid: string; seenAt: number }>
): Map<string, { oid: string; seenAt: number }> {
  return new Map(Object.entries(of))
}

test("a path neither reader moved on is no disagreement, so agreement writes nothing", () => {
  expect(apart(new Map([["a", "x"]]), new Map([["a", "x"]]))).toEqual([])
})

test("one path read by both readers to different bytes is a disagreement naming both", () => {
  expect(apart(new Map([["a", "x"]]), new Map([["a", "y"]]))).toEqual([
    { path: "a", old: "x", new: "y" },
  ])
})

test("a path only the old reader reached says so, rather than being dropped", () => {
  expect(apart(new Map([["a", "x"]]), new Map())).toEqual([{ path: "a", old: "x", new: null }])
})

test("a path only the new reader reached says so, rather than being dropped", () => {
  expect(apart(new Map(), new Map([["a", "y"]]))).toEqual([{ path: "a", old: null, new: "y" }])
})

test("disagreements come out in path order, so two runs word one difference the same way", () => {
  const found = apart(new Map([["b", "x"]]), new Map([["a", "y"]]))
  expect(found.map((one) => one.path)).toEqual(["a", "b"])
})

test("a reading whose seenAt did not move was not reached by this call", () => {
  const before = held({ a: { oid: "x", seenAt: 1 } })
  expect([...reachedIn(before, held({ a: { oid: "x", seenAt: 1 } })).keys()]).toEqual([])
})

test("a reading stamped again this call was reached, even where the body did not move", () => {
  const before = held({ a: { oid: "x", seenAt: 1 } })
  expect(reachedIn(before, held({ a: { oid: "x", seenAt: 2 } })).get("a")).toBe("x")
})

test("a reading nothing held before is reached by the call that first held it", () => {
  expect(reachedIn(new Map(), held({ a: { oid: "x", seenAt: 1 } })).get("a")).toBe("x")
})

test("a record that is not there reads as nothing held, never as a throw", () => {
  expect(heldAt(`${tmpdir()}/akasha-double-run-nowhere.json`).size).toBe(0)
})

test("a record that is not JSON reads as nothing held, so a torn file stops no read", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-double-run-`)
  try {
    const at = `${root}/torn.json`
    writeFileSync(at, '{"a": {"oid"')
    expect(heldAt(at).size).toBe(0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a record holds what it says, keyed by path", () => {
  const root = mkdtempSync(`${tmpdir()}/akasha-double-run-`)
  try {
    const at = `${root}/record.json`
    writeFileSync(at, JSON.stringify({ "/a": { oid: "x", seenAt: 7 } }))
    expect(heldAt(at).get("/a")).toEqual({ oid: "x", seenAt: 7 })
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
