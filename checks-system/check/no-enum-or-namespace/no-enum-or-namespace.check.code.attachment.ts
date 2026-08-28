import { relative } from "node:path"
import ts from "typescript"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { isFixtureFile } from "../fixture-file.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode } from "../../imports/imports.ts"
import type { Check } from "../check-shape.ts"

const DECLARATION_ONLY = /\.d\.[cm]?ts$/

const AUGMENTED = "global"

function foundIn(at: string, text: string): readonly string[] {
  const kind = at.endsWith(".tsx") || at.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, kind)
  const found: string[] = []
  const lineOf = (node: ts.Node): number => source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1
  const visit = (node: ts.Node): void => {
    if (ts.isEnumDeclaration(node)) found.push(`line ${lineOf(node)} declares \`enum ${node.name.text}\``)
    if (ts.isModuleDeclaration(node) && ts.isIdentifier(node.name) && node.name.text !== AUGMENTED) {
      found.push(`line ${lineOf(node)} declares \`namespace ${node.name.text}\``)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export const noEnumOrNamespace = {
  slug: "no-enum-or-namespace",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const at = relative(root, path)
    if (!carriesCode(at)) return []
    if (DECLARATION_ONLY.test(at)) return []
    if (isFixtureFile(at)) return []
    const text = decodeUtf8(body)
    if (text === null) return []
    if (isGeneratedFile(at, text)) return []
    return foundIn(at, text)
  },
} satisfies Check

export default noEnumOrNamespace
