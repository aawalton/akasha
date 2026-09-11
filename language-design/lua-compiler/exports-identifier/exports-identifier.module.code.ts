import * as luaExpressions from "akasha/language-design/lua-compiler/lua-ast-expressions/lua-ast-expressions.module.code.ts"

export function createExportsIdentifier(): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("____exports")
}
