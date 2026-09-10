import { afterAll, expect, test } from "bun:test"
import {
  found as finding,
  judgedAt as judging,
} from "./no-color-literal.code-check.decision.code.ts"
import {
  coded,
  dressed,
  GRANTED_AT,
  HOME,
  PASSING,
  passingAt,
  ROOT,
  reasonsIn,
  rooted,
  scratch,
} from "./no-color-literal.code-check.decision.test-fixtures.ts"

afterAll(scratch.sweep)

function found(path: string, text: string): readonly string[] {
  return finding(PASSING, path, text)
}

function judgedAt(path: string): boolean {
  return judging(PASSING, path)
}

test("a stylesheet reaching a token by name is let through", () => {
  expect(reasonsIn(dressed(".held {\n  color: var(--yellow);\n}\n"))).toEqual([])
})

test("a stylesheet writing a color out is refused, and names the line", () => {
  const said = reasonsIn(dressed(".held {\n  color: #b87b11;\n}\n"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 2")
  expect(said[0]).toContain("#b87b11")
})

test("a color worked out from a token by relative color syntax is let through", () => {
  const body =
    "::selection {\n  background-color: oklch(from var(--color-accent) l c h / 0.15);\n}\n"
  expect(reasonsIn(dressed(body))).toEqual([])
})

test("an achromatic color at an alpha is a shadow rather than a shade of the palette", () => {
  expect(reasonsIn(dressed(".held {\n  box-shadow: 0 1px 3px rgb(0 0 0 / 40%);\n}\n"))).toEqual([])
})

test("an achromatic color among the other words of one value is let through", () => {
  expect(reasonsIn(dressed(".held {\n  border: 1px solid #3a3a3a;\n}\n"))).toEqual([])
})

test("an achromatic color alone in one value is refused", () => {
  expect(reasonsIn(dressed(".held {\n  color: #888888;\n}\n"))).toHaveLength(1)
})

test("a string that is one color on its own is refused", () => {
  const said = reasonsIn(coded('export const ACCENT = "oklch(0.63 0.13 73)"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("line 1")
})

test("a string naming a custom property is let through", () => {
  expect(reasonsIn(coded('export const ACCENT = "var(--yellow)"\n'))).toEqual([])
})

test("a color a color-bearing key carries is refused", () => {
  const said = reasonsIn(coded('const HELD = { borderTop: "1px solid #a51c32" }\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("#a51c32")
})

test("a color inside a utility class's bracketed value is refused", () => {
  const said = reasonsIn(coded('export const HELD = "rounded text-[#2c5a9d] p-2"\n'))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("#2c5a9d")
})

test("an address holding a hash and digits is no color", () => {
  expect(reasonsIn(coded('export const AT = "180 S Main St #100, Bountiful, UT 84010"\n'))).toEqual(
    []
  )
})

test("a value Alan granted a file is let through in that file alone", () => {
  const body = 'const FALLBACK_BACKGROUND = "#e6e4df"\n'
  expect(found(GRANTED_AT, body)).toEqual([])
  expect(found("alan/web/held/held.module.code.ts", body)).toHaveLength(1)
})

test("a value no grant names is refused in a file holding a grant", () => {
  expect(found(GRANTED_AT, 'const OTHER = "#b87b11"\n')).toHaveLength(1)
})

test("the palette's own home is judged by nothing", () => {
  expect(judgedAt("design/system/token-values/token-values.stylesheet.styles.css")).toBe(false)
  expect(found("design/colors/pages/yellow.color.ts", 'const hex = "#b87b11"\n')).toEqual([])
})

test("a test body and a generated body are judged by nothing", () => {
  expect(judgedAt("alan/web/held/held.module.test.ts")).toBe(false)
  expect(judgedAt("pages/core/generated/entries-00/entries-00.module.code.ts")).toBe(false)
  expect(judgedAt("alan/web/held/held.generated.ts")).toBe(false)
})

test("the check's own home is judged by nothing, so the grants it states are no violation", () => {
  expect(judgedAt(`${HOME}no-color-literal.code-check.check.code.ts`)).toBe(false)
  expect(judgedAt(`${HOME}no-color-literal.code-check.decision.code.ts`)).toBe(false)
})

test("a body that is neither code nor a stylesheet is passed over", () => {
  const held = {
    root: ROOT,
    path: "alan/web/notes.md",
    bytes: new TextEncoder().encode('color: "#b87b11"\n'),
  }
  expect(reasonsIn(held)).toEqual([])
})

test("every color a body writes out is reported, one reason each", () => {
  const body = ".one {\n  color: #b87b11;\n}\n.two {\n  color: #a51c32;\n}\n"
  expect(reasonsIn(dressed(body))).toHaveLength(2)
})

test("the palette's home, the check's own home and each grant are read from the index", () => {
  const passing = passingAt(rooted({}))
  expect(passing.palette).toBe("design/")
  expect(passing.home).toBe(HOME)
  expect([...passing.granted.keys()]).toEqual([GRANTED_AT])
})
