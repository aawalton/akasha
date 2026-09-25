import { expect, test } from "bun:test"
import { existsSync } from "node:fs"
import {
  branchOf,
  committedPicturesOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/committed-data-watching/committed-data-watching.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

test("the branch followed is the ref file the checkout's head names", () => {
  const branch = branchOf(akashaRoot())
  expect(branch.ref).toContain("/refs/heads/")
  expect(existsSync(branch.ref)).toBe(true)
})

test("the refusals picture is taken again where the branch's ref file moves, and nowhere else", () => {
  const root = akashaRoot()
  const branch = branchOf(root)
  const picture = committedPicturesOf(root).get("refusal-tree")
  expect(picture?.holds(branch.ref)).toBe(true)
  expect(picture?.holds(branch.packed)).toBe(true)
  expect(picture?.holds(`${branch.ref}.lock`)).toBe(false)
  expect(picture?.folders.length ?? 0).toBeGreaterThan(0)
})
