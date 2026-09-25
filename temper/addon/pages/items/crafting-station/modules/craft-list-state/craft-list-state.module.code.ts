import {
  buildDataState,
  type DataStateView,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

const PANEL_LEVEL = 2

const VIEWS = new LuaTable<string, DataStateView>()

function viewOf(panelName: string, emptyText: string): DataStateView | undefined {
  const held = VIEWS.get(panelName)
  if (held !== undefined) return held
  const panel = WINDOW_MANAGER.GetControlByName(panelName)
  if (panel === undefined) return undefined
  const made = buildDataState(panel, { empty: emptyText, level: PANEL_LEVEL })
  VIEWS.set(panelName, made)
  return made
}

export function showCraftListState(panelName: string, shown: number, emptyText: string): undefined {
  viewOf(panelName, emptyText)?.show(shown > 0 ? "loaded" : "empty")
  return undefined
}
