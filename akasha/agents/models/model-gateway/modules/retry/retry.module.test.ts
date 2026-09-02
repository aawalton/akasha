import { expect, test } from "bun:test"
import { UPSTREAM_IDLE_TIMEOUT_TOKEN } from "../idle-timeout/idle-timeout.module.code.ts"
import { isTransientTransportError, pullFirstChunkAndWrap } from "./retry.module.code.ts"
import {
  BROKE,
  boom,
  COMMENT,
  cancelled,
  countingSource,
  drain,
  ENC,
  ended,
  FIRST,
  firstFails,
  framed,
  heldSource,
  LEFT,
  MS,
  probes,
  required,
  retried,
  rig,
  socketError,
  sourceOf,
  tick,
} from "./retry.module.test-fixtures.ts"

test("a transient transport error is a TypeError whose message holds a known phrase", () => {
  expect(isTransientTransportError(new TypeError("ECONNRESET while reading"))).toBe(true)
  expect(isTransientTransportError(new TypeError("upstream refused the call"))).toBe(false)
  expect(isTransientTransportError(new Error("socket hang up"))).toBe(false)
})

test("an idle timeout abort is transient where the message holds the idle token", () => {
  const abort = new DOMException(`${UPSTREAM_IDLE_TIMEOUT_TOKEN}: no bytes`, "TimeoutError")
  expect(isTransientTransportError(abort)).toBe(true)
})

test("a DOMException carrying no idle timeout token is not transient", () => {
  expect(isTransientTransportError(new DOMException("aborted", "TimeoutError"))).toBe(false)
  expect(isTransientTransportError(new DOMException(UPSTREAM_IDLE_TIMEOUT_TOKEN, "Abort"))).toBe(
    false
  )
})

test("a retry happens only for a transient transport error", async () => {
  const ran = await retried([200, 800], () => {
    throw new Error("upstream said no")
  })
  expect(ran.runs).toBe(1)
  expect(ran.waits).toEqual([])
})

test("the backoff list holds one wait for each retry", async () => {
  const ran = await retried([10, 20, 30], boom)
  expect(ran.waits).toEqual([10, 20, 30])
  expect(ran.runs).toBe(4)
})

test("an error surviving the last backoff wait is rethrown to the caller", async () => {
  const ran = await retried([1], boom)
  expect(ran.err).toBeInstanceOf(TypeError)
  expect(ran.waits).toEqual([1])
})

test("an operation handed to the retry must be safe to run more than once", async () => {
  const posted: number[] = []
  await retried([1, 2], (runs) => {
    posted.push(runs)
    throw socketError()
  })
  expect(posted).toEqual([1, 2, 3])
})

test("the sleep is handed in so a test needs no wait", async () => {
  const startedAt = Date.now()
  const ran = await retried([30_000, 60_000], boom)
  expect(ran.waits).toEqual([30_000, 60_000])
  expect(Date.now() - startedAt).toBeLessThan(1_000)
})

test("nothing here retries on an upstream status", async () => {
  const ran = await retried([1, 2], () => new Response(null, { status: 503 }))
  expect(ran.runs).toBe(1)
  expect(ran.waits).toEqual([])
})

test("a bare error code matches only where the message holds that code as a whole word", () => {
  for (const held of ["unexpected EOF", "read ECONNRESET", "write EPIPE"]) {
    expect(isTransientTransportError(new TypeError(held))).toBe(true)
  }
  for (const inside of ["instanceof", "typeof", "lifeofpi"]) {
    expect(isTransientTransportError(new TypeError(inside))).toBe(false)
  }
})

test("a TypeError message holding `instanceof` is not a transient transport error", async () => {
  const bug = new TypeError("Right hand side of instanceof is not an object")
  expect(isTransientTransportError(bug)).toBe(false)
  const ran = await retried([1, 2], () => {
    throw bug
  })
  expect(ran.runs).toBe(1)
})

test("the first chunk of an upstream body is read before the wrapper is handed back", async () => {
  const seen = probes()
  const out = await pullFirstChunkAndWrap(sourceOf(["one\n", "two\n"]), seen.observer)
  expect(seen.events).toContain("bytes:4")
  expect(await drain(out)).toBe("one\ntwo\n")
})

test("the wrapper copies each upstream chunk into a second ReadableStream", async () => {
  const sent = [ENC.encode("one\n"), ENC.encode("two\n")]
  const upstream = sourceOf(sent)
  const out = required(await pullFirstChunkAndWrap(upstream))
  expect(out).not.toBe(upstream)
  const reader = out.getReader()
  expect((await reader.read()).value).toBe(sent[0])
  expect((await reader.read()).value).toBe(sent[1])
})

test("the re-wrap costs 87% of the streaming CPU a live gateway spends", async () => {
  const seen = probes()
  const texts = ["a\n", "b\n", "c\n", "d\n", "e\n"]
  await drain(await pullFirstChunkAndWrap(sourceOf(texts), seen.observer))
  expect(seen.events.filter((e) => e.startsWith("chunk:")).length).toBe(texts.length)
})

test("downstream backpressure never reaches the upstream reader", async () => {
  const tally = { pulls: 0 }
  const out = required(await pullFirstChunkAndWrap(countingSource(40, tally)))
  await tick()
  expect(tally.pulls).toBeGreaterThan(40)
  await out.cancel("off")
})

test("a slow downstream reader grows the wrapper's queue to the whole upstream body", async () => {
  const tally = { pulls: 0 }
  const out = required(await pullFirstChunkAndWrap(countingSource(30, tally)))
  await tick()
  expect(await drain(out)).toContain("p30\n")
})

test("a null upstream body stops the idle guard", async () => {
  const guard = probes()
  await pullFirstChunkAndWrap(null, undefined, guard.idle)
  expect(guard.at.stops).toBe(1)
  expect(guard.at.resets).toBe(0)
})

test("a failure reading the first chunk is thrown to the caller rather than framed", async () => {
  expect(String((await firstFails(true)).err)).toContain(FIRST)
})

test("a failure reading the first chunk reaches the observer as an upstream error", async () => {
  expect((await firstFails()).p.events).toEqual([`error:Error: ${FIRST}`])
})

test("a failure reading the first chunk stops the idle guard", async () => {
  expect((await firstFails()).p.at.stops).toBe(1)
})

test("each chunk that arrives resets the idle guard", async () => {
  const guard = probes()
  const out = await pullFirstChunkAndWrap(sourceOf(["a\n", "b\n", "c\n"]), undefined, guard.idle)
  expect(await drain(out)).toBe("a\nb\nc\n")
  expect(guard.at.resets).toBe(3)
})

test("each chunk that arrives resets the keepalive emitter", async () => {
  const clock = probes()
  const keep = { intervalMs: MS, timers: clock.timers }
  await drain(await pullFirstChunkAndWrap(sourceOf(["a\n", "b\n"]), undefined, undefined, keep))
  expect(clock.at.sets).toBe(2)
})

test("a keepalive emitter is built only where the keepalive interval is above zero", async () => {
  const off = await rig("a\n", false, 0)
  off.src.close()
  await tick()
  expect(off.p.at.sets).toBe(0)
  expect((await rig("a\n")).p.at.sets).toBe(1)
})

test("a keepalive comment goes out only where the last byte sent was a newline", async () => {
  const held = await rig("head\n")
  await tick()
  held.p.fireAll()
  held.src.push("half")
  await tick()
  held.p.fireAll()
  held.src.close()
  await tick()
  expect(await drain(held.out)).toBe(`head\n${COMMENT}half`)
})

test("each path the wrapped stream ends by stops the keepalive emitter", async () => {
  for (const rug of await ended()) expect(rug.p.at.armed).toBe(0)
})

test("each path the wrapped stream ends by stops the idle guard", async () => {
  for (const rug of await ended()) expect(rug.p.at.stops).toBeGreaterThanOrEqual(1)
})

test("each path the wrapped stream ends by releases the upstream reader", async () => {
  for (const rug of await ended()) expect(rug.src.stream.locked).toBe(false)
})

test("a downstream cancel is passed on to the upstream reader", async () => {
  let told: unknown = null
  const src = heldSource((why) => {
    told = why
  })
  src.push("a\n")
  const out = required(await pullFirstChunkAndWrap(src.stream))
  await tick()
  await out.cancel(LEFT)
  expect(told).toBe(LEFT)
})

test("the cancel is the last word a cancelled stream gives the observer", async () => {
  const gone = await cancelled()
  gone.src.fail(new Error(BROKE))
  await tick()
  expect(gone.p.events).toEqual(["bytes:2", "chunk:2", `cancel:${LEFT}`])
})

test("a cancel while a read is pending sends the pump's close down the error path", async () => {
  const probe = heldSource()
  await probe.stream.getReader().cancel(LEFT)
  expect(() => probe.close()).toThrow(TypeError)
  expect((await cancelled()).p.events).not.toContain("complete")
})

test("a mid-stream failure is served as an SSE error frame only where the caller asked", async () => {
  const got = await drain((await framed("data: hi\n")).out)
  expect(got).toContain(`event: error\ndata: `)
  expect(got).toContain(`committed to a stream: ${BROKE}`)
})

test("a served frame is opened with a newline where the last byte sent was no newline", async () => {
  expect(await drain((await framed("data: hi")).out)).toContain("data: hi\nevent: error")
  const clean = await drain((await framed("data: hi\n")).out)
  expect(clean).not.toContain("data: hi\n\nevent")
})

test("a mid-stream failure the caller wants no frame for errors the wrapped stream", async () => {
  await expect(drain((await framed("data: hi\n", false)).out)).rejects.toThrow(BROKE)
})

test("a stream closed by a served error frame reports no completion", async () => {
  const bad = await framed("data: hi\n")
  await drain(bad.out)
  expect(bad.p.events).not.toContain("complete")
  expect(bad.p.events).toContain(`error:Error: ${BROKE}`)
})

test("an observer callback that throws is swallowed before the throw reaches the pump", async () => {
  const blow = (): never => {
    throw new Error("observer blew up")
  }
  const loud = { onChunk: blow, onComplete: blow, onUpstreamError: blow, onDownstreamCancel: blow }
  expect(await drain(await pullFirstChunkAndWrap(sourceOf(["a\n", "b\n"]), loud))).toBe("a\nb\n")
})

test("the clock is handed in so a test needs no real time", async () => {
  const seen = probes()
  let ticks = 0
  const fixed = (): number => {
    ticks += 1
    return 1_000 * ticks
  }
  const args = [seen.observer, undefined, undefined, false, fixed] as const
  await drain(await pullFirstChunkAndWrap(sourceOf(["a\n"]), ...args))
  expect(seen.stamps).toEqual([2_000])
})
