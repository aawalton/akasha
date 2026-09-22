import { expect, test } from "bun:test"
import {
  justPlayedNamed,
  playingNamed,
  slugCarried,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.code.ts"
import {
  finding,
  itemsOf,
  PLAYING_ID,
  PLAYING_TITLE,
  playing,
  SUN_ID,
  SUN_TITLE,
  TRACK_SLUG,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.test-fixtures.ts"

test("the track playing is the one whose carrier holds the id Spotify says", () => {
  expect(playingNamed(finding, playing(PLAYING_ID, PLAYING_TITLE))).toBe(TRACK_SLUG)
})

test("no active device refuses rather than naming a track", () => {
  expect(playingNamed(finding, { activeDevice: false, track: null })).toEqual({
    refused: "no Spotify device is active, so nothing is playing for `--now-playing` to grade",
  })
})

test("a device holding no track refuses rather than naming a track", () => {
  expect(playingNamed(finding, playing(null, PLAYING_TITLE))).toEqual({
    refused: "Spotify names no track playing, so nothing is there for `--now-playing` to grade",
  })
})

test("a playing track no page carries is refused with its Spotify id and its title", () => {
  expect(playingNamed(finding, playing("0000000000000000000000", "Nowhere"))).toEqual({
    refused:
      "no track page carries the Spotify id `0000000000000000000000`, which Spotify is playing as `Nowhere`",
  })
})

test("a track held rather than played is named the same way", () => {
  expect(playingNamed(finding, playing(PLAYING_ID, PLAYING_TITLE, false))).toBe(TRACK_SLUG)
})

test("where nothing plays, the track played last is the first among those played recently", () => {
  const found = justPlayedNamed(
    finding,
    itemsOf([
      { id: PLAYING_ID, name: PLAYING_TITLE },
      { id: "0000000000000000000000", name: "Nowhere" },
    ]),
    null
  )
  expect(found).toBe(TRACK_SLUG)
})

test("what is playing is skipped where Spotify names it among the tracks played recently", () => {
  const found = justPlayedNamed(
    finding,
    itemsOf([
      { id: SUN_ID, name: SUN_TITLE },
      { id: PLAYING_ID, name: PLAYING_TITLE },
    ]),
    SUN_ID
  )
  expect(found).toBe(TRACK_SLUG)
})

test("a history holding only what is playing refuses rather than naming a track", () => {
  expect(justPlayedNamed(finding, itemsOf([{ id: SUN_ID, name: SUN_TITLE }]), SUN_ID)).toEqual({
    refused: "Spotify names no track played last, so nothing is there for `--just-played` to grade",
  })
})

test("nothing played recently refuses rather than naming a track", () => {
  expect(justPlayedNamed(finding, itemsOf([]), null)).toEqual({
    refused: "Spotify names no track played last, so nothing is there for `--just-played` to grade",
  })
})

test("a track played last no page carries is refused with its Spotify id and its title", () => {
  const found = justPlayedNamed(
    finding,
    itemsOf([{ id: "0000000000000000000000", name: "Nowhere" }]),
    null
  )
  expect(found).toEqual({
    refused:
      "no track page carries the Spotify id `0000000000000000000000`, which Spotify played last as `Nowhere`",
  })
})

test("a track is found by any of the ids its carriers hold", () => {
  const tracks = [
    { slug: "one", carriedBy: [{ externalId: "aaa" }] },
    { slug: "two", carriedBy: [{ externalId: "bbb" }, { externalId: PLAYING_ID }] },
  ]
  expect(slugCarried(tracks, PLAYING_ID)).toBe("two")
  expect(slugCarried(tracks, "ccc")).toBe(null)
})
