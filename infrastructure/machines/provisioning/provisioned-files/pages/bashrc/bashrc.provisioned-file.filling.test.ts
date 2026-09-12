import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  bodyIn,
  launcherIn,
  rootsBesideIn,
  rootsUnderIn,
} from "akasha/infrastructure/machines/provisioning/provisioned-files/pages/bashrc/bashrc.provisioned-file.filling.code.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const CONTENT = "bashrc.provisioned-file.content.sh"

const OWN = "bashrc.provisioned-file.filling.code.ts"

const UNDER = "machines"

const SCRIPT = "shell-script"

const SHELL = "shell"

function reached(): readonly string[] {
  return [
    fileOf(ROOT, valuedAt(ROOT, SCRIPT, "repo-roots"), SCRIPT, SHELL),
    fileOf(ROOT, valuedAt(ROOT, SCRIPT, "akasha-launcher"), SCRIPT, SHELL),
  ]
}

test("the body written here is the content committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, CONTENT), "utf8"))
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

test("the way to repo-roots beside the page reaches repo-roots from the page's folder", () => {
  expect(existsSync(join(HERE, rootsBesideIn(ROOT)))).toBe(true)
})

test("the two spellings of repo-roots reach one file", () => {
  expect(join(HERE, rootsBesideIn(ROOT))).toBe(
    join(ROOT, fileOf(ROOT, valuedAt(ROOT, SCRIPT, "repo-roots"), SCRIPT, SHELL))
  )
})

test("a spelling read against the checkout root opens with the root the shell falls back to", () => {
  for (const one of [rootsUnderIn(ROOT), launcherIn(ROOT)]) {
    expect(one.startsWith("${AKASHA_ROOT:-$HOME/repos/akasha}/")).toBe(true)
  }
})
