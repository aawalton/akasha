import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/code/ios-apps/pages/smilingjenny/scripts/ios-seam/smilingjenny-ios-seam.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "smilingjenny-ios-seam.shell-script.shell.sh"

const OWN = "smilingjenny-ios-seam.shell-script.scripting.code.ts"

const UNDER = "code-system"

const SOURCED = "# shellcheck source="

function sourcedIn(said: string): readonly string[] {
  return said
    .split("\n")
    .filter((one) => one.startsWith(SOURCED))
    .map((one) => one.slice(SOURCED.length))
}

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder its pages sit under nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(UNDER)
})

test("every script this one reads in is a file at the path the line naming it gives", () => {
  const gone = sourcedIn(bodyIn(ROOT)).filter((one) => !existsSync(join(HERE, one)))
  expect(gone).toEqual([])
})

test("the scripts read in are the three above every app and the four beside this one", () => {
  expect(sourcedIn(bodyIn(ROOT))).toHaveLength(7)
})
