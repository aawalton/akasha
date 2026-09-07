import { parsedAs } from "@akasha/code/code-source"
import {
  answered,
  refusing,
  writing,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { statedIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

export function restated(path: string, text: string, key: string, to: string): Answer {
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return refusing(`\`${path}\` states no text under \`${key}\``)
  if (held.text === to) return refusing(`\`${to}\` is what \`${key}\` states already`)
  const start = held.getStart(source)
  const body = text.slice(0, start) + JSON.stringify(to) + text.slice(held.getEnd())
  return answered([writing(path, text, body)])
}

export type Given = {
  readonly at: string
  readonly key: string
  readonly to: string
}

export function runChange(world: World, given: Given): Answer {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return restated(given.at, text, given.key, given.to)
}
