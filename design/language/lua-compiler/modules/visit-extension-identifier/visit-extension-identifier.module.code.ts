import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import { ExtensionKind } from "akasha/design/language/lua-compiler/modules/language-extension-kinds/language-extension-kinds.module.code.ts"
import {
  invalidMultiFunctionUse,
  invalidRangeUse,
  invalidVarargUse,
} from "akasha/design/language/lua-compiler/modules/transform-diagnostics/transform-diagnostics.module.code.ts"
import type * as ts from "typescript"

const EXTENSION_KIND_TO_VALUE_NAME: { [T in ExtensionKind]?: string } = {
  [ExtensionKind.MultiFunction]: "$multi",
  [ExtensionKind.RangeFunction]: "$range",
  [ExtensionKind.VarargConstant]: "$vararg",
}
export function isIdentifierExtensionValue(
  symbol: ts.Symbol | undefined,
  extensionKind: ExtensionKind
): boolean {
  return symbol !== undefined && EXTENSION_KIND_TO_VALUE_NAME[extensionKind] === symbol.name
}

export function reportInvalidExtensionValue(
  context: TransformationContext,
  identifier: ts.Identifier,
  extensionKind: ExtensionKind
): undefined {
  if (extensionKind === ExtensionKind.MultiFunction) {
    context.addDiagnostic(invalidMultiFunctionUse(identifier))
  } else if (extensionKind === ExtensionKind.RangeFunction) {
    context.addDiagnostic(invalidRangeUse(identifier))
  } else if (extensionKind === ExtensionKind.VarargConstant) {
    context.addDiagnostic(invalidVarargUse(identifier))
  }
}
