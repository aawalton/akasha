import { expect, test } from "bun:test"
import {
  streamedFor,
  streamedFrom,
} from "akasha/command/pages/watching/log/modules/title-streaming/title-streaming.module.code.ts"
import type { Calls } from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"

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
  const said = streamedFrom(PROVIDED, [TMDB_SHOW], [], "2026-10-28")
  expect(said.values).toEqual({
    externalIdentity: [{ ...TMDB_SHOW, lastSyncedAt: "2026-10-28" }],
    streamingOn: ["Crunchyroll", "Hulu"],
  })
  expect(said.clears).toEqual([])
})

test("a title TMDB names no service for has its services cleared", () => {
  const synced = { ...TMDB_SHOW, lastSyncedAt: "2026-10-28" }
  const said = streamedFrom({ results: {} }, [synced], ["Hulu"], "2026-10-28")
  expect(said).toEqual({ values: {}, clears: ["streamingOn"] })
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
  expect(silent).toEqual({ values: {}, clears: [] })
  const netflix = { source: "netflix", externalId: "1" }
  const unnamed = await streamedFor(
    "show",
    [netflix],
    [],
    "d",
    callsAnswering(PROVIDED, asked),
    "t"
  )
  expect(unnamed).toEqual({ values: {}, clears: [] })
  expect(asked).toHaveLength(1)
})
