import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  graphIn,
} from "akasha/infrastructure/inference/generations/upscale/srpo/upscale-srpo.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "upscale-srpo.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the graph the body runs is a file that is there", () => {
  expect(existsSync(join(dirname(HERE), graphIn(ROOT)))).toBe(true)
})
