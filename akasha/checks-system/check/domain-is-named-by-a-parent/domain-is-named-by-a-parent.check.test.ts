import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  domainIsNamedByAParent,
  domainSlugOf,
  reasonsIn,
} from "./domain-is-named-by-a-parent.check.code.ts"

const INDEX = join(".git", "data", "index")

const DOMAIN = "domain"

const ONE = "01a04d5f-c731-7001-8000-000000000001"

const TWO = "01a04d5f-c731-7002-8000-000000000002"

const held: string[] = []

afterAll(() => {
  for (const one of held) rmSync(one, { recursive: true, force: true })
})

function rooted(): string {
  const root = mkdtempSync(join(tmpdir(), "akasha-parented-"))
  held.push(root)
  return root
}

function standing(root: string, slug: string, id: string): void {
  const dir = join(root, INDEX, "identity", DOMAIN, "slug")
  mkdirSync(dir, { recursive: true })
  const line = JSON.stringify({ path: `akasha/${slug}.domain.ts`, id })
  writeFileSync(join(dir, `${slug}.jsonl`), `${line}\n`, "utf8")
}

function twice(root: string, slug: string, one: string, two: string): void {
  const dir = join(root, INDEX, "identity", DOMAIN, "slug")
  mkdirSync(dir, { recursive: true })
  const said = [one, two].map((id) => JSON.stringify({ path: `akasha/${slug}.domain.ts`, id }))
  writeFileSync(join(dir, `${slug}.jsonl`), `${said.join("\n")}\n`, "utf8")
}

function edging(root: string, id: string, propertySlug: string, from: string): void {
  const dir = join(root, INDEX, "relation", "page", "id", id, propertySlug)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, `${from}.jsonl`), `${JSON.stringify({ path: "akasha/up.domain.ts" })}\n`)
}

const NO_BYTES = new Uint8Array(0)

function at(root: string, path: string) {
  return { root, path, bytes: NO_BYTES }
}

function arriving(root: string, path: string) {
  return { root, changed: [path], at: () => NO_BYTES, was: () => NO_BYTES }
}

function taking(root: string, path: string) {
  return { root, changed: [path], at: () => null, was: () => NO_BYTES }
}

test("a domain some page names among its parts is let through", () => {
  const root = rooted()
  standing(root, "held", ONE)
  edging(root, ONE, "part-slugs", TWO)
  expect(reasonsIn(at(root, "akasha/held/held.domain.ts"))).toEqual([])
})

test("a domain no page names is refused, and the refusal names the slug", () => {
  const root = rooted()
  standing(root, "held", ONE)
  const said = reasonsIn(at(root, "akasha/held/held.domain.ts"))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`domain/held`")
  expect(said[0]).toContain("part of a domain above it")
})

test("a domain the change takes away is passed over rather than asked who names it", () => {
  const root = rooted()
  standing(root, "held", ONE)
  expect(domainIsNamedByAParent(arriving(root, "akasha/held/held.domain.ts"))).toHaveLength(1)
  expect(domainIsNamedByAParent(taking(root, "akasha/held/held.domain.ts"))).toEqual([])
})

test("a domain taken away whose slug the index no longer answers is passed over, not thrown on", () => {
  const root = rooted()
  expect(() => domainIsNamedByAParent(arriving(root, "akasha/gone/gone.domain.ts"))).toThrow()
  expect(domainIsNamedByAParent(taking(root, "akasha/gone/gone.domain.ts"))).toEqual([])
})

test("a directory of edges standing empty is no page naming it", () => {
  const root = rooted()
  standing(root, "held", ONE)
  mkdirSync(join(root, INDEX, "relation", "page", "id", ONE, "part-slugs"), { recursive: true })
  expect(reasonsIn(at(root, "akasha/held.domain.ts"))).toHaveLength(1)
})

test("an edge filed under another property is not a page naming it among its parts", () => {
  const root = rooted()
  standing(root, "held", ONE)
  edging(root, ONE, "domain-slug", TWO)
  expect(reasonsIn(at(root, "akasha/held.domain.ts"))).toHaveLength(1)
})

test("akasha-system stands under nothing, so it alone is passed over", () => {
  const root = rooted()
  standing(root, "akasha-system", ONE)
  expect(reasonsIn(at(root, "akasha/akasha-system/akasha-system.domain.ts"))).toEqual([])
})

test("a page whose page type merely descends from domain is not judged", () => {
  const root = rooted()
  for (const path of [
    "akasha/checks-system/check/one/one.check.ts",
    "akasha/code-system/module/module.page-type.ts",
    "akasha/pages-system/index/indexing.module.ts",
    "akasha/command-system/command/write/write.command.ts",
  ]) {
    expect(reasonsIn(at(root, path))).toEqual([])
  }
})

test("a file that is no page's shape is passed over", () => {
  const root = rooted()
  expect(reasonsIn(at(root, "akasha/notes.txt"))).toEqual([])
  expect(reasonsIn(at(root, "akasha/README"))).toEqual([])
})

test("a file outside the akasha folder is not this check's business", () => {
  const root = rooted()
  expect(reasonsIn(at(root, "pages/domain/held.domain.ts"))).toEqual([])
})

test("a domain the index answers no page to is thrown on rather than passed", () => {
  const root = rooted()
  expect(() => reasonsIn(at(root, "akasha/held.domain.ts"))).toThrow("the index answers 0 pages")
})

test("a domain the index answers two pages to is thrown on rather than passed", () => {
  const root = rooted()
  twice(root, "held", ONE, TWO)
  edging(root, ONE, "part-slugs", TWO)
  expect(() => reasonsIn(at(root, "akasha/held.domain.ts"))).toThrow("the index answers 2 pages")
})

test("the check reads the index under the root it was given, and no other", () => {
  const named = rooted()
  standing(named, "held", ONE)
  edging(named, ONE, "part-slugs", TWO)
  const bare = rooted()
  standing(bare, "held", ONE)
  expect(reasonsIn(at(named, "akasha/held.domain.ts"))).toEqual([])
  expect(reasonsIn(at(bare, "akasha/held.domain.ts"))).toHaveLength(1)
})

test("the slug is the file's stem and the page type its suffix", () => {
  expect(domainSlugOf("akasha/a/b/index-relation.domain.ts")).toBe("index-relation")
  expect(domainSlugOf("akasha/held.module.ts")).toBeNull()
  expect(domainSlugOf("akasha/held.module.code.ts")).toBeNull()
  expect(domainSlugOf("held.domain.ts")).toBeNull()
})

test("a stem carrying a dot is bound whole to the slug", () => {
  expect(domainSlugOf("akasha/a.b.domain.ts")).toBe("a.b")
})
