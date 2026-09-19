import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { moveFileCode } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.ts"
import { moveFilePage } from "akasha/change/mechanical/file/move/move-file-page/move-file-page.change-mechanical-file.ts"
import { moveFilePageProperty } from "akasha/change/mechanical/file/move/move-file-page-property/move-file-page-property.change-mechanical.ts"
import { moveFilePageType } from "akasha/change/mechanical/file/move/move-file-page-type/move-file-page-type.change-mechanical.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { kindOf } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"

const ADDRESSES = {
  file: `${changeMechanicalFile.slug}/${moveFile.slug}`,
  "file-code": `${changeMechanical.slug}/${moveFileCode.slug}`,
  "file-page": `${changeMechanicalFile.slug}/${moveFilePage.slug}`,
  "file-page-property": `${changeMechanical.slug}/${moveFilePageProperty.slug}`,
  "file-page-type": `${changeMechanical.slug}/${moveFilePageType.slug}`,
} as const

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export type Asked = {
  readonly from: string
  readonly to: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const address = addressFor(world, given.from)
  return (await reach(world, address, { from: given.from, to: given.to })).said
}
