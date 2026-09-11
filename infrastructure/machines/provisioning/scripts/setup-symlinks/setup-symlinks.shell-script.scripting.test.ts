import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/infrastructure/machines/provisioning/scripts/setup-symlinks/setup-symlinks.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "setup-symlinks.shell-script.shell.sh"

const LINK = "link "

const UNDER = '"$AKASHA_ROOT/'

const CLOSING = '"'

function namedUnder(body: string): readonly string[] {
  const found: string[] = []
  for (const line of body.split("\n")) {
    const at = line.indexOf(UNDER)
    if (at < 0) continue
    const said = line.slice(at + UNDER.length)
    const closed = said.indexOf(CLOSING)
    if (closed > 0) found.push(said.slice(0, closed))
  }
  return found
}

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every path the body names under the checkout root is there", () => {
  const gone = namedUnder(bodyIn(ROOT)).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the body writes one link line for each file this script places", () => {
  const each = bodyIn(ROOT)
    .split("\n")
    .filter((one) => one.trimStart().startsWith(LINK))
  expect(each).toHaveLength(16)
})
