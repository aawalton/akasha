import { expect, test } from "bun:test"
import {
  artistsIn,
  describedFor,
  jsonOf,
  type Made,
  makingOver,
  namedFor,
  type Reach,
  rowsOf,
} from "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.code.ts"

const PICKED = [
  { trackId: "one", slug: "a", title: "Justice", artistSlug: "one-singer", releaseSlug: "r1" },
  { trackId: "two", slug: "b", title: "Ampersand", artistSlug: "two-singer", releaseSlug: "r2" },
  { trackId: "three", slug: "c", title: "Runaway", artistSlug: "one-singer", releaseSlug: "r1" },
]

const PLAYLIST = {
  id: "pl1",
  name: "Unheard 2026-09-21",
  external_urls: { spotify: "https://open.spotify.com/playlist/pl1" },
}

function reachMade(wrote: string[]): Reach {
  return {
    getMe: async () => {
      wrote.push("me")
      return { id: "alan", display_name: "Alan" }
    },
    createPlaylist: async (userId, making) => {
      wrote.push(`create ${userId} ${making.name}`)
      return PLAYLIST
    },
    addTracks: async (playlistId, trackIds) => {
      wrote.push(`add ${playlistId} ${trackIds.join(",")}`)
      return trackIds.length
    },
  }
}

test("the artists counted are the artists the picked tracks are of", () => {
  expect(artistsIn(PICKED)).toBe(2)
  expect(artistsIn([])).toBe(0)
})

test("the playlist is named for the day it was made", () => {
  expect(namedFor("2026-09-21")).toBe("Unheard 2026-09-21")
})

test("the description counts the tracks and the artists", () => {
  expect(describedFor(PICKED)).toBe("3 track(s) from 2 artist(s) Alan follows and has not heard.")
})

test("the playlist is made under Alan's own account and filled in the order picked", async () => {
  const wrote: string[] = []
  const made = await makingOver(PICKED, "2026-09-21", reachMade(wrote))
  expect(wrote).toEqual(["me", "create alan Unheard 2026-09-21", "add pl1 one,two,three"])
  expect(made.added).toBe(3)
  expect(made.playlist).toEqual(PLAYLIST)
})

test("the rows name the playlist's link once one was made", () => {
  const made: Made = { picked: PICKED, artists: 2, playlist: PLAYLIST, added: 3 }
  expect(rowsOf(made)).toEqual([
    "tracks\t3",
    "artists\t2",
    "added\t3",
    "link\thttps://open.spotify.com/playlist/pl1",
  ])
})

test("a planned run names no link", () => {
  const held: Made = { picked: PICKED, artists: 2, playlist: null, added: 0 }
  expect(rowsOf(held)).toEqual(["tracks\t3", "artists\t2", "added\t0"])
  expect(JSON.parse(jsonOf(held)).link).toBe(null)
})

test("the machine-facing answer names every track picked", () => {
  const held: Made = { picked: PICKED, artists: 2, playlist: null, added: 0 }
  expect(JSON.parse(jsonOf(held)).titles).toEqual([
    "one-singer — Justice",
    "two-singer — Ampersand",
    "one-singer — Runaway",
  ])
})
