import type * as ts from "typescript"
import * as luaStatements from "../../../LuaAST-statements"
import * as luaExpressions from "../../../LuaAST-expressions"
import type { TransformationContext } from "../../context/transformation-context"

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
