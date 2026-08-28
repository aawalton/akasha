/**
 * How two page seqs order, a page carrying none sorting last.
 *
 * NO SEQ IS TAKEN HERE. `tools/lib/page-seq.ts` takes them, by spawning the edit command, so every
 * advance of a `next-seq` counter is judged by the akasha checks. An allocator in this package
 * would reach `landFiles`, which stands below `akashaGated`, and move the counter past the gate.
 */
export function comparePageSeq(a: number | null | undefined, b: number | null | undefined): number {
  const left = a ?? null
  const right = b ?? null
  if (left === null && right === null) return 0
  if (left === null) return 1
  if (right === null) return -1
  return left - right
}
