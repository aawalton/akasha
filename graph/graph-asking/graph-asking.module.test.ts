import { afterAll, expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { readingIn } from "@akasha/indexes"
import { type Answering, answeringOver, type PageOf } from "@akasha/indexes/answering"
import type { Reading } from "@akasha/indexes/shape"
import { readingLaidOver } from "@akasha/indexes/testing"
import { valueAt } from "@akasha/pages-system/page-value"
import { edgesInto, reachingInto } from "./graph-asking.module.code.ts"
import {
  APART_AT,
  AT_INDEX,
  EDGE_AT,
  EDGE_ID,
  edgeFiledAt,
  FIRST_AT,
  filed,
  HELD,
  HELD_LOADER,
  IMPORT,
  IMPORT_EDGE,
  INDEX_AT,
  INDEX_FILED_AT,
  INDEX_ID,
  importWorld,
  KNOWN,
  LEAF_AT,
  LOADED_AT,
  LOADED_BY,
  LOADED_CODE_AT,
  LOADER_AT,
  loaderWorld,
  loadingWorld,
  MODULE,
  PART,
  PROPERTY,
  RELATION,
  reachingWorld,
  relationWorld,
  SECOND_AT,
  SIDECAR_AT,
  SOURCE_AT,
  scratch,
  TARGET_AT,
  THIRD_AT,
  TYPE_AT,
} from "./graph-asking.module.test-fixtures.ts"

const REPO_AT = rootOf(import.meta.dir)

const NAMED = "akasha/code-system/modules/module.page-type.ts"

const NAMER = "akasha/pages-system/indexes/index/index.page-type.ts"

const EXTENDS = "extends-slug"

const ENDING = ".ts"

afterAll(scratch.sweep)

function bodiesIn(root: string): PageOf {
  return (path) => valueAt(path, root)
}

function indexOver(root: string, reading: Reading, pageOf: PageOf): Answering {
  return answeringOver(reading, root, pageOf)
}

function indexOf(root: string): Answering {
  return indexOver(root, readingIn(root), bodiesIn(root))
}

test("an empty kind list answers nothing", () => {
  expect(edgesInto(NAMED, [], indexOf(REPO_AT))).toEqual([])
})

test("the folder a relation is read from is the one the edge kind's index page names", () => {
  const root = relationWorld(1)

  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a file is answered with every file importing it, and each says the index knew it", () => {
  const root = importWorld(IMPORT)

  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a sidecar is answered with what names the page whose file it is, and names that page", () => {
  const root = relationWorld(1)

  expect(edgesInto(SIDECAR_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a leaf holding one path twice is answered with one edge rather than two", () => {
  const root = relationWorld(2)

  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("an index the answer needs, gone, is answered with nothing rather than refused", () => {
  const withEdge = relationWorld(1)
  const gone = relationWorld(0)

  expect(edgesInto(TARGET_AT, [RELATION], indexOf(withEdge))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(edgesInto(TARGET_AT, [RELATION], indexOf(gone))).toEqual([])
})

test("a kind no edge page carries is refused rather than answered with nothing", () => {
  const root = relationWorld(1)

  expect(() => edgesInto(TARGET_AT, [HELD], indexOf(root))).toThrow(/`held`.*could not be answered/)
})

test("a page the index names is answered with every page naming it, and through what", () => {
  const found = edgesInto(NAMED, [RELATION], indexOf(REPO_AT))

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

test("a page is answered with what imports it and never with the code that loads it", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)

  expect(edgesInto(LOADED_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a file beside a page is answered with nothing where nothing imports it", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)

  expect(edgesInto(LOADED_CODE_AT, [IMPORT_EDGE], indexOf(root))).toEqual([])
})

test("a page type stating a loader is answered no differently from one stating none", () => {
  const stated = loadingWorld(`${MODULE}/${HELD_LOADER}`)
  const none = loadingWorld(null)

  expect(edgesInto(LOADED_AT, [IMPORT_EDGE], indexOf(stated))).toEqual(
    edgesInto(LOADED_AT, [IMPORT_EDGE], indexOf(none))
  )
})

test("an import edge standing only in the index given is answered, and none without it", () => {
  const root = importWorld(IMPORT)
  const over = readingLaidOver(root, {
    [`${IMPORT}/path/${FIRST_AT}.jsonl`]: [{ path: SECOND_AT }],
  })

  expect(edgesInto(FIRST_AT, [IMPORT_EDGE], indexOver(root, over, bodiesIn(root)))).toEqual([
    { kind: IMPORT_EDGE, from: SECOND_AT, to: FIRST_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
  expect(edgesInto(FIRST_AT, [IMPORT_EDGE], indexOf(root))).toEqual([])
})

test("an import edge the index given empties is not answered, and stands without it", () => {
  const root = importWorld(IMPORT)
  filed(root, `${IMPORT}/path/${FIRST_AT}.jsonl`, { path: THIRD_AT })
  const over = readingLaidOver(root, { [`${IMPORT}/path/${TARGET_AT}.jsonl`]: [] })

  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOver(root, over, bodiesIn(root)))).toEqual([])
  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a relation edge standing only in the index given is answered, and none without it", () => {
  const root = relationWorld(0)
  const over = readingLaidOver(root, { [LEAF_AT]: [{ path: SOURCE_AT }] })

  expect(edgesInto(TARGET_AT, [RELATION], indexOver(root, over, bodiesIn(root)))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([])
})

test("an edge kind's own pages, standing only in the index given, still answer it", () => {
  const root = relationWorld(1, false)
  const over = readingLaidOver(root, {
    [edgeFiledAt(RELATION)]: [{ path: EDGE_AT, id: EDGE_ID }],
    [INDEX_FILED_AT]: [{ path: INDEX_AT, id: INDEX_ID }],
  })

  expect(edgesInto(TARGET_AT, [RELATION], indexOver(root, over, bodiesIn(root)))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(() => edgesInto(TARGET_AT, [RELATION], indexOf(root))).toThrow(
    /`relation`.*could not be answered/
  )
})

test("a file three deep in what imports it is reached, so the closure closes", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })

  expect(reachingInto([FIRST_AT], [IMPORT_EDGE], indexOf(root))).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
})

test("a cycle is walked once, so an answer comes back rather than a run that does not end", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [FIRST_AT] })

  expect(reachingInto([FIRST_AT], [IMPORT_EDGE], indexOf(root))).toEqual([FIRST_AT, SECOND_AT])
})

test("a node the predicate turns away is left out, and what stands behind it is not reached", () => {
  const root = reachingWorld({ [FIRST_AT]: [APART_AT], [APART_AT]: [THIRD_AT] })

  const kept = reachingInto([FIRST_AT], [IMPORT_EDGE], indexOf(root), (one) => one.endsWith(ENDING))

  expect(kept).toEqual([FIRST_AT])
  expect(reachingInto([FIRST_AT], [IMPORT_EDGE], indexOf(root))).toEqual([
    APART_AT,
    FIRST_AT,
    THIRD_AT,
  ])
})

test("a seed is part of the answer, and a seed the predicate turns away is none of it", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })

  const kept = reachingInto([FIRST_AT, APART_AT], [IMPORT_EDGE], indexOf(root), (one) =>
    one.endsWith(ENDING)
  )

  expect(reachingInto([SECOND_AT], [IMPORT_EDGE], indexOf(root))).toEqual([SECOND_AT])
  expect(kept).toEqual([FIRST_AT, SECOND_AT])
})

test("a closure walks the edges the index it was given answers, and none it does not", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const over = readingLaidOver(root, {
    [`${IMPORT}/path/${SECOND_AT}.jsonl`]: [{ path: THIRD_AT }],
  })
  const every = [FIRST_AT, SECOND_AT, THIRD_AT]

  expect(
    reachingInto([FIRST_AT], [IMPORT_EDGE], indexOver(root, over, bodiesIn(root)), () => true)
  ).toEqual(every)
  expect(reachingInto([FIRST_AT], [IMPORT_EDGE], indexOf(root))).toEqual([FIRST_AT, SECOND_AT])
})

test("a module a page type names as its loader is answered with the pages of that type", () => {
  const root = loaderWorld()

  expect(edgesInto(LOADER_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: TYPE_AT, to: LOADER_AT, attrs: { [PROPERTY]: LOADED_BY } },
    { kind: RELATION, from: LOADED_AT, to: LOADER_AT, attrs: { [PROPERTY]: LOADED_BY } },
  ])
})

test("a module no page type names as its loader is answered with no page of any type", () => {
  const root = loaderWorld(false)

  expect(edgesInto(LOADER_AT, [RELATION], indexOf(root))).toEqual([])
})
