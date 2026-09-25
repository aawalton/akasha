import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  branchOf,
  committedPicturesOf,
} from "akasha/alan/harness/code-editor/data-interface/modules/committed-data-watching/committed-data-watching.module.code.ts"

const SCRATCH = "/var/tmp"

function checkout(head: string): string {
  const root = mkdtempSync(join(SCRATCH, "committed-data-watching-"))
  mkdirSync(join(root, ".git", "refs", "heads"), { recursive: true })
  writeFileSync(join(root, ".git", "HEAD"), `${head}\n`)
  writeFileSync(join(root, ".git", "refs", "heads", "main"), "0".repeat(40))
  return root
}

function linkedCheckout(): { root: string; common: string } {
  const common = join(checkout("ref: refs/heads/main"), ".git")
  const gitDir = join(common, "linked", "other")
  mkdirSync(gitDir, { recursive: true })
  writeFileSync(join(gitDir, "HEAD"), "ref: refs/heads/other\n")
  writeFileSync(join(gitDir, "commondir"), "../..\n")
  const root = mkdtempSync(join(SCRATCH, "committed-data-watching-linked-"))
  writeFileSync(join(root, ".git"), `gitdir: ${gitDir}\n`)
  return { root, common }
}

test("the branch followed is the ref file the checkout's head names", () => {
  const root = checkout("ref: refs/heads/main")
  expect(branchOf(root)).toEqual({
    ref: join(root, ".git", "refs", "heads", "main"),
    packed: join(root, ".git", "packed-refs"),
  })
})

test("a checkout whose .git file names its git folder finds the branch in the common folder", () => {
  const { root, common } = linkedCheckout()
  expect(branchOf(root)).toEqual({
    ref: join(common, "refs", "heads", "other"),
    packed: join(common, "packed-refs"),
  })
})

test("a checkout on no branch is refused", () => {
  const root = checkout("0".repeat(40))
  expect(() => branchOf(root)).toThrow("is on no branch")
})

for (const slug of ["refusal-tree", "finding-tree", "gap-tree"]) {
  test(`the ${slug} picture is taken again where the branch's ref file moves, and nowhere else`, () => {
    const root = checkout("ref: refs/heads/main")
    const branch = branchOf(root)
    const picture = committedPicturesOf(root).get(slug)
    expect(picture?.holds(branch.ref)).toBe(true)
    expect(picture?.holds(branch.packed)).toBe(true)
    expect(picture?.holds(`${branch.ref}.lock`)).toBe(false)
    expect(picture?.folders.length ?? 0).toBeGreaterThan(0)
  })
}
