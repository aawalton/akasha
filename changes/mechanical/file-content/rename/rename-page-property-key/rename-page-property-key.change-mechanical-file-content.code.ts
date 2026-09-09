import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  splicedIn,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import {
  keyOf,
  literalIn,
  valuesIn,
} from "../../../../modules/page-literal/page-literal.module.code.ts"
import type { World } from "../../../../modules/shadow/change-shadow.module.code.ts"

function spelledAs(name: ts.PropertyName, now: string): string {
  return ts.isStringLiteral(name) ? JSON.stringify(now) : now
}

const ALREADY = "already"

function namedIn(
  held: ts.ObjectLiteralExpression,
  was: string,
  now: string
): ts.PropertyName | null | typeof ALREADY {
  let found: ts.PropertyName | null = null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === now) return ALREADY
    if (key === was) found = one.name
  }
  return found
}

export function respelled(
  path: string,
  text: string,
  was: string,
  now: string,
  within: string | null
): Said {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${path}\` exports no object`)
  const holding = within === null ? [owner] : valuesIn(source, within)
  const spots: Splice[] = []
  for (const one of holding) {
    const name = namedIn(one, was, now)
    if (name === ALREADY) return refusing(`\`${path}\` states \`${now}\` already`)
    if (name === null) continue
    spots.push({ from: name.getStart(source), to: name.getEnd(), put: spelledAs(name, now) })
  }
  if (spots.length > 0) return stating(splicedIn(path, text, spots))
  return within === null ? refusing(`\`${path}\` states no \`${was}\``) : stating([])
}

export type Given = {
  readonly at: string
  readonly was: string
  readonly now: string
  readonly within?: string | null
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no key is respelled`)
  return respelled(given.at, text, given.was, given.now, given.within ?? null)
}
