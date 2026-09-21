import { expect, test } from "bun:test"
import { artist } from "akasha/alan/music/catalog/artist/artist.page-type.ts"
import { sylviaDaley } from "akasha/alan/music/catalog/artist/pages/sylvia-daley/sylvia-daley.artist.ts"
import {
  covers,
  lengthOver,
  messageOf,
  rowsOf,
  statesNothing,
  tracksByRelease,
  valuesCleared,
} from "akasha/command/pages/music/release-parts/music-release-parts.command.code.ts"

const COUNTS = {
  releases: 20,
  covered: 12,
  uncovered: 8,
  cleared: 5,
  already: 7,
}

test("a release's tracks run as long as those tracks together run", () => {
  expect(lengthOver([{ ownLength: 3 }, { ownLength: 2 }])).toBe(5)
})

test("a track stating no length runs none", () => {
  expect(lengthOver([{ title: "Elf" }])).toBe(0)
})

test("a release is covered where its tracks run as long as the release runs", () => {
  expect(covers(5, 5)).toBe(true)
  expect(covers(5.004, 5)).toBe(true)
  expect(covers(4.5, 5)).toBe(false)
})

test("a release stating no length is not covered", () => {
  expect(covers(5, null)).toBe(false)
})

test("a release that is covered states a length and a progress of its own of nothing", () => {
  const was = { ownLength: 48, ownProgress: 48, status: "completed", title: "21" }
  expect(valuesCleared(was)).toEqual({
    ownLength: 0,
    ownProgress: 0,
    status: "completed",
    title: "21",
  })
})

test("a release already stating nothing of its own is read as cleared", () => {
  expect(statesNothing({ ownLength: 0, ownProgress: 0 })).toBe(true)
  expect(statesNothing({})).toBe(true)
  expect(statesNothing({ ownLength: 48, ownProgress: 0 })).toBe(false)
  expect(statesNothing({ ownLength: 0, ownProgress: 48 })).toBe(false)
})

test("the rows say every count the run made", () => {
  expect(rowsOf(COUNTS)).toEqual([
    "releases\t20",
    "covered\t12",
    "uncovered\t8",
    "cleared\t5",
    "already\t7",
  ])
})

test("the message counts the releases the run clears rather than the releases it read", () => {
  expect(messageOf(COUNTS)).toBe("take the own length off 5 release(s) their tracks carry")
})

test("a release carries every track naming that release", () => {
  const here = { slug: "elf", partOfCollections: ["release/sylvia-daley-pixie"] }
  const there = { slug: "fool", partOfCollections: ["release/sylvia-daley-pixie"] }
  expect(tracksByRelease([here, there]).get("sylvia-daley-pixie")).toEqual([here, there])
})

test("a track naming two releases is carried by both of them", () => {
  const one = {
    slug: "elf",
    partOfCollections: ["release/sylvia-daley-pixie", "release/sylvia-daley-elf"],
  }
  const byRelease = tracksByRelease([one])
  expect(byRelease.get("sylvia-daley-pixie")).toEqual([one])
  expect(byRelease.get("sylvia-daley-elf")).toEqual([one])
})

test("a track naming no release is carried by nothing", () => {
  const under = `${artist.slug}/${sylviaDaley.slug}`
  expect([...tracksByRelease([{ slug: "elf", partOfCollections: [under] }])]).toEqual([])
})
