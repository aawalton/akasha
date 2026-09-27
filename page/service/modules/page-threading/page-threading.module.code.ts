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
  type Threaded,
  type Told,
  WIDE_PAGES,
} from "akasha/page/service/modules/read-answering/read-answering.module.code.ts"
import {
  apartFor,
  landedApart,
  left,
} from "akasha/page/service/modules/read-settling/read-settling.module.code.ts"
import { STATUS_FOR } from "akasha/page/service/modules/refusal-fault/refusal-fault.module.code.ts"

const READERS = 4

const LANE = 0

export const THREAD_HEADER = "akasha-read-thread"

const STARTED_AGAIN_MS = 1_000

const POSTED = "POST"

type Slot = {
  readonly at: number
  worker: Worker | null
  stopping: boolean
  heapMb: number | null
  wide: number
  readonly waiting: Map<number, (answer: Answer | null) => undefined>
}

export type Threads = {
  readonly answered: (request: Request) => Promise<Response> | null
  readonly apart: <T>(act: () => Promise<T>) => Promise<T>
  readonly heapsSaid: () => string
  readonly stopped: () => Promise<undefined>
}

type Starting = {
  readonly entry?: string
  readonly readers?: number
  readonly widePages?: number
  readonly kept: (read: Reads) => undefined
}

type Shared = Omit<Threaded, "at" | "lane"> & { readonly entry: string }

function faultOf(why: string): Answer {
  return {
    status: STATUS_FOR.service,
    type: "application/json",
    body: JSON.stringify({ refused: why }),
  }
}

function startedIn(slot: Slot, shared: Shared): undefined {
  const { entry, root, apart, widePages } = shared
  const threaded: Threaded = { root, apart, at: slot.at, lane: slot.at === LANE, widePages }
  const worker = new Worker(entry, { workerData: { [THREADED]: threaded } })
  slot.worker = worker
  worker.on("message", (told: Told) => {
    if ("heapMb" in told) {
      slot.heapMb = told.heapMb
      return
    }
    const settle = slot.waiting.get(told.id)
    slot.waiting.delete(told.id)
    settle?.("wide" in told ? null : told.answer)
  })
  const lost = (why: string): undefined => {
    if (slot.worker !== worker) return undefined
    slot.worker = null
    slot.heapMb = null
    left(apart, slot.at)
    for (const settle of slot.waiting.values()) settle(faultOf(why))
    slot.waiting.clear()
    if (slot.stopping) return undefined
    process.stderr.write(`reading thread ${slot.at} was lost and is started again: ${why}\n`)
    setTimeout(() => {
      if (!slot.stopping) startedIn(slot, shared)
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

function openIn(slots: readonly Slot[]): Slot | null {
  const lane = slots[LANE]
  const others = slots.filter((one) => one !== lane)
  if (lane !== undefined && lane.wide > 0) return leastBusy(others) ?? leastBusy(slots)
  return leastBusy(slots)
}

function askedOf(slot: Slot, asked: Asked): Promise<Answer | null> {
  const worker = slot.worker
  if (worker === null) return Promise.resolve(faultOf("the reading thread asked was not running"))
  return new Promise((settle) => {
    slot.waiting.set(asked.id, (one) => {
      settle(one)
      return undefined
    })
    worker.postMessage(asked)
  })
}

async function laneAsked(lane: Slot, asked: Asked): Promise<Answer> {
  lane.wide += 1
  try {
    return (await askedOf(lane, asked)) ?? faultOf("the lane handed a wide question back")
  } finally {
    lane.wide -= 1
  }
}

function heapSaid(slot: Slot): string {
  return slot.heapMb === null ? "-" : String(slot.heapMb)
}

export function threadsFor(root: string, starting: Starting): Threads {
  const readers = Math.max(1, starting.readers ?? READERS)
  const apart = apartFor(readers)
  const shared: Shared = {
    entry: starting.entry ?? Bun.main,
    root,
    apart,
    widePages: starting.widePages ?? WIDE_PAGES,
  }
  const slots: Slot[] = Array.from({ length: readers }, (_, at) => ({
    at,
    worker: null,
    stopping: false,
    heapMb: null,
    wide: 0,
    waiting: new Map(),
  }))
  for (const one of slots) startedIn(one, shared)
  const lane = slots[LANE] as Slot
  let next = 0
  const sent = async (request: Request, kind: Asked["kind"]): Promise<Response> => {
    const text = await request.text()
    const slot = openIn(slots)
    if (slot === null)
      return responseOf(faultOf("no reading thread was running to answer this read"))
    const id = next
    next += 1
    const asked: Asked = { id, kind, text, asker: askerOf(request) }
    const first = await askedOf(slot, asked)
    const answer = first ?? (await laneAsked(lane, asked))
    if (answer.read !== undefined) starting.kept(answer.read)
    const at = first === null ? lane.at : slot.at
    return responseOf(answer, { [THREAD_HEADER]: String(at) })
  }
  return {
    answered: (request) => {
      if (request.method !== POSTED) return null
      const kind = readKindAt(new URL(request.url).pathname)
      if (kind === null || leastBusy(slots) === null) return null
      return sent(request, kind)
    },
    apart: (act) => landedApart(apart, act),
    heapsSaid: () => `thread heaps ${slots.map(heapSaid).join(", ")} MB`,
    stopped: async () => {
      for (const one of slots) one.stopping = true
      await Promise.all(slots.map((one) => one.worker?.terminate()))
      return undefined
    },
  }
}
