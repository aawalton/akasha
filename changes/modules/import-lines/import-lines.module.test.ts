import { expect, test } from "bun:test"
import {
  anchorIn,
  importsIn,
  lineFor,
  namedIn,
  namesIn,
  namingOf,
  openedIn,
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
