import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import {
  asNumber,
  asRecord,
} from "akasha/temper/addon/pages/characters/modules/companion-qol-casts/companion-qol-casts.module.code.ts"
import { FCOCO } from "akasha/temper/addon/pages/characters/modules/companion-qol-state/companion-qol-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/characters/companions-declarations/companions-declarations.type-declaration.d.ts"

export function registerBindingStringIds(this: void): undefined {
  if (!FCOCO.isCompanionUnlocked) {
    return undefined
  }

  ZO_CreateStringId("SI_BINDING_NAME_FCOCO_TOGGLE_COMPANION", GetString(FCOCO_TOGGLE_COMPANION))

  const companionInfo = FCOCO.companionInfo
  for (let companionDefId = 1; companionDefId <= 30; companionDefId += 1) {
    if (companionInfo[companionDefId] !== undefined) {
      const idSuffix = tostring(companionDefId)
      const dynamicStringId = asNumber(asRecord(globalThis)[`FCOCO_TOGGLE_COMPANION_${idSuffix}`])
      ZO_CreateStringId(
        `SI_BINDING_NAME_FCOCO_TOGGLE_COMPANION_${idSuffix}`,
        GetString(dynamicStringId)
      )
    }
  }
  return undefined
}
