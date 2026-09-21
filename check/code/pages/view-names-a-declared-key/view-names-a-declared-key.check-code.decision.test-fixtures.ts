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

export const TEXT = "text-property"

export const RECORD = "record-property"

export const VIEW = "view"

export const QUOIN = "quoin"

export const scratch = scratchWorld()

function bodied(root: string, kind: string, slug: string, held: Record<string, unknown>): string {
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
  return bodied(root, VIEW, slug, held)
}

export function rooted(prefix: string = "akasha-viewed-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, "page-type", "domain")
  declaring(root, "held", { pageTypeSlug: TEXT })
  declaring(root, "grouped", { pageTypeSlug: TEXT })
  declaring(root, "shown", { pageTypeSlug: TEXT })
  declaring(root, "ordering", { pageTypeSlug: RECORD })
  declaring(root, "ordered-by", { pageTypeSlug: TEXT, propertySlug: "key" })
  bodied(root, TEXT, "grouped", { propertySlug: "grouped", namesAPropertyKey: true })
  bodied(root, TEXT, "shown", { propertySlug: "shown", namesAPropertyKey: true })
  bodied(root, TEXT, "ordered-by", { propertySlug: "key", namesAPropertyKey: true })
  bodied(root, RECORD, "ordering", {
    propertySlug: "ordering",
    properties: [{ pagePropertySlug: `${TEXT}/ordered-by`, required: true, many: false }],
  })
  typed(root, VIEW, "page", [`${TEXT}/grouped`, `${TEXT}/shown`, `${RECORD}/ordering`])
  typed(root, QUOIN, "page", [`${TEXT}/held`])
  return root
}
