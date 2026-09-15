import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  bodyIn,
  dnsBesideIn,
  nodesBesideIn,
  ownShellIn,
} from "akasha/infrastructure/cluster/operation/deploy-functions/deploy-functions.shell-script.scripting.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const READING = readingIn(ROOT)

const HERE = dirname(import.meta.path)

const SCRIPT = "deploy-functions.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(READING)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every path the body names is a file that is there", () => {
  const under = dirname(join(ROOT, ownShellIn(READING)))
  const named = [join(under, nodesBesideIn(READING)), join(under, dnsBesideIn(READING))]
  expect(named.filter((one) => !existsSync(one))).toEqual([])
})

test("the body names its own file by the name the page gives that file", () => {
  expect(bodyIn(READING)).toContain(basename(ownShellIn(READING)))
})

test("the body tells shellcheck where the sourced script sits and then sources it", () => {
  const said = bodyIn(READING).split("\n")
  expect(said.filter((one) => one.includes(dnsBesideIn(READING)))).toHaveLength(2)
})
