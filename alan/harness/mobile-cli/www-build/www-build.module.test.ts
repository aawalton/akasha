import { expect, test } from "bun:test"
import {
  buildDirResetSaid,
  buildDirTakenSaid,
  installedSaid,
  webEnvCopiedSaid,
  worktreeAddedSaid,
  wwwStagedSaid,
} from "akasha/alan/harness/mobile-cli/www-build/www-build.module.code.ts"

const DIR = "/home/one/.mobile-cut-build"

test("a build directory deleted is named as gone rather than as made again", () => {
  const said = buildDirTakenSaid(DIR)
  expect(said).toContain(DIR)
  expect(said).toContain("gone")
})

test("a worktree added says it is registered, since a later add at that path refuses", () => {
  expect(worktreeAddedSaid(DIR, "abc123")).toContain("registered in this repo")
})

test("a reset says uncommitted work is gone, since the checkout was forced and cleaned", () => {
  expect(buildDirResetSaid(DIR)).toContain("anything uncommitted in it is gone")
})

test("the env file copied says it carried secrets", () => {
  expect(webEnvCopiedSaid(`${DIR}/apps/one/.env`)).toContain("secrets and all")
})

test("the install names the directory whose node_modules it wrote", () => {
  expect(installedSaid(DIR)).toContain(DIR)
})

test("the staging says it wrote into the shell's own checkout rather than a scratch place", () => {
  expect(wwwStagedSaid("/repos/shell")).toContain("the shell's own checkout")
})
