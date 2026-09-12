import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  recipeIn,
} from "akasha/infrastructure/inference/generations/wan/up/wan-up.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const PACKAGED = dirname(HERE)

const SCRIPT = "wan-up.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the recipe the body builds from is a file that is there", () => {
  expect(existsSync(join(PACKAGED, recipeIn(ROOT)))).toBe(true)
})
