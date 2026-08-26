import { edgesFrom, nodeAt } from "../graph/ask.ts"
import { IMPORT_EDGE } from "../graph/edge-producer/typescript.ts"
import { AKASHA } from "../graph/roots.ts"
import type { BuildContext, NodeRef } from "../graph/node-shape.ts"
import type { Input } from "./mark.ts"

export function contextOver(root: string): BuildContext {
  return { roots: { [AKASHA]: root } }
}

export function closureOf(
  ctx: BuildContext,
  entry: string,
  oids: ReadonlyMap<string, string>
): readonly Input[] {
  const waiting: NodeRef[] = [{ repo: AKASHA, key: entry }]
  const seen = new Set<string>()
  const inputs: Input[] = []
  while (waiting.length > 0) {
    const ref = waiting.shift()
    if (ref === undefined) continue
    if (seen.has(ref.key)) continue
    seen.add(ref.key)
    const node = nodeAt(ctx, ref)
    if (node === null) continue
    const oid = oids.get(ref.key)
    if (oid === undefined) continue
    inputs.push({ path: ref.key, oid })
    for (const edge of edgesFrom(ctx, node, IMPORT_EDGE)) waiting.push(edge.to)
  }
  return inputs
}
