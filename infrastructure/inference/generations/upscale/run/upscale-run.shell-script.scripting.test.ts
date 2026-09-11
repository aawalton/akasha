import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  cleaningIn,
  refiningIn,
} from "akasha/infrastructure/inference/generations/upscale/run/upscale-run.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "upscale-run.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the script the body hands the clean-up stage to is a file that is there", () => {
  expect(existsSync(join(dirname(HERE), cleaningIn(ROOT)))).toBe(true)
})

test("the script the body hands the skin stage to is a file that is there", () => {
  expect(existsSync(join(dirname(HERE), refiningIn(ROOT)))).toBe(true)
})
