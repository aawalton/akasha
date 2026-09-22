import type { GlobalTable } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"

import { MAIN_MENU_API } from "akasha/temper/addon/pages/hud/temper-main-menu/modules/main-menu-library/main-menu-library.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  const glob = globalThis as GlobalTable
  glob.TemperMainMenu = MAIN_MENU_API
}

publish()
