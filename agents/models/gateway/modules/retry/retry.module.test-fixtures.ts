import type { IdleResettable } from "../idle-timeout/idle-timeout.module.code.ts"
import {
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveTimers,
} from "../keepalive/keepalive.module.code.ts"
import {
  pullFirstChunkAndWrap,
  type StreamObserver,
  type TransportSleep,
  withTransportRetry,
} from "./retry.module.code.ts"

export const NEVER = 2_147_483_647

export const MS = 3500

export const ENC = new TextEncoder()

export const DEC = new TextDecoder()

export const COMMENT = new TextDecoder().decode(KEEPALIVE_COMMENT_BYTES)

export const BROKE = "upstream broke"

export const FIRST = "the first read died"

export const LEFT = "client left"

export const noop = (): undefined => undefined

export function socketError(): TypeError {
  return new TypeError("The socket connection was closed unexpectedly")
}

export function probes() {
  const at = { resets: 0, stops: 0, sets: 0, armed: 0 }
  const events: string[] = []
  const stamps: number[] = []
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>()
  const timers: KeepaliveTimers = {
    set: (fn, _ms) => {
      at.sets += 1
      const handle = setTimeout(noop, NEVER)
      pending.set(handle, fn)
      at.armed = pending.size
      return handle
    },
    clear: (handle) => {
      clearTimeout(handle)
      pending.delete(handle)
      at.armed = pending.size
    },
  }
  const idle: IdleResettable = {
    reset: () => {
      at.resets += 1
    },
    stop: () => {
      at.stops += 1
    },
  }
  const observer: StreamObserver = {
    onChunk: (bytes, atMs) => {
      events.push(`chunk:${bytes}`)
      stamps.push(atMs)
    },
    onComplete: () => events.push("complete"),
    onUpstreamError: (err) => events.push(`error:${String(err)}`),
    onDownstreamCancel: (why) => events.push(`cancel:${String(why)}`),
    onChunkBytes: (chunk) => events.push(`bytes:${chunk.byteLength}`),
  }
  const fireAll = (): undefined => {
    const held = [...pending.entries()]
    pending.clear()
    at.armed = 0
    for (const [handle, fn] of held) {
      clearTimeout(handle)
      fn()
    }
  }
  return { at, events, stamps, timers, idle, observer, fireAll }
}

export function sourceOf(parts: readonly (string | Uint8Array)[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start: (controller) => {
      for (const part of parts) {
        controller.enqueue(typeof part === "string" ? ENC.encode(part) : part)
      }
      controller.close()
    },
  })
}

export function countingSource(
  limit: number,
  tally: { pulls: number }
): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    pull: (controller) => {
      tally.pulls += 1
      if (tally.pulls > limit) controller.close()
      else controller.enqueue(ENC.encode(`p${tally.pulls}\n`))
    },
  })
}

export function dyingSource(): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    pull: () => {
      throw new Error(FIRST)
    },
  })
}

export function heldSource(onCancel?: (why: unknown) => void) {
  let held: ReadableStreamDefaultController<Uint8Array> | null = null
  const stream = new ReadableStream<Uint8Array>({
    start: (controller) => {
      held = controller
    },
    cancel: onCancel,
  })
  const grab = (): ReadableStreamDefaultController<Uint8Array> => {
    if (held == null) throw new Error("the source never started")
    return held
  }
  return {
    stream,
    push: (text: string): undefined => {
      grab().enqueue(ENC.encode(text))
    },
    close: (): undefined => {
      grab().close()
    },
    fail: (err: unknown): undefined => {
      grab().error(err)
    },
  }
}

export async function tick(): Promise<undefined> {
  for (let turn = 0; turn < 400; turn += 1) await Promise.resolve()
  return undefined
}

export function required(body: ReadableStream<Uint8Array> | null): ReadableStream<Uint8Array> {
  if (body == null) throw new Error("the body was null")
  return body
}

export async function drain(body: ReadableStream<Uint8Array> | null): Promise<string> {
  const reader = required(body).getReader()
  let out = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) return out
    if (value !== undefined) out += DEC.decode(value)
  }
}

export async function rig(first: string, frame = false, intervalMs = MS) {
  const src = heldSource()
  const p = probes()
  src.push(first)
  const out = required(
    await pullFirstChunkAndWrap(
      src.stream,
      p.observer,
      p.idle,
      { intervalMs, timers: p.timers },
      frame
    )
  )
  return { src, out, p }
}

export async function cancelled() {
  const gone = await rig("a\n")
  await tick()
  await gone.out.cancel(LEFT)
  await tick()
  return gone
}

export async function framed(first: string, frame = true) {
  const bad = await rig(first, frame)
  await tick()
  bad.src.fail(new Error(BROKE))
  await tick()
  return bad
}

export async function ended() {
  const done = await rig("a\n")
  done.src.close()
  await tick()
  return [done, await framed("a\n", false), await cancelled()]
}

export async function firstFails(frame = false) {
  const p = probes()
  let err: unknown = null
  try {
    await pullFirstChunkAndWrap(dyingSource(), p.observer, p.idle, undefined, frame)
  } catch (caught) {
    err = caught
  }
  return { err, p }
}

export async function retried(
  backoffMs: readonly number[] | undefined,
  op: (runs: number) => unknown
) {
  const waits: number[] = []
  const sleep: TransportSleep = async (ms) => {
    waits.push(ms)
  }
  let runs = 0
  let err: unknown = null
  let got: unknown = null
  try {
    got = await withTransportRetry(
      async () => {
        runs += 1
        return op(runs)
      },
      "[test]",
      "acct /v1/messages",
      backoffMs,
      sleep
    )
  } catch (caught) {
    err = caught
  }
  return { runs, waits, err, got }
}

export function boom(): never {
  throw socketError()
}
