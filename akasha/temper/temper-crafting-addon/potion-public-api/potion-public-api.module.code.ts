import { PotMaker as holder } from "../potion-state/potion-state.module.code.ts"

declare global {
  var PotMaker: import("../potion-state/potion-state.module.code.ts").PotMaker
}

globalThis.PotMaker = holder
