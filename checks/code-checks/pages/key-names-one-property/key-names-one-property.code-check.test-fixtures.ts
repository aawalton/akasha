import type { Change } from "@akasha/pages-system/change"
import { bytesOf } from "@akasha/testing-system/bodying"
import {
  filing,
  landing,
  pathFor,
  put,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const PAGE_TYPE = "page-type"

export const TEXT = "text-property"

export const RECORD = "record-property"

export const ONE = "01a054d3-0000-7001-8000-000000000001"

export const TWO = "01a054d3-0000-7002-8000-000000000002"

export const THREE = "01a054d3-0000-7003-8000-000000000003"

export function typing(
  root: string,
  slug: string,
  id: string,
  above: string | null,
  declared: readonly Record<string, unknown>[]
): Uint8Array {
  const said = above === null ? "null" : JSON.stringify(`${PAGE_TYPE}/${above}`)
  filing(root, PAGE_TYPE, slug, id)
  return put(
    root,
    pathFor(PAGE_TYPE, slug),
    bytesOf(
      `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: "page-type", ` +
        `slug: ${JSON.stringify(slug)}, extendsSlug: ${said}, ` +
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
