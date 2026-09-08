import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  spliced,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

function spelledAs(name: ts.PropertyName, now: string): string {
  return ts.isStringLiteral(name) ? JSON.stringify(now) : now
}

export function respelled(path: string, text: string, was: string, now: string): Said {
  const source = parsedAs(path, text)
  const owner = literalIn(source)
  if (owner === null) return refusing(`\`${path}\` exports no object`)
  let held: ts.PropertyAssignment | null = null
  for (const one of owner.properties) {
    if (!ts.isPropertyAssignment(one)) continue
    const key = keyOf(one)
    if (key === now) return refusing(`\`${path}\` states \`${now}\` already`)
    if (key === was) held = one
  }
  if (held === null) return refusing(`\`${path}\` states no \`${was}\``)
  const name = held.name
  const put = spelledAs(name, now)
  return stating(spliced(path, text, { from: name.getStart(source), to: name.getEnd(), put }))
}

export type Given = {
  readonly at: string
  readonly was: string
  readonly now: string
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no key is respelled`)
  return respelled(given.at, text, given.was, given.now)
}
