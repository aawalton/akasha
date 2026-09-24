import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { alexandria } from "akasha/alan/music/catalog/artist/pages/alexandria/alexandria.artist.ts"
import {
  creditsOver,
  restatedIn,
  runChange,
} from "akasha/change/agent/file-content/point-track-credits-at-artists/point-track-credits-at-artists.change-agent.code.ts"
import { worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"

const ALEXANDRIA_AT = `${artist.slug}/${alexandria.slug}` as const

const ARTISTS: ReadonlyMap<string, string> = new Map([["sp-alexandria", alexandria.slug]])

const TRACK_AT = "held/pixie.track.ts"

const BODY = `export const pixie = {
  slug: "pixie",
  trackArtist: [{ externalId: "sp-alexandria", artistName: "Alexandria" }],
  trackKey: "pixie|sp-alexandria|1",
} as const
`

test("a credit stating a Spotify id an artist page states names that page instead", () => {
  const held = [{ externalId: "sp-alexandria", artistName: "Alexandria" }]
  expect(creditsOver(ARTISTS, held)).toEqual([{ artist: ALEXANDRIA_AT }])
})

test("a credit no artist page answers keeps the name Spotify credits and loses its id", () => {
  const held = [{ externalId: "sp-guest", artistName: "A Guest" }]
  expect(creditsOver(ARTISTS, held)).toEqual([{ artistName: "A Guest" }])
})

test("the credits stay in the order the track states them", () => {
  const held = [
    { externalId: "sp-guest", artistName: "A Guest" },
    { externalId: "sp-alexandria", artistName: "Alexandria" },
  ]
  expect(creditsOver(ARTISTS, held)).toEqual([{ artistName: "A Guest" }, { artist: ALEXANDRIA_AT }])
})

test("a track whose credits would stay as they are is left unwritten", () => {
  expect(creditsOver(ARTISTS, [{ artist: ALEXANDRIA_AT }, { artistName: "A Guest" }])).toBeNull()
})

test("a credit naming an artist page already keeps that page and nothing else", () => {
  const held = [{ artist: ALEXANDRIA_AT, artistName: "Alexandria" }]
  expect(creditsOver(ARTISTS, held)).toEqual([{ artist: ALEXANDRIA_AT }])
})

test("one edit restates the credits a track states and nothing else", () => {
  const said = restatedIn(TRACK_AT, BODY, [{ artist: ALEXANDRIA_AT }])
  expect(said).toEqual({
    old: `trackArtist: [{ externalId: "sp-alexandria", artistName: "Alexandria" }]`,
    new: `trackArtist: [{ artist: "${ALEXANDRIA_AT}" }]`,
  })
})

test("a page stating no credit is given no passage", () => {
  expect(
    restatedIn(TRACK_AT, `export const pixie = {\n  slug: "pixie",\n} as const\n`, [])
  ).toBeNull()
})

test("a key this change takes nothing of is refused", async () => {
  const said = await runChange(worldOf({}), { "page-type": "track" })
  expect(said.refused ?? "").toContain("page-type")
})
