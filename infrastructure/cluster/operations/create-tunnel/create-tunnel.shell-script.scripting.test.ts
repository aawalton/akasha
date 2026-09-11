import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bodyIn,
  credsHeldIn,
  credsPageIn,
  sourcedIn,
  tunnelConfigIn,
} from "akasha/infrastructure/cluster/operations/create-tunnel/create-tunnel.shell-script.scripting.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const SCRIPT = "create-tunnel.shell-script.shell.sh"

const RELATIVE = "# shellcheck source=../"

test("the script written here is the script committed beside this test, byte for byte", () => {
  expect(bodyIn(ROOT)).toBe(readFileSync(join(HERE, SCRIPT), "utf8"))
})

test("every path the index answered is a file that is there", () => {
  const each = [sourcedIn(ROOT), credsPageIn(ROOT), credsHeldIn(ROOT), tunnelConfigIn(ROOT)]
  expect(each.filter((one) => !existsSync(join(ROOT, one)))).toEqual([])
})

test("the body carries each path the index answered rather than a spelling of its own", () => {
  const body = bodyIn(ROOT)
  const each = [credsPageIn(ROOT), credsHeldIn(ROOT), tunnelConfigIn(ROOT)]
  expect(each.filter((one) => !body.includes(one))).toEqual([])
})

test("the script sourced beside this one is reached from this folder rather than from the root", () => {
  expect(bodyIn(ROOT)).toContain(RELATIVE)
})
