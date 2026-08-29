import { expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { Leaving } from "../../../write-system/landing.module.code.ts"
import { wholeOf } from "../../checking.module.code.ts"
import { relationResolves } from "./relation-resolves.check.code.ts"

const SPINE = [
  { at: "page.page-type.ts", value: { extendsSlug: null } },
  { at: "page-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-property-type.page-type.ts", value: { extendsSlug: "page" } },
  { at: "thing.page-type.ts", value: { extendsSlug: "page" } },
  { at: "page-slug.page-property-type.ts", value: { kind: "relation", targetPageTypeSlug: "page" } },
  { at: "part-slugs.page-property-type.ts", value: { kind: "list", entrySlug: "page-slug" } },
  {
    at: "extends-slug.page-property-type.ts",
    value: { kind: "relation", targetPageTypeSlug: "page-type" },
  },
]

let count = 0

function stage(): string {
  count += 1
  const root = mkdtempSync(`${tmpdir()}/akasha-relation-${count}-`)
  for (const one of SPINE) write(root, one.at, one.value)
  return root
}

function bodyOf(at: string, value: Record<string, unknown>): string {
  const named = at.slice(at.lastIndexOf("/") + 1).split(".")[0] ?? "held"
  const key = named.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
  return `export const ${key} = ${JSON.stringify({ slug: named, ...value })}\n`
}

function write(root: string, at: string, value: Record<string, unknown>): void {
  writeFileSync(`${root}/${at}`, bodyOf(at, value))
}

function leavingWith(root: string, at: string, value: Record<string, unknown> | null): Leaving {
  return {
    root,
    changed: [`${root}/${at}`],
    at: (path) => {
      if (path === `${root}/${at}`) {
        return value === null ? null : Buffer.from(bodyOf(at, value), "utf8")
      }
      try {
        return require("node:fs").readFileSync(path) as Uint8Array
      } catch {
        return null
      }
    },
  }
}

test("a relation naming no page is a finding against the page that names it", () => {
  const root = stage()
  const said = relationResolves(wholeOf(leavingWith(root, "loose.page-type.ts", { extendsSlug: "nowhere" })))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(`${root}/loose.page-type.ts`)
  expect(said[0]?.reason).toContain("no page carries that slug")
  rmSync(root, { recursive: true })
})

test("a relation naming a page of a type it may not name says which type it found", () => {
  const root = stage()
  write(root, "leaf.thing.ts", {})
  const said = relationResolves(wholeOf(leavingWith(root, "loose.page-type.ts", { extendsSlug: "leaf" })))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("may name a `page-type`")
  expect(said[0]?.reason).toContain("is a `thing`")
  rmSync(root, { recursive: true })
})

test("a change the corpus would refuse outright is one finding, not none", () => {
  const root = stage()
  const said = relationResolves(wholeOf(leavingWith(root, "whole.thing.ts", { partSlugs: ["missing"] })))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("missing")
  rmSync(root, { recursive: true })
})

test("a finding names the file where it is, never the folder the tree was kept in", () => {
  const root = stage()
  const said = relationResolves(wholeOf(leavingWith(root, "loose.page-type.ts", { extendsSlug: "nowhere" })))
  for (const one of said) expect(one.path.startsWith(`${root}/`)).toBe(true)
  rmSync(root, { recursive: true })
})

test("a change leaving every relation resolved is judged clean", () => {
  const root = stage()
  const said = relationResolves(wholeOf(leavingWith(root, "loose.page-type.ts", { extendsSlug: "page" })))
  expect(said).toEqual([])
  rmSync(root, { recursive: true })
})

test("a page the change takes away is not judged, and nothing it named is missed for it", () => {
  const root = stage()
  write(root, "gone.page-type.ts", { extendsSlug: "nowhere" })
  const said = relationResolves(wholeOf(leavingWith(root, "gone.page-type.ts", null)))
  expect(said).toEqual([])
  rmSync(root, { recursive: true })
})
