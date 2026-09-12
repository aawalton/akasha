import { routeFor } from "akasha/commands/arguments/argument-routing/argument-routing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Filled = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
}

export type Filing = {
  readonly said: string
  readonly file: string
}

export function filing(said: string): Filing {
  return { said, file: routeFor(said) }
}

export function wordFilling(
  said: Filled,
  flag: string,
  wants: string
): Reading<string | undefined> {
  if (said.loose.length > 1) {
    const extra = namesDrawn(said.loose.slice(1))
    return { refused: [`this names ${wants} once, and ${extra} followed the one it named`] }
  }
  const word = said.loose[0]
  const named = said.named[flag]
  if (word !== undefined && named !== undefined) {
    return {
      refused: [`${wants} is said at \`${flag}\` and as a word, and one way at a time is the way`],
    }
  }
  return named ?? word
}
