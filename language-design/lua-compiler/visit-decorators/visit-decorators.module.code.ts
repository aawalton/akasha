import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  decoratorInvalidContext,
  incompleteFieldDecoratorWarning,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  ContextType,
  getFunctionContextType,
} from "../tstl-function-context/tstl-function-context.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { LuaLibFeature } from "../tstl-lua-lib/tstl-lua-lib.module.code.ts"
import { transformLuaLibFunction } from "../tstl-lualib/tstl-lualib.module.code.ts"
import { isNonNull } from "../tstl-utils/tstl-utils.module.code.ts"
import {
  transformMemberExpressionOwnerName,
  transformMethodName,
} from "../visit-method-name/visit-method-name.module.code.ts"
import { transformPropertyName } from "../visit-property-name/visit-property-name.module.code.ts"
import { isPrivateNode, isStaticNode } from "../visit-syntax/visit-syntax.module.code.ts"

export function transformDecoratorExpression(
  context: TransformationContext,
  decorator: ts.Decorator
): luaExpressions.Expression {
  const expression = decorator.expression
  const type = context.checker.getTypeAtLocation(expression)
  const callContext = getFunctionContextType(context, type)
  if (callContext === ContextType.Void) {
    context.addDiagnostic(decoratorInvalidContext(decorator))
  }

  return context.transformExpression(expression)
}

export function createClassDecoratingExpression(
  context: TransformationContext,
  classDeclaration: ts.ClassDeclaration | ts.ClassExpression,
  className: luaExpressions.Expression
): luaExpressions.Expression {
  const classDecorators =
    ts.getDecorators(classDeclaration)?.map((d) => transformDecoratorExpression(context, d)) ?? []

  if (context.options.experimentalDecorators) {
    return createLegacyDecoratingExpression(
      context,
      classDeclaration.kind,
      classDecorators,
      className
    )
  }

  return createDecoratingExpression(context, className, className, classDecorators, {
    kind: luaExpressions.createStringLiteral("class"),
    name: luaExpressions.createStringLiteral(classDeclaration.name?.getText() ?? ""),
  })
}

export function createClassMethodDecoratingExpression(
  context: TransformationContext,
  methodDeclaration: ts.MethodDeclaration,
  originalMethod: luaExpressions.Expression,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  const parameterDecorators = getParameterDecorators(context, methodDeclaration)
  const methodDecorators =
    ts.getDecorators(methodDeclaration)?.map((d) => transformDecoratorExpression(context, d)) ?? []

  const methodName = transformMethodName(context, methodDeclaration)

  if (context.options.experimentalDecorators) {
    const methodTable = transformMemberExpressionOwnerName(methodDeclaration, className)
    return createLegacyDecoratingExpression(
      context,
      methodDeclaration.kind,
      [...methodDecorators, ...parameterDecorators],
      methodTable,
      methodName
    )
  }

  return createDecoratingExpression(context, className, originalMethod, methodDecorators, {
    kind: luaExpressions.createStringLiteral("method"),
    name: methodName,
    private: luaExpressions.createBooleanLiteral(isPrivateNode(methodDeclaration)),
    static: luaExpressions.createBooleanLiteral(isStaticNode(methodDeclaration)),
  })
}

export function createClassAccessorDecoratingExpression(
  context: TransformationContext,
  accessor: ts.AccessorDeclaration,
  originalAccessor: luaExpressions.Expression,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  const accessorDecorators =
    ts.getDecorators(accessor)?.map((d) => transformDecoratorExpression(context, d)) ?? []
  const propertyName = transformPropertyName(context, accessor.name)

  if (context.options.experimentalDecorators) {
    const propertyOwnerTable = transformMemberExpressionOwnerName(accessor, className)

    return createLegacyDecoratingExpression(
      context,
      accessor.kind,
      accessorDecorators,
      propertyOwnerTable,
      propertyName
    )
  }

  return createDecoratingExpression(context, className, originalAccessor, accessorDecorators, {
    kind: luaExpressions.createStringLiteral(
      accessor.kind === ts.SyntaxKind.SetAccessor ? "setter" : "getter"
    ),
    name: propertyName,
    private: luaExpressions.createBooleanLiteral(isPrivateNode(accessor)),
    static: luaExpressions.createBooleanLiteral(isStaticNode(accessor)),
  })
}

export function createClassPropertyDecoratingExpression(
  context: TransformationContext,
  property: ts.PropertyDeclaration,
  className: luaExpressions.Identifier
): luaExpressions.Expression {
  const decorators = ts.getDecorators(property) ?? []
  const propertyDecorators = decorators.map((d) => transformDecoratorExpression(context, d))

  if (context.options.experimentalDecorators) {
    const propertyName = transformPropertyName(context, property.name)
    const propertyOwnerTable = transformMemberExpressionOwnerName(property, className)

    return createLegacyDecoratingExpression(
      context,
      property.kind,
      propertyDecorators,
      propertyOwnerTable,
      propertyName
    )
  }

  for (const decorator of decorators) {
    const signature = context.checker.getResolvedSignature(decorator)
    const decoratorReturnType = signature?.getReturnType()
    if (decoratorReturnType && (decoratorReturnType.flags & ts.TypeFlags.Void) === 0) {
      context.addDiagnostic(incompleteFieldDecoratorWarning(property))
    }
  }

  return createDecoratingExpression(
    context,
    className,
    luaExpressions.createNilLiteral(),
    propertyDecorators,
    {
      kind: luaExpressions.createStringLiteral("field"),
      name: luaExpressions.createStringLiteral(property.name.getText()),
      private: luaExpressions.createBooleanLiteral(isPrivateNode(property)),
      static: luaExpressions.createBooleanLiteral(isStaticNode(property)),
    }
  )
}

function createDecoratingExpression<TValue extends luaExpressions.Expression>(
  context: TransformationContext,
  className: luaExpressions.Expression,
  originalValue: TValue,
  decorators: readonly luaExpressions.Expression[],
  decoratorContext: Record<string, luaExpressions.Expression>
): luaExpressions.Expression {
  const decoratorTable = luaExpressions.createTableExpression(
    decorators.map((d) => luaExpressions.createTableFieldExpression(d))
  )
  const decoratorContextTable = objectToLuaTableLiteral(decoratorContext)

  return transformLuaLibFunction(
    context,
    LuaLibFeature.Decorate,
    undefined,
    className,
    originalValue,
    decoratorTable,
    decoratorContextTable
  )
}

function objectToLuaTableLiteral(
  obj: Record<string, luaExpressions.Expression>
): luaExpressions.Expression {
  return luaExpressions.createTableExpression(
    Object.entries(obj).map(([key, value]) =>
      luaExpressions.createTableFieldExpression(value, luaExpressions.createStringLiteral(key))
    )
  )
}

function createLegacyDecoratingExpression(
  context: TransformationContext,
  kind: ts.SyntaxKind,
  decorators: readonly luaExpressions.Expression[],
  targetTableName: luaExpressions.Expression,
  targetFieldExpression?: luaExpressions.Expression
): luaExpressions.Expression {
  const decoratorTable = luaExpressions.createTableExpression(
    decorators.map((e) => luaExpressions.createTableFieldExpression(e))
  )
  const trailingExpressions = [decoratorTable, targetTableName]

  if (targetFieldExpression) {
    trailingExpressions.push(targetFieldExpression)
    const isMethodOrAccessor =
      kind === ts.SyntaxKind.MethodDeclaration ||
      kind === ts.SyntaxKind.GetAccessor ||
      kind === ts.SyntaxKind.SetAccessor
    trailingExpressions.push(
      isMethodOrAccessor
        ? luaExpressions.createBooleanLiteral(true)
        : luaExpressions.createNilLiteral()
    )
  }

  return transformLuaLibFunction(
    context,
    LuaLibFeature.DecorateLegacy,
    undefined,
    ...trailingExpressions
  )
}

function getParameterDecorators(
  context: TransformationContext,
  node: ts.FunctionLikeDeclarationBase
): readonly luaExpressions.CallExpression[] {
  return node.parameters
    .flatMap((parameter, index) =>
      ts
        .getDecorators(parameter)
        ?.map((decorator) =>
          transformLuaLibFunction(
            context,
            LuaLibFeature.DecorateParam,
            node,
            luaExpressions.createNumericLiteral(index),
            transformDecoratorExpression(context, decorator)
          )
        )
    )
    .filter(isNonNull)
}

export function createConstructorDecoratingExpression(
  context: TransformationContext,
  node: ts.ConstructorDeclaration,
  className: luaExpressions.Identifier
): luaStatements.Statement | undefined {
  const parameterDecorators = getParameterDecorators(context, node)

  if (parameterDecorators.length > 0) {
    const decorateMethod = createLegacyDecoratingExpression(
      context,
      node.kind,
      parameterDecorators,
      className
    )
    return luaStatements.createExpressionStatement(decorateMethod)
  }
}
