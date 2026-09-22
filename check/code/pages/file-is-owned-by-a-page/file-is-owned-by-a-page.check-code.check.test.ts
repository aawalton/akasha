import { afterAll, expect, test } from "bun:test"
import { fileIsOwnedByAPage } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.check.code.ts"
import { UNOWNED } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  ENDED_AT,
  FILED_AT,
  NAMED_AT,
  STRAY_AT,
  strayed,
} from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.test-fixtures.ts"
import { onDisk } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { shadowAt, shadowOnto } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = strayed()

const BOTH = onDisk(ROOT)

const HELD = shadowAt(ROOT)

const COMING = "akasha/four/two.module.ts"

const GIVEN = "akasha/four/ca.crt"

const PAGE_BODY = `export const two = {
  id: "01a0a5b0-0000-7000-8000-00000000000a",
  pageTypeSlug: "module",
  slug: "two",
  definition: "a page a change adds beside the file it claims",
  code: "ts",
} as const
`

afterAll(scratch.sweep)

function changing(changed: readonly string[]): Change {
  return { root: ROOT, changed, before: BOTH, after: BOTH }
}

function bytesOf(text: string): Uint8Array {
  return new TextEncoder().encode(text)
}

test("the change refuses the path no page owns and lets the one a page names through", () => {
  expect(fileIsOwnedByAPage(changing([NAMED_AT, STRAY_AT]), HELD)).toEqual([
    { path: STRAY_AT, reason: UNOWNED },
  ])
})

test("a file closing with an extension a page type names is let through", () => {
  expect(fileIsOwnedByAPage(changing([ENDED_AT]), HELD)).toEqual([])
})

test("a path the change leaves out is judged by nothing, so the tree is walked no further", () => {
  expect(fileIsOwnedByAPage(changing([NAMED_AT]), HELD)).toEqual([])
})

test("an index answer a change carries is let through", () => {
  expect(fileIsOwnedByAPage(changing([FILED_AT]), HELD)).toEqual([])
})

test("a page a change adds owns the files that same change gives that page", () => {
  const coming = new Map([
    [COMING, bytesOf(PAGE_BODY)],
    [GIVEN, bytesOf("held\n")],
  ])
  const change: Change = {
    root: ROOT,
    changed: [COMING, GIVEN],
    before: BOTH,
    after: (path) => coming.get(path) ?? BOTH(path),
  }
  const cast = shadowOnto(null, change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(fileIsOwnedByAPage(change, cast.shadow)).toEqual([])
})
