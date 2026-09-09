import ts from "typescript"

export type OrphanReason = "undefined-symbol" | "onupdate-storm-vector"

export interface OrphanFinding {
  readonly xmlPath: string
  readonly line: number
  readonly handler: string
  readonly reason: OrphanReason
  readonly namespace: string
  readonly member?: string
  readonly snippet: string
  readonly message: string
}

export interface InlineHandler {
  readonly name: string
  readonly body: string
  readonly line: number
}

const MAX_SNIPPET = 160

function isGlobalThis(node: ts.Expression): boolean {
  return ts.isIdentifier(node) && node.text === "globalThis"
}

function propertyNameText(name: ts.PropertyName): string | undefined {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text
  if (ts.isNumericLiteral(name)) return name.text
  return undefined
}

export interface SourceSymbols {
  readonly namespaces: readonly string[]
  readonly members: readonly string[]
}

export function collectSourceSymbols(source: string, filePath: string): SourceSymbols {
  const sf = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true)
  const namespaces = new Set<string>()
  const members = new Set<string>()

  const visit = (node: ts.Node): undefined => {
    if (ts.isObjectLiteralExpression(node)) {
      for (const prop of node.properties) {
        if (
          ts.isPropertyAssignment(prop) ||
          ts.isMethodDeclaration(prop) ||
          ts.isGetAccessorDeclaration(prop) ||
          ts.isSetAccessorDeclaration(prop)
        ) {
          const text = propertyNameText(prop.name)
          if (text !== undefined) members.add(text)
        } else if (ts.isShorthandPropertyAssignment(prop)) {
          members.add(prop.name.text)
        }
      }
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const lhs = node.left
      if (ts.isPropertyAccessExpression(lhs)) {
        members.add(lhs.name.text)
        if (isGlobalThis(lhs.expression)) namespaces.add(lhs.name.text)
      } else if (
        ts.isElementAccessExpression(lhs) &&
        ts.isStringLiteralLike(lhs.argumentExpression)
      ) {
        members.add(lhs.argumentExpression.text)
        if (isGlobalThis(lhs.expression)) namespaces.add(lhs.argumentExpression.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return { namespaces: [...namespaces].sort(), members: [...members].sort() }
}

function stripXmlComments(xml: string): string {
  return xml.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
}

const HANDLER_RE = /<(On[A-Z][A-Za-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1\s*>/g

export function parseInlineHandlers(xml: string): readonly InlineHandler[] {
  const cleaned = stripXmlComments(xml)
  const handlers: InlineHandler[] = []
  for (const match of cleaned.matchAll(HANDLER_RE)) {
    const name = match[1]
    if (name === undefined) continue
    const body = match[2] ?? ""
    const index = match.index ?? 0
    const line = cleaned.slice(0, index).split("\n").length
    handlers.push({ name, body, line })
  }
  return handlers
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function referencedMembers(body: string, namespace: string): readonly string[] {
  const re = new RegExp(`\\b${escapeRe(namespace)}\\s*[.:]\\s*([A-Za-z_][A-Za-z0-9_]*)`, "g")
  const out: string[] = []
  for (const m of body.matchAll(re)) {
    const member = m[1]
    if (member !== undefined) out.push(member)
  }
  return out
}

function referencesNamespace(body: string, namespace: string): boolean {
  return new RegExp(`\\b${escapeRe(namespace)}\\s*[.:]`).test(body)
}

function snippetOf(body: string): string {
  const flat = body.trim().replace(/\s+/g, " ")
  return flat.length > MAX_SNIPPET ? `${flat.slice(0, MAX_SNIPPET)}…` : flat
}

export interface DetectInput {
  readonly xmlPath: string
  readonly xml: string
  readonly namespaces: ReadonlySet<string>
  readonly memberUniverse: ReadonlySet<string>
}

export function detectOrphans(input: DetectInput): readonly OrphanFinding[] {
  const { xmlPath, xml, namespaces, memberUniverse } = input
  const findings: OrphanFinding[] = []
  if (namespaces.size === 0) return findings

  for (const handler of parseInlineHandlers(xml)) {
    const body = handler.body
    if (body.trim().length === 0) continue
    const snippet = snippetOf(body)

    for (const ns of namespaces) {
      if (handler.name === "OnUpdate" && referencesNamespace(body, ns)) {
        findings.push({
          xmlPath,
          line: handler.line,
          handler: handler.name,
          reason: "onupdate-storm-vector",
          namespace: ns,
          snippet,
          message: `non-empty inline <OnUpdate> references \`${ns}\` — OnUpdate fires every frame from control creation, before deferred init publishes the namespace; this is the per-frame nil-call storm vector (delete the control or move the call to a load-gated handler)`,
        })
      }

      for (const member of referencedMembers(body, ns)) {
        if (memberUniverse.has(member)) continue
        findings.push({
          xmlPath,
          line: handler.line,
          handler: handler.name,
          reason: "undefined-symbol",
          namespace: ns,
          member,
          snippet,
          message: `<${handler.name}> calls \`${ns}.${member}\` but \`${member}\` is defined nowhere in addon \`${ns}\`'s source — nil at runtime (\`function expected instead of nil\`). Delete the handler if the control no longer needs it, or define \`${member}\` on \`${ns}\`; where \`${member}\` was renamed rather than removed, correct the name in the handler`,
        })
      }
    }
  }
  return findings
}
