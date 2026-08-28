import { expect, test } from "bun:test"
import { cycleAmong, familyOf } from "../query/expands.ts"
import { type Page, checkQuery, runQuery } from "../query/query.ts"
import type { Repo } from "./address.ts"
import { declarationsFor, extendingIn } from "./declared.ts"
import { gatheredFor } from "./gathered.ts"
import { pageAt, pagesFor } from "./pages.ts"

const ROOT = `${import.meta.dir}/../..`

const REPO: Repo = { repo: "akasha", root: ROOT }

const NOW = 0

const HEAD = "repo"

const KEYS: readonly string[] = ["slug"]

const answered = <T>(found: T | string): T => {
  if (typeof found === "string") throw new Error(found)
  return found
}

const byHand = (): readonly Page[] => {
  const extending = answered(extendingIn(ROOT))
  const family = familyOf(HEAD, extending)
  if ("ring" in family) throw new Error(cycleAmong(family.ring))
  const declaring = answered(declarationsFor(ROOT, family.family))
  const head = declaring.get(HEAD)
  if (head === undefined) throw new Error(`no page type ${HEAD} stands under the root`)
  const checked = checkQuery(
    { pageType: HEAD, expands: true, keys: [...KEYS] },
    head,
    extending,
    declaring
  )
  if (!checked.ok) throw new Error(checked.message)
  const byType = answered(pagesFor(REPO, checked.pageTypes))
  const pages: Page[] = []
  for (const kind of checked.pageTypes) {
    const declared = declaring.get(kind)
    if (declared === undefined) throw new Error(`no page type ${kind} stands under the root`)
    for (const at of byType.get(kind) ?? []) {
      const page = pageAt(REPO, at, declared, NOW)
      if ("unread" in page) throw new Error(page.unread)
      pages.push(page)
    }
  }
  return runQuery(checked, pages)
}

test("the layer changes no answer: one walk answers what the questions answered apart", () => {
  const gathered = answered(gatheredFor(REPO, HEAD, KEYS, NOW))
  const apart = byHand()
  expect(gathered.length).toBe(apart.length)
  expect(gathered.length).toBeGreaterThan(0)
  expect([...gathered].map((one) => one.at).sort()).toEqual([...apart].map((one) => one.at).sort())
})

test("every page answered holds the keys that were asked for", () => {
  const gathered = answered(gatheredFor(REPO, HEAD, KEYS, NOW))
  for (const page of gathered) {
    expect(page.values.now).toBe(NOW)
    expect(page.values.properties["slug"]?.kind).toBe("text")
  }
})

test("a root that will not list refuses rather than answering no page", () => {
  const found = gatheredFor({ repo: "akasha", root: "/var/tmp/no-such-root-stands-here" }, HEAD, KEYS, NOW)
  expect(typeof found).toBe("string")
})

test("a slug naming no page type refuses rather than answering no page", () => {
  const found = gatheredFor(REPO, "no-page-type-is-spelt-this-way", KEYS, NOW)
  expect(typeof found).toBe("string")
})
