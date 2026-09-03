import { isCoveredByWorkspaceGlob } from "@akasha/workspace-paths/workspace-dirs"
import { expectedPackageName } from "../../../../../akasha/checks/cluster-checks/pages/package-names/package-names.cluster-check.code.ts"

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

const LEGACY_PACKAGES_ROOT = "packages"

export function packagePathProblem(repoRelPath: string): string | null {
  if (repoRelPath === "") return "the path is empty"
  if (repoRelPath.includes("\\")) {
    return `"${repoRelPath}" uses backslashes; write it with POSIX forward slashes`
  }
  const segments = repoRelPath.split("/")
  if (segments.some((segment) => segment === "")) {
    return `"${repoRelPath}" has an empty segment; write it with no leading, trailing or doubled slash`
  }
  if (segments.some((segment) => segment === "." || segment === "..")) {
    return `"${repoRelPath}" is not a plain repo-relative path`
  }
  if (segments.length < 2) {
    return `"${repoRelPath}" names only a scope; a package path is <scope>/<segment>…, e.g. stories/engine`
  }
  if (segments[0] === LEGACY_PACKAGES_ROOT) {
    const flattened = segments.slice(1).join("/")
    return (
      `"${repoRelPath}" starts with ${LEGACY_PACKAGES_ROOT}/, which this repository does not have. ` +
      `The first segment is the scope, so write "${flattened}" instead — kept as written, the package ` +
      `would be named @${LEGACY_PACKAGES_ROOT}/${segments.slice(1).join("-")}.`
    )
  }
  return null
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
