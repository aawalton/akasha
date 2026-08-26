import type * as ts from "typescript"
import * as luaExpressions from "../../../LuaAST-expressions"
import { tryGetStandardLibrarySymbolOfType } from "../../builtins"
import type { FunctionVisitor } from "../../context/visitors"
import { AnnotationKind, getTypeAnnotations } from "../../utils/annotations"
import {
  annotationInvalidArgumentCount,
  unsupportedArrayWithLengthConstructor,
} from "../../utils/diagnostics"
import { transformLuaLibFunction } from "../../utils/lualib"
import { LuaLibFeature } from "../../../LuaLib"
import { isTableNewCall } from "../language-extensions/table"

export const transformNewExpression: FunctionVisitor<ts.NewExpression> = (node, context) => {
  if (isTableNewCall(context, node)) {
    return luaExpressions.createTableExpression(undefined, node)
  }

  const constructorType = context.checker.getTypeAtLocation(node.expression)
  if (tryGetStandardLibrarySymbolOfType(context, constructorType)?.name === "ArrayConstructor") {
    if (node.arguments === undefined || node.arguments.length === 0) {
      return luaExpressions.createTableExpression([], node)
    } else {
      const signature = context.checker.getResolvedSignature(node)
      const signatureDeclaration = signature?.getDeclaration()
      const firstParam = signatureDeclaration?.parameters[0]
      if (
        signatureDeclaration?.parameters.length === 1 &&
        firstParam !== undefined &&
        firstParam.dotDotDotToken === undefined
      ) {
        context.addDiagnostic(unsupportedArrayWithLengthConstructor(node))
        return luaExpressions.createTableExpression([], node)
      } else {
        const callArguments = context.transformArguments(node.arguments, signature)
        return luaExpressions.createTableExpression(
          callArguments.map((e) => luaExpressions.createTableFieldExpression(e)),
          node
        )
      }
    }
  }

  const signature = context.checker.getResolvedSignature(node)
  const [name, params] = context.transformCallAndArguments(
    node.expression,
    node.arguments ?? [],
    signature
  )

  const type = context.checker.getTypeAtLocation(node)
  const annotations = getTypeAnnotations(type)
  const customConstructorAnnotation = annotations.get(AnnotationKind.CustomConstructor)
  if (customConstructorAnnotation) {
    if (customConstructorAnnotation.args.length === 1) {
      const [firstArg] = customConstructorAnnotation.args
      if (firstArg === undefined) {
        return luaExpressions.createCallExpression(
          luaExpressions.createIdentifier(""),
          context.transformArguments(node.arguments ?? []),
          node
        )
      }
      return luaExpressions.createCallExpression(
        luaExpressions.createIdentifier(firstArg),
        context.transformArguments(node.arguments ?? []),
        node
      )
    } else {
      context.addDiagnostic(
        annotationInvalidArgumentCount(
          node,
          AnnotationKind.CustomConstructor,
          customConstructorAnnotation.args.length,
          1
        )
      )
    }
  }

  return transformLuaLibFunction(context, LuaLibFeature.New, node, name, ...params)
}
