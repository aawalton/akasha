import { expect, test } from "bun:test"
import type {
  SearchParams,
  SearchResponse,
} from "akasha/alan/music/spotify/search/spotify-search.module.code.ts"
import { searchResponseSchema } from "akasha/alan/music/spotify/search/spotify-search.module.code.ts"
import type { Finding } from "akasha/commands/pages/music/search/music-search.command.code.ts"
import { searchWith } from "akasha/commands/pages/music/search/music-search.command.code.ts"

const CALLED = "akasha music search"

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
  const said = await searchWith(findingOf([], []), ["--json"], CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([`\`${CALLED}\` takes \`<query>\`, and nothing said it`])
})

test("a query said as nothing at all is refused", async () => {
  const said = await searchWith(findingOf([], []), [""], CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals).toEqual([
    `\`${CALLED}\` takes \`<query>\`, and an empty word names none`,
    `\`${CALLED}\` takes \`<query>\`, and nothing said it`,
  ])
})

test("a limit that is no whole count is refused", async () => {
  const said = await searchWith(findingOf([], []), ["Bulletproof", "--limit", "half"], CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toBe("`--limit half` is no whole number of nought or more")
})

test("a flag joined to its value by an equals sign is read", async () => {
  const asked: SearchParams[] = []
  await searchWith(findingOf([ONE], asked), ["Bulletproof", "--limit=3"], CALLED)
  expect(asked[0]?.limit).toBe(NARROW)
})

test("anything the command does not take refuses the call", async () => {
  const said = await searchWith(findingOf([], []), ["Bulletproof", "--pretty"], CALLED)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("--pretty")
})

test("the human report names each candidate over two lines", async () => {
  const said = await searchWith(findingOf([ONE, TWO], []), ["Bulletproof"], CALLED)
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
  const said = await searchWith(findingOf([], []), ["Bulletproof"], CALLED)
  expect(said.report).toEqual(['Search "Bulletproof" — 0 candidate(s):', "  (none)"])
})

test("--json gives the envelope on one line", async () => {
  const said = await searchWith(findingOf([ONE], []), ["Bulletproof", "--json"], CALLED)
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
  const said = await searchWith(
    findingOf([ONE, TWO], asked),
    ["Bulletproof", "--artist", "beihold", "--limit", "1"],
    CALLED
  )
  expect(asked[0]?.limit).toBe(WIDE)
  expect(said.report[0]).toBe('Search "Bulletproof" (artist: beihold) — 1 candidate(s):')
})

test("no artist named fetches no more than the limit asked for", async () => {
  const asked: SearchParams[] = []
  await searchWith(findingOf([ONE], asked), ["Bulletproof", "--limit", "3"], CALLED)
  expect(asked[0]?.limit).toBe(NARROW)
})
