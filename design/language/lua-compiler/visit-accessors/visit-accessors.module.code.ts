import type {
  AllAccessorDeclarations,
  TransformationContext,
} from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import { createSelfIdentifier } from "akasha/design/language/lua-compiler/lua-ast/lua-ast.module.code.ts"
import * as luaCore from "akasha/design/language/lua-compiler/lua-ast-core/lua-ast-core.module.code.ts"
import * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import { transformLuaLibFunction } from "akasha/design/language/lua-compiler/lualib-call/lualib-call.module.code.ts"
import { LuaLibFeature } from "akasha/design/language/lua-compiler/lualib-features/lualib-features.module.code.ts"
import { createPrototypeName } from "akasha/design/language/lua-compiler/visit-constructor/visit-constructor.module.code.ts"
import { createClassAccessorDecoratingExpression } from "akasha/design/language/lua-compiler/visit-decorators/visit-decorators.module.code.ts"
import {
  transformFunctionBody,
  transformParameters,
} from "akasha/design/language/lua-compiler/visit-function/visit-function.module.code.ts"
import { transformPropertyName } from "akasha/design/language/lua-compiler/visit-property-name/visit-property-name.module.code.ts"
import { isStaticNode } from "akasha/design/language/lua-compiler/visit-syntax/visit-syntax.module.code.ts"
import * as ts from "typescript"

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
