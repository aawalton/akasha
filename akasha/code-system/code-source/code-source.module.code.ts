import ts from "typescript"

export function parsedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

export function skimmedAs(path: string, text: string): ts.SourceFile {
  return ts.createSourceFile(path, text, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS)
}

export function lineAt(source: ts.SourceFile, at: number): number {
  return source.getLineAndCharacterOfPosition(at).line + 1
}

export function lineOf(source: ts.SourceFile, node: ts.Node): number {
  return lineAt(source, node.getStart(source))
}
