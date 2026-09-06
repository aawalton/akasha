import {
  declaredNamed,
  declaredOn,
  exportsNamed,
  readingOf,
  type Typing,
  typed,
  typingOver,
} from "@akasha/code/code-typing"
import ts from "typescript"
import { renameExport } from "../../../mechanical/pages/rename-export/rename-export.change-mechanical.code.ts"
import { renameLocalVariable } from "../../../mechanical/pages/rename-local-variable/rename-local-variable.change-mechanical.code.ts"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export const LINE = "--line"

const AT = "at"

const OF = "of"

const TO = "to"

const ON_LINE = "line"

export type RenameCodeTokenAsked = {
  readonly at: string
  readonly of: string
  readonly to: string
  readonly line?: number
}

type Picked = { readonly node: ts.Node } | { readonly refused: string }

function namedOf(node: ts.Node): ts.Node | null {
  if (ts.isFunctionDeclaration(node)) return node.name ?? null
  if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) return node.name
  if (ts.isVariableDeclaration(node)) return ts.isIdentifier(node.name) ? node.name : null
  return null
}

function linesOf(typing: Typing, path: string, declared: readonly ts.Node[]): string {
  const lines = new Set<number>()
  for (const one of declared) {
    const line = declaredOn(typing, path, one)
    if (line !== null) lines.add(line)
  }
  return [...lines].sort((here, there) => here - there).join(" or ")
}

function pickedIn(
  typing: Typing,
  given: RenameCodeTokenAsked,
  declared: readonly ts.Node[]
): Picked {
  if (given.line === undefined) {
    const first = declared[0]
    if (declared.length === 1 && first !== undefined) return { node: first }
    return {
      refused:
        `\`${given.at}\` declares \`${given.of}\` in more than one place, so say ` +
        `${LINE} with ${linesOf(typing, given.at, declared)}`,
    }
  }
  for (const one of declared) {
    if (declaredOn(typing, given.at, one) === given.line) return { node: one }
  }
  return {
    refused:
      `\`${given.at}\` declares no \`${given.of}\` on line ${given.line}, so say ` +
      `${LINE} with ${linesOf(typing, given.at, declared)}`,
  }
}

export function renameCodeToken(world: World, given: RenameCodeTokenAsked): Answer {
  if (!typed(given.at)) return refusing(`\`${given.at}\` names no TypeScript body`)
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const typing = typingOver(world.root, [given.at], readingOf(world.root, world.textOf))
  if (exportsNamed(typing, given.at, given.of).length > 0) {
    return gathered([renameExport(world, { at: given.at, of: given.of, to: given.to })])
  }
  const declared = declaredNamed(typing, given.at, given.of)
  if (declared.length === 0) return refusing(`\`${given.at}\` declares no \`${given.of}\``)
  const found = pickedIn(typing, given, declared)
  if ("refused" in found) return refusing(found.refused)
  const source = typing.sourceAt(given.at)
  if (source === null) return refusing(`\`${given.at}\` could not be read`)
  const named = namedOf(found.node)
  if (named === null) return refusing(`\`${given.of}\` is no simple declaration`)
  return gathered([
    renameLocalVariable(given.at, text, { at: named.getStart(source), to: given.to }),
  ])
}

export type Asked = Readonly<Record<string, string>>

// A command line hands the arguments in as text worked out while the command runs, so the shape is
// read here rather than trusted, and a shape this change cannot use is refused by name. A line is
// counted rather than spelled, so text naming no whole number is refused rather than read as one.
export function runChange(world: World, given: Asked): Answer {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const of = given[OF]
  if (of === undefined) return refusing(missing(OF))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const said = given[ON_LINE]
  if (said === undefined) return renameCodeToken(world, { at, of, to })
  const line = Number(said)
  if (!Number.isInteger(line)) {
    return refusing(`\`${ON_LINE}\` counts a line, and \`${said}\` is no whole number`)
  }
  return renameCodeToken(world, { at, of, to, line })
}
