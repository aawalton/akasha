import { lib } from "../async-state/async-state.module.code.ts"
import type { AsyncLib } from "../async-types/async-types.module.code.ts"

globalThis.LibAsync = lib

declare global {
  var LibAsync: AsyncLib
}
