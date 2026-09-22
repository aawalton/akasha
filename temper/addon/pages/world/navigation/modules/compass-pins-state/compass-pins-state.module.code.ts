import { FOV } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-constants/compass-pins-constants.module.code.ts"
import type { CompassPinLayout } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-types/compass-pins-types.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export const pinLayouts = new LuaTable<AnyNotNil, CompassPinLayout>()

export const STATE = {
  distanceCoefficient: 1,
  defaultFOV: FOV,
}
