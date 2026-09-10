import { afterAll, expect, test } from "bun:test"
import { pagePropertyHasItsFile } from "./page-property-has-its-file.code-check.audit.code.ts"
import {
  bodyText,
  CODE,
  PAGE,
  scratch,
  tracked,
} from "./page-property-has-its-file.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

test("an audit judges every page in the tree, no change naming one of them", () => {
  const root = tracked({ [PAGE]: bodyText(', code: "ts"') })

  expect(pagePropertyHasItsFile(root)).toEqual([
    { path: PAGE, reason: `states \`code: "ts"\`, and no file stands at ${CODE}` },
  ])
})

test("an audit lets through a tree where every file a page states is there", () => {
  const root = tracked({ [PAGE]: bodyText(', code: "ts"'), [CODE]: "export const held = 1\n" })

  expect(pagePropertyHasItsFile(root)).toEqual([])
})
