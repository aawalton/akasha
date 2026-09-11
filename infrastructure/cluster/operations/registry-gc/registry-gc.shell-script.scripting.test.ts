import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  sourcedIn,
} from "akasha/infrastructure/cluster/operations/registry-gc/registry-gc.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "registry-gc.shell-script.shell.sh"

const OWN = "registry-gc.shell-script.scripting.code.ts"

const SPELT = "operations"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the library the body sources is a file that is there", () => {
  expect(existsSync(join(HERE, sourcedIn(ROOT)))).toBe(true)
})

test("the code writing the body spells the folder the library sits under nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(SPELT)
})
