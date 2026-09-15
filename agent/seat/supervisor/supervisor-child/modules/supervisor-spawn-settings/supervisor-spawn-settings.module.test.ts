import { expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { SettingsDocumentFault } from "akasha/agent/seat/supervisor/supervisor-child/modules/supervisor-agent-settings/supervisor-agent-settings.module.code.ts"
import {
  materializeSpawnSettings,
  readAgentSettingsBase,
} from "akasha/agent/seat/supervisor/supervisor-child/modules/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

const OVERRIDES = { remoteControlAtStartup: true }

const MISSING_PAGE = "the index answers no one page for `shell-script/bash-env`"

const MISSING_DOCUMENT = "the agent settings document could not be read"

function reasonOf(base: Awaited<ReturnType<typeof readAgentSettingsBase>>): string {
  return base.kind === "loaded" ? "" : base.reason
}

test("a settings document that will not read leaves the spawn carrying the overrides", async () => {
  const base = await readAgentSettingsBase(() => {
    throw new SettingsDocumentFault(MISSING_DOCUMENT)
  })
  expect(base.kind).toBe("absent")
  expect(reasonOf(base)).toContain(MISSING_DOCUMENT)
})

test("a page the agent settings reach for and miss refuses the spawn", async () => {
  const base = await readAgentSettingsBase(() => {
    throw new Error(MISSING_PAGE)
  })
  expect(base.kind).toBe("refused")
  expect(reasonOf(base)).toContain(MISSING_PAGE)
})

test("a refusal reaches whoever asked for a spawn's settings file", async () => {
  const asked = materializeSpawnSettings(OVERRIDES, {
    ask: () => {
      throw new Error(MISSING_PAGE)
    },
  })
  await expect(asked).rejects.toThrow(MISSING_PAGE)
})

test("the settings are read once for a spawn rather than asked for until they answer", async () => {
  let asked = 0
  const target = await materializeSpawnSettings(OVERRIDES, {
    ask: () => {
      asked += 1
      return { hooks: {} }
    },
    tmpDir: SCRATCH_AT,
  })

  expect(asked).toBe(1)
  expect(target).toContain("agent-settings-")
  rmSync(target, { force: true })
})
