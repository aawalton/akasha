import { runChange } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.code.ts"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Reaching } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_FILE = `${changeMechanicalFile.slug}/${addFile.slug}` as const

export const REACHING: Reaching = (world, at, given) => {
  if (at === ADD_FILE) {
    return Promise.resolve(runChange(world, given as { at: string; body: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}
