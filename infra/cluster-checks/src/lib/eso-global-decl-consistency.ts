import ts from "typescript"

export interface GlobalCallableDecl {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
  readonly keyword: string
}

export interface EsoFalseGlobalFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
  readonly keyword: string
}

function parse(source: string, fileName = "eso.d.ts"): ts.SourceFile {
  return ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

export function collectGeneratedObjectMethods(source: string): ReadonlySet<string> {
  const out = new Set<string>()
  const sf = parse(source)
  function visit(node: ts.Node): undefined {
    if (ts.isInterfaceDeclaration(node)) {
      for (const member of node.members) {
        if (ts.isMethodSignature(member) && ts.isIdentifier(member.name)) {
          out.add(member.name.text)
        }
      }
    }
    ts.forEachChild(node, visit)
    return
  }
  ts.forEachChild(sf, visit)
  return out
}

function isCallableType(type: ts.TypeNode | undefined): boolean {
  if (type === undefined) return false
  if (ts.isFunctionTypeNode(type)) return true
  return ts.isTypeLiteralNode(type) && type.members.some(ts.isCallSignatureDeclaration)
}

function variableKeyword(list: ts.VariableDeclarationList): string {
  if ((list.flags & ts.NodeFlags.Const) !== 0) return "const"
  if ((list.flags & ts.NodeFlags.Let) !== 0) return "let"
  return "var"
}

export function collectGlobalCallableDecls(
  file: string,
  source: string
): readonly GlobalCallableDecl[] {
  const out: GlobalCallableDecl[] = []
  const sf = parse(source, file)
  const record = (node: ts.Node, name: string, keyword: string): undefined => {
    const { line, character } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
    out.push({ file, line: line + 1, column: character + 1, name, keyword })
    return
  }
  for (const stmt of sf.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name !== undefined) {
      record(stmt, stmt.name.text, "function")
      continue
    }
    if (!ts.isVariableStatement(stmt)) continue
    const keyword = variableKeyword(stmt.declarationList)
    for (const decl of stmt.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && isCallableType(decl.type)) {
        record(decl, decl.name.text, keyword)
      }
    }
  }
  return out
}

export function collectGeneratedGlobalFns(source: string): ReadonlySet<string> {
  return new Set(collectGlobalCallableDecls("generated.d.ts", source).map((d) => d.name))
}

export function findFalseGlobalDecls(args: {
  readonly manual: readonly GlobalCallableDecl[]
  readonly methodNames: ReadonlySet<string>
  readonly globalFnNames: ReadonlySet<string>
}): readonly EsoFalseGlobalFinding[] {
  const out: EsoFalseGlobalFinding[] = []
  for (const m of args.manual) {
    if (args.methodNames.has(m.name) && !args.globalFnNames.has(m.name)) {
      out.push({ file: m.file, line: m.line, column: m.column, name: m.name, keyword: m.keyword })
    }
  }
  return out
}
