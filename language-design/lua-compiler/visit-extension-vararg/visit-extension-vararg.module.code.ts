import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import * as extensions from "../language-extension-kinds/language-extension-kinds.module.code.ts"
import { getExtensionKindForSymbol } from "../language-extension-kinds/language-extension-kinds.module.code.ts"
import { type Scope, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"

export function isGlobalVarargConstant(
  context: TransformationContext,
  symbol: ts.Symbol,
  scope: Scope
) {
  return scope.type === ScopeType.File && isVarargConstantSymbol(context, symbol)
}
function isVarargConstantSymbol(context: TransformationContext, symbol: ts.Symbol) {
  return (
    symbol.getName() === "$vararg" &&
    getExtensionKindForSymbol(context, symbol) === extensions.ExtensionKind.VarargConstant
  )
}
