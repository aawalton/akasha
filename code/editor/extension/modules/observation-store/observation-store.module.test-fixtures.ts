import type { Fetcher } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import {
  createObservationStore,
  type ObservationStore,
} from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import type { Observation } from "akasha/code/editor/extension/modules/seat-observations/seat-observations.module.code.ts"
import { z } from "zod"

const sentBody = z.object({
  writer: z.string(),
  message: z.string(),
  pages: z
    .array(
      z.object({
        pageTypeSlug: z.string(),
        slug: z.string(),
        merge: z.boolean(),
        values: z.object({
          features: z.record(z.string(), z.custom<Observation>()),
          observedAt: z.string(),
        }),
      })
    )
    .length(1),
})

export interface Sent {
  readonly url: string
  readonly writer: string
  readonly message: string
  readonly pageTypeSlug: string
  readonly slug: string
  readonly merge: boolean
  readonly features: Record<string, Observation>
  readonly observedAt: string
}

const ORIGIN = "http://pages.test"
const WINDOW = "4242-46800522"

function service(): {
  readonly sent: readonly Sent[]
  readonly fetcher: Fetcher
  readonly refuse: (status: number) => void
  readonly goSilent: () => void
  readonly accept: () => void
} {
  const sent: Sent[] = []
  let answer = (): Response => new Response('{"ok":true}', { status: 200 })
  return {
    sent,
    fetcher: async (url, init) => {
      const body = sentBody.parse(JSON.parse(String(init.body)))
      const page = body.pages[0] as (typeof body.pages)[number]
      sent.push({
        url,
        writer: body.writer,
        message: body.message,
        pageTypeSlug: page.pageTypeSlug,
        slug: page.slug,
        merge: page.merge,
        features: page.values.features,
        observedAt: page.values.observedAt,
      })
      return answer()
    },
    refuse: (status) => {
      answer = (): Response => new Response("the gates refused it", { status })
    },
    goSilent: () => {
      answer = (): Response => {
        throw new Error("nothing answered")
      }
    },
    accept: () => {
      answer = (): Response => new Response('{"ok":true}', { status: 200 })
    },
  }
}

export function makeStore(
  options: {
    readonly settleMs?: number
    readonly window?: string
    readonly service?: ReturnType<typeof service>
    readonly onError?: (message: string) => void
  } = {}
): { store: ObservationStore; sent: readonly Sent[] } {
  const pages = options.service ?? service()
  let tick = 0
  const store = createObservationStore({
    window: options.window ?? WINDOW,
    origin: ORIGIN,
    fetch: pages.fetcher,
    settleMs: options.settleMs ?? 0,
    now: () => {
      tick += 1
      return new Date(Date.UTC(2026, 7, 13, 20, 0, tick))
    },
    ...(options.onError === undefined ? {} : { onError: options.onError }),
  })
  return { store, sent: pages.sent }
}
