import { createHash } from "node:crypto"
import { existsSync, renameSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  agentSettings,
  isSettingsDocumentFault,
} from "akasha/agent/seat/supervisors/supervisor-child/modules/supervisor-agent-settings/supervisor-agent-settings.module.code.ts"
import { sayingWith } from "akasha/agent/seat/supervisors/supervisor-log/modules/supervisor-saying/supervisor-saying.module.code.ts"
import { harnessSettingsAt } from "akasha/agent/settings/modules/harness-settings-reading/harness-settings-reading.module.code.ts"
import {
  midRefresh,
  REFRESH_WAITED_AT_MOST_MS,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { ownRepoRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { shape } from "akasha/utils/narrow/modules/shape/shape.module.code.ts"

const LOG = "[spawn-settings]"

const AGENT_SETTINGS_MODULE = "supervisor-agent-settings"

const AGENTS = "agents"

const UNKNOWN = "the settings a seat spawns on are unknown"

function agentSettingsPath(): string {
  const root = ownRepoRoot()
  return join(root, harnessSettingsAt(root, AGENTS, UNKNOWN))
}

export const AGENT_SETTINGS_PATH = agentSettingsPath()

const PER_SPAWN_KEYS = ["remoteControlAtStartup"] as const

export type SpawnSettingsOverrides = {
  readonly [K in (typeof PER_SPAWN_KEYS)[number]]: boolean
}

export function refreshedSettings(
  existing: Record<string, unknown>,
  base: Record<string, unknown>
): Record<string, unknown> {
  const kept: Record<string, unknown> = {}
  for (const key of PER_SPAWN_KEYS) {
    if (key in existing) kept[key] = existing[key]
  }
  return { ...base, ...kept }
}

export type SpawnSettingsBase =
  | { readonly kind: "loaded"; readonly settings: Record<string, unknown> }
  | { readonly kind: "absent"; readonly reason: string }
  | { readonly kind: "refused"; readonly reason: string; readonly cause: unknown }

const SETTINGS_OBJECT = shape.record(shape.string(), shape.unknown())

function checkAgentSettings(document: Record<string, unknown>): SpawnSettingsBase {
  const parsed = SETTINGS_OBJECT.safeParse(document)
  if (!parsed.success) {
    return { kind: "absent", reason: "expected a JSON object at the top level" }
  }
  return { kind: "loaded", settings: parsed.data }
}

export type AskAgentSettings = () => Record<string, unknown>

export function readAgentSettingsBase(
  ask: AskAgentSettings = agentSettings
): Promise<SpawnSettingsBase> {
  let document: Record<string, unknown>
  try {
    document = ask()
  } catch (err) {
    const reason = `\`${AGENT_SETTINGS_MODULE}\` threw: ${err instanceof Error ? err.message : String(err)}`
    if (isSettingsDocumentFault(err)) return Promise.resolve({ kind: "absent", reason })
    return Promise.resolve({ kind: "refused", reason, cause: err })
  }
  return Promise.resolve(checkAgentSettings(document))
}

const ASKING_AGAIN_MS = 1_000

const REFRESHING = "the index is part way through a refresh, so the agent settings are read again"

export type SpawnSettingsSaying = (text: string) => undefined

export type SpawnSettingsWait = {
  readonly askingAgainMs?: number
  readonly waitingAtMostMs?: number
  readonly now?: () => number
  readonly say?: SpawnSettingsSaying
}

function asked(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function settingsPastRefresh(
  ask: AskAgentSettings = agentSettings,
  wait: SpawnSettingsWait = {}
): Promise<SpawnSettingsBase> {
  const askingAgainMs = wait.askingAgainMs ?? ASKING_AGAIN_MS
  const waitingAtMostMs = wait.waitingAtMostMs ?? REFRESH_WAITED_AT_MOST_MS
  const now = wait.now ?? Date.now
  const say = wait.say ?? sayingWith(LOG)
  const waitedSeconds = Math.round(waitingAtMostMs / 1_000)
  let waitingSince: number | null = null
  while (true) {
    const base = await readAgentSettingsBase(ask)
    if (base.kind !== "refused" || !midRefresh(base.cause)) return base
    if (waitingSince === null) {
      waitingSince = now()
      say(REFRESHING)
    } else if (now() - waitingSince >= waitingAtMostMs) {
      const gaveUp =
        `the index stayed part way through a refresh for ${waitedSeconds}s, so the settings a ` +
        "seat spawns on went unread"
      say(gaveUp)
      return { kind: "refused", reason: gaveUp, cause: base.cause }
    }
    await asked(askingAgainMs)
  }
}

function composeSpawnSettings(
  base: Record<string, unknown> | null,
  overrides: SpawnSettingsOverrides
): Record<string, unknown> {
  return { ...(base ?? {}), ...overrides }
}

function warnAbsent(reason: string): undefined {
  console.error(
    `${LOG} agent settings NOT loaded: \`${AGENT_SETTINGS_MODULE}\` — ${reason}.\n` +
      `${LOG} this spawn carries only the per-spawn overrides; every key the ` +
      `document declares (hooks, env, permissions, fastMode, statusLine) is inert ` +
      `for it. Restore agent/settings/pages/agent/agents.agent-settings.harness-settings.json.`
  )
}

function refusalOf(reason: string): string {
  return (
    `${LOG} this seat will not spawn: ${reason}.\n` +
    `${LOG} akasha's hooks and bash environment reach a seat through the agent settings, so a ` +
    "seat spawned without either looks healthy and guards nothing."
  )
}

export async function materializeSpawnSettings(
  overrides: SpawnSettingsOverrides,
  opts?: {
    readonly ask?: AskAgentSettings
    readonly tmpDir?: string
    readonly wait?: SpawnSettingsWait
  }
): Promise<string> {
  const base = await settingsPastRefresh(opts?.ask ?? agentSettings, opts?.wait)
  if (base.kind === "refused") throw new Error(refusalOf(base.reason))
  if (base.kind === "absent") warnAbsent(base.reason)

  const payload = composeSpawnSettings(base.kind === "loaded" ? base.settings : null, overrides)
  const contents = JSON.stringify(payload)
  const digest = createHash("sha256").update(contents).digest("hex").slice(0, 16)
  const target = `${opts?.tmpDir ?? "/var/tmp"}/agent-settings-${digest}.json`

  if (!existsSync(target)) {
    const tmp = `${target}.tmp-${process.pid}`
    writeFileSync(tmp, contents)
    renameSync(tmp, target)
  }
  return target
}
