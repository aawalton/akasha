import { afterAll, expect, test } from "bun:test"
import { everyValue, readingIn } from "@akasha/indexes"
import { bodyOf, idOf } from "@akasha/indexes/indexing/testing"
import { everythingRead, schemaFiled } from "@akasha/indexes/testing"
import { put } from "akasha/testing-system/putting/putting.module.code.ts"
import type { Change } from "../change/change.module.code.ts"
import { valueAt } from "../value/page-value.module.code.ts"
import { NOT_WORKED_OUT, shadowFor } from "./shadow.module.code.ts"
import {
  aChange,
  basedAside,
  CHANGES,
  CODE_AT,
  carriedOver,
  changeOver,
  codeOf,
  inside,
  landedInto,
  MOVED_TO,
  NAME_AT,
  naming,
  onDisk,
  SHARED_AT,
  scratch,
  seeded,
  seededNaming,
  shadowOf,
  shadowOnto,
  TEXT,
  UNFILED_AT,
  unfiled,
} from "./shadow.module.test-fixtures.ts"

afterAll(scratch.sweep)

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
  const at = "identity/page-type/domain/slug/same.jsonl"
  expect(readingIn(repo).lines(at).length).toBe(2)
  expect(shadowOf(shadowFor(changeOver(repo, CHANGES))).lines(at)).toEqual([
    `{"path":"akasha/two/same.domain.ts","id":"${idOf("f")}"}`,
  ])
})

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
  expect(reading.listing("identity/page-type").map((one) => one.name)).toContain("tag")
})

test("a relation through a property the same change declares is filed, as a landing files it", () => {
  const repo = seeded()
  const at = `relation/page/id/${idOf("g")}/note/${idOf("b")}.jsonl`
  expect(readingIn(repo).holds(at)).toBe(false)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  expect(reading.lines(at)).toEqual(['{"path":"akasha/b.domain.ts"}'])
  expect(reading.lines(at)).toEqual(readingIn(landedInto(repo, CHANGES)).lines(at))
})

test("a page of a page type the same change declares is in the shadow as it is in a landing", () => {
  const repo = seeded()
  const twin = landedInto(repo, CHANGES)
  const reading = shadowOf(shadowFor(changeOver(repo, CHANGES)))
  const at = "identity/page-type/tag/slug/h.jsonl"
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

test("a shadow that could not be worked out is refused rather than answered from the committed index", () => {
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
