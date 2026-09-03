import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import type * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import type * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"

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
