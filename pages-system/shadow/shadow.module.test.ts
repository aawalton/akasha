import { afterAll, expect, test } from "bun:test"
import { cpSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "@akasha/command-system/scratching"
import { everyValue, readingIn } from "@akasha/indexes"
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
import { everythingRead, rebuiltIn, schemaFiled } from "@akasha/indexes/testing"
import { put, there } from "@akasha/testing-system/putting"
import type { Change } from "../change/change.module.code.ts"
import { valueAt } from "../pages/value/page-value.module.code.ts"
import { type Cast, NOT_WORKED_OUT, shadowFor } from "./shadow.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AKASHA = "akasha"

const TEXT = new TextEncoder()

type FileEdit = {
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

function seeded(): string {
  const repo = scratch.rootFor("akasha-shadow-")
  for (const [at, value] of PAGES) put(repo, join(AKASHA, at), bodyOf(value))
  for (const [at, body] of BODIES) put(repo, join(AKASHA, at), body)
  rebuiltIn(repo, AKASHA)
  return repo
}

function inside(at: string): string {
  return join(AKASHA, at)
}

function aChange(at: string, value: Held | null): FileEdit {
  return { path: inside(at), body: value === null ? null : bodyOf(value) }
}

const NOTE: Held = {
  id: idOf("n"),
  pageTypeSlug: "relation-property",
  slug: "note",
  propertySlug: "note",
  targetPageTypeSlug: "domain",
}

const CHANGES: readonly FileEdit[] = [
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
    extendsSlug: "page-type/domain",
  }),
  aChange("h.tag.ts", { id: idOf("h"), pageTypeSlug: "tag", slug: "h", note: "domain/b" }),
]

function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => (there(root, path) ? readFileSync(join(root, path)) : null)
}

function changeOver(root: string, changes: readonly FileEdit[]): Change {
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

function landedInto(root: string, changes: readonly FileEdit[]): string {
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

function shadowOf(cast: Cast): Reading {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.reading
}

test("the shadow answers exactly what the index answers once that change has really landed", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(everythingRead(reading)).toEqual(everythingRead(readingIn(twin)))
})

test("the change really moves the index, so the equality is not an equality of two idle answers", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  expect(everythingRead(readingIn(twin))).not.toEqual(everythingRead(readingIn(repo)))
})

test("an entry file several pages name comes back with every line the landing leaves", () => {
  const repo = seeded()
  const at = "import/path/akasha/x.ts.jsonl"
  expect(readingIn(repo).lines(at).length).toBe(3)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(reading.lines(at)).toEqual(['{"path":"akasha/p.ts"}', '{"path":"akasha/s.ts"}'])
  expect(reading.lines(at)).toEqual(readingIn(landedInto(repo, CHANGES)).lines(at))
})

test("a slug two pages carry loses only the line of the page taken away", () => {
  const repo = seeded()
  const at = "identity/domain/slug/same.jsonl"
  expect(readingIn(repo).lines(at).length).toBe(2)
  expect(shadowOf(shadowFor(changeOver(repo, CHANGES))).lines(at)).toEqual([
    `{"path":"akasha/two/same.domain.ts","id":"${idOf("f")}"}`,
  ])
})

const NAME_AT = "name.text-property.ts"

const SHARED_AT = "k.domain.ts"

const SHARED: Held = { id: idOf("k"), pageTypeSlug: "domain", slug: "k", name: "shared" }

function naming(unique: string | null): Held {
  const held: Held = {
    id: idOf("m"),
    pageTypeSlug: "text-property",
    slug: "name",
    propertySlug: "name",
  }
  return unique === null ? held : { ...held, unique }
}

function seededNaming(): string {
  const repo = scratch.rootFor("akasha-naming-")
  for (const [at, value] of PAGES) put(repo, join(AKASHA, at), bodyOf(value))
  const [namingAt, named] = aType("1", "domain", "page", ["name"])
  put(repo, join(AKASHA, namingAt), bodyOf(named))
  put(repo, join(AKASHA, NAME_AT), bodyOf(naming("always")))
  put(repo, join(AKASHA, SHARED_AT), bodyOf(SHARED))
  rebuiltIn(repo, AKASHA)
  return repo
}

test("a property the change stops making unique loses the identity filed for a page outside it", () => {
  const repo = seededNaming()
  const at = "identity/page/name/shared.jsonl"
  expect(readingIn(repo).lines(at)).toEqual([`{"path":"akasha/${SHARED_AT}","id":"${idOf("k")}"}`])
  const reading = shadowOf(shadowFor(changeOver(repo, [aChange(NAME_AT, naming(null))])))
  expect(reading.lines(at)).toEqual([])
  expect(reading.holds(at)).toBe(false)
})

test("a directory the change empties is not listed, and one it fills is", () => {
  const repo = seeded()
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(reading.holds("path/akasha/deep")).toBe(false)
  expect(reading.holds("path/akasha/one")).toBe(false)
  expect(reading.holds("path/akasha/two")).toBe(true)
  expect(reading.listing("path/akasha").map((one) => one.name)).not.toContain("deep")
  expect(reading.listing("identity").map((one) => one.name)).toContain("tag")
})

test("a relation through a property the same change declares is filed, as a landing files it", () => {
  const repo = seeded()
  const at = `relation/page/id/${idOf("g")}/note/${idOf("b")}.jsonl`
  expect(readingIn(repo).holds(at)).toBe(false)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(reading.lines(at)).toEqual(['{"path":"akasha/b.domain.ts"}'])
  expect(reading.lines(at)).toEqual(readingIn(landedInto(repo, CHANGES)).lines(at))
})

test("a page of a page type the same change declares stands in the shadow as it stands in a landing", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  const at = "identity/tag/slug/h.jsonl"
  expect(reading.lines(at)).toEqual(readingIn(twin).lines(at))
})

test("a body the change carries is the body the shadow reads a page from", () => {
  const repo = seeded()
  const cast = shadowFor(changeOver(repo, CHANGES))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(inside("b.domain.ts"))?.["note"]).toBe("domain/g")
  expect(cast.shadow.pageOf(inside("one/same.domain.ts"))).toBe(null)
})

test("an audit leaves everything as it stands, so nothing is worked out and no body is asked for", () => {
  const repo = seeded()
  let asked = 0
  const held = onDisk(repo)
  const at = (path: string): Uint8Array | null => {
    asked += 1
    return held(path)
  }
  const change: Change = { root: repo, changed: ["akasha/b.domain.ts"], before: at, after: at }
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(asked).toBe(0)
  expect(everythingRead(cast.reading)).toEqual(everythingRead(readingIn(repo)))
})

test("a shadow that could not be worked out is refused, never stood in for by the committed index", () => {
  const repo = scratch.rootFor("akasha-broken-")
  schemaFiled(repo, "text-property", "held", [
    {
      pageTypeSlug: "text-property",
      targetPageTypeSlug: null,
      unique: null,
      slug: "held",
      propertySlug: "held",
    },
  ])
  const cast = shadowFor(changeOver(repo, [aChange("b.domain.ts", { id: idOf("b") })]))
  expect("refused" in cast).toBe(true)
  expect("shadow" in cast).toBe(false)
  if ("refused" in cast) expect(cast.refused).toContain(NOT_WORKED_OUT)
})

test("one change is one shadow, so a second check asking works nothing out again", () => {
  const repo = seeded()
  let asked = 0
  const held = onDisk(repo)
  const change = changeOver(repo, CHANGES)
  const counted: Change = {
    ...change,
    after: (path) => {
      asked += 1
      return change.after(path)
    },
    before: held,
  }
  const first = shadowFor(counted)
  const once = asked
  expect(once).toBeGreaterThan(0)
  expect(shadowFor(counted)).toBe(first)
  expect(asked).toBe(once)
})

test("a page the change does not carry is read from the tree the change would land on", () => {
  const at = inside("b.domain.ts")
  const repo = seeded()
  const cast = shadowFor({
    root: repo,
    changed: [at],
    after: (path) =>
      path === at
        ? TEXT.encode(bodyOf({ id: idOf("b"), pageTypeSlug: "domain", slug: "b" }))
        : null,
    before: onDisk(repo),
  })
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(inside("g.domain.ts"))?.["slug"]).toBe("g")
  expect(cast.shadow.pageOf(at)?.["slug"]).toBe("b")
})

const CODE_AT = inside("deep/d.module.code.ts")

const MOVED_TO = inside("far/d.module.code.ts")

function carriedOver(root: string): Change {
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

function codeOf(cast: Cast): (path: string) => string | null {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow.codeAt
}

test("a body the change only carries elsewhere stands at the path it came from", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(MOVED_TO)).toBe(CODE_AT)
})

test("a body the change writes anew stands at no path and is answered as nothing", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(inside("fresh.ts"))).toBe(null)
})

test("a body the change takes away stands at no path", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(CODE_AT)).toBe(null)
})

test("a path the change does not carry holds its own body", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(inside("x.ts"))).toBe(inside("x.ts"))
})

test("an audit carries nothing, so every path holds its own body", () => {
  const repo = seeded()
  const held = onDisk(repo)
  const change: Change = { root: repo, changed: [inside("x.ts")], before: held, after: held }
  expect(codeOf(shadowFor(change))(inside("x.ts"))).toBe(inside("x.ts"))
})

function basedAside(root: string): (path: string) => Uint8Array | null {
  const twin = scratch.rootFor("akasha-base-")
  rmSync(twin, { recursive: true, force: true })
  cpSync(root, twin, { recursive: true })
  return onDisk(twin)
}

function changeOnto(
  root: string,
  base: (path: string) => Uint8Array | null,
  changes: readonly FileEdit[]
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

const UNFILED_AT = inside("u.domain.ts")

function unfiled(slug: string): Held {
  return { id: idOf("u"), pageTypeSlug: "domain", slug }
}

function shadowOnto(repo: string, base: (path: string) => Uint8Array | null): Cast {
  return shadowFor(changeOnto(repo, base, [aChange("note.relation-property.ts", NOTE)]))
}

test("a page the value index does not name is read from the base rather than from the working tree", () => {
  const repo = seeded()
  put(repo, UNFILED_AT, bodyOf(unfiled("at-the-base")))
  const base = basedAside(repo)
  put(repo, UNFILED_AT, bodyOf(unfiled("moved-in-the-tree")))
  expect(everyValue(readingIn(repo)).has(UNFILED_AT)).toBe(false)
  expect(valueAt(UNFILED_AT, repo)?.["slug"]).toBe("moved-in-the-tree")
  const cast = shadowOnto(repo, base)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(UNFILED_AT)?.["slug"]).toBe("at-the-base")
})

test("a page the working tree holds and no base holds is no page in the shadow", () => {
  const repo = seeded()
  const base = basedAside(repo)
  put(repo, UNFILED_AT, bodyOf(unfiled("in-the-tree-alone")))
  expect(valueAt(UNFILED_AT, repo)?.["slug"]).toBe("in-the-tree-alone")
  const cast = shadowOnto(repo, base)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(UNFILED_AT)).toBe(null)
})
