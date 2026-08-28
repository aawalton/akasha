import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { marksHere, saidUnder } from "./said.ts"
import { closureOf } from "../closure/closure.ts"
import { KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { HELD_ANSWERS } from "../../graph/ask.ts"
import { AKASHA, rootsHere } from "../../repo/roots/roots.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"

const ENGINE = "graph/ask.ts"

const HELD = HELD_ANSWERS

const root = rootsHere()[AKASHA] ?? ""

const oids = oidsUnder(root, null)

const bare = { roots: { [AKASHA]: root }, said: KEEPS_NOTHING }

function filesFor(entry: string): readonly string[] {
  return closureOf(bare, entry, oids).map((one) => one.path)
}

describe("a held answer is marked by the code that works it out", () => {
  test("every entry names a file the graph reaches, or that answer's mark could never move", () => {
    expect(HELD.filter((one) => filesFor(one.entry).length === 0).map((one) => one.name)).toEqual([])
  })

  test("no entry reaches as far as the whole engine, or the one shared mark is back", () => {
    const engine = filesFor(ENGINE).length
    expect(engine).toBeGreaterThan(0)
    expect(HELD.filter((one) => filesFor(one.entry).length >= engine).map((one) => one.name)).toEqual([])
  })

  test("answers whose code does not reach each other are marked apart", () => {
    const markFor = marksHere(root, process.version, oids)
    const apart = HELD.filter((one) => {
      const held = new Set(filesFor(one.entry))
      return HELD.every((two) => two.name === one.name || !held.has(two.entry))
    })
    expect(new Set(apart.map((one) => markFor(one.entry))).size).toBe(apart.length)
  })
})

const SCRATCH = "/var/tmp"

function within(run: (at: string) => void): void {
  const at = mkdtempSync(`${SCRATCH}/said-`)
  try {
    for (const name of [HELD[0]?.name ?? "held", "gone"]) {
      mkdirSync(`${at}/said/${name}/mark`, { recursive: true })
      writeFileSync(`${at}/said/${name}/mark/one.json`, '{"said":null}')
    }
    run(at)
  } finally {
    rmSync(at, { recursive: true, force: true })
  }
}

describe("a name the graph no longer holds does not keep its answers", () => {
  test("the graph holds at least one answer kind, or nothing below says anything", () => {
    expect(HELD.length).toBeGreaterThan(0)
  })

  test("a run removes a name the graph does not hold and keeps one it does", () => {
    within((at) => {
      saidUnder(at, {}, () => "mark", new Map(), HELD).done()
      expect(existsSync(`${at}/said/gone`)).toBe(false)
      expect(existsSync(`${at}/said/${HELD[0]?.name ?? "held"}/mark/one.json`)).toBe(true)
    })
  })

  test("a run that can name nothing live removes nothing, knowing no names not meaning none are", () => {
    within((at) => {
      saidUnder(at, {}, () => "mark", new Map(), []).done()
      expect(existsSync(`${at}/said/gone`)).toBe(true)
    })
  })
})
