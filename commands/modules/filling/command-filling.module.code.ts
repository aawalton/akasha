import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { routeFor } from "akasha/commands/arguments/routing/argument-routing.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { inputIn, type Piping } from "akasha/commands/modules/piping/piping.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const PIPED = "-"

const TRAILING_LINES = /(?:\r?\n)+$/

export type Reading<T> = T | { readonly refused: readonly string[] }

export type Filled = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
}

export type Filing = {
  readonly said: string
  readonly file: string
  readonly whole: boolean
}

export function filing(said: string): Filing {
  return { said, file: routeFor(said), whole: false }
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

export type Held = { readonly text: string } | { readonly refused: readonly string[] }

export function heldAt(root: string, flag: string, path: string, piping: Piping = inputIn): Held {
  if (path === PIPED) {
    const input = piping()
    if ("tty" in input) {
      return { refused: [`\`${flag} ${PIPED}\` names the input, and nothing is piped in`] }
    }
    if ("unreadable" in input) {
      return { refused: [`the input would not open — ${input.unreadable}`] }
    }
    return { text: new TextDecoder().decode(input.bytes) }
  }
  try {
    return { text: readFileSync(resolve(root, path), "utf8") }
  } catch (thrown) {
    return { refused: [`\`${flag} ${path}\` would not open — ${whyOf(thrown)}`] }
  }
}

export type Prose = { readonly text: string | undefined } | { readonly refused: readonly string[] }

export function filledIn(
  root: string,
  inline: string | undefined,
  path: string | undefined,
  one: Filing,
  piping: Piping = inputIn
): Prose {
  if (inline !== undefined && path !== undefined) {
    return {
      refused: [
        `what \`${one.said}\` carries is said there and at \`${one.file}\`, and one way at a time is the way`,
      ],
    }
  }
  if (inline !== undefined) return { text: inline }
  if (path === undefined) return { text: undefined }
  const held = heldAt(root, one.file, path, piping)
  if ("refused" in held) return held
  return { text: one.whole ? held.text : held.text.replace(TRAILING_LINES, "") }
}

export function proseIn(
  root: string,
  named: Readonly<Record<string, string>>,
  one: Filing,
  piping: Piping = inputIn
): Prose {
  return filledIn(root, named[one.said], named[one.file], one, piping)
}
