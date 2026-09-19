import {
  refusing,
  type Said,
  type Splice,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  keyFaultIn,
  spelledBare,
} from "akasha/change/modules/page-literal/page-literal.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { aliasIn } from "akasha/change/modules/type-literal/type-literal.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import ts from "typescript"

export type AddTypeMemberAsked = {
  readonly at: string
  readonly type: string
  readonly key: string
  readonly held: string
  readonly from: string
  readonly optional?: boolean
}

export function carries(holding: ts.TypeLiteralNode, key: string): boolean {
  return holding.members.some(
    (each) => ts.isPropertySignature(each) && each.name !== undefined && each.name.getText() === key
  )
}

export function importedFrom(source: ts.SourceFile, held: string): string | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const named = one.importClause?.namedBindings
    if (named === undefined || !ts.isNamedImports(named)) continue
    if (!named.elements.some((each) => each.name.text === held)) continue
    return ts.isStringLiteral(one.moduleSpecifier) ? one.moduleSpecifier.text : null
  }
  return null
}

export function withImport(source: ts.SourceFile, line: string): Splice {
  const held = source.statements.filter(ts.isImportDeclaration)
  const last = held[held.length - 1]
  if (last === undefined) return { from: 0, to: 0, put: `${line}\n` }
  const ended = last.getEnd()
  return { from: ended, to: ended, put: `\n${line}` }
}

export function withMember(
  text: string,
  source: ts.SourceFile,
  holding: ts.TypeLiteralNode,
  put: string
): Splice {
  const last = holding.members[holding.members.length - 1]
  if (last === undefined) {
    const opened = holding.getStart(source) + 1
    return { from: opened, to: opened, put: `\n  ${put}\n` }
  }
  const started = last.getStart(source)
  const indent = text.slice(text.lastIndexOf("\n", started) + 1, started)
  const ended = last.getEnd()
  if (indent.trim() !== "") {
    const parted = text.slice(ended - 1, ended) === ";" ? " " : "; "
    return { from: ended, to: ended, put: `${parted}${put}` }
  }
  return { from: ended, to: ended, put: `\n${indent}${put}` }
}

export function addTypeMember(world: World, given: AddTypeMemberAsked): Said {
  const fault = keyFaultIn(given.key)
  if (fault !== null) return refusing(fault)
  if (!spelledBare(given.held)) {
    return refusing(`\`${given.held}\` is no type name an import holds, so no member is put in`)
  }
  if (given.from.trim() === "") {
    return refusing(`\`${given.held}\` is imported from no path, so no member is put in`)
  }
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` could not be read`)
  const source = parsedAs(given.at, text)
  const holding = aliasIn(source, given.type)
  if (holding === null) {
    return refusing(`\`${given.at}\` carries no object type named \`${given.type}\``)
  }
  if (carries(holding, given.key)) {
    return refusing(`\`${given.type}\` carries \`${given.key}\` already`)
  }
  const imported = importedFrom(source, given.held)
  if (imported !== null && imported !== given.from) {
    return refusing(
      `\`${given.held}\` is imported from \`${imported}\` rather than from ` +
        `\`${given.from}\`, so no member is put in`
    )
  }
  const put = `${given.key}${given.optional === true ? "?" : ""}: ${given.held}`
  const splices: Splice[] = []
  if (imported === null) {
    const line = `import type { ${given.held} } from ${JSON.stringify(given.from)}`
    splices.push(withImport(source, line))
  }
  splices.push(withMember(text, source, holding, put))
  return stating(splicing(given.at, text, splices))
}

export function runChange(world: World, given: AddTypeMemberAsked): Said {
  return addTypeMember(world, given)
}
