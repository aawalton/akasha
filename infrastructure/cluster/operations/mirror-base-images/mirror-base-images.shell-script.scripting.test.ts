import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  rootsShellIn,
} from "akasha/infrastructure/cluster/operations/mirror-base-images/mirror-base-images.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "mirror-base-images.shell-script.shell.sh"

const OWN = "mirror-base-images.shell-script.scripting.code.ts"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the script the run sources is a file that is there", () => {
  expect(existsSync(join(ROOT, rootsShellIn(ROOT)))).toBe(true)
})

test("where that script sits is asked of the index rather than spelled in the code", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(rootsShellIn(ROOT))
})
