import type ts from "typescript"
import type { ForbiddenFinding } from "./forbidden-types"

export const NEW_BUILTINS: ReadonlySet<string> = new Set([
  "Error",
  "TypeError",
  "RangeError",
  "SyntaxError",
  "ReferenceError",
  "EvalError",
  "URIError",
  "RegExp",
  "Date",
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  "Array",
  "Object",
  "Promise",
  "URL",
  "URLSearchParams",
])

export const THROW_ERROR_CTORS: ReadonlySet<string> = new Set([
  "Error",
  "TypeError",
  "RangeError",
  "SyntaxError",
  "ReferenceError",
  "EvalError",
  "URIError",
])

export const DIRECT_IO_MODULES: ReadonlySet<string> = new Set([
  "pg",
  "@supabase/supabase-js",
  "node:fs",
  "node:fs/promises",
  "node:net",
  "node:http",
  "node:https",
  "node:dgram",
])

export type Ctx = {
  sf: ts.SourceFile
  file: string
  allowed: ReadonlySet<string>
  emit: (finding: ForbiddenFinding) => undefined
}

export function pushFinding(node: ts.Node, kind: string, message: string, ctx: Ctx): undefined {
  const { line, character } = ctx.sf.getLineAndCharacterOfPosition(node.getStart(ctx.sf))
  ctx.emit({
    file: ctx.file,
    line: line + 1,
    column: character + 1,
    kind,
    message,
  })
}
