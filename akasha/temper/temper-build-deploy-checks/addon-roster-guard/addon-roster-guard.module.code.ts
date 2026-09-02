import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"

export const EMPTY_ADDON_ROSTER_HINT =
  "addon roster is empty — listAllAddons() found no addon.json across the domain tree; the scan would pass vacuously. Check that addon dirs are declared workspace members carrying an addon.json (listExternalAddonRelDirs)."

export function addonRosterIsEmpty(repoRoot: string): boolean {
  return listAllAddons({ repoRoot }).length === 0
}
