import { expect, test } from "bun:test"
import { type BodyOf, expanded, gathered, narrowed, widened } from "./change-answer.module.code.ts"
import type { Answer, Edit } from "./change-answer.module.types.ts"

const AT = "akasha/one/held.ts"

const AWAY = "akasha/one/gone.ts"

function holding(bodies: Readonly<Record<string, string>>): BodyOf {
  return (path) => bodies[path] ?? null
}

const NOTHING = holding({})

test("an add answers the content as the body where its path holds nothing", () => {
  const said = expanded({ kind: "add", path: AT, content: "one" }, NOTHING)

  expect(said).toEqual({ edit: { path: AT, was: null, body: "one" } })
})

test("an add onto a path already holding a body is refused", () => {
  const said = expanded({ kind: "add", path: AT, content: "one" }, holding({ [AT]: "two" }))

  expect(said).toEqual({ refused: `\`${AT}\` holds a body already, so nothing is added` })
})

test("a replace answers the body the passage leaves", () => {
  const one = { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" } as const

  expect(expanded(one, holding({ [AT]: "one two" }))).toEqual({
    edit: { path: AT, was: "one two", body: "one three" },
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

  expect(said).toEqual({ edit: { path: AT, was: "one", body: null } })
})

test("a remove of a path holding no body is refused", () => {
  const said = expanded({ kind: "remove", path: AT }, NOTHING)

  expect(said).toEqual({ refused: `\`${AT}\` holds no body, so nothing is taken away` })
})

test("a move answers the body under the path moved to and names the path moved from", () => {
  const one = { kind: "move", pathFrom: AWAY, pathTo: AT } as const

  expect(expanded(one, holding({ [AWAY]: "one" }))).toEqual({
    edit: { path: AT, was: "one", body: "one", from: AWAY },
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
    edit: { path: AT, was: "one", body: "one", from: AWAY },
  })
})

test("the reading an edit states is carried onto the edit answered", () => {
  const one = { kind: "add", path: AT, content: "one", readersOweReading: false } as const

  expect(expanded(one, NOTHING)).toEqual({
    edit: { readersOweReading: false, path: AT, was: null, body: "one" },
  })
})

test("an edit stating nothing about reading answers an edit stating nothing", () => {
  const said = expanded({ kind: "add", path: AT, content: "one" }, NOTHING)

  expect(said).not.toHaveProperty("edit.readersOweReading")
})

test("an answer already refused is answered refused", () => {
  expect(widened({ edits: [], refused: "no" }, NOTHING)).toEqual({ edits: [], refused: "no" })
})

test("an edit already whole is answered as it was", () => {
  const one = { path: AT, was: null, body: "one" }

  expect(widened({ edits: [one], refused: null }, NOTHING)).toEqual({
    edits: [one],
    refused: null,
  })
})

test("a replace reads the body an add earlier in the answer left", () => {
  const edits = [
    { kind: "add", path: AT, content: "one two" },
    { kind: "replace", path: AT, contentFrom: "two", contentTo: "three" },
  ] as const

  expect(widened({ edits, refused: null }, NOTHING)).toEqual({
    edits: [
      { path: AT, was: null, body: "one two" },
      { path: AT, was: "one two", body: "one three" },
    ],
    refused: null,
  })
})

test("a replace reads the body a move earlier in the answer landed", () => {
  const edits = [
    { kind: "move", pathFrom: AWAY, pathTo: AT },
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
  ] as const

  expect(widened({ edits, refused: null }, holding({ [AWAY]: "one" }))).toEqual({
    edits: [
      { path: AT, was: "one", body: "one", from: AWAY },
      { path: AT, was: "one", body: "two" },
    ],
    refused: null,
  })
})

test("an add onto the path a move earlier in the answer left is answered", () => {
  const edits = [
    { kind: "move", pathFrom: AWAY, pathTo: AT },
    { kind: "add", path: AWAY, content: "two" },
  ] as const

  expect(widened({ edits, refused: null }, holding({ [AWAY]: "one" }))).toEqual({
    edits: [
      { path: AT, was: "one", body: "one", from: AWAY },
      { path: AWAY, was: null, body: "two" },
    ],
    refused: null,
  })
})

function rounded(one: Edit, bodies: Readonly<Record<string, string>>): Answer {
  return gathered([widened({ edits: narrowed(one), refused: null }, holding(bodies))])
}

test("a write onto a path holding nothing narrows to an add", () => {
  expect(narrowed({ path: AT, was: null, body: "one" })).toEqual([
    { kind: "add", path: AT, content: "one" },
  ])
})

test("a write over a body narrows to a replace holding the body each side", () => {
  expect(narrowed({ path: AT, was: "one", body: "two" })).toEqual([
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
  ])
})

test("an edit stating no body narrows to a remove", () => {
  expect(narrowed({ path: AT, was: "one", body: null })).toEqual([{ kind: "remove", path: AT }])
})

test("an edit leaving the body as it was narrows to nothing", () => {
  expect(narrowed({ path: AT, was: "one", body: "one" })).toEqual([])
})

test("a move carrying the body unchanged narrows to a move alone", () => {
  expect(narrowed({ path: AT, was: "one", body: "one", from: AWAY })).toEqual([
    { kind: "move", pathFrom: AWAY, pathTo: AT },
  ])
})

test("a move whose body changed narrows to a move and a replace", () => {
  expect(narrowed({ path: AT, was: "one", body: "two", from: AWAY })).toEqual([
    { kind: "move", pathFrom: AWAY, pathTo: AT },
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
  ])
})

test("a move stating no body narrows to a remove of the path moved from", () => {
  expect(narrowed({ path: AT, was: "one", body: null, from: AWAY })).toEqual([
    { kind: "remove", path: AWAY },
  ])
})

test("an edit worked out from no body and stating no body narrows to no edit", () => {
  expect(narrowed({ path: AT, was: null, body: null })).toEqual([])
})

test("an edit worked out from no body naming a path moved from narrows to an add", () => {
  expect(narrowed({ path: AT, was: null, body: "one", from: AWAY })).toEqual([
    { kind: "add", path: AT, content: "one" },
  ])
})

test("an edit worked out from no body naming a path moved from and stating no body narrows to no edit", () => {
  expect(narrowed({ path: AT, was: null, body: null, from: AWAY })).toEqual([])
})

test("an edit worked out from no body and stating no body is answered rather than refused", () => {
  expect(rounded({ path: AT, was: null, body: null }, {})).toEqual({ edits: [], refused: null })
})

test("an edit worked out from no body naming a path moved from is answered as an add", () => {
  const one = { path: AT, was: null, body: "one", from: AWAY }

  expect(rounded(one, {})).toEqual({
    edits: [{ path: AT, was: null, body: "one" }],
    refused: null,
  })
})

test("the reading an edit states is carried onto what that edit narrows to", () => {
  expect(narrowed({ path: AT, was: null, body: "one", readersOweReading: false })).toEqual([
    { readersOweReading: false, kind: "add", path: AT, content: "one" },
  ])
})

test("a write onto a path holding nothing comes back as it was", () => {
  const one = { path: AT, was: null, body: "one" }

  expect(rounded(one, {})).toEqual({ edits: [one], refused: null })
})

test("a write over a body comes back as it was", () => {
  const one = { path: AT, was: "one", body: "two" }

  expect(rounded(one, { [AT]: "one" })).toEqual({ edits: [one], refused: null })
})

test("an edit stating no body comes back as it was", () => {
  const one = { path: AT, was: "one", body: null }

  expect(rounded(one, { [AT]: "one" })).toEqual({ edits: [one], refused: null })
})

test("a move carrying the body unchanged comes back as it was", () => {
  const one = { path: AT, was: "one", body: "one", from: AWAY }

  expect(rounded(one, { [AWAY]: "one" })).toEqual({ edits: [one], refused: null })
})

test("a move whose body changed comes back as it was", () => {
  const one = { path: AT, was: "one", body: "two", from: AWAY }

  expect(rounded(one, { [AWAY]: "one" })).toEqual({ edits: [one], refused: null })
})

test("one edit refused refuses the whole answer", () => {
  const edits = [
    { kind: "add", path: AT, content: "one" },
    { kind: "remove", path: AWAY },
  ] as const

  expect(widened({ edits, refused: null }, NOTHING)).toEqual({
    edits: [],
    refused: `\`${AWAY}\` holds no body, so nothing is taken away`,
  })
})
