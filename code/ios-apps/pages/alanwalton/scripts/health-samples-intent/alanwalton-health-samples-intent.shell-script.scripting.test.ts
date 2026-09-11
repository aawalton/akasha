import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  sourcedIn,
} from "akasha/code/ios-apps/pages/alanwalton/scripts/health-samples-intent/alanwalton-health-samples-intent.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-health-samples-intent.shell-script.shell.sh"

const UP = ".."

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every part the body sources is a file that is there", () => {
  const beside = join(HERE, UP)
  const gone = sourcedIn(ROOT).filter((one) => !existsSync(join(beside, one)))
  expect(gone).toEqual([])
})

test("the body sources one file for each part the intent is declared by", () => {
  expect(sourcedIn(ROOT)).toHaveLength(3)
})
