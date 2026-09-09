import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { runChange } from "./change-file-content-page.change-mechanical-file-content.code.ts"

const AT = "akasha/one/kept.module.ts"

const OLD = "one"

const NEW = "two"

type Worked = { at: string; given: unknown }

function worldOf(worked: Worked): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      worked.at = at
      worked.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("the passage is worked by the change this change reaches", async () => {
  const worked: Worked = { at: "", given: null }

  const said = await runChange(worldOf(worked), { at: AT, old: OLD, new: NEW })

  expect(said.refused).toBe(null)
  expect(worked.at).toBe("change-mechanical-file-content/change-file-content-code")
  expect(worked.given).toEqual({ at: AT, old: OLD, new: NEW })
})

test("a refusal from the change reached is the whole answer", async () => {
  const world: World = {
    ...worldOf({ at: "", given: null }),
    reaching: () => Promise.resolve({ edits: [], refused: "no" }),
  }

  expect((await runChange(world, { at: AT, old: OLD, new: NEW })).refused).toBe("no")
})
