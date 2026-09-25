import type { RegisteredSavedVarsInfo } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

interface LibState {
  savedVarRegistry: LuaTable<object, RegisteredSavedVarsInfo>
  currentAddonName?: string
}

export const LIB_STATE: LibState = {
  savedVarRegistry: new LuaTable<object, RegisteredSavedVarsInfo>(),
  currentAddonName: undefined,
}
