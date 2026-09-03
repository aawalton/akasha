import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { unsupportedForTarget } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  ExtensionKind,
  getBinaryCallExtensionArgs,
  getUnaryCallExtensionArg,
} from "../tstl-language-extensions/tstl-language-extensions.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { assert } from "../tstl-utils/tstl-utils.module.code.ts"
import type { LanguageExtensionCallTransformerMap } from "../visit-extension-call-extension/visit-extension-call-extension.module.code.ts"

const binaryOperatorMappings = new Map<ExtensionKind, luaCore.BinaryOperator>([
  [ExtensionKind.AdditionOperatorType, luaCore.SyntaxKind.AdditionOperator],
  [ExtensionKind.AdditionOperatorMethodType, luaCore.SyntaxKind.AdditionOperator],
  [ExtensionKind.SubtractionOperatorType, luaCore.SyntaxKind.SubtractionOperator],
  [ExtensionKind.SubtractionOperatorMethodType, luaCore.SyntaxKind.SubtractionOperator],
  [ExtensionKind.MultiplicationOperatorType, luaCore.SyntaxKind.MultiplicationOperator],
  [ExtensionKind.MultiplicationOperatorMethodType, luaCore.SyntaxKind.MultiplicationOperator],
  [ExtensionKind.DivisionOperatorType, luaCore.SyntaxKind.DivisionOperator],
  [ExtensionKind.DivisionOperatorMethodType, luaCore.SyntaxKind.DivisionOperator],
  [ExtensionKind.ModuloOperatorType, luaCore.SyntaxKind.ModuloOperator],
  [ExtensionKind.ModuloOperatorMethodType, luaCore.SyntaxKind.ModuloOperator],
  [ExtensionKind.PowerOperatorType, luaCore.SyntaxKind.PowerOperator],
  [ExtensionKind.PowerOperatorMethodType, luaCore.SyntaxKind.PowerOperator],
  [ExtensionKind.FloorDivisionOperatorType, luaCore.SyntaxKind.FloorDivisionOperator],
  [ExtensionKind.FloorDivisionOperatorMethodType, luaCore.SyntaxKind.FloorDivisionOperator],
  [ExtensionKind.BitwiseAndOperatorType, luaCore.SyntaxKind.BitwiseAndOperator],
  [ExtensionKind.BitwiseAndOperatorMethodType, luaCore.SyntaxKind.BitwiseAndOperator],
  [ExtensionKind.BitwiseOrOperatorType, luaCore.SyntaxKind.BitwiseOrOperator],
  [ExtensionKind.BitwiseOrOperatorMethodType, luaCore.SyntaxKind.BitwiseOrOperator],
  [ExtensionKind.BitwiseExclusiveOrOperatorType, luaCore.SyntaxKind.BitwiseExclusiveOrOperator],
  [
    ExtensionKind.BitwiseExclusiveOrOperatorMethodType,
    luaCore.SyntaxKind.BitwiseExclusiveOrOperator,
  ],
  [ExtensionKind.BitwiseLeftShiftOperatorType, luaCore.SyntaxKind.BitwiseLeftShiftOperator],
  [ExtensionKind.BitwiseLeftShiftOperatorMethodType, luaCore.SyntaxKind.BitwiseLeftShiftOperator],
  [ExtensionKind.BitwiseRightShiftOperatorType, luaCore.SyntaxKind.BitwiseRightShiftOperator],
  [ExtensionKind.BitwiseRightShiftOperatorMethodType, luaCore.SyntaxKind.BitwiseRightShiftOperator],
  [ExtensionKind.ConcatOperatorType, luaCore.SyntaxKind.ConcatOperator],
  [ExtensionKind.ConcatOperatorMethodType, luaCore.SyntaxKind.ConcatOperator],
  [ExtensionKind.LessThanOperatorType, luaCore.SyntaxKind.LessThanOperator],
  [ExtensionKind.LessThanOperatorMethodType, luaCore.SyntaxKind.LessThanOperator],
  [ExtensionKind.GreaterThanOperatorType, luaCore.SyntaxKind.GreaterThanOperator],
  [ExtensionKind.GreaterThanOperatorMethodType, luaCore.SyntaxKind.GreaterThanOperator],
])

const unaryOperatorMappings = new Map<ExtensionKind, luaCore.UnaryOperator>([
  [ExtensionKind.NegationOperatorType, luaCore.SyntaxKind.NegationOperator],
  [ExtensionKind.NegationOperatorMethodType, luaCore.SyntaxKind.NegationOperator],
  [ExtensionKind.BitwiseNotOperatorType, luaCore.SyntaxKind.BitwiseNotOperator],
  [ExtensionKind.BitwiseNotOperatorMethodType, luaCore.SyntaxKind.BitwiseNotOperator],
  [ExtensionKind.LengthOperatorType, luaCore.SyntaxKind.LengthOperator],
  [ExtensionKind.LengthOperatorMethodType, luaCore.SyntaxKind.LengthOperator],
])

const bitwiseOperatorMapExtensions = new Set<ExtensionKind>([
  ExtensionKind.BitwiseAndOperatorType,
  ExtensionKind.BitwiseAndOperatorMethodType,
  ExtensionKind.BitwiseOrOperatorType,
  ExtensionKind.BitwiseOrOperatorMethodType,
  ExtensionKind.BitwiseExclusiveOrOperatorType,
  ExtensionKind.BitwiseExclusiveOrOperatorMethodType,
  ExtensionKind.BitwiseLeftShiftOperatorType,
  ExtensionKind.BitwiseLeftShiftOperatorMethodType,
  ExtensionKind.BitwiseRightShiftOperatorType,
  ExtensionKind.BitwiseRightShiftOperatorMethodType,
  ExtensionKind.BitwiseNotOperatorType,
  ExtensionKind.BitwiseNotOperatorMethodType,
])

const requiresLua53 = new Set([
  ...bitwiseOperatorMapExtensions,
  ExtensionKind.FloorDivisionOperatorType,
  ExtensionKind.FloorDivisionOperatorMethodType,
])

export const operatorExtensionTransformers: LanguageExtensionCallTransformerMap = {}
for (const kind of binaryOperatorMappings.keys()) {
  operatorExtensionTransformers[kind] = transformBinaryOperator
}
for (const kind of unaryOperatorMappings.keys()) {
  operatorExtensionTransformers[kind] = transformUnaryOperator
}

function transformBinaryOperator(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind
) {
  if (requiresLua53.has(kind)) checkHasLua53(context, node, kind)

  const args = getBinaryCallExtensionArgs(context, node, kind)
  if (!args) return luaExpressions.createNilLiteral()

  const [left, right] = context.transformOrderedExpressions(args)
  assert(left !== undefined && right !== undefined)

  const luaOperator = binaryOperatorMappings.get(kind)
  assert(luaOperator)
  return luaExpressions.createBinaryExpression(left, right, luaOperator)
}

function transformUnaryOperator(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind
) {
  if (requiresLua53.has(kind)) checkHasLua53(context, node, kind)

  const arg = getUnaryCallExtensionArg(context, node, kind)
  if (!arg) return luaExpressions.createNilLiteral()

  const luaOperator = unaryOperatorMappings.get(kind)
  assert(luaOperator)
  return luaExpressions.createUnaryExpression(context.transformExpression(arg), luaOperator)
}

function checkHasLua53(
  context: TransformationContext,
  node: ts.CallExpression,
  kind: ExtensionKind
) {
  const isBefore53 =
    context.luaTarget === LuaTarget.Lua50 ||
    context.luaTarget === LuaTarget.Lua51 ||
    context.luaTarget === LuaTarget.Lua52 ||
    context.luaTarget === LuaTarget.LuaJIT ||
    context.luaTarget === LuaTarget.Universal
  if (isBefore53) {
    const luaTarget =
      context.luaTarget === LuaTarget.Universal ? LuaTarget.Lua51 : context.luaTarget
    if (
      kind === ExtensionKind.FloorDivisionOperatorType ||
      kind === ExtensionKind.FloorDivisionOperatorMethodType
    ) {
      context.addDiagnostic(unsupportedForTarget(node, "Floor division operator", luaTarget))
    } else {
      context.addDiagnostic(unsupportedForTarget(node, "Native bitwise operations", luaTarget))
    }
  }
}
