import { canonicalize, normalizeAbsolute, outOfBounds } from "../../../../repo/path.ts"
import { locate, rootsHere } from "../../../../repo/roots.ts"

export interface Target {
  readonly named: string
  readonly root: string
  readonly absolute: string
}

function reposNamed(): string {
  return Object.keys(rootsHere())
    .map((one) => `\`${one}\``)
    .join(", ")
}

export function targetOf(declared: string, from: string): Target {
  const stated = canonicalize(
    normalizeAbsolute(declared.startsWith("/") ? declared : `${from}/${declared}`)
  )
  const at = locate(stated)
  if (at === null) {
    throw new Error(`${declared} is inside no repository this reads — it reads ${reposNamed()}`)
  }
  const bad = outOfBounds(at.relPath)
  if (bad !== null) throw new Error(bad)
  const root = rootsHere()[at.repo] as string
  const absolute = `${root}/${at.relPath}`
  const here = locate(canonicalize(from))
  return { named: here !== null && here.repo === at.repo ? at.relPath : absolute, root, absolute }
}
