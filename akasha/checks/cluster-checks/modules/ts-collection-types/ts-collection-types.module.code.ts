import ts from "typescript"

export type CollectionForm = "array" | "array-reference" | "tuple"

export type EscapePosition = "parameter" | "return-type" | "property-signature" | "type-alias"

export interface CollectionFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly form: CollectionForm
  readonly escapePosition: EscapePosition
  readonly start: number
  readonly end: number
  readonly nestedInArrayOrTuple: boolean
}

function isReadonlyTypeOperator(node: ts.Node): node is ts.TypeOperatorNode {
  return ts.isTypeOperatorNode(node) && node.operator === ts.SyntaxKind.ReadonlyKeyword
}

function isArrayTypeRef(node: ts.TypeReferenceNode): boolean {
  const name = node.typeName
  return ts.isIdentifier(name) && name.text === "Array"
}

function isReadonlyArrayTypeRef(node: ts.TypeReferenceNode): boolean {
  const name = node.typeName
  return ts.isIdentifier(name) && name.text === "ReadonlyArray"
}

interface WalkContext {
  readonly file: string
  readonly sf: ts.SourceFile
  readonly position: EscapePosition
}

function makeFinding(
  node: ts.Node,
  form: CollectionForm,
  ctx: WalkContext,
  nestedInArrayOrTuple: boolean
): CollectionFinding {
  const start = node.getStart(ctx.sf)
  const end = node.getEnd()
  const { line, character } = ts.getLineAndCharacterOfPosition(ctx.sf, start)
  return {
    file: ctx.file,
    line: line + 1,
    column: character + 1,
    form,
    escapePosition: ctx.position,
    start,
    end,
    nestedInArrayOrTuple,
  }
}

function walkTypeIn(
  node: ts.Node,
  ctx: WalkContext,
  parentIsMutableCollection: boolean
): readonly CollectionFinding[] {
  if (ts.isParenthesizedTypeNode(node)) {
    return walkTypeIn(node.type, ctx, parentIsMutableCollection)
  }

  if (isReadonlyTypeOperator(node)) {
    const inner = node.type
    if (ts.isArrayTypeNode(inner)) {
      return walkTypeIn(inner.elementType, ctx, false)
    }
    if (ts.isTupleTypeNode(inner)) {
      return inner.elements.flatMap((el) => walkTypeIn(el, ctx, false))
    }
    return walkTypeIn(inner, ctx, parentIsMutableCollection)
  }

  if (ts.isArrayTypeNode(node)) {
    return [
      makeFinding(node, "array", ctx, parentIsMutableCollection),
      ...walkTypeIn(node.elementType, ctx, true),
    ]
  }

  if (ts.isTupleTypeNode(node)) {
    return [
      makeFinding(node, "tuple", ctx, parentIsMutableCollection),
      ...node.elements.flatMap((el) => walkTypeIn(el, ctx, true)),
    ]
  }

  if (ts.isTypeReferenceNode(node)) {
    if (isArrayTypeRef(node)) {
      const here = makeFinding(node, "array-reference", ctx, parentIsMutableCollection)
      const inner = (node.typeArguments ?? []).flatMap((arg) => walkTypeIn(arg, ctx, false))
      return [here, ...inner]
    }
    if (isReadonlyArrayTypeRef(node)) {
      return (node.typeArguments ?? []).flatMap((arg) => walkTypeIn(arg, ctx, false))
    }
    return []
  }

  if (ts.isRestTypeNode(node)) {
    return walkTypeIn(node.type, ctx, parentIsMutableCollection)
  }
  if (ts.isNamedTupleMember(node)) {
    return walkTypeIn(node.type, ctx, parentIsMutableCollection)
  }
  if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
    return node.types.flatMap((t) => walkTypeIn(t, ctx, parentIsMutableCollection))
  }
  if (ts.isTypeLiteralNode(node)) {
    const childCtx: WalkContext = { ...ctx, position: "property-signature" }
    const memberFindings: CollectionFinding[] = []
    for (const member of node.members) {
      if (ts.isPropertySignature(member) && member.type !== undefined) {
        memberFindings.push(...walkTypeIn(member.type, childCtx, false))
      }
    }
    return memberFindings
  }

  return []
}

function walkContainer(
  node: ts.Node,
  base: Omit<WalkContext, "position">
): readonly CollectionFinding[] {
  const here: CollectionFinding[] = []

  if (
    ts.isFunctionDeclaration(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isMethodSignature(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isCallSignatureDeclaration(node) ||
    ts.isConstructSignatureDeclaration(node) ||
    ts.isFunctionTypeNode(node) ||
    ts.isConstructorTypeNode(node)
  ) {
    for (const param of node.parameters) {
      if (param.type !== undefined) {
        here.push(...walkTypeIn(param.type, { ...base, position: "parameter" }, false))
      }
    }
    if (node.type !== undefined) {
      here.push(...walkTypeIn(node.type, { ...base, position: "return-type" }, false))
    }
  }

  if (ts.isInterfaceDeclaration(node)) {
    for (const member of node.members) {
      if (ts.isPropertySignature(member) && member.type !== undefined) {
        here.push(...walkTypeIn(member.type, { ...base, position: "property-signature" }, false))
      }
    }
  }

  if (ts.isTypeAliasDeclaration(node)) {
    here.push(...walkTypeIn(node.type, { ...base, position: "type-alias" }, false))
  }

  ts.forEachChild(node, (child) => {
    here.push(...walkContainer(child, base))
  })
  return here
}

export function scanCollectionTypes(sf: ts.SourceFile): readonly CollectionFinding[] {
  const filePath = sf.fileName
  const out: CollectionFinding[] = []
  ts.forEachChild(sf, (child) => {
    out.push(...walkContainer(child, { file: filePath, sf }))
  })
  return out
}

export function applyFixes(source: string, findings: readonly CollectionFinding[]): string {
  const sorted = [...findings].sort((a, b) => {
    if (b.start !== a.start) return b.start - a.start
    return a.end - b.end
  })

  let result = source
  for (const f of sorted) {
    if (f.form === "array-reference") {
      const nodeText = result.slice(f.start, f.end)
      const ltIdx = nodeText.indexOf("<")
      const replacement = ltIdx === -1 ? "ReadonlyArray" : `ReadonlyArray${nodeText.slice(ltIdx)}`
      result = result.slice(0, f.start) + replacement + result.slice(f.end)
      continue
    }
    if (f.nestedInArrayOrTuple) {
      const wrapped = `(readonly ${result.slice(f.start, f.end)})`
      result = result.slice(0, f.start) + wrapped + result.slice(f.end)
    } else {
      result = result.slice(0, f.start) + "readonly " + result.slice(f.start)
    }
  }
  return result
}
