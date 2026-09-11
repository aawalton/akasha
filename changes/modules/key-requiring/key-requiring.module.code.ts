import { pathsIn } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import { literalIn } from "akasha/changes/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import {
  placingOver,
  readingOf,
  typingOver,
} from "akasha/code-system/code-typing/code-typing.module.code.ts"
import ts from "typescript"

const BLIND = ts.TypeFlags.Any | ts.TypeFlags.Unknown

export type Sought = {
  readonly at: string
  readonly key: string
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
