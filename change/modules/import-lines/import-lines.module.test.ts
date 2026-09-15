import { expect, test } from "bun:test"
import {
  anchorIn,
  everyFor,
  everyIn,
  importsIn,
  linesOf,
  namedIn,
  namesIn,
  namingOf,
  namingsIn,
  openedIn,
  pointedTo,
  type Taken,
  withName,
  withNames,
  withoutNames,
} from "akasha/change/modules/import-lines/import-lines.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

const AT = "akasha/one.module.code.ts"

const ONE = 'import { one } from "./one.module.code.ts"'

const TWO = 'import { two } from "./two.module.code.ts"'

function lineAt(text: string, at: number): ts.ImportDeclaration | null {
  const held = parsedAs(AT, text).statements[at]
  return held !== undefined && ts.isImportDeclaration(held) ? held : null
}

test("every name a body imports is answered with where it comes from and whether it is a type", () => {
  const text = `${ONE}\nimport type { Held } from "./held.module.code.ts"\n`
  const found = importsIn(parsedAs(AT, text))

  expect(found.get("one")).toEqual({ from: "./one.module.code.ts", type: false })
  expect(found.get("Held")).toEqual({ from: "./held.module.code.ts", type: true })
})

test("a name spelled as a key rather than reached is not among the names a node names", () => {
  const text = `${ONE}\nexport function heldOf(): string {\n  return one.said\n}\n`
  const declared = parsedAs(AT, text).statements[1]

  expect(declared === undefined ? [] : [...namesIn(declared)]).toEqual(["heldOf", "one"])
})

const EVERY_LINE = 'import * as held from "./held.module.code.ts"'

test("a line naming everything a path exports is answered under the name it binds", () => {
  const found = everyIn(parsedAs(AT, `${ONE}\n${EVERY_LINE}\n`))

  expect(found.get("held")).toEqual({ from: "./held.module.code.ts", type: false })
  expect(found.get("one")).toBe(undefined)
})

test("such a line is written from that name and that path", () => {
  expect(everyFor("held", "./held.module.code.ts")).toBe(EVERY_LINE)
})

test("a name imported under another name is answered by the name at its source", () => {
  const line = lineAt('import { one as held } from "./one.module.code.ts"\n', 0)
  const each = (line === null ? null : namedIn(line))?.elements[0]

  expect(each === undefined ? "unfound" : namingOf(each)).toBe("one")
})

test("the anchor a body offers is the last import line it holds, and a bare body offers none", () => {
  const text = `${ONE}\n${TWO}\n\nexport const held = one\n`
  const bare = "export const held = 1\n"

  expect(anchorIn(text, parsedAs(AT, text))).toBe(TWO)
  expect(anchorIn(bare, parsedAs(AT, bare))).toBe(null)
})

test("a line put into a body follows the anchor, or opens a bare body above a blank line", () => {
  const text = `${ONE}\n\nexport const held = one\n`
  const bare = "export const held = 1\n"

  expect(openedIn(text, parsedAs(AT, text), [TWO])).toBe(
    `${ONE}\n${TWO}\n\nexport const held = one\n`
  )
  expect(openedIn(bare, parsedAs(AT, bare), [TWO])).toBe(`${TWO}\n\n${bare}`)
  expect(openedIn(bare, parsedAs(AT, bare), [])).toBe(bare)
})

const AT_HELD = "./held.module.code.ts"

const VALUES = `import { one, two } from "${AT_HELD}"`

const TYPES = `import type { Held, Kept } from "${AT_HELD}"`

test("a name joins the line a body already takes from that path", () => {
  const text = `${VALUES}\n`

  expect(withName(text, parsedAs(AT, text), AT_HELD, "three", false)).toEqual({
    old: VALUES,
    new: `import { one, two, three } from "${AT_HELD}"`,
  })
})

test("a value joining a type-only line marks every name that line already carried", () => {
  const text = `${TYPES}\n`

  expect(withName(text, parsedAs(AT, text), AT_HELD, "held", false)?.new).toBe(
    `import { type Held, type Kept, held } from "${AT_HELD}"`
  )
})

test("a type joining a line of values is marked a type on its own", () => {
  const text = `${VALUES}\n`

  expect(withName(text, parsedAs(AT, text), AT_HELD, "Held", true)?.new).toBe(
    `import { one, two, type Held } from "${AT_HELD}"`
  )
})

test("a type joining a type-only line needs no mark of its own", () => {
  const text = `${TYPES}\n`

  expect(withName(text, parsedAs(AT, text), AT_HELD, "Other", true)?.new).toBe(
    `import type { Held, Kept, Other } from "${AT_HELD}"`
  )
})

test("every name a body's import lines bind is answered by the name at its source", () => {
  const text = `import { one as held, two } from "${AT_HELD}"\n`
  const found = namingsIn(parsedAs(AT, text))

  expect(found.get("held")).toBe("one")
  expect(found.get("two")).toBe("two")
})

function taking(name: string, from: string, type = false, every = false) {
  return { name, from, type, every }
}

test("names sharing one path are written as one line, and a namespace never joins", () => {
  expect(
    linesOf([
      taking("one", AT_HELD),
      taking("held", "./two.module.code.ts", false, true),
      taking("two", AT_HELD),
    ])
  ).toEqual([
    `import * as held from "./two.module.code.ts"`,
    `import { one, two } from "${AT_HELD}"`,
  ])
})

test("a line of names is marked type throughout only where every name is a type", () => {
  expect(linesOf([taking("Held", AT_HELD, true), taking("Kept", AT_HELD, true)])).toEqual([
    `import type { Held, Kept } from "${AT_HELD}"`,
  ])
  expect(linesOf([taking("one", AT_HELD), taking("Kept", AT_HELD, true)])).toEqual([
    `import { one, type Kept } from "${AT_HELD}"`,
  ])
})

test("names taken out of one line together leave one passage rather than one for each", () => {
  const text = `${VALUES}\n${EVERY_LINE}\n`
  const source = parsedAs(AT, text)

  expect(withoutNames(text, source, ["one", "two"])).toEqual([{ old: `${VALUES}\n`, new: "" }])
  expect(withoutNames(text, source, ["two", "held"])).toEqual([
    { old: VALUES, new: `import { one } from "${AT_HELD}"` },
    { old: `${EVERY_LINE}\n`, new: "" },
  ])
})

test("a line spelling no path is refused rather than composed", () => {
  expect(() => everyFor("held", "")).toThrow("spells no path")
  expect(() => everyFor("held", "   ")).toThrow("spells no path")
  expect(() => linesOf([taking("one", "")])).toThrow("spells no path")
  expect(() => linesOf([taking("held", "", false, true)])).toThrow("spells no path")
})

test("an import from an empty path is whole syntax, so no parse catches it", () => {
  const said = 'import { one } from ""\n'

  expect(
    (parsedAs(AT, said) as { parseDiagnostics?: readonly unknown[] }).parseDiagnostics
  ).toEqual([])
})

test("a body taking nothing from that path, or already naming it, is left whole", () => {
  const text = `${VALUES}\n`
  const source = parsedAs(AT, text)

  expect(withName(text, source, "./other.module.code.ts", "three", false)).toBe(null)
  expect(withName(text, source, AT_HELD, "one", false)).toBe(null)
})

const AT_LANDING = "./landing.module.code.ts"

function pointing(text: string, named: readonly string[], landing: string): readonly Taken[] {
  const one = lineAt(text, 0)
  const bound = one === null ? null : namedIn(one)
  if (one === null || bound === null) return []
  const going = bound.elements.filter((each) => named.includes(each.name.text))
  return pointedTo(text, parsedAs(AT, text), one, bound, going, landing)
}

test("names repointed to a path the body already takes join that line and leave their own", () => {
  const text = `${VALUES}\nimport { held } from "${AT_LANDING}"\n`

  expect(pointing(text, ["one"], AT_LANDING)).toEqual([
    { old: VALUES, new: `import { two } from "${AT_HELD}"` },
    {
      old: `import { held } from "${AT_LANDING}"`,
      new: `import { held, one } from "${AT_LANDING}"`,
    },
  ])
})

test("a line every name leaves goes whole where those names join another line", () => {
  const text = `${VALUES}\nimport { held } from "${AT_LANDING}"\n`

  expect(pointing(text, ["one", "two"], AT_LANDING)).toEqual([
    { old: `${VALUES}\n`, new: "" },
    {
      old: `import { held } from "${AT_LANDING}"`,
      new: `import { held, one, two } from "${AT_LANDING}"`,
    },
  ])
})

test("names repointed where the body takes no such line are spelled on a line of their own", () => {
  const text = `${VALUES}\n`

  expect(pointing(text, ["one"], AT_LANDING)).toEqual([
    { old: VALUES, new: `import { two } from "${AT_HELD}"\nimport { one } from "${AT_LANDING}"` },
  ])
})

test("a line every name leaves is respelled where the body takes no such line", () => {
  const text = `${VALUES}\n`

  expect(pointing(text, ["one", "two"], AT_LANDING)).toEqual([
    { old: VALUES, new: `import { one, two } from "${AT_LANDING}"` },
  ])
})

test("a line bound under a default name is joined by no name", () => {
  const text = `${VALUES}\nimport held, { kept } from "${AT_LANDING}"\n`

  expect(withName(text, parsedAs(AT, text), AT_LANDING, "one", false)).toBe(null)
  expect(pointing(text, ["one"], AT_LANDING)).toEqual([
    { old: VALUES, new: `import { two } from "${AT_HELD}"\nimport { one } from "${AT_LANDING}"` },
  ])
})

test("names joining one line together are each marked as that line and each name ask", () => {
  const text = `${TYPES}\nimport { held } from "${AT_LANDING}"\n`
  const joined = withNames(text, parsedAs(AT, text), AT_LANDING, [
    taking("one", AT_LANDING),
    taking("Kept", AT_LANDING, true),
  ])

  expect(joined?.new).toBe(`import { held, one, type Kept } from "${AT_LANDING}"`)
})

test("a name under another name keeps that name where it joins the line", () => {
  const text = `import { one as held } from "${AT_HELD}"\nimport { kept } from "${AT_LANDING}"\n`

  expect(pointing(text, ["held"], AT_LANDING)[1]?.new).toBe(
    `import { kept, one as held } from "${AT_LANDING}"`
  )
})
