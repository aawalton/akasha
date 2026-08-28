import { relative } from "node:path"
import ts from "typescript"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { isFixtureFile } from "../fixture-file.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode } from "../../imports/imports.ts"
import type { Check } from "../check-shape.ts"

const DECLARATION_ONLY = /\.d\.[cm]?ts$/

const POLYFILL = /^lua-compiler\/lualib\/src\//

const BOUNDARY = new Set(["componentDidCatch", "getDerivedStateFromError"])

const COMPONENT = new Set(["React.Component", "Component", "React.PureComponent", "PureComponent"])

type Found = {
  readonly named: string
  readonly line: number
  readonly expression: boolean
  readonly extending: string | null
  readonly boundary: boolean
}

function nameOf(node: ts.Expression): string | null {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const left = nameOf(node.expression)
    return left === null ? null : `${left}.${node.name.text}`
  }
  return null
}

function extendedBy(node: ts.ClassLikeDeclaration): string | null {
  for (const clause of node.heritageClauses ?? []) {
    if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue
    const first = clause.types[0]
    if (first === undefined) continue
    return nameOf(first.expression)
  }
  return null
}

function catchesIn(node: ts.ClassLikeDeclaration): boolean {
  return node.members.some((one) => {
    const named = one.name
    return named !== undefined && ts.isIdentifier(named) && BOUNDARY.has(named.text)
  })
}

function permitted(one: Found): boolean {
  if (one.expression) return false
  if (one.extending === "Error") return true
  return one.extending !== null && COMPONENT.has(one.extending) && one.boundary
}

function classesIn(at: string, text: string): readonly Found[] {
  const kind = at.endsWith(".tsx") || at.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, kind)
  const found: Found[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      found.push({
        named: node.name?.text ?? "an unnamed class",
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        expression: ts.isClassExpression(node),
        extending: extendedBy(node),
        boundary: catchesIn(node),
      })
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

function reasonFor(one: Found): string {
  if (one.expression) return `line ${one.line} is a class expression, and a class expression is a class`
  if (one.extending === null) return `line ${one.line} declares \`class ${one.named}\``
  return `line ${one.line} declares \`class ${one.named}\`, which extends \`${one.extending}\``
}

export const noClass = {
  slug: "no-class",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const at = relative(root, path)
    if (!carriesCode(at)) return []
    if (DECLARATION_ONLY.test(at)) return []
    if (isFixtureFile(at)) return []
    if (POLYFILL.test(at)) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    if (isGeneratedFile(at, text)) return []
    return classesIn(at, text).filter((one) => !permitted(one)).map(reasonFor)
  },
} satisfies Check

export default noClass
