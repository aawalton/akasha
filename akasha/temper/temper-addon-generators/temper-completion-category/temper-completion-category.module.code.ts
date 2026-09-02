import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const COMPLETION_TABS = ["account", "characters", "companions"] as const
type CompletionTab = (typeof COMPLETION_TABS)[number]

const COMPLETION_CATEGORY_EAV_SCHEMA = z
  .object({
    key: z.string(),
    nodeId: z.string(),
    tab: z.enum(COMPLETION_TABS),
    parent: z.string().nullable().optional(),
    sortOrder: z.number().int().nonnegative(),
    pickerLabel: z.string().optional(),
  })
  .strict()

interface ParsedNode {
  id: string
  key: string
  nodeId: string
  name: string
  tab: CompletionTab
  parentId: string | null
  sortOrder: number
  pickerLabel?: string
}

function identityOf(key: string): string {
  return key
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function parseRow(row: Page): ParsedNode {
  if (typeof row.id !== "string") {
    throw new Error(`temper-completion-category row missing id: ${JSON.stringify(row)}`)
  }
  if (typeof row.title !== "string") {
    throw new Error(`temper-completion-category row ${row.id} has non-string title`)
  }
  const eav = COMPLETION_CATEGORY_EAV_SCHEMA.parse({
    key: row.key,
    nodeId: row.nodeId,
    tab: row.tab,
    parent: row.parent ?? null,
    sortOrder: row.sortOrder,
    pickerLabel: row.pickerLabel,
  })
  return {
    id: identityOf(eav.key),
    key: eav.key,
    nodeId: eav.nodeId,
    name: row.title,
    tab: eav.tab,
    parentId: eav.parent == null ? null : identityOf(eav.parent),
    sortOrder: eav.sortOrder,
    pickerLabel: eav.pickerLabel,
  }
}

interface BuilderNode {
  parsed: ParsedNode
  children: readonly BuilderNode[]
}

function buildTree(parsed: readonly ParsedNode[]): Record<CompletionTab, readonly BuilderNode[]> {
  const childrenByParentId = new Map<string | null, ParsedNode[]>()
  for (const node of parsed) {
    const bucket = childrenByParentId.get(node.parentId)
    if (bucket === undefined) {
      childrenByParentId.set(node.parentId, [node])
    } else {
      bucket.push(node)
    }
  }

  const allIds = new Set(parsed.map((p) => p.id))
  for (const parentId of childrenByParentId.keys()) {
    if (parentId !== null && !allIds.has(parentId)) {
      const orphan = childrenByParentId.get(parentId)?.[0]
      throw new Error(
        `temper-completion-category: node '${orphan?.key ?? "<unknown>"}' has unknown parent id '${parentId}'`
      )
    }
  }

  function makeNode(p: ParsedNode): BuilderNode {
    const childRows = childrenByParentId.get(p.id) ?? []
    const sortedChildren = [...childRows].sort((a, b) => a.sortOrder - b.sortOrder)
    return {
      parsed: p,
      children: sortedChildren.map(makeNode),
    }
  }

  const tabRoots = childrenByParentId.get(null) ?? []
  const byTab: Record<CompletionTab, BuilderNode | null> = {
    account: null,
    characters: null,
    companions: null,
  }
  for (const root of tabRoots) {
    if (root.key !== root.tab) {
      throw new Error(
        `temper-completion-category: tab-root '${root.key}' has mismatched tab '${root.tab}'`
      )
    }
    byTab[root.tab] = makeNode(root)
  }
  for (const tab of COMPLETION_TABS) {
    if (byTab[tab] === null) {
      throw new Error(`temper-completion-category: missing tab-root row for '${tab}'`)
    }
  }

  return {
    account: byTab.account?.children ?? [],
    characters: byTab.characters?.children ?? [],
    companions: byTab.companions?.children ?? [],
  }
}

function renderNode(builder: BuilderNode, indent: string): string {
  const parts: string[] = []
  parts.push(`${indent}{`)
  const inner = `${indent}  `
  parts.push(`${inner}id: ${JSON.stringify(builder.parsed.nodeId)},`)
  parts.push(`${inner}name: ${JSON.stringify(builder.parsed.name)},`)
  if (builder.parsed.pickerLabel !== undefined) {
    parts.push(`${inner}pickerLabel: ${JSON.stringify(builder.parsed.pickerLabel)},`)
  }
  if (builder.children.length > 0) {
    parts.push(`${inner}children: [`)
    for (const child of builder.children) {
      parts.push(`${renderNode(child, `${inner}  `)},`)
    }
    parts.push(`${inner}],`)
  }
  parts.push(`${indent}}`)
  return parts.join("\n")
}

function renderTab(builders: readonly BuilderNode[]): string {
  if (builders.length === 0) return "[]"
  const lines: string[] = ["["]
  for (const b of builders) {
    lines.push(`${renderNode(b, "    ")},`)
  }
  lines.push("  ]")
  return lines.join("\n")
}

export function generateTemperCompletionCategory(rows: readonly Page[]): string {
  const parsed = rows.map(parseRow)
  const byTab = buildTree(parsed)

  return `\
/**
 * Temper Completion Category Tree (Generated)
 *
 * Static skeleton of the ESO completion-tracking category tree (tabs →
 * cards → optional static children), sourced from the universal pages
 * table (page type: temper-completion-category). The runtime barrel
 * (\`completion-category-tree-data.ts\`) composes the dynamic
 * achievement-children of the two achievement cards on top of this
 * snapshot — those subtrees come from \`achievement-data.ts\` and are
 * intentionally not in this snapshot.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CompletionCategoryNode, CompletionTab } from "../completion-category-tree-types"

export const COMPLETION_CATEGORY_TREE_STATIC = {
  account: ${renderTab(byTab.account)},
  characters: ${renderTab(byTab.characters)},
  companions: ${renderTab(byTab.companions)},
} as const satisfies Record<CompletionTab, readonly CompletionCategoryNode[]>
`
}
