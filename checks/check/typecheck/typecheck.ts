import { existsSync } from "node:fs"
import { basename, dirname, resolve } from "node:path"
import ts from "typescript"
import { carriesCode, outwardOf, specifiersIn, targetOf } from "../../imports/imports.ts"
import type { Check, CheckFailure, Tree } from "../check-shape.ts"

export const ABSENT = "no `typescript` with an API to drive is reachable — run `bun install` in this repository"

const CONFIG = "tsconfig.json"

export const TSC_KEYS: ReadonlySet<string> = new Set([
  "extends",
  "compilerOptions",
  "include",
  "exclude",
  "files",
  "references",
  "watchOptions",
  "typeAcquisition",
  "buildOptions",
  "compileOnSave",
])

export const DEFAULT_OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ESNext,
  lib: ["lib.esnext.d.ts"],
  allowImportingTsExtensions: true,
  skipLibCheck: true,
  types: ["bun"],
}

export function foreignKeyIn(held: Record<string, unknown>): string | null {
  for (const key of Object.keys(held)) {
    if (!TSC_KEYS.has(key)) return key
  }
  return null
}

export type Project = {
  readonly at: string
  readonly under: string
  readonly files: ReadonlySet<string>
  readonly options: ts.CompilerOptions
  readonly foreign: string | null
}

function bodiesOf(tree: Tree): (path: string) => string | undefined {
  const held = new Map<string, string | undefined>()
  return (path) => {
    const at = resolve(path)
    if (held.has(at)) return held.get(at)
    const body = tree.at(at)
    const said = body === null ? undefined : body.toString("utf8")
    held.set(at, said)
    return said
  }
}

function thereOf(tree: Tree, read: (path: string) => string | undefined): (path: string) => boolean {
  return (path) => {
    const at = resolve(path)
    if (at.includes("/node_modules/")) return existsSync(at)
    return read(at) !== undefined
  }
}

export function projectsIn(tree: Tree, read: (path: string) => string | undefined): readonly Project[] {
  const host: ts.ParseConfigFileHost = {
    ...ts.sys,
    readFile: read,
    fileExists: thereOf(tree, read),
    onUnRecoverableConfigFileDiagnostic: () => {},
  }
  const found: Project[] = []
  for (const path of tree.paths()) {
    if (basename(path) !== CONFIG) continue
    const said = ts.readConfigFile(path, read)
    if (said.error !== undefined || said.config === undefined) continue
    const parsed = ts.getParsedCommandLineOfConfigFile(path, {}, host)
    if (parsed === undefined) continue
    found.push({
      at: path,
      under: dirname(path),
      files: new Set(parsed.fileNames.map((one) => resolve(one))),
      options: parsed.options,
      foreign: foreignKeyIn(said.config as Record<string, unknown>),
    })
  }
  return found
}

export function ownerOf(path: string, projects: readonly Project[]): Project | null {
  let held: Project | null = null
  for (const one of projects) {
    if (!path.startsWith(`${one.under}/`)) continue
    if (held === null || one.under.length > held.under.length) held = one
  }
  return held
}

export function partition(
  subjects: readonly string[],
  projects: readonly Project[]
): ReadonlyMap<Project | null, readonly string[]> {
  const held = new Map<Project | null, string[]>()
  for (const path of subjects) {
    const owner = ownerOf(path, projects)
    held.set(owner, [...(held.get(owner) ?? []), path])
  }
  return held
}

function reaching(tree: Tree, seeds: ReadonlySet<string>): ReadonlySet<string> {
  const importedBy = new Map<string, string[]>()
  for (const path of tree.paths()) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      const target = targetOf(tree.root, path, specifier)
      if (target === null) continue
      importedBy.set(target, [...(importedBy.get(target) ?? []), path])
    }
  }
  const reached = new Set(seeds)
  const pending = [...seeds]
  while (pending.length > 0) {
    const one = pending.pop() as string
    for (const importer of importedBy.get(one) ?? []) {
      if (reached.has(importer)) continue
      reached.add(importer)
      pending.push(importer)
    }
  }
  return reached
}

function strandedBy(tree: Tree): readonly string[] {
  const gone = new Set(tree.gone().filter((one) => one.endsWith(".ts")).map((one) => resolve(one)))
  if (gone.size === 0) return []
  return [...reaching(tree, gone)].filter((one) => !gone.has(one))
}

function reachingOut(tree: Tree, paths: Iterable<string>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const path of paths) {
    if (!carriesCode(path)) continue
    const body = tree.at(path)
    if (body === null) continue
    for (const specifier of specifiersIn(body.toString("utf8"))) {
      if (outwardOf(tree.root, path, specifier) === null) continue
      found.add(path)
      break
    }
  }
  return found
}

function hostOver(
  tree: Tree,
  options: ts.CompilerOptions,
  read: (path: string) => string | undefined
): ts.CompilerHost {
  const base = ts.createCompilerHost(options, true)
  const there = thereOf(tree, read)
  return {
    ...base,
    getCurrentDirectory: () => tree.root,
    fileExists: there,
    readFile: read,
    getSourceFile: (path, language) => {
      if (path.includes("/node_modules/") || path.includes("/typescript/lib/")) {
        return base.getSourceFile(path, language)
      }
      const body = read(path)
      return body === undefined ? undefined : ts.createSourceFile(path, body, language, true)
    },
  }
}

function ambientIn(project: Project): readonly string[] {
  return [...project.files].filter((one) => one.endsWith(".d.ts"))
}

export function rootsFor(owner: Project | null, held: readonly string[]): readonly string[] {
  if (owner === null) return held
  const claimed = held.filter((one) => owner.files.has(one))
  if (claimed.length === 0) return []
  return [...new Set([...claimed, ...ambientIn(owner)])]
}

function diagnosticsOf(
  tree: Tree,
  rootNames: readonly string[],
  options: ts.CompilerOptions,
  read: (path: string) => string | undefined
): readonly ts.Diagnostic[] {
  if (rootNames.length === 0) return []
  const program = ts.createProgram({
    rootNames: [...rootNames],
    options: { ...options, noEmit: true, incremental: false, composite: false },
    host: hostOver(tree, options, read),
  })
  return [...program.getSemanticDiagnostics(), ...program.getSyntacticDiagnostics()]
}

export const typecheck: Check = {
  slug: "typecheck",
  needs: "tree",
  run: ({ paths, tree }) => {
    const named = paths.filter((one) => one.endsWith(".ts")).map((one) => resolve(one))
    const subjects = [...new Set([...named, ...strandedBy(tree)])]
    if (subjects.length === 0) return []
    if (typeof ts.createProgram !== "function") return [{ path: tree.root, reason: ABSENT }]

    const read = bodiesOf(tree)
    const projects = projectsIn(tree, read)
    const scope = reaching(tree, new Set(subjects))
    const outward = reachingOut(tree, scope)

    const failures: CheckFailure[] = []
    for (const [owner, held] of partition(subjects, projects)) {
      if (owner !== null && owner.foreign !== null) continue
      const options = owner === null ? DEFAULT_OPTIONS : owner.options
      const rootNames = rootsFor(owner, held)
      for (const found of diagnosticsOf(tree, rootNames, options, read)) {
        if (found.file === undefined || found.start === undefined) continue
        const path = resolve(found.file.fileName)
        if (!scope.has(path) || outward.has(path)) continue
        const { line } = found.file.getLineAndCharacterOfPosition(found.start)
        const text = ts.flattenDiagnosticMessageText(found.messageText, " ")
        failures.push({ path, reason: `line ${line + 1}: TS${found.code}: ${text}` })
      }
    }
    return failures
  },
}

export default typecheck
