import {
  answered,
  refusing,
  taking,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
}

export function removeFile(given: Asked, textOf: (path: string) => string | null): Answer {
  const text = textOf(given.at)
  if (text === null) {
    return refusing(`\`${given.at}\` holds no body, so a removal takes nothing away`)
  }
  return answered([taking(given.at, text)])
}

export function runChange(world: World, given: Asked): Answer {
  return removeFile(given, world.textOf)
}
