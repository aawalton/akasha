import { expect, test } from "bun:test"
import { SettingsDocumentFault } from "akasha/agents/seats/supervisors/supervisor-child/modules/supervisor-agent-settings/supervisor-agent-settings.module.code.ts"
import {
  materializeSpawnSettings,
  readAgentSettingsBase,
  settingsPastRefresh,
} from "akasha/agents/seats/supervisors/supervisor-child/modules/supervisor-spawn-settings/supervisor-spawn-settings.module.code.ts"

const OVERRIDES = { remoteControlAtStartup: true }

const MISSING_PAGE = "the index answers no one page for `shell-script/bash-env`"

const MISSING_DOCUMENT = "the agent settings document could not be read"

const MID_REFRESH =
  "the index is not there, so which `agent-settings` carries `agents` as its `slug` could not " +
  "be answered — an index that is missing is not an index naming none"

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

test("an index part way through a refresh is said once while the settings are read again", async () => {
  const said: string[] = []
  let asked = 0
  const base = await settingsPastRefresh(
    () => {
      asked += 1
      if (asked < 4) throw new Error(MID_REFRESH)
      return { hooks: {} }
    },
    {
      askingAgainMs: 1,
      say: (text) => {
        said.push(text)
      },
    }
  )

  expect(base.kind).toBe("loaded")
  expect(asked).toBe(4)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("part way through a refresh")
})

test("a wait that runs past its ceiling leaves the settings unread and says it gave up", async () => {
  const said: string[] = []
  let clock = 0
  const base = await settingsPastRefresh(
    () => {
      clock += 60
      throw new Error(MID_REFRESH)
    },
    {
      askingAgainMs: 1,
      waitingAtMostMs: 100,
      now: () => clock,
      say: (text) => {
        said.push(text)
      },
    }
  )

  expect(base.kind).toBe("refused")
  expect(reasonOf(base)).toContain("went unread")
  expect(said.some((one) => one.includes("went unread"))).toBe(true)
})

test("a spawn whose settings stayed unread refuses rather than spawning without them", async () => {
  let clock = 0
  const asked = materializeSpawnSettings(OVERRIDES, {
    ask: () => {
      clock += 60
      throw new Error(MID_REFRESH)
    },
    wait: {
      askingAgainMs: 1,
      waitingAtMostMs: 100,
      now: () => clock,
      say: () => undefined,
    },
  })
  await expect(asked).rejects.toThrow("part way through a refresh")
})
