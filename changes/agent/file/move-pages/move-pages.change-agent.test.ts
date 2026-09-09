import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  HELD_PAGE,
  indexedRepo,
  NAMER_CODE,
  pageOf,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as moveFileCode } from "../../../mechanical/file/move/move-file-code/move-file-code.change-mechanical.code.ts"
import { runChange as moveFileOfAnyKind } from "../../../mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.code.ts"
import { runChange as moveFilePage } from "../../../mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.code.ts"
import { runChange as changeImports } from "../../../mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import { bodiesIn, type World, worldAt } from "../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./move-pages.change-agent.code.ts"

afterAll(scratch.sweep)

const INTO = "akasha/three"

const BORNE_PAGE = "akasha/one/borne.module.ts"

const BORNE_CODE = "akasha/one/borne.module.code.ts"

const BORNE_TEXT = "akasha/one/borne.module.test.md"

const CARRIED_PAGE = "akasha/three/borne.module.ts"

const CARRIED_TEXT = "akasha/three/borne.module.test.md"

const EVERY = [BORNE_CODE, BORNE_PAGE, BORNE_TEXT, HELD_CODE, HELD_PAGE]

const BESIDE: Readonly<Record<string, string>> = {
  [BORNE_PAGE]: pageOf({
    id: "01a04a4a-0000-7000-8000-00000000000f",
    pageTypeSlug: "module",
    slug: "borne",
    definition: "a page an indexed repository carries beside prose",
    code: "ts",
    test: "md",
  }),
  [BORNE_CODE]: "export const carried = 2\n",
  [BORNE_TEXT]: "borne\n",
}

function repo(): string {
  return indexedRepo(BESIDE)
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), async (world, at, given) => {
    if (at === "change-mechanical/move-file-of-any-kind") {
      return await moveFileOfAnyKind(world, given as Parameters<typeof moveFileOfAnyKind>[1])
    }
    if (at === "change-mechanical-file/move-file-page") {
      return await moveFilePage(world, given as Parameters<typeof moveFilePage>[1])
    }
    if (at === "change-mechanical/move-file-code") {
      return await moveFileCode(world, given as Parameters<typeof moveFileCode>[1])
    }
    if (at === "change-mechanical-file/move-file") {
      return moveFile(world, given as Parameters<typeof moveFile>[1])
    }
    if (at === "change-mechanical-file-content/change-imports") {
      return changeImports(world, given as Parameters<typeof changeImports>[1])
    }
    return refusing(`\`${at}\` is reached by nothing here`)
  })
}

test("a file beside a page that is not code is carried with that page", async () => {
  const said = await runChange(worldIn(repo()), { moved: `${BORNE_PAGE} ${INTO}\n` })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toContain(CARRIED_TEXT)
})

test("every line is carried in one answer", async () => {
  const said = await runChange(worldIn(repo()), {
    moved: `${HELD_PAGE} ${INTO}\n${BORNE_PAGE} ${INTO}\n`,
  })
  const came = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathFrom] : []))

  expect([...came].sort()).toEqual([...EVERY].sort())
})

test("a page carried keeps the name that page has", async () => {
  const said = await runChange(worldIn(repo()), { moved: `${BORNE_PAGE} ${INTO}\n` })
  const landed = said.edits.flatMap((one) => (one.kind === "move" ? [one.pathTo] : []))

  expect(landed).toContain(CARRIED_PAGE)
})

test("a body naming a path that moved is repointed in the same answer", async () => {
  const world = worldIn(repo())
  const said = await runChange(world, { moved: `${HELD_PAGE} ${INTO}\n` })

  expect(bodiesIn(said, world.base).get(NAMER_CODE) ?? "").toContain("../three/held.module.code.ts")
})

test("a line with nothing on it is read over", async () => {
  const said = await runChange(worldIn(repo()), { moved: `\n${BORNE_PAGE} ${INTO}\n\n` })

  expect(said.refused).toBeNull()
  expect(said.edits.filter((one) => one.kind === "move")).toHaveLength(3)
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldIn(repo()), {})

  expect(said.refused ?? "").toContain("`moved`")
})

test("a body with no line is refused", async () => {
  const said = await runChange(worldIn(repo()), { moved: "\n\n" })

  expect(said.refused ?? "").toContain("no line was handed in")
})

test("a line that is not a path and a folder parted by a space is refused", async () => {
  const said = await runChange(worldIn(repo()), { moved: `${BORNE_PAGE}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("parted by a space")
})

test("a line landing in a file rather than a folder is refused", async () => {
  const said = await runChange(worldIn(repo()), { moved: `${BORNE_PAGE} ${HELD_PAGE}\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("keeps a page's name")
})

test("a line naming the folder its page already sits in is refused", async () => {
  const said = await runChange(worldIn(repo()), { moved: `${BORNE_PAGE} akasha/one\n` })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("already sits in")
})

test("a line the change beneath refuses refuses the whole call and names that pair", async () => {
  const gone = "akasha/one/nobody.module.ts"
  const said = await runChange(worldIn(repo()), {
    moved: `${BORNE_PAGE} ${INTO}\n${gone} ${INTO}\n`,
  })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("names no page")
  expect(said.refused ?? "").toContain(`${gone} ${INTO}`)
})

test("each carry is left to the change reached at its address", async () => {
  const reached: string[] = []
  const root = repo()
  const world = worldAt(root, textIn(root), (_world, at) => {
    reached.push(at)
    return Promise.resolve({ edits: [], refused: null })
  })

  await runChange(world, { moved: `${HELD_PAGE} ${INTO}\n${BORNE_PAGE} ${INTO}\n` })

  expect(reached).toEqual([
    "change-mechanical/move-file-of-any-kind",
    "change-mechanical/move-file-of-any-kind",
  ])
})
