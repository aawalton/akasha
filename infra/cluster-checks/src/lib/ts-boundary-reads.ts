import ts from "typescript"

export type BoundaryKind =
  | "json-parse"
  | "process-env"
  | "fetch-body"
  | "regex-capture"
  | "fs-read"
  | "bun-file-read"
  | "subprocess-stdout"
  | "supabase-rpc"

export interface BoundaryReadFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly kind: BoundaryKind
  readonly snippet: string
}

interface BoundaryMatch {
  readonly kind: BoundaryKind
  readonly node: ts.Node
}

const FETCH_BODY_METHODS = new Set(["json", "text", "formData", "blob", "arrayBuffer"])
const BUN_FILE_METHODS = new Set(["text", "json", "bytes", "arrayBuffer"])
const FS_READ_CHAINS = new Set([
  "fs.readFile",
  "fs.readFileSync",
  "fs.promises.readFile",
  "fsp.readFile",
])
const SUBPROCESS_SPAWN_TEXTS = new Set(["Bun.spawn", "spawn", "spawnSync"])
const APPROVED_BARE_HELPERS = new Set([
  "requireMatch",
  "requireMatchPositional",
  "requireEnv",
  "requireGet",
  "requireFirst",
])
const APPROVED_HELPER_PATTERN = /^parse[A-Z][A-Za-z0-9_]*$/

export function approvedParseRoutes(): string {
  const helpers = [...APPROVED_BARE_HELPERS].map((name) => `${name}(…)`).join(", ")
  return (
    "a schema's `.parse()` / `.safeParse()` (JSON's own is not one), " +
    `one of ${helpers}, ` +
    `or a call to an identifier matching /${APPROVED_HELPER_PATTERN.source}/`
  )
}

function rootIdentifierOfPropertyAccess(expr: ts.Expression): ts.Identifier | null {
  let cur: ts.Expression = expr
  while (ts.isPropertyAccessExpression(cur)) {
    cur = cur.expression
  }
  return ts.isIdentifier(cur) ? cur : null
}

function propertyAccessChainText(expr: ts.Expression): string | null {
  const parts: string[] = []
  let cur: ts.Expression = expr
  while (ts.isPropertyAccessExpression(cur)) {
    parts.unshift(cur.name.text)
    cur = cur.expression
  }
  if (!ts.isIdentifier(cur)) return null
  parts.unshift(cur.text)
  return parts.join(".")
}

function callExpressionText(call: ts.CallExpression): string | null {
  return propertyAccessChainText(call.expression)
}

function unwrapTransparent(node: ts.Node): ts.Node {
  let cur = node
  while (
    cur.parent &&
    (ts.isAwaitExpression(cur.parent) ||
      ts.isParenthesizedExpression(cur.parent) ||
      ts.isNonNullExpression(cur.parent))
  ) {
    cur = cur.parent
  }
  return cur
}

function unwrapTransparentReceiver(expr: ts.Expression): ts.Expression {
  let cur: ts.Expression = expr
  while (
    ts.isAwaitExpression(cur) ||
    ts.isParenthesizedExpression(cur) ||
    ts.isNonNullExpression(cur)
  ) {
    cur = cur.expression
  }
  return cur
}

function isJsonParseCall(node: ts.Node): boolean {
  if (!ts.isCallExpression(node)) return false
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return false
  if (expr.name.text !== "parse") return false
  const root = rootIdentifierOfPropertyAccess(expr)
  if (!root || root.text !== "JSON") return false
  return ts.isIdentifier(expr.expression) && expr.expression.text === "JSON"
}

function detectJsonParse(node: ts.Node): BoundaryMatch | null {
  return isJsonParseCall(node) ? { kind: "json-parse", node } : null
}

function isProcessEnvAccess(node: ts.Node): boolean {
  if (ts.isPropertyAccessExpression(node)) {
    const inner = node.expression
    if (
      ts.isPropertyAccessExpression(inner) &&
      ts.isIdentifier(inner.expression) &&
      inner.expression.text === "process" &&
      inner.name.text === "env"
    ) {
      return true
    }
  }
  if (ts.isElementAccessExpression(node)) {
    const inner = node.expression
    if (
      ts.isPropertyAccessExpression(inner) &&
      ts.isIdentifier(inner.expression) &&
      inner.expression.text === "process" &&
      inner.name.text === "env"
    ) {
      return true
    }
  }
  return false
}

function detectProcessEnv(node: ts.Node): BoundaryMatch | null {
  if (!isProcessEnvAccess(node)) return null
  const parent = node.parent
  if (parent && ts.isBinaryExpression(parent) && parent.left === node) {
    if (parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) return null
  }
  if (parent && ts.isDeleteExpression(parent)) return null
  return { kind: "process-env", node }
}

function detectFetchBody(node: ts.Node): BoundaryMatch | null {
  if (!ts.isCallExpression(node)) return null
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return null
  if (!FETCH_BODY_METHODS.has(expr.name.text)) return null
  const receiver = unwrapTransparentReceiver(expr.expression)
  if (!ts.isCallExpression(receiver)) return null
  if (!ts.isIdentifier(receiver.expression) || receiver.expression.text !== "fetch") return null
  return { kind: "fetch-body", node }
}

function detectRegexCapture(node: ts.Node): BoundaryMatch | null {
  if (!ts.isCallExpression(node)) return null
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return null
  if (expr.name.text !== "exec" && expr.name.text !== "match") return null
  return { kind: "regex-capture", node }
}

function detectFsRead(node: ts.Node): BoundaryMatch | null {
  if (!ts.isCallExpression(node)) return null
  const text = callExpressionText(node)
  if (text === null) return null
  return FS_READ_CHAINS.has(text) ? { kind: "fs-read", node } : null
}

function detectBunFileRead(node: ts.Node): BoundaryMatch | null {
  if (!ts.isCallExpression(node)) return null
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return null
  if (!BUN_FILE_METHODS.has(expr.name.text)) return null
  const receiver = unwrapTransparentReceiver(expr.expression)
  if (!ts.isCallExpression(receiver)) return null
  const recvText = callExpressionText(receiver)
  if (recvText !== "Bun.file") return null
  return { kind: "bun-file-read", node }
}

function detectSubprocessStdout(node: ts.Node): BoundaryMatch | null {
  if (!ts.isPropertyAccessExpression(node)) return null
  if (node.name.text !== "stdout") return null
  const receiver = unwrapTransparentReceiver(node.expression)
  if (!ts.isCallExpression(receiver)) return null
  const recvText = callExpressionText(receiver)
  if (recvText === null) return null
  return SUBPROCESS_SPAWN_TEXTS.has(recvText) ? { kind: "subprocess-stdout", node } : null
}

function detectSupabaseRpc(node: ts.Node): BoundaryMatch | null {
  if (!ts.isCallExpression(node)) return null
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return null
  if (expr.name.text !== "rpc") return null
  const firstArg = node.arguments[0]
  if (!firstArg || !ts.isStringLiteralLike(firstArg)) return null
  return { kind: "supabase-rpc", node }
}

const DETECTORS: ReadonlyArray<(node: ts.Node) => BoundaryMatch | null> = [
  detectJsonParse,
  detectFetchBody,
  detectBunFileRead,
  detectFsRead,
  detectSubprocessStdout,
  detectSupabaseRpc,
  detectRegexCapture,
  detectProcessEnv,
]

function detectBoundary(node: ts.Node): BoundaryMatch | null {
  for (const detector of DETECTORS) {
    const match = detector(node)
    if (match) return match
  }
  return null
}

function isApprovedParserCall(call: ts.CallExpression): boolean {
  const expr = call.expression
  if (ts.isPropertyAccessExpression(expr)) {
    const methodName = expr.name.text
    if (methodName !== "parse" && methodName !== "safeParse") return false
    const root = rootIdentifierOfPropertyAccess(expr)
    if (root && root.text === "JSON") return false
    return true
  }
  if (ts.isIdentifier(expr)) {
    if (APPROVED_BARE_HELPERS.has(expr.text)) return true
    if (APPROVED_HELPER_PATTERN.test(expr.text)) return true
    return false
  }
  return false
}

function findEnclosingBlockLike(node: ts.Node): ts.Node | null {
  let cur: ts.Node | undefined = node.parent
  while (cur) {
    if (
      ts.isBlock(cur) ||
      ts.isSourceFile(cur) ||
      ts.isModuleBlock(cur) ||
      ts.isCaseClause(cur) ||
      ts.isDefaultClause(cur)
    ) {
      return cur
    }
    if (ts.isArrowFunction(cur) && cur.body && !ts.isBlock(cur.body)) {
      return cur
    }
    cur = cur.parent
  }
  return null
}

function firstReferenceAfter(
  container: ts.Node,
  name: string,
  afterStart: number
): ts.Identifier | null {
  let result: ts.Identifier | null = null
  function walk(node: ts.Node): undefined {
    if (result) return
    if (
      ts.isIdentifier(node) &&
      node.text === name &&
      node.getStart() > afterStart &&
      !ts.isVariableDeclaration(node.parent)
    ) {
      result = node
      return
    }
    ts.forEachChild(node, walk)
    return
  }
  ts.forEachChild(container, walk)
  return result
}

function isParserArgument(reference: ts.Node): boolean {
  const unwrapped = unwrapTransparent(reference)
  const parent = unwrapped.parent
  if (!parent || !ts.isCallExpression(parent)) return false
  let isArg = false
  for (const arg of parent.arguments) {
    if (arg === unwrapped) {
      isArg = true
      break
    }
  }
  if (!isArg) return false
  return isApprovedParserCall(parent)
}

function computeIsParsed(boundaryNode: ts.Node): boolean {
  const effective = unwrapTransparent(boundaryNode)
  const parent = effective.parent
  if (!parent) return false

  if (ts.isCallExpression(parent)) {
    let isArg = false
    for (const arg of parent.arguments) {
      if (arg === effective) {
        isArg = true
        break
      }
    }
    if (isArg && isApprovedParserCall(parent)) return true
  }

  if (ts.isVariableDeclaration(parent) && parent.initializer === effective) {
    if (ts.isIdentifier(parent.name)) {
      const bindingName = parent.name.text
      const container = findEnclosingBlockLike(parent)
      if (!container) return false
      const ref = firstReferenceAfter(container, bindingName, boundaryNode.getStart())
      if (!ref) return false
      return isParserArgument(ref)
    }
    if (ts.isArrayBindingPattern(parent.name)) {
      const container = findEnclosingBlockLike(parent)
      if (!container) return false
      let sawCapture = false
      for (const element of parent.name.elements) {
        if (ts.isOmittedExpression(element)) continue
        if (element.dotDotDotToken !== undefined) continue
        if (!ts.isIdentifier(element.name)) return false
        sawCapture = true
        const bindingName = element.name.text
        const ref = firstReferenceAfter(container, bindingName, boundaryNode.getStart())
        if (!ref) return false
        if (!isParserArgument(ref)) return false
      }
      return sawCapture
    }
    return false
  }

  return false
}

function snippetOf(source: string, sf: ts.SourceFile, node: ts.Node): string {
  const { line } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
  const lines = source.split("\n")
  const raw = (lines[line] ?? "").trim()
  if (raw.length <= 120) return raw
  return `${raw.slice(0, 117)}...`
}

export function scanBoundaryReads(sf: ts.SourceFile): readonly BoundaryReadFinding[] {
  const source = sf.getFullText()
  const out: BoundaryReadFinding[] = []

  function visit(node: ts.Node): undefined {
    const match = detectBoundary(node)
    if (match) {
      if (!computeIsParsed(match.node)) {
        const { line, character } = ts.getLineAndCharacterOfPosition(sf, match.node.getStart(sf))
        out.push({
          file: sf.fileName,
          line: line + 1,
          column: character + 1,
          kind: match.kind,
          snippet: snippetOf(source, sf, match.node),
        })
      }
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sf, visit)
  return out
}
