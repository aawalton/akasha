import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import type { CheckFailure, Tree } from "../check-shape.ts"
import everyPageTypeRegistered from "./every-page-type-registered.check.code.attachment.ts"

const REGISTRY = "akasha/pages-system/page-type/every-page-type.module.code.ts"

const PAGE = "akasha/pages-system/page-type/page.page-type.ts"

const DOMAIN = "akasha/domain-system/domain/domain.page-type.ts"

const HOLDS = `export const held = { slug: "x" }\n`

function filesIn(at: string): readonly string[] {
  const found: string[] = []
  for (const entry of readdirSync(at, { withFileTypes: true })) {
    const here = `${at}/${entry.name}`
    if (entry.isDirectory()) found.push(...filesIn(here))
    else found.push(here)
  }
  return found
}

function treeOver(root: string): Tree {
  const paths = filesIn(root)
  return {
    root,
    at: (path) => (paths.includes(path) ? readFileSync(path) : null),
    paths: () => paths,
    gone: () => [],
    goneElsewhere: () => [],
    repointedElsewhere: () => new Map(),
    dir: () => root,
  }
}

function verdict(files: Record<string, string>): readonly CheckFailure[] {
  const root = mkdtempSync(join(tmpdir(), "every-page-type-registered-"))
  for (const [at, body] of Object.entries(files)) {
    const to = resolve(root, at)
    mkdirSync(dirname(to), { recursive: true })
    writeFileSync(to, body)
  }
  const said = everyPageTypeRegistered.run({ root, paths: [], tree: treeOver(root), keep: () => root })
  return said.map((one) => ({ path: relative(root, one.path), reason: one.reason }))
}

const BOTH =
  `import { page } from "./page.page-type.ts"\n` +
  `import { domain } from "../../domain-system/domain/domain.page-type.ts"\n` +
  `export const everyPageType = { page, domain } as const\n`

test("a registry naming every page type on disk passes", () => {
  expect(verdict({ [REGISTRY]: BOTH, [PAGE]: HOLDS, [DOMAIN]: HOLDS })).toEqual([])
})

test("a page type on disk the registry does not import fails, naming the file", () => {
  const only =
    `import { page } from "./page.page-type.ts"\n` +
    `export const everyPageType = { page } as const\n`
  const said = verdict({ [REGISTRY]: only, [PAGE]: HOLDS, [DOMAIN]: HOLDS })
  expect(said.map((one) => one.path)).toEqual([DOMAIN])
  expect(said[0]?.reason ?? "").toContain("admits a bare identifier again")
})

test("an import naming no file fails", () => {
  const said = verdict({ [REGISTRY]: BOTH, [PAGE]: HOLDS })
  expect(said.some((one) => one.reason.includes("names a page type that is not there"))).toBe(true)
})

test("a page type imported but absent from the object fails", () => {
  const held =
    `import { page } from "./page.page-type.ts"\n` +
    `import { domain } from "../../domain-system/domain/domain.page-type.ts"\n` +
    `export const everyPageType = { page } as const\n`
  const said = verdict({ [REGISTRY]: held, [PAGE]: HOLDS, [DOMAIN]: HOLDS })
  expect(said.length).toBe(1)
  expect(said[0]?.reason ?? "").toContain("`domain`")
  expect(said[0]?.reason ?? "").toContain("read as registered")
})

test("an entry in the object nothing imports fails", () => {
  const held =
    `import { page } from "./page.page-type.ts"\n` +
    `import { domain } from "../../domain-system/domain/domain.page-type.ts"\n` +
    `export const everyPageType = { page, domain, module } as const\n`
  const said = verdict({ [REGISTRY]: held, [PAGE]: HOLDS, [DOMAIN]: HOLDS })
  expect(said.some((one) => one.reason.includes("names no page type"))).toBe(true)
})

test("a tree with no registry fails, rather than passing unjudged", () => {
  const said = verdict({ [PAGE]: HOLDS, [DOMAIN]: HOLDS })
  expect(said.length).toBe(1)
  expect(said[0]?.reason ?? "").toContain("the page-type registry is not here")
})

test("the object is read through an `as const` assertion", () => {
  const bare =
    `import { page } from "./page.page-type.ts"\n` +
    `import { domain } from "../../domain-system/domain/domain.page-type.ts"\n` +
    `export const everyPageType = { page, domain }\n`
  expect(verdict({ [REGISTRY]: bare, [PAGE]: HOLDS, [DOMAIN]: HOLDS })).toEqual([])
})

test("an import that is not a page type is not judged", () => {
  const held =
    `import { readFileSync } from "node:fs"\n` +
    `import { page } from "./page.page-type.ts"\n` +
    `import { domain } from "../../domain-system/domain/domain.page-type.ts"\n` +
    `export const everyPageType = { page, domain } as const\n`
  expect(verdict({ [REGISTRY]: held, [PAGE]: HOLDS, [DOMAIN]: HOLDS })).toEqual([])
})
