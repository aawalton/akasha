import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  scriptFilesIn,
} from "akasha/code-system/ios-apps/pages/atlas/scripts/ios-add/atlas-ios-add.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "atlas-ios-add.shell-script.shell.sh"

const OWN = "atlas-ios-add.shell-script.scripting.code.ts"

const MOVED = "code-system"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the script spells the folder being moved nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(MOVED)
})

test("every file the script reaches in this repository is a file that is there", () => {
  const gone = scriptFilesIn(ROOT).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the script reaches the shared config script, the config beside the app and the seam", () => {
  expect(scriptFilesIn(ROOT)).toHaveLength(3)
})
