import { dirname, join, normalize } from "node:path/posix"
import { requireAt } from "@shared/utils-narrow/require-at"

export interface RawProjectConfig {
  readonly references: readonly string[]
  readonly files: readonly string[]
}

export type RawConfigReader = (repoRelProject: string) => RawProjectConfig | null

export interface ClosureWalk {
  readonly projects: readonly string[]
  readonly unreadable: readonly string[]
  readonly reached: ReadonlySet<string>
}

export function resolveReference(fromProject: string, referencePath: string): string {
  const joined = normalize(join(dirname(fromProject), referencePath))
  return joined.endsWith(".json") ? joined : join(joined, "tsconfig.json")
}

export function resolveProjectFile(project: string, filePath: string): string {
  return normalize(join(dirname(project), filePath))
}

export function walkReferenceClosure(read: RawConfigReader, rootProject: string): ClosureWalk {
  const seen = new Set<string>([rootProject])
  const unreadable: string[] = []
  const reached = new Set<string>()
  const queue: string[] = [rootProject]

  for (let head = 0; head < queue.length; head++) {
    const project = requireAt(queue, head, "reference-closure queue")
    const config = read(project)
    if (config === null) {
      unreadable.push(project)
      continue
    }
    for (const file of config.files) reached.add(resolveProjectFile(project, file))
    for (const reference of config.references) {
      const target = resolveReference(project, reference)
      if (seen.has(target)) continue
      seen.add(target)
      queue.push(target)
    }
  }

  return { projects: [...seen].sort(), unreadable: unreadable.sort(), reached }
}

export interface PackageReach {
  readonly dir: string
  readonly reached: number
  readonly unreached: number
}

export interface ReachFold {
  readonly tracked: number
  readonly reached: number
  readonly noneReached: readonly PackageReach[]
  readonly partial: readonly PackageReach[]
}

export function packageOf(file: string, packageDirs: ReadonlySet<string>): string | null {
  const segments = file.split("/")
  for (let end = segments.length - 1; end > 0; end--) {
    const candidate = segments.slice(0, end).join("/")
    if (packageDirs.has(candidate)) return candidate
  }
  return null
}

export const NO_PACKAGE = "(outside every package)"

export function foldReachByPackage(args: {
  readonly trackedSources: readonly string[]
  readonly reached: ReadonlySet<string>
  readonly packageDirs: readonly string[]
}): ReachFold {
  const dirs = new Set(args.packageDirs)
  const rows = new Map<string, { reached: number; unreached: number }>()
  let reachedTotal = 0

  for (const file of args.trackedSources) {
    const dir = packageOf(file, dirs) ?? NO_PACKAGE
    let row = rows.get(dir)
    if (row === undefined) {
      row = { reached: 0, unreached: 0 }
      rows.set(dir, row)
    }
    if (args.reached.has(file)) {
      row.reached++
      reachedTotal++
    } else {
      row.unreached++
    }
  }

  const byUnreachedThenName = (a: PackageReach, b: PackageReach): number =>
    b.unreached - a.unreached || a.dir.localeCompare(b.dir)
  const withGaps: PackageReach[] = []
  for (const [dir, row] of rows) {
    if (row.unreached === 0) continue
    withGaps.push({ dir, reached: row.reached, unreached: row.unreached })
  }

  return {
    tracked: args.trackedSources.length,
    reached: reachedTotal,
    noneReached: withGaps.filter((r) => r.reached === 0).sort(byUnreachedThenName),
    partial: withGaps.filter((r) => r.reached > 0).sort(byUnreachedThenName),
  }
}
