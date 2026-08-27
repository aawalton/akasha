import { reachableWorkerSources } from "./worker-shape-instrumentation"

const NAME_PROPERTY_RE =
  /\b(?:workerName|name)\s*:\s*(?:"([^"\n]*)"|'([^'\n]*)'|`([^`$\n]*)`|([A-Za-z_$][\w$]*))/g

const STRING_CONST_RE =
  /\bconst\s+([A-Za-z_$][\w$]*)\s*(?::\s*[^=\n]+)?=\s*(?:"([^"\n]*)"|'([^'\n]*)'|`([^`$\n]*)`)/g

function firstDefined(...groups: readonly (string | undefined)[]): string | undefined {
  for (const g of groups) if (g !== undefined) return g
  return undefined
}

export interface EmittedWorkerNames {
  readonly resolved: ReadonlySet<string>
  readonly unresolved: readonly string[]
}

export function resolveEmittedWorkerNames(
  workerRelPath: string,
  sourcesByPath: ReadonlyMap<string, string>
): EmittedWorkerNames {
  const reached = reachableWorkerSources(workerRelPath, sourcesByPath)

  const literalByIdentifier = new Map<string, string>()
  for (const stripped of reached.values()) {
    for (const match of stripped.matchAll(STRING_CONST_RE)) {
      const identifier = match[1]
      const value = firstDefined(match[2], match[3], match[4])
      if (identifier === undefined || value === undefined) continue
      literalByIdentifier.set(identifier, value)
    }
  }

  const resolved = new Set<string>()
  const unresolved = new Set<string>()
  for (const stripped of reached.values()) {
    for (const match of stripped.matchAll(NAME_PROPERTY_RE)) {
      const literal = firstDefined(match[1], match[2], match[3])
      if (literal !== undefined) {
        resolved.add(literal)
        continue
      }
      const identifier = match[4]
      if (identifier === undefined) continue
      const bound = literalByIdentifier.get(identifier)
      if (bound !== undefined) {
        resolved.add(bound)
        continue
      }
      unresolved.add(identifier)
    }
  }

  return { resolved, unresolved: [...unresolved].sort() }
}

export function workerStemOf(relPath: string): string {
  const basename = relPath.slice(relPath.lastIndexOf("/") + 1)
  return basename.slice(0, basename.length - ".worker.ts".length)
}
