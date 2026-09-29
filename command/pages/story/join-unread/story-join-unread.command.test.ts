import { expect, test } from "bun:test"
import {
  type Chapter,
  headingOf,
  JOINED_SLUG,
  joinedFrom,
  limitedTo,
  storyJoinUnread,
  unreadIn,
} from "akasha/command/pages/story/join-unread/story-join-unread.command.code.ts"

const GIVEN = {
  root: "/nowhere",
  calledAs: "akasha story join-unread",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function row(position: number, extra: Record<string, unknown> = {}): Record<string, unknown> {
  return { slug: `one-${position}`, title: `1.${position}`, position, ownLength: 100, ...extra }
}

test("a chapter stating no progress is unread", () => {
  expect(unreadIn([row(1)]).map((one) => one.position)).toEqual([1])
})

test("a chapter whose progress falls short of its length is unread", () => {
  expect(unreadIn([row(1, { ownProgress: 99 })]).map((one) => one.position)).toEqual([1])
})

test("a chapter whose progress reaches its length is passed over", () => {
  expect(unreadIn([row(1, { ownProgress: 100 })])).toEqual([])
})

test("the chapters come back in the order of their positions", () => {
  const found = unreadIn([row(3), row(1), row(2)])
  expect(found.map((one) => one.position)).toEqual([1, 2, 3])
})

test("the joined chapter itself is never joined again", () => {
  expect(unreadIn([{ ...row(1), slug: JOINED_SLUG }])).toEqual([])
})

test("a page stating no position is passed over", () => {
  expect(unreadIn([{ slug: "loose", title: "Loose", ownLength: 5 }])).toEqual([])
})

test("the day a chapter was published is carried where it states one", () => {
  expect(unreadIn([row(1, { publishedAt: "2025-03-14" })])[0]?.publishedAt).toBe("2025-03-14")
  expect(unreadIn([row(1)])[0]?.publishedAt).toBeNull()
})

const ONE: Chapter = { slug: "one-1", title: "1.00", position: 1, publishedAt: "2017-03-03" }

const TWO: Chapter = { slug: "one-2", title: "1.01", position: 2, publishedAt: null }

test("a limit keeps the earliest chapters", () => {
  expect(limitedTo([ONE, TWO], 1)).toEqual([ONE])
  expect(limitedTo([ONE, TWO], undefined)).toEqual([ONE, TWO])
})

test("a heading names the title and the day, or the title alone", () => {
  expect(headingOf(ONE)).toBe("1.00 (2017-03-03)")
  expect(headingOf(TWO)).toBe("1.01")
})

test("each chapter opens on its heading, and a blank line parts the chapters", () => {
  const text = joinedFrom([
    { chapter: ONE, prose: "\nFirst words.\n\nMore.\n" },
    { chapter: TWO, prose: "Second words.\n" },
  ])
  expect(text).toBe("1.00 (2017-03-03)\n\nFirst words.\n\nMore.\n\n1.01\n\nSecond words.\n")
})

test("a limit of nothing is refused before anything is read", async () => {
  const said = await storyJoinUnread(["--limit", "0"], GIVEN)
  expect(said.code).not.toBe(0)
  expect(said.refusals.join(" ")).toContain("--limit")
})
