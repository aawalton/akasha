import * as luaExpressions from "../../LuaAST-expressions"

export function createExportsIdentifier(): luaExpressions.Identifier {
  return luaExpressions.createIdentifier("____exports")
}
