import { cpSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { keepingIn } from "@akasha/indexes/indexing"
import {
  aType,
  bodyOf,
  type Held,
  idOf,
  type Named,
  VOCABULARY,
} from "@akasha/indexes/indexing/testing"
import type { Reading } from "@akasha/indexes/shape"
import { rebuiltIn } from "@akasha/indexes/testing"
import { put, there } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../commands/modules/scratching/scratching.module.code.ts"
import type { Change } from "../change/change.module.code.ts"
import { type Cast, shadowFor } from "./shadow.module.code.ts"

export const scratch = scratchWorld()

const AKASHA = "akasha"

export const TEXT = new TextEncoder()

type Written = {
  readonly path: string
  readonly body: string | null
}

const PAGES: readonly Named[] = [
  ...VOCABULARY,
  ["b.domain.ts", { id: idOf("b"), pageTypeSlug: "domain", slug: "b" }],
  ["g.domain.ts", { id: idOf("g"), pageTypeSlug: "domain", slug: "g" }],
  ["deep/d.module.ts", { id: idOf("d"), pageTypeSlug: "module", slug: "d", code: "ts" }],
  ["one/same.domain.ts", { id: idOf("e"), pageTypeSlug: "domain", slug: "same" }],
  ["two/same.domain.ts", { id: idOf("f"), pageTypeSlug: "domain", slug: "same" }],
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
  rebuiltIn(repo, AKASHA)
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
  pageTypeSlug: "relation-property",
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
  aChange("b.domain.ts", { id: idOf("b"), pageTypeSlug: "domain", slug: "b", note: "domain/g" }),
  aChange("tag.page-type.ts", {
    id: idOf("t"),
    pageTypeSlug: "page-type",
    slug: "tag",
    extends: ["page-type/domain"],
  }),
  aChange("h.tag.ts", { id: idOf("h"), pageTypeSlug: "tag", slug: "h", note: "domain/b" }),
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

const SHARED: Held = { id: idOf("k"), pageTypeSlug: "domain", slug: "k", name: "shared" }

export function naming(unique: string | null): Held {
  const held: Held = {
    id: idOf("m"),
    pageTypeSlug: "text-property",
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
  rebuiltIn(repo, AKASHA)
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

export function codeOf(cast: Cast): (path: string) => string | null {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow.codeAt
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
  return { id: idOf("u"), pageTypeSlug: "domain", slug }
}

export function shadowOnto(repo: string, base: (path: string) => Uint8Array | null): Cast {
  return shadowFor(changeOnto(repo, base, [aChange("note.relation-property.ts", NOTE)]))
}
