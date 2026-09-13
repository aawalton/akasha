import { expect, test } from "bun:test"
import {
  championTree,
  type DomainNode,
  type DomainRow,
} from "akasha/code/editor/extension/modules/champions-tree/champions-tree.module.code.ts"

function row(slug: string, parent: string | null, sequence: readonly string[]): DomainRow {
  return { slug, relPath: `${slug}/${slug}.domain.ts`, persona: null, parent, sequence }
}

function shape(nodes: readonly DomainNode[]): readonly string[] {
  return nodes.flatMap((node) => [
    `${node.slug}:${node.position ?? "-"}`,
    ...shape(node.children).map((line) => `  ${line}`),
  ])
}

test("a parent's sequence places the children that sequence names ahead of the ones the sequence does not", () => {
  const tree = championTree([
    row("alpha", null, ["bravo", "delta"]),
    row("bravo", "alpha", []),
    row("charlie", "alpha", []),
    row("delta", "alpha", []),
  ])
  expect(shape(tree.roots)).toEqual(["alpha:-", "  bravo:1", "  delta:2", "  charlie:-"])
})

test("a parent naming no child in its sequence numbers none of them", () => {
  const tree = championTree([
    row("alpha", null, []),
    row("bravo", "alpha", []),
    row("charlie", "alpha", []),
  ])
  expect(shape(tree.roots)).toEqual(["alpha:-", "  bravo:-", "  charlie:-"])
})

test("a sequence naming what is no child of this parent numbers only the children", () => {
  const tree = championTree([
    row("alpha", null, ["bravo", "zulu", "delta"]),
    row("bravo", "alpha", []),
    row("delta", "alpha", []),
    row("zulu", null, []),
  ])
  expect(shape(tree.roots)).toEqual(["alpha:-", "  bravo:1", "  delta:2", "zulu:-"])
})
