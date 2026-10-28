import { expect, test } from "bun:test"
import { hulu } from "akasha/alan/collection/watching/streaming-service/pages/hulu.streaming-service.ts"
import { netflix } from "akasha/alan/collection/watching/streaming-service/pages/netflix.streaming-service.ts"
import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import {
  NO_SERVICES,
  relatingBy,
  servicesFrom,
  servicesKnown,
} from "akasha/command/pages/watching/modules/service-relating/service-relating.module.code.ts"
import type { Calls } from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

const SERVICE = streamingService.slug

const NETFLIX = `${SERVICE}/${netflix.slug}`

const HULU = `${SERVICE}/${hulu.slug}`

const KNOWN = servicesFrom([netflix, hulu])

test("a provider name reaches the service listing it, once and in the order services sort in", () => {
  const relating = relatingBy(KNOWN)
  expect(relating.related(["Netflix Standard with Ads", "Hulu", "Netflix"])).toEqual([
    HULU,
    NETFLIX,
  ])
  expect(relating.fresh()).toEqual([])
})

test("a name is looked up with the space around it trimmed", () => {
  expect(relatingBy(KNOWN).related([" Hulu ", ""])).toEqual([HULU])
})

test("a name no page lists gets one page of its own, however often it is met", () => {
  const relating = relatingBy(NO_SERVICES)
  const fresh = `${SERVICE}/brand-new-tv`
  expect(relating.related(["Brand New TV"])).toEqual([fresh])
  expect(relating.related(["Brand New TV "])).toEqual([fresh])
  expect(relating.fresh()).toEqual([
    {
      pageTypeSlug: SERVICE,
      slug: "brand-new-tv",
      fresh: true,
      values: { title: "Brand New TV", providerNames: ["Brand New TV"], free: false, held: false },
    },
  ])
})

test("a name whose slug a service already has reaches that service", () => {
  const relating = relatingBy(KNOWN)
  expect(relating.related(["NETFLIX"])).toEqual([NETFLIX])
  expect(relating.fresh()).toEqual([])
})

test("the services known are asked of the streaming service pages", async () => {
  const asked: unknown[] = []
  const calls: Calls = {
    ask: (query) => {
      asked.push(query)
      return Promise.resolve({ rows: [netflix], n: 1 })
    },
    write: () => Promise.resolve({ commit: null, wrote: [], took: [] }),
    fetch: () => Promise.resolve(Response.json({})),
  }
  const known = await servicesKnown(calls)
  expect(asked).toEqual([{ pageTypeSlug: SERVICE, keys: ["slug", "providerNames"] }])
  expect(typeof known === "string" ? known : relatingBy(known).related(["Netflix"])).toEqual([
    NETFLIX,
  ])
})
