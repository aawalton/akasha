import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { basename, dirname, join } from "node:path"
import {
  bodyIn,
  functionsBesideIn,
  ownShellIn,
  sayingCodeIn,
} from "akasha/infrastructure/cluster/operations/bootstrap-namespace/bootstrap-namespace.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "bootstrap-namespace.shell-script.shell.sh"

test("the body written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every path the body names is a file that is there", () => {
  const under = dirname(join(ROOT, ownShellIn(ROOT)))
  const named = [join(ROOT, sayingCodeIn(ROOT)), join(under, functionsBesideIn(ROOT))]
  expect(named.filter((one) => !existsSync(one))).toEqual([])
})

test("the body tells shellcheck where the sourced script sits and then sources it", () => {
  const said = bodyIn(ROOT).split("\n")
  expect(said.filter((one) => one.includes(basename(functionsBesideIn(ROOT))))).toHaveLength(2)
})

test("the body reaches the secret saying under the root it found rather than under a guess", () => {
  expect(bodyIn(ROOT)).toContain(`SECRET_SAYING="\${AKASHA_ROOT}/${sayingCodeIn(ROOT)}"`)
})
