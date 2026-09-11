import { expect, test } from "bun:test"
import { existsSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  ranBy,
  settingsIn,
} from "akasha/seat-system/agent-settings/pages/mcp-servers/mcp-servers.agent-settings.telling.code.ts"

const ROOT = codeRoot()

const HERE = dirname(import.meta.path)

const WRITTEN = "mcp-servers.agent-settings.harness-settings.json"

const OWN = "mcp-servers.agent-settings.telling.code.ts"

test("what is written here is what is committed beside this test, byte for byte", () => {
  expect(settingsIn(ROOT)).toBe(readFileSync(join(HERE, WRITTEN), "utf8"))
})

test("the module the harness is told to run is a file that is there", () => {
  expect(existsSync(join(ROOT, ranBy(ROOT)))).toBe(true)
})

test("the code writing the settings spells none of that module's path", () => {
  expect(readFileSync(join(HERE, OWN), "utf8")).not.toContain(ranBy(ROOT))
})
