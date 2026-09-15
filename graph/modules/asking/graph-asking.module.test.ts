import { afterAll, expect, test } from "bun:test"
import { relative } from "node:path"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { edgesInto, edgesOutOver } from "akasha/graph/modules/asking/graph-asking.module.code.ts"
import {
  APART_AT,
  BY_DECLARATION,
  BY_REFERENCE,
  bodiesIn,
  EDGE_AT,
  EDGE_ID,
  edgeFiledAt,
  FIRST_AT,
  HELD,
  HELD_LOADER,
  IMPORT_EDGE,
  importsBeside,
  importsFiled,
  importWorld,
  indexOf,
  indexOver,
  KNOWN,
  LOADED_AT,
  LOADED_BY,
  LOADED_CODE_AT,
  LOADER_AT,
  loaderWorld,
  loadingWorld,
  MODULE,
  NAMES,
  NAMES_CODE,
  NAMES_TYPE,
  namedBeside,
  namingBody,
  PART,
  PROPERTY,
  RELATION,
  relationWorld,
  SECOND_AT,
  SIDECAR_AT,
  SOURCE_AT,
  SOURCE_ID,
  scratch,
  TARGET_AT,
  THIRD_AT,
  TYPE_AT,
  typingBody,
} from "akasha/graph/modules/asking/graph-asking.module.test-fixtures.ts"
import { readingLaidOver } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"

const REPO_AT = rootOf(import.meta.dir)

const NAMED = relative(REPO_AT, import.meta.path).replace(".module.test.ts", ".module.ts")

afterAll(scratch.sweep)

test("an empty kind list answers nothing", () => {
  expect(edgesInto(NAMED, [], indexOf(REPO_AT))).toEqual([])
})

test("a relation coming in is read from the file beside the page reached", () => {
  const root = relationWorld(1)

  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a file is answered with every file importing it, and each says a reference knew it", () => {
  const root = importWorld()

  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: BY_REFERENCE } },
  ])
})

test("a sidecar is answered with what names the page whose file it is, and names that page", () => {
  const root = relationWorld(1)

  expect(edgesInto(SIDECAR_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a page referenced twice the same way is answered with one edge rather than two", () => {
  const root = relationWorld(2)

  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
})

test("a reference the answer needs, gone, is answered with nothing rather than refused", () => {
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
})

test("a page is answered with what imports it and never with the code that loads it", () => {
  const root = loadingWorld(`${MODULE}/${HELD_LOADER}`)

  expect(edgesInto(LOADED_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: LOADED_AT, attrs: { [KNOWN]: BY_REFERENCE } },
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

test("an import edge existing only in the index given is answered, and none without it", () => {
  const root = importWorld()
  const over = readingLaidOver(root, {}, importsBeside(root, FIRST_AT, [SECOND_AT]))

  expect(edgesInto(FIRST_AT, [IMPORT_EDGE], indexOver(over, bodiesIn(root)))).toEqual([
    { kind: IMPORT_EDGE, from: SECOND_AT, to: FIRST_AT, attrs: { [KNOWN]: BY_REFERENCE } },
  ])
  expect(edgesInto(FIRST_AT, [IMPORT_EDGE], indexOf(root))).toEqual([])
})

test("an import edge the index given empties is not answered, and exists without it", () => {
  const root = importWorld()
  importsFiled(root, FIRST_AT, [THIRD_AT])
  const over = readingLaidOver(root, {}, importsBeside(root, TARGET_AT, []))

  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOver(over, bodiesIn(root)))).toEqual([])
  expect(edgesInto(TARGET_AT, [IMPORT_EDGE], indexOf(root))).toEqual([
    { kind: IMPORT_EDGE, from: SOURCE_AT, to: TARGET_AT, attrs: { [KNOWN]: BY_REFERENCE } },
  ])
})

test("a relation edge existing only in the index given is answered, and none without it", () => {
  const root = relationWorld(0)
  const over = readingLaidOver(root, {}, namedBeside(TARGET_AT, PART, SOURCE_AT, SOURCE_ID))

  expect(edgesInto(TARGET_AT, [RELATION], indexOver(over, bodiesIn(root)))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(edgesInto(TARGET_AT, [RELATION], indexOf(root))).toEqual([])
})

test("an edge kind's own page, existing only in the index given, still answers it", () => {
  const root = relationWorld(1, false)
  const over = readingLaidOver(root, {
    [edgeFiledAt(RELATION)]: [{ path: EDGE_AT, id: EDGE_ID }],
  })

  expect(edgesInto(TARGET_AT, [RELATION], indexOver(over, bodiesIn(root)))).toEqual([
    { kind: RELATION, from: SOURCE_AT, to: TARGET_AT, attrs: { [PROPERTY]: PART } },
  ])
  expect(() => edgesInto(TARGET_AT, [RELATION], indexOf(root))).toThrow(
    /`relation`.*could not be answered/
  )
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

test("an empty kind list answers nothing going out", () => {
  const root = importWorld()

  expect(edgesOutOver([], indexOf(root), filesOf({}))(FIRST_AT)).toEqual([])
})

test("a file is answered with what its own body names, and each says a declaration knew it", () => {
  const root = importWorld()
  const bodies = filesOf({ [FIRST_AT]: namingBody("./second.page.ts") })

  expect(edgesOutOver([IMPORT_EDGE], indexOf(root), bodies)(FIRST_AT)).toEqual([
    {
      kind: IMPORT_EDGE,
      from: FIRST_AT,
      to: SECOND_AT,
      attrs: { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_CODE },
    },
  ])
})

test("an edge going out of a body naming only a type says that edge names a type", () => {
  const root = importWorld()
  const bodies = filesOf({ [FIRST_AT]: typingBody("./second.page.ts") })

  expect(edgesOutOver([IMPORT_EDGE], indexOf(root), bodies)(FIRST_AT)).toEqual([
    {
      kind: IMPORT_EDGE,
      from: FIRST_AT,
      to: SECOND_AT,
      attrs: { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_TYPE },
    },
  ])
})

test("an edge kind carrying none of an attribute read off it is refused", () => {
  const root = importWorld([KNOWN])
  const bodies = filesOf({ [FIRST_AT]: namingBody("./second.page.ts") })

  expect(() => edgesOutOver([IMPORT_EDGE], indexOf(root), bodies)(FIRST_AT)).toThrow(
    /carries no `names` attribute/
  )
})

test("a file the reader of bodies answers nothing for is answered with no edge going out", () => {
  const root = importWorld()

  expect(edgesOutOver([IMPORT_EDGE], indexOf(root), filesOf({}))(FIRST_AT)).toEqual([])
})

test("a kind not yet read out of a node is refused rather than answered with nothing", () => {
  const root = relationWorld(1)

  expect(() => edgesOutOver([RELATION], indexOf(root), filesOf({}))(TARGET_AT)).toThrow(
    /`relation`.*could not be answered/
  )
})

test("one step going out reads each body once for every file that step is asked about", () => {
  const root = importWorld()
  const read: string[] = []
  const bodies = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./third.page.ts"),
  })
  const stepping = edgesOutOver([IMPORT_EDGE], indexOf(root), (path) => {
    read.push(path)
    return bodies(path)
  })

  expect(stepping(FIRST_AT).map((edge) => edge.to)).toEqual([SECOND_AT])
  expect(stepping(SECOND_AT).map((edge) => edge.to)).toEqual([THIRD_AT])
  expect(read).toEqual([FIRST_AT, SECOND_AT])
})

test("a file TypeScript does not parse is answered with no edge read out of it", () => {
  const root = importWorld()
  const bodies = filesOf({
    [FIRST_AT]: namingBody("./apart.page.txt"),
    [APART_AT]: namingBody("./third.page.ts"),
  })

  expect(edgesOutOver([IMPORT_EDGE], indexOf(root), bodies)(APART_AT)).toEqual([])
})
