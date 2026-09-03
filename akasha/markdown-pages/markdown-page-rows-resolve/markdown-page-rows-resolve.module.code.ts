import { existsSync } from "node:fs"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import {
  diskFileTree,
  type FileTree,
} from "../markdown-file-tree/markdown-file-tree.module.code.ts"
import {
  type RowsHome,
  rowsHomesFor,
} from "../markdown-page-rows-home/markdown-page-rows-home.module.code.ts"
import { whereFor } from "../markdown-page-write-where/markdown-page-write-where.module.code.ts"
import { registryOf } from "../markdown-property-registry/markdown-property-registry.module.code.ts"

const NONE = "none"

export class RowsHomeUnresolved extends Error {
  readonly pageType: string
  readonly homes: readonly RowsHome[]

  constructor(pageType: string, homes: readonly RowsHome[], why: string) {
    super(why)
    this.name = "RowsHomeUnresolved"
    this.pageType = pageType
    this.homes = homes
  }
}

function homesNamed(homes: readonly RowsHome[]): string {
  return homes.map((one) => `\`${one.parentType}.${one.key}\``).join(", ")
}

function typesUnder(tree: FileTree, parentType: string): readonly string[] {
  const above = new Map(registryOf(tree).map((one) => [one.slug, one.extends]))
  const under: string[] = []
  for (const slug of above.keys()) {
    let at = above.get(slug) ?? null
    while (at !== null && at !== NONE) {
      if (at === parentType) {
        under.push(slug)
        break
      }
      at = above.get(at) ?? null
    }
  }
  return under
}

function standingAt(roots: Roots, tree: FileTree, pageType: string, name: string): boolean {
  const at = whereFor(roots, pageType, name, tree)
  return at !== null && existsSync(at.path)
}

function heldBy(roots: Roots, tree: FileTree, home: RowsHome, parentName: string | null): RowsHome {
  if (parentName === null) return home
  if (standingAt(roots, tree, home.parentType, parentName)) return home
  for (const slug of typesUnder(tree, home.parentType))
    if (standingAt(roots, tree, slug, parentName)) return { ...home, parentType: slug }
  return home
}

export function rowsHomeFor(
  roots: Roots,
  pageType: string,
  parentName: string | null = null,
  key: string | null = null,
  tree: FileTree = diskFileTree(roots)
): RowsHome | null {
  const standing = rowsHomesFor(tree, pageType)
  if (standing.length === 0) return null
  const asked = key === null ? standing : standing.filter((one) => one.key === key)
  if (asked.length === 0) {
    throw new RowsHomeUnresolved(
      pageType,
      standing,
      `no property named \`${key}\` holds rows of \`${pageType}\`; ${homesNamed(standing)} hold them`
    )
  }
  if (asked.length === 1) return heldBy(roots, tree, asked[0] as RowsHome, parentName)
  const named =
    parentName === null
      ? []
      : asked
          .map((one) => heldBy(roots, tree, one, parentName))
          .filter((one) => standingAt(roots, tree, one.parentType, parentName))
  if (named.length === 1) return named[0] as RowsHome
  const said =
    parentName === null
      ? "nothing here names a parent page to tell them apart"
      : named.length === 0
        ? `no page named \`${parentName}\` stands under any of them`
        : `\`${parentName}\` names a page under ${named.length} of them`
  throw new RowsHomeUnresolved(
    pageType,
    named.length === 0 ? asked : named,
    `${asked.length} properties hold rows of \`${pageType}\` — ${homesNamed(asked)} — and ${said}, so nothing ` +
      `states which sidecar this row stands in. A row landed in the first would be read as the other's. ` +
      `Name the property whose rows these are.`
  )
}
