import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { harnessSettingsAt } from "akasha/agents/settings/harness-settings-reading/harness-settings-reading.module.code.ts"
import { ownRepoRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import type { RemoteControlEnv } from "akasha/seat-system/supervising/supervisor-env/supervisor-env.module.code.ts"
import { shape } from "akasha/utils/narrow/shape/shape.module.code.ts"

const CREDENTIAL_FILE_SCHEMA = shape
  .object({
    claudeAiOauth: shape
      .object({
        accessToken: shape.string().min(1),
        refreshToken: shape.string().min(1),
        expiresAt: shape.number(),
        scopes: shape.array(shape.string()).optional(),
        subscriptionType: shape.string().nullable().optional(),
        rateLimitTier: shape.string().nullable().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()

function readCredentialFileSync(
  credentialDir: string
): { accessToken: string; scopes: readonly string[]; expiresAt: number } | null {
  const credPath = join(credentialDir, ".credentials.json")
  try {
    const parsed = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(readFileSync(credPath, "utf-8")))
    const oauth = parsed.claudeAiOauth
    if (oauth == null || oauth.accessToken === "") return null
    return {
      accessToken: oauth.accessToken,
      scopes: oauth.scopes ?? [],
      expiresAt: oauth.expiresAt,
    }
  } catch {
    return null
  }
}

const REMOTE_CONTROL = "remote-control"

const UNKNOWN = "the scopes remote control falls back on are unknown"

const RC_SETTINGS_SCHEMA = shape.object({
  fallbackScopes: shape.array(shape.string()),
})

function declaredFallbackScopes(): string {
  const root = ownRepoRoot()
  const at = join(root, harnessSettingsAt(root, REMOTE_CONTROL, UNKNOWN))
  const raw = readFileSync(at, "utf-8")
  const declared = RC_SETTINGS_SCHEMA.parse(JSON.parse(raw)).fallbackScopes
  if (declared.length === 0) {
    throw new Error(
      `${at} declares no fallback scopes, and remote control claims the scopes it is given`
    )
  }
  return declared.join(" ")
}

export type ResolveRemoteControlEnvOpts = {
  remoteControlWanted: boolean
  socketPath: string
  configDir: string
  log?: (msg: string) => void
}

export function resolveRemoteControlEnv(
  opts: ResolveRemoteControlEnvOpts
): RemoteControlEnv | undefined {
  if (!opts.remoteControlWanted) {
    opts.log?.("remote-control: this spawn asked for none — RC omitted, inference stays on TCP")
    return undefined
  }

  const socketPath = opts.socketPath
  if (!existsSync(socketPath)) {
    opts.log?.(
      `remote-control: proxy unix socket absent (${socketPath}) — RC omitted, inference stays on TCP`
    )
    return undefined
  }

  const creds = readCredentialFileSync(opts.configDir)
  if (creds == null) {
    opts.log?.(
      `remote-control: no usable credentials at ${opts.configDir}/.credentials.json — RC omitted`
    )
    return undefined
  }

  const scopes = creds.scopes.length > 0 ? creds.scopes.join(" ") : declaredFallbackScopes()
  return {
    socketPath,
    oauthToken: creds.accessToken,
    scopes,
    credsFile: join(opts.configDir, ".credentials.json"),
  }
}
