import * as luaExpressions from "akasha/design/language/lua-compiler/modules/lua-ast-expressions/lua-ast-expressions.module.code.ts"

export function createExportsIdentifier(): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("____exports")
}
