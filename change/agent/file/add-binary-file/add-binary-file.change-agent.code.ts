import {
  type Answer,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const FROM = "from"

const ROOTED = "/"

export type Asked = Readonly<Record<string, string>>

export function addBinaryFileCommand(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const from = given[FROM]
  if (from !== undefined) {
    if (!from.startsWith(ROOTED)) {
      return refusing(`\`${from}\` is not a whole path, so nothing is brought from it`)
    }
    return stating([{ kind: "bring", path: at, pathFrom: from }])
  }
  if (world.bodyOf(at) === null) {
    return refusing(`\`${at}\` holds no body, so there is nothing to bring in`)
  }
  return stating([{ kind: "bring", path: at }])
}

export const takes: readonly string[] = [AT, FROM]

export function runChange(world: World, given: Asked): Answer {
  return addBinaryFileCommand(world, given)
}
