import { changeFileContent } from "akasha/change/mechanical/file-content/change/change-file-content/change-file-content.change-mechanical-file-content.ts"
import { changeFileContentCode } from "akasha/change/mechanical/file-content/change/change-file-content-code/change-file-content-code.change-mechanical-file-content.ts"
import { changeFileContentPage } from "akasha/change/mechanical/file-content/change/change-file-content-page/change-file-content-page.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { kindOf } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"

const PAGE = `${changeMechanicalFileContent.slug}/${changeFileContentPage.slug}` as const

const ADDRESSES = {
  file: `${changeMechanicalFileContent.slug}/${changeFileContent.slug}`,
  "file-code": `${changeMechanicalFileContent.slug}/${changeFileContentCode.slug}`,
  "file-page": PAGE,
  "file-page-property": PAGE,
  "file-page-type": PAGE,
} as const

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export function addressFor(world: World, at: string) {
  return ADDRESSES[kindOf(world, at)]
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return (
    await reach(world, addressFor(world, given.at), {
      at: given.at,
      old: given.old,
      new: given.new,
    })
  ).said
}
