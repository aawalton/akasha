import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly body: string
}

// The body a path already holds is answered as the body this edit was worked out from, so a landing
// can tell a path this change adds from a path this change writes over.
export function addFile(world: World, given: Asked): Answer {
  const was = world.textOf(given.at)
  if (was === given.body) {
    return refusing(`\`${given.at}\` already holds this body, so this change writes nothing`)
  }
  return answered([writing(given.at, was, given.body)])
}

export function runChange(world: World, given: Asked): Answer {
  return addFile(world, given)
}
