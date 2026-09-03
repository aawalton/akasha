import * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  AnnotationKind,
  getFileAnnotations,
  getNodeAnnotations,
} from "../tstl-annotations/tstl-annotations.module.code.ts"
import type { CompilerOptions } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import {
  findFirstNodeAbove,
  getAllCallSignatures,
  inferAssignedType,
} from "../tstl-typescript/tstl-typescript.module.code.ts"
import { isWorkspaceSourceFile } from "../tstl-workspace-source/tstl-workspace-source.module.code.ts"

export const ContextType = {
  None: 0,
  Void: 1 << 0,
  NonVoid: 1 << 1,
  Mixed: 3,
} as const
export type ContextType = number

function hasNoSelfAncestor(declaration: ts.Declaration): boolean {
  const scopeDeclaration = findFirstNodeAbove(
    declaration,
    (node): node is ts.SourceFile | ts.ModuleDeclaration =>
      ts.isSourceFile(node) || ts.isModuleDeclaration(node)
  )

  if (!scopeDeclaration) {
    return false
  } else if (ts.isSourceFile(scopeDeclaration)) {
    return getFileAnnotations(scopeDeclaration).has(AnnotationKind.NoSelfInFile)
  } else if (getNodeAnnotations(scopeDeclaration).has(AnnotationKind.NoSelf)) {
    return true
  } else {
    return hasNoSelfAncestor(scopeDeclaration)
  }
}

function getExplicitThisParameter(
  signatureDeclaration: ts.SignatureDeclaration
): ts.ParameterDeclaration | undefined {
  const param = signatureDeclaration.parameters[0]
  if (
    param &&
    ts.isIdentifier(param.name) &&
    ts.identifierToKeywordKind(param.name) === ts.SyntaxKind.ThisKeyword
  ) {
    return param
  }
}

const callContextTypes = new WeakMap<ts.CallLikeExpression, ContextType>()

export function getCallContextType(
  context: TransformationContext,
  callExpression: ts.CallLikeExpression
): ContextType {
  const known = callContextTypes.get(callExpression)
  if (known !== undefined) return known

  const signature = context.checker.getResolvedSignature(callExpression)
  const signatureDeclaration = signature?.getDeclaration()

  let contextType: ContextType = ContextType.None

  if (signatureDeclaration) {
    contextType = computeDeclarationContextType(context, signatureDeclaration)
  } else {
    const declarations = findRootDeclarations(context, callExpression)
    contextType = declarations.some((d) =>
      getFileAnnotations(d.getSourceFile()).has(AnnotationKind.NoSelfInFile)
    )
      ? ContextType.Void
      : context.options.noImplicitSelf
        ? ContextType.Void
        : ContextType.NonVoid
  }

  callContextTypes.set(callExpression, contextType)
  return contextType
}

const signatureDeclarationContextTypes = new WeakMap<ts.SignatureDeclaration, ContextType>()

function getSignatureContextType(
  context: TransformationContext,
  signatureDeclaration: ts.SignatureDeclaration
): ContextType {
  const known = signatureDeclarationContextTypes.get(signatureDeclaration)
  if (known !== undefined) return known
  const contextType = computeDeclarationContextType(context, signatureDeclaration)
  signatureDeclarationContextTypes.set(signatureDeclaration, contextType)
  return contextType
}

function findRootDeclarations(
  context: TransformationContext,
  callExpression: ts.CallLikeExpression
): readonly ts.Declaration[] {
  const calledExpression = ts.isTaggedTemplateExpression(callExpression)
    ? callExpression.tag
    : ts.isJsxSelfClosingElement(callExpression)
      ? callExpression.tagName
      : ts.isJsxOpeningElement(callExpression)
        ? callExpression.tagName
        : ts.isCallExpression(callExpression)
          ? callExpression.expression
          : undefined

  if (!calledExpression) return []

  const calledSymbol = context.checker.getSymbolAtLocation(calledExpression)
  if (calledSymbol === undefined) return []

  return (
    calledSymbol.getDeclarations()?.flatMap((d) => {
      if (ts.isImportSpecifier(d)) {
        const aliasSymbol = context.checker.getAliasedSymbol(calledSymbol)
        return aliasSymbol.getDeclarations() ?? []
      } else {
        return [d]
      }
    }) ?? []
  )
}

function computeDeclarationContextType(
  context: TransformationContext,
  signatureDeclaration: ts.SignatureDeclaration
) {
  const thisParameter = getExplicitThisParameter(signatureDeclaration)
  if (thisParameter) {
    return thisParameter.type && thisParameter.type.kind === ts.SyntaxKind.VoidKeyword
      ? ContextType.Void
      : ContextType.NonVoid
  }

  if (getNodeAnnotations(signatureDeclaration).has(AnnotationKind.NoSelf)) {
    return ContextType.Void
  }

  if (
    ts.isMethodSignature(signatureDeclaration) ||
    ts.isMethodDeclaration(signatureDeclaration) ||
    ts.isConstructSignatureDeclaration(signatureDeclaration) ||
    ts.isConstructorDeclaration(signatureDeclaration) ||
    (signatureDeclaration.parent && ts.isPropertyDeclaration(signatureDeclaration.parent)) ||
    (signatureDeclaration.parent && ts.isPropertySignature(signatureDeclaration.parent)) ||
    (signatureDeclaration.parent && ts.isIndexSignatureDeclaration(signatureDeclaration.parent))
  ) {
    const scopeDeclaration = findFirstNodeAbove(
      signatureDeclaration,
      (n): n is ts.ClassLikeDeclaration | ts.InterfaceDeclaration =>
        ts.isClassDeclaration(n) || ts.isClassExpression(n) || ts.isInterfaceDeclaration(n)
    )

    if (
      scopeDeclaration !== undefined &&
      getNodeAnnotations(scopeDeclaration).has(AnnotationKind.NoSelf)
    ) {
      return ContextType.Void
    }

    return ContextType.NonVoid
  }

  if (signatureDeclaration.parent && ts.isTypeParameterDeclaration(signatureDeclaration.parent)) {
    return ContextType.NonVoid
  }

  const program = context.program
  const options = program.getCompilerOptions()
  if (options.noImplicitSelf === true) {
    const sourceFile = program.getSourceFile(signatureDeclaration.getSourceFile().fileName)
    if (
      sourceFile !== undefined &&
      !program.isSourceFileDefaultLibrary(sourceFile) &&
      (!program.isSourceFileFromExternalLibrary(sourceFile) ||
        isWorkspaceSourceFile(sourceFile.fileName))
    ) {
      return ContextType.Void
    }
  }

  if (hasNoSelfAncestor(signatureDeclaration)) {
    return ContextType.Void
  }

  return ContextType.NonVoid
}

function reduceContextTypes(contexts: readonly ContextType[]): ContextType {
  let type = ContextType.None
  for (const context of contexts) {
    type |= context
    if (type === ContextType.Mixed) break
  }
  return type
}

function getSignatureDeclarations(
  context: TransformationContext,
  signature: ts.Signature
): readonly ts.SignatureDeclaration[] {
  if (signature.compositeSignatures) {
    return signature.compositeSignatures.flatMap((s: ts.Signature) =>
      getSignatureDeclarations(context, s)
    )
  }

  const signatureDeclaration = signature.getDeclaration()
  if (signatureDeclaration === undefined) {
    return []
  }

  let inferredType: ts.Type | undefined
  if (
    ts.isMethodDeclaration(signatureDeclaration) &&
    ts.isObjectLiteralExpression(signatureDeclaration.parent) &&
    !getExplicitThisParameter(signatureDeclaration)
  ) {
    inferredType = context.checker.getContextualTypeForObjectLiteralElement(signatureDeclaration)
  } else if (
    (ts.isFunctionExpression(signatureDeclaration) || ts.isArrowFunction(signatureDeclaration)) &&
    !getExplicitThisParameter(signatureDeclaration)
  ) {
    inferredType = inferAssignedType(context, signatureDeclaration)
  }

  if (inferredType) {
    const inferredSignatures = getAllCallSignatures(inferredType)
    if (inferredSignatures.length > 0) {
      return inferredSignatures.map((s) => s.getDeclaration())
    }
  }

  return [signatureDeclaration]
}

const typeContextTypes = new WeakMap<ts.Type, ContextType>()

export function getFunctionContextType(context: TransformationContext, type: ts.Type): ContextType {
  const known = typeContextTypes.get(type)
  if (known !== undefined) return known
  const contextType = computeFunctionContextType(context, type)
  typeContextTypes.set(type, contextType)
  return contextType
}

function computeFunctionContextType(context: TransformationContext, type: ts.Type): ContextType {
  if (type.isTypeParameter()) {
    const constraint = type.getConstraint()
    if (constraint) return getFunctionContextType(context, constraint)
  }

  const signatures = getAllCallSignatures(type)
  if (signatures.length === 0) {
    return ContextType.None
  }

  return reduceContextTypes(
    signatures
      .flatMap((s) => getSignatureDeclarations(context, s))
      .map((s) => getSignatureContextType(context, s))
  )
}
