import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export type Asked = {
  readonly at: string
  readonly old: string
  readonly new: string
}

export function changeFile(world: World, given: Asked): Answer {
  if (given.old === "") {
    return refusing("a passage of no characters names no place in a body")
  }
  const text = world.textOf(given.at)
  if (text === null) {
    return refusing(`\`${given.at}\` holds no body, so no passage is changed`)
  }
  const first = text.indexOf(given.old)
  if (first < 0) {
    return refusing(`\`${given.at}\` holds no such passage, so nothing is changed`)
  }
  if (text.indexOf(given.old, first + 1) >= 0) {
    return refusing(`\`${given.at}\` holds that passage twice or more, and one change works one`)
  }
  const body = `${text.slice(0, first)}${given.new}${text.slice(first + given.old.length)}`
  if (body === text) {
    return refusing(`\`${given.at}\` reads the same after this, so this change writes nothing`)
  }
  return answered([writing(given.at, text, body)])
}

export function runChange(world: World, given: Asked): Answer {
  return changeFile(world, given)
}
