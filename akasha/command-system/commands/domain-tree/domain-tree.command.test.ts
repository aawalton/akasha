import { expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import type { DomainRow } from "@akasha/editor-extension/champions-tree"
import { domainTree, refusalsIn, rowsFrom, treeSaid } from "./domain-tree.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return { root: ROOT, calledAs: "akasha domain-tree", from: ROOT, writer: null, agentId: null }
}

const ROWS: readonly DomainRow[] = [
  {
    slug: "domain/akasha",
    relPath: "akasha/akasha.domain.ts",
    persona: null,
    parent: null,
    sequence: ["domain/pages"],
  },
  {
    slug: "domain/pages",
    relPath: "akasha/pages-system/pages.domain.ts",
    persona: null,
    parent: "domain/akasha",
    sequence: [],
  },
]

test("the answer carries the three keys the editor's reader consumes", () => {
  const said = JSON.parse(treeSaid("/repo", ROWS))

  expect(Object.keys(said).sort()).toEqual(["repo", "roots", "unreached"])
  expect(said.repo).toBe("/repo")
  expect(said.unreached).toEqual([])
})

test("a row carries the five keys a node is read by", () => {
  const said = JSON.parse(treeSaid("/repo", ROWS))
  const root = said.roots[0]

  expect(Object.keys(root).sort()).toEqual(["children", "persona", "position", "relPath", "slug"])
  expect(root.slug).toBe("domain/akasha")
  expect(root.relPath).toBe("akasha/akasha.domain.ts")
  expect(root.children[0].slug).toBe("domain/pages")
})

test("a domain no root reaches is named in unreached", () => {
  const circle: readonly DomainRow[] = [
    { slug: "one", relPath: "one.ts", persona: null, parent: "two", sequence: [] },
    { slug: "two", relPath: "two.ts", persona: null, parent: "one", sequence: [] },
  ]
  const said = JSON.parse(treeSaid("/repo", circle))

  expect(said.roots).toEqual([])
  expect(said.unreached).toEqual(["one", "two"])
})

test("the panel's path is said as the tree's relPath, and no row carries a persona", () => {
  const said = rowsFrom([
    { slug: "domain/akasha", path: "akasha/akasha.domain.ts", parent: null, sequence: [] },
  ])

  expect(said).toEqual([
    {
      slug: "domain/akasha",
      relPath: "akasha/akasha.domain.ts",
      persona: null,
      parent: null,
      sequence: [],
    },
  ])
})

test("a call naming nothing is refused nothing", () => {
  expect(refusalsIn([])).toEqual([])
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = domainTree(["--json"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

test("a word carrying no dash is refused too, this taking no word at all", () => {
  const said = domainTree(["sideways"], givenIn())

  expect(said.code).toBe(1)
  expect(said.refusals).toHaveLength(1)
})

test("a repo nothing can be read from answers a fault rather than throwing", () => {
  const said = domainTree([], givenIn())

  expect(said.code).toBe(3)
  expect(said.report).toEqual([])
  expect(said.refusals).toHaveLength(1)
})
