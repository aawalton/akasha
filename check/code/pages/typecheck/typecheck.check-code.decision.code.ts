import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import {
  type Reach,
  type Split,
  splitOver,
} from "akasha/check/code/pages/typecheck/modules/browser-reach/browser-reach.module.code.ts"
import {
  type Minting,
  mintingIn,
} from "akasha/check/code/pages/typecheck/modules/page-narrowing/page-narrowing.module.code.ts"
import {
  declarationOver,
  everyStylesheetOut,
} from "akasha/check/code/pages/typecheck/modules/stylesheet-declaring/stylesheet-declaring.module.code.ts"
import {
  holdingOver,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { claimingOver } from "akasha/code/lua-runtime-library/modules/config-claiming/config-claiming.module.code.ts"
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
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { API } from "typescript-7/unstable/async"

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const TYPEGEN = "+types"

const GENERATED_AT = "/.react-router/"

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
  jsx: "react-jsx",
  noUncheckedSideEffectImports: true,
  allowArbitraryExtensions: true,
} as const

const BROWSER_LIBRARY = "lib.dom.d.ts"

const BRINGS_THE_BROWSER = /<reference\s+lib=["']dom["']/

const TYPES_ENTRY = "index.d.ts"

const BROUGHT =
  "the program judging code run outside a browser holds the browser's library, which a declaration it reached brought in"

type World = {
  readonly lib: readonly string[]
  readonly bare: boolean
  readonly judges: (split: Split) => (path: string) => boolean
}

const DECLARATION = ".d.ts"

function declaring(path: string): boolean {
  return path.endsWith(DECLARATION)
}

const PLAIN: World = {
  lib: ["esnext"],
  bare: true,
  judges: (split) => (one) => declaring(one) || !split.apart.has(one),
}

const BROWSER: World = {
  lib: ["dom", "dom.iterable", "esnext"],
  bare: false,
  judges: (split) => (one) => !declaring(one) && split.browser.has(one),
}

export type Found = {
  readonly path: string
  readonly reason: string
}

export function builtFrom(path: string): boolean {
  return textNamed(path) || manifested(path)
}

type Reader = (path: string) => string | null

function landingsOver(paths: readonly string[], reads: readonly Reader[]): readonly string[] {
  const found = new Set<string>()
  for (const at of paths) {
    if (!manifested(at)) continue
    const folder = dirname(at)
    for (const read of reads) {
      const text = read(at)
      if (text === null) continue
      for (const [, path] of reachesIn(folder, text)) found.add(path)
    }
  }
  const held = [...found].filter((one) => reads.some((read) => read(one) !== null))
  return held.sort()
}

function reachingOver(
  paths: readonly string[],
  reads: readonly Reader[],
  index: Answering
): Set<string> {
  const seeds = [...paths, ...landingsOver(paths, reads)]
  return new Set(closureOf(importers, seeds, { index, through: compiled }))
}

export function reachedBy(change: Change, shadow: Shadow): readonly string[] {
  const was: Reader = (one) => textOf(change.before(one))
  const now: Reader = (one) => textOf(change.after(one))
  const found = reachingOver(change.changed, [was, now], shadow.index)
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

function rootsIn(reached: readonly string[], read: Reader): readonly string[] {
  const found: string[] = []
  for (const one of reached) {
    const text = read(one)
    if (text === null) continue
    if (generatedRoutes(one)) continue
    if (reachesTypegen(one, text)) continue
    found.push(one)
  }
  return found
}

export function rootsOf(change: Change, shadow: Shadow): readonly string[] {
  return rootsIn(reachedBy(change, shadow), (one) => textOf(change.after(one)))
}

function bodiesOver(
  root: string,
  read: Reader,
  placed: Placing
): (at: string) => string | undefined {
  const held = new Map<string, string | undefined>()
  const base = readingOf(root, read, placed)
  return (path) => {
    const at = linkedOf(root, resolve(path), placed)
    if (held.has(at)) return held.get(at)
    const said = base(at)
    held.set(at, said)
    return said
  }
}

function bringsTheBrowser(at: string): boolean {
  const entry = join(at, TYPES_ENTRY)
  return existsSync(entry) && BRINGS_THE_BROWSER.test(readFileSync(entry, "utf8"))
}

export function typesIn(root: string, bare = false): readonly string[] {
  const at = join(root, PACKAGES_AT, TYPES_IN)
  if (!existsSync(at)) return []
  const found = readdirSync(at).sort()
  return bare ? found.filter((one) => !bringsTheBrowser(join(at, one))) : found
}

export function configOf(
  root: string,
  named: readonly string[],
  whole = false,
  world: World = PLAIN
): string {
  const types = typesIn(root, world.bare)
  const compilerOptions = { ...SETTINGS, skipLibCheck: !whole, lib: world.lib, types }
  return JSON.stringify({ compilerOptions, files: named })
}

function nowhere(): boolean {
  return false
}

export function servingOf(
  root: string,
  at: string,
  config: string,
  read: (path: string) => string | undefined,
  placed: Placing,
  holds: (rel: string) => boolean = nowhere
): (name: string) => string | null | undefined {
  const declared = declarationOver(root, holds, placed)
  const outside = new Map<string, string | undefined>()
  return (name) => {
    if (name === at) return config
    const sheet = declared(name)
    if (sheet !== undefined) return sheet
    const full = resolve(name)
    if (servedOf(root, full, placed) === null) {
      if (!outside.has(full)) outside.set(full, everyStylesheetOut(full))
      return outside.get(full)
    }
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

export function claimedIn(change: Change, index: Answering): (path: string) => boolean {
  return claimingOver(change.changed, (one) => textOf(change.after(one)), index)
}

async function foundOver(
  root: string,
  named: readonly string[],
  read: (name: string) => string | undefined,
  placed: Placing,
  whole: boolean,
  world: World,
  holds: (rel: string) => boolean
): Promise<readonly Found[]> {
  const at = join(root, CONFIG_NAME)
  const config = configOf(root, named, whole, world)
  const readFile = servingOf(root, at, config, read, placed, holds)
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
    const files = named.map((one) => join(root, one))
    for (const said of await program.getSyntacticDiagnostics(files))
      found.push(foundOf(root, said, placed))
    for (const said of await program.getSemanticDiagnostics(files))
      found.push(foundOf(root, said, placed))
    if (!world.bare) return found
    const held = await program.getSourceFileNames()
    if (held.some((one) => basename(one) === BROWSER_LIBRARY)) {
      found.push({ path: CONFIG_NAME, reason: BROUGHT })
    }
    return found
  } finally {
    await api.close()
  }
}

function reachIn(change: Change, index: Answering): Reach {
  return {
    index,
    holds: (one) => change.after(one) !== null,
    textAt: (one) => textOf(change.after(one)),
  }
}

async function foundIn(
  given: Change,
  shadow: Shadow,
  whole: boolean,
  world: World
): Promise<readonly Found[]> {
  const change = holdingOver(given)
  const reached = rootsOf(change, shadow)
  if (reached.length === 0) return []
  const claimed = claimedIn(change, shadow.index)
  const judges = world.judges(splitOver(reached, reachIn(change, shadow.index)))
  const named = reached.filter((one) => !claimed(one) && judges(one))
  if (named.length === 0) return []
  const root = resolve(change.root)
  const beside = shadow.index.manifestsBeside(shadow.index.fileKeysAt())
  const manifests = [...new Set([...beside, ...change.changed])]
  const now: Reader = (one) => textOf(change.after(one))
  const placed = placingOver(manifests, now)
  const minting: Minting = mintingIn(change, [...waitingKeys(shadow)], shadow.index)
  const minted: Reader = (rel) => {
    const text = now(rel)
    return text === null ? null : minting(rel, text)
  }
  const holds = (rel: string): boolean => now(rel) !== null
  const read = bodiesOver(root, minted, placed)
  return await foundOver(root, named, read, placed, whole, world, holds)
}

async function foundFor(
  root: string,
  paths: readonly string[],
  read: Reader,
  index: Answering,
  world: World
): Promise<readonly Found[]> {
  const reached = rootsIn([...reachingOver(paths, [read], index)].sort(), read)
  if (reached.length === 0) return []
  const claimed = claimingOver(paths, read, index)
  const holds = (one: string): boolean => read(one) !== null
  const judges = world.judges(splitOver(reached, { index, holds, textAt: read }))
  const named = reached.filter((one) => !claimed(one) && judges(one))
  if (named.length === 0) return []
  const at = resolve(root)
  const manifests = [...new Set([...index.manifestsBeside(index.fileKeysAt()), ...paths])]
  const placed = placingOver(manifests, read)
  return await foundOver(at, named, bodiesOver(at, read, placed), placed, true, world, holds)
}

function judgedOver(found: readonly Found[], held: ReadonlySet<string>): readonly Judged[] {
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of found) {
    if (generatedRoutes(one.path)) continue
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    const reason = held.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`
    said.push({ path: one.path, reason })
  }
  return said
}

export async function refusalsOver(
  change: Change,
  shadow: Shadow,
  whole = false
): Promise<readonly Judged[]> {
  return judgedOver(await foundIn(change, shadow, whole, PLAIN), new Set(change.changed))
}

export async function refusalsFor(
  root: string,
  paths: readonly string[],
  read: (path: string) => string | null,
  index: Answering
): Promise<readonly Judged[]> {
  return judgedOver(await foundFor(root, paths, read, index, PLAIN), new Set(paths))
}

export async function browserRefusalsOver(
  change: Change,
  shadow: Shadow
): Promise<readonly Judged[]> {
  return judgedOver(await foundIn(change, shadow, false, BROWSER), new Set(change.changed))
}

export async function browserRefusalsFor(
  root: string,
  paths: readonly string[],
  read: (path: string) => string | null,
  index: Answering
): Promise<readonly Judged[]> {
  return judgedOver(await foundFor(root, paths, read, index, BROWSER), new Set(paths))
}
