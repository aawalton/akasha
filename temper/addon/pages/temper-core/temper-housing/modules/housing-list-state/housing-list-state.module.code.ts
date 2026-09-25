import {
  buildDataState,
  type DataStateView,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

const WINDOW_LEVEL = 1

const VIEWS = new LuaTable<Control, DataStateView>()

function viewOf(area: Control, emptyText: string): DataStateView {
  const held = VIEWS.get(area)
  if (held !== undefined) return held
  const made = buildDataState(area, { empty: emptyText, level: WINDOW_LEVEL })
  VIEWS.set(area, made)
  return made
}

export function showHousingListState(area: Control, shown: number, emptyText: string): undefined {
  viewOf(area, emptyText).show(shown > 0 ? "loaded" : "empty")
  return undefined
}
