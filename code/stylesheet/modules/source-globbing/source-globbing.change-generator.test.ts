import { expect, test } from "bun:test"
import {
  appFor,
  blockFor,
  bodyWith,
  isEntry,
  reachOf,
  rolledTo,
  spelledFrom,
} from "akasha/code/stylesheet/modules/source-globbing/source-globbing.change-generator.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ENTRY = "one/app/app-look/app-look.stylesheet.styles.css"

const ROOTS = new Set(["one/app", "far/other"])

const BODIES: Record<string, string> = {
  "one/app/root.tsx": 'import { look } from "../../design/look/look.module.code.tsx"\n',
  "design/look/look.module.code.tsx": 'import { deep } from "./deep/deep.tsx"\n',
  "design/look/deep/deep.tsx": 'import { gone } from "../../../nowhere/gone.tsx"\n',
  "quiet/quiet.ts": "",
  "one/app/panel.tsx": 'import { drawn } from "../../far/kept/drawings.module.code.ts"\n',
  "far/kept/drawings.module.code.ts":
    'const found = import.meta.glob("../../**/*.drawn-component.code.tsx")\n',
  "wide/screen/screen.drawn-component.code.tsx":
    'import { rail } from "../rail/rail.module.code.tsx"\n',
  "wide/rail/rail.module.code.tsx": "",
  "one/app/lone.tsx": 'import { away } from "../../far/away/away.module.code.ts"\n',
  "far/away/away.module.code.ts": 'const found = import.meta.glob("../../**/*.nowhere.code.tsx")\n',
}

const KNOWN = new Set(Object.keys(BODIES))

const CODED = [...KNOWN]

const INDEX = shadowAt(codeRoot()).index

const bodyAt = (path: string): string | null => BODIES[path] ?? null

const ASKED = { index: INDEX, bodyAt, through: (one: string) => KNOWN.has(one) }

function reachedFrom(seeds: readonly string[]): ReadonlySet<string> {
  return new Set(closureOf(imports, seeds, ASKED))
}

test("a stylesheet whose rules import Tailwind is an entry and one that does not is not", () => {
  expect(isEntry('@import "tailwindcss";\n')).toBe(true)
  expect(isEntry('@import "@akasha/design-system/styles.css";\n')).toBe(false)
})

test("a comment naming Tailwind makes no entry", () => {
  expect(isEntry('/* @import "tailwindcss"; */\n')).toBe(false)
})

test("the app a stylesheet belongs to is the nearest folder above it a vite config sits in", () => {
  expect(appFor(ENTRY, ROOTS)).toBe("one/app")
  expect(appFor("quiet/quiet.ts", ROOTS)).toBe(null)
})

test("a folder a glob names is rolled up to two folders below the root", () => {
  expect(rolledTo("design/look/deep/deep.tsx")).toBe("design/look")
  expect(rolledTo("quiet/quiet.ts")).toBe("quiet")
})

test("what an app reaches is followed through its imports rather than through the manifests", () => {
  const found = reachedFrom(["one/app/root.tsx"])
  expect([...found].sort()).toEqual([
    "design/look/deep/deep.tsx",
    "design/look/look.module.code.tsx",
    "one/app/root.tsx",
  ])
})

test("a name landing on no file in the repository is reached by nothing", () => {
  const found = reachedFrom(["design/look/deep/deep.tsx"])
  expect(found.has("nowhere/gone.tsx")).toBe(false)
})

test("a glob names where a reached tsx sits, and the app's own tree names none", () => {
  const found = reachedFrom(["one/app/root.tsx"])
  expect(blockFor(ENTRY, "one/app", found)).toBe('@source "../../../design/look/**/*.{ts,tsx}";')
})

test("a file a bundler's own glob names is reached, and so is what that file imports", () => {
  const found = reachOf(["one/app/panel.tsx"], CODED, ASKED)
  expect([...found].sort()).toEqual([
    "far/kept/drawings.module.code.ts",
    "one/app/panel.tsx",
    "wide/rail/rail.module.code.tsx",
    "wide/screen/screen.drawn-component.code.tsx",
  ])
})

test("a tree only a glob reaches is named by a glob of its own", () => {
  const found = reachOf(["one/app/panel.tsx"], CODED, ASKED)
  expect(blockFor(ENTRY, "one/app", found)).toBe(
    [
      '@source "../../../wide/rail/**/*.{ts,tsx}";',
      '@source "../../../wide/screen/**/*.{ts,tsx}";',
    ].join("\n")
  )
})

test("what a static import reaches is reached whether or not a glob is met", () => {
  const found = reachOf(["one/app/root.tsx"], CODED, ASKED)
  expect([...found].sort()).toEqual([
    "design/look/deep/deep.tsx",
    "design/look/look.module.code.tsx",
    "one/app/root.tsx",
  ])
})

test("a pattern landing on no file in the repository reaches nothing more", () => {
  const found = reachOf(["one/app/lone.tsx"], CODED, ASKED)
  expect([...found].sort()).toEqual(["far/away/away.module.code.ts", "one/app/lone.tsx"])
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
