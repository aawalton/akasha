import { afterAll, expect, test } from "bun:test"
import { indexedRepo, pageOf, put, scratch, textIn } from "@akasha/indexes/indexing/testing"
import { pathsIn, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import { type World, worldAt } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange as removeFile } from "../../../file/remove/remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange } from "./remove-folder.change-mechanical-folder.code.ts"

afterAll(scratch.sweep)

const FROM = "akasha/four"

const ALPHA_PAGE = `${FROM}/alpha.module.ts`

const ALPHA_CODE = `${FROM}/alpha.module.code.ts`

const DEEP_PAGE = `${FROM}/deep/gamma.module.ts`

const OUTER_PAGE = "akasha/five/outer.module.ts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const pageBody = (slug: string, id: string): string =>
  pageOf({ id, pageTypeSlug: "module", slug, definition: "a page a folder holds" })

const HELD: Readonly<Record<string, string>> = {
  [ALPHA_PAGE]: pageOf({
    id: "01a04a4a-0003-7000-8000-000000000001",
    pageTypeSlug: "module",
    slug: "alpha",
    definition: "a page a folder holds",
    code: "ts",
  }),
  [ALPHA_CODE]: "export const alpha = 1\n",
  [DEEP_PAGE]: pageBody("gamma", "01a04a4a-0003-7000-8000-000000000003"),
  [OUTER_PAGE]: pageBody("outer", "01a04a4a-0003-7000-8000-000000000004"),
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), (world, at, given) => {
    if (at !== REMOVE_FILE) {
      return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
    }
    return Promise.resolve(removeFile(world, given as Parameters<typeof removeFile>[1]))
  })
}

test("every file under the folder is taken away", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { at: FROM })
  const paths = pathsIn(said)

  expect(said.refused).toBeNull()
  expect(paths).toContain(ALPHA_PAGE)
  expect(paths).toContain(ALPHA_CODE)
  expect(paths).toContain(DEEP_PAGE)
})

test("no file outside the folder is taken away", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { at: FROM })

  expect(pathsIn(said)).not.toContain(OUTER_PAGE)
})

test("a file the index names nowhere goes with the rest", async () => {
  const root = indexedRepo(HELD)
  put(root, `${FROM}/deep/notes.txt`, "one\n")
  const said = await runChange(worldIn(root), { at: FROM })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(`${FROM}/deep/notes.txt`)
})

test("a folder holding no file is taken away as one path", async () => {
  const said = await runChange(worldIn(indexedRepo(HELD)), { at: "akasha/nine" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: "akasha/nine" }])
})

test("each file goes by the change reached at its address", async () => {
  const reached: string[] = []
  const root = indexedRepo(HELD)
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await runChange(world, { at: FROM })

  expect(new Set(reached)).toEqual(new Set([REMOVE_FILE]))
})
