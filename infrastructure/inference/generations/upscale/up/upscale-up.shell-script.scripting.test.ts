import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  recipeAt,
} from "akasha/infrastructure/inference/generations/upscale/up/upscale-up.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "upscale-up.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the recipe the body hands the build is a file that is there", () => {
  expect(existsSync(join(dirname(HERE), recipeAt(ROOT)))).toBe(true)
})
