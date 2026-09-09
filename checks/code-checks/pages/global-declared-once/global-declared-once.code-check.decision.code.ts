import { lineOf, parsedAs } from "@akasha/code/code-source"
import ts from "typescript"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const DECLARED = ".d.ts"

export const SPELT = "declare global"

const GLOBAL = "global"

const ONE_HOME = "A global name is declared in one file."

const MEMBER_HARM =
  "A member declared twice holds only while the two spell one type, and nothing says otherwise until they differ."

const NAME_HARM =
  "A name declared twice is a redeclaration, and a redeclared name stops being typechecked wherever it is read."

export type Space = "value" | "type"

export type Kind =
  | "variable"
  | "function"
  | "class"
  | "enum"
  | "type"
  | "interface"
  | "namespace"
  | "member"

export type Stated = {
  readonly space: Space
  readonly name: string
  readonly kind: Kind
  readonly path: string
  readonly line: number
}

export type Clash = {
  readonly one: Stated
  readonly held: Stated
}

const MERGING: ReadonlySet<Kind> = new Set<Kind>(["interface", "namespace", "function"])

export function keyOf(one: Stated): string {
  return `${one.space} ${one.name}`
}

export function mergedBy(one: Stated, held: Stated): boolean {
  return one.kind === held.kind && MERGING.has(one.kind)
}

function memberedBy(
  source: ts.SourceFile,
  held: ts.InterfaceDeclaration,
  path: string,
  found: Stated[]
): undefined {
  for (const one of held.members) {
    const name = one.name
    if (name === undefined) continue
    if (!ts.isIdentifier(name) && !ts.isStringLiteral(name)) continue
    found.push({
      space: "type",
      name: `${held.name.text}.${name.text}`,
      kind: "member",
      path,
      line: lineOf(source, one),
    })
  }
}

function statedBy(
  source: ts.SourceFile,
  statements: readonly ts.Statement[],
  path: string,
  found: Stated[]
): undefined {
  for (const one of statements) {
    const line = lineOf(source, one)
    if (ts.isVariableStatement(one)) {
      for (const held of one.declarationList.declarations) {
        if (!ts.isIdentifier(held.name)) continue
        found.push({ space: "value", name: held.name.text, kind: "variable", path, line })
      }
    } else if (ts.isFunctionDeclaration(one) && one.name !== undefined) {
      found.push({ space: "value", name: one.name.text, kind: "function", path, line })
    } else if (ts.isClassDeclaration(one) && one.name !== undefined) {
      found.push({ space: "value", name: one.name.text, kind: "class", path, line })
      found.push({ space: "type", name: one.name.text, kind: "class", path, line })
    } else if (ts.isEnumDeclaration(one)) {
      found.push({ space: "value", name: one.name.text, kind: "enum", path, line })
      found.push({ space: "type", name: one.name.text, kind: "enum", path, line })
    } else if (ts.isTypeAliasDeclaration(one)) {
      found.push({ space: "type", name: one.name.text, kind: "type", path, line })
    } else if (ts.isModuleDeclaration(one) && ts.isIdentifier(one.name)) {
      found.push({ space: "type", name: one.name.text, kind: "namespace", path, line })
    } else if (ts.isInterfaceDeclaration(one)) {
      found.push({ space: "type", name: one.name.text, kind: "interface", path, line })
      memberedBy(source, one, path, found)
    }
  }
}

export function statedIn(path: string, text: string): readonly Stated[] {
  const source = parsedAs(path, text)
  const found: Stated[] = []
  if (!ts.isExternalModule(source)) {
    statedBy(source, source.statements, path, found)
    return found
  }
  for (const one of source.statements) {
    if (!ts.isModuleDeclaration(one)) continue
    if (!ts.isIdentifier(one.name) || one.name.text !== GLOBAL) continue
    const body = one.body
    if (body === undefined || !ts.isModuleBlock(body)) continue
    statedBy(source, body.statements, path, found)
  }
  return found
}

export function reasonFor(one: Stated, held: Stated): string {
  const harm = one.kind === "member" ? MEMBER_HARM : NAME_HARM
  return `\`${one.name}\` is declared at ${one.path}:${one.line} and at ${held.path}:${held.line}. ${ONE_HOME} ${harm}`
}

export function clashesIn(
  paths: readonly string[],
  textAt: (path: string) => string | null
): readonly Clash[] {
  const shared = new Map<string, Stated>()
  const inside: Stated[] = []
  const clashes: Clash[] = []
  for (const path of paths) {
    const text = textAt(path)
    if (text === null) continue
    const declares = path.endsWith(DECLARED)
    if (!declares && !text.includes(SPELT)) continue
    for (const one of statedIn(path, text)) {
      if (!declares) {
        inside.push(one)
        continue
      }
      const held = shared.get(keyOf(one))
      if (held === undefined) {
        shared.set(keyOf(one), one)
        continue
      }
      if (!mergedBy(one, held)) clashes.push({ one, held })
    }
  }
  for (const one of inside) {
    const held = shared.get(keyOf(one))
    if (held === undefined || mergedBy(one, held)) continue
    clashes.push({ one, held })
  }
  return clashes
}

export function judgedOf(clashes: readonly Clash[]): readonly Judged[] {
  return clashes.map(({ one, held }) => ({ path: one.path, reason: reasonFor(one, held) }))
}
