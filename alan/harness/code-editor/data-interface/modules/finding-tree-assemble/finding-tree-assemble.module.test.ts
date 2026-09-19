import { expect, test } from "bun:test"
import {
  type DomainNode,
  type FindingNode,
  type Found,
  treeFrom,
} from "akasha/alan/harness/code-editor/data-interface/modules/finding-tree-assemble/finding-tree-assemble.module.code.ts"

function node(slug: string, children: readonly DomainNode[] = []): DomainNode {
  return { slug, relPath: `${slug}.domain.ts`, children }
}

function found(slug: string, domain: string): Found {
  return { slug, at: `domain/finding/pages/${slug}.finding.ts`, domain, said: `${slug} is so` }
}

function shape(nodes: readonly FindingNode[]): readonly string[] {
  return nodes.flatMap((one) => [
    `${one.key}:${one.findings}`,
    ...shape(one.children).map((line) => `  ${line}`),
  ])
}

test("a domain with no finding beneath it anywhere is left out", () => {
  const tree = treeFrom(
    [node("domain/alpha", [node("domain/bravo"), node("domain/charlie")])],
    [found("one", "domain/bravo")]
  )
  expect(shape(tree.roots)).toEqual(["domain/alpha:1", "  domain/bravo:1", "    finding/one:0"])
})

test("a tree holding no finding draws nothing", () => {
  const tree = treeFrom([node("domain/alpha", [node("domain/bravo")])], [])
  expect(tree.roots).toEqual([])
  expect(tree.unreached).toEqual([])
})

test("a count reaches the whole descent rather than the findings hanging directly", () => {
  const tree = treeFrom(
    [node("domain/alpha", [node("domain/bravo", [node("domain/charlie")])])],
    [found("one", "domain/charlie"), found("two", "domain/charlie")]
  )
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:2",
    "  domain/bravo:2",
    "    domain/charlie:2",
    "      finding/one:0",
    "      finding/two:0",
  ])
})

test("a count counts the findings beneath rather than the rows beneath", () => {
  const tree = treeFrom(
    [node("domain/alpha", [node("domain/bravo"), node("domain/charlie")])],
    [found("one", "domain/bravo"), found("two", "domain/charlie")]
  )
  expect(tree.roots[0]?.findings).toBe(2)
})

test("a domain's own findings are drawn after the domains beneath it", () => {
  const tree = treeFrom(
    [node("domain/alpha", [node("domain/bravo")])],
    [found("one", "domain/alpha"), found("two", "domain/bravo")]
  )
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:2",
    "  domain/bravo:1",
    "    finding/two:0",
    "  finding/one:0",
  ])
})

test("the findings of one domain are ordered by the name each is filed under", () => {
  const tree = treeFrom(
    [node("domain/alpha")],
    [found("zulu", "domain/alpha"), found("bravo", "domain/alpha")]
  )
  expect(shape(tree.roots)).toEqual(["domain/alpha:2", "  finding/bravo:0", "  finding/zulu:0"])
})

test("a finding naming a domain the nesting never reached is drawn as a root of its own", () => {
  const tree = treeFrom(
    [node("domain/alpha")],
    [found("one", "domain/alpha"), found("two", "domain/nowhere")]
  )
  expect(tree.unreached).toEqual(["domain/nowhere"])
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:1",
    "  finding/one:0",
    "domain/nowhere:1",
    "  finding/two:0",
  ])
})

test("a finding is drawn as the sentence it says and opens the file it is written in", () => {
  const tree = treeFrom([node("domain/alpha")], [found("one", "domain/alpha")])
  const drawn = tree.roots[0]?.children[0]
  expect(drawn?.label).toBe("one is so")
  expect(drawn?.at).toBe("domain/finding/pages/one.finding.ts")
})
