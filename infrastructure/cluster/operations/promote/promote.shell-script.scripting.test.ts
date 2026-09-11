import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { runsIn } from "akasha/code/path-runs/path-runs.module.code.ts"
import { bodyIn } from "akasha/infrastructure/cluster/operations/promote/promote.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "promote.shell-script.shell.sh"

const UP = "../"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every way out of this folder the script spells lands on something that is there", () => {
  const ways = runsIn(bodyIn(ROOT))
    .flatMap((one) => one.said)
    .filter((one) => one.startsWith(UP))
  expect(ways.filter((one) => !existsSync(join(HERE, one)))).toEqual([])
  expect(ways.length).toBeGreaterThan(0)
})
