import { expect, test } from "bun:test"
import {
  playingNamed,
  slugCarried,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.code.ts"
import {
  finding,
  PLAYING_ID,
  PLAYING_TITLE,
  playing,
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

test("a track is found by any of the ids its carriers hold", () => {
  const tracks = [
    { slug: "one", carriedBy: [{ externalId: "aaa" }] },
    { slug: "two", carriedBy: [{ externalId: "bbb" }, { externalId: PLAYING_ID }] },
  ]
  expect(slugCarried(tracks, PLAYING_ID)).toBe("two")
  expect(slugCarried(tracks, "ccc")).toBe(null)
})
