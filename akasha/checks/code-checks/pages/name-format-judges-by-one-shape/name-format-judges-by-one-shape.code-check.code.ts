import { parsedAs } from "@akasha/code-system/code-source"
import type { Change } from "@akasha/pages-system/change"
import { matchingIn } from "@akasha/pages-system/name-format/format-reaching"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, partedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import { FILES, input, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const NAME_FORMAT = "name-format"

const CODE = "code"

const TS = "ts"

const MATCHING_AT = "name-matching/name-matching.module.code.ts"

const MATCHING = "matching"

const GLOBAL = "g"

export type Handed = {
  readonly named: string
  readonly flags: string
}

function matchingCalledAs(source: ts.SourceFile): string | null {
  for (const one of source.statements) {
    if (!ts.isImportDeclaration(one)) continue
    const from = one.moduleSpecifier
    if (!ts.isStringLiteral(from) || !from.text.endsWith(MATCHING_AT)) continue
    const clause = one.importClause
    if (clause === undefined || clause.namedBindings === undefined) continue
    if (!ts.isNamedImports(clause.namedBindings)) continue
    for (const each of clause.namedBindings.elements) {
      if ((each.propertyName ?? each.name).text === MATCHING) return each.name.text
    }
  }
  return null
}

function flagsOf(shape: ts.RegularExpressionLiteral): string {
  return shape.text.slice(shape.text.lastIndexOf("/") + 1)
}

export function handedIn(path: string, text: string): readonly Handed[] {
  const source = parsedAs(path, text)
  const called = matchingCalledAs(source)
  if (called === null) return []
  const found: Handed[] = []
  for (const one of source.statements) {
    if (!ts.isVariableStatement(one)) continue
    if (one.modifiers?.some((each) => each.kind === ts.SyntaxKind.ExportKeyword) !== true) continue
    for (const each of one.declarationList.declarations) {
      const call = each.initializer
      if (call === undefined || !ts.isCallExpression(call)) continue
      if (!ts.isIdentifier(call.expression) || call.expression.text !== called) continue
      const shape = call.arguments[0]
      if (call.arguments.length !== 1 || shape === undefined) continue
      if (!ts.isRegularExpressionLiteral(shape) || !ts.isIdentifier(each.name)) continue
      found.push({ named: each.name.text, flags: flagsOf(shape) })
    }
  }
  return found
}

export function reasonsIn(slug: string, path: string, text: string): readonly string[] {
  const handed = handedIn(path, text)
  const only = handed[0]
  if (only === undefined || handed.length > 1) {
    return [
      `this is a name format's code, and it exports ${handed.length} names bound to ` +
        `\`${MATCHING}\` of a shape written out — a format's whole judgement is one such shape`,
    ]
  }
  const wanted = exportedAs(slug)
  const found: string[] = []
  if (only.named !== wanted) {
    found.push(
      `this is a name format's code, and it hands its shape to \`${only.named}\` — the slug ` +
        `\`${slug}\` is answered to under \`${wanted}\``
    )
  }
  if (only.flags.includes(GLOBAL)) {
    found.push(
      `this is a name format's code, and its shape carries the flags \`${only.flags}\` — a shape ` +
        "carrying `g` keeps a `lastIndex` and answers one name differently each time it is asked"
    )
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const formatting = matchingIn(change.root, shadow.index, shadow.codeAt)
  const found: Judged[] = []
  for (const one of shadow.index.everyOfType(NAME_FORMAT)) {
    const said = partedIn(one.path)
    const beside = besideAt(one.path, CODE, TS)
    if (said === null || beside === null) {
      found.push({
        path: one.path,
        reason: "this is a name format, and no code file can stand beside a name like it",
      })
      continue
    }
    const text = textIn(change, beside)
    if (text === null) {
      found.push({
        path: one.path,
        reason:
          `this is a name format, and this change leaves ${beside} holding no body — a format ` +
          "judges by the shape its own code hands over",
      })
    } else {
      for (const reason of reasonsIn(said.slug, beside, text)) found.push({ path: beside, reason })
    }
    try {
      formatting(`${NAME_FORMAT}/${said.slug}`)
    } catch (thrown) {
      found.push({
        path: one.path,
        reason: thrown instanceof Error ? thrown.message : String(thrown),
      })
    }
  }
  return found
}

export const nameFormatJudgesByOneShape = input(FILES, refusalsIn)
