import { expect, test } from "bun:test"
import {
  answering,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import {
  AGENT_PREFIX,
  type Asked,
  agentIdFor,
  envFor,
  noLonger,
  type RunSeams,
  STDERR_LOG,
  saidOf,
  spawnedSaid,
  startedOn,
  wroteSaid,
} from "akasha/commands/pages/model/gateway/start/proxy-run/proxy-run.module.code.ts"

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
    socketFor: (agentId) => `/var/tmp/run/akasha-${agentId}.sock`,
    logDirFor: (agentId) => `/var/tmp/run/akasha-${agentId}`,
  }
}

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
  const said = await startedOn(ASKED, seamsWith("seat-one", 9999, kept))
  expect(typeof said).toBe("string")
  expect(String(said)).toContain("seat-one")
})

test("a gateway that printed its port comes back with that port and its socket", async () => {
  const kept = { value: false }
  const said = await startedOn(ASKED, seamsWith(null, 51234, kept))
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
  const said = await startedOn({ ...ASKED, keep: true }, seamsWith(null, 51235, kept))
  expect(typeof said).toBe("object")
  if (typeof said === "string") return
  expect(said.kept).toBe(true)
  expect(kept.value).toBe(true)
})

test("a gateway that printed no port is refused rather than reported", async () => {
  const kept = { value: false }
  const said = await startedOn(
    ASKED,
    seamsWith(null, new Error("timed out waiting for port"), kept)
  )
  expect(typeof said).toBe("string")
  expect(String(said)).toContain("printed no port")
})

test("the log directory defaults to a folder of that agent's own", async () => {
  const kept = { value: false }
  const said = await startedOn(ASKED, seamsWith(null, 51236, kept))
  if (typeof said === "string") return
  expect(said.logDir).toBe(`/var/tmp/run/akasha-${ASKED.agentId}`)
})

test("the folder the logs go in is no folder the sockets are named in", async () => {
  const kept = { value: false }
  const said = await startedOn(ASKED, seamsWith(null, 51238, kept))
  if (typeof said === "string") return
  expect(said.socketPath.startsWith(`${said.logDir}/`)).toBe(false)
})

function seamsThatWillNotLetGo(): RunSeams {
  return {
    ...seamsWith(null, 51239, { value: false }),
    spawned: () => ({
      pid: 4242,
      outOf: () => undefined,
      loosed: (): undefined => {
        throw new Error("the process would not be let go of")
      },
      stopped: (): undefined => {
        throw new Error("the process would not be stopped")
      },
    }),
  }
}

test("the gateway is named as soon as it is running under a process id", async () => {
  const done: string[] = []

  await startedOn(ASKED, seamsWith(null, 51240, { value: false }), done)
  expect(done).toHaveLength(2)
  expect(done[1]).toContain("process 4242")
  expect(done[1]).toContain("kill 4242")
})

test("the log directory is named as soon as that directory is made", async () => {
  const done: string[] = []

  await startedOn(ASKED, seamsWith(null, 51242, { value: false }), done)
  expect(done[0]).toContain(`/var/tmp/run/akasha-${ASKED.agentId}`)
})

test("a gateway stopped again is no longer named as left running", async () => {
  const done: string[] = []

  const said = await startedOn(
    ASKED,
    seamsWith(null, new Error("timed out waiting for port"), { value: false }),
    done
  )

  expect(typeof said).toBe("string")
  expect(done).toHaveLength(1)
  expect(done[0]).toContain(`/var/tmp/run/akasha-${ASKED.agentId}`)
  expect(done.join(" ")).not.toContain("kill 4242")
})

test("a gateway that would not be stopped is still named as left running", async () => {
  const held = await answering(async (done) => {
    await startedOn(
      ASKED,
      { ...seamsThatWillNotLetGo(), ported: () => Promise.reject(new Error("no port")) },
      done
    )
    return { report: [], refusals: [], code: OK }
  })

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("kill 4242")
})

test("a name nothing put in the list leaves that list as it was", () => {
  const done = ["one", "two"]

  noLonger(done, "three")
  expect(done).toEqual(["one", "two"])
  noLonger(done, "one")
  expect(done).toEqual(["two"])
})

test("what the gateway wrote is named by the directory it wrote under", () => {
  expect(wroteSaid("/var/log/gw")).toContain("/var/log/gw")
})

test("a start that threw after the spawn names the process left running", async () => {
  const held = await answering(async (done) => {
    const said = await startedOn(ASKED, seamsThatWillNotLetGo(), done)
    return { report: typeof said === "string" ? [said] : saidOf(said), refusals: [], code: OK }
  })

  expect(held.code).toBe(OPERATIONAL)
  const last = held.refusals[held.refusals.length - 1] as string
  expect(last).toContain("stopped part way")
  expect(last).toContain("kill 4242")
})

test("a start that threw before any gateway was spawned names no process", async () => {
  const held = await answering(async (done) => {
    await startedOn(
      ASKED,
      {
        ...seamsWith(null, 51241, { value: false }),
        madeDir: () => {
          throw new Error("the log folder would not be made")
        },
      },
      done
    )
    return { report: [], refusals: [], code: OK }
  })

  expect(held.report).toEqual([])
  expect(held.refusals.some((one) => one.includes("stopped part way"))).toBe(false)
})

test("a gateway named for a refusal is spelled the way the report spells it", () => {
  expect(spawnedSaid("/at/entry.ts", 7, "/var/log")).toContain("/at/entry.ts")
  expect(spawnedSaid("/at/entry.ts", 7, "/var/log")).toContain("/var/log")
})

test("the report says the entry, the process, the port and the socket", async () => {
  const kept = { value: false }
  const said = await startedOn(ASKED, seamsWith(null, 51237, kept))
  if (typeof said === "string") return
  const lines = saidOf(said).join("\n")
  expect(lines).toContain("entry ")
  expect(lines).toContain("process 4242")
  expect(lines).toContain("port 51237")
  expect(lines).toContain("socket ")
  expect(STDERR_LOG).toBe("oauth-proxy.stderr.log")
})
