import type { TreeNode } from "../tree"

export interface AggregateNode {
  id: string
  weight: number
  length: number
  progress: number
}

export interface AggregateResult {
  totalLength: number
  totalProgress: number
  totalCount: number
  totalRemaining: number
}

export function recomputeTree<T extends AggregateNode>(
  roots: readonly TreeNode<T>[]
): Map<string, AggregateResult> {
  const results = new Map<string, AggregateResult>()

  function computeNode(node: TreeNode<T>): AggregateResult {
    const { weight, length, progress } = node.item
    const ew = weight === 0 ? 1 : weight

    let totalLength: number
    let totalProgress: number
    let totalCount: number

    if (node.children.length === 0) {
      totalLength = Math.trunc(ew * length)
      totalProgress = Math.trunc(ew * progress)
      totalCount = 1
    } else {
      totalLength = Math.trunc(ew * length)
      totalProgress = Math.trunc(ew * progress)
      totalCount = 1

      for (const child of node.children) {
        const childResult = computeNode(child)
        totalLength += childResult.totalLength
        totalProgress += childResult.totalProgress
        totalCount += childResult.totalCount
      }
    }

    const result: AggregateResult = {
      totalLength,
      totalProgress,
      totalCount,
      totalRemaining: totalLength - totalProgress,
    }

    results.set(node.item.id, result)
    return result
  }

  for (const root of roots) {
    computeNode(root)
  }

  return results
}
