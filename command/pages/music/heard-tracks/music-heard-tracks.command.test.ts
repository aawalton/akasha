import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import {
  heardBy,
  keysHeardOver,
  messageOf,
  releaseOf,
  rowsOf,
  valuesHeard,
} from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"

const ARTIST_AT = `${artist.slug}/${sylviaDaley.slug}` as const

const FINISHED: ReadonlySet<string> = new Set(["sylvia-daley-pixie"])

const HEARD: ReadonlySet<string> = new Set(["5CziXblfbYNLB4dELQrgq4"])

const ON_PIXIE = { partOfCollections: ["release/sylvia-daley-pixie"] }

const ON_ELF = { partOfCollections: ["release/sylvia-daley-elf"] }

const COUNTS = {
  tracks: 9,
  heard: 6,
  byRelease: 3,
  byListening: 2,
  bySibling: 1,
  already: 1,
  unheard: 3,
}

function carriedWith(
  releaseSlug: string,
  ...ids: readonly string[]
): { readonly carriedBy: readonly unknown[] } {
  return { carriedBy: ids.map((one) => ({ release: `release/${releaseSlug}`, externalId: one })) }
}

function spotifyId(said: string): { readonly carriedBy: readonly unknown[] } {
  return carriedWith("sylvia-daley-elf", said)
}

test("a track names the release carrying it", () => {
  expect(releaseOf(ON_PIXIE)).toBe("sylvia-daley-pixie")
})

test("a track carried by no release names none", () => {
  expect(releaseOf({})).toBeNull()
  expect(releaseOf({ partOfCollections: [ARTIST_AT] })).toBeNull()
})

test("a track on a release Alan finished is a track Alan heard", () => {
  expect(heardBy(ON_PIXIE, FINISHED, HEARD)).toBe("release")
})

test("a track the heard music page names is a track Alan heard", () => {
  expect(heardBy({ ...ON_ELF, ...spotifyId("5CziXblfbYNLB4dELQrgq4") }, FINISHED, HEARD)).toBe(
    "listening"
  )
})

test("a track the listening names under any release carrying it is a track Alan heard", () => {
  const value = {
    ...ON_ELF,
    carriedBy: [
      ...carriedWith("sylvia-daley-elf", "0000000000000000000000").carriedBy,
      ...carriedWith("sylvia-daley-pixie", "5CziXblfbYNLB4dELQrgq4").carriedBy,
    ],
  }
  expect(heardBy(value, new Set(), HEARD)).toBe("listening")
})

test("a track on an unfinished release the listening never named is unheard", () => {
  expect(heardBy({ ...ON_ELF, ...spotifyId("0000000000000000000000") }, FINISHED, HEARD)).toBeNull()
})

test("a track of no spotify id on an unfinished release is unheard", () => {
  expect(heardBy(ON_ELF, FINISHED, HEARD)).toBeNull()
})

test("the release Alan finished settles a track the listening never named", () => {
  expect(heardBy({ ...ON_PIXIE, ...spotifyId("0000000000000000000000") }, FINISHED, HEARD)).toBe(
    "release"
  )
})

test("a track Alan heard runs its whole length", () => {
  expect(valuesHeard({ ownLength: 3.5, ownProgress: 0, status: "not-started" })).toEqual({
    ownLength: 3.5,
    ownProgress: 3.5,
    status: "completed",
  })
})

test("a track of no length runs none and is still heard", () => {
  expect(valuesHeard({ status: "not-started" })).toEqual({ ownProgress: 0, status: "completed" })
})

test("what a track already carries beside its listening is left as it is", () => {
  const was = { title: "Elf", ownLength: 2, ownProgress: 0, status: "not-started" }
  expect(valuesHeard(was)["title"]).toBe("Elf")
})

test("a track key any track of which Alan heard is gathered", () => {
  const tracks = [
    { ...ON_PIXIE, trackKey: "elf|one|140094" },
    { ...ON_ELF, trackKey: "fool|one|150000" },
  ]
  const found = keysHeardOver(tracks, FINISHED, HEARD)
  expect([...found]).toEqual(["elf|one|140094"])
})

test("a track key no track of which Alan heard is gathered by nothing", () => {
  expect([...keysHeardOver([{ ...ON_ELF, trackKey: "fool|one|150000" }], FINISHED, HEARD)]).toEqual(
    []
  )
})

test("a track Alan heard that states no key puts no key in", () => {
  expect([...keysHeardOver([ON_PIXIE], FINISHED, HEARD)]).toEqual([])
})

test("the rows say every count the run made", () => {
  expect(rowsOf(COUNTS)).toEqual([
    "tracks\t9",
    "heard\t6",
    "by-release\t3",
    "by-listening\t2",
    "by-sibling\t1",
    "already\t1",
    "unheard\t3",
  ])
})

test("the message counts the tracks the run marks rather than the tracks it read", () => {
  expect(messageOf(COUNTS)).toBe("mark 5 track(s) as heard")
})
