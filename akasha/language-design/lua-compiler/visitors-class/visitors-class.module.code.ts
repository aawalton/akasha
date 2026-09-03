import * as ts from "typescript"
import type {
  AllAccessorDeclarations,
  TransformationContext,
} from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  createDefaultExportExpression,
  createExportedIdentifier,
  hasDefaultExportModifier,
  isSymbolExported,
  shouldBeExported,
} from "../tstl-export/tstl-export.module.code.ts"
import { createSelfIdentifier } from "../tstl-lua-ast/tstl-lua-ast.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { transformInPrecedingStatementScope } from "../tstl-preceding-statements/tstl-preceding-statements.module.code.ts"
import { createSafeName, isUnsafeName } from "../tstl-safe-names/tstl-safe-names.module.code.ts"
import { findFirstNodeAbove } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { transformAccessorDeclarations } from "../visit-accessors/visit-accessors.module.code.ts"
import {
  createConstructorName,
  transformConstructorDeclaration,
} from "../visit-constructor/visit-constructor.module.code.ts"
import {
  createClassDecoratingExpression,
  createClassPropertyDecoratingExpression,
  createConstructorDecoratingExpression,
} from "../visit-decorators/visit-decorators.module.code.ts"
import {
  transformClassInstanceFields,
  transformStaticPropertyDeclaration,
} from "../visit-fields/visit-fields.module.code.ts"
import { transformIdentifier } from "../visit-identifier/visit-identifier.module.code.ts"
import { transformMethodDeclaration } from "../visit-method/visit-method.module.code.ts"
import { createClassSetup } from "../visit-setup/visit-setup.module.code.ts"
import {
  getExtendedNode,
  getExtendedType,
  isStaticNode,
} from "../visit-syntax/visit-syntax.module.code.ts"

export const transformClassDeclaration: FunctionVisitor<ts.ClassLikeDeclaration> = (
  declaration,
  context
) => {
  if (hasDefaultExportModifier(declaration)) {
    const { precedingStatements } = transformInPrecedingStatementScope(context, () => {
      transformClassAsExpression(declaration, context)
      return []
    })
    return precedingStatements
  }

  const { statements } = transformClassLikeDeclaration(declaration, context)
  return statements
}

export const transformThisExpression: FunctionVisitor<ts.ThisExpression> = (node) =>
  createSelfIdentifier(node)

export function transformClassAsExpression(
  expression: ts.ClassLikeDeclaration,
  context: TransformationContext
): luaExpressions.Expression {
  const { statements, name } = transformClassLikeDeclaration(expression, context)
  context.addPrecedingStatements(statements)
  return name
}

export interface ClassSuperInfo {
  className: luaExpressions.Identifier
  extendedTypeNode?: ts.ExpressionWithTypeArguments
}

function transformClassLikeDeclaration(
  classDeclaration: ts.ClassLikeDeclaration,
  context: TransformationContext,
  nameOverride?: luaExpressions.Identifier
): { statements: readonly luaStatements.Statement[]; name: luaExpressions.Identifier } {
  let className: luaExpressions.Identifier
  if (nameOverride !== undefined) {
    className = nameOverride
  } else if (classDeclaration.name !== undefined) {
    className = transformIdentifier(context, classDeclaration.name)
  } else {
    className = luaExpressions.createIdentifier(context.createTempName("class"), classDeclaration)
  }

  const extendedTypeNode = getExtendedNode(classDeclaration)
  const extendedType = getExtendedType(context, classDeclaration)

  context.classSuperInfos = [...context.classSuperInfos, { className, extendedTypeNode }]

  const properties = classDeclaration.members
    .filter(ts.isPropertyDeclaration)
    .filter((member) => member.initializer)

  const instanceFields = properties.filter((prop) => !isStaticNode(prop))

  const result: luaStatements.Statement[] = []

  let localClassName: luaExpressions.Identifier
  if (isUnsafeName(className.text, context.options)) {
    localClassName = luaExpressions.createIdentifier(
      createSafeName(className.text),
      undefined,
      className.symbolId,
      className.text
    )
    luaCore.setNodePosition(localClassName, className)
  } else {
    localClassName = className
  }

  result.push(
    ...createClassSetup(context, classDeclaration, className, localClassName, extendedType)
  )

  const constructor = classDeclaration.members.find(
    (n): n is ts.ConstructorDeclaration => ts.isConstructorDeclaration(n) && n.body !== undefined
  )

  if (constructor) {
    const constructorResult = transformConstructorDeclaration(
      context,
      constructor,
      localClassName,
      instanceFields,
      classDeclaration
    )

    if (constructorResult) result.push(constructorResult)

    const decoratingExpression = createConstructorDecoratingExpression(
      context,
      constructor,
      localClassName
    )
    if (decoratingExpression) result.push(decoratingExpression)
  } else if (!extendedType) {
    const constructorResult = transformConstructorDeclaration(
      context,
      ts.factory.createConstructorDeclaration([], [], ts.factory.createBlock([], true)),
      localClassName,
      instanceFields,
      classDeclaration
    )

    if (constructorResult) result.push(constructorResult)
  } else if (instanceFields.length > 0) {
    const constructorBody: luaStatements.Statement[] = [
      ...transformClassInstanceFields(context, instanceFields),
    ]
    const argsExpression =
      context.luaTarget === LuaTarget.Lua50
        ? luaExpressions.createCallExpression(luaExpressions.createIdentifier("unpack"), [
            luaExpressions.createArgLiteral(),
          ])
        : luaExpressions.createDotsLiteral()
    const superCall = luaStatements.createExpressionStatement(
      luaExpressions.createCallExpression(
        luaExpressions.createTableIndexExpression(
          context.transformExpression(ts.factory.createSuper()),
          luaExpressions.createStringLiteral("____constructor")
        ),
        [createSelfIdentifier(), argsExpression]
      )
    )
    constructorBody.unshift(superCall)
    const constructorFunction = luaExpressions.createFunctionExpression(
      luaStatements.createBlock(constructorBody),
      [createSelfIdentifier()],
      luaExpressions.createDotsLiteral(),
      luaCore.NodeFlags.Declaration
    )
    result.push(
      luaStatements.createAssignmentStatement(
        createConstructorName(localClassName),
        constructorFunction,
        classDeclaration
      )
    )
  }

  for (const member of classDeclaration.members) {
    if (ts.isMethodDeclaration(member)) {
      const statements = transformMethodDeclaration(context, member, localClassName)
      result.push(...statements)
    }
  }

  for (const member of classDeclaration.members) {
    if (ts.isAccessor(member)) {
      const symbol = context.checker.getSymbolAtLocation(member.name)
      if (!symbol) continue
      const accessors = getAllAccessorDeclarations(classDeclaration, symbol, context)
      if (accessors.firstAccessor !== member) continue

      const accessorsResult = transformAccessorDeclarations(context, accessors, localClassName)
      if (accessorsResult) {
        result.push(accessorsResult)
      }
    } else if (ts.isPropertyDeclaration(member)) {
      if (isStaticNode(member)) {
        const statement = transformStaticPropertyDeclaration(context, member, localClassName)
        if (statement) result.push(statement)
      }

      if ((ts.getDecorators(member)?.length ?? 0) > 0) {
        result.push(
          luaStatements.createExpressionStatement(
            createClassPropertyDecoratingExpression(context, member, className)
          )
        )
      }
    } else if (ts.isClassStaticBlockDeclaration(member)) {
      if (member.body.statements.length > 0) {
        const bodyStatements = context.transformStatements(member.body.statements)
        const iif = luaExpressions.createFunctionExpression(
          luaStatements.createBlock(bodyStatements),
          [luaExpressions.createIdentifier("self")]
        )
        const iife = luaExpressions.createCallExpression(iif, [localClassName])
        result.push(luaStatements.createExpressionStatement(iife, member))
      }
    }
  }

  if (ts.canHaveDecorators(classDeclaration) && ts.getDecorators(classDeclaration)) {
    const decoratingExpression = createClassDecoratingExpression(
      context,
      classDeclaration,
      localClassName
    )
    const decoratingStatement = luaStatements.createAssignmentStatement(
      localClassName,
      decoratingExpression
    )
    result.push(decoratingStatement)

    if (shouldBeExported(classDeclaration)) {
      const exportExpression = hasDefaultExportModifier(classDeclaration)
        ? createDefaultExportExpression(classDeclaration)
        : createExportedIdentifier(context, localClassName)

      const classAssignment = luaStatements.createAssignmentStatement(
        exportExpression,
        localClassName
      )
      result.push(classAssignment)
    }
  }

  context.classSuperInfos = context.classSuperInfos.slice(0, -1)

  return { statements: result, name: className }
}

function getAllAccessorDeclarations(
  classDeclaration: ts.ClassLikeDeclaration,
  symbol: ts.Symbol,
  context: TransformationContext
): AllAccessorDeclarations {
  const getAccessor = classDeclaration.members.find(
    (m): m is ts.GetAccessorDeclaration =>
      ts.isGetAccessor(m) && context.checker.getSymbolAtLocation(m.name) === symbol
  )
  const setAccessor = classDeclaration.members.find(
    (m): m is ts.SetAccessorDeclaration =>
      ts.isSetAccessor(m) && context.checker.getSymbolAtLocation(m.name) === symbol
  )

  const firstAccessor =
    getAccessor && (!setAccessor || getAccessor.pos < setAccessor.pos) ? getAccessor : setAccessor
  if (firstAccessor === undefined) {
    throw new Error("getAllAccessorDeclarations: neither getAccessor nor setAccessor found")
  }

  return {
    firstAccessor,
    setAccessor,
    getAccessor,
  }
}

export const transformSuperExpression: FunctionVisitor<ts.SuperExpression> = (
  expression,
  context
) => {
  const superInfos = context.classSuperInfos
  const superInfo = superInfos[superInfos.length - 1]
  if (!superInfo) return luaExpressions.createAnonymousIdentifier(expression)
  const { className, extendedTypeNode } = superInfo

  const extendsExpression = extendedTypeNode?.expression
  let baseClassName: luaExpressions.AssignmentLeftHandSideExpression | undefined

  if (extendsExpression && ts.isIdentifier(extendsExpression)) {
    const symbol = context.checker.getSymbolAtLocation(extendsExpression)
    if (symbol && !isSymbolExported(context, symbol)) {
      baseClassName = transformIdentifier(context, extendsExpression)
    }
  }

  baseClassName ??= luaExpressions.createTableIndexExpression(
    className,
    luaExpressions.createStringLiteral("____super"),
    expression
  )

  const f = findFirstNodeAbove(expression, ts.isFunctionLike)
  if (f && ts.canHaveModifiers(f) && isStaticNode(f)) {
    return baseClassName
  } else {
    return luaExpressions.createTableIndexExpression(
      baseClassName,
      luaExpressions.createStringLiteral("prototype")
    )
  }
}
