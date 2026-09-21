import { expect, test } from "bun:test"
import {
  endsAList,
  indentLength,
  openedLinePrefix,
} from "akasha/code/editor/extension/modules/opened-line-prefix/opened-line-prefix.module.code.ts"

test("a line with no indent and no marker opens a line with no prefix", () => {
  expect(openedLinePrefix("foo")).toBe("")
})

test("an empty line opens a line with no prefix", () => {
  expect(openedLinePrefix("")).toBe("")
})

test("an indented line opens a line with that same indent", () => {
  expect(openedLinePrefix("    foo")).toBe("    ")
  expect(openedLinePrefix("  foo bar")).toBe("  ")
})

test("an indent of tabs is carried as tabs", () => {
  expect(openedLinePrefix("\t\tfoo")).toBe("\t\t")
  expect(openedLinePrefix("\t  foo")).toBe("\t  ")
})

test("each bullet marker is carried", () => {
  expect(openedLinePrefix("- foo")).toBe("- ")
  expect(openedLinePrefix("* foo")).toBe("* ")
  expect(openedLinePrefix("+ foo")).toBe("+ ")
})

test("a bullet carries its indent and the spacing after its marker", () => {
  expect(openedLinePrefix("  -   foo")).toBe("  -   ")
})

test("a numbered item opens the next number", () => {
  expect(openedLinePrefix("3. foo")).toBe("4. ")
})

test("a numbered item keeps a closing parenthesis as its delimiter", () => {
  expect(openedLinePrefix("  10) foo")).toBe("  11) ")
})

test("a number rolls from nine to ten", () => {
  expect(openedLinePrefix("9. foo")).toBe("10. ")
})

test("an indented numbered item carries its indent", () => {
  expect(openedLinePrefix("    2. foo")).toBe("    3. ")
})

test("a bullet with nothing after it ends the list", () => {
  expect(openedLinePrefix("- ")).toBe("")
  expect(openedLinePrefix("  - ")).toBe("  ")
})

test("a numbered item with nothing after it ends the list", () => {
  expect(openedLinePrefix("3. ")).toBe("")
  expect(openedLinePrefix("  10) ")).toBe("  ")
})

test("a marker with no space after it is no marker", () => {
  expect(openedLinePrefix("-foo")).toBe("")
  expect(openedLinePrefix("  3.foo")).toBe("  ")
})

test("a checkbox is carried as the bullet it opens with", () => {
  expect(openedLinePrefix("- [ ] foo")).toBe("- ")
})

test("an item holding only its marker ends a list, the spacing after it or not", () => {
  expect(endsAList("3.")).toBe(true)
  expect(endsAList("3. ")).toBe(true)
  expect(endsAList("  10)")).toBe(true)
  expect(endsAList("-")).toBe(true)
  expect(endsAList("\t* ")).toBe(true)
})

test("an item carrying words ends no list", () => {
  expect(endsAList("3. foo")).toBe(false)
  expect(endsAList("- foo")).toBe(false)
})

test("a line that is no item ends no list", () => {
  expect(endsAList("")).toBe(false)
  expect(endsAList("  ")).toBe(false)
  expect(endsAList("foo")).toBe(false)
  expect(endsAList("3")).toBe(false)
})

test("the indent is counted in characters", () => {
  expect(indentLength("foo")).toBe(0)
  expect(indentLength("  3. foo")).toBe(2)
  expect(indentLength("\t\t")).toBe(2)
})
