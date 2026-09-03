import * as ts from "typescript"
import type {
  AllAccessorDeclarations,
  TransformationContext,
} from "../context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { createPrototypeName } from "../visit-constructor/visit-constructor.module.code.ts"
import { createClassAccessorDecoratingExpression } from "../visit-decorators/visit-decorators.module.code.ts"
import {
  transformFunctionBody,
  transformParameters,
} from "../visit-function/visit-function.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"
import { isStaticNode } from "../visit-syntax/visit-syntax.module.code.ts"

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
      luaExpressions.createTableFieldExpression(
        getterFunction,
        luaExpressions.createStringLiteral("get")
      )
    )
  }

  if (setAccessor) {
    const setterFunction = transformAccessor(context, setAccessor, className)
    descriptorFields.push(
      luaExpressions.createTableFieldExpression(
        setterFunction,
        luaExpressions.createStringLiteral("set")
      )
    )
  }

  const descriptor = luaExpressions.createTableExpression(descriptorFields)

  const isStatic = isStaticNode(firstAccessor)
  const target = isStatic
    ? luaExpressions.cloneIdentifier(className)
    : createPrototypeName(className)
  const feature = isStatic ? LuaLibFeature.ObjectDefineProperty : LuaLibFeature.SetDescriptor
  const parameters: luaExpressions.Expression[] = [target, propertyName, descriptor]
  if (!isStatic) parameters.push(luaExpressions.createBooleanLiteral(true))
  const call = transformLuaLibFunction(context, feature, undefined, ...parameters)
  return luaStatements.createExpressionStatement(call)
}
