export type InstalledAddon = {
  readonly dir: string
  readonly version: string | undefined
}

export type CatalogEntry = {
  readonly uid: string
  readonly name: string
  readonly version: string
  readonly dirs: readonly string[]
}

export type AddonStatus = "outdated" | "up-to-date" | "deploy-owned" | "unmatched"

export type PlannedAddon = {
  readonly dir: string
  readonly status: AddonStatus
  readonly installedVersion: string | undefined
  readonly latestVersion: string | undefined
  readonly uid: string | undefined
}

export type UpdatePlan = {
  readonly addons: readonly PlannedAddon[]
}

function normalizeVersion(version: string): string {
  return version.trim().replace(/\s+/g, " ")
}

export function versionsMatch(installed: string | undefined, latest: string): boolean {
  if (installed === undefined) return false
  return normalizeVersion(installed) === normalizeVersion(latest)
}

export function buildDirIndex(catalog: readonly CatalogEntry[]): Map<string, CatalogEntry> {
  const index = new Map<string, CatalogEntry>()
  for (const entry of catalog) {
    for (const dir of entry.dirs) {
      if (!index.has(dir)) index.set(dir, entry)
    }
  }
  return index
}

export function findCatalogEntryByName(
  catalog: readonly CatalogEntry[],
  name: string
): CatalogEntry | undefined {
  return catalog.find((entry) => entry.name === name || entry.dirs.includes(name))
}

export function planUpdates(
  installed: readonly InstalledAddon[],
  catalog: readonly CatalogEntry[],
  ownedNames: ReadonlySet<string>
): UpdatePlan {
  const index = buildDirIndex(catalog)
  const addons = installed.map((one): PlannedAddon => {
    if (ownedNames.has(one.dir)) {
      return {
        dir: one.dir,
        status: "deploy-owned",
        installedVersion: one.version,
        latestVersion: undefined,
        uid: undefined,
      }
    }
    const entry = index.get(one.dir)
    if (entry === undefined) {
      return {
        dir: one.dir,
        status: "unmatched",
        installedVersion: one.version,
        latestVersion: undefined,
        uid: undefined,
      }
    }
    return {
      dir: one.dir,
      status: versionsMatch(one.version, entry.version) ? "up-to-date" : "outdated",
      installedVersion: one.version,
      latestVersion: entry.version,
      uid: entry.uid,
    }
  })
  return { addons }
}

export type SelectOpts = {
  readonly force: boolean
  readonly only: readonly string[]
}

export function selectTargets(plan: UpdatePlan, opts: SelectOpts): readonly PlannedAddon[] {
  const onlySet = new Set(opts.only)
  return plan.addons.filter((one) => {
    if (one.uid === undefined) return false
    if (onlySet.size > 0 && !onlySet.has(one.dir)) return false
    if (opts.force) return true
    return one.status === "outdated"
  })
}

export function unknownOnlyDirs(plan: UpdatePlan, only: readonly string[]): readonly string[] {
  const installable = new Set(
    plan.addons.filter((one) => one.uid !== undefined).map((one) => one.dir)
  )
  return only.filter((dir) => !installable.has(dir))
}

export function distinctUids(selected: readonly PlannedAddon[]): readonly string[] {
  const seen = new Set<string>()
  const uids: string[] = []
  for (const one of selected) {
    if (one.uid !== undefined && !seen.has(one.uid)) {
      seen.add(one.uid)
      uids.push(one.uid)
    }
  }
  return uids
}
