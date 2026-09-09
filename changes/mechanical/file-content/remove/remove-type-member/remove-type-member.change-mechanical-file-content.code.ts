import { parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import {
  refusing,
  splicedIn,
  stating,
} from "../../../../modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "../../../../modules/answer/change-answer.module.types.ts"
import type { World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { without } from "../../../../modules/literal-splicing/literal-splicing.module.code.ts"
import { aliasIn } from "../../add/add-type-member/add-type-member.change-mechanical-file-content.code.ts"

const LINE = "\n"

export type RemoveTypeMemberAsked = {
  readonly at: string
  readonly type: string
  readonly key: string
}

export function memberIn(holding: ts.TypeLiteralNode, key: string): number {
  return holding.members.findIndex(
    (each) => ts.isPropertySignature(each) && each.name !== undefined && each.name.getText() === key
  )
}

export function namesIn(held: ts.Node): readonly string[] {
  const found: string[] = []
  const walked = (one: ts.Node): undefined => {
    if (ts.isTypeReferenceNode(one) && ts.isIdentifier(one.typeName)) found.push(one.typeName.text)
    return ts.forEachChild(one, walked)
  }
  walked(held)
  return found
}

export function namedBeyond(source: ts.SourceFile, member: ts.Node, named: string): boolean {
  const walked = (one: ts.Node): true | undefined => {
    if (one === member || ts.isImportDeclaration(one)) return undefined
    if (ts.isIdentifier(one) && one.text === named) return true
    return ts.forEachChild(one, walked)
  }
  return ts.forEachChild(source, walked) === true
}

export function withoutImport(text: string, source: ts.SourceFile, named: string): Splice | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const bound = one.importClause?.namedBindings
    if (bound === undefined || !ts.isNamedImports(bound)) continue
    const at = bound.elements.findIndex((each) => each.name.text === named)
    if (at < 0) continue
    if (bound.elements.length > 1) return without(text, source, bound, bound.elements, at)
    const ended = one.getEnd()
    return { from: one.getStart(source), to: text[ended] === LINE ? ended + 1 : ended, put: "" }
  }
  return null
}

export function removeTypeMember(world: World, given: RemoveTypeMemberAsked): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const holding = aliasIn(source, given.type)
  if (holding === null) {
    return refusing(`\`${given.at}\` carries no object type named \`${given.type}\``)
  }
  const at = memberIn(holding, given.key)
  const member = holding.members[at]
  if (member === undefined) return refusing(`\`${given.type}\` carries no \`${given.key}\``)
  const splices: Splice[] = []
  for (const named of namesIn(member)) {
    if (namedBeyond(source, member, named)) continue
    const gone = withoutImport(text, source, named)
    if (gone !== null) splices.push(gone)
  }
  splices.push(without(text, source, holding, holding.members, at))
  return stating(splicedIn(given.at, text, splices))
}

export function runChange(world: World, given: RemoveTypeMemberAsked): Said {
  return removeTypeMember(world, given)
}
