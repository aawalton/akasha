import { readdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { servedOf } from "@akasha/code-system/code-typing"
import { waitingKeys } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import { API } from "typescript-7/unstable/async"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import { FILES, inputAsync } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import type { Found } from "../typecheck/typecheck.code-check.code.ts"
import {
  bodiesOf,
  builtFrom,
  declaringIn,
  mintingIn,
  rootsOf,
} from "../typecheck/typecheck.code-check.code.ts"

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const CONFIG_NAME = "tsconfig.typescript-7.json"

const TYPES_AT = "node_modules/@types"

const FIRST_LINE = 1

const SETTINGS = {
  noEmit: true,
  strict: true,
  noUncheckedIndexedAccess: true,
  allowImportingTsExtensions: true,
  module: "preserve",
  moduleResolution: "bundler",
  target: "esnext",
  skipLibCheck: true,
  jsx: "react-jsx",
} as const

const BUILT: Selector<Body> = {
  named: "the bodies the program is built from",
  isInput: (path) => builtFrom(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => builtFrom(one.path)),
}

export function typesIn(root: string): readonly string[] {
  try {
    return readdirSync(join(root, TYPES_AT)).sort()
  } catch {
    return []
  }
}

export function configOf(root: string, named: readonly string[]): string {
  return JSON.stringify({ compilerOptions: { ...SETTINGS, types: typesIn(root) }, files: named })
}

export function servingOf(
  root: string,
  at: string,
  config: string,
  read: (path: string) => string | undefined
): (name: string) => string | null | undefined {
  return (name) => {
    if (name === at) return config
    if (servedOf(root, resolve(name)) === null) return undefined
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

export function foundOf(root: string, said: Diagnosed): Found {
  const at = said.fileName === undefined ? null : servedOf(root, resolve(said.fileName))
  const line = (said.startPosition?.line ?? 0) + FIRST_LINE
  return {
    path: at ?? said.fileName ?? "",
    reason: `line ${line}: TS${said.code}: ${said.text}`,
  }
}

type Diagnosed = {
  readonly fileName?: string
  readonly code: number
  readonly text: string
  readonly startPosition?: { readonly line: number }
}

export async function foundIn(change: Change, shadow: Shadow): Promise<readonly Found[]> {
  const roots = rootsOf(change, shadow.index)
  if (roots.length === 0) return []
  const root = resolve(change.root)
  const named = [...new Set([...roots, ...declaringIn(change, shadow.index)])]
  const read = bodiesOf(change, mintingIn(change, [...waitingKeys(shadow)], shadow.index))
  const at = join(root, CONFIG_NAME)
  const config = configOf(root, named)
  const readFile = servingOf(root, at, config, read)
  const api = new API({
    cwd: root,
    fs: { readFile, fileExists: existingOf(readFile) },
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
        found.push(foundOf(root, said))
      for (const said of await program.getSemanticDiagnostics(file)) found.push(foundOf(root, said))
    }
    return found
  } finally {
    await api.close()
  }
}

async function refusalsIn(change: Change, shadow: Shadow): Promise<readonly Judged[]> {
  const changed = new Set(change.changed)
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of await foundIn(change, shadow)) {
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    said.push({
      path: one.path,
      reason: changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`,
    })
  }
  return said
}

export const typescript7 = inputAsync(BUILT, refusalsIn)
