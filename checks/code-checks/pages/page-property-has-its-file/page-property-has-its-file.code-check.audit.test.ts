import { afterAll, expect, test } from "bun:test"
import { pagePropertyHasItsFile } from "akasha/checks/code-checks/pages/page-property-has-its-file/page-property-has-its-file.code-check.audit.code.ts"
import {
  bodyText,
  CODE,
  PAGE,
  rooted,
  scratch,
} from "akasha/checks/code-checks/pages/page-property-has-its-file/page-property-has-its-file.code-check.decision.test-fixtures.ts"
import { tracked } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = tracked(rooted(), { [PAGE]: bodyText(', code: "ts"') })

  expect(pagePropertyHasItsFile(root)).toEqual([
    { path: PAGE, reason: `states \`code: "ts"\`, and no file stands at ${CODE}` },
  ])
})

test("an audit lets through a tree where every file a page states is there", () => {
  const root = tracked(rooted(), {
    [PAGE]: bodyText(', code: "ts"'),
    [CODE]: "export const held = 1\n",
  })

  expect(pagePropertyHasItsFile(root)).toEqual([])
})
