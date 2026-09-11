import { expect, test } from "bun:test"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value/page-value.module.code.ts"
import { SERVICE_PAGE_TYPE } from "../service-reading/service-reading.module.code.ts"
import { commandOf, type Start, startsIn, wordsIn } from "./run-composing.module.code.ts"
import { NOWHERE, OUTSIDE, STARTS } from "./run-composing.module.test-fixtures.ts"

const ROOT = process.cwd()

type Page = {
  readonly runs: readonly string[]
  readonly starts: readonly Start[] | null
}

function pagesBySlug(): ReadonlyMap<string, Page> {
  const found = new Map<string, Page>()
  for (const one of valuesOfType(ROOT, SERVICE_PAGE_TYPE)) {
    const slug = textAt(one.value, "slug")
    const runs = wordsIn(one.value.runs)
    if (slug === null || runs === null) continue
    found.set(slug, { runs, starts: startsIn(one.value.starts) })
  }
  return found
}

test("every service page here is either composed or named as one this shape does not reach", () => {
  const pages = pagesBySlug()
  for (const slug of pages.keys()) {
    expect([slug, slug in STARTS || slug in OUTSIDE]).toEqual([slug, true])
  }
  for (const slug of Object.keys(STARTS)) expect([slug, pages.has(slug)]).toEqual([slug, true])
  for (const slug of Object.keys(OUTSIDE)) expect([slug, pages.has(slug)]).toEqual([slug, true])
})

test("a command composed from pages is the command its page states today, byte for byte", () => {
  for (const [slug, page] of pagesBySlug()) {
    const starts = page.starts ?? STARTS[slug]
    if (starts === undefined) continue
    expect([slug, starts.length]).toEqual([slug, page.runs.length])
    for (let at = 0; at < starts.length; at += 1) {
      const one = starts[at]
      if (one === undefined) continue
      expect([slug, at, commandOf(ROOT, one)]).toEqual([
        slug,
        at,
        { command: page.runs[at] as string },
      ])
    }
  }
})

test("a page that has migrated states the command the fixture holds for that page", () => {
  for (const [slug, page] of pagesBySlug()) {
    if (page.starts === null) continue
    expect([slug, page.starts]).toEqual([slug, STARTS[slug] as readonly Start[]])
  }
})

test("a name reaching no page refuses rather than composing a path", () => {
  expect("refused" in commandOf(ROOT, { code: NOWHERE })).toBe(true)
})
