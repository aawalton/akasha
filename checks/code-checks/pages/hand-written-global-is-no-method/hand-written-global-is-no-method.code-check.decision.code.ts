import { lineOf, parsedAs } from "@akasha/code/code-source"
import { besideAt } from "@akasha/pages/page-file-name"
import type { Value } from "@akasha/pages/page-value"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

export const DECLARATION = "type-declaration"

export const AMBIENT = "d"

export const HELD = "ts"

const GENERATED = "generated"

export type Declared = {
  readonly name: string
  readonly line: number
  readonly keyword: string
}

export type Surface = {
  readonly methods: ReadonlySet<string>
  readonly globals: ReadonlySet<string>
}

type Read = {
  readonly path: string
  readonly text: string
}

function isCallable(held: ts.TypeNode | undefined): boolean {
  if (held === undefined) return false
  if (ts.isFunctionTypeNode(held)) return true
  return ts.isTypeLiteralNode(held) && held.members.some(ts.isCallSignatureDeclaration)
}

function keywordOf(list: ts.VariableDeclarationList): string {
  if ((list.flags & ts.NodeFlags.Const) !== 0) return "const"
  if ((list.flags & ts.NodeFlags.Let) !== 0) return "let"
  return "var"
}

function memberNamed(member: ts.TypeElement): string | null {
  const named = member.name
  if (named === undefined || !ts.isIdentifier(named)) return null
  if (ts.isMethodSignature(member)) return named.text
  if (ts.isPropertySignature(member) && isCallable(member.type)) return named.text
  return null
}

export function methodsIn(path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const found: string[] = []
  const over = (node: ts.Node): undefined => {
    if (ts.isInterfaceDeclaration(node)) {
      for (const member of node.members) {
        const named = memberNamed(member)
        if (named !== null) found.push(named)
      }
    }
    ts.forEachChild(node, over)
    return
  }
  ts.forEachChild(source, over)
  return found
}

export function globalsIn(path: string, text: string): readonly Declared[] {
  const source = parsedAs(path, text)
  const found: Declared[] = []
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.name !== undefined) {
      found.push({
        name: statement.name.text,
        line: lineOf(source, statement),
        keyword: "function",
      })
      continue
    }
    if (!ts.isVariableStatement(statement)) continue
    const keyword = keywordOf(statement.declarationList)
    for (const declared of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declared.name) || !isCallable(declared.type)) continue
      found.push({ name: declared.name.text, line: lineOf(source, declared), keyword })
    }
  }
  return found
}

export function reasonsIn(declared: readonly Declared[], surface: Surface): readonly string[] {
  const said: string[] = []
  for (const one of declared) {
    if (!surface.methods.has(one.name) || surface.globals.has(one.name)) continue
    said.push(
      `line ${String(one.line)}: \`declare ${one.keyword} ${one.name}\` says the game carries a ` +
        `global \`${one.name}\`, and the generated declarations carry \`${one.name}\` only as a ` +
        "method on an object, so every call to it compiles and none of them runs. Reach it through " +
        "the object owning it and take this declaration away."
    )
  }
  return said
}

export function isGenerated(value: Value | null): boolean {
  if (value === null) return false
  const held: unknown = value[GENERATED]
  return held !== null && typeof held === "object" && !Array.isArray(held)
}

function besideOf(path: string): string {
  const at = besideAt(path, AMBIENT, HELD)
  if (at === null) {
    throw new Error(`${path} is a ${DECLARATION}, and no declaration file sits beside such a name`)
  }
  return at
}

export function surfaceIn(held: readonly Read[]): Surface {
  const methods = new Set<string>()
  const globals = new Set<string>()
  for (const one of held) {
    for (const named of methodsIn(one.path, one.text)) methods.add(named)
    for (const declared of globalsIn(one.path, one.text)) globals.add(declared.name)
  }
  return { methods, globals }
}

export function refusalsOver(
  shadow: Shadow,
  textAt: (path: string) => string | null
): readonly Judged[] {
  const generated: Read[] = []
  const byHand: Read[] = []
  for (const one of shadow.index.everyOfType(DECLARATION)) {
    const at = besideOf(one.path)
    const text = textAt(at)
    if (!isGenerated(shadow.index.pageByPath(one.path))) {
      if (text !== null) byHand.push({ path: at, text })
      continue
    }
    if (text === null) {
      throw new Error(
        `${at} holds a generated declaration and is not there, so what is judged against is short`
      )
    }
    generated.push({ path: at, text })
  }
  const held = surfaceIn(generated)
  const said: Judged[] = []
  for (const one of byHand) {
    for (const reason of reasonsIn(globalsIn(one.path, one.text), held)) {
      said.push({ path: one.path, reason })
    }
  }
  return said
}
