import { relative } from "node:path"
import ts from "typescript"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import type { Check } from "../check-shape.ts"

const PAGE = /^akasha\/.+\.ts$/

const ANY_UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

const UUID_VERSION_7 = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const VARIANT = new Set(["8", "9", "a", "b"])

const ID = "id"

const VERSION_AT = 14

const VARIANT_AT = 19

type Stated = {
  readonly value: string
  readonly line: number
}

function objectOf(node: ts.Expression): ts.ObjectLiteralExpression | null {
  if (!ts.isSatisfiesExpression(node)) return null
  const held = ts.isAsExpression(node.expression) ? node.expression.expression : node.expression
  return ts.isObjectLiteralExpression(held) ? held : null
}

function keyOf(node: ts.PropertyName): string | null {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text
  return null
}

function idIn(source: ts.SourceFile, object: ts.ObjectLiteralExpression): Stated | null {
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property)) continue
    if (keyOf(property.name) !== ID) continue
    const said = property.initializer
    if (!ts.isStringLiteral(said)) return null
    const at = source.getLineAndCharacterOfPosition(property.getStart(source))
    return { value: said.text, line: at.line + 1 }
  }
  return null
}

function exported(node: ts.VariableStatement): boolean {
  return node.modifiers?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true
}

function statedIn(at: string, text: string): readonly Stated[] {
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: Stated[] = []
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement) || !exported(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const initializer = declared.initializer
      if (initializer === undefined) continue
      const object = objectOf(initializer)
      if (object === null) continue
      const stated = idIn(source, object)
      if (stated !== null) found.push(stated)
    }
  }
  return found
}

function reasonFor(one: Stated): string | null {
  if (UUID_VERSION_7.test(one.value)) return null
  const states = `line ${one.line} states id "${one.value}", which`
  if (!ANY_UUID.test(one.value)) return `${states} is not a uuid`
  const lower = one.value.toLowerCase()
  const version = lower.charAt(VERSION_AT)
  if (version !== "7") {
    return `${states} is a uuid version ${version}, and a page's identity is a uuid version 7`
  }
  const variant = lower.charAt(VARIANT_AT)
  if (!VARIANT.has(variant)) {
    return `${states} carries the variant \`${variant}\`, and a uuid version 7 carries \`8\`, \`9\`, \`a\` or \`b\``
  }
  return `${states} is written in upper uuid, and a uuid is written in lower uuid`
}

export const idIsAUuidVersion7 = {
  slug: "id-is-a-uuid-version-7",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const at = relative(root, path)
    if (!PAGE.test(at)) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    const reasons: string[] = []
    for (const stated of statedIn(at, text)) {
      const reason = reasonFor(stated)
      if (reason !== null) reasons.push(reason)
    }
    return reasons
  },
} satisfies Check

export default idIsAUuidVersion7
