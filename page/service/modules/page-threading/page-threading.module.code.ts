import { Worker } from "node:worker_threads"
import type { Reads } from "akasha/page/service/modules/kinds-gathering/kinds-gathering.module.code.ts"
import {
  askerOf,
  readKindAt,
  responseOf,
} from "akasha/page/service/modules/page-serving/page-serving.module.code.ts"
import {
  type Answer,
  type Asked,
  THREADED,
  type Told,
} from "akasha/page/service/modules/read-answering/read-answering.module.code.ts"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

const READERS = 4

export const THREAD_HEADER = "akasha-read-thread"

const STARTED_AGAIN_MS = 1_000

const POSTED = "POST"

type Slot = {
  readonly at: number
  worker: Worker | null
  stopping: boolean
  heapMb: number | null
  readonly waiting: Map<number, (answer: Answer) => undefined>
}

export type Threads = {
  readonly answered: (request: Request) => Promise<Response> | null
  readonly heapsSaid: () => string
  readonly stopped: () => Promise<undefined>
}

type Starting = {
  readonly entry?: string
  readonly readers?: number
  readonly kept: (read: Reads) => undefined
}

function faultOf(why: string): Answer {
  return {
    status: STATUS_FOR.service,
    type: "application/json",
    body: JSON.stringify({ refused: why }),
  }
}

function startedIn(slot: Slot, entry: string, root: string): undefined {
  const worker = new Worker(entry, { workerData: { [THREADED]: root } })
  slot.worker = worker
  worker.on("message", (told: Told) => {
    if ("heapMb" in told) {
      slot.heapMb = told.heapMb
      return
    }
    const settle = slot.waiting.get(told.id)
    slot.waiting.delete(told.id)
    settle?.(told.answer)
  })
  const lost = (why: string): undefined => {
    if (slot.worker !== worker) return undefined
    slot.worker = null
    slot.heapMb = null
    for (const settle of slot.waiting.values()) settle(faultOf(why))
    slot.waiting.clear()
    if (slot.stopping) return undefined
    process.stderr.write(`reading thread ${slot.at} was lost and is started again: ${why}\n`)
    setTimeout(() => {
      if (!slot.stopping) startedIn(slot, entry, root)
    }, STARTED_AGAIN_MS)
    return undefined
  }
  worker.on("error", (thrown: unknown) => lost(`the reading thread threw: ${String(thrown)}`))
  worker.on("exit", (code: number) => lost(`the reading thread left with ${code}`))
  return undefined
}

function leastBusy(slots: readonly Slot[]): Slot | null {
  let found: Slot | null = null
  for (const one of slots) {
    if (one.worker === null) continue
    if (found === null || one.waiting.size < found.waiting.size) found = one
  }
  return found
}

function heapSaid(slot: Slot): string {
  return slot.heapMb === null ? "-" : String(slot.heapMb)
}

export function threadsFor(root: string, starting: Starting): Threads {
  const entry = starting.entry ?? Bun.main
  const slots: Slot[] = Array.from(
    { length: Math.max(1, starting.readers ?? READERS) },
    (_, at) => ({
      at,
      worker: null,
      stopping: false,
      heapMb: null,
      waiting: new Map(),
    })
  )
  for (const one of slots) startedIn(one, entry, root)
  let next = 0
  const sent = async (request: Request, kind: Asked["kind"]): Promise<Response | null> => {
    const text = await request.text()
    const slot = leastBusy(slots)
    const worker = slot?.worker
    if (slot === null || worker === null || worker === undefined) return null
    const id = next
    next += 1
    const asked: Asked = { id, kind, text, asker: askerOf(request) }
    const answer = await new Promise<Answer>((settle) => {
      slot.waiting.set(id, (one) => {
        settle(one)
        return undefined
      })
      worker.postMessage(asked)
    })
    if (answer.read !== undefined) starting.kept(answer.read)
    return responseOf(answer, { [THREAD_HEADER]: String(slot.at) })
  }
  return {
    answered: (request) => {
      if (request.method !== POSTED) return null
      const kind = readKindAt(new URL(request.url).pathname)
      if (kind === null || leastBusy(slots) === null) return null
      return sent(request, kind).then(
        (one) => one ?? responseOf(faultOf("no reading thread was there to answer this read"))
      )
    },
    heapsSaid: () => `thread heaps ${slots.map(heapSaid).join(", ")} MB`,
    stopped: async () => {
      for (const one of slots) one.stopping = true
      await Promise.all(slots.map((one) => one.worker?.terminate()))
      return undefined
    },
  }
}
