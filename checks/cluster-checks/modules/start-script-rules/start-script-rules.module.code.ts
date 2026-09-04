const BUN_RUN_START_COMMAND_RE =
  /command\s*:\s*\[\s*(["'])bun\1\s*,\s*(["'])run\2\s*,\s*(["'])start\3\s*,?\s*\]/

export function detectsBunRunStartCommand(synthText: string): boolean {
  return BUN_RUN_START_COMMAND_RE.test(synthText)
}

function parentDir(p: string): string {
  const i = p.lastIndexOf("/")
  return i <= 0 ? "" : p.slice(0, i)
}

export function resolveOwningWorkspace(
  synthRelPath: string,
  workspaceDirs: Iterable<string>
): string | null {
  const set = workspaceDirs instanceof Set ? workspaceDirs : new Set(workspaceDirs)
  let dir = parentDir(synthRelPath)
  while (dir !== "") {
    if (set.has(dir)) return dir
    dir = parentDir(dir)
  }
  return null
}

export interface StartContainerSite {
  readonly synthPath: string
  readonly owningWorkspace: string | null
  readonly hasStartScript: boolean
}

export interface MissingStartScriptFinding {
  readonly kind: "MissingStartScript"
  readonly synthPath: string
  readonly workspace: string
}

export interface UnresolvedWorkspaceFinding {
  readonly kind: "UnresolvedWorkspace"
  readonly synthPath: string
}

export type StartScriptFinding = MissingStartScriptFinding | UnresolvedWorkspaceFinding

export function findStartScriptViolations(
  sites: readonly StartContainerSite[]
): readonly StartScriptFinding[] {
  const findings: StartScriptFinding[] = []
  for (const site of sites) {
    if (site.owningWorkspace === null) {
      findings.push({ kind: "UnresolvedWorkspace", synthPath: site.synthPath })
      continue
    }
    if (!site.hasStartScript) {
      findings.push({
        kind: "MissingStartScript",
        synthPath: site.synthPath,
        workspace: site.owningWorkspace,
      })
    }
  }
  findings.sort((a, b) => {
    if (a.synthPath !== b.synthPath) return a.synthPath < b.synthPath ? -1 : 1
    return a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : 0
  })
  return findings
}
