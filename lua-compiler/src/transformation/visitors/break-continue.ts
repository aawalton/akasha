import type * as ts from "typescript"
import { LuaTarget } from "../../CompilerOptions"
import * as luaStatements from "../../LuaAST-statements"
import * as luaExpressions from "../../LuaAST-expressions"
import type { FunctionVisitor } from "../context/visitors"
import { findScope, LoopContinued, ScopeType } from "../utils/scope"

export const transformBreakStatement: FunctionVisitor<ts.BreakStatement> = (
  breakStatement,
  context
) => {
  void context
  return luaStatements.createBreakStatement(breakStatement)
}

export const transformContinueStatement: FunctionVisitor<ts.ContinueStatement> = (
  statement,
  context
) => {
  const scope = findScope(context, ScopeType.Loop)

  const continuedWith = {
    [LuaTarget.Universal]: LoopContinued.WithRepeatBreak,
    [LuaTarget.Lua50]: LoopContinued.WithRepeatBreak,
    [LuaTarget.Lua51]: LoopContinued.WithRepeatBreak,
    [LuaTarget.Lua52]: LoopContinued.WithGoto,
    [LuaTarget.Lua53]: LoopContinued.WithGoto,
    [LuaTarget.Lua54]: LoopContinued.WithGoto,
    [LuaTarget.Lua55]: LoopContinued.WithGoto,
    [LuaTarget.LuaJIT]: LoopContinued.WithGoto,
    [LuaTarget.Luau]: LoopContinued.WithContinue,
  }[context.luaTarget]

  if (scope) {
    scope.loopContinued = continuedWith
  }

  const label = `__continue${scope?.id ?? ""}`

  switch (continuedWith) {
    case LoopContinued.WithGoto:
      return luaStatements.createGotoStatement(label, statement)

    case LoopContinued.WithContinue:
      return luaStatements.createContinueStatement(statement)

    case LoopContinued.WithRepeatBreak:
      return [
        luaStatements.createAssignmentStatement(
          luaExpressions.createIdentifier(label),
          luaExpressions.createBooleanLiteral(true),
          statement
        ),
        luaStatements.createBreakStatement(statement),
      ]
  }
}
