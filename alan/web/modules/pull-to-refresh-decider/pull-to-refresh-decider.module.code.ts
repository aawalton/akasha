export type ScrollableAncestor = { scrollTop: number }

export function shouldArm(ancestorChain: readonly ScrollableAncestor[], scrollY: number): boolean {
  if (scrollY > 0) return false
  return ancestorChain.every((ancestor) => ancestor.scrollTop <= 0)
}
