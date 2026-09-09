import { placingOver, readingOf, typingOver } from "@akasha/code/code-typing"
import ts from "typescript"
import { pathsIn } from "../answer/change-answer.module.code.ts"
import { literalIn } from "../page-literal/page-literal.module.code.ts"
import type { World } from "../shadow/change-shadow.module.code.ts"

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
