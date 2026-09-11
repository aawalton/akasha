import { realpathSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { typeScripted } from "akasha/code/file-kind/file-kind.module.code.ts"
import { stamped, writtenTo } from "akasha/code/typing-keeping/typing-keeping.module.code.ts"
import { calledIn } from "akasha/code-system/package-manifest/package-manifest.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"
import ts from "typescript"

const PACKAGES = "node_modules"

const MANIFEST = "package.json"

export const SETTINGS: ts.CompilerOptions = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  skipLibCheck: true,
  jsx: ts.JsxEmit.ReactJSX,
}

export type Reading = (at: string) => string | undefined

export type Typing = {
  readonly program: ts.Program
  readonly checker: ts.TypeChecker
  readonly sourceAt: (path: string) => ts.SourceFile | null
}

export function typed(path: string): boolean {
  return typeScripted(path)
}

function packaged(rel: string): boolean {
  return rel === PACKAGES || rel.startsWith(`${PACKAGES}/`) || rel.includes(`/${PACKAGES}/`)
}

export function compiled(path: string): boolean {
  return typed(path) && !packaged(path)
}

export function manifested(path: string): boolean {
  return path === MANIFEST || path.endsWith(`/${MANIFEST}`)
}

export function insideOf(root: string, at: string): string | null {
  if (!typed(at)) return null
  if (at.includes(`/${PACKAGES}/`)) return null
  if (!at.startsWith(`${root}/`)) return null
  return at.slice(root.length + 1)
}

export type Bodies = (path: string) => string | null

export type Placing = ReadonlyMap<string, string>

export const NOWHERE: Placing = new Map()

export function placingOver(every: readonly string[], textOf: Bodies): Placing {
  const found = new Map<string, string>()
  for (const one of every.filter(manifested)) {
    const named = calledIn(textOf(one))
    if (named !== null) found.set(named, dirname(one))
  }
  return found
}

const LINKED = new Map<string, string>()

function realOf(at: string): string {
  const found = LINKED.get(at)
  if (found !== undefined) return found
  let real = at
  try {
    real = realpathSync(at)
  } catch {
    real = at
  }
  LINKED.set(at, real)
  return real
}

export function linkedOf(root: string, at: string, placed: Placing): string {
  const mark = `${root}/${PACKAGES}/`
  if (!at.startsWith(mark)) return at
  for (let to = at.indexOf("/", mark.length); to > 0; to = at.indexOf("/", to + 1)) {
    const head = at.slice(0, to)
    const folder = placed.get(head.slice(mark.length))
    if (folder !== undefined) return join(root, folder, at.slice(to))
    const real = realOf(head)
    if (real !== head) return `${real}${at.slice(to)}`
  }
  const whole = placed.get(at.slice(mark.length))
  return whole === undefined ? at : join(root, whole)
}

export function manifestOf(root: string, at: string, placed: Placing): string | null {
  if (!manifested(at)) return null
  const real = linkedOf(root, at, placed)
  if (!real.startsWith(`${root}/`)) return null
  const rel = real.slice(root.length + 1)
  return packaged(rel) ? null : rel
}

export function servedOf(root: string, at: string, placed: Placing): string | null {
  const real = linkedOf(root, at, placed)
  return insideOf(root, real) ?? manifestOf(root, real, placed)
}

export function directoriesIn(root: string, every: readonly string[]): ReadonlySet<string> {
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

function hostOver(
  root: string,
  read: Reading,
  every: readonly string[],
  placed: Placing
): ts.CompilerHost {
  const base = ts.createCompilerHost(SETTINGS, true)
  const dirs = directoriesIn(root, every)
  return {
    ...base,
    getCurrentDirectory: () => root,
    realpath: (path) => {
      const one = resolve(path)
      const said = linkedOf(root, one, placed)
      return said === one ? resolve(base.realpath?.(one) ?? one) : said
    },
    fileExists: (path) =>
      servedOf(root, resolve(path), placed) === null
        ? ts.sys.fileExists(path)
        : read(path) !== undefined,
    directoryExists: (path) => dirs.has(resolve(path)) || ts.sys.directoryExists(path),
    readFile: read,
    writeFile: writtenTo,
    createHash: sha256Hex,
    getSourceFile: (path, language) => {
      if (insideOf(root, resolve(path)) === null) return stamped(base.getSourceFile(path, language))
      const body = read(path)
      return body === undefined
        ? undefined
        : stamped(ts.createSourceFile(path, body, language, true))
    },
  }
}

export function readingOf(root: string, textOf: Bodies, placed: Placing): Reading {
  return (at) => {
    const full = linkedOf(root, resolve(at), placed)
    const rel = insideOf(root, full)
    if (rel !== null) return textOf(rel) ?? undefined
    const named = manifestOf(root, full, placed)
    return (named === null ? null : textOf(named)) ?? ts.sys.readFile(at)
  }
}

export function typingOver(
  root: string,
  roots: readonly string[],
  read: Reading,
  placed: Placing
): Typing {
  const program = ts.createProgram({
    rootNames: roots.map((one) => join(root, one)),
    options: SETTINGS,
    host: hostOver(root, read, roots, placed),
  })
  return {
    program,
    checker: program.getTypeChecker(),
    sourceAt: (path) => program.getSourceFile(join(root, path)) ?? null,
  }
}
