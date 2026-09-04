import { expect, test } from "bun:test"
import type { OAuthProxy, StartOAuthProxyOptions } from "../proxy-start/proxy-start.module.code.ts"
import {
  type ProcessDoors,
  type ProxyStateToWrite,
  runGatewayProcess,
} from "./proxy-process.module.code.ts"

const AGENT = "agent-one"

const LOG_DIR = "/var/tmp/proxy-process-logs"

const ROOT = "/var/tmp/proxy-process-root"

const BOUND_PORT = 5555

const ENV: NodeJS.ProcessEnv = {
  OAUTH_PROXY_AGENT_ID: AGENT,
  OAUTH_PROXY_LOG_DIR: LOG_DIR,
  OAUTH_PROXY_REGISTRATION_ACCOUNT: "account-one",
  OAUTH_PROXY_VERSION: "9.9.9",
  OAUTH_PROXY_PORT: "4321",
  OAUTH_PROXY_UPSTREAM_IDLE_TIMEOUT_MS: "1000",
  OAUTH_PROXY_DOWNSTREAM_KEEPALIVE_MS: "2000",
}

type Written = { readonly agentId: string; readonly state: ProxyStateToWrite }

type Thrown = { readonly line: string; readonly error: unknown }

type Given = {
  readonly env?: NodeJS.ProcessEnv
  readonly flushRefused?: boolean
  readonly stopRefused?: boolean
  readonly clearRefused?: boolean
  readonly waitRefused?: boolean
}

type Rig = {
  readonly doors: ProcessDoors
  readonly steps: readonly string[]
  readonly started: readonly StartOAuthProxyOptions[]
  readonly written: readonly Written[]
  readonly printed: readonly string[]
  readonly refused: readonly string[]
  readonly thrown: readonly Thrown[]
  readonly exits: readonly number[]
  readonly redirected: readonly string[]
  readonly signal: (name: string) => Promise<undefined>
  readonly listenedFor: () => readonly string[]
}

function rigged(given: Given = {}): Rig {
  const steps: string[] = []
  const started: StartOAuthProxyOptions[] = []
  const written: Written[] = []
  const printed: string[] = []
  const refused: string[] = []
  const thrown: Thrown[] = []
  const exits: number[] = []
  const redirected: string[] = []
  const listeners = new Map<string, () => Promise<undefined>>()

  const proxy: OAuthProxy = {
    port: BOUND_PORT,
    stop: (): undefined => {
      steps.push("stop")
      if (given.stopRefused === true) throw new Error("the stop is refused")
    },
    flushAll: (reason): undefined => {
      steps.push(`flush:${reason}`)
      if (given.flushRefused === true) throw new Error("the flush is refused")
    },
  }

  const doors: ProcessDoors = {
    env: given.env ?? ENV,
    root: ROOT,
    pid: 4242,
    socketPathFor: (agentId) => `/var/tmp/sockets/${agentId}.sock`,
    consoleTo: (logDir, agentId): undefined => {
      steps.push("console")
      redirected.push(`${logDir}|${agentId}`)
    },
    started: (opts) => {
      steps.push("start")
      started.push(opts)
      return proxy
    },
    stateWritten: (agentId, state): undefined => {
      steps.push("state")
      written.push({ agentId, state })
    },
    stateCleared: (agentId): undefined => {
      steps.push(`clear:${agentId}`)
      if (given.clearRefused === true) throw new Error("the clearing is refused")
    },
    flushed: async (): Promise<undefined> => {
      steps.push("waited")
      if (given.waitRefused === true) throw new Error("the wait is refused")
      return undefined
    },
    printed: (line): undefined => {
      steps.push("print")
      printed.push(line)
    },
    refused: (line): undefined => {
      refused.push(line)
    },
    threw: (line, error): undefined => {
      thrown.push({ line, error })
    },
    signalled: (signal, taken): undefined => {
      listeners.set(signal, taken)
    },
    exited: (code): undefined => {
      steps.push(`exit:${code}`)
      exits.push(code)
    },
  }

  return {
    doors,
    steps,
    started,
    written,
    printed,
    refused,
    thrown,
    exits,
    redirected,
    listenedFor: () => [...listeners.keys()],
    signal: async (name) => {
      const held = listeners.get(name)
      if (held === undefined) throw new Error(`no listener was set for ${name}`)
      await held()
      return undefined
    },
  }
}

test("boot settings that will not parse are written to the refusal seam", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.refused.length).toBe(1)
  expect(rig.refused[0]).toContain("OAUTH_PROXY_AGENT_ID")
  expect(rig.refused[0]).toContain("OAUTH_PROXY_LOG_DIR")
})

test("a refusal written on boot ends with a newline", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.refused[0]?.endsWith("\n")).toBe(true)
})

test("boot settings that will not parse exit the process with code 1", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.exits).toEqual([1])
})

test("a refused boot starts no gateway and writes no proxy state", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.started).toEqual([])
  expect(rig.written).toEqual([])
  expect(rig.printed).toEqual([])
})

test("a refused boot redirects no console", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.redirected).toEqual([])
})

test("a refused boot listens for no signal", () => {
  const rig = rigged({ env: {} })
  runGatewayProcess(rig.doors)
  expect(rig.listenedFor()).toEqual([])
})

test("the console is redirected before the gateway is started", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.steps.slice(0, 4)).toEqual(["console", "start", "state", "print"])
})

test("the console redirection is told the log directory and the agent", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.redirected).toEqual([`${LOG_DIR}|${AGENT}`])
})

test("a gateway is started with the port the boot settings name", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.port).toBe(4321)
})

test("a gateway is started with the root handed in", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.root).toBe(ROOT)
})

test("a gateway is started with the oauth-proxy log prefix", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.logPrefix).toBe("[oauth-proxy]")
})

test("a gateway is started with the spans the boot settings name", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.upstreamIdleTimeoutMs).toBe(1000)
  expect(rig.started[0]?.downstreamKeepaliveMs).toBe(2000)
})

test("a gateway is started with the socket path answered for the agent", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.unixSocketPath).toBe(`/var/tmp/sockets/${AGENT}.sock`)
})

test("the log directory reaches the start options as a call rather than a path", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(typeof rig.started[0]?.getLogDir).toBe("function")
  expect(rig.started[0]?.getLogDir?.()).toBe(LOG_DIR)
})

test("no refresh outcome hook and no terminal test reach the gateway", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.started[0]?.onRefreshOutcome).toBeUndefined()
  expect(rig.started[0]?.isAccountTerminal).toBeUndefined()
})

test("the proxy state written names the process id and the bound port", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.written).toEqual([
    { agentId: AGENT, state: { pid: 4242, port: BOUND_PORT, oauthProxyVersion: "9.9.9" } },
  ])
})

test("the port the gateway bound is printed with a newline", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.printed).toEqual([`${BOUND_PORT}\n`])
})

test("the port is printed after the proxy state is written", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.steps.indexOf("state")).toBeLessThan(rig.steps.indexOf("print"))
})

test("both signals are listened for", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.listenedFor()).toEqual(["SIGTERM", "SIGINT"])
})

test("SIGTERM takes the process down", async () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.steps.slice(4)).toEqual([
    "flush:SIGTERM",
    "stop",
    `clear:${AGENT}`,
    "waited",
    "exit:0",
  ])
})

test("SIGINT takes the process down", async () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  await rig.signal("SIGINT")
  expect(rig.steps.slice(4)).toEqual(["flush:SIGINT", "stop", `clear:${AGENT}`, "waited", "exit:0"])
})

test("the flush is told the signal that brought the process down", async () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  await rig.signal("SIGINT")
  expect(rig.steps).toContain("flush:SIGINT")
})

test("a second signal takes nothing further down", async () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  await rig.signal("SIGINT")
  await rig.signal("SIGTERM")
  expect(rig.exits).toEqual([0])
  expect(rig.steps.filter((step) => step === "stop")).toEqual(["stop"])
})

test("a flush that throws still leaves the gateway stopped", async () => {
  const rig = rigged({ flushRefused: true })
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.steps.slice(4)).toEqual([
    "flush:SIGTERM",
    "stop",
    `clear:${AGENT}`,
    "waited",
    "exit:0",
  ])
  expect(rig.thrown[0]?.line).toBe("[oauth-proxy] the flush threw on SIGTERM:")
  expect(rig.thrown[0]?.error).toBe("the flush is refused")
})

test("a stop that throws still leaves the proxy state cleared", async () => {
  const rig = rigged({ stopRefused: true })
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.steps).toContain(`clear:${AGENT}`)
  expect(rig.exits).toEqual([0])
  expect(rig.thrown[0]?.line).toBe("[oauth-proxy] the stop threw on SIGTERM:")
})

test("a clearing that throws still leaves the process exiting", async () => {
  const rig = rigged({ clearRefused: true })
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.exits).toEqual([0])
  expect(rig.thrown[0]?.line).toBe("[oauth-proxy] clearing the proxy state threw on SIGTERM:")
})

test("going down waits on the transport rows after the proxy state is cleared", async () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.steps.indexOf(`clear:${AGENT}`)).toBeLessThan(rig.steps.indexOf("waited"))
  expect(rig.steps.indexOf("waited")).toBeLessThan(rig.steps.indexOf("exit:0"))
})

test("a transport wait that throws still leaves the process exiting", async () => {
  const rig = rigged({ waitRefused: true })
  runGatewayProcess(rig.doors)
  await rig.signal("SIGTERM")
  expect(rig.exits).toEqual([0])
  expect(rig.thrown[0]?.line).toBe("[oauth-proxy] the transport wait threw on SIGTERM:")
})

test("nothing goes down while no signal has arrived", () => {
  const rig = rigged()
  runGatewayProcess(rig.doors)
  expect(rig.exits).toEqual([])
  expect(rig.steps).not.toContain("stop")
})

test("an unreadable port refuses boot", () => {
  const rig = rigged({ env: { ...ENV, OAUTH_PROXY_PORT: "not-a-port" } })
  runGatewayProcess(rig.doors)
  expect(rig.exits).toEqual([1])
  expect(rig.refused[0]).toContain("OAUTH_PROXY_PORT")
})

test("an absent version reads as the word unknown", () => {
  const held: NodeJS.ProcessEnv = { ...ENV }
  delete held.OAUTH_PROXY_VERSION
  const rig = rigged({ env: held })
  runGatewayProcess(rig.doors)
  expect(rig.written[0]?.state.oauthProxyVersion).toBe("unknown")
})
