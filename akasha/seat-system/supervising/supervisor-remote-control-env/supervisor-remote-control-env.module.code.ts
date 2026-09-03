import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { shape } from "@tools/lib/shape"
import type { RemoteControlEnv } from "../supervisor-env/supervisor-env.module.code.ts"

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

const RC_SETTINGS_PATH = new URL(
  "../../agent-settings/pages/remote-control/remote-control.agent-settings.harness-settings.json",
  import.meta.url
).pathname

const RC_SETTINGS_SCHEMA = shape.object({
  fallbackScopes: shape.array(shape.string()),
})

function declaredFallbackScopes(): string {
  const raw = readFileSync(RC_SETTINGS_PATH, "utf-8")
  const declared = RC_SETTINGS_SCHEMA.parse(JSON.parse(raw)).fallbackScopes
  if (declared.length === 0) {
    throw new Error(
      `${RC_SETTINGS_PATH} declares no fallback scopes, and remote control claims the scopes it is given`
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
  if (!opts.remoteControlWanted) return undefined

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
