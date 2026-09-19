import { afterAll, expect, test } from "bun:test"
import { put, there } from "akasha/check/test/fixture/putting/putting.test-fixture.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  everyValue,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  everythingRead,
  listedUnreadableFiled,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  NAMER_PAGE,
  scratch as worldScratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { NOT_WORKED_OUT, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  aChange,
  basedAside,
  CHANGES,
  CODE_AT,
  carriedOver,
  changeOver,
  codeOf,
  committedIn,
  deployedOver,
  inside,
  landedInto,
  MOVED_TO,
  NAME_AT,
  naming,
  onDisk,
  rewrittenOver,
  SHARED_AT,
  scratch,
  seeded,
  seededNaming,
  shadowOf,
  shadowOnto,
  TEXT,
  UNFILED_AT,
  unfiled,
} from "akasha/page/modules/shadow/shadow.module.test-fixtures.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

afterAll(worldScratch.sweep)

const NOTE_AT = "akasha/note.relation-property.ts"

const PARTS_AT = "akasha/part-slugs.relation-property.ts"

const NOTE_BROKEN = `${NAMER_PAGE}: \`note\` — no page admitting \`page-property\` carries the slug \`held\``

const PARTS_BROKEN =
  `${NAMER_PAGE}: \`part-slugs\` — \`module/held\` names a \`module\`, ` +
  "and this property admits only `page-type` and what extends it"

function aRelation(one: string, slug: string, target: string): string {
  return bodyOf({
    id: idOf(one),
    pageTypeSlug: "relation-property",
    slug,
    propertySlug: slug,
    targetPageType: target,
  })
}

function repointing(root: string, at: string, body: string): Change {
  const held = onDisk(root)
  const bytes = TEXT.encode(body)
  return { root, changed: [at], before: held, after: (path) => (path === at ? bytes : held(path)) }
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

test("a slug two pages carry loses only the line of the page taken away", () => {
  const repo = seeded()
  const at = "page-type/domain/slug/same.jsonl"
  expect(readingIn(repo).lines(at).length).toBe(2)
  expect(shadowOf(shadowFor(changeOver(repo, CHANGES))).lines(at)).toEqual([
    `{"path":"akasha/two/same.domain.ts","id":"${idOf("f")}"}`,
  ])
})

test("a property the change stops making unique loses the identity filed for a page outside it", () => {
  const repo = seededNaming()
  const at = "page/name/shared.jsonl"
  expect(readingIn(repo).lines(at)).toEqual([`{"path":"akasha/${SHARED_AT}","id":"${idOf("k")}"}`])
  const reading = shadowOf(shadowFor(changeOver(repo, [aChange(NAME_AT, naming(null))])))
  expect(reading.lines(at)).toEqual([])
  expect(reading.holds(at)).toBe(false)
})

test("a directory the change empties is not listed, and one it fills is", () => {
  const repo = seeded()
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(readingIn(repo).holds(`${pageType.slug}/${module.slug}`)).toBe(true)
  expect(reading.holds(`${pageType.slug}/${module.slug}`)).toBe(false)
  expect(reading.holds("page-type/tag")).toBe(true)
  const named = reading.listing("page-type").map((one) => one.name)
  expect(named).not.toContain("module")
  expect(named).toContain("tag")
})

test("a relation through a property the same change declares is filed, as a landing files it", () => {
  const repo = seeded()
  const at = "akasha/g.domain.referenced-by.jsonl"
  const named = `{"propertySlug":"note","path":"akasha/b.domain.ts","id":"${idOf("b")}"}`
  expect(readingIn(repo).read(at) ?? "").not.toContain(named)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(reading.read(at) ?? "").toContain(named)
  expect(reading.read(at)).toEqual(readingIn(landedInto(repo, CHANGES)).read(at))
})

test("a page of a page type the same change declares is in the shadow as it is in a landing", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  const at = "page-type/tag/slug/h.jsonl"
  expect(reading.lines(at)).toEqual(readingIn(twin).lines(at))
})

test("a body the change carries is the body the shadow reads a page from", () => {
  const repo = seeded()
  const cast = shadowFor(changeOver(repo, CHANGES))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(inside("b.domain.ts"))?.["note"]).toBe("domain/g")
  expect(cast.shadow.pageOf(inside("one/same.domain.ts"))).toBe(null)
})

test("an audit leaves everything as it is, so nothing is worked out and no body is asked for", () => {
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

test("a change whose tree could not be worked out is refused rather than judged against the committed one", () => {
  const repo = scratch.rootFor("akasha-broken-")
  listedUnreadableFiled(repo, "page-type", "domain")
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

test("a shadow answers the index the change started from as well as the index it leaves", () => {
  const repo = seeded()
  const cast = shadowFor(changeOver(repo, [aChange("b.domain.ts", null)]))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.index.listedAt("domain", "b")).toEqual([])
  expect(cast.shadow.before().listedAt("domain", "b")).toHaveLength(1)
})

test("the index a change started from is worked out at the first ask and held", () => {
  const repo = seeded()
  const cast = shadowFor(changeOver(repo, [aChange("b.domain.ts", null)]))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.before()).toBe(cast.shadow.before())
})

test("a body the change only carries elsewhere is at the path it came from", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(MOVED_TO)).toBe(CODE_AT)
})

test("a body the change writes anew is at no path and is answered as nothing", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(inside("fresh.ts"))).toBe(null)
})

test("a body the change takes away stands at no path", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(carriedOver(repo)))(CODE_AT)).toBe(null)
})

test("a file the change writes is at its path, and one the change takes away is at no path", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.holds(MOVED_TO)).toBe(true)
  expect(cast.shadow.holds(inside("fresh.ts"))).toBe(true)
  expect(cast.shadow.holds(CODE_AT)).toBe(false)
  expect(cast.shadow.holds(inside("x.ts"))).toBe(true)
  expect(cast.shadow.holds(inside("nothing.ts"))).toBe(false)
})

test("a body the checkout already holds at the change's own path is loaded from that path", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(deployedOver(repo)))(CODE_AT)).toBe(CODE_AT)
})

test("a body the change rewrites where the body already was is loaded from that path", () => {
  const repo = seeded()
  expect(codeOf(shadowFor(rewrittenOver(repo)))(CODE_AT)).toBe(CODE_AT)
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

test("a page the change does not carry is read at the commit the change starts from", () => {
  const repo = seeded()
  put(repo, UNFILED_AT, bodyOf(unfiled("only-in-the-base")))
  const base = basedAside(repo)
  put(repo, UNFILED_AT, bodyOf(unfiled("at-the-commit")))
  committedIn(repo)
  put(repo, UNFILED_AT, bodyOf(unfiled("moved-in-the-tree")))
  expect(valueAt(UNFILED_AT, repo)?.["slug"]).toBe("moved-in-the-tree")
  const cast = shadowOnto(repo, base)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(UNFILED_AT)?.["slug"]).toBe("at-the-commit")
})

test("a page no commit holds is read from the body on disk at that page's path", () => {
  const repo = seeded()
  committedIn(repo)
  const base = basedAside(repo)
  put(repo, UNFILED_AT, bodyOf(unfiled("in-the-tree-alone")))
  expect(everyValue(readingIn(repo)).has(UNFILED_AT)).toBe(false)
  const cast = shadowOnto(repo, base)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.pageOf(UNFILED_AT)?.["slug"]).toBe("in-the-tree-alone")
})

test("a page the change leaves naming nothing is among the refusals, though the change does not carry it", () => {
  const root = indexedRepo()
  const cast = shadowFor(repointing(root, NOTE_AT, aRelation("b", "note", "page-property")))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.refusals()).toEqual([NOTE_BROKEN])
})

test("a refusal the world already had is no refusal the change leaves", () => {
  const root = indexedRepo({ [NOTE_AT]: aRelation("b", "note", "page-property") })
  const cast = shadowFor(repointing(root, PARTS_AT, aRelation("c", "part-slugs", "page-type")))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.refusals()).toEqual([PARTS_BROKEN])
})

test("a shadow over a change that moves nothing answers no refusal", () => {
  const repo = seeded()
  const held = onDisk(repo)
  const change: Change = { root: repo, changed: [inside("b.domain.ts")], before: held, after: held }
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.refusals()).toEqual([])
})

test("a shadow lists the files under the checkout", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.listed()).toContain(inside("x.ts"))
})

test("a path the change writes is listed though no body sits on disk", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(there(repo, MOVED_TO)).toBe(false)
  expect(cast.shadow.listed()).toContain(MOVED_TO)
  expect(cast.shadow.listed("akasha/far")).toEqual([MOVED_TO])
})

test("a path the change takes away is left out though the body sits on disk", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(there(repo, CODE_AT)).toBe(true)
  expect(cast.shadow.listed()).not.toContain(CODE_AT)
  expect(cast.shadow.listed("akasha/deep")).toEqual([
    inside("deep/d.module.carried.jsonl"),
    inside("deep/d.module.ts"),
  ])
})

test("a caller naming a folder is listed the files sitting in that folder and no others", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  const every = cast.shadow.listed()
  expect(cast.shadow.listed("akasha/two")).toEqual(
    every.filter((one) => one.startsWith("akasha/two/"))
  )
  expect(cast.shadow.listed("akasha/nowhere")).toEqual([])
})

test("a shadow over a change that moves nothing lists the tree as the tree is", () => {
  const repo = seeded()
  const held = onDisk(repo)
  const change: Change = { root: repo, changed: [CODE_AT], before: held, after: held }
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.listed()).toContain(CODE_AT)
})

test("the files are listed at the first ask and held for that shadow", () => {
  const repo = seeded()
  const cast = shadowFor(carriedOver(repo))
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.listed()).toBe(cast.shadow.listed())
})
