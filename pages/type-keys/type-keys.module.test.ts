import { expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { Glob } from "bun"
import { codeRoot } from "../code-root/code-root.module.code.ts"
import {
  composesAPageType,
  linesComposingOneKey,
  statesTheTypeKey,
} from "./type-keys.module.code.ts"

const ROOT = codeRoot()

const CODE = "**/*.code.ts"

const OUTSIDE = "node_modules"

function foldersUnderRoot(): readonly string[] {
  const found: string[] = []
  for (const entry of readdirSync(ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith(".") || entry.name === OUTSIDE) continue
    found.push(entry.name)
  }
  return found
}

function codeUnderRoot(): readonly string[] {
  const found: string[] = []
  for (const folder of foldersUnderRoot()) {
    for (const path of new Glob(CODE).scanSync(join(ROOT, folder))) {
      if (path.includes(OUTSIDE)) continue
      found.push(join(folder, path))
    }
  }
  return found
}

test("a composed page type line is told apart from a key a signature declares", () => {
  expect(composesAPageType("    `  pageTypeSlug: ${slug},`,")).toBe(true)
  expect(composesAPageType("    '  pageTypeSlug: \"subagent\",',")).toBe(true)
  expect(composesAPageType("  readonly pageTypeSlug: string")).toBe(false)
  expect(composesAPageType("    pageTypeSlug: PAGE_TYPE,")).toBe(false)
})

test("the type key is read off the line after the page type line", () => {
  expect(statesTheTypeKey("    `  type: ${slug},`,")).toBe(true)
  expect(statesTheTypeKey("    `  slug: ${slug},`,")).toBe(false)
})

test("a composer stating only the older key is named by the line it states it on", () => {
  const body = [
    "const lines = [",
    "  `  pageTypeSlug: ${slug},`,",
    "  `  slug: ${slug},`,",
    "]",
  ].join("\n")
  expect(linesComposingOneKey(body)).toEqual([2])
})

test("a composer stating both keys is named by nothing", () => {
  const body = [
    "const lines = [",
    "  `  pageTypeSlug: ${slug},`,",
    "  `  type: ${slug},`,",
    "  `  slug: ${slug},`,",
    "]",
  ].join("\n")
  expect(linesComposingOneKey(body)).toEqual([])
})

test("no code in this repository composes a page body stating only the older key", () => {
  const found: string[] = []
  for (const path of codeUnderRoot()) {
    for (const line of linesComposingOneKey(readFileSync(join(ROOT, path), "utf8"))) {
      found.push(`${path}:${line}`)
    }
  }
  expect(found).toEqual([])
})
