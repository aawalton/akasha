import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/code/ios-apps/pages/alanwalton/scripts/ios-seam/alanwalton-ios-seam.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-ios-seam.shell-script.shell.sh"

const OWN = "alanwalton-ios-seam.shell-script.scripting.code.ts"

const MOVED = "code-system"

const SOURCED = "# shellcheck source="

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every script the seam reads in is a file that is there", () => {
  const said = bodyIn(ROOT)
    .split("\n")
    .filter((one) => one.startsWith(SOURCED))
    .map((one) => one.slice(SOURCED.length))
  expect(said).toHaveLength(25)
  expect(said.filter((one) => !existsSync(join(HERE, one)))).toEqual([])
})
