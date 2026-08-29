import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { BODY_CEILING, bodiesAt, oidOf, recordAt } from "./reading.module.code.ts"

let count = 0

function dir(): string {
  count += 1
  return mkdtempSync(`${tmpdir()}/akasha-reading-${count}-`)
}

function away(root: string): void {
  rmSync(root, { recursive: true, force: true })
}

function askGit(body: string): string {
  const ran = Bun.spawnSync(["git", "hash-object", "--stdin"], { stdin: Buffer.from(body, "utf8") })
  return new TextDecoder().decode(ran.stdout).trim()
}

test("the oid computed here is the one git computes for the same body", () => {
  for (const body of [
    "",
    "a",
    "hello\n",
    "a page\nwith lines\n",
    "ünïcøde ✓\n",
    "\u0000binary-ish\n",
  ]) {
    expect(oidOf(body)).toBe(askGit(body))
  }
})

test("the oid of a body is not the oid of a body one byte longer", () => {
  expect(oidOf("held")).not.toBe(oidOf("held "))
})

test("a path nothing was recorded for reads as unread", () => {
  const root = dir()
  try {
    expect(recordAt(`${root}/none.json`).of("/anywhere")).toBe(null)
  } finally {
    away(root)
  }
})

test("a reading kept reads back before it is flushed and after", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    const record = recordAt(at)
    record.keep("/one", "abc", 1000)
    expect(record.of("/one")).toEqual({ oid: "abc", seenAt: 1000 })
    record.flush()
    expect(recordAt(at).of("/one")).toEqual({ oid: "abc", seenAt: 1000 })
  } finally {
    away(root)
  }
})

test("nothing is written where nothing was kept", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    recordAt(at).flush()
    expect(existsSync(at)).toBe(false)
  } finally {
    away(root)
  }
})

test("a reading carrying expiredAt reads as unread, not as a reading", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    writeFileSync(at, JSON.stringify({ "/gone": { oid: "abc", seenAt: 1000, expiredAt: 2000 } }))
    expect(recordAt(at).of("/gone")).toBe(null)
  } finally {
    away(root)
  }
})

test("reading an expired page again makes it live, because it was read again", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    writeFileSync(at, JSON.stringify({ "/gone": { oid: "abc", seenAt: 1000, expiredAt: 2000 } }))
    const record = recordAt(at)
    expect(record.of("/gone")).toBe(null)
    record.keep("/gone", "def", 3000)
    expect(record.of("/gone")).toEqual({ oid: "def", seenAt: 3000 })
    record.flush()
    expect(recordAt(at).of("/gone")).toEqual({ oid: "def", seenAt: 3000 })
  } finally {
    away(root)
  }
})

test("a reading carrying mechanicalOid answers with its oid and the time it was seen", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    writeFileSync(
      at,
      JSON.stringify({ "/one": { oid: "abc", seenAt: 1000, mechanicalOid: "zzz" } })
    )
    expect(recordAt(at).of("/one")).toEqual({ oid: "abc", seenAt: 1000 })
  } finally {
    away(root)
  }
})

test("an entry this did not touch keeps every field it arrived with", () => {
  const root = dir()
  const at = `${root}/held.json`
  const before = {
    "/plain": { oid: "a1", seenAt: 1 },
    "/expired": { oid: "a2", seenAt: 2, expiredAt: 3 },
    "/mechanical": { oid: "a3", seenAt: 4, mechanicalOid: "a4" },
  }
  try {
    writeFileSync(at, `${JSON.stringify(before, null, 2)}\n`)
    const record = recordAt(at)
    record.keep("/new", "b1", 5)
    record.flush()
    const after = JSON.parse(readFileSync(at, "utf8")) as Record<string, unknown>
    expect(after["/plain"]).toEqual(before["/plain"])
    expect(after["/expired"]).toEqual(before["/expired"])
    expect(after["/mechanical"]).toEqual(before["/mechanical"])
    expect(after["/new"]).toEqual({ oid: "b1", seenAt: 5 })
  } finally {
    away(root)
  }
})

test("a record holding nothing but oid and seenAt is written back holding nothing else", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    const record = recordAt(at)
    record.keep("/one", "abc", 1000)
    record.flush()
    const written = JSON.parse(readFileSync(at, "utf8")) as Record<string, Record<string, unknown>>
    expect(Object.keys(written["/one"] ?? {}).sort()).toEqual(["oid", "seenAt"])
  } finally {
    away(root)
  }
})

test("a record that is not readable json is treated as holding nothing, not thrown on", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    writeFileSync(at, "{ this is not json")
    const record = recordAt(at)
    expect(record.of("/one")).toBe(null)
    record.keep("/one", "abc", 1000)
    record.flush()
    expect(recordAt(at).of("/one")).toEqual({ oid: "abc", seenAt: 1000 })
  } finally {
    away(root)
  }
})

test("a record is written into a folder that was not there", () => {
  const root = dir()
  const at = `${root}/deep/under/held.json`
  try {
    const record = recordAt(at)
    record.keep("/one", "abc", 1000)
    record.flush()
    expect(existsSync(at)).toBe(true)
  } finally {
    away(root)
  }
})

test("a body kept under its oid reads back by that oid", () => {
  const root = dir()
  try {
    const bodies = bodiesAt(`${root}/bodies`)
    const oid = oidOf("what it said")
    expect(bodies.of(oid)).toBe(null)
    bodies.keep(oid, "what it said")
    expect(bodies.of(oid)).toBe("what it said")
  } finally {
    away(root)
  }
})

test("a body already held is not written over", () => {
  const root = dir()
  try {
    const bodies = bodiesAt(`${root}/bodies`)
    bodies.keep("fixed", "first")
    bodies.keep("fixed", "second")
    expect(bodies.of("fixed")).toBe("first")
  } finally {
    away(root)
  }
})

test("a body past the ceiling is not kept, and reads back as nothing", () => {
  const root = dir()
  try {
    const bodies = bodiesAt(`${root}/bodies`)
    const big = "x".repeat(BODY_CEILING + 1)
    bodies.keep("big", big)
    expect(bodies.of("big")).toBe(null)
    const fits = "x".repeat(BODY_CEILING)
    bodies.keep("fits", fits)
    expect(bodies.of("fits")).toBe(fits)
  } finally {
    away(root)
  }
})

test("the body store holds bodies and the record does not", () => {
  const root = dir()
  const at = `${root}/held.json`
  try {
    const record = recordAt(at)
    const bodies = bodiesAt(`${root}/bodies`)
    const oid = oidOf("a body")
    record.keep("/one", oid, 1000)
    bodies.keep(oid, "a body")
    record.flush()
    expect(readFileSync(at, "utf8")).not.toContain("a body")
  } finally {
    away(root)
  }
})
