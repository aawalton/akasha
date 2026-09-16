import { afterAll, expect, test } from "bun:test"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  APART_AT,
  AT_LOAD,
  BY_DECLARATION,
  BY_REFERENCE,
  bodiesIn,
  callingBody,
  FIRST_AT,
  IMPORT_EDGE,
  importsBeside,
  importWorld,
  indexOf,
  indexOver,
  KNOWN,
  LOADING,
  NAMES,
  NAMES_CODE,
  NAMES_TYPE,
  namingBody,
  reachingWorld,
  SECOND_AT,
  scratch,
  THIRD_AT,
  typingBody,
} from "akasha/graph/modules/asking/graph-asking.module.test-fixtures.ts"
import {
  closureOf,
  takenIn,
} from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { atLoadImports } from "akasha/graph/predicate/pages/at-load-imports/at-load-imports.graph-predicate.ts"
import { codeImports } from "akasha/graph/predicate/pages/code-imports/code-imports.graph-predicate.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import { readingLaidOver } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowOnto } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ENDING = ".ts"

const NEAR_AT = "akasha/held/near.page.ts"

const SIDEWAYS = { ...imports, direction: "sideways" }

const DECLARED = { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_CODE, [LOADING]: AT_LOAD }

const CODE_IMPORTERS = { ...importers, follows: codeImports.follows }

const EITHER_NAME = [
  { attribute: "graph-attribute/names", value: NAMES_CODE },
  { attribute: "graph-attribute/names", value: NAMES_TYPE },
]

const EITHER_IMPORTS = { ...imports, follows: EITHER_NAME }

const EITHER_IMPORTERS = { ...importers, follows: EITHER_NAME }

const writing = new TextEncoder()

afterAll(scratch.sweep)

function changeAdding(root: string, at: string, body: string): Change {
  return {
    root,
    changed: [at],
    before: () => null,
    after: (path) => (path === at ? writing.encode(body) : null),
  }
}

test("a predicate followed out answers what the seeds reach through the bodies handed in", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./third.page.ts"),
  })

  expect(closureOf(imports, [FIRST_AT], { index: indexOf(root), bodyAt })).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
})

test("a predicate following one attribute value takes in only the edges carrying it", () => {
  const root = importWorld()
  const index = indexOf(root)
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts") + typingBody("./third.page.ts"),
  })

  expect(closureOf(codeImports, [FIRST_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT])
  expect(closureOf(imports, [FIRST_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT, THIRD_AT])
})

test("an edge carrying none of an attribute a predicate follows is refused", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })

  expect(() => closureOf(CODE_IMPORTERS, [FIRST_AT], { index: indexOf(root) })).toThrow(
    /carries no `names`/
  )
})

test("a predicate following two values of one attribute takes in an edge carrying either", () => {
  const root = importWorld()
  const index = indexOf(root)
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts") + typingBody("./third.page.ts"),
  })

  expect(closureOf(EITHER_IMPORTS, [FIRST_AT], { index, bodyAt })).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
  expect(closureOf(codeImports, [FIRST_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT])
})

test("a predicate following two attributes takes in only an edge carrying both", () => {
  const root = importWorld()
  const index = indexOf(root)
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts") + callingBody("./third.page.ts"),
  })

  expect(closureOf(atLoadImports, [FIRST_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT])
  expect(closureOf(codeImports, [FIRST_AT], { index, bodyAt })).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
})

test("an edge carrying none of an attribute two values are followed for is refused", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })

  expect(() => closureOf(EITHER_IMPORTERS, [FIRST_AT], { index: indexOf(root) })).toThrow(
    /carries no `names`/
  )
})

test("a predicate followed in answers what reaches the seeds, and reads no body", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })

  expect(closureOf(importers, [FIRST_AT], { index: indexOf(root) })).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
})

test("one ask answers the same pair of files both ways, the predicate saying which way", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const index = indexOf(root)
  const bodyAt = filesOf({ [SECOND_AT]: namingBody("./first.page.ts") })

  expect(closureOf(importers, [FIRST_AT], { index })).toEqual([FIRST_AT, SECOND_AT])
  expect(closureOf(imports, [SECOND_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT])
})

test("an ask handing in no gate takes in every node it reaches", () => {
  const root = reachingWorld({ [FIRST_AT]: [APART_AT], [APART_AT]: [THIRD_AT] })

  expect(closureOf(importers, [FIRST_AT], { index: indexOf(root) })).toEqual([
    APART_AT,
    FIRST_AT,
    THIRD_AT,
  ])
})

test("a node the gate turns away is left out, and what is behind it is not reached", () => {
  const root = reachingWorld({ [FIRST_AT]: [APART_AT], [APART_AT]: [THIRD_AT] })
  const through = (one: string): boolean => one.endsWith(ENDING)

  expect(closureOf(importers, [FIRST_AT], { index: indexOf(root), through })).toEqual([FIRST_AT])
})

test("a predicate followed out is refused where the ask hands in no reader of bodies", () => {
  const root = importWorld()

  expect(() => closureOf(imports, [FIRST_AT], { index: indexOf(root) })).toThrow(
    /`imports`.*hands in no reader of bodies/
  )
})

test("a predicate followed neither in nor out is refused rather than answered one way", () => {
  const root = importWorld()

  expect(() => closureOf(SIDEWAYS, [FIRST_AT], { index: indexOf(root) })).toThrow(
    /`imports`.*`sideways`/
  )
})

test("a cycle coming in is closed once, so an answer comes back rather than a run without end", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [FIRST_AT] })

  expect(closureOf(importers, [FIRST_AT], { index: indexOf(root) })).toEqual([FIRST_AT, SECOND_AT])
})

test("a cycle going out is closed once, so an answer comes back rather than a run without end", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./first.page.ts"),
  })

  expect(closureOf(imports, [FIRST_AT], { index: indexOf(root), bodyAt })).toEqual([
    FIRST_AT,
    SECOND_AT,
  ])
})

test("a seed the gate turns away is none of the closure, and one it takes in is part of it", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const index = indexOf(root)
  const through = (one: string): boolean => one.endsWith(ENDING)

  expect(closureOf(importers, [FIRST_AT, APART_AT], { index, through })).toEqual([
    FIRST_AT,
    SECOND_AT,
  ])
  expect(closureOf(importers, [SECOND_AT], { index })).toEqual([SECOND_AT])
})

test("a node the gate turns away going out is left out, and what is behind it is not reached", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./apart.page.txt"),
    [APART_AT]: namingBody("./third.page.ts"),
  })
  const through = (one: string): boolean => one.endsWith(ENDING)

  expect(closureOf(imports, [FIRST_AT], { index: indexOf(root), bodyAt, through })).toEqual([
    FIRST_AT,
  ])
})

test("a closure going out reads the bodies handed in rather than the bodies beneath them", () => {
  const root = importWorld()
  const index = indexOf(root)
  const bodyAt = filesOf({ [FIRST_AT]: namingBody("./second.page.ts") })

  expect(closureOf(imports, [FIRST_AT], { index, bodyAt })).toEqual([FIRST_AT, SECOND_AT])
  expect(closureOf(imports, [FIRST_AT], { index, bodyAt: () => null })).toEqual([FIRST_AT])
})

test("a file TypeScript does not parse is reached going out and nothing is read out of it", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./apart.page.txt"),
    [APART_AT]: namingBody("./third.page.ts"),
  })

  expect(closureOf(imports, [FIRST_AT], { index: indexOf(root), bodyAt })).toEqual([
    APART_AT,
    FIRST_AT,
  ])
})

test("a closure follows the edges the index handed in answers, and none it does not", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const over = readingLaidOver(root, {}, importsBeside(root, SECOND_AT, [THIRD_AT]))

  expect(closureOf(importers, [FIRST_AT], { index: indexOver(over, bodiesIn(root)) })).toEqual([
    FIRST_AT,
    SECOND_AT,
    THIRD_AT,
  ])
  expect(closureOf(importers, [FIRST_AT], { index: indexOf(root) })).toEqual([FIRST_AT, SECOND_AT])
})

test("a closure answers over the shadow a change leaves as well as over the tree there is", () => {
  const root = importWorld()
  const cast = shadowOnto(null, changeAdding(root, FIRST_AT, namingBody("./second.page.ts")))
  if ("refused" in cast) throw new Error(cast.refused)
  const over = { index: cast.shadow.index, bodyAt: (path: string) => cast.reading.read(path) }

  expect(closureOf(imports, [FIRST_AT], over)).toEqual([FIRST_AT, SECOND_AT])
  expect(closureOf(imports, [FIRST_AT], { index: indexOf(root), bodyAt: () => null })).toEqual([
    FIRST_AT,
  ])
})

test("an ask answers the edges a closure took in as well as the nodes", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./third.page.ts"),
  })
  const taken = takenIn(imports, [FIRST_AT], { index: indexOf(root), bodyAt })

  expect(taken.nodes).toEqual([FIRST_AT, SECOND_AT, THIRD_AT])
  expect(taken.edges).toEqual([
    { kind: IMPORT_EDGE, from: FIRST_AT, to: SECOND_AT, attrs: DECLARED },
    { kind: IMPORT_EDGE, from: SECOND_AT, to: THIRD_AT, attrs: DECLARED },
  ])
})

test("an edge over a body naming only a type says that edge names a type", () => {
  const root = importWorld()
  const bodyAt = filesOf({ [FIRST_AT]: typingBody("./second.page.ts") })
  const taken = takenIn(imports, [FIRST_AT], { index: indexOf(root), bodyAt })

  expect(taken.edges).toEqual([
    {
      kind: IMPORT_EDGE,
      from: FIRST_AT,
      to: SECOND_AT,
      attrs: { [KNOWN]: BY_DECLARATION, [NAMES]: NAMES_TYPE, [LOADING]: AT_LOAD },
    },
  ])
})

test("an edge coming in is answered from the file naming the seed to the seed", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT] })
  const taken = takenIn(importers, [FIRST_AT], { index: indexOf(root) })

  expect(taken.nodes).toEqual([FIRST_AT, SECOND_AT])
  expect(taken.edges).toEqual([
    { kind: IMPORT_EDGE, from: SECOND_AT, to: FIRST_AT, attrs: { [KNOWN]: BY_REFERENCE } },
  ])
})

test("the edge closing a cycle is answered though the node it reaches was taken in already", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./second.page.ts"),
    [SECOND_AT]: namingBody("./first.page.ts"),
  })
  const taken = takenIn(imports, [FIRST_AT], { index: indexOf(root), bodyAt })

  expect(taken.nodes).toEqual([FIRST_AT, SECOND_AT])
  expect(taken.edges).toEqual([
    { kind: IMPORT_EDGE, from: FIRST_AT, to: SECOND_AT, attrs: DECLARED },
    { kind: IMPORT_EDGE, from: SECOND_AT, to: FIRST_AT, attrs: DECLARED },
  ])
})

test("an edge the gate refuses the far end of is no part of the closure", () => {
  const root = importWorld()
  const bodyAt = filesOf({
    [FIRST_AT]: namingBody("./apart.page.txt"),
    [APART_AT]: namingBody("./third.page.ts"),
  })
  const through = (one: string): boolean => one.endsWith(ENDING)
  const taken = takenIn(imports, [FIRST_AT], { index: indexOf(root), bodyAt, through })

  expect(taken.nodes).toEqual([FIRST_AT])
  expect(taken.edges).toEqual([])
})

test("an ask wanting only the nodes is answered only those", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })
  const asked = { index: indexOf(root) }

  expect(closureOf(importers, [FIRST_AT], asked)).toEqual(
    takenIn(importers, [FIRST_AT], asked).nodes
  )
})

test("a seed is no steps from the seeds, and every node taken in is somewhere in the steps", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })
  const taken = takenIn(importers, [FIRST_AT, THIRD_AT], { index: indexOf(root) })

  expect([...taken.stepsTo.keys()].sort()).toEqual([...taken.nodes])
  expect(taken.stepsTo.get(FIRST_AT)).toBe(0)
  expect(taken.stepsTo.get(THIRD_AT)).toBe(0)
  expect(taken.stepsTo.get(SECOND_AT)).toBe(1)
})

test("a node is as many steps from the seeds as the edges between it and them", () => {
  const root = reachingWorld({ [FIRST_AT]: [SECOND_AT], [SECOND_AT]: [THIRD_AT] })
  const taken = takenIn(importers, [FIRST_AT], { index: indexOf(root) })

  expect(taken.stepsTo.get(FIRST_AT)).toBe(0)
  expect(taken.stepsTo.get(SECOND_AT)).toBe(1)
  expect(taken.stepsTo.get(THIRD_AT)).toBe(2)
})

test("a node two ways reach is at the fewer steps rather than at the way walked first", () => {
  const root = reachingWorld({
    [FIRST_AT]: [NEAR_AT, THIRD_AT],
    [THIRD_AT]: [SECOND_AT],
    [SECOND_AT]: [APART_AT],
    [NEAR_AT]: [APART_AT],
  })
  const taken = takenIn(importers, [FIRST_AT], { index: indexOf(root) })

  expect(taken.stepsTo.get(NEAR_AT)).toBe(1)
  expect(taken.stepsTo.get(THIRD_AT)).toBe(1)
  expect(taken.stepsTo.get(SECOND_AT)).toBe(2)
  expect(taken.stepsTo.get(APART_AT)).toBe(2)
})
