import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { importLuaLibFeature } from "../tstl-lualib/tstl-lualib.module.code.ts"

export function usingTransformer(
  context: TransformationContext
): ts.TransformerFactory<ts.SourceFile> {
  return (ctx) => (sourceFile) => {
    function visit(node: ts.Node): ts.Node {
      if (ts.isBlock(node) || ts.isSourceFile(node)) {
        const [hasUsings, newStatements] = transformBlockWithUsing(context, node.statements, node)
        if (hasUsings) {
          const updatedBlock = ts.isBlock(node)
            ? ts.factory.updateBlock(node, newStatements)
            : ts.factory.updateSourceFile(node, newStatements)
          const result = ts.visitEachChild(updatedBlock, visit, ctx)

          const parent: ts.Node[] = [updatedBlock]
          function setParent(node2: ts.Node): ts.Node {
            ts.setParent(node2, parent[parent.length - 1])
            parent.push(node2)
            ts.visitEachChild(node2, setParent, ctx)
            parent.pop()
            return node2
          }
          ts.visitEachChild(updatedBlock, setParent, ctx)
          ts.setParent(updatedBlock, node.parent)

          return result
        }
      }
      return ts.visitEachChild(node, visit, ctx)
    }
    const transformedSourceFile = ts.visitEachChild(sourceFile, visit, ctx)
    const result = visit(transformedSourceFile)
    if (!ts.isSourceFile(result))
      throw new Error("using-transformer: expected ts.SourceFile result")
    return result
  }
}

function isUsingDeclarationList(node: ts.Node): node is ts.VariableStatement {
  return ts.isVariableStatement(node) && (node.declarationList.flags & ts.NodeFlags.Using) !== 0
}

function transformBlockWithUsing(
  context: TransformationContext,
  statements: ts.NodeArray<ts.Statement> | readonly ts.Statement[],
  block: ts.Block | ts.SourceFile
): readonly [true, readonly ts.Statement[]] | readonly [false] {
  const newStatements: ts.Statement[] = []

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i]
    if (statement !== undefined && isUsingDeclarationList(statement)) {
      const isAwaitUsing = (statement.declarationList.flags & ts.NodeFlags.AwaitContext) !== 0

      if (isAwaitUsing) {
        importLuaLibFeature(context, LuaLibFeature.UsingAsync)
      } else {
        importLuaLibFeature(context, LuaLibFeature.Using)
      }

      const variableNames = statement.declarationList.declarations.map((d) =>
        ts.factory.createParameterDeclaration(undefined, undefined, d.name)
      )
      variableNames.unshift(createThisVoidParameter(context.checker))

      const followingStatements = statements.slice(i + 1)
      const [followingHasUsings, replacedFollowingStatements] = transformBlockWithUsing(
        context,
        followingStatements,
        block
      )
      const callbackBody = ts.factory.createBlock(
        followingHasUsings ? replacedFollowingStatements : followingStatements
      )

      const callback = ts.factory.createFunctionExpression(
        isAwaitUsing ? [ts.factory.createModifier(ts.SyntaxKind.AsyncKeyword)] : undefined,
        undefined,
        undefined,
        undefined,
        variableNames,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        callbackBody
      )

      const functionIdentifier = ts.factory.createIdentifier(
        isAwaitUsing ? "__TS__UsingAsync" : "__TS__Using"
      )
      let call: ts.Expression = ts.factory.createCallExpression(
        functionIdentifier,
        [],
        [
          callback,
          ...statement.declarationList.declarations.map(
            (d) => d.initializer ?? ts.factory.createIdentifier("unidentified")
          ),
        ]
      )

      if (isAwaitUsing) {
        call = ts.factory.createAwaitExpression(call)
      }

      if (ts.isSourceFile(block)) {
        newStatements.push(ts.factory.createExpressionStatement(call))
      } else if (
        block.parent &&
        ts.isBlock(block.parent) &&
        block.parent.statements[block.parent.statements.length - 1] !== block
      ) {
        newStatements.push(ts.factory.createExpressionStatement(call))
      } else {
        newStatements.push(ts.factory.createReturnStatement(call))
      }

      return [true, newStatements]
    } else if (statement !== undefined) {
      newStatements.push(statement)
    }
  }
  return [false]
}

function createThisVoidParameter(checker: ts.TypeChecker) {
  const voidType = checker.typeToTypeNode(checker.getVoidType(), undefined, undefined)
  return ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    ts.factory.createIdentifier("this"),
    undefined,
    voidType
  )
}
