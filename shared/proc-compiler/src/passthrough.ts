import ts from "typescript"

export function scanIdentityPassthroughs(sf: ts.SourceFile): Set<string> {
  const out = new Set<string>()
  for (const stmt of sf.statements) {
    if (!ts.isFunctionDeclaration(stmt) || stmt.name === undefined) continue
    if (stmt.parameters.length !== 1) continue
    const param = stmt.parameters[0]
    if (param === undefined || !ts.isIdentifier(param.name)) continue
    const body = stmt.body
    if (body === undefined || body.statements.length !== 1) continue
    const onlyStmt = body.statements[0]
    if (onlyStmt === undefined || !ts.isReturnStatement(onlyStmt)) continue
    const expr = onlyStmt.expression
    if (expr === undefined) continue
    let inner = expr
    while (ts.isAsExpression(inner)) inner = inner.expression
    if (!ts.isIdentifier(inner) || inner.text !== param.name.text) continue
    out.add(stmt.name.text)
  }
  return out
}
