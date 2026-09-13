import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/rename/change-imports/change-imports.change-mechanical-file-content.code.ts"
import { worldOf } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"

const AT = "held/one/one.module.code.ts"

const BODY = `import { two } from "akasha/one/two.module.code.ts"\n\nexport const held = two\n`

const MOVED = { "one/two.module.code.ts": "one/three.module.code.ts" }

test("the paths a body names are repointed by the module", () => {
  const said = runChange(worldOf({ [AT]: BODY }), { was: AT, now: AT, moved: MOVED })

  expect(said.edits).toHaveLength(1)
  expect(said.edits[0]).toMatchObject({ kind: "replace", path: AT })
})

test("a body no world holds is refused", () => {
  const said = runChange(worldOf({}), { was: AT, now: AT, moved: MOVED })

  expect(said.refused).toContain("holds no body")
})
