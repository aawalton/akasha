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
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

export const LINE = "--line"

const RENAME_EXPORT = "change-mechanical-code/rename-export"

const RENAME_LOCAL_VARIABLE = "change-mechanical-code/rename-local-variable"

const AT = "at"

const OF = "of"

const TO = "to"

const ON_LINE = "line"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const BESIDE = [".code.ts", ".code.tsx", ".test.ts", ".test.tsx", ".test-fixtures.ts"]

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

function whyNot(given: RenameCodeTokenAsked): string | null {
  if (!BESIDE.some((one) => given.at.endsWith(one))) {
    return `\`${given.at}\` is a page, and a page's export is its slug`
  }
  if (!NAMED.test(given.of)) return `\`${given.of}\` is no name a body carries`
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no name a body carries`
  if (given.of === given.to) return `\`${given.to}\` is the name it already carries`
  return null
}

async function exported(world: World, given: RenameCodeTokenAsked): Promise<Answer> {
  const why = whyNot(given)
  if (why !== null) return refusing(why)
  const reading = importingOf(world.index, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const spelled = await reach(world, RENAME_EXPORT, {
    at: given.at,
    over: [given.at, ...reading.importers],
    of: given.of,
    to: given.to,
  })
  return gathered([spelled.said])
}

export async function renameCodeToken(world: World, given: RenameCodeTokenAsked): Promise<Answer> {
  if (!typed(given.at)) return refusing(`\`${given.at}\` names no TypeScript body`)
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const typing = typingOver(world.root, [given.at], readingOf(world.root, world.textOf))
  if (exportsNamed(typing, given.at, given.of).length > 0) return await exported(world, given)
  const declared = declaredNamed(typing, given.at, given.of)
  if (declared.length === 0) return refusing(`\`${given.at}\` declares no \`${given.of}\``)
  const found = pickedIn(typing, given, declared)
  if ("refused" in found) return refusing(found.refused)
  const source = typing.sourceAt(given.at)
  if (source === null) return refusing(`\`${given.at}\` could not be read`)
  const named = namedOf(found.node)
  if (named === null) return refusing(`\`${given.of}\` is no simple declaration`)
  const renamed = await reach(world, RENAME_LOCAL_VARIABLE, {
    at: given.at,
    spot: named.getStart(source),
    to: given.to,
  })
  return gathered([renamed.said])
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const of = given[OF]
  if (of === undefined) return refusing(missing(OF))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const said = given[ON_LINE]
  if (said === undefined) return await renameCodeToken(world, { at, of, to })
  const line = Number(said)
  if (!Number.isInteger(line)) {
    return refusing(`\`${ON_LINE}\` counts a line, and \`${said}\` is no whole number`)
  }
  return await renameCodeToken(world, { at, of, to, line })
}
