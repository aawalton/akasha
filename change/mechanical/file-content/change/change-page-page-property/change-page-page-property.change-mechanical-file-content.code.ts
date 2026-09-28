import {
  refusing,
  type Said,
  spliced,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  assignedIn,
  literalIn,
  statedIn,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { spelledAs } from "akasha/change/modules/value-spelling/value-spelling.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const TRAILING_LINES = /\n+$/

function restatedAs(path: string, text: string, key: string, stated: string, holds: string): Said {
  const put = spelledAs(stated, holds)
  if (put === null) return refusing(`\`${stated}\` is no ${holds}, so nothing is restated`)
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  const one = owner === null ? null : assignedIn(owner, key)
  if (one === null) return refusing(`\`${path}\` states no ${holds} under \`${key}\``)
  const held = one.initializer
  if (held.getText(source) === put) {
    return refusing(`\`${stated}\` is what \`${key}\` states already`)
  }
  return stating(spliced(path, text, { from: held.getStart(source), to: held.getEnd(), put }))
}

export function restated(
  path: string,
  text: string,
  key: string,
  to: string,
  holds?: string
): Said {
  const stated = to.replace(TRAILING_LINES, "")
  if (holds !== undefined) return restatedAs(path, text, key, stated, holds)
  const source = parsedAs(path, text)
  const held = statedIn(source).get(key)
  if (held === undefined) return refusing(`\`${path}\` states no text under \`${key}\``)
  if (held.text === stated) return refusing(`\`${stated}\` is what \`${key}\` states already`)
  const put = JSON.stringify(stated)
  return stating(spliced(path, text, { from: held.getStart(source), to: held.getEnd(), put }))
}

export type Given = {
  readonly at: string
  readonly key: string
  readonly to: string
  readonly holds?: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so nothing is restated`)
  return restated(given.at, text, given.key, given.to, given.holds)
}
