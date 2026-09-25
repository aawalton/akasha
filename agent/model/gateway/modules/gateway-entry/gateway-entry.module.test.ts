import { expect, test } from "bun:test"
import { mkdtempSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  CONSOLE_LOG_NAME,
  CONSOLE_SOURCE,
  consoleSentTo,
  processSeams,
  TRANSPORT_SOURCE,
  type TransportSeams,
  transportSentTo,
} from "akasha/agent/model/gateway/modules/gateway-entry/gateway-entry.module.code.ts"
import {
  buildTransportEvent,
  type TransportEvent,
} from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"
import type { LogLine } from "akasha/agent/seat/log-day/modules/log-day-writing/log-day-writing.module.code.ts"

const SCRATCH = "/var/tmp"

const NO_SEAT = "proxy-entry-test-names-no-seat"

const AGENT = "agent-for-a-transport-test"

const SEAT = "a-seat"

const END_MS = 1_700_000_002_500

const EVENT: TransportEvent = buildTransportEvent({
  termination: "complete",
  account: "one",
  path: "/v1/messages",
  startMs: END_MS - 2_500,
  endMs: END_MS,
  framesUpstream: 3,
  bytesUpstream: 90,
  lastFrameMs: END_MS - 10,
  lastEventType: "message_stop",
  sawMessageStop: true,
  httpStatus: 200,
})

type Wrote = {
  readonly seams: TransportSeams
  readonly lines: readonly LogLine[]
  readonly writers: readonly string[]
  readonly said: readonly string[]
  readonly flushes: () => number
}

function wrote(seat: string | null, refused: string | null = null): Wrote {
  const lines: LogLine[] = []
  const writers: string[] = []
  const said: string[] = []
  let flushes = 0
  const seams: TransportSeams = {
    seatFor: () => seat,
    writerFor: (source, seatName) => {
      writers.push(`${source}|${seatName}`)
      return {
        write: (line): undefined => {
          lines.push(line)
        },
        refused: () => refused,
        flushed: async () => {
          flushes += 1
        },
      }
    },
    said: (line): undefined => {
      said.push(line)
    },
  }
  return { seams, lines, writers, said, flushes: () => flushes }
}

test("the console source and log name are the ones the old entrypoint wrote under", () => {
  expect(CONSOLE_SOURCE).toBe("oauth-proxy-console")
  expect(CONSOLE_LOG_NAME).toBe("oauth-proxy.log")
})

test("every seam the gateway process asks for is answered by a function", () => {
  const seams = processSeams()
  expect(typeof seams.socketPathFor).toBe("function")
  expect(typeof seams.consoleTo).toBe("function")
  expect(typeof seams.started).toBe("function")
  expect(typeof seams.stateWritten).toBe("function")
  expect(typeof seams.stateCleared).toBe("function")
  expect(typeof seams.transportFor).toBe("function")
  expect(typeof seams.printed).toBe("function")
  expect(typeof seams.refused).toBe("function")
  expect(typeof seams.threw).toBe("function")
  expect(typeof seams.signalled).toBe("function")
  expect(typeof seams.exited).toBe("function")
})

test("the process id answered is this process's own", () => {
  expect(processSeams().pid).toBe(process.pid)
})

test("the environment answered is this process's own", () => {
  expect(processSeams().env).toBe(process.env)
})

test("the root answered is an absolute path", () => {
  expect(processSeams().root.startsWith("/")).toBe(true)
})

test("the socket path names the agent it was asked about", () => {
  expect(processSeams().socketPathFor("agent-9002")).toContain("agent-9002")
})

test("an agent id naming no seat sends the console to the file alone", () => {
  const dir = mkdtempSync(join(SCRATCH, "proxy-entry-"))
  const said = console.log
  const warned = console.warn
  const threw = console.error
  try {
    consoleSentTo(dir, NO_SEAT)
    console.log("a line the gateway wrote")
  } finally {
    console.log = said
    console.warn = warned
    console.error = threw
  }
  const written = readFileSync(join(dir, CONSOLE_LOG_NAME), "utf8")
  rmSync(dir, { recursive: true, force: true })
  expect(written).toContain("a line the gateway wrote")
  expect(written).toContain("[LOG]")
})

test("the transport source is the gateway-transport log source", () => {
  expect(TRANSPORT_SOURCE).toBe("gateway-transport")
})

test("a transport row is written to the gateway-transport day of the agent's seat", () => {
  const held = wrote(SEAT)
  transportSentTo(AGENT, held.seams).write(EVENT)
  expect(held.writers).toEqual([`gateway-transport|${SEAT}`])
  expect(held.lines).toEqual([{ "written-at": EVENT.ts, "agent-id": AGENT, data: EVENT }])
})

test("one writer serves every row a transport log is handed", () => {
  const held = wrote(SEAT)
  const log = transportSentTo(AGENT, held.seams)
  log.write(EVENT)
  log.write(EVENT)
  expect(held.writers.length).toBe(1)
  expect(held.lines.length).toBe(2)
})

test("a row handed over before the agent names a seat is dropped and said once", () => {
  const held = wrote(null)
  const log = transportSentTo(AGENT, held.seams)
  log.write(EVENT)
  log.write(EVENT)
  expect(held.writers).toEqual([])
  expect(held.said.length).toBe(1)
  expect(held.said[0]).toContain(AGENT)
})

test("a refusal the log day answers is said once", () => {
  const held = wrote(SEAT, "no page landed")
  const log = transportSentTo(AGENT, held.seams)
  log.write(EVENT)
  log.write(EVENT)
  expect(held.said).toEqual([
    "[gateway-transport] the seat log day refuses transport rows: no page landed",
  ])
})

test("the flush waits on the writer, and a log that wrote nothing has nothing to wait on", async () => {
  const held = wrote(SEAT)
  const log = transportSentTo(AGENT, held.seams)
  await log.flushed()
  expect(held.flushes()).toBe(0)
  log.write(EVENT)
  await log.flushed()
  expect(held.flushes()).toBe(1)
})

test("a line written for a row carries nothing beside the row, its stamp and the agent", () => {
  const held = wrote(SEAT)
  transportSentTo(AGENT, held.seams).write(EVENT)
  expect(Object.keys(held.lines[0] ?? {}).sort()).toEqual(["agent-id", "data", "written-at"])
})
