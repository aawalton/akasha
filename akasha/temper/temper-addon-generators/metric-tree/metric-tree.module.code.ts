import { z } from "zod"
import type { Page } from "../addon-data-page/addon-data-page.module.code.ts"

const NODE_TYPES = ["category", "subcategory", "metric"] as const
type NodeType = (typeof NODE_TYPES)[number]

const NODE_EAV_SCHEMA = z
  .object({
    slug: z.string(),
    nodeId: z.string(),
    nodeType: z.enum(NODE_TYPES),
    parent: z.string().nullable().optional(),
    displayOrder: z.number(),
    useAccentColor: z.boolean().optional(),
    includeInChildAggregates: z.boolean().optional(),
  })
  .strict()

interface ParsedNode {
  slug: string
  nodeId: string
  title: string
  nodeType: NodeType
  parent: string | null
  displayOrder: number
  useAccentColor: boolean
  includeInChildAggregates: boolean
}

function parseNode(row: Page): ParsedNode {
  if (typeof row.slug !== "string") {
    throw new Error(`temper-metric-tree row has non-string slug: ${JSON.stringify(row.slug)}`)
  }
  if (row.title === null || typeof row.title !== "string") {
    throw new Error(`temper-metric-tree row ${row.slug} has null/non-string title`)
  }
  const eav = NODE_EAV_SCHEMA.parse({
    slug: row.slug,
    nodeId: row.nodeId,
    nodeType: row.nodeType,
    parent: row.parent,
    displayOrder: row.displayOrder,
    useAccentColor: row.useAccentColor,
    includeInChildAggregates: row.includeInChildAggregates,
  })
  return {
    slug: eav.slug,
    nodeId: eav.nodeId,
    title: row.title,
    nodeType: eav.nodeType,
    parent: eav.parent ?? null,
    displayOrder: eav.displayOrder,
    useAccentColor: eav.useAccentColor ?? false,
    includeInChildAggregates: eav.includeInChildAggregates ?? false,
  }
}

interface OutNode {
  type: "subcategory" | "metric"
  id: string
  name?: string
  includeInChildAggregates?: boolean
  useAccentColor?: boolean
  children?: readonly OutNode[]
}

interface OutCategory {
  id: string
  name: string
  children: readonly OutNode[]
}

function buildTree(parsed: readonly ParsedNode[]): Record<string, OutCategory> {
  const byParent = new Map<string | null, ParsedNode[]>()
  for (const node of parsed) {
    const bucket = byParent.get(node.parent) ?? []
    bucket.push(node)
    byParent.set(node.parent, bucket)
  }
  for (const bucket of byParent.values()) {
    bucket.sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
      return a.slug.localeCompare(b.slug)
    })
  }

  function emitNode(node: ParsedNode): OutNode {
    if (node.nodeType === "category") {
      throw new Error(
        `unexpected nested category node ${node.slug} (parent=${String(node.parent)})`
      )
    }
    const children = byParent.get(node.slug) ?? []
    const out: OutNode = {
      type: node.nodeType,
      id: node.nodeId,
    }
    if (node.nodeType === "subcategory") {
      out.name = node.title
    }
    if (node.useAccentColor) out.useAccentColor = true
    if (node.includeInChildAggregates) out.includeInChildAggregates = true
    if (children.length > 0) {
      out.children = children.map(emitNode)
    }
    return out
  }

  const roots = byParent.get(null) ?? []
  const tree: Record<string, OutCategory> = {}
  for (const root of roots) {
    if (root.nodeType !== "category") {
      throw new Error(
        `top-level node ${root.slug} has nodeType=${root.nodeType}, expected 'category'`
      )
    }
    const children = byParent.get(root.slug) ?? []
    tree[root.nodeId] = {
      id: root.nodeId,
      name: root.title,
      children: children.map(emitNode),
    }
  }
  return tree
}

function renderTreeLiteral(tree: Record<string, OutCategory>): string {
  function renderNode(n: OutNode, indent: string): string {
    const parts: string[] = []
    parts.push(`${JSON.stringify("type")}: ${JSON.stringify(n.type)}`)
    parts.push(`${JSON.stringify("id")}: ${JSON.stringify(n.id)}`)
    if (n.name !== undefined) parts.push(`${JSON.stringify("name")}: ${JSON.stringify(n.name)}`)
    if (n.useAccentColor === true) parts.push(`${JSON.stringify("useAccentColor")}: true`)
    if (n.includeInChildAggregates === true) {
      parts.push(`${JSON.stringify("includeInChildAggregates")}: true`)
    }
    let head = `${indent}{ ${parts.join(", ")}`
    if (n.children && n.children.length > 0) {
      const childIndent = `${indent}    `
      const rendered = n.children.map((c) => renderNode(c, childIndent)).join(",\n")
      head += `,\n${indent}  ${JSON.stringify("children")}: [\n${rendered},\n${indent}  ] }`
    } else {
      head += ` }`
    }
    return head
  }
  function renderCategory(cat: OutCategory, indent: string): string {
    const childIndent = `${indent}    `
    const rendered = cat.children.map((c) => renderNode(c, childIndent)).join(",\n")
    return [
      `${indent}${JSON.stringify(cat.id)}: {`,
      `${indent}  ${JSON.stringify("id")}: ${JSON.stringify(cat.id)},`,
      `${indent}  ${JSON.stringify("name")}: ${JSON.stringify(cat.name)},`,
      `${indent}  ${JSON.stringify("children")}: [`,
      rendered,
      `${indent}  ],`,
      `${indent}}`,
    ].join("\n")
  }
  const rendered = Object.values(tree)
    .map((cat) => renderCategory(cat, "  "))
    .join(",\n")
  return `{\n${rendered},\n}`
}

export function generateTemperMetricTree(rows: readonly Page[]): string {
  const parsed = rows.map(parseNode)
  const tree = buildTree(parsed)
  const body = renderTreeLiteral(tree)
  return `\
/**
 * Temper Metric Tree (Generated)
 *
 * UI organizational hierarchy for character stats — categories,
 * subcategories, and metric leaf nodes — sourced from the universal
 * pages table (page type: temper-metric-tree).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { MetricTree } from "../metrics/metric-tree-types"

export const METRIC_TREE = ${body} satisfies MetricTree
`
}
