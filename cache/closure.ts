import { readFileSync } from "node:fs"
import { join } from "node:path"
import { edgesFrom, nodeAt } from "../graph/ask.ts"
import { IMPORT_EDGE } from "../graph/edge-producer/typescript.ts"
import { AKASHA } from "../graph/roots.ts"
import type { BuildContext, NodeRef } from "../graph/node-shape.ts"
import { type Input, oidOf } from "./mark.ts"

export function closureOf(root: string, entry: string): readonly Input[] {
  const ctx: BuildContext = { roots: { [AKASHA]: root } }
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
    inputs.push({ path: ref.key, oid: oidOf(readFileSync(join(root, ref.key))) })
    for (const edge of edgesFrom(ctx, node, IMPORT_EDGE)) waiting.push(edge.to)
  }
  return inputs
}
