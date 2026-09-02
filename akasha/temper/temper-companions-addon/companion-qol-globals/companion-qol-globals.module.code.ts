import { FCOCO as holder } from "../companion-qol-state/companion-qol-state.module.code.ts"

declare global {
  var FCOCO: import("../companion-qol-state/companion-qol-state.module.code.ts").FCOCO
}

globalThis.FCOCO = holder
