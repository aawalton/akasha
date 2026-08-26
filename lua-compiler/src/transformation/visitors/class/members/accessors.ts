import * as ts from "typescript"
import * as luaCore from "../../../../LuaAST-core"
import * as luaStatements from "../../../../LuaAST-statements"
import * as luaExpressions from "../../../../LuaAST-expressions"
import type { AllAccessorDeclarations, TransformationContext } from "../../../context/transformation-context"
import { createSelfIdentifier } from "../../../utils/lua-ast"
import { transformLuaLibFunction } from "../../../utils/lualib"
import { LuaLibFeature } from "../../../../LuaLib"
import { transformFunctionBody, transformParameters } from "../../function"
import { transformPropertyName } from "../../property-name"
import { createClassAccessorDecoratingExpression } from "../decorators"
import { isStaticNode } from "../utils"
import { createPrototypeName } from "./constructor"

function transformAccessor(
  context: TransformationContext,
  node: ts.AccessorDeclaration,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  const [params, dot, restParam] = transformParameters(
    context,
    node.parameters,
    createSelfIdentifier()
  )
  const body = node.body
    ? transformFunctionBody(context, node.parameters, node.body, node, restParam)[0]
    : []
  const accessorFunction = luaExpressions.createFunctionExpression(
    luaStatements.createBlock(body),
    params,
    dot,
    luaCore.NodeFlags.Declaration
  )

  if ((ts.getDecorators(node)?.length ?? 0) > 0) {
    return createClassAccessorDecoratingExpression(context, node, accessorFunction, className)
  } else {
    return accessorFunction
  }
}

export function transformAccessorDeclarations(
  context: TransformationContext,
  { firstAccessor, getAccessor, setAccessor }: AllAccessorDeclarations,
  className: luaExpressions.Identifier
): luaStatements.Statement | undefined {
  const propertyName = transformPropertyName(context, firstAccessor.name)
  const descriptorFields: luaExpressions.TableFieldExpression[] = []

  if (getAccessor) {
    const getterFunction = transformAccessor(context, getAccessor, className)
    descriptorFields.push(
      luaExpressions.createTableFieldExpression(getterFunction, luaExpressions.createStringLiteral("get"))
    )
  }

  if (setAccessor) {
    const setterFunction = transformAccessor(context, setAccessor, className)
    descriptorFields.push(
      luaExpressions.createTableFieldExpression(setterFunction, luaExpressions.createStringLiteral("set"))
    )
  }

  const descriptor = luaExpressions.createTableExpression(descriptorFields)

  const isStatic = isStaticNode(firstAccessor)
  const target = isStatic ? luaExpressions.cloneIdentifier(className) : createPrototypeName(className)
  const feature = isStatic ? LuaLibFeature.ObjectDefineProperty : LuaLibFeature.SetDescriptor
  const parameters: luaExpressions.Expression[] = [target, propertyName, descriptor]
  if (!isStatic) parameters.push(luaExpressions.createBooleanLiteral(true))
  const call = transformLuaLibFunction(context, feature, undefined, ...parameters)
  return luaStatements.createExpressionStatement(call)
}
