import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  dispatcherIn,
} from "akasha/infrastructure/machines/provisioning/scripts/akasha-launcher/akasha-launcher.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "akasha-launcher.shell-script.shell.sh"

const OWN = "akasha-launcher.shell-script.scripting.code.ts"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the body spells the dispatcher's path nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(dispatcherIn(ROOT))
})

test("the dispatcher the body names is a file that is there", () => {
  expect(existsSync(join(ROOT, dispatcherIn(ROOT)))).toBe(true)
})

test("the body names the dispatcher where the comment says it sits and where the run reaches it", () => {
  const said = bodyIn(ROOT).split("\n")
  expect(said.filter((one) => one.includes(dispatcherIn(ROOT)))).toHaveLength(2)
})
