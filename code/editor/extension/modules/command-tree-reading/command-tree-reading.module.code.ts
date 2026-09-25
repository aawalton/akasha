import type { CommandTreeRow } from "akasha/alan/harness/code-editor/data-interface/pages/command-tree/command-tree.code-editor-data-interface.code.ts"

export function countRows(nodes: readonly CommandTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += 1 + countRows(node.children)
  }
  return total
}

export function countCommands(nodes: readonly CommandTreeRow[]): number {
  let total = 0
  for (const node of nodes) {
    total += (node.kind === "command" ? 1 : 0) + countCommands(node.children)
  }
  return total
}
