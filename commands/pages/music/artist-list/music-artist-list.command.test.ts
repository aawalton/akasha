import { expect, test } from "bun:test"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  artistsOf,
  musicArtistList,
  rowsOf,
  rungsOf,
  saidOf,
  statusSaid,
} from "akasha/commands/pages/music/artist-list/music-artist-list.command.code.ts"
import { indexThere } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"

const ROOT = codeRoot()

const GIVEN: Given = {
  root: ROOT,
  calledAs: "artist-list",
  from: ROOT,
  writer: null,
  agentId: null,
}

const ARTISTS = [
  { slug: "one", title: "One", status: "following", rank: "A" },
  { slug: "two", title: "Two", status: "archived", rank: "C" },
  { slug: "three", title: "Three" },
]

const RELEASES = [
  { slug: "a", partOfCollections: ["one"], ownLength: 60, ownProgress: 30, rank: "B" },
  { slug: "b", partOfCollections: ["one"], ownLength: 40, ownProgress: 40 },
  { slug: "c", partOfCollections: ["two"], ownLength: 10, ownProgress: 0 },
  { slug: "d", partOfCollections: ["nobody"], ownLength: 99, ownProgress: 99 },
]

test("how far through an artist Alan is comes from the releases naming that artist", () => {
  const one = rowsOf(ARTISTS, RELEASES, null).find((row) => row.slug === "one")
  expect(one?.releases).toBe(2)
  expect(one?.length).toBe(100)
  expect(one?.progress).toBe(70)
  expect(one?.ranked).toBe(1)
})

test("an artist naming no release is listed, and adds to no total", () => {
  const three = rowsOf(ARTISTS, RELEASES, null).find((row) => row.slug === "three")
  expect(three).toBeDefined()
  expect(three?.releases).toBe(0)
  expect(three?.length).toBe(0)
})

test("a release naming an artist that is no page reaches no row", () => {
  const rows = rowsOf(ARTISTS, RELEASES, null)
  expect(rows.reduce((was, row) => was + row.releases, 0)).toBe(3)
})

test("a status asked for narrows the artists listed", () => {
  expect(rowsOf(ARTISTS, RELEASES, "following").map((row) => row.slug)).toEqual(["one"])
})

test("every artist is listed where no status is asked for", () => {
  expect(rowsOf(ARTISTS, RELEASES, null)).toHaveLength(3)
})

test("artists are listed by how long each one runs, longest first", () => {
  expect(rowsOf(ARTISTS, RELEASES, null).map((row) => row.slug)).toEqual(["one", "two", "three"])
})

test("the rungs counted are the rungs the artists listed reach", () => {
  expect(rungsOf(rowsOf(ARTISTS, RELEASES, null))).toEqual([
    { rank: "A", artists: 1 },
    { rank: "C", artists: 1 },
    { rank: "none", artists: 1 },
  ])
})

test("a status no collection states is read as none", () => {
  expect(statusSaid("following")).toBe("following")
  expect(statusSaid("sideways")).toBeNull()
})

test("a status no collection states is refused", () => {
  const said = musicArtistList(["--status", "sideways"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("`sideways` is none of them")
})

test("an artist listed with no release is said with no share", () => {
  const lines = saidOf({
    status: null,
    artists: 1,
    rows: [
      {
        slug: "three",
        title: "Three",
        status: null,
        rank: null,
        releases: 0,
        length: 0,
        progress: 0,
        ranked: 0,
      },
    ],
    rungs: [{ rank: "none", artists: 1 }],
    releases: 0,
    length: 0,
    progress: 0,
    ranked: 0,
  })
  expect(lines.join("\n")).toContain("Three")
})

test("the json answer parses and counts the artists listed", () => {
  if (!indexThere(ROOT)) return
  const said = musicArtistList(["--json"], GIVEN)
  expect(said.code).toBe(0)
  const parsed = JSON.parse(said.report.join("\n")) as { readonly artists: number }
  expect(parsed.artists).toBeGreaterThan(0)
})

test("the totals are over the artists listed rather than over every artist", () => {
  if (!indexThere(ROOT)) return
  const all = artistsOf(ROOT, null)
  const following = artistsOf(ROOT, "following")
  expect(following.artists).toBeLessThanOrEqual(all.artists)
  expect(following.releases).toBeLessThanOrEqual(all.releases)
})
