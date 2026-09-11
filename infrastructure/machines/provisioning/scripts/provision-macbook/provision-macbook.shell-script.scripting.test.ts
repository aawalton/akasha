import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import { bodyIn } from "akasha/infrastructure/machines/provisioning/scripts/provision-macbook/provision-macbook.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "provision-macbook.shell-script.shell.sh"

const OWN = "provision-macbook.shell-script.scripting.code.ts"

const UNDER = "machines"

const SHELL_SCRIPT = "shell-script"

const SHELL = "shell"

const PROVISIONED = "provisioned-file"

const CONTENT = "content"

function reached(): readonly string[] {
  return [
    fileOf(ROOT, valuedAt(ROOT, SHELL_SCRIPT, "repo-roots"), SHELL_SCRIPT, SHELL),
    fileOf(ROOT, valuedAt(ROOT, SHELL_SCRIPT, "setup-symlinks"), SHELL_SCRIPT, SHELL),
    fileOf(ROOT, valuedAt(ROOT, PROVISIONED, "macbook-brewfile"), PROVISIONED, CONTENT),
  ]
}

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("the code writing the body spells no folder of this repository", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(UNDER)
})

test("every page file the body reaches is a file that is there", () => {
  expect(reached().filter((one) => !existsSync(join(ROOT, one)))).toEqual([])
})

test("the body names each page file under the name the index answered", () => {
  const said = bodyIn(ROOT)
  expect(reached().filter((one) => !said.includes(basename(one)))).toEqual([])
})
