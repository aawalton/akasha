import { expect, test } from "bun:test"
import {
  artistsIn,
  jsonOf,
  type Kept,
  keepingOver,
  type Reach,
  reconciledOver,
  rowsOf,
} from "akasha/command/pages/music/unheard-playlist/music-unheard-playlist.command.code.ts"

const LINK = "https://open.spotify.com/playlist/pl1"

const PICKED = [
  { trackId: "one", slug: "a", title: "Justice", artistSlug: "one-singer", releaseSlug: "r1" },
  { trackId: "two", slug: "b", title: "Ampersand", artistSlug: "two-singer", releaseSlug: "r2" },
  { trackId: "three", slug: "c", title: "Runaway", artistSlug: "one-singer", releaseSlug: "r1" },
]

function reachKept(wrote: string[]): Reach {
  return {
    heldTracks: async (playlistId) => {
      wrote.push(`read ${playlistId}`)
      return []
    },
    addTracks: async (playlistId, trackIds) => {
      wrote.push(`add ${playlistId} ${trackIds.join(",")}`)
      return trackIds.length
    },
    removeTracks: async (playlistId, trackIds) => {
      wrote.push(`remove ${playlistId} ${trackIds.join(",")}`)
      return trackIds.length
    },
  }
}

function keptOf(holding: readonly string[]): Kept {
  return { ...reconciledOver(PICKED, holding), link: LINK }
}

test("the artists counted are the artists the picked tracks are of", () => {
  expect(artistsIn(PICKED)).toBe(2)
  expect(artistsIn([])).toBe(0)
})

test("what the playlist gains and loses is worked out over the tracks picked", () => {
  const kept = keptOf(["two", "gone"])
  expect(kept.said).toEqual({
    adding: ["one", "three"],
    removing: ["gone"],
    keeping: ["two"],
  })
})

test("tracks leave the playlist before tracks reach it", async () => {
  const wrote: string[] = []
  const done = await keepingOver(keptOf(["two", "gone"]), "pl1", reachKept(wrote))
  expect(wrote).toEqual(["remove pl1 gone", "add pl1 one,three"])
  expect(done.added).toBe(2)
  expect(done.removed).toBe(1)
})

test("the rows count what was added, what was removed and what was kept", () => {
  const done: Kept = { ...keptOf(["two", "gone"]), added: 2, removed: 1 }
  expect(rowsOf(done)).toEqual([
    "tracks\t3",
    "artists\t2",
    "adding\t2",
    "removing\t1",
    "kept\t1",
    "added\t2",
    "removed\t1",
    `link\t${LINK}`,
  ])
})

test("a planning run counts what it would add and remove, and counts nothing done", () => {
  const kept = keptOf(["two", "gone"])
  const said = JSON.parse(jsonOf(kept))
  expect([said.adding, said.removing, said.kept]).toEqual([2, 1, 1])
  expect([said.added, said.removed]).toEqual([0, 0])
})

test("the answer names the playlist's link", () => {
  expect(JSON.parse(jsonOf(keptOf([]))).link).toBe(LINK)
})

test("the machine-facing answer names every track picked", () => {
  expect(JSON.parse(jsonOf(keptOf([]))).titles).toEqual([
    "one-singer — Justice",
    "two-singer — Ampersand",
    "one-singer — Runaway",
  ])
})
