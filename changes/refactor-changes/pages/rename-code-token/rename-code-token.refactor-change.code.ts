import {
  declaredNamed,
  declaredOn,
  exportsNamed,
  readingOf,
  type Typing,
  typed,
  typingOver,
} from "@akasha/code-system/code-typing"
import ts from "typescript"
import { renameExport } from "../../../atomic-changes/pages/rename-export/rename-export.atomic-change.code.ts"
import { renameLocalVariable } from "../../../atomic-changes/pages/rename-local-variable/rename-local-variable.atomic-change.code.ts"

export const LINE = "--line"

export type Asked = {
  readonly at: string
  readonly of: string
  readonly to: string
  readonly line?: number
}

export type Renamed = {
  readonly bodies: ReadonlyMap<string, string> | null
  readonly refused: string | null
}

type Picked = { readonly node: ts.Node } | { readonly refused: string }

function refusing(why: string): Renamed {
  return { bodies: null, refused: why }
}

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

function pickedIn(typing: Typing, given: Asked, declared: readonly ts.Node[]): Picked {
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

export function renameCodeToken(
  root: string,
  given: Asked,
  textOf: (path: string) => string | null
): Renamed {
  if (!typed(given.at)) return refusing(`\`${given.at}\` names no TypeScript body`)
  const text = textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const typing = typingOver(root, [given.at], readingOf(root, textOf))
  if (exportsNamed(typing, given.at, given.of).length > 0) {
    return renameExport(root, { at: given.at, of: given.of, to: given.to }, textOf)
  }
  const declared = declaredNamed(typing, given.at, given.of)
  if (declared.length === 0) return refusing(`\`${given.at}\` declares no \`${given.of}\``)
  const found = pickedIn(typing, given, declared)
  if ("refused" in found) return refusing(found.refused)
  const source = typing.sourceAt(given.at)
  if (source === null) return refusing(`\`${given.at}\` could not be read`)
  const named = namedOf(found.node)
  if (named === null) return refusing(`\`${given.of}\` is no simple declaration`)
  const said = renameLocalVariable(given.at, text, { at: named.getStart(source), to: given.to })
  if (said.body === null) return refusing(said.refused ?? `\`${given.of}\` was not renamed`)
  return { bodies: new Map([[given.at, said.body]]), refused: null }
}
