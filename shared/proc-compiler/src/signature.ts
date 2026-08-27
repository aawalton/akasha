import ts from "typescript"

export type DerivedSignature = {
  signatureArgs: string
  grantsSig: string
}

type Param = {
  name: string
  pgType: string
  optional: boolean
}

const TS_TO_PG_PRIMITIVE: Record<string, string> = {
  string: "text",
  number: "bigint",
  boolean: "boolean",
}

const TS_REFERENCE_TO_PG_BUILTINS: Record<string, string> = {
  Json: "jsonb",
}

export type DeriveSignatureOptions = {
  tsReferenceToPg?: Readonly<Record<string, string>>
  helperMode?: boolean
  triggerMode?: boolean
}

export function deriveSignatureFromFunction(
  fn: ts.FunctionDeclaration,
  sf: ts.SourceFile,
  opts?: DeriveSignatureOptions
): DerivedSignature {
  if (opts?.helperMode === true && opts?.triggerMode === true) {
    throw new Error(
      "deriveSignatureFromFunction: helperMode and triggerMode are mutually exclusive"
    )
  }
  if (opts?.triggerMode === true) {
    return formatSignature([])
  }
  const argsIdx = opts?.helperMode === true ? 0 : 1
  const argsParam = fn.parameters[argsIdx]
  if (argsParam === undefined) {
    return formatSignature([])
  }
  const typeNode = argsParam.type
  if (typeNode === undefined) {
    throw new Error("deriveSignature: `args` parameter must have an explicit type annotation")
  }
  const literal = resolveArgsTypeLiteral(typeNode, sf)
  const params = walkArgsTypeLiteral(literal, sf, opts)
  return formatSignature(params)
}

export function deriveReturnType(
  fn: ts.FunctionDeclaration,
  sf: ts.SourceFile,
  opts?: DeriveSignatureOptions
): string {
  const t = fn.type
  if (t === undefined) {
    throw new Error("deriveReturnType: function must have an explicit return-type annotation")
  }
  return tsTypeToPgType(unwrapPromise(t), sf, opts)
}

function unwrapPromise(t: ts.TypeNode): ts.TypeNode {
  if (
    ts.isTypeReferenceNode(t) &&
    ts.isIdentifier(t.typeName) &&
    t.typeName.text === "Promise" &&
    t.typeArguments !== undefined &&
    t.typeArguments.length === 1
  ) {
    const inner = t.typeArguments[0]
    if (inner !== undefined) return inner
  }
  return t
}

function resolveArgsTypeLiteral(typeNode: ts.TypeNode, sf: ts.SourceFile): ts.TypeLiteralNode {
  if (ts.isTypeLiteralNode(typeNode)) return typeNode
  if (ts.isTypeReferenceNode(typeNode) && ts.isIdentifier(typeNode.typeName)) {
    const aliasName = typeNode.typeName.text
    for (const stmt of sf.statements) {
      if (!ts.isTypeAliasDeclaration(stmt)) continue
      if (stmt.name.text !== aliasName) continue
      if (ts.isTypeLiteralNode(stmt.type)) return stmt.type
      throw new Error(
        `deriveSignature: type alias '${aliasName}' must be a TypeLiteral (got ${ts.SyntaxKind[stmt.type.kind]})`
      )
    }
    throw new Error(
      `deriveSignature: cannot resolve type reference '${aliasName}' — declare it as a same-file type alias`
    )
  }
  throw new Error(
    `deriveSignature: args type must be a TypeLiteral or a same-file alias (got ${ts.SyntaxKind[typeNode.kind]})`
  )
}

function walkArgsTypeLiteral(
  literal: ts.TypeLiteralNode,
  sf: ts.SourceFile,
  opts: DeriveSignatureOptions | undefined
): readonly Param[] {
  const out: Param[] = []
  for (const member of literal.members) {
    if (!ts.isPropertySignature(member)) {
      throw new Error(
        `deriveSignature: only property signatures are supported in args (got ${ts.SyntaxKind[member.kind]})`
      )
    }
    if (!ts.isIdentifier(member.name) && !ts.isStringLiteral(member.name)) {
      throw new Error("deriveSignature: args properties must have identifier or string keys")
    }
    const tsKey = member.name.text
    const t = member.type
    if (t === undefined) {
      throw new Error(`deriveSignature: args property '${tsKey}' must have an explicit type`)
    }
    out.push({
      name: tsKeyToPgParam(tsKey),
      pgType: tsTypeToPgType(t, sf, opts),
      optional: member.questionToken !== undefined,
    })
  }
  return out
}

function tsKeyToPgParam(key: string): string {
  const snake = key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
  return `p_${snake}`
}

function tsTypeToPgType(
  t: ts.TypeNode,
  sf: ts.SourceFile,
  opts: DeriveSignatureOptions | undefined
): string {
  if (ts.isUnionTypeNode(t)) {
    const nonNull = t.types.filter((n) => !isNullOrUndefinedType(n))
    if (nonNull.length === 0) {
      throw new Error(`deriveSignature: union of only null/undefined: ${t.getText(sf)}`)
    }
    if (nonNull.length === 1) {
      const head = nonNull[0]
      if (head === undefined) throw new Error("deriveSignature: empty non-null union member")
      return tsTypeToPgType(head, sf, opts)
    }
    if (nonNull.every((n) => ts.isLiteralTypeNode(n))) return "text"
    throw new Error(`deriveSignature: unsupported mixed union ${t.getText(sf)}`)
  }
  if (ts.isArrayTypeNode(t)) {
    const elem = tsTypeToPgType(t.elementType, sf, opts)
    return `${elem}[]`
  }
  if (ts.isTypeOperatorNode(t) && t.operator === ts.SyntaxKind.ReadonlyKeyword) {
    return tsTypeToPgType(t.type, sf, opts)
  }
  if (
    t.kind === ts.SyntaxKind.StringKeyword ||
    t.kind === ts.SyntaxKind.NumberKeyword ||
    t.kind === ts.SyntaxKind.BooleanKeyword
  ) {
    const key =
      t.kind === ts.SyntaxKind.StringKeyword
        ? "string"
        : t.kind === ts.SyntaxKind.NumberKeyword
          ? "number"
          : "boolean"
    const pg = TS_TO_PG_PRIMITIVE[key]
    if (pg === undefined) throw new Error(`deriveSignature: missing primitive map for ${key}`)
    return pg
  }
  if (ts.isTypeReferenceNode(t) && ts.isIdentifier(t.typeName)) {
    const ref = t.typeName.text
    const builtin = TS_REFERENCE_TO_PG_BUILTINS[ref]
    if (builtin !== undefined) return builtin
    const domain = opts?.tsReferenceToPg?.[ref]
    if (domain !== undefined) return domain
    return "jsonb"
  }
  if (ts.isLiteralTypeNode(t)) {
    return "text"
  }
  if (ts.isTypeLiteralNode(t)) return "jsonb"
  throw new Error(`deriveSignature: unsupported TS type ${t.getText(sf)}`)
}

function isNullOrUndefinedType(n: ts.TypeNode): boolean {
  if (ts.isLiteralTypeNode(n) && n.literal.kind === ts.SyntaxKind.NullKeyword) return true
  if (n.kind === ts.SyntaxKind.UndefinedKeyword) return true
  return false
}

function formatSignature(params: readonly Param[]): DerivedSignature {
  const sigParts: string[] = []
  const grantsParts: string[] = []
  for (const p of params) {
    const def = p.optional ? defaultClause(p.pgType) : ""
    sigParts.push(`${p.name} ${p.pgType}${def}`)
    grantsParts.push(`${p.name} ${p.pgType}`)
  }
  return {
    signatureArgs: sigParts.join(", "),
    grantsSig: grantsParts.join(", "),
  }
}

function defaultClause(pgType: string): string {
  if (pgType.endsWith("[]")) return ` DEFAULT NULL::${pgType}`
  return " DEFAULT NULL"
}
