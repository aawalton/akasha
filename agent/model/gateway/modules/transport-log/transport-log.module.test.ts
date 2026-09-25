import { expect, test } from "bun:test"
import {
  buildShutdownFlushRegistry,
  buildStreamObserver,
  buildTransportEvent,
  type ObservedStreamState,
  recordTransportEvent,
  type TransportEvent,
  type TransportLog,
} from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.code.ts"
import { keptLog } from "akasha/agent/model/gateway/modules/transport-log/transport-log.module.test-fixtures.ts"

const START_MS = 1_700_000_000_000

const END_MS = START_MS + 2_500

const ENCODER = new TextEncoder()

const ROW_FIELDS = [
  "account",
  "bytesUpstream",
  "elapsedMs",
  "emptyPoolReason",
  "errorClass",
  "errorMessage",
  "framesUpstream",
  "heldMs",
  "httpStatus",
  "lastEventType",
  "lastFrameAgoMs",
  "path",
  "sawMessageStop",
  "termination",
  "ts",
]

const STATE: ObservedStreamState = {
  termination: "complete",
  account: "one",
  path: "/v1/messages",
  startMs: START_MS,
  endMs: END_MS,
  framesUpstream: 4,
  bytesUpstream: 512,
  lastFrameMs: END_MS - 400,
  lastEventType: "content_block_delta",
  sawMessageStop: true,
  httpStatus: 200,
}

function bytesOf(text: string): Uint8Array {
  return ENCODER.encode(text)
}

function rowOver(chunks: readonly string[]): TransportEvent {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    transportLog: kept.log,
  })
  for (const one of chunks) observer.onChunkBytes?.(bytesOf(one), START_MS + 1)
  observer.onComplete(END_MS)
  const found = kept.rows[0]
  if (found === undefined) throw new Error("no row was written to the transport log")
  return found
}

test("a row carries the elapsed span the start and the end handed in make", () => {
  expect(buildTransportEvent(STATE).elapsedMs).toBe(2_500)
})

test("a row ages the last frame from the end handed in", () => {
  expect(buildTransportEvent(STATE).lastFrameAgoMs).toBe(400)
})

test("a row is stamped with the millisecond the stream ended at", () => {
  expect(buildTransportEvent(STATE).ts).toBe(new Date(END_MS).toISOString())
})

test("an Error is split into its constructor's name and its message", () => {
  const built = buildTransportEvent({ ...STATE, error: new TypeError("socket hang up") })
  expect(built.errorClass).toBe("TypeError")
  expect(built.errorMessage).toBe("socket hang up")
})

test("anything thrown that is no Error is split into its typeof and its string", () => {
  const built = buildTransportEvent({ ...STATE, error: 404 })
  expect(built.errorClass).toBe("number")
  expect(built.errorMessage).toBe("404")
})

test("a stream that ended with nothing thrown carries a null error class", () => {
  expect(buildTransportEvent(STATE).errorClass).toBe(null)
  expect(buildTransportEvent({ ...STATE, error: null }).errorClass).toBe(null)
  expect(buildTransportEvent({ ...STATE, error: undefined }).errorClass).toBe(null)
})

test("a stream that ended with nothing thrown carries a null error message", () => {
  expect(buildTransportEvent(STATE).errorMessage).toBe(null)
})

test("a held span the state leaves out is written as null rather than left out", () => {
  expect(buildTransportEvent(STATE).heldMs).toBe(null)
  expect(buildTransportEvent({ ...STATE, heldMs: 12 }).heldMs).toBe(12)
})

test("an empty pool reason the state leaves out is written as null rather than left out", () => {
  expect(buildTransportEvent(STATE).emptyPoolReason).toBe(null)
  expect(buildTransportEvent({ ...STATE, emptyPoolReason: "drained" }).emptyPoolReason).toBe(
    "drained"
  )
})

test("the last event: line a chunk holds names that chunk's event type", () => {
  const row = rowOver(["event: message_start\ndata: {}\n\nevent: ping\ndata: {}\n\n"])
  expect(row.lastEventType).toBe("ping")
})

test("the last event: line over every chunk names the event type", () => {
  const row = rowOver(["event: message_start\n\n", "event: content_block_delta\n\n"])
  expect(row.lastEventType).toBe("content_block_delta")
})

test("a chunk holding no event: line leaves the event type as that type was", () => {
  const row = rowOver(["event: ping\n\n", "data: {}\n\n"])
  expect(row.lastEventType).toBe("ping")
})

test("a stream carrying no event: line at all reports a null event type", () => {
  const row = rowOver(["data: {}\n\n"])
  expect(row.lastEventType).toBe(null)
})

test("an event: line naming nothing sets the event type to the empty string", () => {
  const row = rowOver(["event: ping\n\n", "event:\n\n"])
  expect(row.lastEventType).toBe("")
})

test("a chunk of no bytes is read no further", () => {
  const row = rowOver(["event: ping\n\n", ""])
  expect(row.lastEventType).toBe("ping")
})

test("an event: message_stop line anywhere in a chunk sets the stop", () => {
  const row = rowOver(["event: message_stop\ndata: {}\n\n"])
  expect(row.sawMessageStop).toBe(true)
})

test("a stop seen once stays seen over later chunks", () => {
  const row = rowOver(["event: message_stop\n\n", "event: ping\n\n"])
  expect(row.sawMessageStop).toBe(true)
})

test("a stream carrying no message_stop reports the stop unseen", () => {
  const row = rowOver(["event: ping\ndata: {}\n\n"])
  expect(row.sawMessageStop).toBe(false)
})

test("an event: line divided across two chunks is read once the line is whole", () => {
  const row = rowOver(["data: {}\n\nevent: messa", "ge_stop\n\n"])
  expect(row.sawMessageStop).toBe(true)
  expect(row.lastEventType).toBe("message_stop")
})

test("a chunk opening partway through a line is not taken as opening a line", () => {
  const row = rowOver(['event: ping\n\ndata: {"text":"', 'event: message_stop"}\n\n'])
  expect(row.sawMessageStop).toBe(false)
  expect(row.lastEventType).toBe("ping")
})

test("frames and bytes are counted from every chunk handed over", () => {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: null,
    path: "/v1/messages",
    startMs: START_MS,
    transportLog: kept.log,
  })
  observer.onChunk(10, START_MS + 100)
  observer.onChunk(30, START_MS + 900)
  observer.onUpstreamStatus?.(429, START_MS + 5)
  observer.onComplete(END_MS)

  const row = kept.rows[0]
  expect(row).toBeDefined()
  expect(row?.framesUpstream).toBe(2)
  expect(row?.bytesUpstream).toBe(40)
  expect(row?.lastFrameAgoMs).toBe(END_MS - (START_MS + 900))
  expect(row?.httpStatus).toBe(429)
  expect(row?.account).toBe("-")
})

test("a stream terminates once", () => {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    transportLog: kept.log,
  })
  observer.onComplete(END_MS)
  observer.onUpstreamError(new Error("late"), END_MS + 10)
  observer.onDownstreamCancel("later", END_MS + 20)
  observer.onProxyShutdown?.("later still", END_MS + 30)

  expect(kept.rows.length).toBe(1)
  expect(kept.rows[0]?.termination).toBe("complete")
})

test("arming a terminal callback after the termination runs that callback at once", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  observer.onComplete(END_MS)
  let ran = 0
  observer.armTerminal(() => {
    ran += 1
  })
  expect(ran).toBe(1)
})

test("a terminal callback armed before the termination runs at the termination", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  let ran = 0
  observer.armTerminal(() => {
    ran += 1
  })
  expect(ran).toBe(0)
  observer.onUpstreamError(new Error("gone"), END_MS)
  expect(ran).toBe(1)
  observer.onComplete(END_MS + 1)
  expect(ran).toBe(1)
})

test("a row is written only where the caller handed a transport log in", () => {
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  expect(() => observer.onComplete(END_MS)).not.toThrow()
})

test("the log a row is written to is handed in rather than looked up", () => {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    transportLog: kept.log,
  })
  observer.onComplete(END_MS)

  expect(kept.rows.length).toBe(1)
})

test("a shutdown flush ends every stream still entered", () => {
  const registry = buildShutdownFlushRegistry(() => END_MS)
  const kept = keptLog()
  const first = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    transportLog: kept.log,
    shutdownRegistry: registry,
  })
  const second = buildStreamObserver({
    account: "two",
    path: "/two",
    startMs: START_MS,
    transportLog: kept.log,
    shutdownRegistry: registry,
  })
  expect(first).not.toBe(second)
  registry.flushAll("going down")

  expect(kept.rows.length).toBe(2)
  expect(kept.rows.map((one) => one.termination)).toEqual(["proxy_shutdown", "proxy_shutdown"])
  expect(kept.rows.map((one) => one.errorMessage)).toEqual(["going down", "going down"])
})

test("a stream that terminates leaves the shutdown flush before the row is built", () => {
  const registry = buildShutdownFlushRegistry(() => END_MS + 500)
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    transportLog: kept.log,
    shutdownRegistry: registry,
  })
  observer.onComplete(END_MS)
  registry.flushAll("going down")

  expect(kept.rows.length).toBe(1)
  expect(kept.rows[0]?.termination).toBe("complete")
})

test("a shutdown flush leaves the set holding nothing", () => {
  const registry = buildShutdownFlushRegistry(() => END_MS)
  const kept = keptLog()
  buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    transportLog: kept.log,
    shutdownRegistry: registry,
  })
  registry.flushAll("first")
  registry.flushAll("second")

  expect(kept.rows.length).toBe(1)
})

test("the clock a shutdown flush stamps by is handed in so a test needs no real time", () => {
  const stamped = START_MS + 99_999
  const registry = buildShutdownFlushRegistry(() => stamped)
  const kept = keptLog()
  buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    transportLog: kept.log,
    shutdownRegistry: registry,
  })
  registry.flushAll("going down")

  expect(kept.rows[0]?.ts).toBe(new Date(stamped).toISOString())
  expect(kept.rows[0]?.elapsedMs).toBe(99_999)
})

test("a stream leaving the flush twice is entered nowhere after the first leave", () => {
  const registry = buildShutdownFlushRegistry(() => END_MS)
  const observer = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    shutdownRegistry: registry,
  })
  let ran = 0
  observer.armTerminal(() => {
    ran += 1
  })
  observer.onComplete(END_MS)
  registry.flushAll("going down")
  expect(ran).toBe(1)
})

test("a row is stamped with the millisecond handed to the callback rather than with the clock", () => {
  const observer = buildStreamObserver({ account: "one", path: "/one", startMs: START_MS })
  let stampedAt: number | null = null
  observer.armTerminal(() => {
    stampedAt = Date.now()
  })
  observer.onComplete(END_MS)
  expect(stampedAt).not.toBe(END_MS)
  expect(buildTransportEvent({ ...STATE, endMs: END_MS }).ts).toBe(new Date(END_MS).toISOString())
})

test("the row a callback's millisecond stamps is that millisecond rather than now", () => {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    transportLog: kept.log,
  })
  observer.onComplete(END_MS)

  expect(kept.rows[0]?.ts).toBe(new Date(END_MS).toISOString())
  expect(kept.rows[0]?.elapsedMs).toBe(2_500)
})

test("anything thrown while a row is written is swallowed", () => {
  const throwing: TransportLog = {
    write: (): undefined => {
      throw new Error("the log day refuses")
    },
    flushed: () => Promise.resolve(),
  }
  expect(recordTransportEvent(buildTransportEvent(STATE), throwing)).toBeUndefined()
})

test("rows reach the log in the order they are handed over", () => {
  const kept = keptLog()
  for (let one = 0; one < 50; one += 1) {
    recordTransportEvent(buildTransportEvent({ ...STATE, framesUpstream: one }), kept.log)
  }
  expect(kept.rows.map((one) => one.framesUpstream)).toEqual([...Array(50).keys()])
})

test("a row carries the fields the transport event declares and no other", () => {
  const built = buildTransportEvent({ ...STATE, error: new Error("gone"), heldMs: 3 })
  expect(Object.keys(built).sort()).toEqual(ROW_FIELDS)
})

test("a row names the account and the path it was handed and nothing a request carried", () => {
  const kept = keptLog()
  const observer = buildStreamObserver({
    account: "some-account",
    path: "/v1/messages",
    startMs: START_MS,
    transportLog: kept.log,
  })
  observer.onChunkBytes?.(bytesOf('event: ping\ndata: {"secret":"sk-ant-invented"}\n\n'), START_MS)
  observer.onComplete(END_MS)
  const said = JSON.stringify(kept.rows)
  expect(kept.rows[0]?.account).toBe("some-account")
  expect(kept.rows[0]?.path).toBe("/v1/messages")
  expect(said).not.toContain("sk-ant-invented")
})
