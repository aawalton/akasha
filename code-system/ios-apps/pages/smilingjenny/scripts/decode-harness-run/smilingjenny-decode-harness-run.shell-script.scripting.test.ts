import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  componentSwiftIn,
  mainSwiftIn,
} from "akasha/code-system/ios-apps/pages/smilingjenny/scripts/decode-harness-run/smilingjenny-decode-harness-run.shell-script.scripting.code.ts"
import { namedIn } from "akasha/code-system/script-paths/script-paths.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "smilingjenny-decode-harness-run.shell-script.shell.sh"

const OWN = "smilingjenny-decode-harness-run.shell-script.scripting.code.ts"

const MOVED = "code-system"

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

test("the script names one file for each component the program compiles, and the entry", () => {
  expect(namedIn(bodyIn(ROOT))).toHaveLength(componentSwiftIn(ROOT).length + 1)
})

test("the entry the script compiles is the main.swift beside the program's own page", () => {
  expect(existsSync(join(ROOT, mainSwiftIn(ROOT)))).toBe(true)
})

test("the program this script builds compiles seventeen components", () => {
  expect(componentSwiftIn(ROOT)).toHaveLength(17)
})
