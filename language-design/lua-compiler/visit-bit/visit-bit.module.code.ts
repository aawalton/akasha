import { assertNever } from "@akasha/utils-narrow/assert-never"
import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  unsupportedForTarget,
  unsupportedRightShiftOperator,
} from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export type BitOperator = ts.ShiftOperator | ts.BitwiseOperator
export const isBitOperator = (operator: ts.BinaryOperator): operator is BitOperator =>
  operator in bitOperatorToLibOperation

const bitOperatorToLibOperation: Record<BitOperator, string> = {
  [ts.SyntaxKind.AmpersandToken]: "band",
  [ts.SyntaxKind.BarToken]: "bor",
  [ts.SyntaxKind.CaretToken]: "bxor",
  [ts.SyntaxKind.LessThanLessThanToken]: "lshift",
  [ts.SyntaxKind.GreaterThanGreaterThanToken]: "arshift",
  [ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: "rshift",
}

function transformBinaryBitLibOperation(
  node: ts.Node,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  operator: BitOperator,
  lib: string
): luaExpressions.Expression {
  const functionName = bitOperatorToLibOperation[operator]
  return luaExpressions.createCallExpression(
    luaExpressions.createTableIndexExpression(
      luaExpressions.createIdentifier(lib),
      luaExpressions.createStringLiteral(functionName)
    ),
    [left, right],
    node
  )
}

function transformBitOperatorToLuaOperator(
  context: TransformationContext,
  node: ts.Node,
  operator: BitOperator
): luaCore.BinaryOperator {
  switch (operator) {
    case ts.SyntaxKind.BarToken:
      return luaCore.SyntaxKind.BitwiseOrOperator
    case ts.SyntaxKind.CaretToken:
      return luaCore.SyntaxKind.BitwiseExclusiveOrOperator
    case ts.SyntaxKind.AmpersandToken:
      return luaCore.SyntaxKind.BitwiseAndOperator
    case ts.SyntaxKind.LessThanLessThanToken:
      return luaCore.SyntaxKind.BitwiseLeftShiftOperator
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      context.addDiagnostic(unsupportedRightShiftOperator(node))
      return luaCore.SyntaxKind.BitwiseRightShiftOperator
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
      return luaCore.SyntaxKind.BitwiseRightShiftOperator
  }
}

export function transformBinaryBitOperation(
  context: TransformationContext,
  node: ts.Node,
  left: luaExpressions.Expression,
  right: luaExpressions.Expression,
  operator: BitOperator
): luaExpressions.Expression {
  switch (context.luaTarget) {
    case LuaTarget.Universal:
    case LuaTarget.Lua50:
    case LuaTarget.Lua51:
      context.addDiagnostic(unsupportedForTarget(node, "Bitwise operations", context.luaTarget))
      return transformBinaryBitLibOperation(node, left, right, operator, "bit")

    case LuaTarget.LuaJIT:
      return transformBinaryBitLibOperation(node, left, right, operator, "bit")

    case LuaTarget.Lua52:
      return transformBinaryBitLibOperation(node, left, right, operator, "bit32")
    default: {
      const luaOperator = transformBitOperatorToLuaOperator(context, node, operator)
      return luaExpressions.createBinaryExpression(left, right, luaOperator, node)
    }
  }
}

function transformUnaryBitLibOperation(
  node: ts.Node,
  expression: luaExpressions.Expression,
  operator: luaCore.UnaryBitwiseOperator,
  lib: string
): luaExpressions.Expression {
  let bitFunction: string
  switch (operator) {
    case luaCore.SyntaxKind.BitwiseNotOperator:
      bitFunction = "bnot"
      break
    default:
      assertNever(operator)
  }

  return luaExpressions.createCallExpression(
    luaExpressions.createTableIndexExpression(
      luaExpressions.createIdentifier(lib),
      luaExpressions.createStringLiteral(bitFunction)
    ),
    [expression],
    node
  )
}

export function transformUnaryBitOperation(
  context: TransformationContext,
  node: ts.Node,
  expression: luaExpressions.Expression,
  operator: luaCore.UnaryBitwiseOperator
): luaExpressions.Expression {
  switch (context.luaTarget) {
    case LuaTarget.Universal:
    case LuaTarget.Lua50:
    case LuaTarget.Lua51:
      context.addDiagnostic(unsupportedForTarget(node, "Bitwise operations", context.luaTarget))
      return transformUnaryBitLibOperation(node, expression, operator, "bit")

    case LuaTarget.LuaJIT:
      return transformUnaryBitLibOperation(node, expression, operator, "bit")

    case LuaTarget.Lua52:
      return transformUnaryBitLibOperation(node, expression, operator, "bit32")

    default:
      return luaExpressions.createUnaryExpression(expression, operator, node)
  }
}
