import { ICT as holder, type Ict } from "../next-boss-state/next-boss-state.module.code.ts"

declare global {
  var ICT: Ict
}

globalThis.ICT = holder
