import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import type {
  Given,
  Judging,
  Kind,
  Readers,
  Typing,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import {
  overEveryIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { textOf } from "akasha/code/body-text/body-text.module.code.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"
import type { Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { besideAt, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"
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

export type Rule = {
  readonly slug: string
  readonly judge: Judging
}

type Running = (...given: readonly unknown[]) => undefined

function carriedIn(change: Change | null, path: string): string | null {
  if (change === null) return null
  return textOf(change.after(path))
}

function carryingIn(change: Change | null, specifier: string): string | null {
  if (change === null || !specifier.startsWith(PACKAGE)) return null
  return carriedIn(change, specifier.slice(PACKAGE.length))
}

function requiringIn(
  root: string,
  full: string,
  change: Change | null,
  seen: Map<string, Record<string, unknown>>
): (specifier: string) => unknown {
  const plain = createRequire(full)
  const load = (specifier: string): unknown => {
    const carried = carryingIn(change, specifier)
    if (carried === null) return plain(specifier)
    return compiledFrom(root, specifier.slice(PACKAGE.length), carried, change, seen)
  }
  return Object.assign(load, plain)
}

function compiledFrom(
  root: string,
  at: string,
  text: string,
  change: Change | null = null,
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
  run(requiringIn(root, full, change, seen), holder, holder.exports, full, dirname(full))
  return holder.exports
}

export function rulesIn(
  root: string,
  shadow: Shadow,
  change: Change | null = null
): readonly Rule[] {
  const found: Rule[] = []
  const seen = new Map<string, Record<string, unknown>>()
  for (const one of shadow.index.everyOfType(RULE)) {
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
    const carried = carriedIn(change, beside)
    if (carried === null) {
      throw new Error(
        `${one.path} is a syntax rule, and this change leaves ${beside} holding no body, so it cannot be loaded to judge by`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = compiledFrom(root, shadow.codeAt(beside) ?? beside, carried, change, seen)
    } catch (thrown) {
      throw new Error(
        `${one.path} is a syntax rule, and the body this change leaves at ${beside} could not be loaded — ${saidBy(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a syntax rule, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging })
  }
  if (found.length === 0) {
    throw new Error(
      "no syntax rule stands, so every file would be judged by nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function declaredBy(shadow: Shadow, moduleSlug: string): ReadonlySet<string> {
  const named = new Set<string>()
  const listed = shadow.index.listedAt(MODULE, moduleSlug)[0]
  if (listed === undefined) return named
  const declared = shadow.pageOf(listed.path)?.[DECLARES]
  if (!Array.isArray(declared)) return named
  for (const one of declared) {
    if (typeof one === "string") named.add(one)
  }
  return named
}

export function readersOf(shadow: Shadow): Readers {
  const held = new Map<string, ReadonlySet<string>>()
  return {
    get: (moduleSlug) => {
      const found = held.get(moduleSlug)
      if (found !== undefined) return found
      const named = declaredBy(shadow, moduleSlug)
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

function levelAt(shadow: Shadow, slug: string): Level | null {
  for (const kind of KINDS) {
    const listed = shadow.index.listedAt(kind, slug)[0]
    if (listed === undefined) continue
    const said = shadow.pageOf(listed.path)?.[NAMES_ITSELF]
    if (typeof said === "string") return { name: said, kind }
  }
  return null
}

export function levelsOf(shadow: Shadow): Levels {
  const held = new Map<string, Level | null>()
  const at = (slug: string): Level | null => {
    const found = held.get(slug)
    if (found !== undefined) return found
    const said = levelAt(shadow, slug)
    held.set(slug, said)
    return said
  }
  return {
    namedAt: (slug) => at(slug)?.name ?? null,
    typedAt: (slug) => at(slug)?.kind ?? null,
  }
}

const NAMES_NOTHING: Naming = () => null

const TYPES_NOTHING: Typing = () => null

const NO_LEVELS: Levels = { namedAt: NAMES_NOTHING, typedAt: TYPES_NOTHING }

export function refusalsIn(
  rules: readonly Rule[],
  path: string,
  text: string,
  readers: Readers,
  levels: Levels = NO_LEVELS
): readonly string[] {
  const parsed: Given = {
    path,
    source: parsedAs(path, text),
    readers,
    namedAt: levels.namedAt,
    typedAt: levels.typedAt,
  }
  const said: string[] = []
  for (const rule of rules) {
    for (const one of rule.judge(parsed)) {
      said.push(`line ${one.line}: ${one.reason} — \`${rule.slug}\``)
    }
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const rules = rulesIn(change.root, shadow, change)
  const readers = readersOf(shadow)
  const levels = levelsOf(shadow)
  return overEveryIn(change, textNamed, (path, text) =>
    refusalsIn(rules, path, text, readers, levels)
  )
}
