import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  iconIn,
  underWebIn,
} from "akasha/code-system/ios-apps/pages/alanwalton/scripts/stage-app/alanwalton-stage-app.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-stage-app.shell-script.shell.sh"

const OWN = "alanwalton-stage-app.shell-script.scripting.code.ts"

const MOVED = "code-system"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("the icon the script copies is a file that is there", () => {
  expect(existsSync(join(ROOT, iconIn(ROOT)))).toBe(true)
})

test("the icon is named under the package holding it rather than by where that package sits", () => {
  expect(bodyIn(ROOT)).toContain(underWebIn(ROOT))
  expect(bodyIn(ROOT)).not.toContain(iconIn(ROOT))
})
