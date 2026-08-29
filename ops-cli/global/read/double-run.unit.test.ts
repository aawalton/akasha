import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { apart, doubleRun, heldAt, reachedIn } from "./double-run.ts"

const ATTACHMENT = `${import.meta.dir}/read.command.code.attachment.ts`

test("the read calls the second reader, because deleting that call is invisible otherwise", () => {
  const source = readFileSync(ATTACHMENT, "utf8")
  expect(source).toContain(`from "./double-run.ts"`)
  expect(source).toContain("doubleRun(")
})

test("the second reader failing is swallowed, so no read fails for its shadow", () => {
  const broken = `nowhere${String.fromCharCode(0)}seat`
  expect(() => doubleRun(["--file-path", "x"], broken, new Map())).not.toThrow()
})

test("a call with nobody asking runs no second reader and throws nothing", () => {
  expect(() => doubleRun(["--file-path", "x"], null, new Map())).not.toThrow()
})

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

test("a run states how many files each reader saw, so agreement and silence differ", () => {
  const seat = `population-${Date.now()}`
  const log = `${import.meta.dir}/../../../.git/data/double-run/${seat}`
  try {
    doubleRun(["--file-path", "akasha/write-system/corpus.module.ts"], seat, new Map())
    const day = `${log}/${new Date().toISOString().slice(0, 10)}.jsonl`
    const lines = readFileSync(day, "utf8").trim().split("\n").filter(Boolean)
    expect(lines.length).toBeGreaterThan(0)
    const first = JSON.parse(lines[0] ?? "{}") as Record<string, unknown>
    expect(first["path"]).toBe("*")
    expect(String(first["old"])).toContain("file(s)")
    expect(first).toHaveProperty("apart")
  } finally {
    rmSync(log, { recursive: true, force: true })
  }
})
