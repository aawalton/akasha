import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { basename, dirname, resolve } from "node:path"
import ts from "typescript"
import type { Tree } from "../check-shape.ts"

const CONFIG = "tsconfig.json"

const TYPEGEN_ROOT = ".react-router/types"

const TYPEGEN_BIN = "node_modules/.bin/react-router"

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

export function bodiesOf(tree: Tree): (path: string) => string | undefined {
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

/**
 * The directory of every deployed app, taken from the one thing that says an app is one.
 *
 * An app declares the directory typegen writes into as a second root, so that `./+types/<route>`
 * resolves beside the route it belongs to. That declaration is the whole signal: no list of apps
 * is kept here, and an app added, moved or retired is followed by the `tsconfig.json` it must
 * carry either way.
 */
export function appsIn(tree: Tree, read: (path: string) => string | undefined): readonly string[] {
  const found: string[] = []
  for (const path of tree.paths()) {
    if (basename(path) !== CONFIG) continue
    const said = ts.readConfigFile(path, read)
    if (said.error !== undefined || said.config === undefined) continue
    const held = (said.config as { readonly compilerOptions?: { readonly rootDirs?: unknown } }).compilerOptions
    const roots = held?.rootDirs
    if (!Array.isArray(roots)) continue
    if (!roots.some((one) => typeof one === "string" && one.endsWith(TYPEGEN_ROOT))) continue
    found.push(dirname(path))
  }
  return found
}

/**
 * A DEPLOYED APP RUNS TYPEGEN BEFORE THE COMPILER, so this check writes before it judges.
 *
 * `./+types/<route>` names a module `react-router typegen` writes into `.react-router/types`,
 * which the app's `rootDirs` merges over the app's own directory. Nothing in this repository ran
 * typegen ahead of the compiler, so sixty-nine routes across six apps reported `TS2307` against a
 * module that was never missing — diagnostics with no defect behind them, which is what teaches a
 * reader to skip the class rather than read it.
 *
 * WHAT IS WRITTEN LANDS ONLY UNDER `.react-router`, which each app's own `.gitignore` excludes, so
 * it never enters `tree.paths()` and the tree being judged is untouched. That is the standing this
 * check already gives `node_modules`: build output reached on disk rather than through the tree.
 *
 * A run that fails writes nothing and is not reported. The compiler then finds no route types and
 * says so, which is the honest answer, and the one this repository gave before.
 */
export function typegenFor(root: string, under: string): void {
  const bin = resolve(root, TYPEGEN_BIN)
  if (!existsSync(bin)) return
  spawnSync(bin, ["typegen"], { cwd: under, stdio: "ignore" })
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
    // A CONFIG CLAIMING NO FILES OWNS NONE. Ownership runs by path, membership by `files`, so a
    // solution config at the repository root — references and `files: []`, no compiler options —
    // stood as the nearest ancestor of every file that had no project of its own. Those files were
    // judged under empty options rather than the default project: `.ts` import extensions refused,
    // and `strict` and the bun types never applied.
    if (parsed.fileNames.length === 0) continue
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

function directoriesIn(tree: Tree): ReadonlySet<string> {
  const held = new Set<string>()
  for (const path of tree.paths()) {
    let at = dirname(resolve(path))
    while (at !== "/" && at !== "." && !held.has(at)) {
      held.add(at)
      at = dirname(at)
    }
  }
  return held
}

function hostOver(
  tree: Tree,
  options: ts.CompilerOptions,
  read: (path: string) => string | undefined
): ts.CompilerHost {
  const base = ts.createCompilerHost(options, true)
  const there = thereOf(tree, read)
  let dirs: ReadonlySet<string> | null = null
  return {
    ...base,
    getCurrentDirectory: () => tree.root,
    fileExists: there,
    directoryExists: (path) => {
      const at = resolve(path)
      if (at.includes("/node_modules/")) return existsSync(at)
      if (dirs === null) dirs = directoriesIn(tree)
      return dirs.has(at) || existsSync(at)
    },
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

type Collector = { readonly gc: (force: boolean) => void }

/**
 * What the project just checked held, given back before the next one is built.
 *
 * A PROGRAM IS BUILT PER PROJECT AND DROPPED, AND THE RUNTIME COLLECTS NONE OF IT ON ITS OWN.
 * Each project parses the files and declaration files it claims into syntax trees of its own, and
 * over this repository's two hundred and sixty projects that is garbage nothing gathers while
 * memory is still there to take: resident size climbed past nine gigabytes without ever levelling,
 * and the workstation's memory reaper killed the run at forty seconds, before one project's
 * verdict had been printed. Collecting here holds the peak near a third of that and changes no
 * verdict, because what it gives back is a program already out of scope.
 *
 * ASKED FOR THROUGH `globalThis` rather than named outright, so a build whose settings do not
 * carry the runtime's own types still compiles, and a host that is not that runtime does nothing.
 */
export function giveBackTheProgram(): void {
  const held = (globalThis as { readonly Bun?: Collector }).Bun
  if (held === undefined) return
  held.gc(true)
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

export type Fault = {
  readonly path: string
  readonly reason: string
  readonly identity: string
}

/**
 * A DIAGNOSTIC IS ONE FINDING, HOWEVER MANY PROGRAMS SAW IT. A file seven projects reach is
 * parsed into seven programs, and each reports every fault it holds, so the fourteen faults in
 * `shared/design-system/src/index.ts` were put on the board ninety-eight times and every count
 * this check printed stood inflated by however widely the failing file was shared. What a
 * reader is handed is the path and the reason — the line, the code and the message — so a
 * second copy of that pair says nothing the first did not.
 *
 * THE COLUMN IS IN THE IDENTITY AND NOT IN WHAT IS PRINTED. Two faults on one line carrying the
 * same message print as one line either way, but dropping the second has this check
 * under-report where it used to over-report: five such pairs stand in this repository, among
 * them two `loaderData` references on one line of `page-detail.tsx`. The column tells them
 * apart, and a file every project reaches yields the same column in each, so holding it here
 * takes nothing back from what is collapsed.
 *
 * THE SAME IDENTITY IS WHAT TELLS AN OLD FAULT FROM A NEW ONE across two trees. It carries the
 * line, which is sound only because the files it is compared over are files the change did not
 * touch: their lines cannot have moved, so a fault standing at the same place with the same
 * message is the same fault.
 */
function faultOf(found: ts.Diagnostic): Fault | null {
  if (found.file === undefined || found.start === undefined) return null
  const path = resolve(found.file.fileName)
  const { line, character } = found.file.getLineAndCharacterOfPosition(found.start)
  const text = ts.flattenDiagnosticMessageText(found.messageText, " ")
  const reason = `line ${line + 1}: TS${found.code}: ${text}`
  return { path, reason, identity: `${path}\n${character}\n${reason}` }
}

export function faultsOver(
  tree: Tree,
  roots: readonly string[],
  read: (path: string) => string | undefined,
  each: (fault: Fault) => void
): void {
  const projects = projectsIn(tree, read)
  for (const [owner, held] of partition(roots, projects)) {
    if (owner !== null && owner.foreign !== null) continue
    const options = owner === null ? DEFAULT_OPTIONS : owner.options
    for (const found of diagnosticsOf(tree, rootsFor(owner, held), options, read)) {
      const fault = faultOf(found)
      if (fault !== null) each(fault)
    }
    giveBackTheProgram()
  }
}
