import { createHash } from "node:crypto"

export type Input = {
  readonly path: string
  readonly oid: string
}

function inOrder(inputs: readonly Input[]): readonly Input[] {
  return [...inputs].sort((one, next) => (one.path < next.path ? -1 : one.path > next.path ? 1 : 0))
}

export function markOf(
  kind: string,
  name: string,
  runtime: string,
  inputs: readonly Input[]
): string {
  const hash = createHash("sha256")
  hash.update(`${kind}\n${name}\n${runtime}\n`)
  for (const input of inOrder(inputs)) hash.update(`${input.path} ${input.oid}\n`)
  return hash.digest("hex")
}
