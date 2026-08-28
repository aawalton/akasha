import { describe, expect, test } from "bun:test"
import { edgesInto, nodesIn } from "../../ask.ts"
import { KEEPS_NOTHING } from "../../build-context/build-context.ts"
import type { EdgeInit } from "../edge-shape.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import relationEdgeProducer, {
  RELATION_EDGE,
  RELATION_KEY,
} from "./relation.graph-edge-producer.code.attachment.ts"

const EVERY = 40

const ctx = { roots: rootsHere(), said: KEEPS_NOTHING }

function saidOf(edge: EdgeInit): string {
  return `${edge.from.repo}:${edge.from.key} into ${edge.to.repo}:${edge.to.key} by ${edge.attrs[RELATION_KEY]}`
}

describe("what reaches a node is the same asked either way", () => {
  const nodes = nodesIn(ctx, [AKASHA])
  const refs = nodes
    .filter((_, at) => at % EVERY === 0)
    .map((node) => ({ repo: node.repo, key: node.key }))
  const wanted = new Set(refs.map((ref) => `${ref.repo} ${ref.key}`))

  const walked = new Set<string>()
  for (const node of nodes) {
    for (const edge of relationEdgeProducer.from(ctx, node)) {
      if (wanted.has(`${edge.to.repo} ${edge.to.key}`)) walked.add(saidOf(edge))
    }
  }
  const targeted = new Set(edgesInto(ctx, refs, [AKASHA], [RELATION_EDGE]).map(saidOf))

  test("the sample reaches enough edges to be worth comparing", () => {
    expect(refs.length).toBeGreaterThan(100)
    expect(walked.size).toBeGreaterThan(100)
  })

  test("the targeted answer names every edge the walk finds", () => {
    expect([...walked].filter((one) => !targeted.has(one))).toEqual([])
  })

  test("the targeted answer names nothing the walk does not", () => {
    expect([...targeted].filter((one) => !walked.has(one))).toEqual([])
  })
})
