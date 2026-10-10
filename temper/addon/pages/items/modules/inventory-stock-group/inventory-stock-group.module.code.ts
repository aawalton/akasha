export function stockGroupKey(ruleIndex: number | undefined, itemId: number): number {
  return ruleIndex !== undefined && ruleIndex >= 0 ? ruleIndex : itemId
}
