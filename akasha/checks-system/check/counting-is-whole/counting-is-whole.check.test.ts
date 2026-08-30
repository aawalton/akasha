import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  identifying,
  landing,
  pathFor,
  stands,
} from "../../check-scratch/check-scratch.module.code.ts"
import {
  COUNTS_NOTHING,
  COUNTS_WITH_NO_COUNT,
  countingIsWhole,
} from "./counting-is-whole.check.code.ts"

const SCRATCH_AT = "/var/tmp"

const TYPE = "page-type"

const kept: string[] = []

afterAll(() => {
  for (const one of kept) rmSync(one, { recursive: true, force: true })
})

function stated(
  slug: string,
  above: string | null,
  declares: readonly string[],
  count: number | null
): string {
  const said = above === null ? "" : `, extendsSlug: ${JSON.stringify(`${TYPE}/${above}`)}`
  const counted = count === null ? "" : `, nextSeq: ${count}`
  return (
    `export const held = { id: ${JSON.stringify(`id-${slug}`)}, pageTypeSlug: "${TYPE}", ` +
    `slug: ${JSON.stringify(slug)}${said}${counted}, properties: ` +
    `${JSON.stringify(declares.map((one) => ({ pagePropertySlug: one })))} }\n`
  )
}

function bytesOf(
  slug: string,
  above: string | null,
  declares: readonly string[],
  count: number | null
): Uint8Array {
  return new TextEncoder().encode(stated(slug, above, declares, count))
}

function typing(
  root: string,
  slug: string,
  above: string | null,
  declares: readonly string[],
  count: number | null
): undefined {
  stands(root, TYPE, slug, `id-${slug}`)
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, pathFor(TYPE, slug)), stated(slug, above, declares, count))
}

function rooted(): string {
  const root = mkdtempSync(join(SCRATCH_AT, "akasha-counting-"))
  kept.push(root)
  identifying(root)
  return root
}

function over(
  root: string,
  slug: string,
  above: string | null,
  declares: readonly string[],
  count: number | null
): readonly string[] {
  const said = countingIsWhole(
    landing(root, { [pathFor(TYPE, slug)]: bytesOf(slug, above, declares, count) })
  )
  for (const one of said) expect(one.path).toBe(pathFor(TYPE, slug))
  return said.map((one) => one.reason)
}

test("a page type counting nothing and holding no count is let through", () => {
  const root = rooted()
  typing(root, "held", null, ["title"], null)
  expect(over(root, "held", null, ["title"], null)).toEqual([])
})

test("a page type declaring `seq` and holding a count is let through", () => {
  const root = rooted()
  typing(root, "held", null, ["seq"], 1)
  expect(over(root, "held", null, ["seq"], 1)).toEqual([])
})

test("a page type declaring `seq` and holding no count is refused", () => {
  const root = rooted()
  typing(root, "held", null, ["seq"], null)
  expect(over(root, "held", null, ["seq"], null)).toEqual([COUNTS_WITH_NO_COUNT])
})

test("a page type holding a count and declaring no `seq` is refused", () => {
  const root = rooted()
  typing(root, "held", null, ["title"], 4)
  expect(over(root, "held", null, ["title"], 4)).toEqual([COUNTS_NOTHING])
})

test("a count of zero is a count, an absent one being the only one that is not", () => {
  const root = rooted()
  typing(root, "held", null, ["title"], 0)
  expect(over(root, "held", null, ["title"], 0)).toEqual([COUNTS_NOTHING])
})

test("a page type inheriting `seq` holds a count of its own", () => {
  const root = rooted()
  typing(root, "over", null, ["seq"], 1)
  typing(root, "under", "over", [], null)
  expect(over(root, "under", "over", [], null)).toEqual([COUNTS_WITH_NO_COUNT])
  expect(over(root, "under", "over", [], 1)).toEqual([])
})

test("a page type extending one the same change adds inherits what it declares", () => {
  const root = rooted()
  typing(root, "under", "over", [], null)
  const said = countingIsWhole(
    landing(root, {
      [pathFor(TYPE, "over")]: bytesOf("over", null, ["seq"], 1),
      [pathFor(TYPE, "under")]: bytesOf("under", "over", [], null),
    })
  )
  expect(said.map((one) => one.path)).toEqual([pathFor(TYPE, "under")])
})

test("a change carrying no page type is passed over", () => {
  const root = rooted()
  const at = "akasha/held.ts"
  const body = new TextEncoder().encode("export const one = 1\n")
  expect(countingIsWhole(landing(root, { [at]: body }))).toEqual([])
})
