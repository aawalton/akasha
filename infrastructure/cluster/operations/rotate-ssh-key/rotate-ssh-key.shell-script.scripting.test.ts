import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  sourcedIn,
} from "akasha/infrastructure/cluster/operations/rotate-ssh-key/rotate-ssh-key.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "rotate-ssh-key.shell-script.shell.sh"

const OWN = "rotate-ssh-key.shell-script.scripting.code.ts"

const SOURCED = "deploy-functions.shell-script.shell.sh"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the script this one reads in is reached where the index says that script sits", () => {
  expect(existsSync(join(HERE, sourcedIn(ROOT)))).toBe(true)
})

test("the code writing the body spells the name of the script read in nowhere", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(SOURCED)
})

test("the body names the script read in where the shell reads it and where shellcheck is told", () => {
  const said = bodyIn(ROOT)
    .split("\n")
    .filter((one) => one.includes(SOURCED))
  expect(said).toHaveLength(2)
})
