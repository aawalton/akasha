import type { FileTree } from "../../../page/file-tree.ts"
import { compiledPageTypeFor } from "../../../page/property/frontmatter.ts"
import { judgeRow } from "../../../page/property/judge.ts"
import type { Property } from "../../../page/property/property.ts"
import { blockOf, stringAt } from "../../../page/text/text.ts"
import { claimant, type PageType } from "../../../page/page-types.ts"
import { rowsNamingOf } from "../../../page/rows-file.ts"
import { refusalText } from "../../../refusal/refusal.ts"

const ROWS_KEY = "rows"

const ROWS_JSONL = "jsonl"

const TARGET_KEY = "target-slug"

export type RowsHeld =
  | { readonly slug: string; readonly properties: readonly Property[]; readonly unheld: null }
  | { readonly slug: null; readonly properties: null; readonly unheld: string | null }

const none: RowsHeld = { slug: null, properties: null, unheld: null }

function unheld(relPath: string, key: string, why: string): RowsHeld {
  return {
    slug: null,
    properties: null,
    unheld: refusalText("rows-sidecar-held-to-no-type", { path: relPath, key, why }),
  }
}

export function rowsHeldBy(
  relPath: string,
  types: readonly PageType[],
  tree: FileTree
): RowsHeld {
  const named = rowsNamingOf(relPath)
  if (named === null) return none
  const { page, key } = named
  const beside = claimant(`${page}.md`, types).type
  if (beside === null) return unheld(relPath, key, `no page any page type claims stands at \`${page}.md\``)
  const { properties: onParent } = compiledPageTypeFor(beside, tree)
  const holder = onParent?.find((one) => one.name === key)
  if (holder === undefined) {
    return unheld(relPath, key, `the \`${beside.slug}\` page type that page holds to declares no \`${key}\` property`)
  }
  const text = tree.open(holder.at)
  if (text === null) return unheld(relPath, key, `its property definition at \`${holder.at}\` cannot be read`)
  const { fm, why } = blockOf(text)
  if (why !== null) {
    return unheld(relPath, key, `the frontmatter of its property definition at \`${holder.at}\` does not parse: ${why}`)
  }
  if (stringAt(fm, ROWS_KEY) !== ROWS_JSONL) {
    return unheld(relPath, key, `\`${holder.at}\` does not declare \`${ROWS_KEY}: ${ROWS_JSONL}\`, so this key holds no rows`)
  }
  const target = stringAt(fm, TARGET_KEY)
  if (target === null) {
    return unheld(relPath, key, `\`${holder.at}\` states no \`${TARGET_KEY}\`, so nothing says what these rows are`)
  }
  const rowType = types.find((one) => one.slug === target)
  if (rowType === undefined) {
    return unheld(relPath, key, `\`${holder.at}\` names \`${target}\` as the type of these rows and no page type goes by that slug`)
  }
  const { properties } = compiledPageTypeFor(rowType, tree)
  if (properties === null || properties.length === 0) {
    return unheld(relPath, key, `the \`${target}\` page type these rows are held to declares no properties`)
  }
  return { slug: rowType.slug, properties, unheld: null }
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
