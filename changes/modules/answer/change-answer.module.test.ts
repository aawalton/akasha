import { expect, test } from "bun:test"
import {
  type BodyOf,
  expanded,
  gathered,
  NOT_TEXT,
  replayed,
  spliced,
  splicedIn,
  splicing,
} from "./change-answer.module.code.ts"
import type { FileChange } from "./change-answer.module.types.ts"

const AT = "akasha/one/held.ts"

const AWAY = "akasha/one/gone.ts"

function holding(bodies: Readonly<Record<string, string>>): BodyOf {
  return (path) => bodies[path] ?? null
}

const NOTHING = holding({})

test("an add answers the content as the body where its path holds nothing", () => {
  const said = expanded({ kind: "add", path: AT, content: "one" }, NOTHING)

  expect(said).toEqual({ left: { path: AT, body: "one" } })
})

test("an add onto a path already holding a body is refused", () => {
  const said = expanded({ kind: "add", path: AT, content: "one" }, holding({ [AT]: "two" }))

  expect(said).toEqual({ refused: `\`${AT}\` holds a body already, so nothing is added` })
})

test("a replace answers the body the passage leaves", () => {
  const one = { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" } as const

  expect(expanded(one, holding({ [AT]: "one two" }))).toEqual({
    left: { path: AT, body: "one three" },
  })
})

test("a replace naming a passage of no characters is refused", () => {
  const one = { kind: "replace", path: AT, contentFrom: "", contentTo: "three" } as const

  expect(expanded(one, holding({ [AT]: "one two" }))).toEqual({
    refused: "a passage of no characters names no place in a body",
  })
})

test("a replace on a path holding no body is refused", () => {
  const one = { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" } as const

  expect(expanded(one, NOTHING)).toEqual({
    refused: `\`${AT}\` holds no body, so no passage is changed`,
  })
})

test("a replace naming a passage the body does not hold is refused", () => {
  const one = { kind: "replace", path: AT, contentFrom: "four", contentTo: "three" } as const

  expect(expanded(one, holding({ [AT]: "one two" }))).toEqual({
    refused: `\`${AT}\` holds no such passage, so nothing is changed`,
  })
})

test("a replace naming a passage the body holds twice is refused", () => {
  const one = { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" } as const

  expect(expanded(one, holding({ [AT]: "two two" }))).toEqual({
    refused: `\`${AT}\` holds that passage twice or more, and one change works one`,
  })
})

test("a replace leaving the body as it was is refused", () => {
  const one = { kind: "replace", path: AT, contentFrom: "two", contentTo: "two" } as const

  expect(expanded(one, holding({ [AT]: "one two" }))).toEqual({
    refused: `\`${AT}\` reads the same after this, so this change writes nothing`,
  })
})

test("a remove answers no body under the path", () => {
  const said = expanded({ kind: "remove", path: AT }, holding({ [AT]: "one" }))

  expect(said).toEqual({ left: { path: AT, body: null } })
})

test("a remove of a path holding no body is refused", () => {
  const said = expanded({ kind: "remove", path: AT }, NOTHING)

  expect(said).toEqual({ refused: `\`${AT}\` holds no body, so nothing is taken away` })
})

test("a move answers the body under the path moved to and names the path moved from", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, holding({ [AWAY]: "one" }))).toEqual({
    left: { path: AT, body: "one", from: AWAY },
  })
})

test("a move from a path holding no body is refused", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, NOTHING)).toEqual({
    refused: `\`${AWAY}\` holds no body, so nothing is moved`,
  })
})

test("a move onto a path already holding a body is refused", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, holding({ [AWAY]: "one", [AT]: "two" }))).toEqual({
    refused: `\`${AT}\` holds a body already, so nothing is moved there`,
  })
})

test("a move onto a path holding no characters is answered", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, holding({ [AWAY]: "one", [AT]: "" }))).toEqual({
    left: { path: AT, body: "one", from: AWAY },
  })
})

const BYTES: BodyOf = (path) => (path === AWAY ? NOT_TEXT : null)

test("a remove of a body that is not text answers no body under the path", () => {
  expect(expanded({ kind: "remove", path: AWAY }, BYTES)).toEqual({
    left: { path: AWAY, body: null },
  })
})

test("a move carries a body that is not text to the path moved to", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, BYTES)).toEqual({ left: { path: AT, body: NOT_TEXT, from: AWAY } })
})

test("a replace worked in a body that is not text is refused", () => {
  const one = { kind: "replace", path: AWAY, contentFrom: "two", contentTo: "three" } as const

  expect(expanded(one, BYTES)).toEqual({
    refused: `\`${AWAY}\` is not text, so no passage in it is changed`,
  })
})

test("an add onto a path holding a body that is not text is refused", () => {
  expect(expanded({ kind: "add", path: AWAY, content: "one" }, BYTES)).toEqual({
    refused: `\`${AWAY}\` holds a body already, so nothing is added`,
  })
})

function replaying(edits: readonly FileChange[], bodies: Readonly<Record<string, string>>) {
  return replayed({ edits, refused: null }, holding(bodies))
}

test("a replay over no edit leaves no body", () => {
  expect(replaying([], {})).toEqual(new Map())
})

test("a replace reads the body an add earlier in the answer left", () => {
  const edits = [
    { kind: "add", path: AT, content: "one two" },
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" },
  ] as const

  expect(replaying(edits, {})).toEqual(new Map([[AT, "one three"]]))
})

test("a replace reads the body a move earlier in the answer landed", () => {
  const edits = [
    { kind: "move", pathFrom: AWAY, pathTo: AT },
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
  ] as const

  expect(replaying(edits, { [AWAY]: "one" })).toEqual(
    new Map([
      [AWAY, null],
      [AT, "two"],
    ])
  )
})

test("an add onto the path a move earlier in the answer left is answered", () => {
  const edits = [
    { kind: "move", pathFrom: AWAY, pathTo: AT },
    { kind: "add", path: AWAY, content: "two" },
  ] as const

  expect(replaying(edits, { [AWAY]: "one" })).toEqual(
    new Map([
      [AWAY, "two"],
      [AT, "one"],
    ])
  )
})

test("two replaces over one path leave both passages replaced", () => {
  const edits = [
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
    { kind: "replace", path: AT, contentFrom: "four", contentTo: "five" },
  ] as const

  expect(replaying(edits, { [AT]: "one four" })).toEqual(new Map([[AT, "two five"]]))
})

test("an add and a remove over one path leave no body", () => {
  const edits = [
    { kind: "add", path: AT, content: "one" },
    { kind: "remove", path: AT },
  ] as const

  expect(replaying(edits, {})).toEqual(new Map([[AT, null]]))
})

test("one edit refused refuses the whole replay", () => {
  const edits = [
    { kind: "add", path: AT, content: "one" },
    { kind: "remove", path: AWAY },
  ] as const

  expect(replaying(edits, {})).toEqual({
    refused: `\`${AWAY}\` holds no body, so nothing is taken away`,
  })
})

test("answers gather to the edits each states in the order they were stated", () => {
  const one = { kind: "add", path: AT, content: "one" } as const
  const two = { kind: "remove", path: AWAY } as const

  expect(
    gathered([
      { edits: [one], refused: null },
      { edits: [two], refused: null },
    ])
  ).toEqual({ edits: [one, two], refused: null })
})

test("an answer already refused refuses the gathering", () => {
  expect(gathered([{ edits: [], refused: "no" }])).toEqual({ edits: [], refused: "no" })
})

const LINES = "one\ntwo\nthree\n"

test("a splice becomes a replace naming the whole line that place sits in", () => {
  expect(spliced(AT, LINES, { from: 7, to: 7, put: "!" })).toEqual([
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "two!" },
  ])
})

test("a splice taking a run out names the line that run sits in", () => {
  expect(spliced(AT, LINES, { from: 4, to: 7, put: "" })).toEqual([
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "" },
  ])
})

test("a line the body holds twice widens until the body holds the passage once", () => {
  expect(spliced(AT, "a\nsame\nb\nsame\n", { from: 13, to: 13, put: "!" })).toEqual([
    { kind: "replace", path: AT, contentFrom: "b\nsame\n", contentTo: "b\nsame!\n" },
  ])
})

test("a splice leaving its place as the place was answers no edit", () => {
  expect(spliced(AT, LINES, { from: 4, to: 7, put: "two" })).toEqual([])
})

const MANY = "one\ntwo\nthree\nfour\nfive\n"

test("two splices whose lines are apart answer an edit each", () => {
  const said = splicing(AT, MANY, [
    { from: 7, to: 7, put: "!" },
    { from: 18, to: 18, put: "?" },
  ])

  expect(said).toEqual([
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "two!" },
    { kind: "replace", path: AT, contentFrom: "four", contentTo: "four?" },
  ])
})

test("two splices whose lines meet answer one edit over those lines", () => {
  const said = splicing(AT, MANY, [
    { from: 9, to: 9, put: "X" },
    { from: 12, to: 12, put: "Y" },
  ])

  expect(said).toEqual([{ kind: "replace", path: AT, contentFrom: "three", contentTo: "tXhreYe" }])
})

test("no splice answers no edit", () => {
  expect(splicing(AT, MANY, [])).toEqual([])
})

test("the passage a splice names is smaller than the body it sits in", () => {
  const said = spliced(AT, LINES, { from: 7, to: 7, put: "!" })[0]

  expect(said?.kind === "replace" && said.contentFrom.length).toBeLessThan(LINES.length)
})

test("spots handed in out of order are worked in the order they sit in the body", () => {
  const said = splicedIn(AT, MANY, [
    { from: 18, to: 18, put: "?" },
    { from: 7, to: 7, put: "!" },
  ])

  expect(said).toEqual([
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "two!" },
    { kind: "replace", path: AT, contentFrom: "four", contentTo: "four?" },
  ])
})

test("two spots opening at one place answer one splice rather than two", () => {
  const said = splicedIn(AT, MANY, [
    { from: 7, to: 7, put: "!" },
    { from: 7, to: 7, put: "?" },
  ])

  expect(said).toEqual([{ kind: "replace", path: AT, contentFrom: "two", contentTo: "two!" }])
})
