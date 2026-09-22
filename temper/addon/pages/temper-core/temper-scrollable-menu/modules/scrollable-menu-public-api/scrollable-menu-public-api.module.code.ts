import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-code-bootstrap/scrollable-menu-code-bootstrap.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-api-core/scrollable-menu-api-core.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-api-entries/scrollable-menu-api-entries.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-api-show/scrollable-menu-api-show.module.code.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-api-refresh/scrollable-menu-api-refresh.module.code.ts"

import {
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH,
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU,
  TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU,
} from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/modules/scrollable-menu-state/scrollable-menu-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"

globalThis.TemperScrollableMenu = lib

_G.TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_MAINMENU
_G.TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_SUBMENU
_G.TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH = TEMPER_SCROLLABLE_MENU_UPDATE_MODE_BOTH

for (const [key, value] of pairs(lib.scrollListRowTypes)) {
  _G[key] = value
}

for (const [key, value] of pairs(lib.scrollListRowHighlights)) {
  _G[key] = value
}
