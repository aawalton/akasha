import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveFileOfAnyKind } from "akasha/change/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.ts"
import {
  missing,
  refusing,
  type Said,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { pagedAt } from "akasha/change/modules/target-kinding/target-kinding.module.code.ts"

const MOVE_FILE_OF_ANY_KIND = `${changeMechanical.slug}/${moveFileOfAnyKind.slug}` as const

const AT = "at"

const TO = "to"

export type MoveFileAsked = {
  readonly at: string
  readonly to: string
}

export async function moveFile(world: World, given: MoveFileAsked): Promise<Said> {
  if (pagedAt(world, given.at)) {
    return refusing(`\`${given.at}\` names a page, and a page is carried by \`move-page\``)
  }
  return (await reach(world, MOVE_FILE_OF_ANY_KIND, { from: given.at, to: given.to })).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, TO]

export async function runChange(world: World, given: Asked): Promise<Said> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await moveFile(world, { at, to })
}
