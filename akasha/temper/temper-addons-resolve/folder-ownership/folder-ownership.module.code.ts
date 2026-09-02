import { assertNever } from "@akasha/utils-narrow/assert-never"

export const OWNERSHIP_MARKER_FILE = "build-id.lua"

export type FolderProbe = {
  readonly dirExists: boolean
  readonly markerPresent: boolean | undefined
}

export type FolderOwnership = "absent" | "temper-owned" | "foreign" | "unknown"

export function decideFolderOwnership(probe: FolderProbe): FolderOwnership {
  if (!probe.dirExists) return "absent"
  if (probe.markerPresent === undefined) return "unknown"
  return probe.markerPresent ? "temper-owned" : "foreign"
}

export function parseFloorFor(providerName: string, dep: string): number | undefined {
  const at = dep.search(/[<>=]/)
  if (at === -1) return undefined
  if (dep.slice(0, at).trim() !== providerName) return undefined
  const rest = dep.slice(at)
  if (!rest.startsWith(">=")) return undefined
  const version = rest.slice(2).trim()
  if (!/^\d+$/.test(version)) return undefined
  return Number.parseInt(version, 10)
}

export function collectFloorsFor(
  providerName: string,
  fleetDeps: readonly (readonly string[])[]
): readonly number[] {
  const floors: number[] = []
  for (const deps of fleetDeps) {
    for (const dep of deps) {
      const floor = parseFloorFor(providerName, dep)
      if (floor !== undefined) floors.push(floor)
    }
  }
  return floors
}

export function foreignCopySatisfies(
  foreignAddonVersion: number | undefined,
  requiredFloors: readonly number[]
): boolean | undefined {
  if (foreignAddonVersion === undefined) return undefined
  return requiredFloors.every((floor) => floor <= foreignAddonVersion)
}

export type InstallAction = "install" | "skip" | "refuse"

export type InstallDecision = {
  readonly action: InstallAction
  readonly reason: string
}

function decideForeign(
  addonName: string,
  foreignSatisfiesFloors: boolean | undefined,
  detail: string
): InstallDecision {
  if (foreignSatisfiesFloors === true) {
    return {
      action: "skip",
      reason: `${addonName}/ carries no ${OWNERSHIP_MARKER_FILE}, so something other than the deploy installed it (${detail}). It meets every floor this fleet declares, so the deploy left the folder alone.`,
    }
  }
  if (foreignSatisfiesFloors === false) {
    return {
      action: "refuse",
      reason: `${addonName}/ was installed by something other than the deploy (${detail}) and misses a floor this fleet declares. The game will refuse to load whichever side goes unmet. Settle the version conflict, then run again.`,
    }
  }
  return {
    action: "refuse",
    reason: `${addonName}/ was installed by something other than the deploy (${detail}) and its '## AddOnVersion:' could not be read, so nothing here can tell whether the copy fits. Refusing to delete it or to call it compatible on missing evidence.`,
  }
}

export function decideInstallAction(
  ownership: FolderOwnership,
  addonName: string,
  foreignSatisfiesFloors: boolean | undefined,
  detail: string
): InstallDecision {
  switch (ownership) {
    case "absent":
      return { action: "install", reason: `no ${addonName}/ folder is there` }
    case "temper-owned":
      return { action: "install", reason: `${addonName}/ carries ${OWNERSHIP_MARKER_FILE}` }
    case "foreign":
      return decideForeign(addonName, foreignSatisfiesFloors, detail)
    case "unknown":
      return {
        action: "refuse",
        reason: `${addonName}/ could not be read, so who owns it is unknown. Refusing to delete a folder on missing evidence — settle the read error and run again.`,
      }
    default:
      return assertNever(ownership)
  }
}
