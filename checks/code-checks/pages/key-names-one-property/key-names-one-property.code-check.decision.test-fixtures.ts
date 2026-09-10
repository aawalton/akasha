import { valueAlsoFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import type { Carried } from "@akasha/pages/page-type-properties"
import { shadowFor } from "@akasha/pages/shadow"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import {
  declaring,
  filing,
  founded,
  landing,
  pathFor,
  put,
  typed,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.code-check.decision.code.ts"
import {
  judgedIn,
  refusalsOver,
  underEach,
} from "./key-names-one-property.code-check.decision.code.ts"

export const PAGE_TYPE = "page-type"

export const TEXT = "text-property"

export const NUMBER = "number-property"

export const RECORD = "record-property"

export const ONE = "01a054d3-0000-7001-8000-000000000001"

export const TWO = "01a054d3-0000-7002-8000-000000000002"

export const THREE = "01a054d3-0000-7003-8000-000000000003"

export const scratch = scratchWorld()

export function rooted(prefix: string = "akasha-keyed-"): string {
  const root = scratch.rootFor(prefix)
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, NUMBER, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, PAGE_TYPE, "domain")
  declaring(root, "properties", { pageTypeSlug: RECORD })
  declaring(root, "held", { pageTypeSlug: TEXT })
  return root
}

export function judgedBy(change: Change): readonly Judged[] {
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const shadow = cast.shadow
  const carried = carriedBy(change, shadow.index.pageTypesIn())
  return refusalsOver(underEach(judgedIn(carried, shadow), shadow), shadow)
}

export function typing(
  root: string,
  slug: string,
  id: string,
  above: string | null,
  declared: readonly Record<string, unknown>[]
): Uint8Array {
  const said = above === null ? "[]" : JSON.stringify([`${PAGE_TYPE}/${above}`])
  filing(root, PAGE_TYPE, slug, id)
  return put(
    root,
    pathFor(PAGE_TYPE, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "page-type", ` +
        `slug: ${JSON.stringify(slug)}, extends: ${said}, ` +
        `properties: ${JSON.stringify(declared)} }\n`
    )
  )
}

export function recording(
  root: string,
  slug: string,
  id: string,
  declared: readonly Record<string, unknown>[]
): Uint8Array {
  filing(root, RECORD, slug, id)
  return put(
    root,
    pathFor(RECORD, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(RECORD)}, ` +
        `slug: ${JSON.stringify(slug)}, propertySlug: ${JSON.stringify(slug)}, ` +
        `properties: ${JSON.stringify(declared)} }\n`
    )
  )
}

export function recorded(
  root: string,
  slug: string,
  id: string,
  declared: readonly Record<string, unknown>[]
): undefined {
  filing(root, RECORD, slug, id)
  valueAlsoFiled(root, RECORD, [
    {
      path: pathFor(RECORD, slug),
      value: { id, pageTypeSlug: RECORD, slug, propertySlug: slug, properties: declared },
    },
  ])
}

export function propertied(root: string, kind: string, slug: string, id: string): Uint8Array {
  filing(root, kind, slug, id)
  return put(
    root,
    pathFor(kind, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
        `slug: ${JSON.stringify(slug)}, propertySlug: ${JSON.stringify(slug)} }\n`
    )
  )
}

export function holding(one: Partial<Carried>): Carried {
  return {
    pagePropertySlug: "held",
    pageTypeSlug: TEXT,
    propertySlug: "held",
    key: "held",
    unique: null,
    declaredBy: "over",
    required: true,
    many: false,
    maxCount: null,
    maxLength: null,
    uncommitted: false,
    secret: false,
    ...one,
  }
}

export function restating(
  root: string,
  judging: (change: Change) => readonly Judged[],
  above: Record<string, unknown>,
  below: Record<string, unknown>
): readonly Judged[] {
  typing(root, "over", TWO, null, [{ pagePropertySlug: "held", ...above }])
  return judging(
    landing(root, {
      [pathFor(PAGE_TYPE, "under")]: typing(root, "under", ONE, "over", [
        { pagePropertySlug: "held", ...below },
      ]),
    })
  )
}
