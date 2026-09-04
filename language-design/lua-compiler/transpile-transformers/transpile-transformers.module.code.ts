import * as ts from "typescript"
import { createPruneUnusedReexportsTransformer } from "../transpile-prune-unused-reexports/transpile-prune-unused-reexports.module.code.ts"
import type { ReachabilityResult } from "../transpile-reachability/transpile-reachability.module.code.ts"

export function getTransformers(
  program: ts.Program,
  customTransformers: ts.CustomTransformers,
  onSourceFile: (sourceFile: ts.SourceFile) => void,
  reachability?: ReachabilityResult
): ts.CustomTransformers {
  const luaTransformer: ts.TransformerFactory<ts.SourceFile> = () => (sourceFile) => {
    onSourceFile(sourceFile)
    return ts.createSourceFile(sourceFile.fileName, "", ts.ScriptTarget.ESNext)
  }

  const options = program.getCompilerOptions()

  const before = [...(customTransformers.before ?? [])]
  if (options.jsx === ts.JsxEmit.React) {
    before.push((context) => {
      const patchedContext: ts.TransformationContext = {
        ...context,
        getCompilerOptions: () => ({
          ...context.getCompilerOptions(),
          target: ts.ScriptTarget.ESNext,
        }),
      }
      return ts.transformJsx(patchedContext)
    })
  }
  if (reachability) {
    before.push(createPruneUnusedReexportsTransformer(program, reachability))
  }
  before.push(
    ...(customTransformers.after ?? []),
    stripParenthesisExpressionsTransformer,
    luaTransformer
  )

  const afterDeclarations = [...(customTransformers.afterDeclarations ?? [])]
  if (options.noImplicitSelf === true) {
    afterDeclarations.unshift(noImplicitSelfTransformer)
  }

  return { afterDeclarations, before }
}

export const noImplicitSelfTransformer: ts.TransformerFactory<ts.SourceFile | ts.Bundle> =
  () => (node) => {
    const transformSourceFile: ts.Transformer<ts.SourceFile> = (node) => {
      const empty = ts.factory.createNotEmittedStatement(node)
      ts.addSyntheticLeadingComment(
        empty,
        ts.SyntaxKind.MultiLineCommentTrivia,
        "* @noSelfInFile ",
        true
      )
      return ts.factory.updateSourceFile(node, [empty, ...node.statements], node.isDeclarationFile)
    }

    return ts.isBundle(node)
      ? ts.factory.updateBundle(node, node.sourceFiles.map(transformSourceFile))
      : transformSourceFile(node)
  }

export const stripParenthesisExpressionsTransformer: ts.TransformerFactory<ts.SourceFile> =
  (context) => (sourceFile) => {
    function unwrapParentheses(node: ts.Expression) {
      while (ts.isParenthesizedExpression(node) && !ts.isOptionalChain(node.expression)) {
        node = node.expression
      }
      return node
    }
    function visit(node: ts.Node): ts.Node {
      if (ts.isCallExpression(node)) {
        return ts.factory.updateCallExpression(
          node,
          unwrapParentheses(node.expression),
          node.typeArguments,
          node.arguments
        )
      } else if (ts.isVoidExpression(node)) {
        return ts.factory.updateVoidExpression(node, unwrapParentheses(node.expression))
      } else if (ts.isDeleteExpression(node)) {
        return ts.factory.updateDeleteExpression(node, unwrapParentheses(node.expression))
      }

      return ts.visitEachChild(node, visit, context)
    }
    return ts.visitEachChild(sourceFile, visit, context)
  }
