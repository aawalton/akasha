import { type Queue, queueAt } from "@akasha/pages-system/page-entry-queue"
import { z } from "zod"
import type { StreamClock, StreamObserver } from "../retry/retry.module.code.ts"

const TRANSPORT_PROPERTY_SLUG = "transport"

const TRANSPORT_HELD = "jsonl"

const TRANSPORT_CEILING = 8 * 1024 * 1024

const NO_ROOT = ""

const TERMINATIONS = [
  "complete",
  "upstream_error",
  "downstream_cancel",
  "client_disconnect",
  "proxy_shutdown",
] as const

type Termination = (typeof TERMINATIONS)[number]

export type ObservedStreamState = {
  termination: Termination
  account: string
  path: string
  startMs: number
  endMs: number
  framesUpstream: number
  bytesUpstream: number
  lastFrameMs: number
  lastEventType: string | null
  sawMessageStop: boolean
  httpStatus: number | null
  heldMs?: number | null
  emptyPoolReason?: string | null
  error?: unknown
}

const TRANSPORT_EVENT_SCHEMA = z.looseObject({
  ts: z.string(),
  termination: z.enum(TERMINATIONS),
  account: z.string(),
  path: z.string(),
  elapsedMs: z.number(),
  framesUpstream: z.number().int().nonnegative(),
  bytesUpstream: z.number().int().nonnegative(),
  lastFrameAgoMs: z.number(),
  lastEventType: z.string().nullable(),
  sawMessageStop: z.boolean(),
  httpStatus: z.number().int().nullable(),
  errorClass: z.string().nullable(),
  errorMessage: z.string().nullable(),
  heldMs: z.number().nullable().optional(),
  emptyPoolReason: z.string().nullable().optional(),
})

export type TransportEvent = z.infer<typeof TRANSPORT_EVENT_SCHEMA>

type Split = { readonly errorClass: string | null; readonly errorMessage: string | null }

function splitOf(error: unknown): Split {
  if (error === null || error === undefined) return { errorClass: null, errorMessage: null }
  if (error instanceof Error) {
    return { errorClass: error.constructor.name, errorMessage: error.message }
  }
  return { errorClass: typeof error, errorMessage: String(error) }
}

export function buildTransportEvent(state: ObservedStreamState): TransportEvent {
  const split = splitOf(state.error)
  return {
    ts: new Date(state.endMs).toISOString(),
    termination: state.termination,
    account: state.account,
    path: state.path,
    elapsedMs: state.endMs - state.startMs,
    framesUpstream: state.framesUpstream,
    bytesUpstream: state.bytesUpstream,
    lastFrameAgoMs: state.endMs - state.lastFrameMs,
    lastEventType: state.lastEventType,
    sawMessageStop: state.sawMessageStop,
    httpStatus: state.httpStatus,
    errorClass: split.errorClass,
    errorMessage: split.errorMessage,
    heldMs: state.heldMs ?? null,
    emptyPoolReason: state.emptyPoolReason ?? null,
  }
}

const SSE_EVENT_LINE = /(?:^|\n)event:[ \t]*([^\r\n]*?)[ \t]*(?:\r?\n|$)/g

const SSE_MESSAGE_STOP = /(?:^|\n)event:[ \t]*message_stop\b/

const DECODER = new TextDecoder()

function decodedChunk(chunk: Uint8Array): string {
  return DECODER.decode(chunk)
}

function extractLastSseEventTypeIn(text: string): string | null {
  let last: string | null = null
  for (const found of text.matchAll(SSE_EVENT_LINE)) {
    last = found[1] ?? ""
  }
  return last
}

export type TransportLogAt = string | (() => string)

type Held = { readonly queue: Queue } | { readonly refused: string }

const QUEUES = new Map<string, Queue>()

function queueFor(at: string): Held {
  const opened = QUEUES.get(at)
  if (opened !== undefined) return { queue: opened }
  const made = queueAt(NO_ROOT, at, TRANSPORT_PROPERTY_SLUG, TRANSPORT_HELD, TRANSPORT_CEILING)
  if ("refused" in made) return made
  QUEUES.set(at, made.queue)
  return made
}

function said(why: unknown): string {
  return why instanceof Error ? why.message : String(why)
}

export function recordTransportEvent(event: TransportEvent, at: TransportLogAt): string | null {
  try {
    const held = queueFor(typeof at === "string" ? at : at())
    if ("refused" in held) return held.refused
    held.queue.write(event)
    return held.queue.refused()
  } catch (why) {
    return said(why)
  }
}

export async function transportLogFlushed(): Promise<void> {
  const waiting: Promise<void>[] = []
  for (const one of QUEUES.values()) waiting.push(one.flushed())
  await Promise.all(waiting)
}

export type ShutdownFlushRegistry = {
  enter: (observer: StreamObserver) => () => void
  flushAll: (reason: string) => void
}

export type ArmableStreamObserver = StreamObserver & {
  armTerminal: (fn: () => void) => undefined
}

export function buildStreamObserver(args: {
  account: string | null
  path: string
  startMs: number
  logAt?: TransportLogAt | undefined
  shutdownRegistry?: ShutdownFlushRegistry | undefined
}): ArmableStreamObserver {
  const { account, path, startMs, logAt, shutdownRegistry } = args
  const accountLabel = account ?? "-"
  let framesUpstream = 0
  let bytesUpstream = 0
  let lastFrameMs = startMs
  let lastEventType: string | null = null
  let sawMessageStop = false
  let httpStatus: number | null = null
  let terminated = false
  let onTerminalFn: (() => void) | null = null
  let leave: (() => void) | null = null
  function emit(termination: Termination, atMs: number, error?: unknown): undefined {
    if (terminated) return
    terminated = true
    if (leave !== null) {
      leave()
      leave = null
    }
    onTerminalFn?.()
    if (logAt === undefined) return
    recordTransportEvent(
      buildTransportEvent({
        termination,
        account: accountLabel,
        path,
        startMs,
        endMs: atMs,
        framesUpstream,
        bytesUpstream,
        lastFrameMs,
        lastEventType,
        sawMessageStop,
        httpStatus,
        error,
      }),
      logAt
    )
  }
  const observer: ArmableStreamObserver = {
    onChunk(bytes, atMs) {
      framesUpstream += 1
      bytesUpstream += bytes
      lastFrameMs = atMs
    },
    onChunkBytes(chunk) {
      if (chunk.byteLength === 0) return
      const text = decodedChunk(chunk)
      const found = extractLastSseEventTypeIn(text)
      if (found !== null) lastEventType = found
      if (!sawMessageStop && SSE_MESSAGE_STOP.test(text)) sawMessageStop = true
    },
    onUpstreamStatus(status) {
      httpStatus = status
    },
    onComplete(atMs) {
      emit("complete", atMs)
    },
    onUpstreamError(err, atMs) {
      emit("upstream_error", atMs, err)
    },
    onDownstreamCancel(reason, atMs) {
      emit("downstream_cancel", atMs, reason)
    },
    onClientDisconnect(reason, atMs) {
      emit("client_disconnect", atMs, reason)
    },
    onProxyShutdown(reason, atMs) {
      emit("proxy_shutdown", atMs, reason)
    },
    armTerminal(fn) {
      if (terminated) {
        fn()
        return
      }
      onTerminalFn = fn
    },
  }
  if (shutdownRegistry !== undefined) leave = shutdownRegistry.enter(observer)
  return observer
}

export function buildShutdownFlushRegistry(now: StreamClock = Date.now): ShutdownFlushRegistry {
  const observers = new Set<StreamObserver>()
  return {
    enter(observer) {
      observers.add(observer)
      return () => {
        observers.delete(observer)
      }
    },
    flushAll(reason) {
      const atMs = now()
      for (const one of observers) {
        one.onProxyShutdown?.(reason, atMs)
      }
      observers.clear()
    },
  }
}
