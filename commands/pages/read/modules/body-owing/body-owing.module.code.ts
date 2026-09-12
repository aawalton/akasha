import { relative, resolve } from "node:path"
import { blobIdOf, readingIn, sameBody } from "akasha/agents/read-record/read-record.module.code.ts"
import { bytesAt } from "akasha/commands/modules/body-reaching/body-reaching.module.code.ts"

export type Aimed = {
  readonly absolute: string
}

function bodyHeld(root: string, agentId: string, at: string, absolute: string): boolean {
  const held = bytesAt(absolute)
  if (!("bytes" in held)) return false
  return sameBody(readingIn(root, agentId, at), blobIdOf(held.bytes))
}

export function owing<One extends Aimed>(
  root: string,
  agentId: string,
  left: readonly One[]
): readonly One[] {
  const from = resolve(root)
  return left.filter((one) => !bodyHeld(root, agentId, relative(from, one.absolute), one.absolute))
}
