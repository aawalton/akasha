import { describe, expect, test } from "bun:test"
import { edgesFrom, edgesInto, nodeAt } from "./ask.ts"
import { KEEPS_NOTHING } from "./build-context/build-context.ts"
import { RELATION_EDGE } from "./edge-producer/relation/relation.graph-edge-producer.code.attachment.ts"
import { IMPORT_EDGE } from "./edge-producer/import/import.graph-edge-producer.code.attachment.ts"
import type { EdgeInit } from "./edge-producer/edge-shape.ts"
import { AKASHA, rootsHere } from "../repo/roots/roots.ts"

const RELATION_KEY = "relation-key"

const MANY_RELATIONS = "pages/domain/graph-system.domain.md"

const POINTED_AT = "pages/domain/global.domain.md"

const ctx = { roots: rootsHere(), said: KEEPS_NOTHING }

function nodeOf(key: string) {
  const node = nodeAt(ctx, { repo: AKASHA, key })
  if (node === null) throw new Error(`${key} is not a node, so this test has nothing to ask about`)
  return node
}

function keysOf(edges: readonly EdgeInit[]): readonly string[] {
  return [...new Set(edges.map((edge) => edge.attrs[RELATION_KEY] ?? ""))].sort()
}

describe("an edge is asked for by its attributes as well as by its kind", () => {
  const node = nodeOf(MANY_RELATIONS)
  const all = edgesFrom(ctx, node, [RELATION_EDGE])

  test("the file this asks about draws relation edges under more than one key, or nothing here narrows", () => {
    expect(all.length).toBeGreaterThan(1)
    expect(keysOf(all).length).toBeGreaterThan(1)
  })

  test("narrowing to one attribute returns exactly the edges carrying it", () => {
    for (const key of keysOf(all)) {
      const narrowed = edgesFrom(ctx, node, [RELATION_EDGE], { [RELATION_KEY]: key })
      expect(narrowed).toEqual(all.filter((edge) => edge.attrs[RELATION_KEY] === key))
      expect(keysOf(narrowed)).toEqual([key])
      expect(narrowed.length).toBeLessThan(all.length)
    }
  })

  test("narrowing by no attribute returns what the unnarrowed ask returns, so a caller that names none is unchanged", () => {
    expect(edgesFrom(ctx, node, [RELATION_EDGE], {})).toEqual(all)
  })

  test("an attribute value no edge carries returns none", () => {
    expect(edgesFrom(ctx, node, [RELATION_EDGE], { [RELATION_KEY]: "no-such-key-slug" })).toEqual([])
  })

  test("an attribute name no edge carries returns none, an absent attribute never matching", () => {
    expect(edgesFrom(ctx, node, [RELATION_EDGE], { "no-such-attribute": "anything" })).toEqual([])
  })

  test("every named attribute must match, so two that never stand together return none", () => {
    const keys = keysOf(all)
    const one = keys[0] ?? ""
    const two = keys[1] ?? ""
    expect(edgesFrom(ctx, node, [RELATION_EDGE], { [RELATION_KEY]: one, "no-such-attribute": two })).toEqual([])
  })

  test("the kind still bounds the answer, an attribute narrowing within it rather than reaching past it", () => {
    expect(edgesFrom(ctx, node, [IMPORT_EDGE], { [RELATION_KEY]: keysOf(all)[0] ?? "" })).toEqual([])
    expect(edgesFrom(ctx, node, [], { [RELATION_KEY]: keysOf(all)[0] ?? "" })).toEqual([])
  })
})

describe("edges into a node narrow by attribute the same way", () => {
  const refs = [{ repo: AKASHA, key: POINTED_AT }]
  const all = edgesInto(ctx, refs, [AKASHA], [RELATION_EDGE])
  const key = "domain-parent-slug"

  test("more than one key points at this file, or nothing here narrows", () => {
    expect(keysOf(all).length).toBeGreaterThan(1)
  })

  test("narrowing to one attribute returns exactly the edges carrying it", () => {
    const narrowed = edgesInto(ctx, refs, [AKASHA], [RELATION_EDGE], { [RELATION_KEY]: key })
    expect(narrowed).toEqual(all.filter((edge) => edge.attrs[RELATION_KEY] === key))
    expect(narrowed.length).toBeGreaterThan(0)
    expect(narrowed.length).toBeLessThan(all.length)
  })
})
