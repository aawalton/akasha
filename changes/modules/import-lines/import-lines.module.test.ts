import { expect, test } from "bun:test"
import {
  anchorIn,
  everyFor,
  everyIn,
  importsIn,
  lineFor,
  linesOf,
  namedIn,
  namesIn,
  namingOf,
  namingsIn,
  openedIn,
  withName,
  withoutName,
  withoutOne,
} from "akasha/changes/modules/import-lines/import-lines.module.code.ts"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
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

test("an import line names a type only where what it names is a type", () => {
  expect(lineFor("one", "./one.module.code.ts", false)).toBe(ONE)
  expect(lineFor("Held", "./held.module.code.ts", true)).toBe(
    'import type { Held } from "./held.module.code.ts"'
  )
})

test("a name taken out of a line leaves the other names that line carries", () => {
  const text = 'import { one, two } from "./held.module.code.ts"\n'
  const line = lineAt(text, 0)
  const bound = line === null ? null : namedIn(line)
  const gone = bound?.elements.find((each) => each.name.text === "one")
  const left =
    line === null || bound === null || gone === undefined
      ? "unfound"
      : withoutOne(text, line, bound, gone)

  expect(left).toBe('import { two } from "./held.module.code.ts"')
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

test("taking the only name a line carries leaves no line", () => {
  const one = `${ONE}\n${EVERY_LINE}\n`
  const two = 'import { one, two } from "./held.module.code.ts"\n'

  expect(withoutName(one, parsedAs(AT, one), "held")).toEqual({ old: `${EVERY_LINE}\n`, new: "" })
  expect(withoutName(two, parsedAs(AT, two), "one")?.new).toBe(
    'import { two } from "./held.module.code.ts"'
  )
  expect(withoutName(one, parsedAs(AT, one), "missing")).toBe(null)
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

test("a body taking nothing from that path, or already naming it, is left whole", () => {
  const text = `${VALUES}\n`
  const source = parsedAs(AT, text)

  expect(withName(text, source, "./other.module.code.ts", "three", false)).toBe(null)
  expect(withName(text, source, AT_HELD, "one", false)).toBe(null)
})
