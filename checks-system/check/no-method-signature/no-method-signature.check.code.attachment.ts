import { relative } from "node:path"
import ts from "typescript"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { isFixtureFile } from "../fixture-file.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import { carriesCode } from "../../imports/imports.ts"
import type { Check } from "../check-shape.ts"

const DECLARATION_ONLY = /\.d\.[cm]?ts$/

function foundIn(at: string, text: string): readonly string[] {
  const kind = at.endsWith(".tsx") || at.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const source = ts.createSourceFile(at, text, ts.ScriptTarget.Latest, true, kind)
  const found: string[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) || ts.isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (!ts.isMethodSignature(member)) continue
        const line = source.getLineAndCharacterOfPosition(member.getStart(source)).line + 1
        const named = member.name.getText(source)
        found.push(`line ${line} writes \`${named}\` as a method signature, not a property holding a function type`)
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export const noMethodSignature = {
  slug: "no-method-signature",
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

export default noMethodSignature
