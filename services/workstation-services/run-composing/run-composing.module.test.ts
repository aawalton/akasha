import { expect, test } from "bun:test"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/pages/value/page-value.module.code.ts"
import { SERVICE_PAGE_TYPE } from "../service-reading/service-reading.module.code.ts"
import { commandOf, type Start, startsIn, wordsIn } from "./run-composing.module.code.ts"
import { NOWHERE, OUTSIDE } from "./run-composing.module.test-fixtures.ts"

const ROOT = process.cwd()

type Page = {
  readonly runs: readonly string[] | null
  readonly starts: readonly Start[] | null
}

function pagesBySlug(): ReadonlyMap<string, Page> {
  const found = new Map<string, Page>()
  for (const one of valuesOfType(ROOT, SERVICE_PAGE_TYPE)) {
    const slug = textAt(one.value, "slug")
    if (slug === null) continue
    found.set(slug, { runs: wordsIn(one.value.runs), starts: startsIn(one.value.starts) })
  }
  return found
}

test("every service page states a start or is named as one this shape does not reach", () => {
  const pages = pagesBySlug()
  for (const [slug, page] of pages) {
    expect([slug, page.starts !== null || slug in OUTSIDE]).toEqual([slug, true])
  }
  for (const slug of Object.keys(OUTSIDE)) expect([slug, pages.has(slug)]).toEqual([slug, true])
})

test("a command composed from a page's start is the command that page states, byte for byte", () => {
  for (const [slug, page] of pagesBySlug()) {
    const { runs, starts } = page
    if (runs === null || starts === null) continue
    expect([slug, starts.length]).toEqual([slug, runs.length])
    for (let at = 0; at < starts.length; at += 1) {
      const one = starts[at]
      if (one === undefined) continue
      expect([slug, at, commandOf(ROOT, one)]).toEqual([slug, at, { command: runs[at] as string }])
    }
  }
})

test("a name reaching no page refuses rather than composing a path", () => {
  expect("refused" in commandOf(ROOT, { code: NOWHERE })).toBe(true)
})
