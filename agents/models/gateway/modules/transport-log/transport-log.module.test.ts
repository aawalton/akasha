import { expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  buildShutdownFlushRegistry,
  buildStreamObserver,
  buildTransportEvent,
  type ObservedStreamState,
  recordTransportEvent,
  type TransportEvent,
  transportLogFlushed,
} from "./transport-log.module.code.ts"

const SCRATCH_AT = "/var/tmp"

const PAGE = "gateway.model-test.ts"

const ROWS = "gateway.model-test.transport.jsonl"

const START_MS = 1_700_000_000_000

const END_MS = START_MS + 2_500

const ENCODER = new TextEncoder()

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

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-transport-log-"))
  writeFileSync(join(root, PAGE), "export const held = {}\n")
  return root
}

function pageAt(root: string): string {
  return join(root, PAGE)
}

function rowsIn(root: string): readonly Record<string, unknown>[] {
  const found: Record<string, unknown>[] = []
  for (const line of readFileSync(join(root, ROWS), "utf8").split("\n")) {
    if (line.length > 0) found.push(JSON.parse(line))
  }
  return found
}

function bytesOf(text: string): Uint8Array {
  return ENCODER.encode(text)
}

async function rowOver(chunks: readonly string[]): Promise<Record<string, unknown>> {
  const root = rooted()
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    logAt: pageAt(root),
  })
  for (const one of chunks) observer.onChunkBytes?.(bytesOf(one), START_MS + 1)
  observer.onComplete(END_MS)
  await transportLogFlushed()
  const found = rowsIn(root)[0]
  if (found === undefined) throw new Error(`no row landed at ${join(root, ROWS)}`)
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

test("the last event: line a chunk holds names that chunk's event type", async () => {
  const row = await rowOver(["event: message_start\ndata: {}\n\nevent: ping\ndata: {}\n\n"])
  expect(row["lastEventType"]).toBe("ping")
})

test("the last event: line over every chunk names the event type", async () => {
  const row = await rowOver(["event: message_start\n\n", "event: content_block_delta\n\n"])
  expect(row["lastEventType"]).toBe("content_block_delta")
})

test("a chunk holding no event: line leaves the event type as that type stood", async () => {
  const row = await rowOver(["event: ping\n\n", "data: {}\n\n"])
  expect(row["lastEventType"]).toBe("ping")
})

test("a stream carrying no event: line at all reports a null event type", async () => {
  const row = await rowOver(["data: {}\n\n"])
  expect(row["lastEventType"]).toBe(null)
})

test("an event: line naming nothing sets the event type to the empty string", async () => {
  const row = await rowOver(["event: ping\n\n", "event:\n\n"])
  expect(row["lastEventType"]).toBe("")
})

test("a chunk of no bytes is read no further", async () => {
  const row = await rowOver(["event: ping\n\n", ""])
  expect(row["lastEventType"]).toBe("ping")
})

test("an event: message_stop line anywhere in a chunk sets the stop", async () => {
  const row = await rowOver(["event: message_stop\ndata: {}\n\n"])
  expect(row["sawMessageStop"]).toBe(true)
})

test("a stop seen once stays seen over later chunks", async () => {
  const row = await rowOver(["event: message_stop\n\n", "event: ping\n\n"])
  expect(row["sawMessageStop"]).toBe(true)
})

test("a stream carrying no message_stop reports the stop unseen", async () => {
  const row = await rowOver(["event: ping\ndata: {}\n\n"])
  expect(row["sawMessageStop"]).toBe(false)
})

test("an event: line divided across two chunks is read in neither chunk", async () => {
  const row = await rowOver(["event: messa", "ge_stop\n\n"])
  expect(row["sawMessageStop"]).toBe(false)
})

test("frames and bytes are counted from every chunk handed over", async () => {
  const root = rooted()
  const observer = buildStreamObserver({
    account: null,
    path: "/v1/messages",
    startMs: START_MS,
    logAt: pageAt(root),
  })
  observer.onChunk(10, START_MS + 100)
  observer.onChunk(30, START_MS + 900)
  observer.onUpstreamStatus?.(429, START_MS + 5)
  observer.onComplete(END_MS)
  await transportLogFlushed()

  const row = rowsIn(root)[0]
  expect(row).toBeDefined()
  expect(row?.["framesUpstream"]).toBe(2)
  expect(row?.["bytesUpstream"]).toBe(40)
  expect(row?.["lastFrameAgoMs"]).toBe(END_MS - (START_MS + 900))
  expect(row?.["httpStatus"]).toBe(429)
  expect(row?.["account"]).toBe("-")
})

test("a stream terminates once", async () => {
  const root = rooted()
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    logAt: pageAt(root),
  })
  observer.onComplete(END_MS)
  observer.onUpstreamError(new Error("late"), END_MS + 10)
  observer.onDownstreamCancel("later", END_MS + 20)
  observer.onProxyShutdown?.("later still", END_MS + 30)
  await transportLogFlushed()

  const rows = rowsIn(root)
  expect(rows.length).toBe(1)
  expect(rows[0]?.["termination"]).toBe("complete")
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

test("a row is written only where the caller handed a file in", async () => {
  const root = rooted()
  const observer = buildStreamObserver({ account: "one", path: "/v1", startMs: START_MS })
  observer.onComplete(END_MS)
  await transportLogFlushed()

  expect(existsSync(join(root, ROWS))).toBe(false)
})

test("the file a row lands beside is handed in rather than looked up", async () => {
  const root = rooted()
  let asked = 0
  const observer = buildStreamObserver({
    account: "one",
    path: "/v1/messages",
    startMs: START_MS,
    logAt: () => {
      asked += 1
      return pageAt(root)
    },
  })
  observer.onComplete(END_MS)
  await transportLogFlushed()

  expect(asked).toBe(1)
  expect(rowsIn(root).length).toBe(1)
})

test("a shutdown flush ends every stream still entered", async () => {
  const registry = buildShutdownFlushRegistry(() => END_MS)
  const root = rooted()
  const first = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    logAt: pageAt(root),
    shutdownRegistry: registry,
  })
  const second = buildStreamObserver({
    account: "two",
    path: "/two",
    startMs: START_MS,
    logAt: pageAt(root),
    shutdownRegistry: registry,
  })
  expect(first).not.toBe(second)
  registry.flushAll("going down")
  await transportLogFlushed()

  const rows = rowsIn(root)
  expect(rows.length).toBe(2)
  expect(rows.map((one) => one["termination"])).toEqual(["proxy_shutdown", "proxy_shutdown"])
  expect(rows.map((one) => one["errorMessage"])).toEqual(["going down", "going down"])
})

test("a stream that terminates leaves the shutdown flush before the row is built", async () => {
  const registry = buildShutdownFlushRegistry(() => END_MS + 500)
  const root = rooted()
  const observer = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    logAt: pageAt(root),
    shutdownRegistry: registry,
  })
  observer.onComplete(END_MS)
  registry.flushAll("going down")
  await transportLogFlushed()

  const rows = rowsIn(root)
  expect(rows.length).toBe(1)
  expect(rows[0]?.["termination"]).toBe("complete")
})

test("a shutdown flush leaves the set holding nothing", async () => {
  const registry = buildShutdownFlushRegistry(() => END_MS)
  const root = rooted()
  buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    logAt: pageAt(root),
    shutdownRegistry: registry,
  })
  registry.flushAll("first")
  registry.flushAll("second")
  await transportLogFlushed()

  expect(rowsIn(root).length).toBe(1)
})

test("the clock a shutdown flush stamps by is handed in so a test needs no real time", async () => {
  const stamped = START_MS + 99_999
  const registry = buildShutdownFlushRegistry(() => stamped)
  const root = rooted()
  buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    logAt: pageAt(root),
    shutdownRegistry: registry,
  })
  registry.flushAll("going down")
  await transportLogFlushed()

  expect(rowsIn(root)[0]?.["ts"]).toBe(new Date(stamped).toISOString())
  expect(rowsIn(root)[0]?.["elapsedMs"]).toBe(99_999)
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

test("the row a callback's millisecond stamps is that millisecond rather than now", async () => {
  const root = rooted()
  const observer = buildStreamObserver({
    account: "one",
    path: "/one",
    startMs: START_MS,
    logAt: pageAt(root),
  })
  observer.onComplete(END_MS)
  await transportLogFlushed()

  expect(rowsIn(root)[0]?.["ts"]).toBe(new Date(END_MS).toISOString())
  expect(rowsIn(root)[0]?.["elapsedMs"]).toBe(2_500)
})

test("a file that is not there is opened again for every row until that file is there", async () => {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-transport-log-late-"))
  const at = join(root, PAGE)
  const event = buildTransportEvent(STATE)

  expect(recordTransportEvent(event, at)).toContain(PAGE)
  expect(recordTransportEvent(event, at)).toContain(PAGE)
  writeFileSync(at, "export const held = {}\n")
  expect(recordTransportEvent(event, at)).toBe(null)
  await transportLogFlushed()
  expect(rowsIn(root).length).toBe(1)
})

test("a row handed over after a refusal is written rather than dropped", async () => {
  const root = rooted()
  const at = pageAt(root)
  const circular: TransportEvent = { ...buildTransportEvent(STATE) }
  circular["self"] = circular

  expect(recordTransportEvent(circular, at)).toContain("no value reached")
  expect(recordTransportEvent(buildTransportEvent({ ...STATE, account: "after" }), at)).toContain(
    "no value reached"
  )
  await transportLogFlushed()

  const rows = rowsIn(root)
  expect(rows.length).toBe(1)
  expect(rows[0]?.["account"]).toBe("after")
})

test("writing a row answers the refusal last met or null", async () => {
  const root = rooted()
  expect(recordTransportEvent(buildTransportEvent(STATE), pageAt(root))).toBe(null)
  await transportLogFlushed()
})

test("nothing waits on the disk while a row is handed over", async () => {
  const root = rooted()
  recordTransportEvent(buildTransportEvent(STATE), pageAt(root))

  expect(existsSync(join(root, ROWS))).toBe(false)
  await transportLogFlushed()
  expect(rowsIn(root).length).toBe(1)
})

test("transportLogFlushed resolves once every row handed over is on the disk", async () => {
  const root = rooted()
  const at = pageAt(root)
  for (let one = 0; one < 50; one += 1) {
    recordTransportEvent(buildTransportEvent({ ...STATE, framesUpstream: one }), at)
  }
  await transportLogFlushed()

  const rows = rowsIn(root)
  expect(rows.length).toBe(50)
  expect(rows.map((one) => one["framesUpstream"])).toEqual([...Array(50).keys()])
})
