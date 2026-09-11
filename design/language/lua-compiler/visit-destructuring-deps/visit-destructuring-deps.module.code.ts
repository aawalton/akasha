import type { TransformationContext } from "akasha/design/language/lua-compiler/context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "akasha/design/language/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"
import type * as luaStatements from "akasha/design/language/lua-compiler/lua-ast-statements/lua-ast-statements.module.code.ts"
import type * as ts from "typescript"

export type TransformDestructuringAssignmentFn = (
  context: TransformationContext,
  node: ts.DestructuringAssignment,
  root: luaExpressions.Expression,
  rightHasPrecedingStatements: boolean
) => readonly luaStatements.Statement[]

export const transformDestructuringAssignmentHolder: {
  fn: TransformDestructuringAssignmentFn | undefined
} = {
  fn: undefined,
}

export function requireTransformDestructuringAssignment(): TransformDestructuringAssignmentFn {
  if (transformDestructuringAssignmentHolder.fn === undefined) {
    throw new Error(
      "binary-expression/assignments: transformDestructuringAssignment not registered — binary-expression/destructuring-assignments must load before transformAssignmentStatement is called"
    )
  }
  return transformDestructuringAssignmentHolder.fn
}
