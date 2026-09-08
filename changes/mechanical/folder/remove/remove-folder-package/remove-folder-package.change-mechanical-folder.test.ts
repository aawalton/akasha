import { expect, test } from "bun:test"
import {
  NOTHING_OVER,
  type World,
} from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./remove-folder-package.change-mechanical-folder.code.ts"

const PACKAGE_PAGE = "akasha/code-system/code-system.workspace-package.ts"

const FOLDER = "akasha/code-system"

const PAGE = "akasha/code-system/modules/holder/holder.module.ts"

const PLAIN = "akasha/code-system/readme"

type Taken = { at: string; given: unknown }

function worldOf(taken: Taken): World {
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: (_world, at, given) => {
      taken.at = at
      taken.given = given
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

function refusalFor(at: string): string {
  return `\`${at}\` names no \`workspace-package\`, so no folder is taken away`
}

test("the package's folder is taken away by the change this change reaches", async () => {
  const taken: Taken = { at: "", given: null }

  const said = await runChange(worldOf(taken), { at: PACKAGE_PAGE })

  expect(said.refused).toBe(null)
  expect(taken.at).toBe("change-mechanical-folder/remove-folder")
  expect(taken.given).toEqual({ at: FOLDER })
})

test("a page that is no workspace package is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PAGE })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PAGE))
})

test("a path naming no page is refused", async () => {
  const said = await runChange(worldOf({ at: "", given: null }), { at: PLAIN })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(refusalFor(PLAIN))
})
