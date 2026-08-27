import { codeModuleSync } from "../../../../../../instructions/tools/lib/code-import.ts"
import { expectedPackageName } from "../../../../cluster-checks/src/checks/check-package-names.ts"

const { isCoveredByWorkspaceGlob } = codeModuleSync<{
  isCoveredByWorkspaceGlob: (workspaces: readonly string[], relPath: string) => boolean
}>("@shared/workspace-paths")

export const FUNCTIONAL_TYPES = [
  "pure",
  "access",
  "next-ui",
  "local-service",
  "next-app",
  "service",
  "worker",
  "program",
  "addon",
] as const

export type FunctionalType = (typeof FUNCTIONAL_TYPES)[number]

export function isFunctionalType(value: string): value is FunctionalType {
  return FUNCTIONAL_TYPES.some((t) => t === value)
}

export function derivePackageName(repoRelPath: string): string {
  return expectedPackageName(repoRelPath)
}

export function buildPackageJson(
  name: string,
  functionalType: FunctionalType
): Record<string, unknown> {
  if (functionalType === "pure") {
    return { name, functionalType, private: true }
  }
  return { name, functionalType, version: "0.1.0", type: "module", private: true }
}

export function buildClaudeMd(name: string): string {
  return `---
description: ${name} — TODO: describe this package's purpose and what it owns.
---

# ${name}

TODO: document this package.
`
}

export function appendWorkspace(
  workspaces: readonly string[],
  repoRelPath: string
): readonly string[] {
  if (workspaces.includes(repoRelPath)) {
    throw new Error(`workspace already registered: ${repoRelPath}`)
  }
  return [...workspaces, repoRelPath]
}

export function decideAppendWorkspace(
  workspaces: readonly string[],
  repoRelPath: string
): { readonly workspaces: readonly string[]; readonly added: boolean } {
  if (isCoveredByWorkspaceGlob(workspaces, repoRelPath)) {
    return { workspaces, added: false }
  }
  return { workspaces: appendWorkspace(workspaces, repoRelPath), added: true }
}
