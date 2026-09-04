import { expect, test } from "bun:test"
import {
  AGENT_LAUNCH_OPENED,
  AGENT_LAUNCH_SPAWNED,
  buildSupervisorEnv,
  isInheritedAnthropicRoutingEnvKey,
  isInheritedClaudeSessionEnvKey,
} from "./supervisor-env.module.code.ts"

const BASE = {
  agentId: "a",
  sessionId: "s",
  configDir: "/tmp/config",
  headless: true,
  subagentSpawnDepth: "2",
  toolTimeout: "60000",
  resumeThresholdMinutes: "45",
  resumeTokenThreshold: "100000",
}

test("an inherited Claude session key is named as one", () => {
  expect(isInheritedClaudeSessionEnvKey("CLAUDECODE")).toBe(true)
  expect(isInheritedClaudeSessionEnvKey("CLAUDE_CODE_ANYTHING")).toBe(true)
  expect(isInheritedClaudeSessionEnvKey("CLAUDE_CONFIG_DIR")).toBe(false)
})

test("an inherited routing key is named as one", () => {
  expect(isInheritedAnthropicRoutingEnvKey("ANTHROPIC_BASE_URL")).toBe(true)
  expect(isInheritedAnthropicRoutingEnvKey("ANTHROPIC_UNIX_SOCKET")).toBe(true)
  expect(isInheritedAnthropicRoutingEnvKey("ANTHROPIC_AUTH_TOKEN")).toBe(false)
})

test("an inherited session or routing key is stripped rather than passed on", () => {
  const held = buildSupervisorEnv({
    ...BASE,
    baseEnv: {
      CLAUDECODE: "1",
      CLAUDE_CODE_EFFORT_LEVEL: "high",
      ANTHROPIC_BASE_URL: "http://stale",
      ANTHROPIC_UNIX_SOCKET: "/stale.sock",
      PATH: "/usr/bin",
    },
  })
  expect(held.PATH).toBe("/usr/bin")
  expect(held.CLAUDECODE).toBeUndefined()
  expect(held.ANTHROPIC_BASE_URL).toBeUndefined()
  expect(held.ANTHROPIC_UNIX_SOCKET).toBeUndefined()
  expect(held.CLAUDE_CODE_EFFORT_LEVEL).toBeUndefined()
})

test("an inherited tool timeout wins over the one the conditions state", () => {
  expect(
    buildSupervisorEnv({ ...BASE, baseEnv: { MCP_TOOL_TIMEOUT: "999" } }).MCP_TOOL_TIMEOUT
  ).toBe("999")
  expect(buildSupervisorEnv({ ...BASE, baseEnv: { MCP_TOOL_TIMEOUT: "" } }).MCP_TOOL_TIMEOUT).toBe(
    "60000"
  )
  expect(buildSupervisorEnv({ ...BASE, baseEnv: {} }).MCP_TOOL_TIMEOUT).toBe("60000")
})

test("a headless launch is spawned and a headed one is opened", () => {
  expect(buildSupervisorEnv({ ...BASE, baseEnv: {} }).AGENT_LAUNCH).toBe(AGENT_LAUNCH_SPAWNED)
  expect(buildSupervisorEnv({ ...BASE, baseEnv: {}, headless: false }).AGENT_LAUNCH).toBe(
    AGENT_LAUNCH_OPENED
  )
})

test("resume thresholds are handed only to a headless child", () => {
  const spawned = buildSupervisorEnv({ ...BASE, baseEnv: {} })
  expect(spawned.CLAUDE_CODE_RESUME_THRESHOLD_MINUTES).toBe("45")
  const opened = buildSupervisorEnv({ ...BASE, baseEnv: {}, headless: false })
  expect(opened.CLAUDE_CODE_RESUME_THRESHOLD_MINUTES).toBeUndefined()
  expect(opened.CLAUDE_CODE_RESUME_TOKEN_THRESHOLD).toBeUndefined()
})

test("remote control writes the socket, token and scopes together", () => {
  const held = buildSupervisorEnv({
    ...BASE,
    baseEnv: {},
    remoteControl: {
      socketPath: "/run/rc.sock",
      oauthToken: "t",
      scopes: "all",
      credsFile: "/run/creds",
    },
  })
  expect(held.ANTHROPIC_UNIX_SOCKET).toBe("/run/rc.sock")
  expect(held.CLAUDE_CODE_OAUTH_TOKEN).toBe("t")
  expect(held.CLAUDE_CODE_OAUTH_SCOPES).toBe("all")
  expect(held.CLAUDE_CODE_SDK_HAS_HOST_AUTH_REFRESH).toBe("1")
})

test("the agent, session and config directory are always stated", () => {
  const held = buildSupervisorEnv({ ...BASE, baseEnv: {} })
  expect(held.AGENT_ID).toBe("a")
  expect(held.SESSION_ID).toBe("s")
  expect(held.CLAUDE_CONFIG_DIR).toBe("/tmp/config")
  expect(held.SUPERVISOR_PID).toBeUndefined()
})
