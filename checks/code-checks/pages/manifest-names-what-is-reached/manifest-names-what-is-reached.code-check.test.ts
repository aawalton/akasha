import { afterAll, expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change } from "../../../modules/scratch/check-scratch.module.code.ts"
import { manifestNamesWhatIsReached } from "./manifest-names-what-is-reached.code-check.code.ts"
import {
  AT,
  HELD,
  MANIFEST_AT,
  manifest,
  rooted,
  scratch,
  wrote,
} from "./manifest-names-what-is-reached.code-check.decision.test-fixtures.ts"

const REACHES = 'import held from "zod"\n'

afterAll(scratch.sweep)

function judged(held: Change): readonly Judged[] {
  const cast = shadowFor(held)
  if ("refused" in cast) throw new Error(cast.refused)
  return manifestNamesWhatIsReached(held, cast.shadow)
}

test("a file the change has reaching a package its manifest does not name is refused", () => {
  const root = wrote(rooted(), { [MANIFEST_AT]: manifest({}), [AT]: REACHES })

  const said = judged(change(root, [AT]))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("`zod`")
})

test("a manifest the change has naming what nothing it holds reaches is refused", () => {
  const root = wrote(rooted(), {
    [MANIFEST_AT]: manifest({ dependencies: { zod: "^4" } }),
    [AT]: HELD,
  })

  const said = judged(change(root, [MANIFEST_AT]))

  expect(said.map((one) => one.path)).toEqual([MANIFEST_AT])
  expect(said[0]?.reason).toContain("`zod`")
})

test("a package naming what its own code reaches is let through", () => {
  const root = wrote(rooted(), {
    [MANIFEST_AT]: manifest({ dependencies: { zod: "^4" } }),
    [AT]: REACHES,
  })

  expect(judged(change(root, [MANIFEST_AT, AT]))).toEqual([])
})
