import { afterAll, expect, test } from "bun:test"
import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import { edgesInto, reachingInto } from "./graph-asking.module.code.ts"
import {
  APART_AT,
  AT_INDEX,
  DECLARED,
  EDGE_AT,
  EDGE_ID,
  edgeStandsAt,
  FIRST_AT,
  filed,
  HELD,
  HELD_LOADER,
  IMPORT,
  IMPORT_EDGE,
  INDEX_AT,
  INDEX_ID,
  INDEX_STANDS_AT,
  importWorld,
  KNOWN,
  LEAF_AT,
  LOADED_AT,
  LOADED_CODE_AT,
  LOADER_AT,
  LOADER_CODE_AT,
  LOADER_ID,
  laidOver,
  loadingWorld,
  MODULE,
  MODULE_TYPE_AT,
  MODULE_TYPE_ID,
  PAGE_TYPE,
  PART,
  PROPERTY,
  paged,
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
  TYPE_ID,
  TYPE_STANDS_AT,
} from "./graph-asking.module.test-fixtures.ts"

const REPO_AT = rootOf(import.meta.dir)

const NAMED = "akasha/code-system/module/module.page-type.ts"

const NAMER = "akasha/pages-system/indexes/index/index.page-type.ts"

const EXTENDS = "extends-slug"

const ENDING = ".ts"

const CHECK_AT = "akasha/checks-system/check/typecheck/typecheck.check.ts"

const CHECK_CODE_AT = "akasha/checks-system/check/typecheck/typecheck.check.code.ts"

const CHECKING_AT = "akasha/checks-system/checking/checking.module.code.ts"

afterAll(scratch.sweep)

test("an empty kind list answers nothing", () => {
  expect(edgesInto(REPO_AT, NAMED, [])).toEqual([])
})

test("the folder a relation is read from is the one the edge kind's index page names", () => {
  const root = relationWorld(1)

  expect(edgesInto(root, TARGET_AT, [RELATION])).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a file is answered with every file importing it, and each says the index knew it", () => {
  const root = importWorld(IMPORT)

  expect(edgesInto(root, TARGET_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: AT_INDEX } },
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

test("a page is answered with the code its page type says loads it, beside what imports it", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)

  expect(edgesInto(root, LOADED_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: LOADER_CODE_AT, to: LOADED_AT, attrs: { [KNOWN]: DECLARED } },
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a file beside a page is answered with the same loader, one declaration covering both", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)

  expect(edgesInto(root, LOADED_CODE_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: LOADER_CODE_AT, to: LOADED_CODE_AT, attrs: { [KNOWN]: DECLARED } },
  ])
})

test("a page type saying nothing loads it is answered with what imports it and nothing more", () => {
  const root = loadingWorld(null)

  expect(edgesInto(root, LOADED_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a loader whose own code is asked for is not answered with an edge to itself", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)
  paged(root, MODULE_TYPE_AT, {
    id: MODULE_TYPE_ID,
    pageTypeSlug: PAGE_TYPE,
    slug: MODULE,
    definition: "the module page type a test invented",
    loadedBySlug: `${MODULE}/${HELD_LOADER}`,
  })
  filed(root, `identity/${PAGE_TYPE}/slug/${MODULE}.jsonl`, {
    path: MODULE_TYPE_AT,
    id: MODULE_TYPE_ID,
  })
  filed(root, `path/${LOADER_CODE_AT}.jsonl`, { path: LOADER_AT, id: LOADER_ID })

  expect(edgesInto(root, LOADER_CODE_AT, [IMPORT_EDGE])).toEqual([])
})

test("a check page in the corpus is answered with the module that loads it, and so is its code", () => {
  const page = edgesInto(REPO_AT, CHECK_AT, [IMPORT_EDGE])
  const code = edgesInto(REPO_AT, CHECK_CODE_AT, [IMPORT_EDGE])

  expect(page).toContainEqual({
    kind: IMPORT_EDGE,
    from: CHECKING_AT,
    to: CHECK_AT,
    attrs: { [KNOWN]: DECLARED },
  })
  expect(code).toContainEqual({
    kind: IMPORT_EDGE,
    from: CHECKING_AT,
    to: CHECK_CODE_AT,
    attrs: { [KNOWN]: DECLARED },
  })
})

test("an import edge standing only in the reading given is answered, and none without it", () => {
  const root = importWorld(IMPORT)
  const over = laidOver(root, { [`${IMPORT}/path/${FIRST_AT}.jsonl`]: [{ path: SECOND_AT }] })

  expect(edgesInto(root, FIRST_AT, [IMPORT_EDGE], over)).toEqual([
    { kind: IMPORT_EDGE, from: SECOND_AT, to: FIRST_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
  expect(edgesInto(root, FIRST_AT, [IMPORT_EDGE])).toEqual([])
})

test("an import edge the reading given empties is not answered, and stands without it", () => {
  const root = importWorld(IMPORT)
  filed(root, `${IMPORT}/path/${FIRST_AT}.jsonl`, { path: THIRD_AT })
  const over = laidOver(root, { [`${IMPORT}/path/${TARGET_AT}.jsonl`]: [] })

  expect(edgesInto(root, TARGET_AT, [IMPORT_EDGE], over)).toEqual([])
  expect(edgesInto(root, TARGET_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("a relation edge standing only in the reading given is answered, and none without it", () => {
  const root = relationWorld(0)
  const over = laidOver(root, { [LEAF_AT]: [{ path: SOURCE_AT }] })

  expect(edgesInto(root, TARGET_AT, [RELATION], over)).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(edgesInto(root, TARGET_AT, [RELATION])).toEqual([])
})

test("a page type standing only in the reading given answers the code it says loads a page", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`, false)
  const over = laidOver(root, { [TYPE_STANDS_AT]: [{ path: TYPE_AT, id: TYPE_ID }] })

  expect(edgesInto(root, LOADED_AT, [IMPORT_EDGE], over)).toEqual([
    { kind: IMPORT_EDGE, from: LOADER_CODE_AT, to: LOADED_AT, attrs: { [KNOWN]: DECLARED } },
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
  expect(edgesInto(root, LOADED_AT, [IMPORT_EDGE])).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: AT_INDEX } },
  ])
})

test("an edge kind's own pages, standing only in the reading given, still answer it", () => {
  const root = relationWorld(1, false)
  const over = laidOver(root, {
    [edgeStandsAt(RELATION)]: [{ path: EDGE_AT, id: EDGE_ID }],
    [INDEX_STANDS_AT]: [{ path: INDEX_AT, id: INDEX_ID }],
  })

  expect(edgesInto(root, TARGET_AT, [RELATION], over)).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(() => edgesInto(root, TARGET_AT, [RELATION])).toThrow(/`relation`.*could not be answered/)
})

test("a file three deep in what imports it is reached, so the closure closes", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })

  expect(reachingInto(root, [FIRST_AT], [IMPORT_EDGE])).toEqual([FIRST_AT, SECOND_AT, THIRD_AT])
})

test("a cycle is walked once, so an answer comes back rather than a run that does not end", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [FIRST_AT] })

  expect(reachingInto(root, [FIRST_AT], [IMPORT_EDGE])).toEqual([FIRST_AT, SECOND_AT])
})

test("a node the predicate turns away is left out, and what stands behind it is not reached", () => {
  const root = reachingWorld({ [FIRST_AT]: [APART_AT], [APART_AT]: [THIRD_AT] })

  const kept = reachingInto(root, [FIRST_AT], [IMPORT_EDGE], (one) => one.endsWith(ENDING))

  expect(kept).toEqual([FIRST_AT])
  expect(reachingInto(root, [FIRST_AT], [IMPORT_EDGE])).toEqual([APART_AT, FIRST_AT, THIRD_AT])
})

test("a seed is part of the answer, and a seed the predicate turns away is none of it", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })

  const kept = reachingInto(root, [FIRST_AT, APART_AT], [IMPORT_EDGE], (one) =>
    one.endsWith(ENDING)
  )

  expect(reachingInto(root, [SECOND_AT], [IMPORT_EDGE])).toEqual([SECOND_AT])
  expect(kept).toEqual([FIRST_AT, SECOND_AT])
})

test("a closure walks the edges the reading it was given answers, and none it does not", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const over = laidOver(root, { [`${IMPORT}/path/${SECOND_AT}.jsonl`]: [{ path: THIRD_AT }] })
  const every = [FIRST_AT, SECOND_AT, THIRD_AT]

  expect(reachingInto(root, [FIRST_AT], [IMPORT_EDGE], () => true, over)).toEqual(every)
  expect(reachingInto(root, [FIRST_AT], [IMPORT_EDGE])).toEqual([FIRST_AT, SECOND_AT])
})
