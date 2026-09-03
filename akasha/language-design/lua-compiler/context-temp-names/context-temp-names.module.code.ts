import * as ts from "typescript"
import { tempSymbolId } from "../context-temp-symbol-id/context-temp-symbol-id.module.code.ts"
import * as luaCore from "../tstl-lua-ast-core/tstl-lua-ast-core.module.code.ts"
import * as luaExpressions from "../tstl-lua-ast-expressions/tstl-lua-ast-expressions.module.code.ts"
import { createSafeName } from "../tstl-safe-names/tstl-safe-names.module.code.ts"

export interface TempNames {
  createTempName: (prefix?: string) => string
  createTempNameForLuaExpression: (
    expression: luaExpressions.Expression
  ) => luaExpressions.Identifier
  createTempNameForNode: (node: ts.Node) => luaExpressions.Identifier
}

export function createTempNames(): TempNames {
  let nextTempId = 0

  function createTempName(prefix = "temp"): string {
    prefix = prefix.replace(/^_*/, "")
    return createSafeName(`${prefix}_${nextTempId++}`)
  }

  function getTempNameForLuaExpression(expression: luaExpressions.Expression): string | undefined {
    if (luaExpressions.isStringLiteral(expression)) {
      return expression.value
    } else if (luaExpressions.isNumericLiteral(expression)) {
      return `_${expression.value.toString()}`
    } else if (luaExpressions.isIdentifier(expression)) {
      return expression.text
    } else if (luaExpressions.isCallExpression(expression)) {
      const name = getTempNameForLuaExpression(expression.expression)
      if (name != null) {
        return `${name}_result`
      }
    } else if (luaExpressions.isTableIndexExpression(expression)) {
      const tableName = getTempNameForLuaExpression(expression.table)
      const indexName = getTempNameForLuaExpression(expression.index)
      if (tableName != null || indexName != null) {
        return `${tableName ?? "table"}_${indexName ?? "index"}`
      }
    }
  }

  function createTempNameForLuaExpression(
    expression: luaExpressions.Expression
  ): luaExpressions.Identifier {
    const name = getTempNameForLuaExpression(expression)
    const identifier = luaExpressions.createIdentifier(
      createTempName(name),
      undefined,
      tempSymbolId
    )
    luaCore.setNodePosition(identifier, luaCore.getOriginalPos(expression))
    return identifier
  }

  function getTempNameForNode(node: ts.Node): string | undefined {
    if (ts.isStringLiteral(node) || ts.isIdentifier(node) || ts.isMemberName(node)) {
      return node.text
    } else if (ts.isNumericLiteral(node)) {
      return `_${node.text}`
    } else if (ts.isCallExpression(node)) {
      const name = getTempNameForNode(node.expression)
      if (name != null) {
        return `${name}_result`
      }
    } else if (ts.isElementAccessExpression(node) || ts.isPropertyAccessExpression(node)) {
      const tableName = getTempNameForNode(node.expression)
      const indexName = ts.isElementAccessExpression(node)
        ? getTempNameForNode(node.argumentExpression)
        : node.name.text
      if (tableName != null || indexName != null) {
        return `${tableName ?? "table"}_${indexName ?? "index"}`
      }
    }
  }

  function createTempNameForNode(node: ts.Node): luaExpressions.Identifier {
    const name = getTempNameForNode(node)
    return luaExpressions.createIdentifier(createTempName(name), node, tempSymbolId)
  }

  return { createTempName, createTempNameForLuaExpression, createTempNameForNode }
}
