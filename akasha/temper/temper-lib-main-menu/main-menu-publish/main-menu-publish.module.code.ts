import { lib } from "../main-menu-library/main-menu-library.module.code.ts"
import type { Lib } from "../main-menu-shape/main-menu-shape.module.code.ts"

declare global {
  var LibMainMenu2: Lib | undefined
}

function publish(): undefined {
  if (IsConsoleUI()) {
    return
  }
  if (globalThis.LibMainMenu2 !== undefined) {
    return
  }
  globalThis.LibMainMenu2 = lib
}

publish()
