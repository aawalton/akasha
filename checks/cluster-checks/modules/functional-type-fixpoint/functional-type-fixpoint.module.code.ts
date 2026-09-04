import type { FunctionalType } from "../functional-type/functional-type.module.code.ts"
import { inferFunctionalType } from "../functional-type-discriminators/functional-type-discriminators.module.code.ts"
import type { PackageJsonShape } from "../functional-type-shapes/functional-type-shapes.module.code.ts"

export interface FixpointWorkspace {
  readonly path: string
  readonly name: string | undefined
  readonly pkg: PackageJsonShape
  readonly workspaceDir: string
  readonly declared: FunctionalType | null
}

export interface FixpointResult {
  readonly inferredByName: ReadonlyMap<string, FunctionalType | null>
  readonly inferredByPath: ReadonlyMap<string, FunctionalType>
  readonly unclassifiedPaths: ReadonlySet<string>
  readonly iterations: number
}

export interface FixpointOptions {
  readonly maxIterations?: number
}

export function runFunctionalTypeFixpoint(
  workspaces: readonly FixpointWorkspace[],
  options?: FixpointOptions
): FixpointResult {
  const maxIterations = options?.maxIterations ?? workspaces.length + 8

  let inferredByName = new Map<string, FunctionalType | null>()
  for (const ws of workspaces) {
    if (ws.name === undefined) continue
    if (ws.declared === null) continue
    inferredByName.set(ws.name, ws.declared)
  }

  let inferredByPath = new Map<string, FunctionalType>()
  let unclassifiedPaths = new Set<string>()
  let iterations = 0

  while (true) {
    iterations += 1
    if (iterations > maxIterations) {
      throw new Error(
        `runFunctionalTypeFixpoint: exceeded maxIterations=${maxIterations} ` +
          `over ${workspaces.length} workspace(s) — non-monotone discriminator transition?`
      )
    }

    const nextByName = new Map<string, FunctionalType | null>()
    const nextByPath = new Map<string, FunctionalType>()
    const nextUnclassified = new Set<string>()
    for (const ws of workspaces) {
      const inferred = inferFunctionalType({
        pkg: ws.pkg,
        name: ws.name,
        workspaceDir: ws.workspaceDir,
        workspaceFunctionalTypes: inferredByName,
      })
      if (inferred === null) nextUnclassified.add(ws.path)
      else nextByPath.set(ws.path, inferred)
      if (ws.name !== undefined) nextByName.set(ws.name, inferred)
    }

    if (mapsEqual(nextByName, inferredByName)) {
      inferredByPath = nextByPath
      unclassifiedPaths = nextUnclassified
      return { inferredByName: nextByName, inferredByPath, unclassifiedPaths, iterations }
    }

    inferredByName = nextByName
    inferredByPath = nextByPath
    unclassifiedPaths = nextUnclassified
  }
}

function mapsEqual(
  a: ReadonlyMap<string, FunctionalType | null>,
  b: ReadonlyMap<string, FunctionalType | null>
): boolean {
  if (a.size !== b.size) return false
  for (const [key, value] of a) {
    if (b.get(key) !== value) return false
  }
  return true
}
