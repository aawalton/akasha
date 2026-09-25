import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { namedUnder, pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const PAGE_TYPE = "page-type"

const PAGE_PROPERTY = "page-property"

type Kind = "file" | "file-code" | "file-page" | "file-page-property" | "file-page-type"

type PageKind = Kind | "page" | "page-page-property"

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
  return typeScripted(at) ? "file-code" : "file"
}

export function pageKindOf(world: World, at: string): PageKind {
  const kind = kindOf(world, at)
  if (kind === "file-page-property") return "page-page-property"
  if (kind === "file-page" || kind === "file-page-type") return "page"
  return kind
}
