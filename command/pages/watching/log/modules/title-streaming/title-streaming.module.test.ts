import { expect, test } from "bun:test"
import { crunchyroll } from "akasha/alan/collection/watching/streaming-service/pages/crunchyroll.streaming-service.ts"
import { hulu } from "akasha/alan/collection/watching/streaming-service/pages/hulu.streaming-service.ts"
import { netflix } from "akasha/alan/collection/watching/streaming-service/pages/netflix.streaming-service.ts"
import { streamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.ts"
import {
  streamedFor,
  streamedFrom,
} from "akasha/command/pages/watching/log/modules/title-streaming/title-streaming.module.code.ts"
import { servicesFrom } from "akasha/command/pages/watching/modules/service-relating/service-relating.module.code.ts"
import type { Calls } from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

const SERVICE = streamingService.slug

const KNOWN = servicesFrom([crunchyroll, hulu, netflix])

const TMDB_SHOW = { source: "tmdb", externalId: "1429", externalLink: "https://x/tv/1429" }

const PROVIDED = {
  results: {
    US: {
      flatrate: [{ provider_name: "Crunchyroll" }, { provider_name: "Hulu" }],
      rent: [{ provider_name: "Apple TV" }],
    },
  },
}

function callsAnswering(answer: unknown, asked: string[]): Calls {
  return {
    ask: () => Promise.resolve({ rows: [], n: 0, at: "a" }),
    write: () => Promise.resolve({ commit: "b", wrote: [], took: [] }),
    fetch: (url) => {
      asked.push(url)
      return Promise.resolve(Response.json(answer))
    },
  }
}

test("a title is given the services TMDB says stream it, and its id is synced that day", () => {
  const said = streamedFrom(PROVIDED, [TMDB_SHOW], [], "2026-10-28", KNOWN)
  expect(said.values).toEqual({
    externalIdentity: [{ ...TMDB_SHOW, lastSyncedAt: "2026-10-28" }],
    streamingOn: [`${SERVICE}/${crunchyroll.slug}`, `${SERVICE}/${hulu.slug}`],
  })
  expect(said.clears).toEqual([])
  expect(said.pages).toEqual([])
})

test("an ad tier and a channel of one service give that service once", () => {
  const tiers = {
    results: {
      US: {
        flatrate: [{ provider_name: "Netflix" }, { provider_name: "Crunchyroll Amazon Channel" }],
        ads: [{ provider_name: "Netflix Standard with Ads" }],
      },
    },
  }
  const said = streamedFrom(tiers, [], [], "2026-10-28", KNOWN)
  expect(said.values.streamingOn).toEqual([
    `${SERVICE}/${crunchyroll.slug}`,
    `${SERVICE}/${netflix.slug}`,
  ])
})

test("a name no service lists gets a page of its own, written with the title", () => {
  const unseen = { results: { US: { flatrate: [{ provider_name: "Brand New TV" }] } } }
  const said = streamedFrom(unseen, [], [], "2026-10-28", KNOWN)
  expect(said.values.streamingOn).toEqual([`${SERVICE}/brand-new-tv`])
  expect(said.pages.map((one) => [one.pageTypeSlug, one.slug, one.fresh])).toEqual([
    [SERVICE, "brand-new-tv", true],
  ])
})

test("a title already stating the services TMDB names is left as it is", () => {
  const synced = { ...TMDB_SHOW, lastSyncedAt: "2026-10-28" }
  const was = [`${SERVICE}/${crunchyroll.slug}`, `${SERVICE}/${hulu.slug}`]
  const said = streamedFrom(PROVIDED, [synced], was, "2026-10-28", KNOWN)
  expect(said).toEqual({ values: {}, clears: [], pages: [] })
})

test("a title TMDB names no service for has its services cleared", () => {
  const synced = { ...TMDB_SHOW, lastSyncedAt: "2026-10-28" }
  const said = streamedFrom({ results: {} }, [synced], ["Hulu"], "2026-10-28", KNOWN)
  expect(said).toEqual({ values: {}, clears: ["streamingOn"], pages: [] })
})

test("a film is asked of TMDB as a movie and a show as tv", async () => {
  const asked: string[] = []
  const calls = callsAnswering(PROVIDED, asked)
  await streamedFor("movie", [TMDB_SHOW], [], "2026-10-28", calls, "t")
  await streamedFor("show", [TMDB_SHOW], [], "2026-10-28", calls, "t")
  expect(asked.map((one) => one.replace(/^.*\/3/, ""))).toEqual([
    "/movie/1429/watch/providers",
    "/tv/1429/watch/providers",
  ])
})

test("a title TMDB answers nothing for, or stating no TMDB id, is left as it is", async () => {
  const asked: string[] = []
  const silent = await streamedFor(
    "show",
    [TMDB_SHOW],
    ["Hulu"],
    "d",
    callsAnswering(null, asked),
    "t"
  )
  expect(silent).toEqual({ values: {}, clears: [], pages: [] })
  const onNetflix = { source: "netflix", externalId: "1" }
  const unnamed = await streamedFor(
    "show",
    [onNetflix],
    [],
    "d",
    callsAnswering(PROVIDED, asked),
    "t"
  )
  expect(unnamed).toEqual({ values: {}, clears: [], pages: [] })
  expect(asked).toHaveLength(1)
})
