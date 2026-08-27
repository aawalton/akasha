/**
 * Building the refusal a wrong formula answers.
 *
 * A refusal names what was wrong and where, in the terms the formula was
 * written in, never in the terms of what read or checked it.
 */

import type { Place, Refused } from "./formula.ts"

/** Where an offset falls in a text, as a line and a column. */
export const placeIn = (source: string, offset: number): Place => {
  const held = Math.max(0, Math.min(offset, source.length))
  let line = 1
  let lineStart = 0
  for (let index = 0; index < held; index += 1) {
    if (source[index] === "\n") {
      line += 1
      lineStart = index + 1
    }
  }
  return { offset: held, line, column: held - lineStart + 1 }
}

/** A refusal at a moment, naming what was wrong and where. */
export const refuse = (
  moment: Refused["moment"],
  source: string,
  offset: number,
  message: string
): Refused => ({ ok: false, moment, message, at: placeIn(source, offset) })
