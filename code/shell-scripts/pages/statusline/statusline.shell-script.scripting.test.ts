import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/code/shell-scripts/pages/statusline/statusline.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "statusline.shell-script.shell.sh"

const OWN = "statusline.shell-script.scripting.code.ts"

const SEATS = "seat-system/"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the body spells no path under the folder holding the seats", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(SEATS)
})
