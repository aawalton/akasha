import { requireFirst } from "akasha/code/type/narrowing/modules/require-first/require-first.module.code.ts"
import { createTransformationContext } from "akasha/design/language/lua-compiler/modules/context-create-transformation-context/context-create-transformation-context.module.code.ts"
import type {
  ObjectVisitor,
  VisitorMap,
  Visitors,
} from "akasha/design/language/lua-compiler/modules/context-visitors/context-visitors.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/modules/lua-ast-statements/lua-ast-statements.module.code.ts"
import { usingTransformer } from "akasha/design/language/lua-compiler/modules/transform-using-transformer/transform-using-transformer.module.code.ts"
import { getOrUpdate } from "akasha/design/language/lua-compiler/modules/utils/utils.module.code.ts"
import { STANDARD_VISITORS } from "akasha/design/language/lua-compiler/modules/visitors-visitors/visitors-visitors.module.code.ts"
import * as ts from "typescript"

function isSyntaxKind(value: number): value is ts.SyntaxKind {
  return value in ts.SyntaxKind
}

export function createVisitorMap(customVisitors: readonly Visitors[]): VisitorMap {
  const objectVisitorMap: Map<ts.SyntaxKind, Array<ObjectVisitor<ts.Node>>> = new Map()
  for (const visitors of [STANDARD_VISITORS, ...customVisitors]) {
    const priority = visitors === STANDARD_VISITORS ? -Infinity : 0
    for (const [syntaxKindKey, visitor] of Object.entries(visitors)) {
      if (!visitor) continue

      const syntaxKind = Number(syntaxKindKey)
      if (!isSyntaxKind(syntaxKind)) continue
      const nodeVisitors = getOrUpdate(objectVisitorMap, syntaxKind, () => [])

      const objectVisitor = (
        typeof visitor === "function" ? { transform: visitor, priority } : visitor
      ) as ObjectVisitor<ts.Node>
      nodeVisitors.push(objectVisitor)
    }
  }

  const result: VisitorMap = new Map()
  for (const [kind, nodeVisitors] of objectVisitorMap) {
    result.set(
      kind,
      nodeVisitors
        .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
        .map((visitor) => visitor.transform)
    )
  }
  return result
}

export function transformSourceFile(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  visitorMap: VisitorMap
) {
  const context = createTransformationContext(program, sourceFile, visitorMap)

  const preTransformers = [usingTransformer(context)]
  const result = ts.transform(sourceFile, preTransformers)

  const transformed = context.transformNode(requireFirst(result.transformed))
  const [file] = transformed
  if (transformed.length !== 1 || file === undefined || !luaStatements.isFile(file)) {
    throw new Error("expected transformNode of a SourceFile to yield a single lua.File")
  }

  return { file, diagnostics: context.diagnostics }
}
