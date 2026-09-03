import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  ExtensionKind,
  getExtensionKindForNode,
} from "../tstl-language-extensions/tstl-language-extensions.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { operatorExtensionTransformers } from "../visit-extension-operators/visit-extension-operators.module.code.ts"
import {
  tableExtensionTransformers,
  tableNewExtensions,
} from "../visit-extension-table/visit-extension-table.module.code.ts"

const allCallExtensionHandlers: LanguageExtensionCallTransformerMap = {
  ...operatorExtensionTransformers,
  ...tableExtensionTransformers,
}

const callExtensionKinds: readonly ExtensionKind[] = [
  ExtensionKind.AdditionOperatorType,
  ExtensionKind.AdditionOperatorMethodType,
  ExtensionKind.SubtractionOperatorType,
  ExtensionKind.SubtractionOperatorMethodType,
  ExtensionKind.MultiplicationOperatorType,
  ExtensionKind.MultiplicationOperatorMethodType,
  ExtensionKind.DivisionOperatorType,
  ExtensionKind.DivisionOperatorMethodType,
  ExtensionKind.ModuloOperatorType,
  ExtensionKind.ModuloOperatorMethodType,
  ExtensionKind.PowerOperatorType,
  ExtensionKind.PowerOperatorMethodType,
  ExtensionKind.FloorDivisionOperatorType,
  ExtensionKind.FloorDivisionOperatorMethodType,
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
  ExtensionKind.ConcatOperatorType,
  ExtensionKind.ConcatOperatorMethodType,
  ExtensionKind.LessThanOperatorType,
  ExtensionKind.LessThanOperatorMethodType,
  ExtensionKind.GreaterThanOperatorType,
  ExtensionKind.GreaterThanOperatorMethodType,
  ExtensionKind.NegationOperatorType,
  ExtensionKind.NegationOperatorMethodType,
  ExtensionKind.BitwiseNotOperatorType,
  ExtensionKind.BitwiseNotOperatorMethodType,
  ExtensionKind.LengthOperatorType,
  ExtensionKind.LengthOperatorMethodType,
  ExtensionKind.TableDeleteType,
  ExtensionKind.TableDeleteMethodType,
  ExtensionKind.TableGetType,
  ExtensionKind.TableGetMethodType,
  ExtensionKind.TableHasType,
  ExtensionKind.TableHasMethodType,
  ExtensionKind.TableSetType,
  ExtensionKind.TableSetMethodType,
  ExtensionKind.TableAddKeyType,
  ExtensionKind.TableAddKeyMethodType,
  ExtensionKind.TableIsEmptyType,
  ExtensionKind.TableIsEmptyMethodType,
]

const _coverage = allCallExtensionHandlers satisfies Partial<
  Record<(typeof callExtensionKinds)[number], LanguageExtensionCallTransformer>
>
void _coverage

export const callExtensions = new Set<ExtensionKind>(callExtensionKinds)
tableNewExtensions.forEach((kind) => callExtensions.add(kind))

export type LanguageExtensionCallTransformer = (
  context: TransformationContext,
  node: ts.CallExpression,
  extensionKind: ExtensionKind
) => luaExpressions.Expression

export type LanguageExtensionCallTransformerMap = {
  [P in ExtensionKind]?: LanguageExtensionCallTransformer
}
export function transformLanguageExtensionCallExpression(
  context: TransformationContext,
  node: ts.CallExpression
): luaExpressions.Expression | undefined {
  const extensionKind = getExtensionKindForNode(context, node.expression)
  if (extensionKind == null) return
  const transformer = allCallExtensionHandlers[extensionKind]
  if (transformer) {
    return transformer(context, node, extensionKind)
  }
}
