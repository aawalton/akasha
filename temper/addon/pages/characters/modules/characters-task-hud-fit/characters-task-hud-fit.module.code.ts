export interface FitNode {
  readonly height: number
  readonly children: readonly FitNode[]
  readonly foldable: boolean
}

export type NodeFit =
  | { readonly kind: "whole" }
  | { readonly kind: "folded" }
  | { readonly kind: "cut"; readonly children: ListFit }

export interface ListFit {
  readonly nodes: readonly NodeFit[]
  readonly shown: number
}

const WHOLE: NodeFit = { kind: "whole" }

const FOLDED: NodeFit = { kind: "folded" }

function wholeHeight(node: FitNode): number {
  let height = node.height
  for (const child of node.children) height += wholeHeight(child)
  return height
}

function nodeHeight(node: FitNode, fit: NodeFit, moreRowHeight: number): number {
  if (fit.kind === "whole") return wholeHeight(node)
  if (fit.kind === "folded") return node.height
  return node.height + listHeight(node.children, fit.children, moreRowHeight)
}

export function listHeight(nodes: readonly FitNode[], fit: ListFit, moreRowHeight: number): number {
  let height = 0
  for (let index = 0; index < fit.shown; index++) {
    const node = nodes[index]
    const one = fit.nodes[index]
    if (node === undefined || one === undefined) continue
    height += nodeHeight(node, one, moreRowHeight)
  }
  return fit.shown < nodes.length ? height + moreRowHeight : height
}

export function isWhole(fit: ListFit, count: number): boolean {
  return fit.shown === count && fit.nodes.every((one) => one.kind === "whole")
}

function cutToFit(node: FitNode, room: number, moreRowHeight: number): NodeFit | undefined {
  if (node.children.length === 0) return undefined
  const children = fitNodes(node.children, room - node.height, moreRowHeight)
  if (children.shown === 0) return undefined
  return { kind: "cut", children }
}

export function fitNodes(nodes: readonly FitNode[], room: number, moreRowHeight: number): ListFit {
  const fits: NodeFit[] = nodes.map(() => WHOLE)
  const heightAt = (index: number): number => {
    const node = nodes[index]
    const one = fits[index]
    return node === undefined || one === undefined ? 0 : nodeHeight(node, one, moreRowHeight)
  }

  let total = 0
  for (let index = 0; index < nodes.length; index++) total += heightAt(index)
  if (total <= room) return { nodes: fits, shown: nodes.length }

  for (let index = nodes.length - 1; index >= 0; index--) {
    const node = nodes[index]
    if (node === undefined || !node.foldable || node.children.length === 0) continue
    const others = total - heightAt(index)
    const cut = cutToFit(node, room - others, moreRowHeight)
    if (cut !== undefined) {
      fits[index] = cut
      return { nodes: fits, shown: nodes.length }
    }
    fits[index] = FOLDED
    total = others + node.height
    if (total <= room) return { nodes: fits, shown: nodes.length }
  }

  let before = total
  for (let shown = nodes.length; shown > 0; shown--) {
    const index = shown - 1
    const node = nodes[index]
    const last = heightAt(index)
    before -= last
    const more = shown < nodes.length ? moreRowHeight : 0
    if (before + last + more <= room) return { nodes: fits, shown }
    if (node === undefined) continue
    const cut = cutToFit(node, room - before - more, moreRowHeight)
    if (cut !== undefined) {
      fits[index] = cut
      return { nodes: fits, shown }
    }
  }
  return { nodes: fits, shown: 0 }
}
