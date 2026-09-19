import { afterAll, expect, test } from "bun:test"
import { join } from "node:path"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  EVERY_KIND,
  foundIn,
  pathsListed,
  pathsNaming,
  pathsSearched,
  TYPED_KINDS,
} from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  put,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

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

const PENDING_AT = "akasha/held/pending/held-pending.held-kind.seat.uncommitted.ts"

const PENDING_UNDER = "akasha/held/pending.uncommitted.folder/held-under.held-kind.code.ts"

const IGNORED_AT = "built/held-built.held-kind.code.ts"

const EMITTED_AT = "akasha/held/three/held-three.held-kind.emitted.ts"

const IGNORING_EMITTED = "built/\n*.uncommitted.*\n*.emitted.ts\n"

const GITIGNORE_AT = ".gitignore"

const IGNORING = "built/\n*.uncommitted.*\n"

const GIT_AT = ".git/kept"

const KEPT = "held\n"

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

test("a file the repository ignores is left unsearched where the caller names no kind", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [EMITTED_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING_EMITTED,
    [GIT_AT]: KEPT,
  })

  expect(pathsNaming(world, [SPELLING], EVERY_KIND)).toEqual([CODE_AT])
})

test("a file a named kind matches is searched though the repository ignores that file", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [EMITTED_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING_EMITTED,
    [GIT_AT]: KEPT,
  })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT, EMITTED_AT])
})

test("a folder the repository ignores is left unsearched whatever kinds are named", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [IGNORED_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING,
    [GIT_AT]: KEPT,
  })

  expect(pathsNaming(world, [SPELLING], EVERY_KIND)).toEqual([CODE_AT])
  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT])
})

test("a listing names no kind, and a file the repository ignores is left unlisted", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [EMITTED_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING_EMITTED,
    [GIT_AT]: KEPT,
  })

  expect(pathsListed(world.root)).toEqual([GITIGNORE_AT, CODE_AT])
})

test("a body no commit holds yet is searched though the repository ignores it", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [PENDING_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING,
    [GIT_AT]: KEPT,
  })

  expect(pathsNaming(world, [SPELLING], EVERY_KIND)).toEqual([CODE_AT, PENDING_AT])
})

test("a path the answer so far writes is answered beside the paths the search names", () => {
  const over: Answer = {
    edits: [{ kind: "replace", path: WROTE_AT, contentFrom: OTHER_BODY, contentTo: CODE_BODY }],
    refused: null,
  }
  const world = worldSpelling({ [WROTE_AT]: CODE_BODY }, over, { [WROTE_AT]: OTHER_BODY })

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([WROTE_AT])
})

test("a path the answer so far writes is answered though no body sits on disk", () => {
  const over: Answer = {
    edits: [{ kind: "add", path: WROTE_AT, content: CODE_BODY }],
    refused: null,
  }
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, over)

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT, WROTE_AT])
})

test("a path the answer so far takes away is left out though the search names it", () => {
  const over: Answer = { edits: [{ kind: "remove", path: OTHER_AT }], refused: null }
  const world = worldSpelling({ [CODE_AT]: CODE_BODY, [OTHER_AT]: CODE_BODY }, over)

  expect(pathsNaming(world, [SPELLING], TYPED_KINDS)).toEqual([CODE_AT])
})

test("a path the answer so far moves is answered at the path moved to", () => {
  const over: Answer = {
    edits: [{ kind: "move", pathFrom: CODE_AT, pathTo: WROTE_AT }],
    refused: null,
  }
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, over)

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

test("a listing names every path the tree holds rather than the paths one spelling is in", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [PROSE_AT]: PROSE_BODY,
    [OTHER_AT]: OTHER_BODY,
  })

  expect(pathsListed(world.root)).toEqual([CODE_AT, PROSE_AT, OTHER_AT])
})

test("a listing leaves out the git folder, the packages folder and the index folder", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    ".git/held-one.held-kind.code.ts": CODE_BODY,
    [`${indexNamed()}/held-one.held-kind.code.ts`]: CODE_BODY,
    "node_modules/held/held-one.held-kind.code.ts": CODE_BODY,
    [CODE_AT]: CODE_BODY,
  })

  expect(pathsListed(world.root)).toEqual([CODE_AT])
})

test("a listing leaves out a file the repository ignores and keeps a body no commit holds", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [IGNORED_AT]: CODE_BODY,
    [PENDING_AT]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING,
    [GIT_AT]: KEPT,
  })

  expect(pathsListed(world.root)).toEqual([GITIGNORE_AT, CODE_AT, PENDING_AT])
})

test("a listing names a body under a folder spelled uncommitted the repository ignores", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [IGNORED_AT]: CODE_BODY,
    [PENDING_UNDER]: CODE_BODY,
    [GITIGNORE_AT]: IGNORING,
    [GIT_AT]: KEPT,
  })

  expect(pathsListed(world.root)).toEqual([GITIGNORE_AT, CODE_AT, PENDING_UNDER])
})

test("a listing names a file no commit holds that the repository does not ignore", () => {
  const world = worldSpelling({ [CODE_AT]: CODE_BODY }, NOTHING_OVER, {
    [CODE_AT]: CODE_BODY,
    [OTHER_AT]: OTHER_BODY,
    [GITIGNORE_AT]: IGNORING,
    [GIT_AT]: KEPT,
  })

  expect(pathsListed(world.root)).toEqual([GITIGNORE_AT, CODE_AT, OTHER_AT])
})
