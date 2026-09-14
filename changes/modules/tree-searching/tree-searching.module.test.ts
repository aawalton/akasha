import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  NOTHING_OVER,
  type World,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { worldOf } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  EVERY_KIND,
  foundIn,
  pathsNaming,
  pathsSearched,
  TYPED_KINDS,
} from "akasha/changes/modules/tree-searching/tree-searching.module.code.ts"
import { indexNamed } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import {
  put,
  scratch,
} from "akasha/pages/indexes/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const SPELLING = "held-spelling"

const OTHER_SPELLING = "held-other"

const CODE_AT = "akasha/held/one/held-one.held-kind.code.ts"

const CODE_BODY = `const HELD = "${SPELLING}"\n`

const PROSE_AT = "akasha/held/one/held-one.held-kind.prose.md"

const PROSE_BODY = `the ${SPELLING} is named here\n`

const OTHER_AT = "akasha/held/two/held-two.held-kind.code.ts"

const OTHER_BODY = `const HELD = "${OTHER_SPELLING}"\n`

const WROTE_AT = "akasha/held/three/held-three.held-kind.code.ts"

const ENDED = "\0"

const NOWHERE = "/nowhere"

const ENDED_BADLY = 2

const ONE_UNREAD = "one file could not be read"

function worldSpelling(
  held: Readonly<Record<string, string>>,
  over: Answer = NOTHING_OVER,
  wrote: Readonly<Record<string, string>> = held
): World {
  const root = scratch.rootFor("tree-searching-")
  for (const [at, body] of Object.entries(wrote)) put(root, at, body)
  return { ...worldOf(held), root, over }
}

test("every spelling asked after is searched for in one run", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY, [OTHER_AT]: OTHER_BODY })

  expect(pathsNaming(world, [SPELLING, OTHER_SPELLING], TYPED_KINDS)).toEqual([CODE_AT, OTHER_AT])
})

test("a spelling is matched as written letters rather than as a pattern", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY })

  expect(pathsNaming(world, ["held.spelling"], TYPED_KINDS)).toEqual([])
})

test("the file kinds searched are the ones the caller names", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY, [PROSE_AT]: PROSE_BODY })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT])
  expect(pathsNaming(world, [SPELLING], EVERY_KIND)).toEqual([CODE_AT, PROSE_AT])
})

test("the git folder and the packages folder and the index folder are left unsearched", () => {
  const world = worldSpelling({
    ".git/held-one.held-kind.code.ts": CODE_BODY,
    [`${indexNamed()}/held-one.held-kind.code.ts`]: CODE_BODY,
    "node_modules/held/held-one.held-kind.code.ts": CODE_BODY,
    [CODE_AT]: CODE_BODY,
  })

  expect(pathsNaming(world, [SPELLING], EVERY_KIND)).toEqual([CODE_AT])
})

test("a path the search names is answered against the root that search was handed", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT])
})

test("a caller handing a root rather than a world is answered every path the search names", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [OTHER_AT]: CODE_BODY,
  })

  expect(pathsSearched(world.root, [SPELLING], TYPED_KINDS).toSorted()).toEqual([CODE_AT, OTHER_AT])
})

test("the paths answered are the paths the world holds", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [OTHER_AT]: CODE_BODY,
  })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT])
})

test("a path the answer so far writes is answered beside the paths the search names", () => {
  const over: Answer = {
    edits: [{ kind: "replace", path: WROTE_AT, contentFrom: OTHER_BODY, contentTo: CODE_BODY }],
    refused: null,
  }
  const world = worldSpelling({ [WROTE_AT]: CODE_BODY }, over, { [WROTE_AT]: OTHER_BODY })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([WROTE_AT])
})

test("a search that named nothing and ended badly throws", () => {
  expect(() => pathsNaming(worldOf({ [CODE_AT]: CODE_BODY }), [SPELLING], TYPED_KINDS)).toThrow(
    "could not be searched"
  )
})

test("a search naming paths is answered with those paths though that search ended badly", () => {
  const named = [CODE_AT, OTHER_AT].map((one) => `${join(NOWHERE, one)}${ENDED}`).join("")

  expect(foundIn(named, ENDED_BADLY, ONE_UNREAD, NOWHERE)).toEqual([CODE_AT, OTHER_AT])
})

test("a call asking after no spelling searches nothing", () => {
  expect(pathsNaming(worldOf({ [CODE_AT]: CODE_BODY }), [], TYPED_KINDS)).toEqual([])
  expect(pathsSearched(NOWHERE, [], TYPED_KINDS)).toEqual([])
})
