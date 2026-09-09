import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Reaching } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./add-file.change-mechanical-file.code.ts"

export const REACHING: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/add-file") {
    return Promise.resolve(runChange(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}
