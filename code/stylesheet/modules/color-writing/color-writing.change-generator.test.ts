import { expect, test } from "bun:test"
import {
  type Hued,
  writtenInto,
} from "akasha/code/stylesheet/modules/color-writing/color-writing.change-generator.code.ts"

const AT = "look/look.stylesheet.styles.css"

const STATED = [
  ":root {",
  "  --surface-0: #000000;",
  "  --surface-1: #141414;",
  "",
  "  --shadow-xs: 0 1px 2px 0 oklch(from var(--surface-0) l c h / 0.45);",
  "",
  "  --primary: #d7d7d7;",
  "  --radius: 0.5rem;",
  "}",
  "",
].join("\n")

const HUED: readonly Hued[] = [
  { name: "surface-0", color: "soot", hex: "#010101" },
  { name: "surface-1", color: "charcoal", hex: "#141414" },
  { name: "primary", color: "chalk", hex: "#d7d7d7" },
]

test("each custom property named is written the hex its color page states", () => {
  const written = writtenInto(STATED, HUED, AT)

  expect(written.body).toBe(STATED.replace("--surface-0: #000000;", "--surface-0: #010101;"))
  expect(written.said).toEqual([])
})

test("a custom property reached only through another is left as it is", () => {
  const written = writtenInto(STATED, HUED, AT)

  expect(written.body).toContain("oklch(from var(--surface-0) l c h / 0.45)")
})

test("rules already holding every hex are written the same", () => {
  const once = writtenInto(STATED, HUED, AT).body

  expect(writtenInto(once, HUED, AT).body).toBe(once)
})

test("a custom property the rules do not declare is said and written nowhere", () => {
  const written = writtenInto(STATED, [{ name: "red", color: "red", hex: "#a51c32" }], AT)

  expect(written.body).toBe(STATED)
  expect(written.said).toEqual([
    "`look/look.stylesheet.styles.css` declares no `--red`, so `color/red` is written nowhere",
  ])
})

test("a color page stating no hex leaves its custom property as it is", () => {
  const written = writtenInto(STATED, [{ name: "primary", color: "text", hex: null }], AT)

  expect(written.body).toBe(STATED)
  expect(written.said).toEqual([
    "`--primary` in `look/look.stylesheet.styles.css` is left as it is — `color/text` states no hex",
  ])
})

test("a name that only begins another custom property's name reaches nothing", () => {
  const written = writtenInto(STATED, [{ name: "surface", color: "ash", hex: "#3a3a3a" }], AT)

  expect(written.body).toBe(STATED)
})

const LIT = [
  ":root {",
  "  --surface-0: #000000;",
  "  --primary: #d7d7d7;",
  "}",
  "",
  ':root[data-scheme="light"] {',
  "  color-scheme: light;",
  "  --surface-0: #000000;",
  "}",
  "",
].join("\n")

test("a light hex is written into the light rule and the hex into the rule before it", () => {
  const written = writtenInto(
    LIT,
    [{ name: "surface-0", color: "soot", hex: "#010101", lightHex: "#ffffff" }],
    AT
  )

  expect(written.body).toBe(
    LIT.replace("--surface-0: #000000;", "--surface-0: #010101;").replace(
      "--surface-0: #000000;",
      "--surface-0: #ffffff;"
    )
  )
  expect(written.said).toEqual([])
})

test("a color stating no light hex leaves the light rule as it is", () => {
  const written = writtenInto(LIT, [{ name: "primary", color: "chalk", hex: "#d7d7d7" }], AT)

  expect(written.body).toBe(LIT)
  expect(written.said).toEqual([])
})

test("a light hex the light rule does not declare is said and written nowhere", () => {
  const written = writtenInto(
    LIT,
    [{ name: "primary", color: "chalk", hex: "#d7d7d7", lightHex: "#1a1a1a" }],
    AT
  )

  expect(written.body).toBe(LIT)
  expect(written.said).toEqual([
    "the light rule in `look/look.stylesheet.styles.css` declares no `--primary`, so the light hex of `color/chalk` is written nowhere",
  ])
})

const NESTED = [
  ":root,",
  '[data-scheme="dark"] {',
  "  --surface-0: #000000;",
  "}",
  "",
  ':root[data-scheme="light"],',
  '[data-scheme="light"] {',
  "  --surface-0: #000000;",
  "}",
  "",
].join("\n")

test("a light rule that also names any element whose scheme is light is written as one rule", () => {
  const written = writtenInto(
    NESTED,
    [{ name: "surface-0", color: "soot", hex: "#010101", lightHex: "#ffffff" }],
    AT
  )

  expect(written.body).toBe(
    NESTED.replace("--surface-0: #000000;", "--surface-0: #010101;").replace(
      "--surface-0: #000000;",
      "--surface-0: #ffffff;"
    )
  )
  expect(written.said).toEqual([])
})

test("rules with no light rule never write a light hex", () => {
  const written = writtenInto(
    STATED,
    [{ name: "surface-0", color: "soot", hex: "#010101", lightHex: "#ffffff" }],
    AT
  )

  expect(written.body).not.toContain("#ffffff")
})
