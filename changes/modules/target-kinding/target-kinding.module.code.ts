import { extname } from "node:path"
import { namedUnder, pageNamed } from "@akasha/pages/page-file-name"
import type { World } from "../shadow/change-shadow.module.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

const CODE = new Set([".ts", ".tsx"])

export type Kind = "file" | "file-code" | "file-page" | "file-page-property" | "file-page-type"

export function kindOf(world: World, at: string): Kind {
  const named = world.index.pageTypesIn()
  if (pageNamed(at, named)) {
    if (namedUnder(at, named)?.pageTypeSlug === PAGE_TYPE) return "file-page-type"
    if (pageNamed(at, world.index.kindsUnder(PAGE_PROPERTY))) return "file-page-property"
    return "file-page"
  }
  return CODE.has(extname(at)) ? "file-code" : "file"
}
