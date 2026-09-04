import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"

export function createExportsIdentifier(): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("____exports")
}
