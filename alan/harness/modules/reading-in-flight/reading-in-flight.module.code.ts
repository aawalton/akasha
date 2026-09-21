import { AsyncLocalStorage } from "node:async_hooks"
import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import {
  gateFoundBy,
  type Reach,
  type ReadGate,
} from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const ONE_STORE = Symbol.for("akasha.reading-in-flight.store")

function oneStore(): AsyncLocalStorage<ReadGate> {
  const held: unknown = Reflect.get(globalThis, ONE_STORE)
  if (held instanceof AsyncLocalStorage) return held
  const made = new AsyncLocalStorage<ReadGate>()
  Reflect.set(globalThis, ONE_STORE, made)
  return made
}

const inFlight = oneStore()

gateFoundBy(() => inFlight.getStore() ?? null)

const asTheSystem: ReadGate = async () => ({ permitted: true, narrows: null })

export type WhoIsReading = (request: Request) => Promise<{ readonly user: object | null }>

export type MayRead = (user: object | null, pageTypeSlug: string) => Promise<Reach>

export function readingFor<Answer>(
  whoIsReading: WhoIsReading,
  request: Request,
  work: () => Promise<Answer>,
  reads: MayRead = mayRead
): Promise<Answer> {
  let read: Promise<{ readonly user: object | null }> | null = null
  const gate: ReadGate = async (pageTypeSlug) => {
    read ??= whoIsReading(request)
    return reads((await read).user, pageTypeSlug)
  }
  return inFlight.run(gate, work)
}

export function readingAsTheSystem<Answer>(work: () => Promise<Answer>): Promise<Answer> {
  return inFlight.run(asTheSystem, work)
}
