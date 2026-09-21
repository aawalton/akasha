import { expect, test } from "bun:test"
import {
  covers,
  messageOf,
  ranOver,
  rowsOf,
  statusOf,
  valuesRolled,
} from "akasha/command/pages/music/release-progress/music-release-progress.command.code.ts"

const COUNTS = {
  releases: 20,
  covered: 12,
  uncovered: 8,
  changed: 5,
  unchanged: 7,
  finished: 6,
  partWay: 4,
  unstarted: 2,
}

const HEARD = { ownLength: 3, ownProgress: 3 }

const UNHEARD = { ownLength: 2, ownProgress: 0 }

test("a release runs as far as its tracks together run", () => {
  expect(ranOver([HEARD, UNHEARD])).toEqual({ length: 5, progress: 3 })
})

test("a track stating no length runs none", () => {
  expect(ranOver([{ title: "Elf" }])).toEqual({ length: 0, progress: 0 })
})

test("a release is covered where its tracks run as long as the release runs", () => {
  expect(covers({ length: 5, progress: 0 }, 5)).toBe(true)
  expect(covers({ length: 5.004, progress: 0 }, 5)).toBe(true)
  expect(covers({ length: 4.5, progress: 0 }, 5)).toBe(false)
})

test("a release running longer than its tracks is not covered", () => {
  expect(covers({ length: 30, progress: 0 }, 48)).toBe(false)
})

test("a release stating no length is not covered", () => {
  expect(covers({ length: 5, progress: 5 }, null)).toBe(false)
})

test("a release every track of which is run through is finished", () => {
  expect(statusOf({ length: 5, progress: 5 })).toBe("completed")
})

test("a release no track of which is run into is not started", () => {
  expect(statusOf({ length: 5, progress: 0 })).toBe("not-started")
})

test("a release between the two is part way through", () => {
  expect(statusOf({ length: 5, progress: 3 })).toBe("in-progress")
})

test("a release takes the listening its tracks say", () => {
  const was = { ownLength: 5, ownProgress: 5, status: "completed", title: "Pixie" }
  expect(valuesRolled(was, { length: 5, progress: 3 })).toEqual({
    ownLength: 5,
    ownProgress: 3,
    status: "in-progress",
    title: "Pixie",
  })
})

test("a release already saying what its tracks say is left as that release is", () => {
  const was = { ownLength: 5, ownProgress: 5, status: "completed" }
  expect(valuesRolled(was, { length: 5, progress: 5 })).toBeNull()
})

test("a release whose length its tracks do not touch keeps that length", () => {
  const was = { ownLength: 48, ownProgress: 48, status: "completed" }
  expect(valuesRolled(was, { length: 50, progress: 50 })?.["ownLength"]).toBe(48)
})

test("the rows say every count the run made", () => {
  expect(rowsOf(COUNTS)).toEqual([
    "releases\t20",
    "covered\t12",
    "uncovered\t8",
    "changed\t5",
    "unchanged\t7",
    "finished\t6",
    "part-way\t4",
    "not-started\t2",
  ])
})

test("the message counts the releases the run changes rather than the releases it read", () => {
  expect(messageOf(COUNTS)).toBe("read 5 release(s) off the tracks each carries")
})
