import { buildDerivedData } from "akasha/temper/addon/pages/lib-treasure/modules/treasure-build-data/treasure-build-data.module.code.ts"
import { LIB_NAME } from "akasha/temper/addon/pages/lib-treasure/modules/treasure-constants/treasure-constants.module.code.ts"
import { ICONS } from "akasha/temper/addon/pages/lib-treasure/modules/treasure-icons/treasure-icons.module.code.ts"
import type { LibTreasureTable } from "akasha/temper/addon/pages/lib-treasure/modules/treasure-types/treasure-types.module.code.ts"
import "akasha/temper/eso/type/eso-addon-manager/eso-addon-manager.type-declaration.d.ts"

function getAddonVersion(this: void): number | undefined {
  const addOnManager = GetAddOnManager()
  const numAddOns = addOnManager.GetNumAddOns()
  if (typeof numAddOns !== "number") return undefined
  for (let i = 1; i <= numAddOns; i += 1) {
    const [name] = addOnManager.GetAddOnInfo(i)
    if (name === LIB_NAME) {
      return addOnManager.GetAddOnVersion(i)
    }
  }
  return undefined
}

export const LIB: LibTreasureTable = {
  name: LIB_NAME,
  version: getAddonVersion(),
  data: buildDerivedData(),
  icons: ICONS,
}
