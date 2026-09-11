import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  partsIn,
  upIn,
} from "akasha/code-system/ios-apps/pages/alanwalton/scripts/health-samples-drain/alanwalton-health-samples-drain.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "alanwalton-health-samples-drain.shell-script.shell.sh"

const OWN = "alanwalton-health-samples-drain.shell-script.scripting.code.ts"

const MOVED = "code-system"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every part the drain sources is a file that is there", () => {
  const gone = partsIn(ROOT).filter((one) => !existsSync(join(HERE, upIn(ROOT), one)))
  expect(gone).toEqual([])
})

test("the drain sources the four parts of the health-samples seam", () => {
  expect(partsIn(ROOT)).toHaveLength(4)
})
