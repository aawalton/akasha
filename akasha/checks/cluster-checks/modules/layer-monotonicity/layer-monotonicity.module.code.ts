export interface WorkspaceEntry {
  readonly name: string
  readonly path: string
}

export type PackageEdgeKind =
  | "dependencies"
  | "devDependencies"
  | "peerDependencies"
  | "optionalDependencies"

export interface PackageEdge {
  readonly source: string
  readonly target: string
  readonly kind: PackageEdgeKind
}

export interface LayerViolationInput {
  readonly workspaces: readonly WorkspaceEntry[]
  readonly typeByPath: ReadonlyMap<string, string>
  readonly rankByType: ReadonlyMap<string, number>
  readonly edges: readonly PackageEdge[]
}

export interface RankInversionEndpoint {
  readonly name: string
  readonly path: string
  readonly functionalType: string
  readonly rank: number
}

export interface RankInversionFinding {
  readonly kind: "RankInversion"
  readonly importer: RankInversionEndpoint
  readonly importee: RankInversionEndpoint
}

export type Finding = RankInversionFinding

export interface LayerMonotonicityResult {
  readonly findings: readonly Finding[]
  readonly judgedEdges: readonly PackageEdge[]
}

export function judgeLayerMonotonicity(input: LayerViolationInput): LayerMonotonicityResult {
  const { workspaces, typeByPath, rankByType, edges } = input

  const pathByName = new Map<string, string>()
  for (const ws of workspaces) {
    pathByName.set(ws.name, ws.path)
  }

  const judgedEdges: PackageEdge[] = []
  const inversions: RankInversionFinding[] = []
  for (const edge of edges) {
    if (edge.kind === "devDependencies") continue
    const sourcePath = pathByName.get(edge.source)
    const targetPath = pathByName.get(edge.target)
    if (sourcePath === undefined || targetPath === undefined) continue
    const sourceType = typeByPath.get(sourcePath)
    const targetType = typeByPath.get(targetPath)
    if (sourceType === undefined || targetType === undefined) continue
    const sourceRank = rankByType.get(sourceType)
    const targetRank = rankByType.get(targetType)
    if (sourceRank === undefined || targetRank === undefined) continue
    judgedEdges.push(edge)
    if (sourceRank >= targetRank) continue
    inversions.push({
      kind: "RankInversion",
      importer: {
        name: edge.source,
        path: sourcePath,
        functionalType: sourceType,
        rank: sourceRank,
      },
      importee: {
        name: edge.target,
        path: targetPath,
        functionalType: targetType,
        rank: targetRank,
      },
    })
  }
  inversions.sort((a, b) => {
    if (a.importer.name !== b.importer.name) {
      return a.importer.name < b.importer.name ? -1 : 1
    }
    if (a.importee.name !== b.importee.name) {
      return a.importee.name < b.importee.name ? -1 : 1
    }
    return 0
  })

  return { findings: inversions, judgedEdges }
}

export function findLayerViolations(input: LayerViolationInput): readonly Finding[] {
  return judgeLayerMonotonicity(input).findings
}
