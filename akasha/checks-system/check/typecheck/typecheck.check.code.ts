import { readdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import ts from "typescript"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const TS = ".ts"

const AKASHA = "akasha"

const INSIDE = `${AKASHA}/`

const PACKAGES = "node_modules"

const PASSED = new Set([PACKAGES, "dist", "build"])

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

export const SETTINGS: ts.CompilerOptions = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
}

export type Found = {
  readonly path: string
  readonly reason: string
}

function walked(root: string, at: string, found: string[]): void {
  for (const entry of readdirSync(join(root, at), { withFileTypes: true })) {
    if (entry.name.startsWith(".") || PASSED.has(entry.name)) continue
    const path = `${at}/${entry.name}`
    if (entry.isDirectory()) walked(root, path, found)
    else if (entry.name.endsWith(TS)) found.push(path)
  }
}

export function everyIn(root: string): readonly string[] {
  const found: string[] = []
  walked(root, AKASHA, found)
  return found.sort()
}

export function rootsOf(leaving: Leaving): readonly string[] {
  const found = new Set(everyIn(leaving.root))
  for (const one of leaving.changed) {
    if (one.endsWith(TS) && one.startsWith(INSIDE)) found.add(one)
  }
  return [...found].filter((one) => leaving.at(one) !== null).sort()
}

export function insideOf(root: string, at: string): string | null {
  if (!at.endsWith(TS)) return null
  if (at.includes(`/${PACKAGES}/`)) return null
  if (!at.startsWith(`${root}/`)) return null
  const rel = at.slice(root.length + 1)
  return rel.startsWith(INSIDE) ? rel : null
}

export function bodiesOf(leaving: Leaving): (at: string) => string | undefined {
  const root = resolve(leaving.root)
  const held = new Map<string, string | undefined>()
  return (path) => {
    const at = resolve(path)
    const found = held.get(at)
    if (found !== undefined || held.has(at)) return found
    const rel = insideOf(root, at)
    const bytes = rel === null ? null : leaving.at(rel)
    let said: string | undefined
    if (rel === null) said = ts.sys.readFile(at)
    else if (bytes !== null) said = new TextDecoder().decode(bytes)
    held.set(at, said)
    return said
  }
}

function directoriesIn(root: string, every: readonly string[]): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of every) {
    let at = dirname(join(root, one))
    while (at !== "/" && !held.has(at)) {
      held.add(at)
      at = dirname(at)
    }
  }
  return held
}

export function hostOver(
  leaving: Leaving,
  read: (at: string) => string | undefined,
  every: readonly string[]
): ts.CompilerHost {
  const base = ts.createCompilerHost(SETTINGS, true)
  const root = resolve(leaving.root)
  const dirs = directoriesIn(root, every)
  return {
    ...base,
    getCurrentDirectory: () => root,
    fileExists: (path) =>
      insideOf(root, resolve(path)) === null ? ts.sys.fileExists(path) : read(path) !== undefined,
    directoryExists: (path) => dirs.has(resolve(path)) || ts.sys.directoryExists(path),
    readFile: read,
    getSourceFile: (path, language) => {
      if (insideOf(root, resolve(path)) === null) return base.getSourceFile(path, language)
      const body = read(path)
      return body === undefined ? undefined : ts.createSourceFile(path, body, language, true)
    },
  }
}

export function foundOf(root: string, said: ts.Diagnostic): Found {
  const text = ts.flattenDiagnosticMessageText(said.messageText, " ")
  if (said.file === undefined || said.start === undefined) {
    throw new Error(
      `the compiler said \`TS${said.code}: ${text}\`, which names no file it could be kept against`
    )
  }
  const { line } = said.file.getLineAndCharacterOfPosition(said.start)
  const at = insideOf(root, resolve(said.file.fileName))
  return {
    path: at ?? said.file.fileName,
    reason: `line ${line + 1}: TS${said.code}: ${text}`,
  }
}

export function foundIn(leaving: Leaving): readonly Found[] {
  const roots = rootsOf(leaving)
  if (roots.length === 0) return []
  const root = resolve(leaving.root)
  const read = bodiesOf(leaving)
  const program = ts.createProgram({
    rootNames: roots.map((one) => join(root, one)),
    options: SETTINGS,
    host: hostOver(leaving, read, roots),
  })
  const held = new Map<string, ts.SourceFile>()
  for (const file of program.getSourceFiles()) {
    const at = insideOf(root, resolve(file.fileName))
    if (at !== null) held.set(at, file)
  }
  const found: Found[] = []
  for (const one of roots) {
    const file = held.get(one)
    if (file === undefined) continue
    const said = [...program.getSyntacticDiagnostics(file), ...program.getSemanticDiagnostics(file)]
    for (const diagnostic of said) found.push(foundOf(root, diagnostic))
  }
  return found
}

export function typecheck(leaving: Leaving): readonly Judged[] {
  const changed = new Set(leaving.changed)
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of foundIn(leaving)) {
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    const reason = changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`
    said.push({ path: one.path, reason })
  }
  return said
}
