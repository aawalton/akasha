import * as ts from "typescript"
import {
  checkForLuaLibType,
  isPromiseClass,
  transformBuiltinIdentifierExpression,
} from "../builtins/builtins.module.code.ts"
import { tempSymbolId } from "../context-temp-symbol-id/context-temp-symbol-id.module.code.ts"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import {
  type Annotation,
  AnnotationKind,
  getNodeAnnotations,
} from "../tstl-annotations/tstl-annotations.module.code.ts"
import { invalidCallExtensionUse } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import {
  createExportedIdentifier,
  getSymbolExportScope,
} from "../tstl-export/tstl-export.module.code.ts"
import {
  getExtensionKindForNode,
  getExtensionKindForSymbol,
} from "../tstl-language-extensions/tstl-language-extensions.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { createPromiseIdentifier } from "../tstl-lualib/tstl-lualib.module.code.ts"
import {
  getOptionalContinuationData,
  isOptionalContinuation,
} from "../tstl-optional-chain-data/tstl-optional-chain-data.module.code.ts"
import {
  createSafeName,
  hasUnsafeIdentifierName,
} from "../tstl-safe-names/tstl-safe-names.module.code.ts"
import { getIdentifierSymbolId } from "../tstl-symbols/tstl-symbols.module.code.ts"
import { maybeWrapThisVoidAsAdapter } from "../tstl-this-void-adapter/tstl-this-void-adapter.module.code.ts"
import { isStandardLibraryType } from "../tstl-typescript/tstl-typescript.module.code.ts"
import { callExtensions } from "../visit-extension-call-extension/visit-extension-call-extension.module.code.ts"
import {
  isIdentifierExtensionValue,
  reportInvalidExtensionValue,
} from "../visit-extension-identifier/visit-extension-identifier.module.code.ts"

export function transformIdentifier(
  context: TransformationContext,
  identifier: ts.Identifier
): luaExpressions.Identifier {
  return transformNonValueIdentifier(
    context,
    identifier,
    context.checker.getSymbolAtLocation(identifier)
  )
}

export function getCustomNameFromSymbol(
  context: TransformationContext,
  symbol?: ts.Symbol
): undefined | string {
  let retVal: undefined | string

  if (symbol) {
    const declarations = symbol.getDeclarations()
    if (declarations) {
      let customNameAnnotation: undefined | Annotation
      for (const declaration of declarations) {
        const nodeAnnotations = getNodeAnnotations(declaration)
        const foundAnnotation = nodeAnnotations.get(AnnotationKind.CustomName)

        if (foundAnnotation) {
          customNameAnnotation = foundAnnotation
          break
        }

        if (ts.isImportSpecifier(declaration) && !declaration.propertyName) {
          const importedType = context.checker.getTypeAtLocation(declaration)
          if (importedType.symbol) {
            const importedCustomName = getCustomNameFromSymbol(context, importedType.symbol)
            if (importedCustomName != null) {
              return importedCustomName
            }
          }
        }
      }

      if (customNameAnnotation) {
        retVal = customNameAnnotation.args[0]
      }
    }
  }

  return retVal
}

function transformNonValueIdentifier(
  context: TransformationContext,
  identifier: ts.Identifier,
  symbol: ts.Symbol | undefined
) {
  if (isOptionalContinuation(identifier)) {
    const result = luaExpressions.createIdentifier(identifier.text, undefined, tempSymbolId)
    const continuationData = getOptionalContinuationData(identifier)
    if (continuationData === undefined) {
      throw new Error(
        "transformNonValueIdentifier: isOptionalContinuation true but getOptionalContinuationData undefined"
      )
    }
    continuationData.usedIdentifiers = [...continuationData.usedIdentifiers, result]
    return result
  }

  const extensionKind = symbol
    ? getExtensionKindForSymbol(context, symbol)
    : getExtensionKindForNode(context, identifier)

  if (extensionKind != null) {
    if (callExtensions.has(extensionKind)) {
      if (!(ts.isVariableDeclaration(identifier.parent) && identifier.parent.name === identifier)) {
        context.addDiagnostic(invalidCallExtensionUse(identifier))
      }
    } else if (isIdentifierExtensionValue(symbol, extensionKind)) {
      reportInvalidExtensionValue(context, identifier, extensionKind)
      return luaExpressions.createAnonymousIdentifier(identifier)
    }
  }

  const type = context.checker.getTypeAtLocation(identifier)
  if (isStandardLibraryType(context, type, undefined)) {
    checkForLuaLibType(context, type)
    if (isPromiseClass(context, identifier)) {
      return createPromiseIdentifier(identifier)
    }
  }

  let text = hasUnsafeIdentifierName(context, identifier, symbol)
    ? createSafeName(identifier.text)
    : identifier.text

  const customName = getCustomNameFromSymbol(context, symbol)
  if (customName != null) text = customName

  const symbolId = getIdentifierSymbolId(context, identifier, symbol)
  return luaExpressions.createIdentifier(text, identifier, symbolId, identifier.text)
}

export function transformIdentifierWithSymbol(
  context: TransformationContext,
  node: ts.Identifier,
  symbol: ts.Symbol | undefined
): luaExpressions.Expression {
  if (symbol) {
    const exportScope = getSymbolExportScope(context, symbol)
    if (exportScope) {
      const name = symbol.name
      const text = hasUnsafeIdentifierName(context, node, symbol) ? createSafeName(name) : name
      const symbolId = getIdentifierSymbolId(context, node, symbol)
      const identifier = luaExpressions.createIdentifier(text, node, symbolId, name)
      return maybeWrapThisVoidAsAdapter(
        context,
        node,
        createExportedIdentifier(context, identifier, exportScope),
        "fromType"
      )
    }
  }
  const builtinResult = transformBuiltinIdentifierExpression(context, node, symbol)
  if (builtinResult) {
    return builtinResult
  }

  return maybeWrapThisVoidAsAdapter(
    context,
    node,
    transformNonValueIdentifier(context, node, symbol),
    "fromType"
  )
}

export const transformIdentifierExpression: FunctionVisitor<ts.Identifier> = (node, context) => {
  if (ts.identifierToKeywordKind(node) === ts.SyntaxKind.UndefinedKeyword) {
    return luaExpressions.createNilLiteral(node)
  }

  const symbol = context.checker.getSymbolAtLocation(node)
  return transformIdentifierWithSymbol(context, node, symbol)
}
