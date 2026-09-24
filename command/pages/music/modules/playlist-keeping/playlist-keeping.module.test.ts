import { expect, test } from "bun:test"
import {
  artistsIn,
  jsonOf,
  type Kept,
  keepingOver,
  noPlaylistAt,
  type Reach,
  reconciledOver,
  rowsOf,
} from "akasha/command/pages/music/modules/playlist-keeping/playlist-keeping.module.code.ts"
import { z } from "zod"

const KEPT_SAID = z.strictObject({
  tracks: z.number(),
  artists: z.number(),
  adding: z.number(),
  removing: z.number(),
  kept: z.number(),
  added: z.number(),
  removed: z.number(),
  ordered: z.number(),
  link: z.string(),
  titles: z.array(z.string()),
})

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
    putTracks: async (playlistId, trackIds) => {
      wrote.push(`put ${playlistId} ${trackIds.join(",")}`)
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

test("a run wanting no track empties the playlist", async () => {
  const wrote: string[] = []
  const done = await keepingOver(reconciledOver([], ["one", "two"]), "pl1", reachKept(wrote))
  expect(wrote).toEqual(["remove pl1 one,two", "add pl1 "])
  expect(done.removed).toBe(2)
})

test("tracks leave the playlist before tracks reach it", async () => {
  const wrote: string[] = []
  const done = await keepingOver(keptOf(["two", "gone"]), "pl1", reachKept(wrote))
  expect(wrote.slice(0, 2)).toEqual(["remove pl1 gone", "add pl1 one,three"])
  expect(done.added).toBe(2)
  expect(done.removed).toBe(1)
})

test("a run leaves the playlist in the order the picking gives", async () => {
  const wrote: string[] = []
  const done = await keepingOver(keptOf(["two", "gone"]), "pl1", reachKept(wrote))
  expect(wrote.at(-1)).toBe("put pl1 one,two,three")
  expect(done.ordered).toBe(3)
})

test("a playlist already in that order is written no second time", async () => {
  const wrote: string[] = []
  const done = await keepingOver(keptOf(["one", "two", "three"]), "pl1", reachKept(wrote))
  expect(wrote.some((one) => one.startsWith("put"))).toBe(false)
  expect(done.ordered).toBe(0)
})

test("the rows count what was added, what was removed and what was kept", () => {
  const done: Kept = { ...keptOf(["two", "gone"]), added: 2, removed: 1, ordered: 3 }
  expect(rowsOf(done)).toEqual([
    "tracks\t3",
    "artists\t2",
    "adding\t2",
    "removing\t1",
    "kept\t1",
    "added\t2",
    "removed\t1",
    "ordered\t3",
    `link\t${LINK}`,
  ])
})

test("a planning run counts what it would add and remove, and counts nothing done", () => {
  const kept = keptOf(["two", "gone"])
  const said = KEPT_SAID.parse(JSON.parse(jsonOf(kept)))
  expect([said.adding, said.removing, said.kept]).toEqual([2, 1, 1])
  expect([said.added, said.removed]).toEqual([0, 0])
})

test("the answer names the playlist's link", () => {
  expect(KEPT_SAID.parse(JSON.parse(jsonOf(keptOf([])))).link).toBe(LINK)
})

test("the machine-facing answer names every track picked", () => {
  expect(KEPT_SAID.parse(JSON.parse(jsonOf(keptOf([])))).titles).toEqual([
    "one-singer — Justice",
    "two-singer — Ampersand",
    "one-singer — Runaway",
  ])
})

test("a playlist page naming no spotify playlist is said of by its own slug", () => {
  expect(noPlaylistAt("ungraded")).toBe(
    "the `playlist/ungraded` page names no spotify playlist to keep up to date"
  )
})
