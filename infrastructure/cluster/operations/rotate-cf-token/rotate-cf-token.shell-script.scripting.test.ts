import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  libraryAt,
} from "akasha/infrastructure/cluster/operations/rotate-cf-token/rotate-cf-token.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "rotate-cf-token.shell-script.shell.sh"

const OWN = "rotate-cf-token.shell-script.scripting.code.ts"

const ENDING = ".sh"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the file name of no script at all", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(ENDING)
})

test("the library the script sources is a file that is there", () => {
  expect(existsSync(join(HERE, libraryAt(ROOT)))).toBe(true)
})
