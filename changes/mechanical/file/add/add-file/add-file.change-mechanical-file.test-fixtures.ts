import { refusing, widened } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Reaching } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { runChange } from "./add-file.change-mechanical-file.code.ts"

export const REACHING: Reaching = (world, at, given) => {
  if (at === "change-mechanical-file/add-file") {
    return Promise.resolve(
      widened(runChange(world, given as { at: string; body: string }), world.textOf)
    )
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}
