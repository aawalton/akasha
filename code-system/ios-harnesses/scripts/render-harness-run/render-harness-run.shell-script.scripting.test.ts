import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  appsIn,
  componentSwiftIn,
  harnessSwiftIn,
  scriptIn,
} from "./render-harness-run.shell-script.scripting.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "render-harness-run.shell-script.shell.sh"

const OWN = "render-harness-run.shell-script.scripting.code.ts"

const MOVED = "code-system"

const UNDER = '"$AKASHA_ROOT/'

const CLOSING = '"'

const WIDGET = "-widget"

function committed(): string {
  return readFileSync(join(HERE, SCRIPT), "utf8")
}

function namedIn(script: string): readonly string[] {
  const found: string[] = []
  for (const line of script.split("\n")) {
    const at = line.indexOf(UNDER)
    if (at < 0) continue
    const said = line.slice(at + UNDER.length)
    if (!said.endsWith(CLOSING)) continue
    found.push(said.slice(0, -CLOSING.length))
  }
  return found
}

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(scriptIn(ROOT)).toBe(committed())
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every path the script names in this repository is a file that is there", () => {
  const gone = namedIn(scriptIn(ROOT)).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the script names each app's components, each harness page's Swift and the entry", () => {
  const each = appsIn(ROOT).map((one) => componentSwiftIn(ROOT, `${one}${WIDGET}`).length)
  const said = each.reduce((one, two) => one + two, 0)
  expect(namedIn(scriptIn(ROOT))).toHaveLength(said + harnessSwiftIn(ROOT).length + 1)
})

test("the apps the script draws for are those akasha holds a widget program for", () => {
  expect(appsIn(ROOT)).toEqual(["alanwalton", "smilingjenny"])
})

test("the harness's own Swift is one file for each ios-harness page that states Swift", () => {
  expect(harnessSwiftIn(ROOT)).toHaveLength(9)
})
