import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  idOf,
  indexedRepo,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { pathsIn, stating } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { guardedBy } from "../../../modules/change-guarding/change-guarding.module.code.ts"
import { worldAt } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { folderNotLeftNamed } from "./folder-not-left-named.change-guard.code.ts"

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

function carriedOff(moves: readonly (readonly [string, string])[]): Answer {
  return stating(moves.map(([pathFrom, pathTo]) => ({ kind: "move", pathFrom, pathTo })))
}

const CARRY = carriedOff([
  [HELD_PAGE, CARRIED_PAGE],
  [HELD_CODE, CARRIED_CODE],
])

function spelling(body: string): string {
  return indexedRepo({ [SPELLING_PAGE]: SPELLING, [SPELLING_CODE]: body })
}

test("a body left behind spelling the carried folder as the head of a path is refused", () => {
  const root = spelling(`export const PAGES = "${PREFIX}"\n`)

  const said = judged(root, CARRY)

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`${SPELLING_CODE}\` spells \`${PREFIX}\`, and \`${EMPTIED}\` holds nothing after`
  )
})

test("a body left behind spelling the carried folder itself is refused", () => {
  const root = spelling(`export const AT = "${EMPTIED}"\n`)

  expect(judged(root, CARRY).refused ?? "").toContain(EMPTIED)
})

test("a body the carry moves spelling that same folder is refused at the path it landed", () => {
  const root = indexedRepo({ [HELD_CODE]: `export const PAGES = "${PREFIX}"\n` })

  expect(judged(root, CARRY).refused ?? "").toContain(CARRIED_CODE)
})

test("a body reaching the folder by a relative path is judged by nothing here", () => {
  const root = spelling(`export const AT = "../one/held.module.code.ts"\n`)

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
