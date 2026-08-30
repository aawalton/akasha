import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { bodiesAt } from "../../../testing-system/bodying/bodying.module.code.ts"
import { reasonsIn, splitAt, statementsIn } from "./no-why-in-a-statement.check.code.ts"

const ROOT = "/repo"

const AT = "akasha/held.check.ts"

const HERE = dirname(import.meta.path)

const OWN: readonly string[] = [
  "no-why-in-a-statement.check.code.ts",
  "no-why-in-a-statement.check.test.ts",
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

test("an invariant stating only what is true is let through", () => {
  const body = paged(quoted("A slug becomes a page's export name."))
  expect(reasonsIn(given(body))).toEqual([])
})

test("a statement giving its reason is refused, and the clause it turns on is named", () => {
  const body = paged(
    quoted("A slug becomes a page's export name because reaching the format would be an import.")
  )
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3")
  expect(said[0]).toContain("states why at `because`")
  expect(said[0]).toContain("an invariant states what is true, never why")
  expect(said[0]).toContain("because reaching the format would be an import.")
  expect(said[0]).toContain("cut what only explains")
})

test("`since` states a reason as `because` does", () => {
  const body = paged(quoted("A cast is refused since claiming a shape is not proving one."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("states why at `since`")
  expect(said[0]).toContain("since claiming a shape is not proving one.")
})

test("a clause hung on a participle states a reason, and the comma before it is cut away", () => {
  const body = paged(quoted("A list is read whole, arguments being gathered in one."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("states why at `arguments being`")
  expect(said[0]).toContain("arguments being gathered in one.")
})

test("a consequence is named as a second fact rather than a reason, and left to be judged", () => {
  const body = paged(quoted("Patch judges only the paths a change carries, so it is turned on."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 3 joins a second fact at `so`")
  expect(said[0]).toContain("an invariant states one thing")
  expect(said[0]).toContain("so it is turned on.")
  expect(said[0]).toContain("cut the second where it follows from the first")
})

test("`, as` draws a second fact as `, so` does", () => {
  const body = paged(quoted("A shape is added by adding a folder, as nothing here changes."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `as`")
  expect(said[0]).toContain("as nothing here changes.")
})

test("the two shapes are told apart, each saying what its own fix is", () => {
  const why = reasonsIn(given(paged(quoted("A page is named because the slug says so."))))[0]
  const both = reasonsIn(given(paged(quoted("A page is named, so the slug says it."))))[0]
  expect(why).toContain("states why")
  expect(why).not.toContain("joins a second fact")
  expect(both).toContain("joins a second fact")
  expect(both).not.toContain("states why")
})

test("a semicolon joins a second fact, and is refused as a consequence is", () => {
  const body = paged(quoted("The indexes answer what stands; the graph answers what follows."))
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `;`")
  expect(said[0]).toContain("the graph answers what follows.")
})

test("a comma before `and` joins a second fact, and is refused", () => {
  const body = paged(
    quoted("A scale is named by the readings drawn against it, and belongs to none.")
  )
  const said = reasonsIn(given(body))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("joins a second fact at `and`")
  expect(said[0]).toContain("and belongs to none.")
})

test("`and` carrying no comma before it joins nothing", () => {
  const body = paged(quoted("A reader is kept between calls and ended where a call throws."))
  expect(reasonsIn(given(body))).toEqual([])
})

test("a statement is split at the first clause that carries a reason or a consequence", () => {
  const held = { line: 1, text: "A page is named, so the slug says it, because it must." }
  expect(splitAt(held)).toEqual({
    line: 1,
    drawn: true,
    mark: "so",
    first: "A page is named",
    second: "so the slug says it, because it must.",
  })
  expect(splitAt({ line: 1, text: "A page is named for its slug." })).toBeNull()
  expect(splitAt({ line: 1, text: "A page is named; the slug says it." })).toEqual({
    line: 1,
    drawn: true,
    mark: ";",
    first: "A page is named",
    second: "the slug says it.",
  })
})

test("a word merely carrying those letters is let through, the word read whole", () => {
  const body = paged(
    quoted("A reading is sincere."),
    quoted("A file is refused as a stray."),
    quoted("The cause is filed, so long as nothing else is.")
  )
  expect(reasonsIn(given(body))).toHaveLength(1)
})

test("a statement spelt across lines is read whole, and a reason falling across the join is found", () => {
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
  expect(said[0]).toContain("because the name is the slug.")
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

test("every invariant a page carries is reported, not only the first", () => {
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

test("the check refuses neither of its own code files, though each spells the words it refuses", () => {
  for (const one of OWN) {
    const body = readFileSync(join(HERE, one), "utf8")
    expect(body).toMatch(/because/)
    expect(reasonsIn(given(body))).toEqual([])
  }
})
