import {
  refusing,
  splicing,
  stating,
} from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Said, Splice } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import ts from "typescript"

const SPACE = " "

function namesOf(name: ts.BindingName, into: string[]): undefined {
  if (ts.isIdentifier(name)) {
    into.push(name.text)
    return
  }
  for (const one of name.elements) {
    if (ts.isOmittedExpression(one)) continue
    namesOf(one.name, into)
  }
}

function declaredBy(statement: ts.Statement): readonly string[] {
  const found: string[] = []
  if (ts.isVariableStatement(statement)) {
    for (const one of statement.declarationList.declarations) namesOf(one.name, found)
    return found
  }
  if (ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement)) {
    if (statement.name !== undefined) found.push(statement.name.text)
  }
  return found
}

function keywordIn(statement: ts.Statement): ts.Modifier | null {
  if (!ts.canHaveModifiers(statement)) return null
  for (const one of ts.getModifiers(statement) ?? []) {
    if (one.kind === ts.SyntaxKind.ExportKeyword) return one
  }
  return null
}

function pastSpace(text: string, at: number): number {
  let held = at
  while (held < text.length && text[held] === SPACE) held += 1
  return held
}

export type Asked = {
  readonly names: readonly string[]
}

type Dropping = {
  readonly names: readonly string[]
  readonly splices: readonly Splice[]
}

function droppedIn(path: string, text: string, wanted: ReadonlySet<string>): Dropping {
  const source = parsedAs(path, text)
  const splices: Splice[] = []
  const names: string[] = []
  for (const statement of source.statements) {
    const keyword = keywordIn(statement)
    if (keyword === null) continue
    const declared = declaredBy(statement)
    if (declared.length === 0) continue
    if (!declared.every((one) => wanted.has(one))) continue
    for (const one of declared) names.push(one)
    splices.push({ from: keyword.getStart(source), to: pastSpace(text, keyword.getEnd()), put: "" })
  }
  return { names, splices }
}

export function droppableIn(
  path: string,
  text: string,
  names: readonly string[]
): readonly string[] {
  return droppedIn(path, text, new Set(names)).names
}

export function removeExportKeyword(path: string, text: string, given: Asked): Said {
  const found = droppedIn(path, text, new Set(given.names))
  const dropped = new Set(found.names)
  const left = given.names.filter((one) => !dropped.has(one))
  if (left.length > 0) {
    const named = left.map((one) => `\`${one}\``).join(", ")
    return refusing(`${path} declares ${named} in a form this change drops no \`export\` from`)
  }
  return stating(splicing(path, text, found.splices))
}

export type Given = {
  readonly at: string
  readonly names: readonly string[]
}

export function runChange(world: World, given: Given): Said {
  const text = world.textOf(given.at)
  if (text === null) return refusing(`\`${given.at}\` holds no body, so no \`export\` is dropped`)
  return removeExportKeyword(given.at, text, { names: given.names })
}
