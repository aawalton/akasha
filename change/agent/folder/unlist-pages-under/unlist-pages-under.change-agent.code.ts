import { changeMechanicalFolder } from "akasha/change/mechanical/folder/change-mechanical-folder.page-type.ts"
import { unlistPagesUnder as unlistPagesUnderMechanical } from "akasha/change/mechanical/folder/unlist-pages-under/unlist-pages-under.change-mechanical-folder.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const UNLIST = `${changeMechanicalFolder.slug}/${unlistPagesUnderMechanical.slug}` as const

export type UnlistAsked = {
  readonly at: string
}

export async function unlistPagesUnder(world: World, given: UnlistAsked): Promise<Answer> {
  return (await reach(world, UNLIST, given)).said
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  return await unlistPagesUnder(world, { at })
}
