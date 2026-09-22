import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-constant-shapes/sets-constant-shapes.type-declaration.d.ts"

interface MenuState {
  lam: LibAddonMenu2Surface | undefined
  settingsMenuCreated: LuaMap<boolean, boolean>
}

function makeMenuCreated(this: void): LuaMap<boolean, boolean> {
  const m = new LuaMap<boolean, boolean>()
  m.set(true, false)
  m.set(false, false)
  return m
}

export const MENU_STATE: MenuState = {
  lam: undefined,
  settingsMenuCreated: makeMenuCreated(),
}
