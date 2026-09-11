import type {
  Given,
  Refusal,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { lineOf } from "akasha/code/code-source/code-source.module.code.ts"
import ts from "typescript"

const CONSTRUCTOR_NAMES: ReadonlySet<string> = new Set(["New", "Subclass"])

const DROPPED =
  "so the compiler emits a dot call, the class never reaches it and every argument shifts by one"

function paramsOf(
  member: ts.MethodSignature | ts.PropertySignature
): readonly ts.ParameterDeclaration[] | undefined {
  if (ts.isMethodSignature(member)) return member.parameters
  if (member.type !== undefined && ts.isFunctionTypeNode(member.type)) return member.type.parameters
  return undefined
}

function isVoidThis(one: ts.ParameterDeclaration): boolean {
  if (!ts.isIdentifier(one.name)) return false
  if (ts.identifierToKeywordKind(one.name) !== ts.SyntaxKind.ThisKeyword) return false
  return one.type?.kind === ts.SyntaxKind.VoidKeyword
}

function isReceiver(one: ts.ParameterDeclaration): boolean {
  if (ts.isIdentifier(one.name) && one.name.text === "self") return true
  return one.type?.kind === ts.SyntaxKind.ObjectKeyword
}

export function noVoidSelfInConstructor(standing: Given): readonly Refusal[] {
  const found: Refusal[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isMethodSignature(node) || ts.isPropertySignature(node)) {
      const named = ts.isIdentifier(node.name) ? node.name.text : undefined
      if (named !== undefined && CONSTRUCTOR_NAMES.has(named)) {
        const params = paramsOf(node)
        const first = params?.[0]
        const second = params?.[1]
        if (
          first !== undefined &&
          isVoidThis(first) &&
          (second === undefined || !isReceiver(second))
        ) {
          found.push({
            line: lineOf(standing.source, node),
            reason: `\`${named}\` declares \`this: void\`, ${DROPPED}`,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(standing.source, visit)
  return found
}
