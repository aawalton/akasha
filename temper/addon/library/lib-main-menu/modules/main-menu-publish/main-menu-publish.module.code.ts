import type { GlobalTable } from "akasha/temper/addon/library/lib-main-menu/modules/main-menu-casts/main-menu-casts.module.code.ts"

import { LIB } from "akasha/temper/addon/library/lib-main-menu/modules/main-menu-library/main-menu-library.module.code.ts"

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
