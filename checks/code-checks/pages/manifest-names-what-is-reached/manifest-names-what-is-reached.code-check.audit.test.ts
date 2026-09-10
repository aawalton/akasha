import { afterAll, expect, test } from "bun:test"
import { manifestNamesWhatIsReached } from "./manifest-names-what-is-reached.code-check.audit.code.ts"
import {
  AT,
  HELD,
  MANIFEST_AT,
  manifest,
  scratch,
  tracked,
} from "./manifest-names-what-is-reached.code-check.decision.test-fixtures.ts"

const REACHES = 'import held from "zod"\n'

afterAll(scratch.sweep)

test("an audit judges every file in the tree, no change naming one of them", () => {
  const root = tracked({ [MANIFEST_AT]: manifest({}), [AT]: REACHES })

  const said = manifestNamesWhatIsReached(root)

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`zod`")
})

test("an audit judges a manifest naming what nothing its package holds reaches", () => {
  const root = tracked({
    [MANIFEST_AT]: manifest({ dependencies: { zod: "^4" } }),
    [AT]: HELD,
  })

  const said = manifestNamesWhatIsReached(root)

  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain("`zod`")
})

test("an audit lets through a tree where each package names what it reaches", () => {
  const root = tracked({
    [MANIFEST_AT]: manifest({ dependencies: { zod: "^4" } }),
    [AT]: REACHES,
  })

  expect(manifestNamesWhatIsReached(root)).toEqual([])
})
