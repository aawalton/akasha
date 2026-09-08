import { createHash } from "node:crypto"
import { existsSync, renameSync, writeFileSync } from "node:fs"
import { shape } from "@akasha/utils-narrow/shape"
import { agentSettings } from "../supervisor-agent-settings/supervisor-agent-settings.module.code.ts"

const LOG = "[spawn-settings]"

export const AGENT_SETTINGS_MODULE = "supervisor-agent-settings"

export const AGENT_SETTINGS_PATH = new URL(
  "../../agent-settings/pages/agents/agents.agent-settings.harness-settings.json",
  import.meta.url
).pathname

export const PER_SPAWN_KEYS = ["remoteControlAtStartup"] as const

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

const SETTINGS_OBJECT = shape.record(shape.string(), shape.unknown())

export function checkAgentSettings(document: Record<string, unknown>): SpawnSettingsBase {
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
    return Promise.resolve({
      kind: "absent",
      reason: `\`${AGENT_SETTINGS_MODULE}\` threw: ${err instanceof Error ? err.message : String(err)}`,
    })
  }
  return Promise.resolve(checkAgentSettings(document))
}

export function composeSpawnSettings(
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
      `for it. Restore seat-system/agent-settings/pages/agents/agents.agent-settings.harness-settings.json.`
  )
}

export async function materializeSpawnSettings(
  overrides: SpawnSettingsOverrides,
  opts?: { readonly ask?: AskAgentSettings; readonly tmpDir?: string }
): Promise<string> {
  const base = await readAgentSettingsBase(opts?.ask ?? agentSettings)
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
