import ts from "typescript"

function kindOf(path: string): ts.ScriptKind {
  return path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
}

export function parsedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kindOf(path))
}

export function skimmedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, false, kindOf(path))
}

export function lineAt(source: ts.SourceFile, at: number): number {
  return source.getLineAndCharacterOfPosition(at).line + 1
}

export function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return lineAt(source, node.getStart(source))
}
