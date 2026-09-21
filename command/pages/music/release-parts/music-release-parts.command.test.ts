import { expect, test } from "bun:test"
import {
  covers,
  lengthOver,
  messageOf,
  rowsOf,
  statesNothing,
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
