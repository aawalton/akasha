import { expect, test } from "bun:test"
import {
  blockFor,
  bodyWith,
  isEntry,
  ownerOf,
  type Reached,
  reachedFrom,
  spelledFrom,
} from "./source-globbing.module.code.ts"

const PACKAGES: readonly Reached[] = [
  { name: "@a/app", at: "one/app", depends: ["@a/look", "@a/quiet"] },
  { name: "@a/look", at: "design/look", depends: ["@a/deep"] },
  { name: "@a/deep", at: "design/look/deep", depends: [] },
  { name: "@a/quiet", at: "quiet", depends: [] },
  { name: "@a/far", at: "far", depends: [] },
]

const DRAWING = new Set(["@a/look", "@a/deep", "@a/far"])

const ENTRY = "one/app/app-look/app-look.stylesheet.styles.css"

test("a stylesheet whose rules import Tailwind is an entry and one that does not is not", () => {
  expect(isEntry('@import "tailwindcss";\n')).toBe(true)
  expect(isEntry('@import "@akasha/design-system/styles.css";\n')).toBe(false)
})

test("a comment naming Tailwind makes no entry", () => {
  expect(isEntry('/* @import "tailwindcss"; */\n')).toBe(false)
})

test("the package owning a path is the one whose folder reaches furthest into it", () => {
  expect(ownerOf("design/look/deep/one.tsx", PACKAGES)?.name).toBe("@a/deep")
  expect(ownerOf("design/look/one.tsx", PACKAGES)?.name).toBe("@a/look")
  expect(ownerOf("nowhere/one.tsx", PACKAGES)).toBe(null)
})

test("the packages reached are the closure rather than the manifest's own line", () => {
  expect([...reachedFrom(PACKAGES, "@a/app")].sort()).toEqual(["@a/deep", "@a/look", "@a/quiet"])
})

test("a package no browser draws from and a package outside the closure name no glob", () => {
  expect(blockFor(ENTRY, PACKAGES, DRAWING)).toBe('@source "../../../design/look/**/*.{ts,tsx}";')
})

test("a glob is spelled against the folder the stylesheet sits in", () => {
  expect(spelledFrom("one/app/app-look", "design/look")).toBe("../../../design/look")
  expect(spelledFrom("one/app/app-look", "one/app/app-look")).toBe(".")
})

test("the globs take the place the first of them held", () => {
  const was = [
    '@import "tailwindcss";',
    "",
    '@source "../gone/**/*.{ts,tsx}";',
    '@source "../also-gone/**/*.{ts,tsx}";',
    "",
    "@theme {",
    "}",
    "",
  ].join("\n")
  expect(bodyWith(was, '@source "../here/**/*.{ts,tsx}";')).toBe(
    [
      '@import "tailwindcss";',
      "",
      '@source "../here/**/*.{ts,tsx}";',
      "",
      "@theme {",
      "}",
      "",
    ].join("\n")
  )
})

test("a stylesheet holding no glob takes the globs after its last import", () => {
  const was = ['@import "tailwindcss";', '@import "beside.css";', "", "@theme {", "}", ""].join(
    "\n"
  )
  expect(bodyWith(was, '@source "../here/**/*.{ts,tsx}";')).toBe(
    [
      '@import "tailwindcss";',
      '@import "beside.css";',
      '@source "../here/**/*.{ts,tsx}";',
      "",
      "@theme {",
      "}",
      "",
    ].join("\n")
  )
})

test("an inline source list is left where its author put it", () => {
  const was = [
    '@import "tailwindcss";',
    "",
    '@source "../gone/**/*.{ts,tsx}";',
    '@source inline("mt-2");',
    "",
  ].join("\n")
  expect(bodyWith(was, '@source "../here/**/*.{ts,tsx}";')).toBe(
    [
      '@import "tailwindcss";',
      "",
      '@source "../here/**/*.{ts,tsx}";',
      '@source inline("mt-2");',
      "",
    ].join("\n")
  )
})

test("writing the same globs again leaves the body as the body was", () => {
  const was = ['@import "tailwindcss";', "", '@source "../here/**/*.{ts,tsx}";', ""].join("\n")
  expect(bodyWith(was, '@source "../here/**/*.{ts,tsx}";')).toBe(was)
})
