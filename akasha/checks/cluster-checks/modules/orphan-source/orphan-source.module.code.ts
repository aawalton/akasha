import { WALK_SKIP_DIRS } from "../../../../../tools/lib/graph/producers/file/ts-file/discover-workspace-walk.ts"

export interface OrphanReport {
  readonly file: string
}

const RECOGNIZED_SOURCE_EXTS = [".ts", ".tsx"] as const

function hasRecognizedSourceExt(rel: string): boolean {
  if (rel.endsWith(".d.ts")) return false
  if (rel.endsWith(".generated.ts") || rel.endsWith(".generated.tsx")) return false
  return RECOGNIZED_SOURCE_EXTS.some((ext) => rel.endsWith(ext))
}

function hasExemptSegment(rel: string): boolean {
  return rel.split("/").some((seg) => WALK_SKIP_DIRS.has(seg))
}

function isOwnedByWorkspace(rel: string, workspaceDirs: readonly string[]): boolean {
  return workspaceDirs.some((dir) => rel.startsWith(`${dir}/`))
}

function topSegment(rel: string): string {
  return rel.split("/")[0] ?? rel
}

export function workspaceScopes(workspaceDirs: readonly string[]): ReadonlySet<string> {
  return new Set(workspaceDirs.map(topSegment))
}

export function findOrphanSources(args: {
  files: readonly string[]
  workspaceDirs: readonly string[]
}): readonly OrphanReport[] {
  const { files, workspaceDirs } = args
  const scopes = workspaceScopes(workspaceDirs)
  const orphans: OrphanReport[] = []
  for (const rel of files) {
    if (!scopes.has(topSegment(rel))) continue
    if (!hasRecognizedSourceExt(rel)) continue
    if (hasExemptSegment(rel)) continue
    if (isOwnedByWorkspace(rel, workspaceDirs)) continue
    orphans.push({ file: rel })
  }
  return orphans.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))
}
