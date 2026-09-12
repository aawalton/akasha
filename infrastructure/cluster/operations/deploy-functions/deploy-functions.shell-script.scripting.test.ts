import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  bodyIn,
  dnsBesideIn,
  nodesBesideIn,
  ownShellIn,
} from "akasha/infrastructure/cluster/operations/deploy-functions/deploy-functions.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "deploy-functions.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every path the body names is a file that is there", () => {
  const under = dirname(join(ROOT, ownShellIn(ROOT)))
  const named = [join(under, nodesBesideIn(ROOT)), join(under, dnsBesideIn(ROOT))]
  expect(named.filter((one) => !existsSync(one))).toEqual([])
})

test("the body names its own file by the name the page gives that file", () => {
  expect(bodyIn(ROOT)).toContain(basename(ownShellIn(ROOT)))
})

test("the body tells shellcheck where the sourced script sits and then sources it", () => {
  const said = bodyIn(ROOT).split("\n")
  expect(said.filter((one) => one.includes(dnsBesideIn(ROOT)))).toHaveLength(2)
})
