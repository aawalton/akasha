import { edgesFrom, nodeAt } from "../../graph/ask.ts"
import { IMPORT_EDGE } from "../../graph/edge-producer/import/import.graph-edge-producer.code.attachment.ts"
import { AKASHA } from "../../repo/roots/roots.ts"
import type { BuildContext } from "../../graph/build-context/build-context.ts"
import type { NodeRef } from "../../graph/node-producer/node-shape.ts"
import type { Input } from "../mark/mark.ts"

const ABSENT = "absent"

function refKey(ref: NodeRef): string {
  return `${ref.repo} ${ref.key}`
}

export function closureOf(
  ctx: BuildContext,
  entry: string,
  oids: ReadonlyMap<string, string>
): readonly Input[] {
  const from: NodeRef = { repo: AKASHA, key: entry }
  if (nodeAt(ctx, from) === null) throw new Error(`closure: no node is at ${AKASHA}:${entry}`)
  const waiting: NodeRef[] = [from]
  const seen = new Set<string>()
  const inputs: Input[] = []
  while (waiting.length > 0) {
    const ref = waiting.shift()
    if (ref === undefined) continue
    const at = refKey(ref)
    if (seen.has(at)) continue
    seen.add(at)
    const node = nodeAt(ctx, ref)
    if (node === null) continue
    inputs.push({ path: ref.key, oid: oids.get(ref.key) ?? ABSENT })
    for (const edge of edgesFrom(ctx, node, [IMPORT_EDGE])) waiting.push(edge.to)
  }
  return inputs
}
