import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type {
  Given,
  Judging,
  Kind,
  Marking,
  Readers,
  Typing,
} from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.ts"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  overEveryIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Naming } from "akasha/command/modules/walking/command-walking.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import ts from "typescript"

const PACKAGE = "akasha/"

const RULE = "syntax-rule"

const CODE = "code"

const TS = "ts"

const MODULE = "module"

const COMMAND = "command"

const NAMESPACE = "namespace"

const KINDS: readonly Kind[] = [COMMAND, NAMESPACE]

const NAMES_ITSELF = "name"

const DECLARES = "pageBodyReaders"

const MARK = "mark"

export type Rule = {
  readonly slug: string
  readonly judge: Judging
  readonly mark?: Marking
}

type Running = (...given: readonly unknown[]) => undefined

const loadFrom = createRequire(import.meta.url)

const REACHED = new Set<string>()

const NOTHING: ReadonlyMap<string, Record<string, unknown>> = new Map()

function reachedSince(before: ReadonlySet<string>): undefined {
  for (const at of Object.keys(loadFrom.cache)) {
    if (!before.has(at)) REACHED.add(at)
  }
  return undefined
}

export type Carrying = {
  readonly paths: readonly string[]
  readonly read: (path: string) => string | null
}

function reachesTheChange(root: string, carrying: Carrying | null): boolean {
  if (carrying === null) return false
  return carrying.paths.some((one) => REACHED.has(join(root, one)))
}

function carriesAny(beside: readonly string[], carrying: Carrying | null): boolean {
  if (carrying === null) return false
  const named = new Set(carrying.paths)
  return beside.some((one) => named.has(one))
}

function besideEvery(paged: Paged): readonly string[] {
  const found: string[] = []
  for (const one of paged.index.everyOfType(RULE)) {
    const at = besideAt(one.path, CODE, TS)
    if (at !== null) found.push(at)
  }
  return found
}

function treeModules(
  root: string,
  paged: Paged,
  carrying: Carrying | null
): ReadonlyMap<string, Record<string, unknown>> {
  const beside = besideEvery(paged)
  if (beside.length === 0 || carriesAny(beside, carrying)) return NOTHING
  const before = new Set(Object.keys(loadFrom.cache))
  const found = new Map<string, Record<string, unknown>>()
  for (const at of beside) {
    const full = join(root, at)
    if (!existsSync(full)) break
    found.set(at, loadFrom(full) as Record<string, unknown>)
  }
  reachedSince(before)
  if (found.size < beside.length) return NOTHING
  return reachesTheChange(root, carrying) ? NOTHING : found
}

function carriedIn(carrying: Carrying | null, path: string): string | null {
  if (carrying === null) return null
  return carrying.read(path)
}

function carryingIn(carrying: Carrying | null, specifier: string): string | null {
  if (carrying === null || !specifier.startsWith(PACKAGE)) return null
  return carriedIn(carrying, specifier.slice(PACKAGE.length))
}

function requiringIn(
  root: string,
  full: string,
  carrying: Carrying | null,
  seen: Map<string, Record<string, unknown>>
): (specifier: string) => unknown {
  const plain = createRequire(full)
  const load = (specifier: string): unknown => {
    const carried = carryingIn(carrying, specifier)
    if (carried === null) return plain(specifier)
    return compiledFrom(root, specifier.slice(PACKAGE.length), carried, carrying, seen)
  }
  return Object.assign(load, plain)
}

function compiledFrom(
  root: string,
  at: string,
  text: string,
  carrying: Carrying | null = null,
  seen: Map<string, Record<string, unknown>> = new Map()
): Record<string, unknown> {
  const full = join(root, at)
  const held = seen.get(full)
  if (held !== undefined) return held
  const made = ts.transpileModule(text, {
    fileName: full,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ESNext,
      esModuleInterop: true,
    },
  })
  const broke = made.diagnostics?.[0]
  if (broke !== undefined) {
    throw new Error(
      `${at} does not parse — ${ts.flattenDiagnosticMessageText(broke.messageText, " ")}`
    )
  }
  const built = made.outputText
  const holder: { exports: Record<string, unknown> } = { exports: {} }
  seen.set(full, holder.exports)
  const run = new Function(
    "require",
    "module",
    "exports",
    "__filename",
    "__dirname",
    built
  ) as Running
  run(requiringIn(root, full, carrying, seen), holder, holder.exports, full, dirname(full))
  return holder.exports
}

export function rulesIn(
  root: string,
  paged: Paged,
  carrying: Carrying | null = null,
  codeAt: (path: string) => string | null = (path) => path
): readonly Rule[] {
  const found: Rule[] = []
  const seen = new Map<string, Record<string, unknown>>()
  const fromTree = treeModules(root, paged, carrying)
  for (const one of paged.index.everyOfType(RULE)) {
    const said = partedIn(one.path)
    if (said === null) {
      throw new Error(`${one.path} is a syntax rule, and its name says no slug`)
    }
    const slug = said.slug
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a syntax rule, and no code file can sit beside a name like it`
      )
    }
    const held = fromTree.get(beside)
    let mod: Record<string, unknown>
    if (held === undefined) {
      const carried = carriedIn(carrying, beside)
      if (carried === null) {
        throw new Error(
          `${one.path} is a syntax rule, and this change leaves ${beside} holding no body, so it cannot be loaded to judge by`
        )
      }
      try {
        mod = compiledFrom(root, codeAt(beside) ?? beside, carried, carrying, seen)
      } catch (thrown) {
        throw new Error(
          `${one.path} is a syntax rule, and the body this change leaves at ${beside} could not be loaded — ${saidBy(thrown)}`
        )
      }
    } else {
      mod = held
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a syntax rule, and ${beside} answers to nothing that can judge`
      )
    }
    const marking = mod[MARK]
    if (typeof marking === "function") {
      found.push({ slug, judge: named as Judging, mark: marking as Marking })
    } else {
      found.push({ slug, judge: named as Judging })
    }
  }
  if (found.length === 0) {
    throw new Error(
      "no syntax rule stands, so every file would be judged by nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function declaredBy(paged: Paged, moduleSlug: string): ReadonlySet<string> {
  const named = new Set<string>()
  const listed = paged.index.listedAt(MODULE, moduleSlug)[0]
  if (listed === undefined) return named
  const declared = paged.pageOf(listed.path)?.[DECLARES]
  if (!Array.isArray(declared)) return named
  for (const one of declared) {
    if (typeof one === "string") named.add(one)
  }
  return named
}

export function readersOf(paged: Paged): Readers {
  const held = new Map<string, ReadonlySet<string>>()
  return {
    get: (moduleSlug) => {
      const found = held.get(moduleSlug)
      if (found !== undefined) return found
      const named = declaredBy(paged, moduleSlug)
      held.set(moduleSlug, named)
      return named
    },
  }
}

type Level = {
  readonly name: string
  readonly kind: Kind
}

export type Levels = {
  readonly namedAt: Naming
  readonly typedAt: Typing
}

function levelAt(paged: Paged, slug: string): Level | null {
  for (const kind of KINDS) {
    const listed = paged.index.listedAt(kind, slug)[0]
    if (listed === undefined) continue
    const said = paged.pageOf(listed.path)?.[NAMES_ITSELF]
    if (typeof said === "string") return { name: said, kind }
  }
  return null
}

export function levelsOf(paged: Paged): Levels {
  const held = new Map<string, Level | null>()
  const at = (slug: string): Level | null => {
    const found = held.get(slug)
    if (found !== undefined) return found
    const said = levelAt(paged, slug)
    held.set(slug, said)
    return said
  }
  return {
    namedAt: (slug) => at(slug)?.name ?? null,
    typedAt: (slug) => at(slug)?.kind ?? null,
  }
}

const namesNothing: Naming = () => null

const typesNothing: Typing = () => null

const NO_LEVELS: Levels = { namedAt: namesNothing, typedAt: typesNothing }

export function markedIn(rules: readonly Rule[], path: string, text: string): readonly Rule[] {
  return rules.filter((one) => one.mark === undefined || one.mark(text, path))
}

export function refusalsIn(
  rules: readonly Rule[],
  path: string,
  text: string,
  readers: Readers,
  levels: Levels = NO_LEVELS
): readonly string[] {
  const live = markedIn(rules, path, text)
  if (live.length === 0) return []
  const parsed: Given = {
    path,
    source: parsedAs(path, text),
    readers,
    namedAt: levels.namedAt,
    typedAt: levels.typedAt,
  }
  const said: string[] = []
  for (const rule of live) {
    for (const one of rule.judge(parsed)) {
      said.push(`line ${one.line}: ${one.reason} — \`${rule.slug}\``)
    }
  }
  return said
}

export function judgingOver(
  root: string,
  paged: Paged,
  carrying: Carrying | null = null,
  codeAt: (path: string) => string | null = (path) => path
): (path: string, text: string) => readonly string[] {
  const rules = rulesIn(root, paged, carrying, codeAt)
  const readers = readersOf(paged)
  const levels = levelsOf(paged)
  return (path, text) => refusalsIn(rules, path, text, readers, levels)
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const carrying: Carrying = {
    paths: change.changed,
    read: (path) => textOf(change.after(path)),
  }
  const judge = judgingOver(change.root, shadow, carrying, shadow.codeAt)
  return overEveryIn(change, textNamed, judge)
}
