import * as ts from "typescript"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export interface OptionalContinuation {
  contextualCall?: luaExpressions.CallExpression
  usedIdentifiers: readonly luaExpressions.Identifier[]
}

const optionalContinuations = new WeakMap<ts.Identifier, OptionalContinuation>()

export function createOptionalContinuationIdentifier(
  text: string,
  tsOriginal: ts.Expression
): ts.Identifier {
  const identifier = ts.factory.createIdentifier(text)
  ts.setOriginalNode(identifier, tsOriginal)
  optionalContinuations.set(identifier, {
    usedIdentifiers: [],
  })
  return identifier
}

export function isOptionalContinuation(node: ts.Node): boolean {
  return ts.isIdentifier(node) && optionalContinuations.has(node)
}

export function getOptionalContinuationData(
  identifier: ts.Identifier
): OptionalContinuation | undefined {
  return optionalContinuations.get(identifier)
}
