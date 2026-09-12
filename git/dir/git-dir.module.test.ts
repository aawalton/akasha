import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { git } from "akasha/git/capping/git-capping.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(): string {
  const root = scratch.rootFor("akasha-git-dir-")
  git(root, ["init", "--quiet"])
  return root
}

test("a checkout is answered the folder git keeps that checkout in", () => {
  const root = repo()
  expect(gitDirIn(root)).toBe(join(root, ".git"))
})

test("the answer is absolute however git spells it", () => {
  const at = gitDirIn(repo())
  expect(at === null ? "" : isAbsolute(at)).toBe(true)
})

test("a folder git answers nothing for is answered as no folder", () => {
  const root = join(scratch.rootFor("akasha-git-dir-"), "nowhere")
  mkdirSync(root, { recursive: true })
  expect(gitDirIn(root)).toBe(null)
})
