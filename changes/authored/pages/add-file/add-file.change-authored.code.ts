import { addFile } from "../../../mechanical/pages/add-file/add-file.change-mechanical.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const AT = "at"

const BODY = "body"

export type Asked = Readonly<Record<string, string>>

function missing(key: string): string {
  return `\`${key}\` names what this change is handed, and the arguments hold no \`${key}\``
}

// A command line hands the arguments in as text worked out while the command runs, so the shape is
// read here rather than trusted, and a shape this change cannot use is refused by name.
export function addFileCommand(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const body = given[BODY]
  if (body === undefined) return refusing(missing(BODY))
  return addFile(world, { at, body })
}

export function runChange(world: World, given: Asked): Answer {
  return addFileCommand(world, given)
}
