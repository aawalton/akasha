import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { changeFile } from "../../../pages/change-file/change-file.change-mechanical.code.ts"

const AT = "at"

const OLD = "old"

const NEW = "new"

export type Asked = Readonly<Record<string, string>>

function missing(key: string): string {
  return `\`${key}\` names what this change is handed, and the arguments hold no \`${key}\``
}

// A command line hands the arguments in as text worked out while the command runs, so the shape is
// read here rather than trusted, and a shape this change cannot use is refused by name.
export function changeFileCommand(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const old = given[OLD]
  if (old === undefined) return refusing(missing(OLD))
  const becomes = given[NEW]
  if (becomes === undefined) return refusing(missing(NEW))
  return changeFile(world, { at, old, new: becomes })
}

export function runChange(world: World, given: Asked): Answer {
  return changeFileCommand(world, given)
}
