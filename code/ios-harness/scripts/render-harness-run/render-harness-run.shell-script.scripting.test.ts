import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  appsIn,
  bodyIn,
  componentSwiftIn,
  harnessSwiftIn,
} from "akasha/code/ios-harness/scripts/render-harness-run/render-harness-run.shell-script.scripting.code.ts"
import { namedIn } from "akasha/code/path/test-fixtures/script-paths/script-paths.test-fixture.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "render-harness-run.shell-script.shell.sh"

const OWN = "render-harness-run.shell-script.scripting.code.ts"

const MOVED = "code-system"

const WIDGET = "-widget"

const STAGED = '  STAGED_WIDGET_DIR="$WIDGET_DIR"'

const STAGED_TRAP = "  trap 'rm -rf \"$STAGED_WIDGET_DIR\" || true' EXIT"

const TRAP = "trap "

const REMOVES = "rm -rf"

const KEPT = "|| true"

const COMMENT = "#"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every path the script names in this repository is a file that is there", () => {
  const gone = namedIn(bodyIn(ROOT)).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the script names each app's components, each harness page's Swift and the entry", () => {
  const each = appsIn(ROOT).map((one) => componentSwiftIn(ROOT, `${one}${WIDGET}`).length)
  const said = each.reduce((one, two) => one + two, 0)
  expect(namedIn(bodyIn(ROOT))).toHaveLength(said + harnessSwiftIn(ROOT).length + 1)
})

test("the apps the script draws for are those akasha holds a widget program for", () => {
  expect(appsIn(ROOT)).toEqual(["alanwalton", "smilingjenny"])
})

test("the harness's own Swift is one file for each ios-harness page that states Swift", () => {
  expect(harnessSwiftIn(ROOT)).toHaveLength(9)
})

test("the staging directory is registered for removal where the script makes it", () => {
  const lines = bodyIn(ROOT).split("\n")
  const staged = lines.indexOf(STAGED)
  const trapped = lines.indexOf(STAGED_TRAP)
  expect(staged).toBeGreaterThan(0)
  expect(trapped).toBeGreaterThan(staged)
  const between = lines
    .slice(staged + 1, trapped)
    .filter((one) => !one.trimStart().startsWith(COMMENT))
  expect(between).toEqual([])
})

test("no removal a trap carries strands the removals after it", () => {
  const trapped = bodyIn(ROOT)
    .split("\n")
    .filter((one) => one.trimStart().startsWith(TRAP))
  expect(trapped).toHaveLength(3)
  const stranding = trapped.filter((one) => one.split(REMOVES).length !== one.split(KEPT).length)
  expect(stranding).toEqual([])
})
