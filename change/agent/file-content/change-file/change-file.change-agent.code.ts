import { changeFileContentOfAnyKind } from "akasha/change/mechanical/file-content/change/change-file-content-of-any-kind/change-file-content-of-any-kind.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  machineWrites,
  reach,
  type World,
} from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const OLD = "old"

const NEW = "new"

const CHANGE_FILE =
  `${changeMechanicalFileContent.slug}/${changeFileContentOfAnyKind.slug}` as const

export type Asked = Readonly<Record<string, string>>

function passageIn(said: string): string {
  return said.endsWith("\n") ? said.slice(0, -1) : said
}

export async function changeFileCommand(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const old = given[OLD]
  if (old === undefined) return refusing(missing(OLD))
  const becomes = given[NEW]
  if (becomes === undefined) return refusing(missing(NEW))
  const written = machineWrites(world, at)
  if (written !== null) return refusing(written)
  const passage = { at, old: passageIn(old), new: passageIn(becomes) }
  return (await reach(world, CHANGE_FILE, passage)).said
}

export const takes: readonly string[] = [AT, OLD, NEW]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  return await changeFileCommand(world, given)
}
