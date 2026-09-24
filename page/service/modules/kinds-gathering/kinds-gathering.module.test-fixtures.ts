import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  pageFiled,
  relationFiled,
} from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  shapeAlsoFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { shapedIn } from "akasha/page/type/page-property/modules/property-shape/property-shape.module.code.ts"

type Declaring = { readonly pagePropertySlug: string; readonly required: boolean }

export function filed(
  root: string,
  pageTypeSlug: string,
  slug: string,
  value: Readonly<Record<string, unknown>>
): string {
  const path = `held/${slug}.${pageTypeSlug}.ts`
  const id = `id-${pageTypeSlug}-${slug}`
  const held = { id, type: `page-type/${pageTypeSlug}`, slug, ...value }
  listedFiled(root, pageTypeSlug, slug, [{ path, id }])
  pageFiled(root, id, path)
  valueAlsoFiled(root, pageTypeSlug, [{ path, value: held }])
  const shape = shapedIn(held)
  if (shape !== null) shapeAlsoFiled(root, shape.pageTypeSlug, [shape])
  return path
}

export function typed(
  root: string,
  slug: string,
  above: readonly string[],
  properties: readonly Declaring[]
): undefined {
  const path = filed(root, "page-type", slug, {
    extends: above.map((one) => `page-type/${one}`),
    properties,
  })
  const id = `id-page-type-${slug}`
  for (const one of above) {
    relationFiled(root, `id-page-type-${one}`, "extends-type", id, [{ path }])
  }
}

const KINDED = new Set<string>()

export function kinded(root: string, sort: string): undefined {
  const named = `${root} ${sort}`
  if (KINDED.has(named)) return
  KINDED.add(named)
  filed(root, "page-type", sort, { extends: ["page-property"] })
}

export function propertied(
  root: string,
  sort: string,
  slug: string,
  value: Readonly<Record<string, unknown>>
): string {
  kinded(root, sort)
  return filed(root, sort, slug, { propertySlug: slug, ...value })
}

export function calculated(
  root: string,
  slug: string,
  holds: string,
  body: string,
  stated: Readonly<Record<string, unknown>> = {}
): undefined {
  const at = propertied(root, "computed-property", slug, { holds, code: "ts", ...stated })
  const beside = join(root, at.replace(/\.ts$/, ".code.ts"))
  mkdirSync(dirname(beside), { recursive: true })
  writeFileSync(beside, `${body}\n`)
}

export function worlded(root: string): undefined {
  propertied(root, "number-property", "count", { max: null })
  calculated(root, "twice", "number", "export function work(page) { return (page.count ?? 0) * 2 }")
  calculated(
    root,
    "thrice",
    "number",
    "export function work(page) { return (page.count ?? 0) * 3 }"
  )
  typed(root, "held", [], [{ pagePropertySlug: "number-property/count", required: false }])
  typed(
    root,
    "nearer",
    ["held"],
    [{ pagePropertySlug: "computed-property/twice", required: false }]
  )
  typed(
    root,
    "further",
    ["nearer"],
    [{ pagePropertySlug: "computed-property/thrice", required: false }]
  )
}
