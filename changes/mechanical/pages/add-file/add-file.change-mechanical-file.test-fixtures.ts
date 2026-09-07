import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Reaching } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { addFile } from "./add-file.change-mechanical-file.code.ts"

export const REACHING: Reaching = (world, at, given) => {
  if (at === "change-mechanical/add-file") {
    return Promise.resolve(addFile(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}
