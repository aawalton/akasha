import {
  missing,
  refusing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

export type Asked = Readonly<Record<string, string>>

export function addBinaryFileCommand(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  if (world.bodyOf(at) === null) {
    return refusing(`\`${at}\` holds no body, so there is nothing to bring in`)
  }
  return stating([{ kind: "bring", path: at }])
}

export const takes: readonly string[] = [AT]

export function runChange(world: World, given: Asked): Answer {
  return addBinaryFileCommand(world, given)
}
