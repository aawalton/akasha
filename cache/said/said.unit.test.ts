import { describe, expect, test } from "bun:test"
import { marksHere } from "./said.ts"
import { closureOf } from "../closure/closure.ts"
import { KEEPS_NOTHING, type SaidName } from "../../graph/build-context/build-context.ts"
import { FRONTMATTER_SAID } from "../../graph/frontmatter-at/frontmatter-at.ts"
import { TYPESCRIPT_SAID } from "../../graph/edge-producer/typescript/typescript.graph-edge-producer.code.attachment.ts"
import { LINKS_SAID } from "../../graph/edge-producer/relation/relation.graph-edge-producer.code.attachment.ts"
import { AKASHA, rootsHere } from "../../repo/roots/roots.ts"
import { oidsUnder } from "../../repo/oid/oid.ts"

const ENGINE = "graph/ask.ts"

const HELD: readonly SaidName[] = [FRONTMATTER_SAID, TYPESCRIPT_SAID, LINKS_SAID]

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
