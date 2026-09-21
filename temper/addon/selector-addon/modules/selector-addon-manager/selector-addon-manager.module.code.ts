import { ADDON_NAME } from "akasha/temper/addon/selector-addon/modules/selector-constants/selector-constants.module.code.ts"
import type { AddonEntry } from "akasha/temper/addon/selector-addon/modules/selector-types/selector-types.module.code.ts"

function manager(): AddOnManager {
  return GetAddOnManager()
}

export function listAddons(): AddonEntry[] {
  const mgr = manager()
  const count = mgr.GetNumAddOns()
  const out: AddonEntry[] = []
  for (let i = 1; i <= count; i++) {
    const [name, title, , , enabled, , , isLibrary] = mgr.GetAddOnInfo(i)
    out.push({ index: i, name, title, enabled, isLibrary })
  }
  return out
}

export function setAddOnEnabled(index: number, enabled: boolean): undefined {
  manager().SetAddOnEnabled(index, enabled)
}

export function requestPrioritySave(): undefined {
  manager().RequestAddOnSavedVariablesPrioritySave(ADDON_NAME)
}
