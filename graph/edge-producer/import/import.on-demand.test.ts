import { describe, expect, test } from "bun:test"
import { nodesIn } from "../../ask.ts"
import type { Said } from "../../build-context/build-context.ts"
import type { EdgeInit } from "../edge-shape.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import { oidsUnder } from "../../../repo/oid/oid.ts"
import importEdgeProducer from "./import.graph-edge-producer.code.attachment.ts"

const root = rootsHere()[AKASHA] ?? ""

const oids = oidsUnder(root, null)

function saidOf(edge: EdgeInit): string {
  return `${edge.from.repo}:${edge.from.key} into ${edge.to.repo}:${edge.to.key}`
}

// A `Said` holding its answers in memory rather than under `.git`, so the run neither reads what an
// earlier one left nor leaves 11,000 files for the next.
function holding(dropping: string | null): Said {
  const held = new Map<string, unknown>()
  return {
    of: (_said, _repo, key, work) => {
      const oid = oids.get(key)
      if (oid !== undefined && held.has(oid)) return held.get(oid)
      const answer = work() ?? null
      if (oid !== undefined && key !== dropping) held.set(oid, answer)
      return answer
    },
    held: () => held,
    done: () => {},
  }
}

function answerFor(ctx: { roots: Record<string, string>; said: Said }, key: string): readonly EdgeInit[] | null {
  const into = importEdgeProducer.into
  if (into === undefined) throw new Error("the import producer answers no into, so nothing here applies")
  return into(ctx, { repo: AKASHA, key })
}

/**
 * What `into` answers, against what a walk finds.
 *
 * `edgesInto` SKIPS THE WALK FOR A PRODUCER THAT ANSWERS, so an `into` naming only some of what
 * reaches a node makes the rest unreachable rather than slow, and nothing else reports that. Here
 * that would be a resolution the inversion takes differently from the walk, or a file whose held
 * answer is missing while the map is handed over anyway.
 *
 * IT IS ON-DEMAND BECAUSE THE WALK IT CHECKS AGAINST READS EVERY TYPESCRIPT FILE HERE, which is
 * seconds of work to answer about files the suite could ask a cheaper question of.
 */
describe("what reaches a node is the same asked either way", () => {
  const said = holding(null)
  const ctx = { roots: { [AKASHA]: root }, said }

  const walked = new Set<string>()
  for (const node of nodesIn(ctx, [AKASHA])) {
    for (const edge of importEdgeProducer.from(ctx, node)) walked.add(saidOf(edge))
  }

  const targeted = new Set<string>()
  for (const [key] of oids) {
    for (const edge of answerFor(ctx, key) ?? []) targeted.add(saidOf(edge))
  }

  test("the walk reaches enough edges to be worth comparing", () => {
    expect(walked.size).toBeGreaterThan(1000)
  })

  test("the targeted answer names every edge the walk finds", () => {
    expect([...walked].filter((one) => !targeted.has(one))).toEqual([])
  })

  test("the targeted answer names nothing the walk does not", () => {
    expect([...targeted].filter((one) => !walked.has(one))).toEqual([])
  })
})

describe("an answer short of one file is refused rather than handed over", () => {
  const dropped = "graph/ask.ts"

  test("the file dropped is one the walk would hold an answer for", () => {
    expect(oids.get(dropped)).toBeDefined()
  })

  test("one file with nothing held makes the whole answer null, so the walk still covers it", () => {
    const ctx = { roots: { [AKASHA]: root }, said: holding(dropped) }
    for (const node of nodesIn(ctx, [AKASHA])) importEdgeProducer.from(ctx, node)
    expect(answerFor(ctx, "page/page.ts")).toBeNull()
  })
})
