import type * as ts from "typescript"
import type { FunctionVisitor } from "../context-visitors/context-visitors.module.code.ts"
import { LuaTarget } from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import * as luaStatements from "../tstl-lua-ast-statements/tstl-lua-ast-statements.module.code.ts"
import { findScope, LoopContinued, ScopeType } from "../tstl-scope/tstl-scope.module.code.ts"

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
