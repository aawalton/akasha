import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  declaring,
  filing,
  founded,
  pathFor,
  put,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { besideAdded } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { viewPageType } from "akasha/page/view/properties/view-page-type.relation-property.ts"

export const TEXT = "text-property"

const RECORD = "record-property"

export const VIEW = "view"

export const QUOIN = "quoin"

export const PAGE_TYPE = "page-type"

export const HELD = "held"

export const scratch = scratchWorld()

export function paged(
  root: string,
  kind: string,
  slug: string,
  held: Record<string, unknown>
): string {
  const at = pathFor(kind, slug)
  filing(root, kind, slug, `id-${slug}`)
  put(
    root,
    at,
    bytesOf(
      `export const held = ${JSON.stringify({
        id: `id-${slug}`,
        pageTypeSlug: kind,
        slug,
        ...held,
      })}\n`
    )
  )
  return at
}

export function viewing(root: string, slug: string, held: Record<string, unknown>): string {
  return paged(root, VIEW, slug, held)
}

export function lists(slug: string): string {
  return `${PAGE_TYPE}/${slug}`
}

export function listing(root: string, listed: string, made: readonly string[]): undefined {
  besideAdded(
    root,
    pathFor(PAGE_TYPE, listed),
    made.map((path) => ({
      propertySlug: viewPageType.slug,
      fileName: null,
      path,
      id: null,
    }))
  )
}

export function rooted(prefix: string = "akasha-viewed-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, "page-type", "domain")
  declaring(root, HELD, { pageTypeSlug: TEXT })
  declaring(root, "grouped", { pageTypeSlug: TEXT })
  declaring(root, "shown", { pageTypeSlug: TEXT })
  declaring(root, "ordering", { pageTypeSlug: RECORD })
  declaring(root, "ordered-by", { pageTypeSlug: TEXT, propertySlug: "key" })
  paged(root, TEXT, "grouped", { propertySlug: "grouped", namesAPropertyKey: true })
  paged(root, TEXT, "shown", { propertySlug: "shown", namesAPropertyKey: true })
  paged(root, TEXT, "ordered-by", { propertySlug: "key", namesAPropertyKey: true })
  paged(root, RECORD, "ordering", {
    propertySlug: "ordering",
    properties: [{ pagePropertySlug: `${TEXT}/ordered-by`, required: true, many: false }],
  })
  typed(root, VIEW, "page", [`${TEXT}/grouped`, `${TEXT}/shown`, `${RECORD}/ordering`])
  typed(root, QUOIN, "page", [`${TEXT}/${HELD}`])
  return root
}
