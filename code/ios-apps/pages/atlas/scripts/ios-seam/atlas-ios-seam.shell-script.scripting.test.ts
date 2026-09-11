import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  sourcedIn,
} from "akasha/code/ios-apps/pages/atlas/scripts/ios-seam/atlas-ios-seam.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "atlas-ios-seam.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the way the body sources lands on the shared stamp script that is there", () => {
  expect(existsSync(join(HERE, sourcedIn(ROOT)))).toBe(true)
})
