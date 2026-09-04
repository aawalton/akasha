import { requireGet } from "@akasha/utils-narrow/require-get"
import type { SourceNode } from "source-map"
import type * as ts from "typescript"
import type { EmitHost } from "../transpile-emit-host/transpile-emit-host.module.code.ts"
import type { CompilerOptions } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { shouldAllowUnicode } from "../tstl-safe-names/tstl-safe-names.module.code.ts"

const escapeStringRegExp = /[\b\f\n\r\t\v\\"\0]/g
const escapeStringMap = new Map<string, string>([
  ["\b", "\\b"],
  ["\f", "\\f"],
  ["\n", "\\n"],
  ["\r", "\\r"],
  ["\t", "\\t"],
  ["\v", "\\v"],
  ["\\", "\\\\"],
  ['"', '\\"'],
  ["\0", "\\0"],
])

export const escapeString = (value: string) =>
  `"${value.replace(escapeStringRegExp, (char) => requireGet(escapeStringMap, char))}"`

export const isValidLuaFunctionDeclarationName = (str: string, options: CompilerOptions) =>
  (shouldAllowUnicode(options) ? /^[a-zA-Z0-9_\u00FF-\uFFFD.]+$/ : /^[a-zA-Z0-9_.]+$/).test(str)

export function isSimpleExpression(expression: luaExpressions.Expression): boolean {
  switch (expression.kind) {
    case luaCore.SyntaxKind.CallExpression:
    case luaCore.SyntaxKind.MethodCallExpression:
    case luaCore.SyntaxKind.FunctionExpression:
      return false

    case luaCore.SyntaxKind.TableExpression: {
      return expression.fields.every((e) => isSimpleExpression(e))
    }

    case luaCore.SyntaxKind.TableFieldExpression: {
      return (
        (!expression.key || isSimpleExpression(expression.key)) &&
        isSimpleExpression(expression.value)
      )
    }

    case luaCore.SyntaxKind.TableIndexExpression: {
      return isSimpleExpression(expression.table) && isSimpleExpression(expression.index)
    }

    case luaCore.SyntaxKind.UnaryExpression:
      return isSimpleExpression(expression.operand)

    case luaCore.SyntaxKind.BinaryExpression: {
      return isSimpleExpression(expression.left) && isSimpleExpression(expression.right)
    }
  }

  return true
}

export type SourceChunk = string | SourceNode

export type Printer = (
  program: ts.Program,
  emitHost: EmitHost,
  fileName: string,
  file: luaStatements.File
) => PrintResult

export interface PrintResult {
  code: string
  sourceMap: string
  sourceMapNode: SourceNode
}

export const operatorMap: Record<luaCore.Operator, string> = {
  [luaCore.SyntaxKind.AdditionOperator]: "+",
  [luaCore.SyntaxKind.SubtractionOperator]: "-",
  [luaCore.SyntaxKind.MultiplicationOperator]: "*",
  [luaCore.SyntaxKind.DivisionOperator]: "/",
  [luaCore.SyntaxKind.FloorDivisionOperator]: "//",
  [luaCore.SyntaxKind.ModuloOperator]: "%",
  [luaCore.SyntaxKind.PowerOperator]: "^",
  [luaCore.SyntaxKind.NegationOperator]: "-",
  [luaCore.SyntaxKind.ConcatOperator]: "..",
  [luaCore.SyntaxKind.LengthOperator]: "#",
  [luaCore.SyntaxKind.EqualityOperator]: "==",
  [luaCore.SyntaxKind.InequalityOperator]: "~=",
  [luaCore.SyntaxKind.LessThanOperator]: "<",
  [luaCore.SyntaxKind.LessEqualOperator]: "<=",
  [luaCore.SyntaxKind.GreaterThanOperator]: ">",
  [luaCore.SyntaxKind.GreaterEqualOperator]: ">=",
  [luaCore.SyntaxKind.AndOperator]: "and",
  [luaCore.SyntaxKind.OrOperator]: "or",
  [luaCore.SyntaxKind.NotOperator]: "not ",
  [luaCore.SyntaxKind.BitwiseAndOperator]: "&",
  [luaCore.SyntaxKind.BitwiseOrOperator]: "|",
  [luaCore.SyntaxKind.BitwiseExclusiveOrOperator]: "~",
  [luaCore.SyntaxKind.BitwiseRightShiftOperator]: ">>",
  [luaCore.SyntaxKind.BitwiseLeftShiftOperator]: "<<",
  [luaCore.SyntaxKind.BitwiseNotOperator]: "~",
}

export const operatorPrecedence: Record<luaCore.Operator, number> = {
  [luaCore.SyntaxKind.OrOperator]: 1,
  [luaCore.SyntaxKind.AndOperator]: 2,

  [luaCore.SyntaxKind.EqualityOperator]: 3,
  [luaCore.SyntaxKind.InequalityOperator]: 3,
  [luaCore.SyntaxKind.LessThanOperator]: 3,
  [luaCore.SyntaxKind.LessEqualOperator]: 3,
  [luaCore.SyntaxKind.GreaterThanOperator]: 3,
  [luaCore.SyntaxKind.GreaterEqualOperator]: 3,

  [luaCore.SyntaxKind.BitwiseOrOperator]: 4,
  [luaCore.SyntaxKind.BitwiseExclusiveOrOperator]: 5,
  [luaCore.SyntaxKind.BitwiseAndOperator]: 6,

  [luaCore.SyntaxKind.BitwiseLeftShiftOperator]: 7,
  [luaCore.SyntaxKind.BitwiseRightShiftOperator]: 7,

  [luaCore.SyntaxKind.ConcatOperator]: 8,

  [luaCore.SyntaxKind.AdditionOperator]: 9,
  [luaCore.SyntaxKind.SubtractionOperator]: 9,

  [luaCore.SyntaxKind.MultiplicationOperator]: 10,
  [luaCore.SyntaxKind.DivisionOperator]: 10,
  [luaCore.SyntaxKind.FloorDivisionOperator]: 10,
  [luaCore.SyntaxKind.ModuloOperator]: 10,

  [luaCore.SyntaxKind.NotOperator]: 11,
  [luaCore.SyntaxKind.LengthOperator]: 11,
  [luaCore.SyntaxKind.NegationOperator]: 11,
  [luaCore.SyntaxKind.BitwiseNotOperator]: 11,

  [luaCore.SyntaxKind.PowerOperator]: 12,
}

export const rightAssociativeOperators = new Set<luaCore.Operator>([
  luaCore.SyntaxKind.ConcatOperator,
  luaCore.SyntaxKind.PowerOperator,
])
