import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { shadowAt } from "@akasha/pages/shadow"
import { rootOf } from "../../../../commands/modules/rooting/rooting.module.code.ts"
import {
  found,
  marked,
  splitAt,
  statementsIn,
} from "./invariant-statement-is-plain.code-check.decision.code.ts"

const AT = "akasha/held.check.ts"

const HERE = dirname(import.meta.path)

const OWN: readonly string[] = [
  "invariant-statement-is-plain.code-check.decision.code.ts",
  "invariant-statement-is-plain.code-check.decision.test.ts",
]

const REPO_AT = rootOf(import.meta.dir)

function judged(body: string): Promise<readonly string[]> {
  return found(REPO_AT, AT, body, shadowAt(REPO_AT).index)
}

function paged(...every: readonly string[]): string {
  const held = every.map((one) => `    { invariantKind: "departure", statement: ${one} },`)
  return ["export const held = {", "  invariants: [", ...held, "  ],", "}", ""].join("\n")
}

test("a page carrying no invariant is let through", () => {
  expect(marked(AT, 'export const held = { slug: "held" }\n')).toEqual([])
})

test("one sentence carrying no mark of its own is let through", () => {
  const body = paged(JSON.stringify("A slug becomes a page's export name."))
  expect(marked(AT, body)).toEqual([])
})

test("a statement giving its reason is refused and the clause saying why is named", () => {
  const body = paged(
    JSON.stringify("A slug becomes an export name because reaching the format is an import.")
  )
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("states why at `because`")
  expect(said[0]).toContain("because reaching the format is an import.")
  expect(said[0]).toContain("cut what only explains")
})

test("`since` states a reason as `because` does", () => {
  const body = paged(JSON.stringify("A cast is refused since claiming a shape is not proving one."))
  expect(marked(AT, body)[0]).toContain("states why at `since`")
})

test("a comma joins a second fact and is refused", () => {
  const body = paged(
    JSON.stringify("Patch judges only the paths a change carries, so it is turned on.")
  )
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3 joins a second fact at `,`")
  expect(said[0]).toContain("so it is turned on.")
  expect(said[0]).toContain("cut what only explains or follows from the first")
})

test("a semicolon joins a second fact as a comma does", () => {
  const body = paged(
    JSON.stringify("The indexes answer what is there; the graph answers what follows.")
  )
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `;`")
  expect(said[0]).toContain("the graph answers what follows.")
})

test("a colon joins a second fact as a comma does", () => {
  const body = paged(JSON.stringify("The rule is plain: a statement says one thing."))
  expect(marked(AT, body)[0]).toContain("joins a second fact at `:`")
})

test("a dash joins a second fact as a comma does", () => {
  const body = paged(
    JSON.stringify("A path the index files nothing for is passed over — not thrown on.")
  )
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `—`")
  expect(said[0]).toContain("not thrown on.")
})

test("two sentences in one statement are refused and the second is the one shown", () => {
  const body = paged(
    JSON.stringify("The place is said here alone. What sits under it is named away.")
  )
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("holds two sentences")
  expect(said[0]).toContain("What sits under it is named away.")
})

test("a full stop closing the statement is no second sentence", () => {
  expect(marked(AT, paged(JSON.stringify("A page is one TypeScript file.")))).toEqual([])
})

test("a full stop inside a spelt name is no second sentence", () => {
  expect(marked(AT, paged(JSON.stringify("The name `libc.so.6` reaches nothing.")))).toEqual([])
})

test("a mark inside a spelt name is no mark of the statement's own", () => {
  const body = paged(JSON.stringify("`tmpdir` is refused where it is taken from `node:os`."))
  expect(marked(AT, body)).toEqual([])
})

test("a mark outside a spelt name is found where a spelt name is beside it", () => {
  const body = paged(
    JSON.stringify("A method declaring `this: void` is refused, and nothing else is.")
  )
  expect(marked(AT, body)[0]).toContain("joins a second fact at `,`")
})

test("the earliest mark in a statement is the one named", () => {
  const held = { line: 1, text: "A page is named, so the slug says it because it must." }
  expect(splitAt(held)).toEqual({
    line: 1,
    shape: "join",
    mark: ",",
    first: "A page is named",
    second: "so the slug says it because it must.",
  })
  expect(splitAt({ line: 1, text: "A page is named for its slug." })).toBeNull()
})

test("a word merely carrying those letters is let through with the word read whole", () => {
  const body = paged(
    JSON.stringify("A reading is sincere."),
    JSON.stringify("A file is refused as a stray.")
  )
  expect(marked(AT, body)).toEqual([])
})

test("a statement spelt across lines is read whole and a mark across the join is found", () => {
  const body = [
    "export const held = {",
    "  invariants: [",
    "    {",
    '      invariantKind: "departure",',
    "      statement:",
    '        "A page is named for its slug be" +',
    '        "cause the name is the slug.",',
    "    },",
    "  ],",
    "}",
    "",
  ].join("\n")
  const said = marked(AT, body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 6")
  expect(said[0]).toContain("states why at `because`")
})

test("the statement is read from the page rather than from the prose around it", () => {
  const body = [
    "export const held = {",
    '  definition: "the page named for its slug, because the name is the slug"',
    "  invariants: [",
    '    { invariantKind: "departure", statement: "A page is named for its slug." },',
    "  ],",
    "  directives: [",
    "    {",
    '      directiveKind: "rule",',
    '      warrant: "Nothing re-reads an invariant, so one filed wrongly misleads.",',
    "    },",
    "  ],",
    "}",
    "",
  ].join("\n")
  expect(marked(AT, body)).toEqual([])
})

test("an entry stating a kind and no statement is passed over", () => {
  expect(marked(AT, 'const held = { invariantKind: "gap" }\n')).toEqual([])
})

test("a statement beside no kind is not an invariant", () => {
  const body = 'const held = { statement: "A page is named because the slug says so." }\n'
  expect(marked(AT, body)).toEqual([])
})

test("a statement no reading can settle is passed over rather than guessed at", () => {
  const body = paged("`A page is named because ${said}.`", "said")
  expect(marked(AT, body)).toEqual([])
  expect(statementsIn(AT, body)).toEqual([])
})

test("every invariant a page carries is reported and not only the first", () => {
  const body = paged(
    JSON.stringify("A page is named because the slug says so."),
    JSON.stringify("A page is named, so the slug says it."),
    JSON.stringify("A page is named for its slug.")
  )
  expect(marked(AT, body)).toHaveLength(2)
})

test("the check refuses neither of its own code files though each spells the words it refuses", () => {
  for (const one of OWN) {
    const body = readFileSync(join(HERE, one), "utf8")
    expect(body).toMatch(/because/)
    expect(marked(AT, body)).toEqual([])
  }
})

test("a statement no refused shape matches is let through", async () => {
  expect(await judged(paged(JSON.stringify("A page is one TypeScript file.")))).toEqual([])
})

test("a statement written in a refused shape names that shape", async () => {
  const said = await judged(paged(JSON.stringify("It is read from the index.")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("`lone-pronoun`")
  expect(said[0]).toContain("say the same fact in the plainest words")
})

test("a count closing a statement over its own list names `closing-count`", async () => {
  const body = paged(JSON.stringify("A pass either writes or checks rather than doing both."))
  const said = await judged(body)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`closing-count`")
})

test("a statement the parser makes nothing of is passed over", async () => {
  const body = paged(JSON.stringify("A page is one TypeScript file whenever whenever."))
  expect(await judged(body)).toEqual([])
})

test("a statement refused for a mark is not judged against the shapes too", async () => {
  const said = await judged(paged(JSON.stringify("It is read, so the index answers.")))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact")
})

test("a directive is passed over where an invariant is judged", async () => {
  const body = [
    "export const held = {",
    "  directives: [",
    "    {",
    '      directiveKind: "rule",',
    '      act: "It is read from the index.",',
    '      statement: "It is read from the index.",',
    "    },",
    "  ],",
    "}",
    "",
  ].join("\n")
  expect(await judged(body)).toEqual([])
})
