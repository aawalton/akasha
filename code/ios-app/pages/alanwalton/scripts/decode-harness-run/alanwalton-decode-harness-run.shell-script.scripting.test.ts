import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodyIn } from "akasha/code/ios-app/pages/alanwalton/scripts/decode-harness-run/alanwalton-decode-harness-run.shell-script.scripting.code.ts"
import {
  componentSwiftIn,
  mainSwiftIn,
} from "akasha/code/ios-app/pages/alanwalton/scripts/decode-harness-run/alanwalton-decode-harness-run.shell-script.scripting.test-fixtures.ts"
import { alanwaltonDecodeHarness } from "akasha/code/ios-program/pages/alanwalton-decode-harness/alanwalton-decode-harness.ios-program.ts"
import { namedIn } from "akasha/code/path/test-fixtures/script-paths/script-paths.test-fixture.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-decode-harness-run.shell-script.shell.sh"

const OWN = "alanwalton-decode-harness-run.shell-script.scripting.code.ts"

const MOVED = "code-system"

const SPECIFIER = /"akasha\/[^"]*"/g

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved in nothing it writes", () => {
  expect(readFileSync(join(HERE, OWN), "utf8").replace(SPECIFIER, "")).not.toContain(MOVED)
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

test("the program this script builds compiles every component its page names", () => {
  expect(componentSwiftIn(ROOT)).toHaveLength(alanwaltonDecodeHarness.components.length)
})
