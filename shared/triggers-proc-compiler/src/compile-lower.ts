import ts from "typescript"

export function lowerStatement(stmt: ts.Statement, sf: ts.SourceFile): string {
  if (ts.isExpressionStatement(stmt)) {
    return lowerExpressionStatement(stmt, sf)
  }
  if (ts.isReturnStatement(stmt)) {
    return lowerReturnStatement(stmt, sf)
  }
  if (ts.isIfStatement(stmt)) {
    return lowerIfStatement(stmt, sf)
  }
  throw new Error(
    `lowerStatement: unsupported statement kind ${ts.SyntaxKind[stmt.kind]} (got: ${stmt.getText(sf)})`
  )
}

function lowerIfStatement(stmt: ts.IfStatement, sf: ts.SourceFile): string {
  if (stmt.elseStatement !== undefined) {
    throw new Error(`lowerIfStatement: else / else if not supported yet (got: ${stmt.getText(sf)})`)
  }
  if (!ts.isBlock(stmt.thenStatement)) {
    throw new Error(
      `lowerIfStatement: if-body must be a brace block (got: ${stmt.thenStatement.getText(sf)})`
    )
  }
  const cond = lowerExpression(stmt.expression, sf)
  const bodyLines: string[] = []
  for (const inner of stmt.thenStatement.statements) {
    bodyLines.push(lowerStatement(inner, sf))
  }
  return `IF ${cond} THEN\n${bodyLines.join("\n")}\nEND IF;`
}

function lowerExpressionStatement(stmt: ts.ExpressionStatement, sf: ts.SourceFile): string {
  const expr = stmt.expression
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    ts.isPropertyAccessExpression(expr.left) &&
    isNewOrOldFieldAccess(expr.left, "NEW")
  ) {
    const fieldName = expr.left.name.text
    const lhs = `NEW.${camelToSnake(fieldName)}`
    const rhs = lowerExpression(expr.right, sf)
    return `${lhs} := ${rhs};`
  }
  if (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression) &&
    isCtxAccess(expr.expression) &&
    expr.expression.name.text === "notify"
  ) {
    const ch = expr.arguments[0]
    const payload = expr.arguments[1]
    if (ch === undefined || payload === undefined) {
      throw new Error("ctx.notify: requires 2 arguments (channel, payload)")
    }
    return `PERFORM pg_notify(${lowerExpression(ch, sf)}, ${lowerExpression(payload, sf)});`
  }
  throw new Error(
    `lowerExpressionStatement: unsupported expression-statement shape: ${stmt.getText(sf)}`
  )
}

function lowerReturnStatement(stmt: ts.ReturnStatement, sf: ts.SourceFile): string {
  const expr = stmt.expression
  if (expr === undefined) {
    throw new Error("lowerReturnStatement: trigger procedures must return a sentinel literal")
  }
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    const t = expr.text
    if (t === "NEW") return "RETURN NEW;"
    if (t === "OLD") return "RETURN OLD;"
    if (t === "NULL") return "RETURN NULL;"
    throw new Error(
      `lowerReturnStatement: trigger return must be one of "NEW" / "OLD" / "NULL" (got "${t}")`
    )
  }
  throw new Error(
    `lowerReturnStatement: trigger return must be a string-literal sentinel (got ${expr.getText(sf)})`
  )
}

function lowerExpression(expr: ts.Expression, sf: ts.SourceFile): string {
  if (expr.kind === ts.SyntaxKind.NullKeyword) {
    return "NULL"
  }
  if (expr.kind === ts.SyntaxKind.TrueKeyword) {
    return "true"
  }
  if (expr.kind === ts.SyntaxKind.FalseKeyword) {
    return "false"
  }
  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return `'${expr.text.replace(/'/g, "''")}'`
  }
  if (ts.isTemplateExpression(expr)) {
    const parts: string[] = []
    if (expr.head.text !== "") {
      parts.push(`'${expr.head.text.replace(/'/g, "''")}'`)
    }
    for (const span of expr.templateSpans) {
      parts.push(lowerExpression(span.expression, sf))
      if (span.literal.text !== "") {
        parts.push(`'${span.literal.text.replace(/'/g, "''")}'`)
      }
    }
    if (parts.length === 0) return `''`
    return parts.join(" || ")
  }
  if (ts.isPropertyAccessExpression(expr)) {
    if (isNewOrOldFieldAccess(expr, "NEW")) {
      return `NEW.${camelToSnake(expr.name.text)}`
    }
    if (isNewOrOldFieldAccess(expr, "OLD")) {
      return `OLD.${camelToSnake(expr.name.text)}`
    }
    if (isCtxAccess(expr) && expr.name.text === "NEW") {
      return "NEW"
    }
    if (isCtxAccess(expr) && expr.name.text === "OLD") {
      return "OLD"
    }
    throw new Error(
      `lowerExpression: unsupported property access: ${expr.getText(sf)} (only ctx.NEW / ctx.OLD / ctx.NEW.<field> / ctx.OLD.<field> are allowed)`
    )
  }
  if (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression) &&
    isCtxAccess(expr.expression) &&
    expr.expression.name.text === "now"
  ) {
    if (expr.arguments.length !== 0) {
      throw new Error("ctx.now: takes no arguments")
    }
    return "now()"
  }
  if (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression) &&
    isCtxAccess(expr.expression) &&
    expr.expression.name.text === "currentSetting"
  ) {
    const key = expr.arguments[0]
    const missingOk = expr.arguments[1]
    if (key === undefined || missingOk === undefined) {
      throw new Error("ctx.currentSetting: requires 2 arguments (key, missingOk)")
    }
    return `current_setting(${lowerExpression(key, sf)}, ${lowerExpression(missingOk, sf)})`
  }
  if (ts.isBinaryExpression(expr)) {
    return lowerBinaryExpression(expr, sf)
  }
  if (ts.isParenthesizedExpression(expr)) {
    return lowerExpression(expr.expression, sf)
  }
  throw new Error(
    `lowerExpression: unsupported expression kind ${ts.SyntaxKind[expr.kind]} (got: ${expr.getText(sf)})`
  )
}

function lowerBinaryExpression(expr: ts.BinaryExpression, sf: ts.SourceFile): string {
  const op = expr.operatorToken.kind
  const lhs = lowerExpressionAsOperand(expr.left, sf)
  const rhs = lowerExpressionAsOperand(expr.right, sf)
  if (op === ts.SyntaxKind.EqualsEqualsEqualsToken) {
    return `${lhs} IS NOT DISTINCT FROM ${rhs}`
  }
  if (op === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
    return `${lhs} IS DISTINCT FROM ${rhs}`
  }
  if (op === ts.SyntaxKind.BarBarToken) {
    return `${lhs} OR ${rhs}`
  }
  if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
    return `${lhs} AND ${rhs}`
  }
  if (op === ts.SyntaxKind.EqualsEqualsToken || op === ts.SyntaxKind.ExclamationEqualsToken) {
    throw new Error(
      `lowerBinaryExpression: use === / !== (strict) instead of == / != (got: ${expr.getText(sf)})`
    )
  }
  throw new Error(
    `lowerBinaryExpression: unsupported operator ${ts.SyntaxKind[op]} (got: ${expr.getText(sf)})`
  )
}

function lowerExpressionAsOperand(expr: ts.Expression, sf: ts.SourceFile): string {
  const inner = ts.isParenthesizedExpression(expr) ? expr.expression : expr
  const lowered = lowerExpression(inner, sf)
  if (ts.isBinaryExpression(inner)) {
    return `(${lowered})`
  }
  return lowered
}

function isNewOrOldFieldAccess(node: ts.PropertyAccessExpression, which: "NEW" | "OLD"): boolean {
  const inner = node.expression
  return ts.isPropertyAccessExpression(inner) && isCtxAccess(inner) && inner.name.text === which
}

function isCtxAccess(node: ts.PropertyAccessExpression): boolean {
  return ts.isIdentifier(node.expression) && node.expression.text === "ctx"
}

function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
}
