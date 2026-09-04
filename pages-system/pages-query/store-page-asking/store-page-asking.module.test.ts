import { expect, test } from "bun:test"
import type { Fetcher } from "../store-reaching/store-reaching.module.code.ts"
import { noNap } from "../store-reaching/store-reaching.module.test-fixtures.ts"
import {
  askNamed,
  askNaming,
  askPage,
  askPageTypes,
  askShape,
  askTaking,
} from "./store-page-asking.module.code.ts"

const LIVE_ORIGIN = "http://127.0.0.1:8787"

function answering(each: readonly (readonly Record<string, unknown>[])[]): Fetcher {
  let round = 0
  return async () => {
    const rows = each[Math.min(round, each.length - 1)] ?? []
    round += 1
    return new Response(JSON.stringify({ rows }), {
      headers: { "content-type": "application/json" },
    })
  }
}

function underOrigin<T>(run: () => Promise<T>): Promise<T> {
  const held = process.env.PAGE_STORE_ORIGIN
  process.env.PAGE_STORE_ORIGIN = LIVE_ORIGIN
  return run().finally(() => {
    if (held === undefined) delete process.env.PAGE_STORE_ORIGIN
    else process.env.PAGE_STORE_ORIGIN = held
  })
}

test("one page is read as a composed query narrowed to its slug", async () => {
  const asked = await askPage(
    "finding",
    "one",
    answering([[{ slug: "one", claim: "a claim" }]]),
    noNap
  )
  expect(asked.outcome).toBe("found")
  if (asked.outcome !== "found") return
  expect(asked.page.values).toEqual({ slug: "one", claim: "a claim" })
  expect(asked.page.name).toBe("one")
  expect(asked.page.pageType).toBe("finding")
  expect(asked.page.at).toBe("finding/one")
})

test("a page the store does not hold is answered absent rather than refused", async () => {
  const asked = await askPage("finding", "nope", answering([[]]), noNap)
  expect(asked.outcome).toBe("absent")
})

test("a page is answered with no relation resolved", async () => {
  const asked = await askPage("finding", "one", answering([[{ slug: "one" }]]), noNap)
  expect(asked.outcome).toBe("found")
  if (asked.outcome !== "found") return
  expect(asked.page.relations).toEqual({})
})

test("a query asked for by name is refused", async () => {
  const named = await askNamed("some-saved-query")
  expect(named.ok).toBe(false)
  if (named.ok) return
  expect(named.why).toContain("holds no page under `page-query`")
  const taking = await askTaking("some-saved-query", { day: "2026-08-31" })
  expect(taking.ok).toBe(false)
})

test("the roster names no repository and no glob", async () => {
  const asked = await askPageTypes(
    answering([[{ slug: "finding", pluralSlug: "findings" }]]),
    noNap
  )
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  expect(asked.types).toEqual([
    { slug: "finding", repo: null, glob: null, heldBy: [], namedFor: "findings" },
  ])
})

test("what names a page is found by asking each page type in turn", async () => {
  const asked = await askNaming(
    { key: "domainSlug", name: "workspace-package/pages-system", pageTypes: ["finding"] },
    answering([[{ slug: "one", domainSlug: "workspace-package/pages-system" }]]),
    noNap
  )
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  expect(asked.naming).toEqual([
    {
      pageType: "finding",
      key: "domainSlug",
      rows: [{ values: { slug: "one", domainSlug: "workspace-package/pages-system" } }],
    },
  ])
})

test("a page type naming nothing stands in no naming", async () => {
  const asked = await askNaming(
    { key: "domainSlug", name: "nothing", pageTypes: ["finding"] },
    answering([[]]),
    noNap
  )
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  expect(asked.naming).toEqual([])
})

test("a page type the store does not hold has no shape", async () => {
  const asked = await askShape("no-such-type", answering([[]]), noNap)
  expect(asked.ok).toBe(false)
  if (asked.ok) return
  expect(asked.why).toContain("no page type")
})

test("the store standing on this workstation answers one whole page", async () => {
  const asked = await underOrigin(() => askPage("page-type", "finding"))
  expect(asked.outcome).toBe("found")
  if (asked.outcome !== "found") return
  expect(asked.page.values.pluralSlug).toBe("findings")
  expect(asked.page.values.definition).toBeString()
})

test("the store standing on this workstation answers its roster", async () => {
  const asked = await underOrigin(() => askPageTypes())
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  const slugs = asked.types.map((one) => one.slug)
  expect(slugs).toContain("finding")
  expect(slugs).toContain("page-type")
  for (const one of asked.types) expect(one.repo).toBeNull()
})

test("the store standing on this workstation answers a page type's shape", async () => {
  const asked = await underOrigin(() => askShape("finding"))
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  const claim = asked.shape.declarations.find((one) => one.key === "claim")
  expect(claim).toBeDefined()
  expect(claim?.type).toBe("text-property")
  expect(claim?.mayBeGone).toBe(false)
  const domain = asked.shape.declarations.find((one) => one.key === "domain-slug")
  expect(domain?.type).toBe("relation-property")
  expect(domain?.targetSlug).toBe("page-type/domain")
})

test("the store standing on this workstation answers what names a domain", async () => {
  const asked = await underOrigin(() =>
    askNaming({
      key: "domainSlug",
      name: "workspace-package/pages-system",
      pageTypes: ["finding"],
    })
  )
  expect(asked.ok).toBe(true)
  if (!asked.ok) return
  expect(asked.naming.length).toBe(1)
  expect(asked.naming[0]?.rows.length).toBeGreaterThan(0)
})
