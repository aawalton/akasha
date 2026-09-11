import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  partsIn,
} from "akasha/code/ios-apps/pages/alanwalton/scripts/kokoro-tts/alanwalton-kokoro-tts.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-kokoro-tts.shell-script.shell.sh"

const OWN = "alanwalton-kokoro-tts.shell-script.scripting.code.ts"

const MOVED = "code-system"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the body spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("the body sources the three parts this script is made of", () => {
  expect(partsIn(ROOT)).toHaveLength(3)
})

test("every part the body sources is a file that is there", () => {
  const gone = partsIn(ROOT).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the body sources each part once and tells shellcheck where each part sits", () => {
  const said = bodyIn(ROOT).split("\n")
  expect(said.filter((one) => one.startsWith(". "))).toHaveLength(partsIn(ROOT).length)
  expect(said.filter((one) => one.startsWith("# shellcheck source="))).toHaveLength(
    partsIn(ROOT).length
  )
})
