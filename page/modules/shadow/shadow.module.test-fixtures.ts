import { cpSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { put, there } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { pagesAt } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import { keepingIn } from "akasha/page/index/modules/indexing/indexing.module.code.ts"
import { refreshedIn } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  aType,
  bodyOf,
  type Held,
  idOf,
  NAMER_PAGE,
  type Named,
  VOCABULARY,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { type Cast, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

export const scratch = scratchWorld()

const AKASHA = "akasha"

export const TEXT = new TextEncoder()

type Written = {
  readonly path: string
  readonly body: string | null
}

const PAGES: readonly Named[] = [
  ...VOCABULARY,
  ["b.domain.ts", { id: idOf("b"), type: `${pageType.slug}/domain`, slug: "b" }],
  ["g.domain.ts", { id: idOf("g"), type: `${pageType.slug}/domain`, slug: "g" }],
  ["deep/d.module.ts", { id: idOf("d"), type: `${pageType.slug}/module`, slug: "d", code: "ts" }],
  ["one/same.domain.ts", { id: idOf("e"), type: `${pageType.slug}/domain`, slug: "same" }],
  ["two/same.domain.ts", { id: idOf("f"), type: `${pageType.slug}/domain`, slug: "same" }],
]

const IMPORTS_X = 'import { x } from "./x.ts"\n'

const BODIES: readonly (readonly [string, string])[] = [
  ["x.ts", "export const x = 1\n"],
  ["p.ts", IMPORTS_X],
  ["q.ts", IMPORTS_X],
  ["r.ts", IMPORTS_X],
  ["deep/d.module.code.ts", "export const d = 1\n"],
]

export function seeded(): string {
  const repo = scratch.rootFor("akasha-shadow-")
  for (const [at, value] of PAGES) put(repo, join(AKASHA, at), bodyOf(value))
  for (const [at, body] of BODIES) put(repo, join(AKASHA, at), body)
  refreshedIn(repo, AKASHA)
  return repo
}

export function inside(at: string): string {
  return join(AKASHA, at)
}

export function aChange(at: string, value: Held | null): Written {
  return { path: inside(at), body: value === null ? null : bodyOf(value) }
}

const NOTE: Held = {
  id: idOf("n"),
  type: `${pageType.slug}/relation-property`,
  slug: "note",
  propertySlug: "note",
  targetPageType: "domain",
}

export const CHANGES: readonly Written[] = [
  aChange("one/same.domain.ts", null),
  aChange("deep/d.module.ts", null),
  { path: inside("deep/d.module.code.ts"), body: null },
  { path: inside("q.ts"), body: null },
  { path: inside("s.ts"), body: IMPORTS_X },
  { path: inside("r.ts"), body: 'import { p } from "./p.ts"\n' },
  aChange("note.relation-property.ts", NOTE),
  aChange("b.domain.ts", {
    id: idOf("b"),
    type: `${pageType.slug}/domain`,
    slug: "b",
    note: "domain/g",
  }),
  aChange("tag.page-type.ts", {
    id: idOf("t"),
    type: `${pageType.slug}/${pageType.slug}`,
    slug: "tag",
    extends: [`${pageType.slug}/${domain.slug}`],
  }),
  aChange("h.tag.ts", { id: idOf("h"), type: "page-type/tag", slug: "h", note: "domain/b" }),
]

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => (there(root, path) ? readFileSync(join(root, path)) : null)
}

export function changeOver(root: string, changes: readonly Written[]): Change {
  const held = new Map<string, string | null>()
  for (const one of changes) held.set(one.path, one.body)
  const was = onDisk(root)
  return {
    root,
    changed: [...held.keys()].sort(),
    before: was,
    after: (path) => {
      if (!held.has(path)) return was(path)
      const body = held.get(path) ?? null
      return body === null ? null : TEXT.encode(body)
    },
  }
}

export function landedInto(root: string, changes: readonly Written[]): string {
  const twin = scratch.rootFor("akasha-landed-")
  rmSync(twin, { recursive: true, force: true })
  cpSync(root, twin, { recursive: true })
  const bytesAt = onDisk(twin)
  const before = new Map<string, string | null>()
  for (const one of changes) {
    const bytes = bytesAt(one.path)
    before.set(one.path, bytes === null ? null : new TextDecoder().decode(bytes))
  }
  const indexing = keepingIn(twin)
  for (const one of changes) {
    const was = before.get(one.path) ?? null
    if (one.body === null) {
      rmSync(join(twin, one.path), { force: true })
      indexing.took(one.path, was)
      continue
    }
    put(twin, one.path, one.body)
    indexing.wrote(one.path, one.body, was)
  }
  indexing.settle()
  return twin
}

export function shadowOf(cast: Cast): Reading {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.reading
}

export const NAME_AT = "name.text-property.ts"

export const SHARED_AT = "k.domain.ts"

const SHARED: Held = { id: idOf("k"), type: `${pageType.slug}/domain`, slug: "k", name: "shared" }

export function naming(unique: string | null): Held {
  const held: Held = {
    id: idOf("m"),
    type: `${pageType.slug}/text-property`,
    slug: "name",
    propertySlug: "name",
  }
  return unique === null ? held : { ...held, unique }
}

export function seededNaming(): string {
  const repo = scratch.rootFor("akasha-naming-")
  for (const [at, value] of PAGES) put(repo, join(AKASHA, at), bodyOf(value))
  const [namingAt, named] = aType("1", "domain", ["page"], ["name"])
  put(repo, join(AKASHA, namingAt), bodyOf(named))
  put(repo, join(AKASHA, NAME_AT), bodyOf(naming("page")))
  put(repo, join(AKASHA, SHARED_AT), bodyOf(SHARED))
  refreshedIn(repo, AKASHA)
  return repo
}

export const CODE_AT = inside("deep/d.module.code.ts")

export const MOVED_TO = inside("far/d.module.code.ts")

export function carriedOver(root: string): Change {
  const was = onDisk(root)
  const held = was(CODE_AT)
  return {
    root,
    changed: [CODE_AT, MOVED_TO, inside("fresh.ts")],
    before: was,
    after: (path) => {
      if (path === CODE_AT) return null
      if (path === MOVED_TO) return held
      if (path === inside("fresh.ts")) return TEXT.encode("export const fresh = 1\n")
      return was(path)
    },
  }
}

export function deployedOver(root: string): Change {
  const held = onDisk(root)
  return {
    root,
    changed: [CODE_AT],
    before: (path) => (path === CODE_AT ? null : held(path)),
    after: held,
  }
}

export function rewrittenOver(root: string): Change {
  const was = onDisk(root)
  return {
    root,
    changed: [CODE_AT],
    before: was,
    after: (path) => (path === CODE_AT ? TEXT.encode("export const d = 2\n") : was(path)),
  }
}

export function codeOf(cast: Cast): (path: string) => string | null {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow.codeAt
}

export function committedIn(root: string): undefined {
  said(root, ["init", "-q"])
  said(root, ["config", "user.email", "shadow@nowhere"])
  said(root, ["config", "user.name", "Shadow"])
  said(root, ["config", "commit.gpgsign", "false"])
  said(root, ["add", "-A"])
  said(root, ["commit", "-q", "-m", "seeded"])
}

export function basedAside(root: string): (path: string) => Uint8Array | null {
  const twin = scratch.rootFor("akasha-base-")
  rmSync(twin, { recursive: true, force: true })
  cpSync(root, twin, { recursive: true })
  return onDisk(twin)
}

function changeOnto(
  root: string,
  base: (path: string) => Uint8Array | null,
  changes: readonly Written[]
): Change {
  const held = new Map<string, string | null>()
  for (const one of changes) held.set(one.path, one.body)
  return {
    root,
    changed: [...held.keys()].sort(),
    before: base,
    after: (path) => {
      if (!held.has(path)) return base(path)
      const body = held.get(path) ?? null
      return body === null ? null : TEXT.encode(body)
    },
  }
}

export const UNFILED_AT = inside("u.domain.ts")

export function unfiled(slug: string): Held {
  return { id: idOf("u"), type: `${pageType.slug}/domain`, slug }
}

export function shadowOnto(repo: string, base: (path: string) => Uint8Array | null): Cast {
  return shadowFor(changeOnto(repo, base, [aChange("note.relation-property.ts", NOTE)]))
}

export const NOTE_AT = "akasha/note.relation-property.ts"

export const PARTS_AT = "akasha/part-slugs.relation-property.ts"

export const NOTE_BROKEN = `${NAMER_PAGE}: \`note\` — no page admitting \`page-property\` carries the slug \`held\``

export const PARTS_BROKEN =
  `${NAMER_PAGE}: \`part-slugs\` — \`module/held\` names a \`module\`, ` +
  "and this property admits only `page-type` and what extends it"

export function aRelation(one: string, slug: string, target: string): string {
  return bodyOf({
    id: idOf(one),
    type: `${pageType.slug}/relation-property`,
    slug,
    propertySlug: slug,
    targetPageType: target,
  })
}

export function repointing(root: string, at: string, body: string, ...carried: string[]): Change {
  const held = onDisk(root)
  const bytes = TEXT.encode(body)
  return {
    root,
    changed: [at, ...carried],
    before: held,
    after: (path) => (path === at ? bytes : held(path)),
  }
}

function castBothWays(repo: string, commit: string): readonly [Cast, Cast] {
  const held = onDisk(repo)
  const change: Change = { root: repo, changed: [], before: held, after: held }
  return [shadowFor(change), shadowFor({ ...change, base: commit, pages: pagesAt(repo, commit) })]
}

export function castAtCheckoutAndCommit(slug: string): readonly [Cast, Cast] {
  const repo = seeded()
  committedIn(repo)
  const commit = said(repo, ["rev-parse", "HEAD"]).trim()
  put(repo, UNFILED_AT, bodyOf(unfiled(slug)))
  refreshedIn(repo, AKASHA)
  return castBothWays(repo, commit)
}

export function castRewrittenAfterCommit(): readonly [Cast, Cast] {
  const repo = seeded()
  committedIn(repo)
  const commit = said(repo, ["rev-parse", "HEAD"]).trim()
  put(repo, CODE_AT, "export const d = 2\n")
  return castBothWays(repo, commit)
}

export function listedOf(cast: Cast): (folder?: string) => readonly string[] {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow.listed
}
