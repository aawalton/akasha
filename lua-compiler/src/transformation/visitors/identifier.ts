import * as ts from "typescript"
import * as luaExpressions from "../../LuaAST-expressions"
import {
  checkForLuaLibType,
  createPromiseIdentifier,
  isPromiseClass,
  transformBuiltinIdentifierExpression,
} from "../builtins"
import { tempSymbolId } from "../context/temp-symbol-id"
import { type TransformationContext } from "../context/transformation-context"
import { type FunctionVisitor } from "../context/visitors"
import { type Annotation, AnnotationKind, getNodeAnnotations } from "../utils/annotations"
import { invalidCallExtensionUse } from "../utils/diagnostics"
import { createExportedIdentifier, getSymbolExportScope } from "../utils/export"
import { getExtensionKindForNode, getExtensionKindForSymbol } from "../utils/language-extensions"
import {
  getOptionalContinuationData,
  isOptionalContinuation,
} from "../utils/optional-chain-data"
import { createSafeName, hasUnsafeIdentifierName } from "../utils/safe-names"
import { getIdentifierSymbolId } from "../utils/symbols"
import { maybeWrapThisVoidAsAdapter } from "../utils/this-void-adapter"
import { isStandardLibraryType } from "../utils/typescript"
import { callExtensions } from "./language-extensions/call-extension"
import {
  isIdentifierExtensionValue,
  reportInvalidExtensionValue,
} from "./language-extensions/identifier"

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
