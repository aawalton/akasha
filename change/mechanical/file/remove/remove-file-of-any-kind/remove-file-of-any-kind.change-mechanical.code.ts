import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { removeFileCode } from "akasha/change/mechanical/file/remove/remove-file-code/remove-file-code.change-mechanical.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import { removeFilePageProperty } from "akasha/change/mechanical/file/remove/remove-file-page-property/remove-file-page-property.change-mechanical.ts"
import { removeFilePageType } from "akasha/change/mechanical/file/remove/remove-file-page-type/remove-file-page-type.change-mechanical.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { kindOf } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"

const ADDRESSES = {
  file: `${changeMechanicalFile.slug}/${removeFile.slug}`,
  "file-code": `${changeMechanical.slug}/${removeFileCode.slug}`,
  "file-page": `${changeMechanicalFile.slug}/${removeFilePage.slug}`,
  "file-page-property": `${changeMechanical.slug}/${removeFilePageProperty.slug}`,
  "file-page-type": `${changeMechanical.slug}/${removeFilePageType.slug}`,
} as const

export type Asked = {
  readonly at: string
}

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (await reach(world, addressFor(world, given.at), { at: given.at })).said
}
