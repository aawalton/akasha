export const ADDON_BUNDLE_BUILD_PACKAGES: ReadonlySet<string> = new Set(["@akasha/temper-web"])

export interface AppBuildCandidate {
  readonly name: string
  readonly dir: string
  readonly hasBuildScript: boolean
}

export interface AppBuildTarget {
  readonly name: string
  readonly dir: string
}

export function appBuildSlug(dir: string): string {
  return dir.replaceAll("/", "-")
}

export function selectAppBuildPackages(
  entries: readonly AppBuildCandidate[]
): readonly AppBuildTarget[] {
  const selected = entries
    .filter((e) => e.hasBuildScript)
    .map((e) => ({ name: e.name, dir: e.dir }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
  if (selected.length === 0) {
    throw new Error(
      `selectAppBuildPackages: none of the ${entries.length} workspace(s) given declares a \`scripts.build\`, so every app-build gate would vanish from the \`check\` workflow and the branch would go green one bundler pass shorter. Refusing rather than gating nothing.`
    )
  }
  return selected
}
