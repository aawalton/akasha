import { parsedAs } from "@akasha/code/code-source"
import { placingOver, readingOf, typingOver } from "@akasha/code/code-typing"
import ts from "typescript"
import {
  pathsIn,
  refusing,
  spliced,
  stating,
} from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../../modules/page-literal/page-literal.module.code.ts"

const BLIND = ts.TypeFlags.Any | ts.TypeFlags.Unknown

export type Sought = {
  readonly at: string
  readonly key: string
}

export type RemovePropertyValueAsked = Sought & {
  readonly value: string
}

function commaAfter(text: string, from: number, limit: number): number {
  for (let at = from; at < limit; at += 1) {
    const one = text[at] ?? ""
    if (one === ",") return at + 1
    if (one.trim() !== "") return from
  }
  return from
}

export function without(
  text: string,
  source: ts.SourceFile,
  held: ts.Node,
  every: readonly ts.Node[],
  at: number
): Splice {
  const one = every[at]
  if (one === undefined) return { from: 0, to: 0, put: "" }
  if (every.length === 1) {
    return { from: held.getStart(source) + 1, to: held.getEnd() - 1, put: "" }
  }
  const past = commaAfter(text, one.getEnd(), held.getEnd())
  if (past > one.getEnd()) return { from: one.pos, to: past, put: "" }
  const before = every[at - 1]
  const from = before === undefined ? held.getStart(source) + 1 : before.getEnd()
  return { from, to: one.getEnd(), put: "" }
}

export function requiredIn(world: World, given: Sought): boolean | null {
  const placed = placingOver(pathsIn(world.over), world.textOf)
  const read = readingOf(world.root, world.textOf, placed)
  const typing = typingOver(world.root, [given.at], read, placed)
  const source = typing.sourceAt(given.at)
  const held = source === null ? null : literalIn(source)
  if (held === null) return null
  const type = typing.checker.getContextualType(held)
  if (type === undefined || (type.flags & BLIND) !== 0) return null
  const found = type.getProperty(given.key)
  return found === undefined ? false : (found.flags & ts.SymbolFlags.Optional) === 0
}

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const owner = literalIn(source)
  const at =
    owner === null
      ? -1
      : owner.properties.findIndex(
          (each) => ts.isPropertyAssignment(each) && keyOf(each) === given.key
        )
  const one = owner === null ? undefined : owner.properties[at]
  if (owner === null || one === undefined || !ts.isPropertyAssignment(one)) {
    return refusing(`\`${given.at}\` states no \`${given.key}\``)
  }
  const holding = one.initializer
  if (ts.isArrayLiteralExpression(holding)) {
    const found = holding.elements.findIndex(
      (each) => ts.isStringLiteral(each) && each.text === given.value
    )
    if (found < 0) return refusing(`\`${given.key}\` holds no \`${given.value}\``)
    const gone = without(text, source, holding, holding.elements, found)
    return stating(spliced(given.at, text, gone))
  }
  if (!ts.isStringLiteral(holding) || holding.text !== given.value) {
    return refusing(`\`${given.key}\` holds no \`${given.value}\``)
  }
  const required = requiredIn(world, given)
  if (required === null) {
    return refusing(`whether \`${given.key}\` is required could not be read`)
  }
  if (required) {
    return refusing(`\`${given.key}\` is required, so taking \`${given.value}\` away is a retype`)
  }
  const left = without(text, source, owner, owner.properties, at)
  return stating(spliced(given.at, text, left))
}

export function runChange(world: World, given: RemovePropertyValueAsked): Said {
  return removePropertyValue(world, given)
}
