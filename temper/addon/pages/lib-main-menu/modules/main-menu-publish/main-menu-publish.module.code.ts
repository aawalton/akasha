import type { GlobalTable } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"

import { LIB } from "akasha/temper/addon/pages/lib-main-menu/modules/main-menu-library/main-menu-library.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  const glob = globalThis as GlobalTable
  if (glob.LibMainMenu2 !== undefined) {
    return
  }
  glob.LibMainMenu2 = LIB
}

publish()
