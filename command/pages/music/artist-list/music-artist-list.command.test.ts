import { expect, test } from "bun:test"
import { plain } from "akasha/code/running/modules/code-tests/code-tests.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Artists } from "akasha/command/pages/music/artist-list/music-artist-list.command.code.ts"
import {
  artistsOf,
  bare,
  musicArtistList,
  rowsOf,
  rungsOf,
  saidOf,
  statusSaid,
  wearingIn,
} from "akasha/command/pages/music/artist-list/music-artist-list.command.code.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import { indexThere } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { z } from "zod"

const ROOT = codeRoot()

const ARTISTS_SAID = z.looseObject({ artists: z.number() })

const GIVEN: Given = {
  root: ROOT,
  calledAs: "artist-list",
  from: ROOT,
  writer: null,
  agentId: null,
}

const ARTISTS = [
  {
    slug: "one",
    title: "One",
    status: "following",
    grade: "A",
    totalLength: 100,
    totalProgress: 70,
  },
  {
    slug: "two",
    title: "Two",
    status: "archived",
    grade: "C",
    totalLength: 10,
    totalProgress: 0,
  },
  { slug: "three", title: "Three" },
]

const RELEASES = [
  { slug: "a", partOfCollections: ["artist/one"], ownLength: 60, ownProgress: 30, grade: "B" },
  { slug: "b", partOfCollections: ["one"], ownLength: 40, ownProgress: 40 },
  { slug: "c", partOfCollections: ["artist/two"], ownLength: 10, ownProgress: 0 },
  { slug: "d", partOfCollections: ["artist/nobody"], ownLength: 99, ownProgress: 99 },
]

test("how far through an artist Alan is comes from that artist's own totals", () => {
  const one = rowsOf(ARTISTS, RELEASES, null).find((row) => row.slug === "one")
  expect(one?.releases).toBe(2)
  expect(one?.length).toBe(100)
  expect(one?.progress).toBe(70)
  expect(one?.graded).toBe(1)
})

test("a length a release states reaches no artist total", () => {
  const two = rowsOf(ARTISTS, RELEASES, null).find((row) => row.slug === "two")
  expect(two?.releases).toBe(1)
  expect(two?.length).toBe(10)
})

test("a release reaches its artist whether or not it names that artist's page type", () => {
  const one = rowsOf(ARTISTS, RELEASES, null).find((row) => row.slug === "one")
  expect(one?.releases).toBe(2)
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
    { grade: "A", artists: 1 },
    { grade: "C", artists: 1 },
    { grade: "none", artists: 1 },
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
        grade: null,
        releases: 0,
        length: 0,
        progress: 0,
        graded: 0,
      },
    ],
    rungs: [{ grade: "none", artists: 1 }],
    releases: 0,
    length: 0,
    progress: 0,
    graded: 0,
  })
  expect(lines.join("\n")).toContain("Three")
})

test("the json answer parses and counts the artists listed", () => {
  if (!indexThere(ROOT)) return
  const said = musicArtistList(["--json"], GIVEN)
  expect(said.code).toBe(0)
  const parsed = ARTISTS_SAID.parse(JSON.parse(said.report.join("\n")))
  expect(parsed.artists).toBeGreaterThan(0)
})

test("the totals are over the artists listed rather than over every artist", () => {
  if (!indexThere(ROOT)) return
  const all = artistsOf(ROOT, null)
  const following = artistsOf(ROOT, "following")
  expect(following.artists).toBeLessThanOrEqual(all.artists)
  expect(following.releases).toBeLessThanOrEqual(all.releases)
})

const ESCAPE = String.fromCharCode(27)

function sample(): Artists {
  const rows = rowsOf(ARTISTS, RELEASES, null)
  return {
    status: null,
    artists: rows.length,
    rows,
    rungs: rungsOf(rows),
    releases: 3,
    length: 110,
    progress: 70,
    graded: 1,
  }
}

test("a grade wearing no color is said with no escape", () => {
  expect(saidOf(sample()).join("\n")).not.toContain(ESCAPE)
  expect(saidOf(sample(), bare).join("\n")).not.toContain(ESCAPE)
})

test("a grade wears the color its rung is given, and the count beside it stays bare", () => {
  const worn = saidOf(sample(), (grade, said) => `<${grade}>${said}</${grade}>`)
  expect(worn.join("\n")).toContain("<A>A </A>")
  expect(worn.at(-1)).toBe("  <A>A</A> 1 · <C>C</C> 1 · none 1")
})

test("an artist on no rung wears no color", () => {
  const worn = saidOf(sample(), (grade, said) => `<${grade}>${said}</${grade}>`)
  expect(worn.join("\n")).toContain("  Three  -  ")
})

test("a grade wearing a color is the bare grade once the escapes are taken off", () => {
  if (!indexThere(ROOT)) return
  expect(saidOf(sample(), wearingIn(ROOT)).map(plain)).toEqual([...saidOf(sample())])
})

test("every rung the ladder states is given a color to wear", () => {
  if (!indexThere(ROOT)) return
  const wearing = wearingIn(ROOT)
  for (const rung of gradeProperty.values) expect(wearing(rung, rung)).not.toBe(rung)
})

test("the rungs sharing a letter share a color", () => {
  if (!indexThere(ROOT)) return
  const wearing = wearingIn(ROOT)
  expect(wearing("B-", "x")).toBe(wearing("B+", "x"))
  expect(wearing("A", "x")).not.toBe(wearing("B", "x"))
})

test("the json answer carries no color", () => {
  if (!indexThere(ROOT)) return
  expect(musicArtistList(["--json"], GIVEN).report.join("\n")).not.toContain(ESCAPE)
})
