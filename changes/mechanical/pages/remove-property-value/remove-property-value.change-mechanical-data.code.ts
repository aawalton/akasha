import { parsedAs } from "@akasha/code/code-source"
import { readingOf, typingOver } from "@akasha/code/code-typing"
import ts from "typescript"
import {
  answered,
  refusing,
  writing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { keyOf, literalIn } from "../../../modules/page-literal/page-literal.module.code.ts"

const BLIND = ts.TypeFlags.Any | ts.TypeFlags.Unknown

export type RemovePropertyValueAsked = {
  readonly at: string
  readonly key: string
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

function without(
  text: string,
  source: ts.SourceFile,
  held: ts.Node,
  every: readonly ts.Node[],
  at: number
): string {
  const one = every[at]
  if (one === undefined) return text
  if (every.length === 1) {
    return text.slice(0, held.getStart(source) + 1) + text.slice(held.getEnd() - 1)
  }
  const past = commaAfter(text, one.getEnd(), held.getEnd())
  if (past > one.getEnd()) return text.slice(0, one.pos) + text.slice(past)
  const before = every[at - 1]
  const from = before === undefined ? held.getStart(source) + 1 : before.getEnd()
  return text.slice(0, from) + text.slice(one.getEnd())
}

function requiredIn(world: World, given: RemovePropertyValueAsked): boolean | null {
  const typing = typingOver(world.root, [given.at], readingOf(world.root, world.textOf))
  const source = typing.sourceAt(given.at)
  const held = source === null ? null : literalIn(source)
  if (held === null) return null
  const type = typing.checker.getContextualType(held)
  if (type === undefined || (type.flags & BLIND) !== 0) return null
  const found = type.getProperty(given.key)
  return found === undefined ? false : (found.flags & ts.SymbolFlags.Optional) === 0
}

export function removePropertyValue(world: World, given: RemovePropertyValueAsked): Answer {
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
    const body = without(text, source, holding, holding.elements, found)
    return answered([writing(given.at, text, body)])
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
  return answered([writing(given.at, text, without(text, source, owner, owner.properties, at))])
}

export function runChange(world: World, given: RemovePropertyValueAsked): Answer {
  return removePropertyValue(world, given)
}
