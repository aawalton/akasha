import ts from "typescript"

export type FunctionNode =
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.ArrowFunction
  | ts.MethodDeclaration
  | ts.ConstructorDeclaration
  | ts.GetAccessorDeclaration
  | ts.SetAccessorDeclaration

export interface WalkedFunction {
  readonly node: FunctionNode
  readonly name: string
  readonly line: number
}

export function isFunctionBearing(n: ts.Node): n is FunctionNode {
  return (
    ts.isFunctionDeclaration(n) ||
    ts.isFunctionExpression(n) ||
    ts.isArrowFunction(n) ||
    ts.isMethodDeclaration(n) ||
    ts.isConstructorDeclaration(n) ||
    ts.isGetAccessorDeclaration(n) ||
    ts.isSetAccessorDeclaration(n)
  )
}

export function walkFunctions(sourceFile: ts.SourceFile): readonly WalkedFunction[] {
  const out: WalkedFunction[] = []
  function visit(node: ts.Node): undefined {
    if (isFunctionBearing(node)) {
      const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
      out.push({
        node,
        name: resolveFunctionName(node, sourceFile),
        line: start.line + 1,
      })
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return out
}

function memberPropertyName(name: ts.PropertyName, sourceFile: ts.SourceFile): string {
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name)) return name.text
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text
  return name.getText(sourceFile)
}

function classOrObjectQualifier(parent: ts.Node, sourceFile: ts.SourceFile): string | undefined {
  if (ts.isClassDeclaration(parent) || ts.isClassExpression(parent)) {
    return parent.name?.text ?? "<class>"
  }
  if (ts.isObjectLiteralExpression(parent)) {
    const decl = parent.parent
    if (ts.isVariableDeclaration(decl) && ts.isIdentifier(decl.name)) {
      return decl.name.text
    }
    if (ts.isPropertyAssignment(decl)) {
      return memberPropertyName(decl.name, sourceFile)
    }
    return undefined
  }
  return undefined
}

export function resolveFunctionName(node: FunctionNode, sourceFile: ts.SourceFile): string {
  if (ts.isConstructorDeclaration(node)) {
    const q = classOrObjectQualifier(node.parent, sourceFile)
    return q !== undefined ? `${q}.constructor` : "constructor"
  }

  if (
    ts.isMethodDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node)
  ) {
    const propName = memberPropertyName(node.name, sourceFile)
    const q = classOrObjectQualifier(node.parent, sourceFile)
    const prefix = ts.isGetAccessorDeclaration(node)
      ? "get "
      : ts.isSetAccessorDeclaration(node)
        ? "set "
        : ""
    const local = `${prefix}${propName}`
    return q !== undefined ? `${q}.${local}` : local
  }

  const parent = node.parent
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    return parent.name.text
  }
  if (ts.isPropertyAssignment(parent)) {
    const propName = memberPropertyName(parent.name, sourceFile)
    const obj = parent.parent
    if (ts.isObjectLiteralExpression(obj)) {
      const decl = obj.parent
      if (ts.isVariableDeclaration(decl) && ts.isIdentifier(decl.name)) {
        return `${decl.name.text}.${propName}`
      }
    }
    return propName
  }
  if (ts.isFunctionDeclaration(node) && node.name) return node.name.text

  const start = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
  return `<anonymous>:${start.line + 1}:${start.character + 1}`
}
