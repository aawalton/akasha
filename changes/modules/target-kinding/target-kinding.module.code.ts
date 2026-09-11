import { extname } from "node:path"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { namedUnder, pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const CODE = new Set([".ts", ".tsx"])

export type Kind = "file" | "file-code" | "file-page" | "file-page-property" | "file-page-type"

export function pagedAt(world: World, at: string): boolean {
  return pageNamed(at, world.index.pageTypesIn())
}

export function kindOf(world: World, at: string): Kind {
  const named = world.index.pageTypesIn()
  if (pagedAt(world, at)) {
    if (namedUnder(at, named)?.pageTypeSlug === PAGE_TYPE) return "file-page-type"
    if (pageNamed(at, world.index.kindsUnder(PAGE_PROPERTY))) return "file-page-property"
    return "file-page"
  }
  return CODE.has(extname(at)) ? "file-code" : "file"
}
