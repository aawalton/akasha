export const BUNDLE_REUSE_DIST_ENV = "TEMPER_ADDON_BUNDLE_REUSE_DIST"

export type AddonDependencies = {
  readonly dependsOn: readonly string[]
  readonly optionalDependsOn?: readonly string[]
}

export type DistributableSet = {
  readonly included: readonly string[]
  readonly external: readonly string[]
}

export function dependencyName(token: string): string {
  const cut = token.search(/[<>=]/)
  return (cut === -1 ? token : token.slice(0, cut)).trim()
}

export function resolveDistributableSet(
  metadataByName: ReadonlyMap<string, AddonDependencies>
): DistributableSet {
  const external = new Set<string>()
  for (const said of metadataByName.values()) {
    for (const token of [...said.dependsOn, ...(said.optionalDependsOn ?? [])]) {
      const name = dependencyName(token)
      if (name === "" || metadataByName.has(name)) continue
      external.add(name)
    }
  }
  return {
    included: [...metadataByName.keys()].sort(),
    external: [...external].sort(),
  }
}
