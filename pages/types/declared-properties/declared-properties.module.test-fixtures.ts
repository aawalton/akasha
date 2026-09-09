import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { listedFiled, schemaFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../commands/modules/scratching/scratching.module.code.ts"
import { valueAt } from "../../value/page-value.module.code.ts"
import { type Carried, declarationsOf, propertiesOf } from "./declared-properties.module.code.ts"

export const scratch = scratchWorld()

function named(above: readonly string[] | null): string {
  if (above === null) return "[]"
  return JSON.stringify(above.map((one) => `page-type/${one}`))
}

export function typed(
  root: string,
  slug: string,
  above: readonly string[] | null,
  declared: readonly Record<string, unknown>[]
): undefined {
  const path = `akasha/held/${slug}.page-type.ts`
  listedFiled(root, "page-type", slug, [{ path, id: `id-${slug}` }])
  const page = join(root, path)
  mkdirSync(dirname(page), { recursive: true })
  const said = named(above)
  writeFileSync(
    page,
    `export const held = { slug: ${JSON.stringify(slug)}, extends: ${said},` +
      ` properties: ${JSON.stringify(declared)} }\n`
  )
}

export function propertied(
  root: string,
  pageTypeSlug: string,
  slug: string,
  propertySlug: string,
  unique: string | null = null
): undefined {
  schemaFiled(root, pageTypeSlug, slug, [
    { pageTypeSlug, targetPageTypeSlug: null, unique, slug, propertySlug },
  ])
}

export function carriedBy(root: string, slug: string): readonly Carried[] {
  return propertiesOf(slug, root, (path) => valueAt(path, root))
}

export function declaredIn(root: string, slug: string): readonly Carried[] {
  return declarationsOf(slug, root, (path) => valueAt(path, root))
}

export function rootAt(): string {
  return scratch.rootFor("akasha-properties-")
}
