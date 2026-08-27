import ts from "typescript"

export type TstlThisVoidSelfDropKind = "constructor" | "control-method" | "xml-handler"

export interface TstlThisVoidSelfDropFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly name: string
  readonly kind: TstlThisVoidSelfDropKind
}

const CONSTRUCTOR_NAMES: ReadonlySet<string> = new Set(["New", "Subclass"])

const XML_COLON_CALL_RE =
  /([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/g

function stripXmlComments(xml: string): string {
  return xml.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
}

export function collectXmlColonCalls(xmlText: string): ReadonlySet<string> {
  const out = new Set<string>()
  const cleaned = stripXmlComments(xmlText)
  for (const m of cleaned.matchAll(XML_COLON_CALL_RE)) {
    out.add(`${m[1]}:${m[2]}`)
  }
  return out
}

function isThisVoidParam(p: ts.ParameterDeclaration): boolean {
  if (!ts.isIdentifier(p.name)) return false
  if (ts.identifierToKeywordKind(p.name) !== ts.SyntaxKind.ThisKeyword) return false
  return p.type?.kind === ts.SyntaxKind.VoidKeyword
}

function isReceiverParam(p: ts.ParameterDeclaration): boolean {
  if (ts.isIdentifier(p.name) && p.name.text === "self") return true
  return p.type?.kind === ts.SyntaxKind.ObjectKeyword
}

function signatureParams(member: ts.Node): readonly ts.ParameterDeclaration[] | undefined {
  if (ts.isMethodSignature(member)) return member.parameters
  if (
    ts.isPropertySignature(member) &&
    member.type !== undefined &&
    ts.isFunctionTypeNode(member.type)
  ) {
    return member.type.parameters
  }
  return undefined
}

function memberName(member: ts.MethodSignature | ts.PropertySignature): string | undefined {
  const name = member.name
  if (ts.isIdentifier(name)) return name.text
  return undefined
}

function rightmostTypeName(name: ts.EntityName): string {
  return ts.isIdentifier(name) ? name.text : name.right.text
}

export const CONTROL_ROOT = "Control"

function collectReaches(node: ts.Node, into: Set<string>): undefined {
  if (ts.isTypeReferenceNode(node)) into.add(rightmostTypeName(node.typeName))
  else if (ts.isExpressionWithTypeArguments(node) && ts.isIdentifier(node.expression)) {
    into.add(node.expression.text)
  } else if (ts.isIntersectionTypeNode(node) || ts.isUnionTypeNode(node)) {
    for (const operand of node.types) collectReaches(operand, into)
  } else if (ts.isParenthesizedTypeNode(node)) collectReaches(node.type, into)
  return
}

export function collectTypeFamilyEdges(
  sf: ts.SourceFile
): ReadonlyMap<string, ReadonlySet<string>> {
  const edges = new Map<string, Set<string>>()
  const reachesOf = (name: string): Set<string> => {
    const existing = edges.get(name)
    if (existing !== undefined) return existing
    const fresh = new Set<string>()
    edges.set(name, fresh)
    return fresh
  }
  function visit(node: ts.Node): undefined {
    if (ts.isInterfaceDeclaration(node)) {
      const into = reachesOf(node.name.text)
      for (const clause of node.heritageClauses ?? []) {
        for (const type of clause.types) collectReaches(type, into)
      }
    } else if (ts.isTypeAliasDeclaration(node)) {
      collectReaches(node.type, reachesOf(node.name.text))
    }
    ts.forEachChild(node, visit)
    return
  }
  ts.forEachChild(sf, visit)
  return edges
}

export function resolveControlFamily(
  edges: ReadonlyMap<string, ReadonlySet<string>>
): ReadonlySet<string> {
  if (!edges.has(CONTROL_ROOT)) {
    throw new Error(
      `no \`${CONTROL_ROOT}\` type is declared anywhere in the scanned corpus — the ambient ESO type surface is not being read, and the control-method family would close to nothing while the scan still reported clean. Check the ambient type tree and the addon roster.`
    )
  }
  const family = new Set<string>([CONTROL_ROOT])
  let grew = true
  while (grew) {
    grew = false
    for (const [name, reaches] of edges) {
      if (family.has(name)) continue
      for (const reached of reaches) {
        if (family.has(reached)) {
          family.add(name)
          grew = true
          break
        }
      }
    }
  }
  return family
}

function inControlIntersection(member: ts.Node, controlFamily: ReadonlySet<string>): boolean {
  const literal = member.parent
  if (literal === undefined || !ts.isTypeLiteralNode(literal)) return false
  const intersection = literal.parent
  if (intersection === undefined || !ts.isIntersectionTypeNode(intersection)) return false
  return intersection.types.some(
    (type) => ts.isTypeReferenceNode(type) && controlFamily.has(rightmostTypeName(type.typeName))
  )
}

function matchedKind(
  member: ts.MethodSignature | ts.PropertySignature,
  name: string | undefined,
  controlFamily: ReadonlySet<string>
): TstlThisVoidSelfDropKind | undefined {
  if (name !== undefined && CONSTRUCTOR_NAMES.has(name)) return "constructor"
  if (inControlIntersection(member, controlFamily)) return "control-method"
  return undefined
}

function valueRefText(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr)) return expr.text
  if (ts.isPropertyAccessExpression(expr)) {
    const base = valueRefText(expr.expression)
    return base === undefined ? undefined : `${base}.${expr.name.text}`
  }
  return undefined
}

function functionValueParams(node: ts.Expression): readonly ts.ParameterDeclaration[] | undefined {
  if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) return node.parameters
  return undefined
}

function matchXmlHandlerAssignment(
  node: ts.Node,
  xmlColonCalls: ReadonlySet<string>
): { readonly nameNode: ts.Node; readonly key: string } | undefined {
  if (
    !ts.isBinaryExpression(node) ||
    node.operatorToken.kind !== ts.SyntaxKind.EqualsToken ||
    !ts.isPropertyAccessExpression(node.left)
  ) {
    return undefined
  }
  const params = functionValueParams(node.right)
  const first = params?.[0]
  if (params === undefined || first === undefined || !isThisVoidParam(first)) return undefined
  const second = params[1]
  if (second !== undefined && isReceiverParam(second)) return undefined
  const receiver = valueRefText(node.left.expression)
  if (receiver === undefined) return undefined
  const key = `${receiver}:${node.left.name.text}`
  return xmlColonCalls.has(key) ? { nameNode: node.left.name, key } : undefined
}

export interface TstlThisVoidSelfDropCorpus {
  readonly xmlColonCalls?: ReadonlySet<string>
  readonly controlFamily?: ReadonlySet<string>
}

const ROOT_ONLY_FAMILY: ReadonlySet<string> = new Set([CONTROL_ROOT])

export function scanTstlThisVoidSelfDrop(
  sf: ts.SourceFile,
  corpus: TstlThisVoidSelfDropCorpus = {}
): readonly TstlThisVoidSelfDropFinding[] {
  const { xmlColonCalls, controlFamily = ROOT_ONLY_FAMILY } = corpus
  const filePath = sf.fileName
  const out: TstlThisVoidSelfDropFinding[] = []

  function pushAt(nameNode: ts.Node, name: string, kind: TstlThisVoidSelfDropKind): undefined {
    const { line, character } = ts.getLineAndCharacterOfPosition(sf, nameNode.getStart(sf))
    out.push({ file: filePath, line: line + 1, column: character + 1, name, kind })
    return
  }

  function visit(node: ts.Node): undefined {
    if (ts.isMethodSignature(node) || ts.isPropertySignature(node)) {
      const params = signatureParams(node)
      const first = params?.[0]
      if (params !== undefined && first !== undefined && isThisVoidParam(first)) {
        const second = params[1]
        if (second === undefined || !isReceiverParam(second)) {
          const name = memberName(node)
          const kind = matchedKind(node, name, controlFamily)
          if (kind !== undefined) pushAt(node.name, name ?? "<computed>", kind)
        }
      }
    }
    if (xmlColonCalls !== undefined && xmlColonCalls.size > 0) {
      const hit = matchXmlHandlerAssignment(node, xmlColonCalls)
      if (hit !== undefined) pushAt(hit.nameNode, hit.key, "xml-handler")
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
