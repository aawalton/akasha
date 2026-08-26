export function comparePageSeq(a: number | null | undefined, b: number | null | undefined): number {
  const left = a ?? null
  const right = b ?? null
  if (left === null && right === null) return 0
  if (left === null) return 1
  if (right === null) return -1
  return left - right
}
