import { isMainThread, parentPort, Worker, workerData } from "node:worker_threads"
import {
  EVENTS_AT,
  FOLLOW_AT,
  said,
} from "akasha/page/service/modules/page-following/page-following.module.code.ts"
import {
  ASK_AT,
  answering,
  FILE_AT,
  READ_AT,
  SHAPE_AT,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import {
  type Writer,
  writerFor,
} from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { settledApart } from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

export const READERS = 6

const THREADED = "page-threading"

const UNBODIED: ReadonlySet<string> = new Set(["GET", "HEAD"])

const READS: ReadonlySet<string> = new Set([ASK_AT, READ_AT, SHAPE_AT, FILE_AT])

const KEPT_ON_MAIN: ReadonlySet<string> = new Set([EVENTS_AT, FOLLOW_AT])

type Header = readonly [string, string]

type Asked = {
  readonly id: number
  readonly url: string
  readonly method: string
  readonly headers: readonly Header[]
  readonly body: ArrayBuffer | null
}

type Answered = {
  readonly id: number
  readonly status: number
  readonly headers: readonly Header[]
  readonly body: ArrayBuffer
}

type Slot = {
  worker: Worker | null
  stopping: boolean
  readonly waiting: Map<number, (answered: Answered) => undefined>
}

export type Threads = {
  readonly answered: (request: Request) => Promise<Response>
  readonly stopped: () => Promise<undefined>
}

function pathOf(url: string): string {
  return new URL(url).pathname
}

export function readAt(url: string): boolean {
  return READS.has(pathOf(url))
}

export function threadedAt(url: string): boolean {
  return !KEPT_ON_MAIN.has(pathOf(url))
}

function requestOf(asked: Asked): Request {
  return new Request(asked.url, {
    method: asked.method,
    headers: asked.headers.map(([key, value]): [string, string] => [key, value]),
    body: asked.body,
  })
}

async function answeredOf(id: number, response: Response): Promise<Answered> {
  return {
    id,
    status: response.status,
    headers: [...response.headers],
    body: await response.arrayBuffer(),
  }
}

function faultOf(id: number, why: string): Answered {
  const body = new TextEncoder().encode(JSON.stringify({ refused: why })).buffer as ArrayBuffer
  return { id, status: STATUS_FOR.service, headers: [["content-type", "application/json"]], body }
}

export async function answeredHere(root: string, writer: Writer, asked: Asked): Promise<Answered> {
  const serving = { root, writer }
  const once = async (): Promise<Answered> =>
    answeredOf(asked.id, await answering(serving, requestOf(asked)))
  if (!readAt(asked.url)) return once()
  const settled = await settledApart(root, once)
  if ("settled" in settled) return settled.settled
  return answeredOf(asked.id, said({ refused: settled.refused }, STATUS_FOR.race))
}

function answeringOn(root: string): undefined {
  const port = parentPort
  if (port === null) return
  const writer = writerFor({ root })
  port.on("message", (asked: Asked) => {
    answeredHere(root, writer, asked)
      .catch((thrown: unknown) => faultOf(asked.id, String(thrown)))
      .then((answered) => port.postMessage(answered, [answered.body]))
  })
}

function rootBooted(given: unknown): string | null {
  if (typeof given !== "object" || given === null) return null
  const root = (given as Readonly<Record<string, unknown>>)[THREADED]
  return typeof root === "string" ? root : null
}

if (!isMainThread) {
  const root = rootBooted(workerData)
  if (root !== null) answeringOn(root)
}

function startedIn(slot: Slot, entry: string, root: string): undefined {
  const worker = new Worker(entry, { workerData: { [THREADED]: root } })
  slot.worker = worker
  worker.on("message", (answered: Answered) => {
    const settle = slot.waiting.get(answered.id)
    slot.waiting.delete(answered.id)
    settle?.(answered)
  })
  const lost = (why: string): undefined => {
    if (slot.worker !== worker) return
    slot.worker = null
    for (const [id, settle] of slot.waiting) settle(faultOf(id, why))
    slot.waiting.clear()
    if (!slot.stopping) startedIn(slot, entry, root)
  }
  worker.on("error", (thrown: unknown) => lost(`the thread answering threw: ${String(thrown)}`))
  worker.on("exit", (code: number) => lost(`the thread answering left with ${code}`))
}

function slotOn(entry: string, root: string): Slot {
  const slot: Slot = { worker: null, stopping: false, waiting: new Map() }
  startedIn(slot, entry, root)
  return slot
}

function leastBusy(slots: readonly Slot[]): Slot {
  let found = slots[0] as Slot
  for (const one of slots) if (one.waiting.size < found.waiting.size) found = one
  return found
}

function responseOf(answered: Answered): Response {
  return new Response(answered.body, {
    status: answered.status,
    headers: answered.headers.map(([key, value]): [string, string] => [key, value]),
  })
}

export function threadsFor(
  root: string,
  entry: string = Bun.main,
  readers: number = READERS
): Threads {
  const reading = Array.from({ length: Math.max(1, readers) }, () => slotOn(entry, root))
  const writing = slotOn(entry, root)
  const every = [...reading, writing]
  let next = 0
  return {
    answered: async (request) => {
      const body = UNBODIED.has(request.method) ? null : await request.arrayBuffer()
      const slot = readAt(request.url) ? leastBusy(reading) : writing
      const id = next
      next += 1
      const asked: Asked = {
        id,
        url: request.url,
        method: request.method,
        headers: [...request.headers],
        body,
      }
      const answered = await new Promise<Answered>((settle) => {
        slot.waiting.set(id, (one) => {
          settle(one)
          return undefined
        })
        slot.worker?.postMessage(asked, body === null ? [] : [body])
      })
      return responseOf(answered)
    },
    stopped: async () => {
      for (const one of every) one.stopping = true
      await Promise.all(every.map((one) => one.worker?.terminate()))
      return undefined
    },
  }
}
