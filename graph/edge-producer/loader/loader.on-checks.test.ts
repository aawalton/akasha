import { describe, expect, test } from "bun:test"
import { nodesIn } from "../../ask.ts"
import { KEEPS_NOTHING } from "../../build-context/build-context.ts"
import type { EdgeInit } from "../edge-shape.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import loaderEdgeProducer from "./loader.graph-edge-producer.code.attachment.ts"

const ctx = { roots: { [AKASHA]: rootsHere()[AKASHA] as string }, said: KEEPS_NOTHING }

function saidOf(edge: EdgeInit): string {
  return `${edge.from.repo}:${edge.from.key} into ${edge.to.repo}:${edge.to.key}`
}

describe("what a loader reaches is the same asked either way", () => {
  const nodes = nodesIn(ctx, [AKASHA])

  const walked = new Set<string>()
  for (const node of nodes) {
    for (const edge of loaderEdgeProducer.from(ctx, node)) walked.add(saidOf(edge))
  }

  const answer = loaderEdgeProducer.into
  const targeted = new Set<string>()
  for (const node of nodes) {
    const said = answer === undefined ? null : answer(ctx, { repo: node.repo, key: node.key })
    for (const edge of said ?? []) targeted.add(saidOf(edge))
  }

  test("a loader edge is drawn at all, or the two answers agree on nothing", () => {
    expect(walked.size).toBeGreaterThan(0)
  })

  test("the targeted answer names every edge the walk finds", () => {
    expect([...walked].filter((one) => !targeted.has(one))).toEqual([])
  })

  test("the targeted answer names nothing the walk does not", () => {
    expect([...targeted].filter((one) => !walked.has(one))).toEqual([])
  })
})
