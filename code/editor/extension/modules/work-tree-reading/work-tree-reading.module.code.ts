import type { WorkTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import { ACTIVE_COLORS } from "akasha/code/editor/extension/modules/agent-forest/agent-forest.module.code.ts"

function keptActive(row: WorkTreeRow): readonly WorkTreeRow[] {
  if (row.kind === "intent") return [row]
  const children = row.children.flatMap(keptActive)
  const holdsInitiative = children.some((child) => child.kind === "initiative")
  const active = row.kind === "initiative" && row.color !== null && ACTIVE_COLORS.has(row.color)
  return active || holdsInitiative ? [{ ...row, children }] : []
}

export function activeOnly(roots: readonly WorkTreeRow[]): readonly WorkTreeRow[] {
  return roots.flatMap(keptActive)
}

export function countRows(nodes: readonly WorkTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countOfKind(nodes: readonly WorkTreeRow[], kind: WorkTreeRow["kind"]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.kind === kind ? 1 : 0) + countOfKind(node.children, kind)
  }
  return total
}

export function workKeys(nodes: readonly WorkTreeRow[]): readonly string[] {
  return nodes.flatMap((node) => [node.key, ...workKeys(node.children)])
}
