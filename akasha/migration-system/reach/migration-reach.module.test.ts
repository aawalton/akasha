import { expect, test } from "bun:test"
import type { Inside, Reaching, Stated } from "./migration-reach.module.code.ts"
import {
  blobsIn,
  declaredIn,
  nameOf,
  reachedBy,
  reachSaid,
  statedOf,
  tailOf,
  takeableIn,
} from "./migration-reach.module.code.ts"

const OLD = "019f0f5a-12ab-7117-b622-1c1e718c6017"

const NEW = "01a0654f-b626-7000-9584-1c1e718c6017"

function reachingOf(pages: readonly Inside[], blobs: readonly string[] = []): Reaching {
  const byId = new Map<string, string>()
  const byTail = new Map<string, string[]>()
  const byName = new Map<string, string[]>()
  const byBlob = new Map<string, string[]>()
  const held = new Set<string>()
  for (const one of pages) {
    held.add(one.path)
    if (one.id !== null) {
      byId.set(one.id, one.path)
      byTail.set(tailOf(one.id), [...(byTail.get(tailOf(one.id)) ?? []), one.path])
    }
    if (one.slug !== null && one.pageTypeSlug !== null) {
      byName.set(nameOf(one.pageTypeSlug, one.slug), [one.path])
    }
  }
  for (const one of blobs) {
    byBlob.set(one, ["akasha/one/held.ts"])
    held.add("akasha/one/held.ts")
  }
  return {
    root: "/root",
    at: "head",
    pages,
    byId,
    byTail,
    byName,
    byBlob,
    byType: new Map(
      pages.filter((one) => one.pageTypeSlug !== null).map((one) => [one.pageTypeSlug ?? "", 1])
    ),
    held,
    bodyOf: () => "carries absorb the very field",
  }
}

function stating(one: Partial<Stated>): Stated {
  return {
    path: "pages/one/a.md",
    there: true,
    id: null,
    slug: null,
    pageTypeSlug: null,
    blob: null,
    fields: ["absorb the very field"],
    ...one,
  }
}

test("front matter says what a markdown page claims", () => {
  const said = statedOf(
    "pages/proof/one.proof.md",
    [
      "---",
      "page-type-slug: proof",
      `id: ${OLD}`,
      "slug: one",
      "---",
      "# body",
      "id: not-this",
    ].join("\n")
  )
  expect(said.id).toBe(OLD)
  expect(said.slug).toBe("one")
  expect(said.pageTypeSlug).toBe("proof")
})

test("a body declaring its values says what a typescript page claims", () => {
  const said = statedOf(
    "page/one.ts",
    ["export const one = {", `  id: "${OLD}",`, '  pageTypeSlug: "proof",', '  slug: "one",'].join(
      "\n"
    )
  )
  expect(said.id).toBe(OLD)
  expect(said.pageTypeSlug).toBe("proof")
})

test("what git grep said is read back as one page for each file", () => {
  const said = declaredIn([
    'akasha/one/a.proof.ts:  id: "019f0f5a-12ab-7117-b622-1c1e718c6017"',
    'akasha/one/a.proof.ts:  pageTypeSlug: "proof"',
    'akasha/one/a.proof.ts:  slug: "one"',
    "akasha/one/b.ts:nothing here",
  ])
  expect(said).toEqual([
    { path: "akasha/one/a.proof.ts", id: OLD, slug: "one", pageTypeSlug: "proof" },
  ])
})

test("a page carrying the name but no field of the file is weak rather than reaching", () => {
  const reaching = reachingOf([
    { path: "akasha/one/a.proof.ts", id: NEW, slug: "one", pageTypeSlug: "proof" },
  ])
  const said = reachedBy(
    { ...reaching, bodyOf: () => "nothing of the file is in here" },
    stating({ slug: "one", pageTypeSlug: "proof" })
  )
  expect(said.reached).toBe(false)
  expect(said.reached ? [] : said.weak.map((one) => one.kind)).toContain("name")
})

test("a file that is not there says so rather than saying its content is unreached", () => {
  const said = reachedBy(
    reachingOf([]),
    stating({ there: false, slug: "one", pageTypeSlug: "proof" })
  )
  expect(said.reached).toBe(false)
  expect(said.reached ? "" : said.why).toContain("no file is there to judge")
})

test("a page type akasha carries none of is answered as a regrouping to look for", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/b.ts", id: NEW, slug: "b", pageTypeSlug: "other" }]),
    stating({ slug: "one", pageTypeSlug: "temper-completed-month" })
  )
  expect(said.reached).toBe(false)
  expect(said.reached ? "" : said.why).toContain("no page at all of page type")
  expect(said.reached ? "" : said.why).toContain("regrouped at another grain")
})

test("a page type akasha carries others of is told apart from one it carries none of", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/b.proof.ts", id: NEW, slug: "b", pageTypeSlug: "proof" }]),
    stating({ slug: "one", pageTypeSlug: "proof" })
  )
  expect(said.reached ? "" : said.why).toContain("none of them carries this file's slug")
})

test("what git ls-files said is read back as the paths each blob sits at", () => {
  const said = blobsIn(["100644 abc123 0\takasha/one/a.ts", "100644 abc123 0\takasha/one/b.ts"])
  expect(said.get("abc123")).toEqual(["akasha/one/a.ts", "akasha/one/b.ts"])
})

test("a page under akasha stating the file's own id reaches it", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/a.proof.ts", id: OLD, slug: null, pageTypeSlug: null }]),
    stating({ id: OLD })
  )
  expect(said.reached).toBe(true)
  expect(said.reached && said.held[0]?.kind).toBe("identity")
  expect(said.reached && said.held[0]?.at).toBe("akasha/one/a.proof.ts")
})

test("a page under akasha carrying the file's page type and slug reaches it", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/a.proof.ts", id: NEW, slug: "one", pageTypeSlug: "proof" }]),
    stating({ id: OLD, slug: "one", pageTypeSlug: "proof" })
  )
  expect(said.reached).toBe(true)
  expect(said.reached && said.held.map((one) => one.kind)).toContain("name")
})

test("a file under akasha holding the very bytes reaches it", () => {
  const said = reachedBy(reachingOf([], ["abc123"]), stating({ blob: "abc123" }))
  expect(said.reached).toBe(true)
  expect(said.reached && said.held[0]?.kind).toBe("body")
})

test("a file nothing under akasha answers for is not reached", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/other.ts", id: NEW, slug: "other", pageTypeSlug: "proof" }]),
    stating({ id: OLD, slug: "one", pageTypeSlug: "proof" })
  )
  expect(said.reached).toBe(false)
  expect(said.reached ? "" : said.why).toContain("none of them carries this file's slug")
})

test("an id ending in the eight hex a replacement keeps reaches nothing on its own", () => {
  const said = reachedBy(
    reachingOf([{ path: "akasha/one/a.proof.ts", id: NEW, slug: null, pageTypeSlug: null }]),
    stating({ id: OLD })
  )
  expect(said.reached).toBe(false)
  expect(said.reached ? [] : said.weak.map((one) => one.kind)).toEqual(["tail"])
})

test("a path the migration named reaches the file only where that path is there", () => {
  const reaching = reachingOf([
    { path: "akasha/one/a.proof.ts", id: NEW, slug: "other", pageTypeSlug: "proof" },
  ])
  const held = reachedBy(
    reaching,
    stating({ id: OLD }),
    new Map([["pages/one/a.md", "akasha/one/a.proof.ts"]])
  )
  expect(held.reached).toBe(true)
  expect(held.reached && held.held[0]?.kind).toBe("told")
  const gone = reachedBy(
    reaching,
    stating({ id: OLD }),
    new Map([["pages/one/a.md", "akasha/one/nowhere.ts"]])
  )
  expect(gone.reached).toBe(false)
  expect(gone.reached ? [] : gone.weak.map((one) => one.said).join(" ")).toContain(
    "no such file is under akasha"
  )
})

test("a file saying nothing at all about itself is not reached", () => {
  expect(reachedBy(reachingOf([]), stating({})).reached).toBe(false)
})

test("only the paths reached are takeable, and each is said with why", () => {
  const reaching = reachingOf([
    { path: "akasha/one/a.proof.ts", id: OLD, slug: null, pageTypeSlug: null },
  ])
  const reaches = [
    reachedBy(reaching, stating({ path: "pages/one/a.md", id: OLD })),
    reachedBy(reaching, stating({ path: "pages/one/b.md", id: NEW })),
  ]
  expect(takeableIn(reaches)).toEqual(["pages/one/a.md"])
  expect(reachSaid(reaches)[0]).toContain("reached pages/one/a.md")
  expect(reachSaid(reaches)[1]).toContain("unreached pages/one/b.md")
})
