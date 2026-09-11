import { afterAll, expect, test } from "bun:test"
import { folderNotLeftNamed } from "akasha/changes/guards/pages/folder-not-left-named/folder-not-left-named.change-guard.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { guardedBy } from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import { moving } from "akasha/changes/modules/guarding/change-guarding.module.test-fixtures.ts"
import { worldAt } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  pageOf,
  put,
  scratch,
  textIn,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const GUARDS = [folderNotLeftNamed]

const EMPTIED = "akasha/one"

const PREFIX = `${EMPTIED}/pages`

const CARRIED_PAGE = "akasha/six/held.module.ts"

const CARRIED_CODE = "akasha/six/held.module.code.ts"

const SPELLING_PAGE = "akasha/five/spelling.module.ts"

const SPELLING_CODE = "akasha/five/spelling.module.code.ts"

const SPELLING = pageOf({
  id: idOf("d"),
  pageTypeSlug: "module",
  slug: "spelling",
  definition: "a page whose body spells a folder rather than a file",
  code: "ts",
})

const OTHER_PAGE = `${EMPTIED}/other.module.ts`

const OTHER_CODE = `${EMPTIED}/other.module.code.ts`

const OTHER = pageOf({
  id: idOf("e"),
  pageTypeSlug: "module",
  slug: "other",
  definition: "a page the carry leaves under the folder it names",
  code: "ts",
})

function judged(root: string, said: Answer): Answer {
  return guardedBy(worldAt(root, textIn(root)), said, GUARDS)
}

const CARRY = moving([
  [HELD_PAGE, CARRIED_PAGE],
  [HELD_CODE, CARRIED_CODE],
])

const ROOTED_SLUG = "rooted"

const ROOTED_PAGE = `${ROOTED_SLUG}/${ROOTED_SLUG}.module.ts`

const ROOTED_CODE = `${ROOTED_SLUG}/${ROOTED_SLUG}.module.code.ts`

const ROOTED = pageOf({
  id: idOf("f"),
  pageTypeSlug: "module",
  slug: ROOTED_SLUG,
  definition: "a page at the root of a folder that page's own slug names",
  code: "ts",
})

const ROOTED_CARRY = moving([
  [ROOTED_PAGE, `akasha/seven/${ROOTED_SLUG}.module.ts`],
  [ROOTED_CODE, `akasha/seven/${ROOTED_SLUG}.module.code.ts`],
])

function spelling(body: string): string {
  return indexedRepo({ [SPELLING_PAGE]: SPELLING, [SPELLING_CODE]: body })
}

function rooted(body: string): string {
  return indexedRepo({ [ROOTED_PAGE]: ROOTED, [ROOTED_CODE]: body })
}

const HELD_SHELL = `${EMPTIED}/run.sh`

const CARRIED_SHELL = "akasha/six/run.sh"

const SHELL_CARRY = moving([
  [HELD_PAGE, CARRIED_PAGE],
  [HELD_CODE, CARRIED_CODE],
  [HELD_SHELL, CARRIED_SHELL],
])

function shelling(body: string): string {
  const root = indexedRepo()
  put(root, HELD_SHELL, body)
  return root
}

test("a body the carry moves spelling that same folder is refused at the path it landed", () => {
  const root = indexedRepo({ [HELD_CODE]: `export const PAGES = "${PREFIX}"\n` })

  expect(judged(root, CARRY).refused ?? "").toContain(CARRIED_CODE)
})

test("a body the answer leaves alone spelling that folder is judged by nothing here", () => {
  const root = spelling(`export const AT = "${EMPTIED}"\n`)

  expect(judged(root, CARRY).refused).toBe(null)
})

test("a body reaching the folder by a relative path is judged by nothing here", () => {
  const root = indexedRepo({ [HELD_CODE]: `export const AT = "../one/held.module.code.ts"\n` })

  expect(judged(root, CARRY).refused).toBe(null)
})

test("a folder the carry leaves holding a file is judged by nothing here", () => {
  const root = indexedRepo({
    [SPELLING_PAGE]: SPELLING,
    [SPELLING_CODE]: `export const AT = "${EMPTIED}"\n`,
    [OTHER_PAGE]: OTHER,
    [OTHER_CODE]: "export const other = 1\n",
  })

  expect(judged(root, CARRY).refused).toBe(null)
})

test("a carry no body spells the folder after is not refused", () => {
  const said = judged(indexedRepo(), CARRY)

  expect(said.refused).toBe(null)
  expect(pathsIn(said)).toContain(CARRIED_PAGE)
})

test("a page carried off a folder at the root its own slug spells is not refused", () => {
  const root = rooted(`export const ${ROOTED_SLUG} = 1\n`)

  expect(judged(root, ROOTED_CARRY).refused).toBe(null)
})

test("a body the carry moves spelling a path under that root folder is refused", () => {
  const root = rooted(`export const AT = "${ROOTED_CODE}"\n`)

  expect(judged(root, ROOTED_CARRY).refused ?? "").toContain(ROOTED_CODE)
})

test("a body the carry moves whose language is not read spelling that folder is refused", () => {
  const root = shelling(`#!/usr/bin/env bash\nPAGES="${PREFIX}"\n`)

  expect(judged(root, SHELL_CARRY).refused ?? "").toContain(CARRIED_SHELL)
})

test("a path such a body spells after a variable is read from the separator on", () => {
  const root = shelling(`#!/usr/bin/env bash\nPAGES="$AKASHA_ROOT/${PREFIX}"\n`)

  expect(judged(root, SHELL_CARRY).refused ?? "").toContain(PREFIX)
})

test("a longer name opening with that folder's name is no path naming that folder", () => {
  const root = shelling(`#!/usr/bin/env bash\nPAGES="$AKASHA_ROOT/${EMPTIED}iric/pages"\n`)

  expect(judged(root, SHELL_CARRY).refused).toBe(null)
})

test("a body whose language is not read the answer leaves alone is judged by nothing here", () => {
  const root = shelling(`#!/usr/bin/env bash\nPAGES="${PREFIX}"\n`)

  expect(judged(root, CARRY).refused).toBe(null)
})

test("a run naming a place outside the checkout names no folder here", () => {
  const root = shelling(`#!/usr/bin/env bash\nPAGES="/Users/walton/${PREFIX}"\n`)

  expect(judged(root, SHELL_CARRY).refused).toBe(null)
})

test("a run naming that folder under the checkout's own root is refused", () => {
  const root = indexedRepo()
  put(root, HELD_SHELL, `#!/usr/bin/env bash\nPAGES="${root}/${PREFIX}"\n`)

  expect(judged(root, SHELL_CARRY).refused ?? "").toContain(PREFIX)
})
