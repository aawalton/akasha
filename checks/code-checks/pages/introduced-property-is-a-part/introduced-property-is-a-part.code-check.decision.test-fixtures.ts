import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { listedFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { declaring } from "../../../modules/scratch/check-scratch.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"
import {
  everyType,
  refusalsOver,
  sourceOf,
} from "./introduced-property-is-a-part.code-check.decision.code.ts"

export const TEXT = "text-property"

export const PAGE_TYPE = "page-type"

export const QUALIFIED = `${TEXT}/foo`

const REACHED: readonly string[] = ["mine", "shared", "its", "foo"]

export const scratch = scratchWorld()

export function pathFor(slug: string): string {
  return `akasha/${slug}.page-type.ts`
}

function aboveValued(above: string | readonly string[] | null): readonly string[] | null {
  if (above === null) return null
  const named = typeof above === "string" ? [above] : above
  return named.map((one) => `page-type/${one}`)
}

function abovedIn(above: string | readonly string[] | null): string {
  const named = aboveValued(above)
  return named === null ? "" : `, extends: ${JSON.stringify(named)}`
}

function stated(
  slug: string,
  above: string | readonly string[] | null,
  declares: readonly string[],
  parts: readonly string[]
): string {
  const said = abovedIn(above)
  const declared = declares.map((one) => ({ pagePropertySlug: one }))
  return (
    `export const held = { id: ${JSON.stringify(`id-${slug}`)}, pageTypeSlug: "page-type", ` +
    `slug: ${JSON.stringify(slug)}${said}, properties: ${JSON.stringify(declared)}, ` +
    `partSlugs: ${JSON.stringify(parts)} }\n`
  )
}

export function typed(
  root: string,
  slug: string,
  above: string | readonly string[] | null,
  declares: readonly string[],
  parts: readonly string[]
): undefined {
  const path = pathFor(slug)
  listedFiled(root, PAGE_TYPE, slug, [{ path, id: `id-${slug}` }])
  const named = aboveValued(above)
  valueAlsoFiled(root, PAGE_TYPE, [
    {
      path,
      value: {
        id: `id-${slug}`,
        pageTypeSlug: PAGE_TYPE,
        slug,
        ...(named === null ? {} : { extends: named }),
        properties: declares.map((one) => ({ pagePropertySlug: one })),
        partSlugs: parts,
      },
    },
  ])
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, path), stated(slug, above, declares, parts))
}

export function rooted(prefix: string = "akasha-introduced-"): string {
  const root = scratch.rootFor(prefix)
  declaring(root, "id", { pageTypeSlug: TEXT, unique: "page" })
  declaring(root, "slug", { pageTypeSlug: TEXT, unique: "page-type" })
  for (const one of REACHED) declaring(root, one, { pageTypeSlug: TEXT })
  typed(root, "page", null, ["id", "slug"], [`${TEXT}/id`, `${TEXT}/slug`])
  typed(root, PAGE_TYPE, "page", [], [])
  return root
}

export function bytesOf(
  slug: string,
  above: string | readonly string[] | null,
  declares: readonly string[],
  parts: readonly string[]
): Uint8Array {
  return new TextEncoder().encode(stated(slug, above, declares, parts))
}

export function shadowed(change: Change): Shadow {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
}

export function judgedBy(change: Change): readonly Judged[] {
  const shadow = shadowed(change)
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  const types = everyType(shadow, carried)
  return refusalsOver(types, sourceOf(types, shadow.index.sourceIn()))
}
