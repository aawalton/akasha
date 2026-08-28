import type { FileTree } from "../../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../../page/property/frontmatter.ts"
import { judgeRow } from "../../../page/property/judge.ts"
import type { Property } from "../../../page/property/property.ts"
import { blockOf, stringAt } from "../../../page/text/text.ts"
import { claimant, type PageType } from "../../../page/page-types.ts"

const DATA_FILE = /^(.*)\.([a-z0-9-]+)\.jsonl$/

const ROWS_KEY = "rows"

const ROWS_JSONL = "jsonl"

const TARGET_KEY = "target-slug"

export type RowsHeld =
  | { readonly slug: string; readonly properties: readonly Property[] }
  | { readonly slug: null; readonly properties: null }

const none: RowsHeld = { slug: null, properties: null }

export function rowsHeldBy(
  relPath: string,
  types: readonly PageType[],
  tree: FileTree
): RowsHeld {
  const split = DATA_FILE.exec(relPath)
  if (split === null) return none
  const beside = claimant(`${split[1] as string}.md`, types).type
  if (beside === null) return none
  const { properties: onParent } = compiledPageTypeFor(beside, tree)
  const holder = onParent?.find((one) => one.name === (split[2] as string))
  if (holder === undefined) return none
  const text = tree.open(holder.at)
  if (text === null) return none
  const { fm, why } = blockOf(text)
  if (why !== null) return none
  if (stringAt(fm, ROWS_KEY) !== ROWS_JSONL) return none
  const target = stringAt(fm, TARGET_KEY)
  const rowType = target === null ? undefined : types.find((one) => one.slug === target)
  if (rowType === undefined) return none
  const { properties } = compiledPageTypeFor(rowType, tree)
  if (properties === null || properties.length === 0) return none
  return { slug: rowType.slug, properties }
}

export function rowsOutside(
  body: string,
  slug: string,
  properties: readonly Property[]
): readonly string[] {
  const refusals: string[] = []
  const seen = new Set<string>()
  const shapes = new Set<string>()
  for (const line of body.split("\n")) {
    if (line.trim() === "") continue
    let parsed: unknown
    try {
      parsed = JSON.parse(line)
    } catch {
      continue
    }
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) continue
    const values = parsed as Record<string, unknown>
    const shape = Object.keys(values).join(" ")
    if (shapes.has(shape)) continue
    shapes.add(shape)
    for (const one of judgeRow(values, slug, properties).refusals) {
      if (seen.has(one)) continue
      seen.add(one)
      refusals.push(one)
    }
  }
  return refusals
}
