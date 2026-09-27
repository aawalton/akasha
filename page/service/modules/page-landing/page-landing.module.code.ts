import { isMainThread, parentPort, Worker, workerData } from "node:worker_threads"
import {
  type Landing as Landed,
  landingHeard,
  landingsTold,
  watching,
} from "akasha/page/service/modules/hold-naming/hold-naming.module.code.ts"
import {
  APPEND_AT,
  answering,
  INCREMENT_AT,
  PLACE_AT,
  WRITE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import { writerFor } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import {
  landingApart,
  landingsKeptApart,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

export const LANDING_THREADED = "page-landing"

const WRITES: ReadonlySet<string> = new Set([WRITE_AT, APPEND_AT, PLACE_AT, INCREMENT_AT])

const POSTED = "POST"

const JSON_TYPE = "application/json"

const STARTED_AGAIN_MS = 1_000

const ASKED_AT = "http://landing.invalid"

type Answer = { readonly status: number; readonly type: string; readonly body: string }

type Asked = {
  readonly id: number
  readonly at: string
  readonly text: string
  readonly headers: readonly (readonly [string, string])[]
}

type Told =
  | { readonly id: number; readonly answer: Answer }
  | { readonly landing: Landed; readonly origin: number }

type Held = { readonly root: string; readonly apart: Int32Array }

export type Landing = {
  readonly answered: (request: Request) => Promise<Response> | null
  readonly stopped: () => Promise<undefined>
}

function faultOf(why: string): Answer {
  return { status: STATUS_FOR.service, type: JSON_TYPE, body: JSON.stringify({ refused: why }) }
}

function responseOf(answer: Answer): Response {
  return new Response(answer.body, {
    status: answer.status,
    headers: { "content-type": answer.type },
  })
}

type Slot = {
  worker: Worker | null
  stopping: boolean
  readonly waiting: Map<number, (answer: Answer) => undefined>
}

function startedIn(slot: Slot, entry: string, held: Held): undefined {
  const worker = new Worker(entry, { workerData: { [LANDING_THREADED]: held } })
  slot.worker = worker
  worker.on("message", (told: Told) => {
    if ("landing" in told) {
      landingHeard(told.landing, told.origin)
      return
    }
    const settle = slot.waiting.get(told.id)
    slot.waiting.delete(told.id)
    settle?.(told.answer)
  })
  const lost = (why: string): undefined => {
    if (slot.worker !== worker) return undefined
    slot.worker = null
    for (const settle of slot.waiting.values()) settle(faultOf(why))
    slot.waiting.clear()
    if (slot.stopping) return undefined
    process.stderr.write(`the landing thread was lost and is started again: ${why}\n`)
    setTimeout(() => {
      if (!slot.stopping) startedIn(slot, entry, held)
    }, STARTED_AGAIN_MS)
    return undefined
  }
  worker.on("error", (thrown: unknown) => lost(`the landing thread threw: ${String(thrown)}`))
  worker.on("exit", (code: number) => lost(`the landing thread left with ${code}`))
  return undefined
}

export function landingThreadFor(
  root: string,
  apart: Int32Array,
  entry: string = Bun.main
): Landing {
  const slot: Slot = { worker: null, stopping: false, waiting: new Map() }
  startedIn(slot, entry, { root, apart })
  let next = 0
  const sent = async (request: Request, at: string): Promise<Response> => {
    const text = await request.text()
    const worker = slot.worker
    if (worker === null)
      return responseOf(faultOf("the landing thread was not running to land this write"))
    const id = next
    next += 1
    const asked: Asked = { id, at, text, headers: [...request.headers] }
    const answer = await new Promise<Answer>((settle) => {
      slot.waiting.set(id, (one) => {
        settle(one)
        return undefined
      })
      worker.postMessage(asked)
    })
    return responseOf(answer)
  }
  return {
    answered: (request) => {
      if (request.method !== POSTED) return null
      const at = new URL(request.url).pathname
      return WRITES.has(at) ? sent(request, at) : null
    },
    stopped: async () => {
      slot.stopping = true
      await slot.worker?.terminate()
      return undefined
    },
  }
}

function heldIn(given: unknown): Held | null {
  if (typeof given !== "object" || given === null) return null
  const held = (given as Readonly<Record<string, unknown>>)[LANDING_THREADED]
  if (typeof held !== "object" || held === null) return null
  const { root, apart } = held as Readonly<Record<string, unknown>>
  if (typeof root !== "string" || !(apart instanceof Int32Array)) return null
  return { root, apart }
}

async function answerOf(response: Response): Promise<Answer> {
  return {
    status: response.status,
    type: response.headers.get("content-type") ?? JSON_TYPE,
    body: await response.text(),
  }
}

export function landingOnThread(): undefined {
  const port = parentPort
  const held = heldIn(workerData)
  if (isMainThread || port === null || held === null) return undefined
  landingsKeptApart(held.apart)
  watching()
  landingsTold((landing) => {
    port.postMessage({ landing, origin: performance.timeOrigin } satisfies Told)
    return undefined
  })
  const serving = { root: held.root, writer: writerFor({ root: held.root, apart: landingApart }) }
  port.on("message", (asked: Asked) => {
    const request = new Request(`${ASKED_AT}${asked.at}`, {
      method: POSTED,
      body: asked.text,
      headers: Object.fromEntries(asked.headers),
    })
    answering(serving, request)
      .then(answerOf)
      .catch((thrown: unknown) => faultOf(String(thrown)))
      .then((answer) => port.postMessage({ id: asked.id, answer } satisfies Told))
  })
  return undefined
}
