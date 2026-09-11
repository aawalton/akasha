import type { TransformationContext } from "akasha/language-design/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import * as extensions from "akasha/language-design/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import { getExtensionKindForSymbol } from "akasha/language-design/lua-compiler/language-extension-kinds/language-extension-kinds.module.code.ts"
import {
  type Scope,
  ScopeType,
} from "akasha/language-design/lua-compiler/scope/scope.module.code.ts"
import type * as ts from "typescript"

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
