import { expect, test } from "bun:test"
import type { SearchParams, SearchResponse } from "@akasha/spotify/search"
import { searchResponseSchema } from "@akasha/spotify/search"
import type { Finding } from "./music-search.command.code.ts"
import { searchWith, toldIn } from "./music-search.command.code.ts"

const TOTAL = 2

const WIDE = 10

const NARROW = 3

type Track = {
  readonly id: string
  readonly name: string
  readonly uri: string
  readonly artists: readonly { readonly name: string }[]
  readonly album: { readonly name: string }
}

const ONE: Track = {
  id: "one",
  name: "Bulletproof",
  uri: "spotify:track:one",
  artists: [{ name: "Em Beihold" }],
  album: { name: "Egg in the Backseat" },
}

const TWO: Track = {
  id: "two",
  name: "Motion Sickness",
  uri: "spotify:track:two",
  artists: [{ name: "Phoebe Bridgers" }],
  album: { name: "Stranger in the Alps" },
}

function responseOf(tracks: readonly Track[]): SearchResponse {
  const page = { items: tracks, total: TOTAL, limit: WIDE, offset: 0, next: null, previous: null }
  return searchResponseSchema.parse({ tracks: page })
}

function findingOf(tracks: readonly Track[], asked: SearchParams[]): Finding {
  return (params: SearchParams) => {
    asked.push(params)
    return Promise.resolve(responseOf(tracks))
  }
}

test("a call naming no query is refused", async () => {
  const said = await searchWith(findingOf([], []), ["--json"])
  expect(said.code).toBe(1)
  expect(said.refusals).toEqual(["supply a track query to search for"])
})

test("a limit that is no whole count is refused", async () => {
  const said = await searchWith(findingOf([], []), ["Bulletproof", "--limit", "half"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--limit must be a non-negative integer, got: half")
})

test("anything the command does not take refuses the call", async () => {
  const said = await searchWith(findingOf([], []), ["Bulletproof", "--pretty"])
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--pretty")
})

test("the human report names each candidate over two lines", async () => {
  const said = await searchWith(findingOf([ONE, TWO], []), ["Bulletproof"])
  expect(said.code).toBe(0)
  expect(said.report).toEqual([
    'Search "Bulletproof" — 2 candidate(s):',
    "  1. Bulletproof — Em Beihold · Egg in the Backseat",
    "     spotify:track:one",
    "  2. Motion Sickness — Phoebe Bridgers · Stranger in the Alps",
    "     spotify:track:two",
  ])
})

test("no candidate is reported as none", async () => {
  const said = await searchWith(findingOf([], []), ["Bulletproof"])
  expect(said.report).toEqual(['Search "Bulletproof" — 0 candidate(s):', "  (none)"])
})

test("--json gives the envelope on one line", async () => {
  const said = await searchWith(findingOf([ONE], []), ["Bulletproof", "--json"])
  expect(said.code).toBe(0)
  const read = JSON.parse(said.report[0] as string)
  expect(read.query).toBe("Bulletproof")
  expect(read.artist).toBe(null)
  expect(read.candidates).toEqual([
    {
      trackName: "Bulletproof",
      artists: ["Em Beihold"],
      album: "Egg in the Backseat",
      uri: "spotify:track:one",
      id: "one",
    },
  ])
})

test("an artist named keeps only that artist and widens the fetch", async () => {
  const asked: SearchParams[] = []
  const said = await searchWith(findingOf([ONE, TWO], asked), [
    "Bulletproof",
    "--artist",
    "beihold",
    "--limit",
    "1",
  ])
  expect(asked[0]?.limit).toBe(WIDE)
  expect(said.report[0]).toBe('Search "Bulletproof" (artist: beihold) — 1 candidate(s):')
})

test("no artist named fetches no more than the limit asked for", async () => {
  const asked: SearchParams[] = []
  await searchWith(findingOf([ONE], asked), ["Bulletproof", "--limit", "3"])
  expect(asked[0]?.limit).toBe(NARROW)
})

test("--top is another spelling of --limit", () => {
  expect(toldIn(["Bulletproof", "--top", "3"])).toEqual({
    query: "Bulletproof",
    artist: undefined,
    limitSaid: "3",
    json: false,
  })
  expect(toldIn(["Bulletproof", "--limit=3"])).toEqual({
    query: "Bulletproof",
    artist: undefined,
    limitSaid: "3",
    json: false,
  })
})

test("a flag said with nothing after it is refused", () => {
  expect(toldIn(["Bulletproof", "--artist"])).toBe("`--artist` was said with nothing after it")
})

test("what follows a bare -- is a positional", () => {
  expect(toldIn(["--", "--artist"])).toEqual({
    query: "--artist",
    artist: undefined,
    limitSaid: undefined,
    json: false,
  })
})
