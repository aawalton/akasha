import type { FunctionalType } from "../functional-type/functional-type.module.code.ts"
import { scanWorkspaceImportsOfSpecifier } from "../functional-type-import-scan/functional-type-import-scan.module.code.ts"
import { isWorkspaceDepCoveredByAllowlist } from "../functional-type-purity-allowlist/functional-type-purity-allowlist.module.code.ts"
import type { PackageJsonShape } from "../functional-type-shapes/functional-type-shapes.module.code.ts"

export function getAllDepNames(pkg: PackageJsonShape): readonly string[] {
  const seen = new Set<string>()
  for (const group of [
    pkg.dependencies,
    pkg.devDependencies,
    pkg.peerDependencies,
    pkg.optionalDependencies,
  ]) {
    if (group === undefined) continue
    for (const name of Object.keys(group)) seen.add(name)
  }
  return [...seen]
}

export function getRuntimeDepNames(pkg: PackageJsonShape): readonly string[] {
  const seen = new Set<string>()
  for (const group of [pkg.dependencies, pkg.peerDependencies, pkg.optionalDependencies]) {
    if (group === undefined) continue
    for (const name of Object.keys(group)) seen.add(name)
  }
  return [...seen]
}

export interface HasOnlyPureWorkspaceDepsOptions {
  readonly importerName?: string
  readonly workspaceDir?: string
}

export function hasOnlyPureWorkspaceDeps(
  pkg: PackageJsonShape,
  workspaceFunctionalTypes: ReadonlyMap<string, FunctionalType | null>,
  options?: HasOnlyPureWorkspaceDepsOptions
): boolean {
  const importerName = options?.importerName
  const workspaceDir = options?.workspaceDir
  for (const name of getRuntimeDepNames(pkg)) {
    const inferred = workspaceFunctionalTypes.get(name)
    if (inferred === undefined) continue
    if (inferred === "pure") continue
    if (importerName !== undefined && workspaceDir !== undefined) {
      const imports = scanWorkspaceImportsOfSpecifier(workspaceDir, name)
      if (isWorkspaceDepCoveredByAllowlist(importerName, name, imports)) continue
    }
    return false
  }
  return true
}

export function hasIoWorkspaceDep(
  pkg: PackageJsonShape,
  workspaceFunctionalTypes: ReadonlyMap<string, FunctionalType | null>,
  options?: HasOnlyPureWorkspaceDepsOptions
): boolean {
  const importerName = options?.importerName
  const workspaceDir = options?.workspaceDir
  for (const name of getRuntimeDepNames(pkg)) {
    const type = workspaceFunctionalTypes.get(name)
    if (type !== "io" && type !== "access") continue
    if (importerName !== undefined && workspaceDir !== undefined) {
      const imports = scanWorkspaceImportsOfSpecifier(workspaceDir, name)
      if (isWorkspaceDepCoveredByAllowlist(importerName, name, imports)) continue
    }
    return true
  }
  return false
}
