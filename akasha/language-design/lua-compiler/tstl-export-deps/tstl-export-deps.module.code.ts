import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export type CreateModuleLocalNameFn = (
  context: TransformationContext,
  module: ts.ModuleDeclaration
) => luaExpressions.Expression

export const moduleLocalNameHolder: { fn: CreateModuleLocalNameFn | undefined } = {
  fn: undefined,
}

export function requireCreateModuleLocalName(): CreateModuleLocalNameFn {
  if (moduleLocalNameHolder.fn === undefined) {
    throw new Error(
      "utils/export: createModuleLocalName not registered — visitors/namespace must load before createExportedIdentifier is called"
    )
  }
  return moduleLocalNameHolder.fn
}
