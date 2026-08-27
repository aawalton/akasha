import { codeModuleSync } from "../../../../../tools/lib/code-import.ts"

const { isCoveredByWorkspaceGlob } = codeModuleSync<{
  isCoveredByWorkspaceGlob: (workspaces: readonly string[], relPath: string) => boolean
}>("@shared/workspace-paths")

export function computeWorkspacesAfterMove(
  workspaces: readonly string[],
  oldPath: string,
  newPath: string
): { readonly workspaces: readonly string[]; readonly changed: boolean } {
  if (oldPath === newPath) return { workspaces, changed: false }

  const oldCovered = isCoveredByWorkspaceGlob(workspaces, oldPath)
  const newCovered = isCoveredByWorkspaceGlob(workspaces, newPath)

  if (oldCovered && newCovered) return { workspaces, changed: false }

  if (!oldCovered && !newCovered) {
    if (!workspaces.includes(oldPath)) return { workspaces, changed: false }
    return { workspaces: workspaces.map((e) => (e === oldPath ? newPath : e)), changed: true }
  }

  if (oldCovered) {
    if (workspaces.includes(newPath)) return { workspaces, changed: false }
    return { workspaces: [...workspaces, newPath], changed: true }
  }

  if (!workspaces.includes(oldPath)) return { workspaces, changed: false }
  return { workspaces: workspaces.filter((e) => e !== oldPath), changed: true }
}
