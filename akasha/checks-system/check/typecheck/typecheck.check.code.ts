import ts from "typescript"
import type { Judged } from "../../../checks-system/judging.module.code.ts"
import type { Whole } from "../../checking.module.code.ts"
import { textIn } from "../../checking.module.code.ts"

const TS = ".ts"

export const OPTIONS: ts.CompilerOptions = {
  strict: true,
  noUncheckedIndexedAccess: true,
  noEmit: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  lib: ["lib.esnext.d.ts"],
  allowImportingTsExtensions: true,
  skipLibCheck: true,
  isolatedModules: true,
  resolveJsonModule: true,
  types: ["bun"],
}

function hostOver(whole: Whole, held: ReadonlyMap<string, string>): ts.CompilerHost {
  const under = (path: string): boolean => path.startsWith(`${whole.root}/`)
  const host = ts.createCompilerHost(OPTIONS, true)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  host.readFile = (path) => (under(path) ? held.get(path) : readFile(path))
  host.fileExists = (path) => (under(path) ? held.has(path) : fileExists(path))
  host.getSourceFile = (path, languageVersion) => {
    const text = under(path) ? held.get(path) : readFile(path)
    if (text === undefined) return undefined
    return ts.createSourceFile(path, text, languageVersion, true, ts.ScriptKind.TS)
  }
  return host
}

function whereOf(one: ts.Diagnostic, root: string): string {
  return one.file === undefined ? root : one.file.fileName
}

function reasonOf(one: ts.Diagnostic): string {
  const said = ts.flattenDiagnosticMessageText(one.messageText, " ")
  if (one.file === undefined || one.start === undefined) return `TS${one.code}: ${said}`
  const at = one.file.getLineAndCharacterOfPosition(one.start)
  return `line ${at.line + 1}: TS${one.code}: ${said}`
}

export function typecheck(given: Whole): readonly Judged[] {
  const held = new Map<string, string>()
  for (const path of given.paths) {
    if (!path.endsWith(TS)) continue
    const text = textIn(given, path)
    if (text !== null) held.set(path, text)
  }
  const roots = [...held.keys()].sort()
  if (roots.length === 0) return []
  const program = ts.createProgram(roots, OPTIONS, hostOver(given, held))
  const said: Judged[] = []
  for (const one of ts.getPreEmitDiagnostics(program)) {
    const where = whereOf(one, given.root)
    if (where !== given.root && !where.startsWith(`${given.root}/`)) continue
    said.push({ path: where, reason: reasonOf(one) })
  }
  return said
}
