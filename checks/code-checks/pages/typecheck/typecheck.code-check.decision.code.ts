import { existsSync, readdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { textIn, textOf } from "@akasha/code/body-text"
import { parsedAs } from "@akasha/code/code-source"
import { specifiersIn } from "@akasha/code/code-specifier"
import {
  compiled,
  directoriesIn,
  linkedOf,
  manifested,
  type Placing,
  placingOver,
  readingOf,
  servedOf,
} from "@akasha/code/code-typing"
import { lua50Config } from "@akasha/code/lua-runtime-library/lua50-config"
import { universalConfig } from "@akasha/code/lua-runtime-library/universal-config"
import { reachesIn } from "@akasha/code/package-manifest"
import type { Answering } from "@akasha/indexes/answering"
import { waitingKeys } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages/change"
import { pageNamed } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import { reachingInto } from "akasha/graph/asking/graph-asking.module.code.ts"
import { importEdge } from "akasha/graph/edges/pages/import-edge.graph-edge.ts"
import ts from "typescript"
import { API } from "typescript-7/unstable/async"
import { textNamed } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const IMPORT = importEdge.slug

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const OMIT = "Omit"

const TYPEGEN = "+types"

const DECLARED = ".d.ts"

const LIBRARY = "lua-runtime-library"

const CONFIGS = [universalConfig.fileName, lua50Config.fileName]

const CONFIG_NAME = "tsconfig.typecheck.json"

const PACKAGES_AT = "node_modules"

const TYPES_IN = "@types"

const MANIFEST_NAME = "package.json"

const FIRST_LINE = 1

const SETTINGS = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: "preserve",
  moduleResolution: "bundler",
  target: "esnext",
  skipLibCheck: false,
  jsx: "react-jsx",
} as const

export type Found = {
  readonly path: string
  readonly reason: string
}

export function builtFrom(path: string): boolean {
  return textNamed(path) || manifested(path)
}

export function landingsIn(change: Change): readonly string[] {
  const found = new Set<string>()
  for (const at of change.changed) {
    if (!manifested(at)) continue
    const folder = dirname(at)
    for (const bytes of [change.before(at), change.after(at)]) {
      if (bytes === null) continue
      for (const [, path] of reachesIn(folder, textIn(bytes))) found.add(path)
    }
  }
  const held = [...found].filter((one) => change.before(one) !== null || change.after(one) !== null)
  return held.sort()
}

export function reachedBy(change: Change, index: Answering): readonly string[] {
  const seeds = [...change.changed, ...landingsIn(change)]
  return reachingInto(seeds, [IMPORT], index, compiled)
}

export function reachesTypegen(path: string, text: string): boolean {
  return specifiersIn(path, text).some((one) => one.split("/").includes(TYPEGEN))
}

export function rootsOf(change: Change, index: Answering): readonly string[] {
  const found: string[] = []
  for (const one of reachedBy(change, index)) {
    const bytes = change.after(one)
    if (bytes === null) continue
    if (reachesTypegen(one, textIn(bytes))) continue
    found.push(one)
  }
  return found
}

export function declaringIn(change: Change, index: Answering): readonly string[] {
  const held = index.everyPath()
  return held.filter((one) => compiled(one) && one.endsWith(DECLARED) && change.after(one) !== null)
}

export type Minting = (path: string, text: string) => string

export function omittingIn(path: string, text: string, keys: readonly string[]): string | null {
  if (keys.length === 0) return null
  const held = keys.map((one) => JSON.stringify(one)).join(" | ")
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const said = declared.initializer
      if (said === undefined || !ts.isSatisfiesExpression(said)) continue
      const at = said.type.getStart(source)
      const to = said.type.getEnd()
      return `${text.slice(0, at)}${OMIT}<${text.slice(at, to)}, ${held}>${text.slice(to)}`
    }
  }
  return null
}

export function mintingIn(change: Change, keys: readonly string[], index: Answering): Minting {
  const pageTypes = keys.length === 0 ? null : index.pageTypesIn()
  return (path, text) => {
    if (pageTypes === null || !pageNamed(path, pageTypes)) return text
    if (change.before(path) !== null) return text
    return omittingIn(path, text, keys) ?? text
  }
}

export function bodiesOf(
  change: Change,
  minting: Minting,
  placed: Placing
): (at: string) => string | undefined {
  const root = resolve(change.root)
  const held = new Map<string, string | undefined>()
  const base = readingOf(
    root,
    (rel) => {
      const bytes = change.after(rel)
      return bytes === null ? null : minting(rel, textIn(bytes))
    },
    placed
  )
  return (path) => {
    const at = linkedOf(root, resolve(path), placed)
    if (held.has(at)) return held.get(at)
    const said = base(at)
    held.set(at, said)
    return said
  }
}

export function typesIn(root: string): readonly string[] {
  const at = join(root, PACKAGES_AT, TYPES_IN)
  return existsSync(at) ? readdirSync(at).sort() : []
}

export function configOf(root: string, named: readonly string[]): string {
  return JSON.stringify({ compilerOptions: { ...SETTINGS, types: typesIn(root) }, files: named })
}

export function servingOf(
  root: string,
  at: string,
  config: string,
  read: (path: string) => string | undefined,
  placed: Placing
): (name: string) => string | null | undefined {
  return (name) => {
    if (name === at) return config
    if (servedOf(root, resolve(name), placed) === null) return undefined
    const body = read(name)
    return body === undefined ? null : body
  }
}

export function existingOf(
  served: (name: string) => string | null | undefined
): (name: string) => boolean | undefined {
  return (name) => {
    const body = served(name)
    return body === undefined ? undefined : body !== null
  }
}

export function realOver(root: string, placed: Placing): (path: string) => string | undefined {
  return (path) => {
    const one = resolve(path)
    const said = linkedOf(root, one, placed)
    return said === one ? undefined : said
  }
}

export function foldersIn(
  root: string,
  named: readonly string[],
  placed: Placing
): (name: string) => boolean | undefined {
  const linked = [...placed.keys()].map((one) => join(PACKAGES_AT, one, MANIFEST_NAME))
  const held = directoriesIn(root, [...named, ...linked])
  return (name) => (held.has(resolve(name)) ? true : undefined)
}

type Diagnosed = {
  readonly fileName?: string
  readonly code: number
  readonly text: string
  readonly startPosition?: { readonly line: number }
}

export function foundOf(root: string, said: Diagnosed, placed: Placing): Found {
  const at = said.fileName === undefined ? null : servedOf(root, resolve(said.fileName), placed)
  const line = (said.startPosition?.line ?? 0) + FIRST_LINE
  return {
    path: at ?? said.fileName ?? "",
    reason: `line ${line}: TS${said.code}: ${said.text}`,
  }
}

type Configured = {
  readonly include?: readonly string[]
}

export function matching(one: string): RegExp {
  const held = one.replace(/[.+^${}()|[\]\\]/g, "\\$&")
  const said = held.replace(/\*\*\/|\*/g, (each) => (each === "*" ? "[^/]*" : "(?:.*/)?"))
  return new RegExp(`^${said}$`)
}

export function claimedIn(change: Change, index: Answering): (path: string) => boolean {
  const held: RegExp[] = []
  for (const listed of index.everyOfType(LIBRARY)) {
    const folder = dirname(listed.path)
    for (const name of CONFIGS) {
      const bytes = change.after(join(folder, name))
      if (bytes === null) continue
      const said = JSON.parse(textIn(bytes)) as Configured
      for (const each of said.include ?? []) held.push(matching(join(folder, each)))
    }
  }
  return (path) => held.some((one) => one.test(path))
}

export async function foundIn(change: Change, shadow: Shadow): Promise<readonly Found[]> {
  const reached = rootsOf(change, shadow.index)
  if (reached.length === 0) return []
  const claimed = claimedIn(change, shadow.index)
  const roots = reached.filter((one) => !claimed(one))
  if (roots.length === 0) return []
  const root = resolve(change.root)
  const every = [...new Set([...shadow.index.everyPath(), ...change.changed])]
  const placed = placingOver(every, (one) => textOf(change.after(one)))
  const declared = declaringIn(change, shadow.index).filter((one) => !claimed(one))
  const named = [...new Set([...roots, ...declared])]
  const read = bodiesOf(change, mintingIn(change, [...waitingKeys(shadow)], shadow.index), placed)
  const at = join(root, CONFIG_NAME)
  const config = configOf(root, named)
  const readFile = servingOf(root, at, config, read, placed)
  const api = new API({
    cwd: root,
    fs: {
      readFile,
      fileExists: existingOf(readFile),
      directoryExists: foldersIn(root, named, placed),
      realpath: realOver(root, placed),
    },
  })
  try {
    const snapshot = await api.updateSnapshot({ openProjects: [at] })
    const project = await snapshot.getProject(at)
    if (project === undefined) throw new Error(`${CONFIG_NAME} named nothing a check could read`)
    const found: Found[] = []
    const program = await project.program
    for (const one of roots) {
      const file = join(root, one)
      for (const said of await program.getSyntacticDiagnostics(file))
        found.push(foundOf(root, said, placed))
      for (const said of await program.getSemanticDiagnostics(file))
        found.push(foundOf(root, said, placed))
    }
    return found
  } finally {
    await api.close()
  }
}

export async function refusalsOver(change: Change, shadow: Shadow): Promise<readonly Judged[]> {
  const changed = new Set(change.changed)
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of await foundIn(change, shadow)) {
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    const reason = changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`
    said.push({ path: one.path, reason })
  }
  return said
}
