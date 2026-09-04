import { z } from "zod"
import { DEFAULT_DOWNSTREAM_KEEPALIVE_MS } from "../keepalive/keepalive.module.code.ts"

export const DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS = 600_000

const blankIsAbsent = (value: unknown): unknown =>
  typeof value === "string" && value.trim() === "" ? undefined : value

const NON_EMPTY_STRING = z.string().min(1)

const PORT_INT = z.coerce.number().int().min(0).max(65535).default(0)

const IDLE_TIMEOUT_MS = z.preprocess(
  blankIsAbsent,
  z.coerce
    .number()
    .int()
    .min(0)
    .catch(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
    .default(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
)

const KEEPALIVE_MS = z.preprocess(
  blankIsAbsent,
  z.coerce
    .number()
    .int()
    .min(0)
    .catch(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
    .default(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
)

const BOOT_ENV_SCHEMA = z.object({
  OAUTH_PROXY_AGENT_ID: NON_EMPTY_STRING,
  OAUTH_PROXY_LOG_DIR: NON_EMPTY_STRING,
  OAUTH_PROXY_REGISTRATION_ACCOUNT: NON_EMPTY_STRING,
  OAUTH_PROXY_VERSION: NON_EMPTY_STRING.default("unknown"),
  OAUTH_PROXY_PORT: PORT_INT,
  OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: IDLE_TIMEOUT_MS,
  OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: KEEPALIVE_MS,
})

export type OAuthProxyBootEnv = {
  agentId: string
  logDir: string
  registrationAccount: string
  oauthProxyVersion: string
  port: number
  upstreamIdleTimeoutMs: number
  downstreamKeepaliveMs: number
}

export function parseBootEnv(env: NodeJS.ProcessEnv): OAuthProxyBootEnv {
  const result = BOOT_ENV_SCHEMA.safeParse(env)
  if (!result.success) {
    const keys = result.error.issues
      .map((issue) => issue.path.join("."))
      .filter((key) => key.length > 0)
    const unique = [...new Set(keys)]
    const list = unique.length > 0 ? unique.join(", ") : "(unknown)"
    throw new Error(`oauth-proxy boot env invalid — missing/invalid key(s): ${list}`)
  }
  return {
    agentId: result.data.OAUTH_PROXY_AGENT_ID,
    logDir: result.data.OAUTH_PROXY_LOG_DIR,
    registrationAccount: result.data.OAUTH_PROXY_REGISTRATION_ACCOUNT,
    oauthProxyVersion: result.data.OAUTH_PROXY_VERSION,
    port: result.data.OAUTH_PROXY_PORT,
    upstreamIdleTimeoutMs: result.data.OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS,
    downstreamKeepaliveMs: result.data.OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS,
  }
}
