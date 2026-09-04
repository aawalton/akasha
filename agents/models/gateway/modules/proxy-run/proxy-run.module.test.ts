import { expect, test } from "bun:test"
import {
  AGENT_PREFIX,
  type Asked,
  agentIdFor,
  ENTRY_REL,
  entryIn,
  envFor,
  type RunSeams,
  STDERR_LOG,
  saidOf,
  startedOn,
} from "./proxy-run.module.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const ASKED: Asked = {
  agentId: "model-gateway-start-test",
  logDir: null,
  port: 0,
  account: "model-gateway-start",
  version: "model-gateway-start",
  keep: false,
  budgetMs: 1000,
}

function seamsWith(seat: string | null, port: number | Error, kept: { value: boolean }): RunSeams {
  return {
    seatOf: () => seat,
    madeDir: (): undefined => undefined,
    spawned: () => ({
      pid: 4242,
      outOf: () => undefined,
      loosed: (): undefined => {
        kept.value = true
      },
      stopped: (): undefined => undefined,
    }),
    ported: async () => {
      if (port instanceof Error) throw port
      return port
    },
    socketFor: (agentId) => `/var/tmp/supervisors/${agentId}/oauth-proxy.sock`,
  }
}

test("the entry named is the akasha gateway entry under the root given", () => {
  expect(entryIn(ROOT)).toBe(`${ROOT}/${ENTRY_REL}`)
  expect(ENTRY_REL.startsWith("agents/models/gateway/")).toBe(true)
})

test("an agent id made here carries the prefix that says what made it", () => {
  expect(agentIdFor(1_756_000_000_000, 99).startsWith(AGENT_PREFIX)).toBe(true)
  expect(agentIdFor(1, 1)).not.toBe(agentIdFor(1, 2))
})

test("the boot environment carries the five keys the gateway parses", () => {
  const env = envFor(ASKED, "/var/tmp/gw-log")
  expect(Object.keys(env).toSorted()).toEqual([
    "OAUTH_PROXY_AGENT_ID",
    "OAUTH_PROXY_LOG_DIR",
    "OAUTH_PROXY_PORT",
    "OAUTH_PROXY_REGISTRATION_ACCOUNT",
    "OAUTH_PROXY_VERSION",
  ])
  expect(env["OAUTH_PROXY_LOG_DIR"]).toBe("/var/tmp/gw-log")
  expect(env["OAUTH_PROXY_PORT"]).toBe("0")
})

test("an agent id a seat answers to is refused rather than started under", async () => {
  const kept = { value: false }
  const said = await startedOn(ROOT, ASKED, seamsWith("seat-one", 9999, kept))
  expect(typeof said).toBe("string")
  expect(String(said)).toContain("seat-one")
})

test("a gateway that printed its port comes back with that port and its socket", async () => {
  const kept = { value: false }
  const said = await startedOn(ROOT, ASKED, seamsWith(null, 51234, kept))
  expect(typeof said).toBe("object")
  if (typeof said === "string") return
  expect(said.port).toBe(51234)
  expect(said.pid).toBe(4242)
  expect(said.socketPath).toContain(ASKED.agentId)
  expect(said.kept).toBe(false)
  expect(kept.value).toBe(false)
})

test("a gateway asked to be kept is let go of rather than stopped", async () => {
  const kept = { value: false }
  const said = await startedOn(ROOT, { ...ASKED, keep: true }, seamsWith(null, 51235, kept))
  expect(typeof said).toBe("object")
  if (typeof said === "string") return
  expect(said.kept).toBe(true)
  expect(kept.value).toBe(true)
})

test("a gateway that printed no port is refused rather than reported", async () => {
  const kept = { value: false }
  const said = await startedOn(
    ROOT,
    ASKED,
    seamsWith(null, new Error("timed out waiting for port"), kept)
  )
  expect(typeof said).toBe("string")
  expect(String(said)).toContain("printed no port")
})

test("the log directory defaults to the one the socket is in", async () => {
  const kept = { value: false }
  const said = await startedOn(ROOT, ASKED, seamsWith(null, 51236, kept))
  if (typeof said === "string") return
  expect(said.logDir).toBe(`/var/tmp/supervisors/${ASKED.agentId}`)
})

test("the report says the entry, the process, the port and the socket", async () => {
  const kept = { value: false }
  const said = await startedOn(ROOT, ASKED, seamsWith(null, 51237, kept))
  if (typeof said === "string") return
  const lines = saidOf(said).join("\n")
  expect(lines).toContain("entry ")
  expect(lines).toContain("process 4242")
  expect(lines).toContain("port 51237")
  expect(lines).toContain("socket ")
  expect(STDERR_LOG).toBe("oauth-proxy.stderr.log")
})
