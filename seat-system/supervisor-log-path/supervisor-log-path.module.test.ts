import { expect, test } from "bun:test"
import { supervisorSocketPath } from "./supervisor-log-path.module.code.ts"

test("the proxy socket stands in the agent's own folder under the base named", () => {
  expect(supervisorSocketPath("agent-7", "/var/tmp/base")).toBe(
    "/var/tmp/base/agent-7/oauth-proxy.sock"
  )
})

test("the socket is always named oauth-proxy.sock", () => {
  expect(supervisorSocketPath("a", "/b").endsWith("/oauth-proxy.sock")).toBe(true)
})
