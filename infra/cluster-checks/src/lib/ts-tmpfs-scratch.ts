import ts from "typescript"

const TMPFS_ROOT = /(?:^|[\s:="'`>(])\/tmp(?:\/|\s|$)/

const BARE_MKTEMP = /\bmktemp\b/
const MKTEMP_REDIRECTED = /(?:-p|--tmpdir=?)\s*\/var\/tmp/

const namesTmpfsRoot = (text: string): boolean =>
  TMPFS_ROOT.test(text) || (BARE_MKTEMP.test(text) && !MKTEMP_REDIRECTED.test(text))

const CREATORS: ReadonlySet<string> = new Set([
  "mkdtemp",
  "mkdtempSync",
  "mkdtempDisposableSync",
  "mkdir",
  "mkdirSync",
  "writeFile",
  "writeFileSync",
  "appendFile",
  "appendFileSync",
  "cp",
  "cpSync",
  "copyFile",
  "copyFileSync",
  "createWriteStream",
  "symlink",
  "symlinkSync",
  "link",
  "linkSync",
  "rename",
  "renameSync",
  "spawn",
  "spawnSync",
  "exec",
  "execSync",
  "execFile",
  "execFileSync",
])

const QUALIFIED_CREATORS: ReadonlySet<string> = new Set(["Bun.write"])

const OPENERS: ReadonlySet<string> = new Set(["open", "openSync"])
const WRITE_FLAG = /^[wa]/

const SHELL_TAGS: ReadonlySet<string> = new Set(["$", "Bun.$"])

export interface TmpfsScratchSite {
  readonly line: number
  readonly call: string
  readonly text: string
}

export function spellsTmpfsRoot(source: string): boolean {
  return (
    source.includes("/tmp") ||
    /\btmpdir\s*\(/.test(source) ||
    source.includes("TMPDIR") ||
    BARE_MKTEMP.test(source)
  )
}

function calleeNames(expr: ts.Node): { readonly name: string; readonly qualified: string } {
  if (ts.isIdentifier(expr)) return { name: expr.text, qualified: expr.text }
  if (ts.isPropertyAccessExpression(expr)) {
    const name = expr.name.text
    const obj = ts.isIdentifier(expr.expression) ? expr.expression.text : ""
    return { name, qualified: obj === "" ? name : `${obj}.${name}` }
  }
  return { name: "", qualified: "" }
}

const TRANSPARENT = (n: ts.Node): n is ts.ParenthesizedExpression | ts.AsExpression =>
  ts.isParenthesizedExpression(n) || ts.isAsExpression(n) || ts.isNonNullExpression(n)

function makeResolver(tainted: ReadonlySet<string>): (n: ts.Node) => boolean {
  const isTmpfs = (n: ts.Node): boolean => {
    if (TRANSPARENT(n)) return isTmpfs(n.expression)
    if (ts.isAwaitExpression(n)) return isTmpfs(n.expression)
    if (ts.isStringLiteralLike(n)) return namesTmpfsRoot(n.text)
    if (ts.isTemplateExpression(n))
      return (
        namesTmpfsRoot(n.head.text) ||
        n.templateSpans.some((s) => namesTmpfsRoot(s.literal.text) || isTmpfs(s.expression))
      )
    if (ts.isIdentifier(n)) return tainted.has(n.text)
    if (ts.isCallExpression(n)) {
      if (calleeNames(n.expression).name === "tmpdir") return true
      return n.arguments.some(isTmpfs)
    }
    if (ts.isBinaryExpression(n) && n.operatorToken.kind === ts.SyntaxKind.PlusToken)
      return isTmpfs(n.left) || isTmpfs(n.right)
    if (ts.isPropertyAccessExpression(n))
      return n.name.text === "TMPDIR" || n.name.text === "BUN_TMPDIR"
    if (ts.isElementAccessExpression(n))
      return (
        n.argumentExpression !== undefined &&
        ts.isStringLiteralLike(n.argumentExpression) &&
        n.argumentExpression.text.endsWith("TMPDIR")
      )
    return false
  }
  return isTmpfs
}

function taintedBindings(sf: ts.SourceFile): ReadonlySet<string> {
  const tainted = new Set<string>()
  for (let pass = 0; pass < MAX_TAINT_PASSES; pass++) {
    const isTmpfs = makeResolver(tainted)
    let grew = false
    const visit = (n: ts.Node): undefined => {
      if (
        ts.isVariableDeclaration(n) &&
        ts.isIdentifier(n.name) &&
        n.initializer !== undefined &&
        !tainted.has(n.name.text) &&
        isTmpfs(n.initializer)
      ) {
        tainted.add(n.name.text)
        grew = true
      }
      ts.forEachChild(n, visit)
    }
    visit(sf)
    if (!grew) break
  }
  return tainted
}

const MAX_TAINT_PASSES = 8
const SITE_TEXT_LIMIT = 120

function isCreatingCall(
  node: ts.CallExpression,
  names: { name: string; qualified: string }
): boolean {
  if (OPENERS.has(names.name)) {
    const flag = node.arguments[1]
    return flag !== undefined && ts.isStringLiteralLike(flag) && WRITE_FLAG.test(flag.text)
  }
  return CREATORS.has(names.name) || QUALIFIED_CREATORS.has(names.qualified)
}

export function scanTmpfsScratch(sourceFile: ts.SourceFile): readonly TmpfsScratchSite[] {
  const isTmpfs = makeResolver(taintedBindings(sourceFile))
  const sites: TmpfsScratchSite[] = []

  const record = (node: ts.Node, call: string): undefined => {
    sites.push({
      line: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
      call,
      text: node.getText(sourceFile).replace(/\s+/g, " ").slice(0, SITE_TEXT_LIMIT),
    })
  }

  const visit = (n: ts.Node): undefined => {
    if (ts.isCallExpression(n)) {
      const names = calleeNames(n.expression)
      if (isCreatingCall(n, names) && n.arguments.some(isTmpfs))
        record(n, names.qualified === "" ? names.name : names.qualified)
    } else if (ts.isTaggedTemplateExpression(n)) {
      const names = calleeNames(n.tag)
      if (SHELL_TAGS.has(names.qualified) && isTmpfs(n.template)) record(n, names.qualified)
    }
    ts.forEachChild(n, visit)
  }
  visit(sourceFile)
  return sites
}
