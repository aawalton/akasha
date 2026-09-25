import { expect, test } from "bun:test"
import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  type DomainNode,
  domainsDrawnIn,
  type Hung,
  type HungNode,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import { stateAt } from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

function drawnRow(root: string, key: string, children: readonly unknown[] = []): unknown {
  return {
    key,
    label: key,
    at: join(root, `${key}.domain.ts`),
    color: null,
    persona: null,
    position: null,
    children,
  }
}

function drawnAs(root: string, body: string): undefined {
  const at = stateAt(root, "domain-tree")
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, body)
  return undefined
}

test("the domains are read from the picture the domains panel draws", () => {
  const root = scratch.rootFor("akasha-domains-drawn-")
  const roots = [drawnRow(root, "domain/alpha", [drawnRow(root, "domain/bravo")])]
  drawnAs(root, `${JSON.stringify({ roots, unreached: [] })}\n`)

  expect(domainsDrawnIn(root)).toEqual([
    {
      slug: "domain/alpha",
      relPath: "domain/alpha.domain.ts",
      children: [{ slug: "domain/bravo", relPath: "domain/bravo.domain.ts", children: [] }],
    },
  ])
})

test("a row drawn with no path gives a domain no path", () => {
  const root = scratch.rootFor("akasha-domains-drawn-")
  const row = { ...(drawnRow(root, "domain/alpha") as object), at: null }
  drawnAs(root, `${JSON.stringify({ roots: [row], unreached: [] })}\n`)

  expect(domainsDrawnIn(root)).toEqual([{ slug: "domain/alpha", relPath: null, children: [] }])
})

test("a picture that is missing or does not parse leaves the domains read fresh", () => {
  const missing = scratch.rootFor("akasha-domains-drawn-")
  const broken = scratch.rootFor("akasha-domains-drawn-")
  drawnAs(broken, "not a picture\n")

  expect(domainsDrawnIn(missing)).toEqual([])
  expect(domainsDrawnIn(broken)).toEqual([])
})

function node(slug: string, children: readonly DomainNode[] = []): DomainNode {
  return { slug, relPath: `${slug}.domain.ts`, children }
}

function hung(name: string, domain: string): Hung {
  return { key: `one/${name}`, label: `${name} is so`, at: `pages/${name}.one.ts`, domain }
}

function shape(nodes: readonly HungNode[]): readonly string[] {
  return nodes.flatMap((one) => [
    `${one.key}:${one.count}`,
    ...shape(one.children).map((line) => `  ${line}`),
  ])
}

test("a domain with nothing hung beneath it anywhere is left out", () => {
  const tree = hungOnDomains(
    [node("domain/alpha", [node("domain/bravo"), node("domain/charlie")])],
    [hung("one", "domain/bravo")]
  )
  expect(shape(tree.roots)).toEqual(["domain/alpha:1", "  domain/bravo:1", "    one/one:0"])
})

test("a tree holding nothing draws nothing", () => {
  const tree = hungOnDomains([node("domain/alpha", [node("domain/bravo")])], [])
  expect(tree.roots).toEqual([])
  expect(tree.unreached).toEqual([])
})

test("a count reaches the whole descent rather than what hangs directly", () => {
  const tree = hungOnDomains(
    [node("domain/alpha", [node("domain/bravo", [node("domain/charlie")])])],
    [hung("one", "domain/charlie"), hung("two", "domain/charlie")]
  )
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:2",
    "  domain/bravo:2",
    "    domain/charlie:2",
    "      one/one:0",
    "      one/two:0",
  ])
})

test("a count counts what hangs beneath rather than the rows beneath", () => {
  const tree = hungOnDomains(
    [node("domain/alpha", [node("domain/bravo"), node("domain/charlie")])],
    [hung("one", "domain/bravo"), hung("two", "domain/charlie")]
  )
  expect(tree.roots[0]?.count).toBe(2)
})

test("a domain's own things are drawn after the domains beneath it", () => {
  const tree = hungOnDomains(
    [node("domain/alpha", [node("domain/bravo")])],
    [hung("one", "domain/alpha"), hung("two", "domain/bravo")]
  )
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:2",
    "  domain/bravo:1",
    "    one/two:0",
    "  one/one:0",
  ])
})

test("what hangs on one domain keeps the order the caller gave it in", () => {
  const tree = hungOnDomains(
    [node("domain/alpha")],
    [hung("zulu", "domain/alpha"), hung("bravo", "domain/alpha")]
  )
  expect(shape(tree.roots)).toEqual(["domain/alpha:2", "  one/zulu:0", "  one/bravo:0"])
})

test("a thing naming a domain the nesting never reached is drawn as a root of its own", () => {
  const tree = hungOnDomains(
    [node("domain/alpha")],
    [hung("one", "domain/alpha"), hung("two", "domain/nowhere")]
  )
  expect(tree.unreached).toEqual(["domain/nowhere"])
  expect(shape(tree.roots)).toEqual([
    "domain/alpha:1",
    "  one/one:0",
    "domain/nowhere:1",
    "  one/two:0",
  ])
})

test("a thing is drawn under its own label and opens the file it names", () => {
  const tree = hungOnDomains([node("domain/alpha")], [hung("one", "domain/alpha")])
  const drawn = tree.roots[0]?.children[0]
  expect(drawn?.label).toBe("one is so")
  expect(drawn?.at).toBe("pages/one.one.ts")
})
