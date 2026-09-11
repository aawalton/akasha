import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { landingOf } from "akasha/code-system/code-specifier/code-specifier.module.code.ts"
import {
  accountIn,
  brewfileIn,
  dispatcherIn,
  filedIn,
  manifestIn,
  rootsIn,
} from "akasha/machines/provisioning/scripts/provision-workstation/provision-workstation.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const OWN = "provision-workstation.shell-script.scripting.code.ts"

test("every page file the script names is a file that is there", () => {
  const each = [brewfileIn(ROOT), dispatcherIn(ROOT), accountIn(ROOT)]
  expect(each.filter((one) => !existsSync(join(ROOT, one)))).toEqual([])
})

test("the script reads the repo-roots script by climbing out of the folder it sits in", () => {
  expect(existsSync(join(HERE, rootsIn(ROOT)))).toBe(true)
})

test("the folder the brewfile is named against is the folder that brewfile sits under", () => {
  expect(brewfileIn(ROOT).startsWith(`${filedIn(ROOT)}/`)).toBe(true)
})

test("the module the program inside the script names lands on a file that is there", () => {
  const at = landingOf(HERE, manifestIn(ROOT)) ?? ""
  expect(at !== "" && existsSync(join(ROOT, at))).toBe(true)
})

test("the code writing the script spells none of the paths that script names", () => {
  const own = readFileSync(join(HERE, OWN), "utf8")
  const each = [accountIn(ROOT), brewfileIn(ROOT), dispatcherIn(ROOT), filedIn(ROOT), rootsIn(ROOT)]
  expect(each.filter((one) => own.includes(one))).toEqual([])
})
