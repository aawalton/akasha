import type { TransformationContext } from "akasha/design/language/lua-compiler/modules/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as ts from "typescript"

export type CreateModuleLocalNameFn = (
  context: TransformationContext,
  module: ts.ModuleDeclaration
) => luaExpressions.Expression

export const MODULE_LOCAL_NAME_HOLDER: { fn: CreateModuleLocalNameFn | undefined } = {
  fn: undefined,
}

export function requireCreateModuleLocalName(): CreateModuleLocalNameFn {
  if (MODULE_LOCAL_NAME_HOLDER.fn === undefined) {
    throw new Error(
      "utils/export: createModuleLocalName not registered — visitors/namespace must load before createExportedIdentifier is called"
    )
  }
  return MODULE_LOCAL_NAME_HOLDER.fn
}
