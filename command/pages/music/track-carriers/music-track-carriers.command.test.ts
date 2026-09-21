import { expect, test } from "bun:test"
import {
  carrierOf,
  carriesAlready,
  messageOf,
  rowsOf,
  valuesCarried,
} from "akasha/command/pages/music/track-carriers/music-track-carriers.command.code.ts"

const COUNTS = { tracks: 4059, filled: 4000, already: 12, skipped: 47 }

const CARRIER = "release/elf"

const TRACK = {
  slug: "elf-always-an-angel",
  partOfCollections: [CARRIER],
  discNumber: 1,
  position: 3,
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5CziXblfbYNLB4dELQrgq4",
      externalLink: "https://open.spotify.com/track/5CziXblfbYNLB4dELQrgq4",
      lastSyncedAt: "2026-09-16",
    },
  ],
}

test("a carrier is composed from what the track already states", () => {
  expect(carrierOf(TRACK)).toEqual({
    release: CARRIER,
    discNumber: 1,
    position: 3,
    externalId: "5CziXblfbYNLB4dELQrgq4",
    externalLink: "https://open.spotify.com/track/5CziXblfbYNLB4dELQrgq4",
  })
})

test("a track that is part of no release is given nothing", () => {
  expect(carrierOf({ ...TRACK, partOfCollections: ["song/always-an-angel"] })).toBe(null)
  expect(carrierOf({ ...TRACK, partOfCollections: [] })).toBe(null)
})

test("a track Spotify states no id for is given nothing", () => {
  expect(carrierOf({ ...TRACK, externalIdentity: [] })).toBe(null)
  expect(
    carrierOf({ ...TRACK, externalIdentity: [{ source: "musicbrainz", externalId: "abc" }] })
  ).toBe(null)
})

test("a track stating no disc and no position states neither on its carrier", () => {
  const was = { ...TRACK, discNumber: undefined, position: undefined }
  expect(carrierOf(was)).toEqual({
    release: CARRIER,
    externalId: "5CziXblfbYNLB4dELQrgq4",
    externalLink: "https://open.spotify.com/track/5CziXblfbYNLB4dELQrgq4",
  })
})

test("a track Spotify states no link for states no link on its carrier", () => {
  const was = { ...TRACK, externalIdentity: [{ source: "spotify", externalId: "abc" }] }
  expect(carrierOf(was)).toEqual({
    release: CARRIER,
    discNumber: 1,
    position: 3,
    externalId: "abc",
  })
})

test("a track that is part of a release among other collections names that release", () => {
  const was = { ...TRACK, partOfCollections: ["song/always-an-angel", CARRIER] }
  expect(carrierOf(was)?.release).toBe(CARRIER)
})

test("a track already carrying a release is read as carrying one", () => {
  expect(carriesAlready({ carriedBy: [{ release: CARRIER, externalId: "abc" }] })).toBe(true)
  expect(carriesAlready({ carriedBy: [] })).toBe(false)
  expect(carriesAlready({ carriedBy: CARRIER })).toBe(false)
  expect(carriesAlready(TRACK)).toBe(false)
})

test("a track filled in keeps everything that track already stated", () => {
  const carrier = { release: CARRIER, externalId: "abc" }
  expect(valuesCarried({ title: "Always an Angel", position: 3 }, carrier)).toEqual({
    title: "Always an Angel",
    position: 3,
    carriedBy: [carrier],
  })
})

test("the rows say every count the run made", () => {
  expect(rowsOf(COUNTS)).toEqual(["tracks\t4059", "filled\t4000", "already\t12", "skipped\t47"])
})

test("the message counts the tracks the run fills rather than the tracks it read", () => {
  expect(messageOf(COUNTS)).toBe("name the release carrying 4000 track(s)")
})
