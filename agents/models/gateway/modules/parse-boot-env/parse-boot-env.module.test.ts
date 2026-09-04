import { expect, test } from "bun:test"
import { DEFAULT_DOWNSTREAM_KEEPALIVE_MS } from "../keepalive/keepalive.module.code.ts"
import { DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS, parseBootEnv } from "./parse-boot-env.module.code.ts"

const REQUIRED = {
  OAUTH_PROXY_AGENT_ID: "agent-1",
  OAUTH_PROXY_LOG_DIR: "/var/log/gateway",
  OAUTH_PROXY_REGISTRATION_ACCOUNT: "account-1",
}

const withKeys = (extra: Record<string, string>): NodeJS.ProcessEnv => ({ ...REQUIRED, ...extra })

const thrownBy = (env: NodeJS.ProcessEnv): Error | null => {
  try {
    parseBootEnv(env)
    return null
  } catch (thrown) {
    return thrown instanceof Error ? thrown : new Error(String(thrown))
  }
}

test("boot refuses where a required key is absent", () => {
  expect(() => parseBootEnv({})).toThrow()
  expect(() => parseBootEnv({ OAUTH_PROXY_AGENT_ID: "a", OAUTH_PROXY_LOG_DIR: "/l" })).toThrow(
    /OAUTH_PROXY_REGISTRATION_ACCOUNT/
  )
})

test("a refusal names the keys that failed", () => {
  const failure = thrownBy({})
  expect(failure?.message).toBe(
    "oauth-proxy boot env invalid — missing/invalid key(s): OAUTH_PROXY_AGENT_ID, OAUTH_PROXY_LOG_DIR, OAUTH_PROXY_REGISTRATION_ACCOUNT"
  )
})

test("boot refuses by throwing rather than by returning a result", () => {
  const failure = thrownBy({})
  expect(failure).toBeInstanceOf(Error)
  expect(parseBootEnv(withKeys({})).agentId).toBe("agent-1")
})

test("an absent OAUTH_PROXY_VERSION reads as the word unknown", () => {
  expect(parseBootEnv(withKeys({})).oauthProxyVersion).toBe("unknown")
  expect(parseBootEnv(withKeys({ OAUTH_PROXY_VERSION: "v9" })).oauthProxyVersion).toBe("v9")
})

test("an absent OAUTH_PROXY_PORT reads as port zero", () => {
  expect(parseBootEnv(withKeys({})).port).toBe(0)
  expect(parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "8080" })).port).toBe(8080)
})

test("a port above 65535 refuses boot", () => {
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "65536" }))).toThrow(/OAUTH_PROXY_PORT/)
  expect(parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "65535" })).port).toBe(65535)
})

test("an unreadable OAUTH_PROXY_PORT refuses boot", () => {
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "abc" }))).toThrow(/OAUTH_PROXY_PORT/)
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "-1" }))).toThrow(/OAUTH_PROXY_PORT/)
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_PORT: "1.5" }))).toThrow(/OAUTH_PROXY_PORT/)
})

test("a blank timeout key reads as that key's default", () => {
  const parsed = parseBootEnv(
    withKeys({
      OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "   ",
      OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "",
    })
  )
  expect(parsed.upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
  expect(parsed.downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
})

test("an unreadable timeout key reads as that key's default", () => {
  const parsed = parseBootEnv(
    withKeys({
      OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "soon",
      OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "-5",
    })
  )
  expect(parsed.upstreamIdleTimeoutMs).toBe(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS)
  expect(parsed.downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
  const read = parseBootEnv(
    withKeys({
      OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "42",
      OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "7",
    })
  )
  expect(read.upstreamIdleTimeoutMs).toBe(42)
  expect(read.downstreamKeepaliveMs).toBe(7)
})

test("the upstream idle timeout default is ten minutes", () => {
  expect(DEFAULT_UPSTREAM_IDLE_TIMEOUT_MS).toBe(600_000)
  expect(parseBootEnv(withKeys({})).upstreamIdleTimeoutMs).toBe(600_000)
})

test("the downstream keepalive default comes from the keepalive module", () => {
  expect(parseBootEnv(withKeys({})).downstreamKeepaliveMs).toBe(DEFAULT_DOWNSTREAM_KEEPALIVE_MS)
})

test("the parsed settings carry no environment key beyond the seven declared keys", () => {
  const parsed = parseBootEnv(withKeys({ PATH: "/usr/bin", HOME: "/root", OAUTH_PROXY: "x" }))
  expect(Object.keys(parsed).sort()).toEqual([
    "agentId",
    "downstreamKeepaliveMs",
    "logDir",
    "oauthProxyVersion",
    "port",
    "registrationAccount",
    "upstreamIdleTimeoutMs",
  ])
})

test("a blank OAUTH_PROXY_VERSION refuses boot", () => {
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_VERSION: "" }))).toThrow(/OAUTH_PROXY_VERSION/)
})

test("a whitespace-only OAUTH_PROXY_AGENT_ID parses as an agent id", () => {
  expect(parseBootEnv(withKeys({ OAUTH_PROXY_AGENT_ID: "   " })).agentId).toBe("   ")
  expect(() => parseBootEnv(withKeys({ OAUTH_PROXY_AGENT_ID: "" }))).toThrow(/OAUTH_PROXY_AGENT_ID/)
})
