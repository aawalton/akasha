import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodiesAt } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reasonsIn, splitAt, statementsIn } from "./statement-states-one-thing.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.check.ts"

const HERE = dirname(import.meta.path)

const OWN: readonly string[] = [
  "statement-states-one-thing.check.code.ts",
  "statement-states-one-thing.check.test.ts",
]

const given = bodiesAt(ROOT, AT)

function paged(...every: readonly string[]): string {
  const held = every.map((one) => `    { invariantKind: "departure", statement: ${one} },`)
  return ["export const held = {", "  invariants: [", ...held, "  ],", "}", ""].join("\n")
}

function quoted(said: string): string {
  return JSON.stringify(said)
}

test("a page carrying no invariant is let through", () => {
  expect(reasonsIn(given('export const held = { slug: "held" }\n'))).toEqual([])
})

test("one sentence carrying no mark of its own is let through", () => {
  const body = paged(quoted("A slug becomes a page's export name."))
  expect(reasonsIn(given(body))).toEqual([])
})

test("a statement giving its reason is refused and the clause it turns on is named", () => {
  const said = reasonsIn(
    given(paged(quoted("A slug becomes an export name because reaching the format is an import.")))
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("states why at `because`")
  expect(said[0]).toContain("because reaching the format is an import.")
  expect(said[0]).toContain("cut what only explains")
})

test("`since` states a reason as `because` does", () => {
  const body = paged(quoted("A cast is refused since claiming a shape is not proving one."))
  expect(reasonsIn(given(body))[0]).toContain("states why at `since`")
})

test("a comma joins a second fact and is refused", () => {
  const body = paged(quoted("Patch judges only the paths a change carries, so it is turned on."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3 joins a second fact at `,`")
  expect(said[0]).toContain("so it is turned on.")
  expect(said[0]).toContain("cut what only explains or follows from the first")
})

test("a semicolon joins a second fact as a comma does", () => {
  const body = paged(quoted("The indexes answer what stands; the graph answers what follows."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `;`")
  expect(said[0]).toContain("the graph answers what follows.")
})

test("a colon joins a second fact as a comma does", () => {
  const body = paged(quoted("The rule is plain: a statement says one thing."))
  expect(reasonsIn(given(body))[0]).toContain("joins a second fact at `:`")
})

test("a dash joins a second fact as a comma does", () => {
  const body = paged(quoted("A path the index files nothing for is passed over — not thrown on."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `—`")
  expect(said[0]).toContain("not thrown on.")
})

test("two sentences in one statement are refused and the second is the one shown", () => {
  const body = paged(quoted("The place is said here alone. What stands under it is named away."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("holds two sentences")
  expect(said[0]).toContain("What stands under it is named away.")
})

test("a full stop closing the statement is no second sentence", () => {
  expect(reasonsIn(given(paged(quoted("A page is one TypeScript file."))))).toEqual([])
})

test("a full stop inside a spelt name is no second sentence", () => {
  expect(reasonsIn(given(paged(quoted("The name `libc.so.6` reaches nothing."))))).toEqual([])
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
  const body = paged(quoted("A reading is sincere."), quoted("A file is refused as a stray."))
  expect(reasonsIn(given(body))).toEqual([])
})

test("a statement spelt across lines is read whole and a mark falling across the join is found", () => {
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
  const said = reasonsIn(given(body))
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
  expect(reasonsIn(given(body))).toEqual([])
})

test("an entry stating a kind and no statement is passed over", () => {
  expect(reasonsIn(given('const held = { invariantKind: "gap" }\n'))).toEqual([])
})

test("a statement standing beside no kind is not an invariant", () => {
  const body = 'const held = { statement: "A page is named because the slug says so." }\n'
  expect(reasonsIn(given(body))).toEqual([])
})

test("a statement no reading can settle is passed over rather than guessed at", () => {
  const body = paged("`A page is named because ${said}.`", "said")
  expect(reasonsIn(given(body))).toEqual([])
  expect(statementsIn(AT, body)).toEqual([])
})

test("every invariant a page carries is reported and not only the first", () => {
  const body = paged(
    quoted("A page is named because the slug says so."),
    quoted("A page is named, so the slug says it."),
    quoted("A page is named for its slug.")
  )
  expect(reasonsIn(given(body))).toHaveLength(2)
})

test("a file that is not TypeScript is passed over", () => {
  const held = {
    root: ROOT,
    path: "akasha/notes.md",
    bytes: new TextEncoder().encode(paged(quoted("A page is named because it is."))),
  }
  expect(reasonsIn(held)).toEqual([])
})

test("a body that is not text is passed over rather than refused", () => {
  const held = { root: ROOT, path: "akasha/raw.ts", bytes: new Uint8Array([0xff, 0xfe, 0x00]) }
  expect(reasonsIn(held)).toEqual([])
})

test("the check refuses neither of its own code files though each spells the words it refuses", () => {
  for (const one of OWN) {
    const body = readFileSync(join(HERE, one), "utf8")
    expect(body).toMatch(/because/)
    expect(reasonsIn(given(body))).toEqual([])
  }
})
