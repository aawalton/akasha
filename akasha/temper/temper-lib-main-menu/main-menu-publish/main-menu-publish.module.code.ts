import { asGlobalTable } from "../main-menu-casts/main-menu-casts.module.code.ts"
import { lib } from "../main-menu-library/main-menu-library.module.code.ts"

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  const glob = asGlobalTable(globalThis)
  if (glob.LibMainMenu2 !== undefined) {
    return
  }
  glob.LibMainMenu2 = lib
}

publish()
