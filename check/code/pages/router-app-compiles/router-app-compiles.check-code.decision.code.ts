import { existsSync, readdirSync, readFileSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import {
  type Laid,
  type Typegen,
  typegenOf,
  typesUnder,
} from "akasha/check/code/pages/router-app-compiles/modules/route-typegen/route-typegen.module.code.ts"
import { declarationOver } from "akasha/check/code/pages/typecheck/typecheck.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  insideOf,
  linkedOf,
  manifestOf,
  type Placing,
} from "akasha/code/reading/modules/code-typing/code-typing.module.code.ts"
import { compileConfig } from "akasha/code/router-app/properties/compile-config.file-property.ts"
import { routeTable } from "akasha/code/router-app/properties/route-table.code-file-property.ts"
import { routeTypesDirectory } from "akasha/code/router-app/properties/route-types-directory.build-folder-property.ts"
import { API } from "typescript-7/unstable/async"

const COMPILED_AT = "tsconfig.router-app-compiles.json"

const PACKAGES = "node_modules"

const CONFIG_ENDING = ".json"

const TYPES = "types"

const FIRST_LINE = 1

const SETTINGS = {
  noEmit: true,
  composite: false,
  incremental: false,
  declaration: true,
  noUncheckedSideEffectImports: true,
  allowArbitraryExtensions: true,
}

const DECLARATION = ".d.ts"

const EVERY_STYLESHEET = /^declare module ['"]\*\.css['"] \{\}\n?/gm

const UNCOMPILED = "does not compile as this change leaves it"

const UNGENERATED = "has no route types, because its typegen refused"

export type Laying = {
  readonly root: string
  readonly paths: readonly string[]
  readonly changed: readonly string[]
  readonly read: (path: string) => string | null
  readonly laid: Laid
  readonly placed: Placing
}

type Found = {
  readonly path: string
  readonly reason: string
}

type Entries = {
  readonly files: string[]
  readonly directories: string[]
}

type Diagnosed = {
  readonly fileName?: string
  readonly code: number
  readonly text: string
  readonly startPosition?: { readonly line: number }
}

export function appsAmong(pages: readonly string[]): readonly string[] {
  return [...new Set(pages.map(dirname))].sort()
}

export function appOf(path: string, apps: readonly string[]): string | null {
  let found: string | null = null
  for (const one of apps) {
    if (!path.startsWith(`${one}/`)) continue
    if (found === null || one.length > found.length) found = one
  }
  return found
}

export function appsReached(
  reached: readonly string[],
  apps: readonly string[]
): readonly string[] {
  const found = new Set<string>()
  for (const one of reached) {
    const app = appOf(one, apps)
    if (app !== null) found.add(app)
  }
  return [...found].sort()
}

function configured(root: string, at: string): string | null {
  if (!at.startsWith(`${root}/`) || !at.endsWith(CONFIG_ENDING)) return null
  const rel = at.slice(root.length + 1)
  return rel.split("/").includes(PACKAGES) ? null : rel
}

type Held = {
  readonly files: Set<string>
  readonly directories: Set<string>
}

function listedIn(paths: readonly string[]): ReadonlyMap<string, Held> {
  const found = new Map<string, Held>()
  const heldAt = (folder: string): Held => {
    const had = found.get(folder)
    if (had !== undefined) return had
    const made = { files: new Set<string>(), directories: new Set<string>() }
    found.set(folder, made)
    return made
  }
  for (const one of paths) {
    heldAt(dirname(one)).files.add(basename(one))
    let at = dirname(one)
    while (at !== "/" && at !== ".") {
      const above = dirname(at)
      const held = heldAt(above)
      if (held.directories.has(basename(at))) break
      held.directories.add(basename(at))
      at = above
    }
  }
  return found
}

function entriesOf(held: Held | undefined): Entries {
  return {
    files: [...(held?.files ?? [])].sort(),
    directories: [...(held?.directories ?? [])].sort(),
  }
}

function writtenUnder(at: string): Entries {
  const files: string[] = []
  const directories: string[] = []
  if (!existsSync(at)) return { files, directories }
  for (const one of readdirSync(at, { withFileTypes: true })) {
    if (one.isDirectory()) directories.push(one.name)
    else files.push(one.name)
  }
  return { files: files.sort(), directories: directories.sort() }
}

function reasonOf(said: Diagnosed): string {
  const line = (said.startPosition?.line ?? 0) + FIRST_LINE
  return `line ${line}: TS${said.code}: ${said.text}`
}

type Fs = {
  readonly readFile: (name: string) => string | null | undefined
  readonly fileExists: (name: string) => boolean | undefined
  readonly directoryExists: (name: string) => boolean | undefined
  readonly getAccessibleEntries: (name: string) => Entries | undefined
  readonly realpath: (name: string) => string | undefined
}

type Generated = {
  readonly app: string
  readonly types: string
}

type Placed = {
  readonly app: string
  readonly folder: string
  readonly generated: string
  readonly above: string
  readonly at: string
  readonly types: string
}

type Naming = (full: string) => string | null

function placedOf(root: string, one: Generated): Placed {
  const generated = join(root, typesUnder(one.app))
  return {
    app: one.app,
    folder: join(root, one.app),
    generated,
    above: dirname(generated),
    at: join(root, one.app, COMPILED_AT),
    types: one.types,
  }
}

function madeAt(one: Placed, full: string): string {
  return join(one.types, full.slice(one.generated.length))
}

function under(full: string, folder: string): boolean {
  return full === folder || full.startsWith(`${folder}/`)
}

function everyStylesheetOut(full: string): string | undefined {
  if (!full.endsWith(DECLARATION) || !existsSync(full)) return undefined
  const text = readFileSync(full, "utf8")
  const kept = text.replace(EVERY_STYLESHEET, "")
  return kept === text ? undefined : kept
}

function readingFor(every: readonly Placed[], lay: Laying, relOf: Naming): Fs["readFile"] {
  const config = JSON.stringify({
    extends: `./${compileConfig.fileName}`,
    compilerOptions: SETTINGS,
  })
  const root = resolve(lay.root)
  const declared = declarationOver(root, (rel) => lay.read(rel) !== null, lay.placed)
  const held = new Map<string, string | null>()
  const outside = new Map<string, string | undefined>()
  return (name) => {
    const full = resolve(name)
    if (every.some((one) => one.at === full)) return config
    const made = every.find((one) => under(full, one.generated))
    if (made !== undefined) {
      const at = madeAt(made, full)
      return existsSync(at) ? readFileSync(at, "utf8") : null
    }
    const sheet = declared(full)
    if (sheet !== undefined) return sheet
    const rel = relOf(full)
    if (rel === null) {
      if (!outside.has(full)) outside.set(full, everyStylesheetOut(full))
      return outside.get(full)
    }
    if (held.has(rel)) return held.get(rel) ?? null
    const body = lay.read(rel)
    held.set(rel, body)
    return body
  }
}

function servingFor(every: readonly Placed[], lay: Laying, relOf: Naming): Fs {
  const root = resolve(lay.root)
  const owned = lay.paths.filter((one) => every.some((app) => one.startsWith(`${app.app}/`)))
  const listed = listedIn(owned.map((one) => join(root, one)))
  const readFile = readingFor(every, lay, relOf)
  const fileExists = (name: string): boolean | undefined => {
    const body = readFile(name)
    return body === undefined ? undefined : body !== null
  }
  const directoryExists = (name: string): boolean | undefined => {
    const full = resolve(name)
    const made = every.find((one) => under(full, one.generated))
    if (made !== undefined) return existsSync(madeAt(made, full))
    if (every.some((one) => one.above === full)) return true
    if (!every.some((one) => under(full, one.folder))) return undefined
    return listed.has(full) ? true : undefined
  }
  const getAccessibleEntries = (name: string): Entries | undefined => {
    const full = resolve(name)
    const made = every.find((one) => under(full, one.generated))
    if (made !== undefined) return writtenUnder(madeAt(made, full))
    if (every.some((one) => one.above === full)) return { files: [], directories: [TYPES] }
    const app = every.find((one) => under(full, one.folder))
    if (app === undefined || full.split("/").includes(PACKAGES)) return undefined
    const said = entriesOf(listed.get(full))
    if (full === app.folder) said.directories.push(routeTypesDirectory.folderName)
    return said
  }
  const realpath = (name: string): string | undefined => {
    const one = resolve(name)
    const said = linkedOf(root, one, lay.placed)
    return said === one ? undefined : said
  }
  return { readFile, fileExists, directoryExists, getAccessibleEntries, realpath }
}

function foundOver(app: string, every: readonly Diagnosed[], relOf: Naming): readonly Found[] {
  const seen = new Set<string>()
  const found: Found[] = []
  for (const said of every) {
    const named = said.fileName === undefined ? null : relOf(resolve(said.fileName))
    const path = named ?? said.fileName ?? join(app, compileConfig.fileName)
    const reason = `${reasonOf(said)} — \`${app}\` ${UNCOMPILED}`
    const key = `${path}\n${reason}`
    if (seen.has(key)) continue
    seen.add(key)
    found.push({ path, reason })
  }
  return found
}

async function foundIn(
  generated: readonly Generated[],
  lay: Laying
): Promise<ReadonlyMap<string, readonly Found[]>> {
  const root = resolve(lay.root)
  const every = generated.map((one) => placedOf(root, one))
  const relOf: Naming = (full) => {
    const real = linkedOf(root, full, lay.placed)
    return insideOf(root, real) ?? manifestOf(root, real, lay.placed) ?? configured(root, real)
  }
  const api = new API({ cwd: root, fs: servingFor(every, lay, relOf) })
  try {
    const snapshot = await api.updateSnapshot({ openProjects: every.map((one) => one.at) })
    const found = new Map<string, readonly Found[]>()
    for (const one of every) {
      const project = snapshot.getProject(one.at)
      if (project === undefined) throw new Error(`${one.app} named no program a check could build`)
      const program = await project.program
      const said: readonly Diagnosed[] = [
        ...(await program.getConfigFileParsingDiagnostics()),
        ...(await program.getProgramDiagnostics()),
        ...(await program.getGlobalDiagnostics()),
        ...(await program.getSyntacticDiagnostics()),
        ...(await program.getSemanticDiagnostics()),
      ]
      found.set(one.app, foundOver(one.app, said, relOf))
    }
    return found
  } finally {
    await api.close()
  }
}

export async function judgedFor(apps: readonly string[], lay: Laying): Promise<readonly Judged[]> {
  const said: Judged[] = []
  const made: Typegen[] = []
  const generated: Generated[] = []
  try {
    for (const app of apps) {
      if (lay.read(join(app, compileConfig.fileName)) === null) continue
      const one = typegenOf(lay, app)
      made.push(one)
      if (one.failed === null) {
        generated.push({ app, types: one.types })
        continue
      }
      const reason = `\`${app}\` ${UNGENERATED} — ${one.failed}`
      said.push({ path: join(app, routeTable.fileName), reason })
    }
    if (generated.length === 0) return said
    const found = await foundIn(generated, lay)
    for (const one of generated) said.push(...(found.get(one.app) ?? []))
    return said
  } finally {
    for (const one of made) one.sweep()
  }
}
