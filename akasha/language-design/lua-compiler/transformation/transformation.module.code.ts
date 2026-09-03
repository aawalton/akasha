import { requireFirst } from "@akasha/utils-narrow/require-first"
import * as ts from "typescript"
import { createTransformationContext } from "../context-create-transformation-context/context-create-transformation-context.module.code.ts"
import type {
  ObjectVisitor,
  VisitorMap,
  Visitors,
} from "../context-visitors/context-visitors.module.code.ts"
import { usingTransformer } from "../transform-using-transformer/transform-using-transformer.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { getOrUpdate } from "../tstl-utils/tstl-utils.module.code.ts"
import { standardVisitors } from "../visitors-visitors/visitors-visitors.module.code.ts"

function isSyntaxKind(value: number): value is ts.SyntaxKind {
  return value in ts.SyntaxKind
}

export function createVisitorMap(customVisitors: readonly Visitors[]): VisitorMap {
  const objectVisitorMap: Map<ts.SyntaxKind, Array<ObjectVisitor<ts.Node>>> = new Map()
  for (const visitors of [standardVisitors, ...customVisitors]) {
    const priority = visitors === standardVisitors ? -Infinity : 0
    for (const [syntaxKindKey, visitor] of Object.entries(visitors)) {
      if (!visitor) continue

      const syntaxKind = Number(syntaxKindKey)
      if (!isSyntaxKind(syntaxKind)) continue
      const nodeVisitors = getOrUpdate(objectVisitorMap, syntaxKind, () => [])

      const objectVisitor: ObjectVisitor<any> =
        typeof visitor === "function" ? { transform: visitor, priority } : visitor
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
