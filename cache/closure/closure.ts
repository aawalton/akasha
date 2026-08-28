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

/**
 * Every file reachable from one entry over import edges, with the oid each is at.
 *
 * AN ENTRY THAT IS NO NODE IS REFUSED RATHER THAN ANSWERED WITH NOTHING. A closure of no files is
 * indistinguishable from a file that imports nothing, and a caller marking work by it gets a mark
 * over the kind and the name alone — one that never moves, under which an answer outlives every
 * edit to the code that wrote it. `entryOf` named a layout gone since the checks folder took its
 * domain's name, and every check's mark was that constant until it was found by hand.
 */
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
