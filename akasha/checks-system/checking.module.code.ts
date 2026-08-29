import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import type { Corpus } from "../write-system/corpus.module.code.ts"
import { corpusIn } from "../write-system/corpus.module.code.ts"
import type { Judged, Judging, Leaving } from "../write-system/landing.module.code.ts"
import type { Needs } from "./check/properties/needs.page-property-type.ts"

export type At = {
  readonly root: string
  readonly path: string
}

export type Body = At & {
  readonly bytes: Uint8Array
}

export type Whole = {
  readonly root: string
  readonly paths: readonly string[]
  readonly changed: readonly string[]
  readonly at: (path: string) => Uint8Array | null
  readonly keep: () => string
}

type Given = {
  path: At
  file: Body
  tree: Whole
}

type Said = {
  path: readonly string[]
  file: readonly string[]
  tree: readonly Judged[]
}

type RunOf<K extends Needs> = (given: Given[K]) => Said[K]

export type Running = RunOf<"path"> | RunOf<"file"> | RunOf<"tree">

export type Gathered = {
  readonly slug: string
  readonly needs: Needs
  readonly run: Running
}

const CHECK = "check"

const reach_ = createRequire(import.meta.url)

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}

export function codeBeside(path: string): string {
  return `${path.slice(0, -".ts".length)}.code.ts`
}

function needsIn(value: Record<string, unknown> | null): Needs | null {
  const said = value === null ? null : value["needs"]
  if (said === "path" || said === "file" || said === "tree") return said
  return null
}

function runningIn(at: string, slug: string): Running | null {
  let mod: Record<string, unknown>
  try {
    mod = reach_(at) as Record<string, unknown>
  } catch {
    return null
  }
  const named = mod[camel(slug)]
  if (typeof named === "function") return named as Running
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as Running) : null
}

export function checksIn(corpus: Corpus): readonly Gathered[] {
  const found: Gathered[] = []
  for (const one of corpus.every()) {
    if (!corpus.admits(one.pageTypeSlug, CHECK)) continue
    const needs = needsIn(corpus.valueOf(one.path))
    if (needs === null) {
      throw new Error(`${one.path} is a check page, and states no \`needs\` a runner can honour`)
    }
    const at = codeBeside(one.path)
    const run = runningIn(at, one.slug)
    if (run === null) {
      throw new Error(`${one.path} is a check page, and ${at} answers to nothing that can be run`)
    }
    found.push({ slug: one.slug, needs, run })
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function filesUnder(root: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string): void => {
    for (const entry of readdirSync(at, { withFileTypes: true })) {
      const here = `${at}/${entry.name}`
      if (entry.isDirectory()) walk(here)
      else found.push(here)
    }
  }
  walk(root)
  return found
}

export function wholeOf(leaving: Leaving): Whole {
  const changed = new Set(leaving.changed)
  const paths = new Set<string>()
  for (const path of filesUnder(leaving.root)) {
    if (changed.has(path) && leaving.at(path) === null) continue
    paths.add(path)
  }
  for (const path of leaving.changed) {
    if (leaving.at(path) !== null) paths.add(path)
  }
  const every = [...paths].sort()
  let kept: string | null = null
  return {
    root: leaving.root,
    paths: every,
    changed: [...leaving.changed].sort(),
    at: leaving.at,
    keep: () => {
      if (kept !== null) return kept
      const at = mkdtempSync(`${tmpdir()}/akasha-judged-`)
      for (const path of every) {
        const bytes = leaving.at(path)
        if (bytes === null) continue
        const here = `${at}/${path.slice(leaving.root.length + 1)}`
        mkdirSync(here.slice(0, here.lastIndexOf("/")), { recursive: true })
        writeFileSync(here, bytes)
      }
      kept = at
      return at
    },
  }
}

function threw(slug: string, path: string, thrown: unknown): Judged {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return {
    path,
    reason: `the check \`${slug}\` threw, so it judged nothing — ${why}`,
  }
}

function overOne(one: Gathered, whole: Whole): readonly Judged[] {
  if (one.needs === "tree") {
    const run = one.run as RunOf<"tree">
    try {
      return run(whole)
    } catch (thrown) {
      return [threw(one.slug, whole.root, thrown)]
    }
  }
  const said: Judged[] = []
  for (const path of whole.changed) {
    const bytes = whole.at(path)
    if (bytes === null) continue
    try {
      const reasons =
        one.needs === "path"
          ? (one.run as RunOf<"path">)({ root: whole.root, path })
          : (one.run as RunOf<"file">)({ root: whole.root, path, bytes })
      for (const reason of reasons) said.push({ path, reason })
    } catch (thrown) {
      said.push(threw(one.slug, path, thrown))
    }
  }
  return said
}

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    over: (leaving) => {
      const whole = wholeOf(leaving)
      const said: Judged[] = []
      for (const one of every) said.push(...overOne(one, whole))
      return said
    },
  }
}

export function judgingIn(corpus: Corpus): Judging {
  return judgingBy(checksIn(corpus))
}

export type Reading =
  | {
      readonly kind: "read"
      readonly corpus: Corpus
      readonly kept: string
      readonly back: (path: string) => string
    }
  | { readonly kind: "unread"; readonly reason: string }

export function corpusFor(given: Whole): Reading {
  const kept = given.keep()
  const back = (path: string): string =>
    path.startsWith(`${kept}/`) ? `${given.root}${path.slice(kept.length)}` : path
  let corpus: Corpus | { readonly refused: string }
  try {
    corpus = corpusIn(kept)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return { kind: "unread", reason: why.split(kept).join(given.root) }
  }
  if ("refused" in corpus) {
    return { kind: "unread", reason: corpus.refused.split(kept).join(given.root) }
  }
  return { kind: "read", corpus, kept, back }
}

export function bodyOf(given: Body): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(given.bytes)
  } catch {
    return null
  }
}

export function textIn(whole: Whole, path: string): string | null {
  const bytes = whole.at(path)
  if (bytes === null) return null
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

export function onDisk(path: string): string | null {
  return existsSync(path) ? readFileSync(path, "utf8") : null
}
