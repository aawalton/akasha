import { afterAll, expect, test } from "bun:test"
import { runChange } from "akasha/change/mechanical/folder/remove-folder/remove-folder.change-mechanical-folder.code.ts"
import { pathsIn } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { type World, worldAt } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import {
  listing,
  running,
} from "akasha/change/runner/pages/test-change-running/test-change-running.change-runner.code.ts"
import {
  indexedRepo,
  pageOf,
  put,
  scratch,
  textIn,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const ALPHA_PAGE = `${FROM}/alpha.module.ts`

const ALPHA_CODE = `${FROM}/alpha.module.code.ts`

const DEEP_PAGE = `${FROM}/deep/gamma.module.ts`

const OUTER_PAGE = "akasha/five/outer.module.ts"

const pageBody = (slug: string, id: string): string =>
  pageOf({ id, type: `${pageType.slug}/module`, slug, definition: "a page a folder holds" })

const HELD: Readonly<Record<string, string>> = {
  [ALPHA_PAGE]: pageOf({
    id: "01a04a4a-0003-7000-8000-000000000001",
    type: `${pageType.slug}/module`,
    slug: "alpha",
    definition: "a page a folder holds",
    code: "ts",
  }),
  [ALPHA_CODE]: "export const alpha = 1\n",
  [DEEP_PAGE]: pageBody("gamma", "01a04a4a-0003-7000-8000-000000000003"),
  [OUTER_PAGE]: pageBody("outer", "01a04a4a-0003-7000-8000-000000000004"),
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), running)
}

test("every file under the folder is taken away", () => {
  const said = runChange(worldIn(indexedRepo(HELD)), { at: FROM })
  const paths = pathsIn(said)

  expect(said.refused).toBeNull()
  expect(paths).toContain(ALPHA_PAGE)
  expect(paths).toContain(ALPHA_CODE)
  expect(paths).toContain(DEEP_PAGE)
})

test("no file outside the folder is taken away", () => {
  const said = runChange(worldIn(indexedRepo(HELD)), { at: FROM })

  expect(pathsIn(said)).not.toContain(OUTER_PAGE)
})

test("a file the index names nowhere goes with the rest", () => {
  const root = indexedRepo(HELD)
  put(root, `${FROM}/deep/notes.txt`, "one\n")
  const said = runChange(worldIn(root), { at: FROM })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${FROM}/deep/notes.txt`)
})

test("a folder holding no file is taken away as one path", () => {
  const said = runChange(worldIn(indexedRepo(HELD)), { at: "akasha/nine" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: "akasha/nine" }])
})

test("one answer states the removal of every file, and no change is reached", () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)

  const said = runChange(worldAt(root, textIn(root), listing(reached)), { at: FROM })

  expect(pathsIn(said)).toContain(DEEP_PAGE)
  expect(reached).toEqual([])
})
