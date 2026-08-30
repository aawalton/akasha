import { afterAll, expect, test } from "bun:test"
import { cpSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { put } from "../../testing-system/putting/putting.module.code.ts"
import { indexIn } from "../indexes/index-reading/index-reading.module.code.ts"
import {
  beneath,
  type Reading,
  readingAt,
} from "../indexes/index-surface/index-surface.module.code.ts"
import { indexingAt, rebuiltFrom } from "../indexes/indexing/indexing.module.code.ts"
import {
  bodyOf,
  type Held,
  idOf,
  type Named,
  VOCABULARY,
} from "../indexes/indexing/indexing.module.test-fixtures.ts"
import { type Cast, type Leaving, NOT_WORKED_OUT, shadowFor } from "./shadow.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const AKASHA = "akasha"

const TEXT = new TextEncoder()

type Change = {
  readonly path: string
  readonly body: string | null
}

const STANDING: readonly Named[] = [
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
  for (const [at, value] of STANDING) put(repo, join(AKASHA, at), bodyOf(value))
  for (const [at, body] of BODIES) put(repo, join(AKASHA, at), body)
  rebuiltFrom(join(repo, AKASHA), indexIn(repo), repo)
  return repo
}

function inside(at: string): string {
  return join(AKASHA, at)
}

function aChange(at: string, value: Held | null): Change {
  return { path: inside(at), body: value === null ? null : bodyOf(value) }
}

const NOTE: Held = {
  id: idOf("n"),
  pageTypeSlug: "relation-property",
  slug: "note",
  targetPageTypeSlug: "domain",
}

const CHANGES: readonly Change[] = [
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
  return (path) => {
    try {
      return readFileSync(join(root, path))
    } catch {
      return null
    }
  }
}

function leavingOver(root: string, changes: readonly Change[]): Leaving {
  const held = new Map<string, string | null>()
  for (const one of changes) held.set(one.path, one.body)
  const was = onDisk(root)
  return {
    root,
    changed: [...held.keys()].sort(),
    at: (path) => {
      if (!held.has(path)) return was(path)
      const body = held.get(path) ?? null
      return body === null ? null : TEXT.encode(body)
    },
    was,
  }
}

function landedInto(root: string, changes: readonly Change[]): string {
  const twin = scratch.rootFor("akasha-landed-")
  rmSync(twin, { recursive: true, force: true })
  cpSync(root, twin, { recursive: true })
  const standing = onDisk(twin)
  const before = new Map<string, string | null>()
  for (const one of changes) {
    const bytes = standing(one.path)
    before.set(one.path, bytes === null ? null : new TextDecoder().decode(bytes))
  }
  const indexing = indexingAt(indexIn(twin), twin)
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

function wholeOf(reading: Reading): Record<string, unknown> {
  const said: Record<string, unknown> = {}
  const walk = (at: string): undefined => {
    const listing = [...reading.listing(at)].sort((one, two) =>
      one.name < two.name ? -1 : one.name > two.name ? 1 : 0
    )
    said[`${at}/`] = listing.map((one) => `${one.name}${one.directory ? "/" : ""}`)
    for (const one of listing) {
      const next = beneath(at, one.name)
      said[`${next}?`] = reading.holds(next)
      if (one.directory) walk(next)
      else said[next] = reading.lines(next)
    }
  }
  walk("")
  return said
}

function shadowOf(cast: Cast): Reading {
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow.reading
}

test("the shadow answers exactly what the index answers once that change has really landed", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(leavingOver(repo, CHANGES)))
  expect(wholeOf(reading)).toEqual(wholeOf(readingAt(indexIn(twin))))
})

test("the change really moves the index, so the equality is not an equality of two idle answers", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  expect(wholeOf(readingAt(indexIn(twin)))).not.toEqual(wholeOf(readingAt(indexIn(repo))))
})

test("an entry file several pages name comes back with every line the landing leaves", () => {
  const repo = seeded()
  const at = "import/path/akasha/x.ts.jsonl"
  expect(readingAt(indexIn(repo)).lines(at).length).toBe(3)
  const reading = shadowOf(shadowFor(leavingOver(repo, CHANGES)))
  expect(reading.lines(at)).toEqual(['{"path":"akasha/p.ts"}', '{"path":"akasha/s.ts"}'])
  expect(reading.lines(at)).toEqual(readingAt(indexIn(landedInto(repo, CHANGES))).lines(at))
})

test("a slug two pages carry loses only the line of the page taken away", () => {
  const repo = seeded()
  const at = "identity/domain/slug/same.jsonl"
  expect(readingAt(indexIn(repo)).lines(at).length).toBe(2)
  expect(shadowOf(shadowFor(leavingOver(repo, CHANGES))).lines(at)).toEqual([
    `{"path":"akasha/two/same.domain.ts","id":"${idOf("f")}"}`,
  ])
})

test("a directory the change empties is not listed, and one it fills is", () => {
  const repo = seeded()
  const reading = shadowOf(shadowFor(leavingOver(repo, CHANGES)))
  expect(reading.holds("path/akasha/deep")).toBe(false)
  expect(reading.holds("path/akasha/one")).toBe(false)
  expect(reading.holds("path/akasha/two")).toBe(true)
  expect(reading.listing("path/akasha").map((one) => one.name)).not.toContain("deep")
  expect(reading.listing("identity").map((one) => one.name)).toContain("tag")
})

test("a relation through a property the same change declares is filed, as a landing files it", () => {
  const repo = seeded()
  const at = `relation/page/id/${idOf("g")}/note/${idOf("b")}.jsonl`
  expect(readingAt(indexIn(repo)).holds(at)).toBe(false)
  const reading = shadowOf(shadowFor(leavingOver(repo, CHANGES)))
  expect(reading.lines(at)).toEqual(['{"path":"akasha/b.domain.ts"}'])
  expect(reading.lines(at)).toEqual(readingAt(indexIn(landedInto(repo, CHANGES))).lines(at))
})

test("a page of a page type the same change declares stands in the shadow as it stands in a landing", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(leavingOver(repo, CHANGES)))
  const at = "identity/tag/slug/h.jsonl"
  expect(reading.lines(at)).toEqual(readingAt(indexIn(twin)).lines(at))
})

test("a body the change carries is the body the shadow reads a page from", () => {
  const repo = seeded()
  const cast = shadowFor(leavingOver(repo, CHANGES))
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
  const leaving: Leaving = { root: repo, changed: ["akasha/b.domain.ts"], at, was: at }
  const cast = shadowFor(leaving)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(asked).toBe(0)
  expect(wholeOf(cast.shadow.reading)).toEqual(wholeOf(readingAt(indexIn(repo))))
})

test("a shadow that could not be worked out is refused, never stood in for by the committed index", () => {
  const repo = scratch.rootFor("akasha-broken-")
  put(
    indexIn(repo),
    "schema/page-property/slug/held.jsonl",
    '{"pageTypeSlug":"text-property","targetPageTypeSlug":null,"unique":null}\n'
  )
  const cast = shadowFor(leavingOver(repo, [aChange("b.domain.ts", { id: idOf("b") })]))
  expect("refused" in cast).toBe(true)
  expect("shadow" in cast).toBe(false)
  if ("refused" in cast) expect(cast.refused).toContain(NOT_WORKED_OUT)
})

test("one change is one shadow, so a second check asking works nothing out again", () => {
  const repo = seeded()
  let asked = 0
  const held = onDisk(repo)
  const leaving = leavingOver(repo, CHANGES)
  const counted: Leaving = {
    ...leaving,
    at: (path) => {
      asked += 1
      return leaving.at(path)
    },
    was: held,
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
    at: (path) =>
      path === at
        ? TEXT.encode(bodyOf({ id: idOf("b"), pageTypeSlug: "domain", slug: "b" }))
        : null,
    was: onDisk(repo),
  })
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(inside("g.domain.ts"))?.["slug"]).toBe("g")
  expect(cast.shadow.pageOf(at)?.["slug"]).toBe("b")
})
