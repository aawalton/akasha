import type { Population } from "../../../../../tools/lib/check-workflow/population.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"

export type DepType = "dependencies" | "devDependencies"

export interface Finding {
  workspace: string
  workspaceRoot: string
  dep: string
  depType: DepType
  reason: string
}

export interface WorkspaceInfo {
  readonly nodeId: string
  readonly root: string
  readonly name: string
  readonly dependencies: ReadonlySet<string>
  readonly devDependencies: ReadonlySet<string>
  readonly declared: ReadonlySet<string>
  readonly peerDependencies: ReadonlySet<string>
  readonly resolved: ReadonlyMap<string, string>
}

export interface RepoContext {
  readonly codeRoot: string
  readonly treeSha: string
  readonly workspaces: readonly WorkspaceInfo[]
  readonly wsByName: ReadonlyMap<string, WorkspaceInfo>
  readonly closure: ReadonlyMap<string, ReadonlySet<string>>
  readonly patchedDeps: ReadonlySet<string>
  readonly usageByRoot: ReadonlyMap<string, WorkspaceUsage>
  readonly graph: Graph
  readonly population: Population
}

export interface CliArgs {
  readonly jsonOutput: boolean
  readonly treeSha: string
}

export interface WorkspaceUsage {
  readonly specifiers: ReadonlySet<string>
  readonly commands: ReadonlySet<string>
  readonly protocols: ReadonlySet<string>
  readonly hasTsconfig: boolean
  readonly configFileNames: ReadonlySet<string>
}

export interface EffectiveUsage {
  readonly specifiers: ReadonlySet<string>
  readonly commands: ReadonlySet<string>
  readonly peerDeps: ReadonlySet<string>
  readonly protocols: ReadonlySet<string>
  readonly hasTsconfig: boolean
  readonly configFileNames: ReadonlySet<string>
}
