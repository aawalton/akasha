import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./rename-pages.change-agent.code.ts"

const ONE = "akasha/one/held.module.ts"

const TWO = "akasha/two/namer.module.ts"

const RENAME_FILE_PAGES = "change-mechanical/rename-file-pages"

type Carried = { at: string; given: unknown }

function worldOf(carried: Carried): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("every line is carried to the change renaming many pages", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { moved: `${ONE} carried\n${TWO} borne\n` })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe(RENAME_FILE_PAGES)
  expect(carried.given).toEqual({ moved: { [ONE]: "carried", [TWO]: "borne" } })
})

test("a line with nothing on it is read over", async () => {
  const carried: Carried = { at: "", given: null }

  await runChange(worldOf(carried), { moved: `\n${ONE} carried\n\n` })

  expect(carried.given).toEqual({ moved: { [ONE]: "carried" } })
})

test("an argument the change was handed no value for is refused by its key", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), {})

  expect(said.refused ?? "").toContain("`moved`")
})

test("a line that is not a path and a slug parted by a space is refused", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), { moved: `${ONE}\n` })

  expect(said.refused ?? "").toContain("parted by a space")
  expect(carried.at).toBe("")
})

test("a page type is refused rather than handed to the change renaming many pages", async () => {
  const carried: Carried = { at: "", given: null }

  const said = await runChange(worldOf(carried), {
    moved: "akasha/one/held.page-type.ts carried\n",
  })

  expect(said.refused ?? "").toContain("rename-page-type")
  expect(carried.at).toBe("")
})
