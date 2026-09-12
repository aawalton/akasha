import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  modulesIn,
} from "akasha/infrastructure/machines/provisioning/scripts/ci-cost-snapshot/ci-cost-snapshot.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "ci-cost-snapshot.shell-script.shell.sh"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("each module the script runs is a file that is there", () => {
  const gone = modulesIn(ROOT).filter((one) => !existsSync(join(ROOT, one)))
  expect(gone).toEqual([])
})

test("the script runs the module reading a seat and the module showing what a seat cost", () => {
  expect(modulesIn(ROOT)).toHaveLength(2)
})

test("the body names each module at the path that module's page holds its code in", () => {
  for (const one of modulesIn(ROOT)) expect(bodyIn(ROOT)).toContain(one)
})
