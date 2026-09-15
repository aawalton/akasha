import { afterAll, expect, test } from "bun:test"
import { filesOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  APART_AT,
  FIRST_AT,
  importWorld,
  indexOf,
  namingBody,
  reachingWorld,
  SECOND_AT,
  scratch,
  THIRD_AT,
} from "akasha/graph/modules/asking/graph-asking.module.test-fixtures.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { importers } from "akasha/graph/predicate/pages/importers.graph-predicate.ts"
import { imports } from "akasha/graph/predicate/pages/imports.graph-predicate.ts"

const ENDING = ".ts"

const SIDEWAYS = { ...imports, direction: "sideways" }

afterAll(scratch.sweep)

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
