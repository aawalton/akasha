import {
  answered,
  moving,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly from: string
  readonly to: string
}

export function moveFile(given: Asked, textOf: (path: string) => string | null): Answer {
  if (given.from === given.to) return refusing(`\`${given.to}\` is the path it already sits at`)
  const text = textOf(given.from)
  if (text === null) return refusing(`\`${given.from}\` holds no body, so a move carries nothing`)
  if (textOf(given.to) !== null) return refusing(`\`${given.to}\` is a body already`)
  return answered([moving(given.from, given.to, text, text)])
}

export function runChange(world: World, given: Asked): Answer {
  return moveFile(given, world.textOf)
}
