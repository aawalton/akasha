import { afterAll, expect, test } from "bun:test"
import { buildFolderIsIgnored } from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.audit.code.ts"

import {
  BUILT_AT,
  built,
  IGNORES_AT,
  IGNORING,
  NOT_IGNORING,
  PAGE_AT,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.test-fixtures.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page naming a build folder, no change naming one", () => {
  const said = buildFolderIsIgnored(built({ [IGNORES_AT]: NOT_IGNORING }))
  expect(said.map((one) => one.path)).toEqual([PAGE_AT])
  expect(said[0]?.reason).toContain(BUILT_AT)
})

test("an audit lets through a tree whose rules ignore every build folder", () => {
  expect(buildFolderIsIgnored(built({ [IGNORES_AT]: IGNORING }))).toEqual([])
})
