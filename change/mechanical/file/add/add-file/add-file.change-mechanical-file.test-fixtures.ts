import { runChange } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.code.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Reaching } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

export const REACHING: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/add-file") {
    return Promise.resolve(runChange(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}
