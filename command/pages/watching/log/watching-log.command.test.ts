import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  freshValues,
  watchingLog,
} from "akasha/command/pages/watching/log/watching-log.command.code.ts"
import {
  knownFromPrime,
  knownFromTmdb,
  knownFromWikidata,
  linkedBy,
  slugOf,
} from "akasha/command/pages/watching/modules/title-knowing/title-knowing.module.code.ts"
import type { Calls } from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import type { Query } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Writing } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha watching log",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const NETFLIX = {
  source: "netflix",
  externalId: "81712068",
  externalLink: "https://www.netflix.com/title/81712068",
} as const

function wikidataSaying(binding: Readonly<Record<string, string>>): unknown {
  const said = Object.fromEntries(Object.entries(binding).map(([key, value]) => [key, { value }]))
  return { results: { bindings: [said] } }
}

type Fake = { readonly calls: Calls; readonly written: Writing[] }

function fakeOf(
  rows: Readonly<Record<string, readonly Record<string, unknown>[]>>,
  answer: unknown
): Fake {
  const written: Writing[] = []
  const calls: Calls = {
    ask: (query: Query) =>
      Promise.resolve({ rows: rows[query.pageTypeSlug] ?? [], n: 0, at: "abc" }),
    write: (asked) => {
      written.push(asked)
      return Promise.resolve({ commit: "def", wrote: [], took: [] })
    },
    fetch: () => Promise.resolve(Response.json(answer)),
  }
  return { calls, written }
}

test("a Netflix browse link and a Netflix title link read as the same title", () => {
  expect(linkedBy("https://www.netflix.com/browse?jbv=81712068")).toEqual(NETFLIX)
  expect(linkedBy("https://www.netflix.com/title/81712068")).toEqual(NETFLIX)
})

test("a Prime Video link reads as the id at the end of its detail path", () => {
  const said = linkedBy(
    "https://www.primevideo.com/region/na/detail/0OHZJ90LNM4KVKJXM4K15HDQJR?jic=8&ref_=atv"
  )
  expect(said).toEqual({
    source: "prime-video",
    externalId: "0OHZJ90LNM4KVKJXM4K15HDQJR",
    externalLink: "https://www.primevideo.com/detail/0OHZJ90LNM4KVKJXM4K15HDQJR",
  })
})

test("a TMDB link reads as a film or a show by its path, slugged or not", () => {
  const film = {
    source: "tmdb",
    externalId: "657018",
    externalLink: "https://www.themoviedb.org/movie/657018",
    kind: "movie",
  } as const
  expect(linkedBy("https://www.themoviedb.org/movie/657018")).toEqual(film)
  expect(linkedBy("https://www.themoviedb.org/movie/657018-a-beautiful-place?language=en")).toEqual(
    film
  )
  expect(linkedBy("https://www.themoviedb.org/tv/220542-the-apothecary-diaries")).toEqual({
    source: "tmdb",
    externalId: "220542",
    externalLink: "https://www.themoviedb.org/tv/220542",
    kind: "show",
  })
  expect(linkedBy("https://www.themoviedb.org/person/1")).toContain("TMDB link naming no title")
})

test("a link to no provider read here is refused", () => {
  expect(linkedBy("https://example.com/title/1")).toContain("none of Netflix, Prime Video and TMDB")
  expect(linkedBy("nothing")).toContain("is no link")
})

test("a title is slugged in lowercase kebab", () => {
  expect(slugOf("Cosmic Princess Kaguya!")).toBe("cosmic-princess-kaguya")
  expect(slugOf("SHIBOYUGI: Playing Death Games")).toBe("shiboyugi-playing-death-games")
})

test("a Wikidata series reads as a show from the day it started, with its TMDB id", () => {
  const said = wikidataSaying({
    label: "The Apothecary Diaries",
    film: "false",
    series: "true",
    started: "2023-10-22T00:00:00Z",
    tmdb: "220542",
  })
  expect(knownFromWikidata(said)).toEqual({
    kind: "show",
    title: "The Apothecary Diaries",
    publishedAt: "2023-10-22",
    minutes: null,
    tmdbId: "220542",
  })
})

test("a Wikidata film reads as a movie with the minutes it runs", () => {
  const said = wikidataSaying({
    label: "Cosmic Princess Kaguya!",
    film: "true",
    series: "false",
    published: "2026-01-22T00:00:00Z",
    minutes: "142",
  })
  expect(knownFromWikidata(said)?.kind).toBe("movie")
  expect(knownFromWikidata(said)?.minutes).toBe(142)
})

test("a Wikidata answer that is neither film nor series reads as nothing known", () => {
  expect(knownFromWikidata(wikidataSaying({ label: "A", film: "false", series: "false" }))).toBe(
    null
  )
  expect(knownFromWikidata({ results: { bindings: [] } })).toBe(null)
})

test("a Prime Video page naming a season reads as a show", () => {
  const known = knownFromPrime("<title>Prime Video: Young Sherlock - Season 1</title>")
  expect(known).toEqual({
    kind: "show",
    title: "Young Sherlock",
    publishedAt: null,
    minutes: null,
    tmdbId: null,
  })
})

test("a TMDB film reads as a movie with its minutes, and a TMDB show with its id", () => {
  const film = {
    id: 657018,
    title: "A Beautiful Place to Die",
    release_date: "2020-01-12",
    runtime: 85,
  }
  expect(knownFromTmdb("movie", film)).toEqual({
    kind: "movie",
    title: "A Beautiful Place to Die",
    publishedAt: "2020-01-12",
    minutes: 85,
    tmdbId: null,
  })
  const shown = { id: 220542, name: "The Apothecary Diaries", first_air_date: "2023-10-22" }
  expect(knownFromTmdb("show", shown)).toEqual({
    kind: "show",
    title: "The Apothecary Diaries",
    publishedAt: "2023-10-22",
    minutes: null,
    tmdbId: "220542",
  })
  expect(knownFromTmdb("movie", null)).toBe(null)
})

test("a completed movie states its whole length as watched", () => {
  const known = { kind: "movie", title: "A", publishedAt: null, minutes: 90, tmdbId: null } as const
  const values = freshValues(known, NETFLIX, "completed", "2026-10-13")
  expect(values.ownProgress).toBe(90)
  expect(values.completedAt).toBe("2026-10-13")
})

test("a status that is no status is refused before anything is asked", async () => {
  const fake = fakeOf({}, {})
  const said = await watchingLog(
    ["--link", NETFLIX.externalLink, "--status", "watched"],
    GIVEN,
    fake.calls
  )
  expect(said.refusals[0]).toContain("`watched` is no status")
  expect(fake.written).toHaveLength(0)
})

test("a call saying both a status and an episode is refused", async () => {
  const fake = fakeOf({}, {})
  const said = await watchingLog(
    ["--link", NETFLIX.externalLink, "--status", "completed", "--episode"],
    GIVEN,
    fake.calls
  )
  expect(said.refusals.length).toBeGreaterThan(0)
  expect(fake.written).toHaveLength(0)
})

test("a film is refused an episode", async () => {
  const row = { slug: "a", title: "A", status: "completed", externalIdentity: [NETFLIX] }
  const fake = fakeOf({ movie: [row] }, null)
  const said = await watchingLog(["--link", NETFLIX.externalLink, "--episode"], GIVEN, fake.calls)
  expect(said.refusals[0]).toContain("a film has no episodes")
  expect(fake.written).toHaveLength(0)
})

test("a title no page holds is written as a fresh page", async () => {
  const answer = wikidataSaying({ label: "The Apothecary Diaries", film: "false", series: "true" })
  const fake = fakeOf({}, answer)
  const said = await watchingLog(["--link", NETFLIX.externalLink], GIVEN, fake.calls)
  expect(said.report).toEqual(["show/the-apothecary-diaries  in-progress  created"])
  expect(fake.written[0]?.pages?.[0]?.fresh).toBe(true)
})

test("a page stating the id is logged without a lookup", async () => {
  const row = {
    slug: "the-apothecary-diaries",
    title: "The Apothecary Diaries",
    status: "in-progress",
    externalIdentity: [NETFLIX],
  }
  const fake = fakeOf({ show: [row] }, null)
  const said = await watchingLog(
    ["--link", NETFLIX.externalLink, "--status", "completed", "--day", "2026-10-14"],
    GIVEN,
    fake.calls
  )
  expect(said.report).toEqual(["show/the-apothecary-diaries  completed  updated"])
  expect(fake.written[0]?.pages?.[0]?.values).toEqual({
    status: "completed",
    completedAt: "2026-10-14",
  })
})

test("a page already completed is left as it is", async () => {
  const row = { slug: "a", title: "A", status: "completed", externalIdentity: [NETFLIX] }
  const fake = fakeOf({ show: [row] }, null)
  const said = await watchingLog(["--link", NETFLIX.externalLink], GIVEN, fake.calls)
  expect(said.report).toEqual(["show/a  completed  unchanged"])
  expect(fake.written).toHaveLength(0)
})

test("a page found by title is given the provider's id", async () => {
  const row = { slug: "the-apothecary-diaries", title: "The Apothecary Diaries", status: "paused" }
  const answer = wikidataSaying({ label: "The Apothecary Diaries", film: "false", series: "true" })
  const fake = fakeOf({ show: [row] }, answer)
  await watchingLog(["--link", NETFLIX.externalLink], GIVEN, fake.calls)
  expect(fake.written[0]?.pages?.[0]?.values).toEqual({
    status: "in-progress",
    externalIdentity: [NETFLIX],
  })
})

const HALLMARK = {
  source: "tmdb",
  externalId: "657018",
  externalLink: "https://www.themoviedb.org/movie/657018",
} as const

test("a TMDB film link logs the film page stating that TMDB id", async () => {
  const row = { slug: "a", title: "A", status: "not-started", externalIdentity: [HALLMARK] }
  const fake = fakeOf({ movie: [row] }, null)
  const said = await watchingLog(
    ["--link", "https://www.themoviedb.org/movie/657018-a", "--status", "completed"],
    GIVEN,
    fake.calls
  )
  expect(said.report[0]).toBe("movie/a  completed  updated")
  expect(fake.written[0]?.pages?.[0]?.slug).toBe("a")
})

test("a TMDB show link does not reach a film stating the same number", async () => {
  const row = { slug: "a", title: "A", status: "not-started", externalIdentity: [HALLMARK] }
  const fake = fakeOf({ movie: [row] }, null)
  const said = await watchingLog(
    ["--link", "https://www.themoviedb.org/tv/657018", "--status", "completed"],
    GIVEN,
    fake.calls
  )
  expect(fake.written).toHaveLength(0)
  expect(said.refusals.length).toBeGreaterThan(0)
})
