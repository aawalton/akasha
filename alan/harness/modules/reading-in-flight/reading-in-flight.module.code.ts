import { AsyncLocalStorage } from "node:async_hooks"
import { mayRead } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import {
  gateFoundBy,
  type Reach,
  type ReadGate,
} from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const inFlight = new AsyncLocalStorage<ReadGate>()

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
