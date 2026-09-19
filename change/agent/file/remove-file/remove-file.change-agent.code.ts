import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const AT = "at"

const REMOVE_FILE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

export type RemoveFileAsked = {
  readonly at: string
}

export async function removeFile(world: World, given: RemoveFileAsked): Promise<Answer> {
  if (pageNamed(given.at, world.index.pageTypesIn())) {
    return refusing(
      `\`${given.at}\` is a page file, which \`remove-page\` takes away rather than this change`
    )
  }
  return (await reach(world, REMOVE_FILE, { at: given.at })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removeFile(world, { at })
}
