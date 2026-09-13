import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/change/change-manifest-ways/change-manifest-ways.change-mechanical-file-content.code.ts"
import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { worldOf } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "seat-system/package.json"

const BODY = `{
  "name": "@akasha/seat-system",
  "exports": {
    "./beta": "./beta/beta.module.code.ts"
  }
}
`

test("the ways in are worked out over the body the world answers", () => {
  const world = worldOf({ [AT]: BODY })
  const said = runChange(world, {
    at: AT,
    moved: { "seat-system/beta/beta.module.code.ts": "seat-system/held/beta.module.code.ts" },
  })

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).toEqual([AT])
})

test("a manifest the world holds no body at is refused", () => {
  const said = runChange(worldOf({}), { at: AT, moved: {} })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/holds no body/)
})
