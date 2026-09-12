import { expect, test } from "bun:test"
import { existsSync, readFileSync, realpathSync } from "node:fs"
import { join } from "node:path"
import { harnessSettingsAt } from "akasha/agents/settings/harness-settings-reading/harness-settings-reading.module.code.ts"
import { ownRepoRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { agentSettings } from "akasha/seat-system/supervising/supervisor-agent-settings/supervisor-agent-settings.module.code.ts"

const AGENTS = "agents"

const UNKNOWN = "the settings a seat spawns on are unknown"

const ROOT = ownRepoRoot()

const SETTINGS_AT = join(ROOT, harnessSettingsAt(ROOT, AGENTS, UNKNOWN))

const RUN = "bash "

const BASH_ENV_ENDS = "bash-env.shell-script.shell.sh"

const STATUSLINE_ENDS = "statusline.shell-script.shell.sh"

const document = agentSettings()

function objectAt(held: Record<string, unknown>, key: string): Record<string, unknown> {
  const said = held[key]
  if (said === null || typeof said !== "object" || Array.isArray(said)) {
    throw new Error(`the settings document carries no \`${key}\` object`)
  }
  return said as Record<string, unknown>
}

function textAt(held: Record<string, unknown>, key: string): string {
  const said = held[key]
  if (typeof said !== "string") throw new Error(`\`${key}\` carries no text`)
  return said
}

test("`BASH_ENV` is the absolute path of the shell file beside the `bash-env` page", () => {
  const at = textAt(objectAt(document, "env"), "BASH_ENV")
  expect(at).toStartWith("/")
  expect(at).toEndWith(BASH_ENV_ENDS)
  expect(existsSync(at)).toBe(true)
})

test("the statusline runs bash over the shell file beside the `statusline` page", () => {
  const held = objectAt(document, "statusLine")
  expect(textAt(held, "type")).toBe("command")
  const command = textAt(held, "command")
  expect(command).toStartWith(RUN)
  const at = command.slice(RUN.length)
  expect(at).toStartWith("/")
  expect(at).toEndWith(STATUSLINE_ENDS)
  expect(existsSync(at)).toBe(true)
})

test("neither shared script is handed to a seat as a path inside this checkout", () => {
  const at = textAt(objectAt(document, "env"), "BASH_ENV")
  const command = textAt(objectAt(document, "statusLine"), "command").slice(RUN.length)

  expect(at.startsWith(`${ROOT}/`)).toBe(false)
  expect(command.startsWith(`${ROOT}/`)).toBe(false)
  expect(realpathSync(command)).toStartWith(`${ROOT}/`)
})

test("the env keys the page states are kept beside the key akasha derives", () => {
  const env = objectAt(document, "env")
  expect(textAt(env, "DISABLE_AUTOUPDATER")).toBe("1")
  expect(textAt(env, "ENABLE_TOOL_SEARCH")).toBe("true")
})

test("the hooks akasha declares are merged in", () => {
  expect(Object.keys(objectAt(document, "hooks")).length).toBeGreaterThan(0)
})

test("the settings page spells no path into this repository", () => {
  const raw = readFileSync(SETTINGS_AT, "utf8")
  expect(raw).not.toContain("repos/akasha")
  expect(raw).not.toContain("code-system")
})
