import * as luaExpressions from "../lua-ast-expressions/lua-ast-expressions.module.code.ts"

export function createExportsIdentifier(): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("____exports")
}
