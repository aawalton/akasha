import { existsSync, readdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import {
  type Minting,
  mintingIn,
} from "akasha/check/code/pages/typecheck/modules/page-narrowing/page-narrowing.module.code.ts"
import { namingOf } from "akasha/check/code/pages/typecheck/modules/program-naming/program-naming.module.code.ts"
import {
  holdingOver,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textIn, textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { lua50Config } from "akasha/code/lua-runtime-library/properties/lua50-config.file-property.ts"
import { universalConfig } from "akasha/code/lua-runtime-library/properties/universal-config.file-property.ts"
import { specifiersIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import {
  compiled,
  directoriesIn,
  linkedOf,
  manifested,
  type Placing,
  placingOver,
  readingOf,
  servedOf,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { reachesIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { importers } from "akasha/graph/predicate/pages/importers/importers.graph-predicate.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { waitingKeys } from "akasha/page/index/modules/generated-properties/generated-properties.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { namedUnder } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { API } from "typescript-7/unstable/async"

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const TYPEGEN = "+types"

const GENERATED_AT = "/.react-router/"

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

function landingsIn(change: Change): readonly string[] {
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

export function reachedBy(change: Change, shadow: Shadow): readonly string[] {
  const seeds = [...change.changed, ...landingsIn(change)]
  const found = new Set(closureOf(importers, seeds, { index: shadow.index, through: compiled }))
  const gone = change.changed.filter((one) => compiled(one) && change.after(one) === null)
  if (gone.length === 0) return [...found].sort()
  for (const one of closureOf(importers, gone, { index: shadow.before(), through: compiled })) {
    found.add(one)
  }
  return [...found].sort()
}

export function reachesTypegen(path: string, text: string): boolean {
  return specifiersIn(path, text).some((one) => one.split("/").includes(TYPEGEN))
}

function generatedRoutes(path: string): boolean {
  return path.includes(GENERATED_AT)
}

export function rootsOf(change: Change, shadow: Shadow): readonly string[] {
  const found: string[] = []
  for (const one of reachedBy(change, shadow)) {
    const bytes = change.after(one)
    if (bytes === null) continue
    if (generatedRoutes(one)) continue
    if (reachesTypegen(one, textIn(bytes))) continue
    found.push(one)
  }
  return found
}

export function orphanedIn(change: Change, index: Answering): readonly string[] {
  const gone = change.changed.filter((one) => compiled(one) && change.after(one) === null)
  if (gone.length === 0) return []
  const held = closureOf(importers, gone, { index, through: compiled })
  return held.some((one) => change.after(one) !== null) ? [] : gone
}

function bodiesOf(
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

function existingOf(
  served: (name: string) => string | null | undefined
): (name: string) => boolean | undefined {
  return (name) => {
    const body = served(name)
    return body === undefined ? undefined : body !== null
  }
}

function realOver(root: string, placed: Placing): (path: string) => string | undefined {
  return (path) => {
    const one = resolve(path)
    const said = linkedOf(root, one, placed)
    return said === one ? undefined : said
  }
}

function foldersIn(
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

function foundOf(root: string, said: Diagnosed, placed: Placing): Found {
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

function librariesIn(change: Change, index: Answering): readonly string[] {
  const held = new Set(index.everyOfType(LIBRARY).map((one) => one.path))
  const under = new Set([LIBRARY])
  for (const one of change.changed) if (namedUnder(one, under) !== null) held.add(one)
  return [...held].filter((one) => change.after(one) !== null)
}

export function claimedIn(change: Change, index: Answering): (path: string) => boolean {
  const held: RegExp[] = []
  for (const listed of librariesIn(change, index)) {
    const folder = dirname(listed)
    for (const name of CONFIGS) {
      const bytes = change.after(join(folder, name))
      if (bytes === null) continue
      const said = JSON.parse(textIn(bytes)) as Configured
      for (const each of said.include ?? []) held.push(matching(join(folder, each)))
    }
  }
  return (path) => held.some((one) => one.test(path))
}

async function foundIn(given: Change, shadow: Shadow): Promise<readonly Found[]> {
  const change = holdingOver(given)
  const reached = rootsOf(change, shadow)
  const orphaned = orphanedIn(change, shadow.index)
  if (reached.length === 0 && orphaned.length === 0) return []
  const claimed = claimedIn(change, shadow.index)
  const roots = reached.filter((one) => !claimed(one))
  const root = resolve(change.root)
  const beside = shadow.index.manifestsBeside(shadow.index.fileKeysAt())
  const manifests = [...new Set([...beside, ...change.changed])]
  const placed = placingOver(manifests, (one) => textOf(change.after(one)))
  const { named, asked } = namingOf(change, shadow, roots, orphaned, claimed)
  if (asked.length === 0) return []
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
    const files = asked.map((one) => join(root, one))
    for (const said of await program.getSyntacticDiagnostics(files))
      found.push(foundOf(root, said, placed))
    for (const said of await program.getSemanticDiagnostics(files))
      found.push(foundOf(root, said, placed))
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
    if (generatedRoutes(one.path)) continue
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    const reason = changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`
    said.push({ path: one.path, reason })
  }
  return said
}
