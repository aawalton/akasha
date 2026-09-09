import { pageNamed } from "@akasha/pages/page-file-name"
import { missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const REMOVE_FILE = "change-mechanical/remove-file-of-any-kind"

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

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await removeFile(world, { at })
}
