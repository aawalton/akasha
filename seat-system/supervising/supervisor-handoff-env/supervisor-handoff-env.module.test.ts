import { expect, test } from "bun:test"
import { asPid } from "../supervisor-exec/supervisor-exec.module.code.ts"
import {
  buildHandoffEnv,
  CLAUDE_ACCOUNT_ENV,
  CLAUDE_AGENT_ID_ENV,
  CLAUDE_CONFIG_DIR_ENV,
  CLAUDE_PID_ENV,
  CLAUDE_PROCESS_ID_ENV,
  CLAUDE_SESSION_ID_ENV,
  PROXY_OWNER_AGENT_ID_ENV,
  parseSupervisorHandoffEnv,
  resolveProxyOwnerAgentId,
} from "./supervisor-handoff-env.module.code.ts"

const WHOLE = {
  pid: asPid(4242),
  processId: "p",
  account: "aawalton",
  configDir: "/var/tmp/config",
  agentId: "a",
  sessionId: "s",
}

test("what is built is what is read back", () => {
  const env = buildHandoffEnv({ claude: WHOLE, proxyOwnerAgentId: "owner" })
  const held = parseSupervisorHandoffEnv(env)
  expect(held.claude).toEqual(WHOLE)
  expect(held.proxyOwnerAgentId).toBe("owner")
})

test("an empty environment hands nothing over", () => {
  expect(parseSupervisorHandoffEnv({})).toEqual({ claude: null, proxyOwnerAgentId: null })
})

test("a handoff missing one of its parts is ignored rather than half-read", () => {
  const env = buildHandoffEnv({ claude: WHOLE })
  delete env[CLAUDE_CONFIG_DIR_ENV]
  expect(parseSupervisorHandoffEnv(env).claude).toBeNull()
})

test("a pid that is not a positive integer is no handoff", () => {
  for (const raw of ["0", "-1", "4.2", "notapid", ""]) {
    const env = { ...buildHandoffEnv({ claude: WHOLE }), [CLAUDE_PID_ENV]: raw }
    expect(parseSupervisorHandoffEnv(env).claude).toBeNull()
  }
})

test("an empty proxy owner is not written into the handoff", () => {
  expect(buildHandoffEnv({ proxyOwnerAgentId: "" })[PROXY_OWNER_AGENT_ID_ENV]).toBeUndefined()
})

test("a proxy owner absent from the handoff is the session's own agent", () => {
  expect(resolveProxyOwnerAgentId({ handoffProxyOwnerAgentId: null, sessionAgentId: "mine" })).toBe(
    "mine"
  )
  expect(
    resolveProxyOwnerAgentId({ handoffProxyOwnerAgentId: "theirs", sessionAgentId: "mine" })
  ).toBe("theirs")
})

test("every key the handoff writes is one it says it carries", () => {
  const env = buildHandoffEnv({ claude: WHOLE, proxyOwnerAgentId: "owner" })
  expect(Object.keys(env).sort()).toEqual(
    [
      CLAUDE_PID_ENV,
      CLAUDE_PROCESS_ID_ENV,
      CLAUDE_ACCOUNT_ENV,
      CLAUDE_CONFIG_DIR_ENV,
      CLAUDE_AGENT_ID_ENV,
      CLAUDE_SESSION_ID_ENV,
      PROXY_OWNER_AGENT_ID_ENV,
    ].sort()
  )
})
