import { afterAll, expect, test } from "bun:test"
import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { indexIn } from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { stampKept } from "../../pages-system/indexes/index-stamp/index-stamp.module.code.ts"
import { gitIn } from "../../testing-system/gitting/gitting.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"
import { edgesInto, reachingInto } from "./graph-asking.module.code.ts"

const REPO_AT = rootOf(import.meta.dir)

const GRAPH_EDGE = "graph-edge"

const GRAPH_ATTRIBUTE = "graph-attribute"

const INDEX = "index"

const IMPORT = "import"

const RELATION = "relation"

const PROPERTY = "property"

const PART = "part-slugs"

const NAMED = "akasha/code-system/module/module.page-type.ts"

const NAMER = "akasha/pages-system/indexes/index/index.page-type.ts"

const EXTENDS = "extends-slug"

const HELD = "held"

const TREE = "akasha"

const PREFIX = "graph-asking-"

const HELD_INDEX = "held-index"

const HELD_RELATION = "held-relation"

const HELD_IMPORT = "held-import"

const EDGE_ID = "01a04ff4-0000-7000-8000-00000000000e"

const INDEX_ID = "01a04ff4-0000-7000-8000-00000000000d"

const TARGET_ID = "01a04ff4-0000-7000-8000-00000000000a"

const SOURCE_ID = "01a04ff4-0000-7000-8000-00000000000b"

const EDGE_AT = "akasha/held/held.graph-edge.ts"

const INDEX_AT = "akasha/held/held-index.index.ts"

const TARGET_AT = "akasha/held/target.page.ts"

const SOURCE_AT = "akasha/held/source.page.ts"

const SIDECAR_AT = "akasha/held/target.page.code.ts"

const INVENTED = "an index a test invented so that no name could be assumed"

const ENDING = ".ts"

const FIRST_AT = "akasha/held/first.ts"

const SECOND_AT = "akasha/held/second.ts"

const THIRD_AT = "akasha/held/third.ts"

const APART_AT = "akasha/held/apart.txt"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function paged(root: string, at: string, held: Record<string, unknown>): undefined {
  put(root, at, `export const held = ${JSON.stringify(held, null, 2)}\n`)
}

function filedAll(root: string, at: string, said: readonly Record<string, string>[]): undefined {
  put(root, `.git/data/index/${at}`, said.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

function filed(root: string, at: string, said: Record<string, string>): undefined {
  filedAll(root, at, [said])
}

function indexed(root: string, indexName: string): undefined {
  paged(root, INDEX_AT, {
    id: INDEX_ID,
    pageTypeSlug: INDEX,
    slug: HELD_INDEX,
    definition: INVENTED,
    indexName,
  })
  filed(root, `identity/${INDEX}/slug/${HELD_INDEX}.jsonl`, { path: INDEX_AT, id: INDEX_ID })
}

function edged(root: string, kind: string, held: Record<string, unknown>): undefined {
  paged(root, EDGE_AT, {
    id: EDGE_ID,
    pageTypeSlug: GRAPH_EDGE,
    slug: kind,
    definition: "an edge kind a test invented",
    indexSlug: `${INDEX}/${HELD_INDEX}`,
    ...held,
  })
  filed(root, `identity/${GRAPH_EDGE}/slug/${kind}.jsonl`, { path: EDGE_AT, id: EDGE_ID })
}

function relationWorld(lines: number): string {
  const root = scratch.rootFor(PREFIX)
  edged(root, RELATION, { attributeSlugs: [`${GRAPH_ATTRIBUTE}/${PROPERTY}`] })
  indexed(root, HELD_RELATION)
  filed(root, `path/${TARGET_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  filed(root, `path/${SIDECAR_AT}.jsonl`, { path: TARGET_AT, id: TARGET_ID })
  if (lines > 0) {
    filedAll(
      root,
      `${HELD_RELATION}/page/id/${TARGET_ID}/${PART}/${SOURCE_ID}.jsonl`,
      Array.from({ length: lines }, () => ({ path: SOURCE_AT }))
    )
  }
  return root
}

function stoodUp(indexName: string): string {
  const root = scratch.rootFor(PREFIX)
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", HELD])
  gitIn(root, ["config", "user.name", HELD])
  put(root, HELD, `${HELD}\n`)
  gitIn(root, ["add", "--", HELD])
  gitIn(root, ["commit", "--quiet", "-m", HELD, "--", HELD])
  stampKept(indexIn(root), {
    commit: gitIn(root, ["rev-parse", "HEAD"]).trim(),
    tree: TREE,
    settled: [],
  })
  edged(root, IMPORT, {})
  indexed(root, indexName)
  return root
}

function importWorld(indexName: string): string {
  const root = stoodUp(indexName)
  filed(root, `${IMPORT}/path/${TARGET_AT}.jsonl`, { path: SOURCE_AT })
  return root
}

function reachingWorld(reaching: Readonly<Record<string, readonly string[]>>): string {
  const root = stoodUp(IMPORT)
  for (const [into, from] of Object.entries(reaching)) {
    filedAll(
      root,
      `${IMPORT}/path/${into}.jsonl`,
      from.map((one) => ({ path: one }))
    )
  }
  return root
}

test("an empty kind list answers nothing", () => {
  expect(edgesInto(REPO_AT, NAMED, [])).toEqual([])
})

test("the folder a relation is read from is the one the edge kind's index page names", () => {
  const root = relationWorld(1)

  expect(edgesInto(root, TARGET_AT, [RELATION])).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a file is answered with every file importing it", () => {
  const root = importWorld(IMPORT)

  expect(edgesInto(root, TARGET_AT, [IMPORT])).toEqual([
    { kind: IMPORT, from: SOURCE_AT, to: TARGET_AT, attrs: {} },
  ])
})

test("a sidecar is answered with what names the page whose file it is, and names that page", () => {
  const root = relationWorld(1)

  expect(edgesInto(root, SIDECAR_AT, [RELATION])).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a leaf holding one path twice is answered with one edge rather than two", () => {
  const root = relationWorld(2)

  expect(edgesInto(root, TARGET_AT, [RELATION])).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("an index the answer needs, gone, is answered with nothing rather than refused", () => {
  const stands = relationWorld(1)
  const gone = relationWorld(0)

  expect(edgesInto(stands, TARGET_AT, [RELATION])).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(edgesInto(gone, TARGET_AT, [RELATION])).toEqual([])
})

test("what imports a file is read from the import index, whatever folder the edge page names", () => {
  const root = importWorld(HELD_IMPORT)

  expect(edgesInto(root, TARGET_AT, [IMPORT])).toEqual([
    { kind: IMPORT, from: SOURCE_AT, to: TARGET_AT, attrs: {} },
  ])
})

test("a kind no edge page carries is refused rather than answered with nothing", () => {
  const root = relationWorld(1)

  expect(() => edgesInto(root, TARGET_AT, [HELD])).toThrow(/`held`.*could not be answered/)
})

test("a page the corpus names is answered with every page naming it, and through what", () => {
  const found = edgesInto(REPO_AT, NAMED, [RELATION])

  expect(found.length).toBeGreaterThan(0)
  expect(found.every((one) => one.kind === RELATION && one.to === NAMED)).toBe(true)
  expect(found.every((one) => typeof one.attrs[PROPERTY] === "string")).toBe(true)
  expect(found).toContainEqual({
    kind: RELATION,
    from: NAMER,
    to: NAMED,
    attrs: { [PROPERTY]: EXTENDS },
  })
})

test("a file three deep in what imports it is reached, so the closure closes", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })

  expect(reachingInto(root, [FIRST_AT], [IMPORT])).toEqual([FIRST_AT, SECOND_AT, THIRD_AT])
})

test("a cycle is walked once, so an answer comes back rather than a run that does not end", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [FIRST_AT] })

  expect(reachingInto(root, [FIRST_AT], [IMPORT])).toEqual([FIRST_AT, SECOND_AT])
})

test("a node the predicate turns away is left out, and what stands behind it is not reached", () => {
  const root = reachingWorld({ [FIRST_AT]: [APART_AT], [APART_AT]: [THIRD_AT] })

  const kept = reachingInto(root, [FIRST_AT], [IMPORT], (one) => one.endsWith(ENDING))

  expect(kept).toEqual([FIRST_AT])
  expect(reachingInto(root, [FIRST_AT], [IMPORT])).toEqual([APART_AT, FIRST_AT, THIRD_AT])
})

test("a seed is part of the answer, and a seed the predicate turns away is none of it", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })

  const kept = reachingInto(root, [FIRST_AT, APART_AT], [IMPORT], (one) => one.endsWith(ENDING))

  expect(reachingInto(root, [SECOND_AT], [IMPORT])).toEqual([SECOND_AT])
  expect(kept).toEqual([FIRST_AT, SECOND_AT])
})
