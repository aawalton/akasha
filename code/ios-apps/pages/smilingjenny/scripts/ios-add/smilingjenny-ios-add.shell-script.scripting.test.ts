import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  hereIn,
  packageIn,
  reachedIn,
  sharedIn,
} from "akasha/code/ios-apps/pages/smilingjenny/scripts/ios-add/smilingjenny-ios-add.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "smilingjenny-ios-add.shell-script.shell.sh"

const OWN = "smilingjenny-ios-add.shell-script.scripting.code.ts"

const MOVED = "code-system"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every file the script hands to bash or to a shared script is a file that is there", () => {
  const gone = reachedIn(ROOT).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the script reaches two shared scripts, two files of the app and the seam", () => {
  expect(reachedIn(ROOT)).toHaveLength(5)
})

test("the folders the script finds from its own are folders that are there", () => {
  for (const one of [hereIn(ROOT), packageIn(ROOT), sharedIn(ROOT)]) {
    expect(existsSync(join(ROOT, one))).toBe(true)
  }
})
