import type * as ts from "typescript"
import type { TransformationContext } from "../context-transformation-context/context-transformation-context.module.code.ts"
import {
  type CompilerOptions,
  LuaTarget,
} from "../tstl-compiler-options/tstl-compiler-options.module.code.ts"
import { invalidAmbientIdentifierName } from "../tstl-diagnostics/tstl-diagnostics.module.code.ts"
import { isSymbolExported } from "../tstl-export/tstl-export.module.code.ts"
import { isAmbientNode } from "../tstl-typescript/tstl-typescript.module.code.ts"

export const shouldAllowUnicode = (options: CompilerOptions) =>
  options.luaTarget === LuaTarget.LuaJIT

export const isValidLuaIdentifier = (name: string, options: CompilerOptions) =>
  !luaKeywords.has(name) &&
  (shouldAllowUnicode(options)
    ? /^[a-zA-Z_\u007F-\uFFFD][a-zA-Z0-9_\u007F-\uFFFD]*$/
    : /^[a-zA-Z_][a-zA-Z0-9_]*$/
  ).test(name)

export const luaKeywords: ReadonlySet<string> = new Set([
  "and",
  "bit",
  "bit32",
  "break",
  "do",
  "else",
  "elseif",
  "end",
  "false",
  "for",
  "function",
  "goto",
  "if",
  "in",
  "local",
  "nil",
  "not",
  "or",
  "repeat",
  "return",
  "then",
  "true",
  "until",
  "while",
])

const luaBuiltins: ReadonlySet<string> = new Set([
  "_G",
  "assert",
  "coroutine",
  "debug",
  "error",
  "ipairs",
  "math",
  "pairs",
  "pcall",
  "print",
  "rawget",
  "repeat",
  "require",
  "self",
  "string",
  "table",
  "tostring",
  "type",
  "unpack",
])

export const isUnsafeName = (name: string, options: CompilerOptions) =>
  !isValidLuaIdentifier(name, options) || luaBuiltins.has(name)

function checkName(context: TransformationContext, name: string, node: ts.Node): boolean {
  const isInvalid = !isValidLuaIdentifier(name, context.options)

  if (isInvalid) {
    if (name !== "") {
      context.addDiagnostic(invalidAmbientIdentifierName(node, name))
    }
  }

  return isInvalid
}

export function hasUnsafeSymbolName(
  context: TransformationContext,
  symbol: ts.Symbol,
  tsOriginal: ts.Identifier
): boolean {
  const isAmbient = symbol.declarations?.some((d) => isAmbientNode(d)) ?? false

  if (isAmbient && checkName(context, symbol.name, tsOriginal)) {
    return true
  }

  return (
    isUnsafeName(symbol.name, context.options) && !isAmbient && !isSymbolExported(context, symbol)
  )
}

export function hasUnsafeIdentifierName(
  context: TransformationContext,
  identifier: ts.Identifier,
  symbol: ts.Symbol | undefined
): boolean {
  if (symbol) {
    return hasUnsafeSymbolName(context, symbol, identifier)
  }

  return checkName(context, identifier.text, identifier)
}

const fixInvalidLuaIdentifier = (name: string) =>
  name.replace(/[^a-zA-Z0-9_]/g, (c) => `_${c.charCodeAt(0).toString(16).toUpperCase()}`)

export const createSafeName = (name: string) => "____" + fixInvalidLuaIdentifier(name)
