import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { everyOfType, everyPage } from "../data-system/index/index-reading.module.code.ts"
import type { Judged, Judging, Leaving } from "./judging.module.code.ts"

export type At = {
  readonly root: string
  readonly path: string
}

export type Body = At & {
  readonly bytes: Uint8Array
}

export type Needs = "path" | "file"

export type Phase = "patch" | "worktree" | "deploy"

type Given = {
  path: At
  file: Body
}

type Said = {
  path: readonly string[]
  file: readonly string[]
}

type RunOf<K extends Needs> = (given: Given[K]) => Said[K]

export type Running = RunOf<"path"> | RunOf<"file">

export type Gathered = {
  readonly slug: string
  readonly needs: Needs
  readonly runsOn: readonly Phase[]
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

export function checkPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfType(root, CHECK).map((one) => one.path))].sort()
}

export function pagesIn(root: string): readonly string[] {
  return [...new Set(everyPage(root).map((one) => one.path))].sort()
}

const HELD_IN_A_FILE = ["code", "test"]

function needsIn(value: Record<string, unknown>): Needs | null {
  const said = value["needs"]
  if (said === "path" || said === "file") return said
  return null
}

function runsOnIn(value: Record<string, unknown>): readonly Phase[] | null {
  const said = value["runsOn"]
  if (!Array.isArray(said)) return null
  const every = said.filter(
    (one): one is Phase => one === "patch" || one === "worktree" || one === "deploy"
  )
  return every.length === said.length ? every : null
}

function statedIn(at: string, slug: string): Record<string, unknown> | null {
  let mod: Record<string, unknown>
  try {
    mod = reach_(at) as Record<string, unknown>
  } catch {
    return null
  }
  const named = mod[camel(slug)]
  if (named === null || typeof named !== "object") return null
  return named as Record<string, unknown>
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

function slugOf(path: string): string {
  const name = path.slice(path.lastIndexOf("/") + 1)
  return name.slice(0, name.indexOf("."))
}

export function checksIn(root: string): readonly Gathered[] {
  const found: Gathered[] = []
  for (const path of checkPagesIn(root)) {
    const slug = slugOf(path)
    const full = join(root, path)
    const stated = statedIn(full, slug)
    if (stated === null) {
      throw new Error(`${path} is a check page, and answers to no \`${camel(slug)}\` a runner can read`)
    }
    const needs = needsIn(stated)
    if (needs === null) {
      throw new Error(`${path} is a check page, and states no \`needs\` a runner can honour`)
    }
    const runsOn = runsOnIn(stated)
    if (runsOn === null) {
      throw new Error(`${path} is a check page, and states no \`runsOn\` a runner can honour`)
    }
    const beside = codeBeside(full)
    const run = runningIn(beside, slug)
    if (run === null) {
      throw new Error(`${path} is a check page, and ${codeBeside(path)} answers to nothing that can be run`)
    }
    found.push({ slug, needs, runsOn, run })
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function checksAt(every: readonly Gathered[], phase: Phase): readonly Gathered[] {
  return every.filter((one) => one.runsOn.includes(phase))
}

function threw(slug: string, path: string, thrown: unknown): Judged {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return {
    path,
    reason: `the check \`${slug}\` threw, so it judged nothing — ${why}`,
  }
}

function overOne(one: Gathered, leaving: Leaving): readonly Judged[] {
  const said: Judged[] = []
  for (const path of leaving.changed) {
    const bytes = leaving.at(path)
    if (bytes === null) continue
    try {
      const reasons =
        one.needs === "path"
          ? (one.run as RunOf<"path">)({ root: leaving.root, path })
          : (one.run as RunOf<"file">)({ root: leaving.root, path, bytes })
      for (const reason of reasons) said.push({ path, reason })
    } catch (thrown) {
      said.push(threw(one.slug, path, thrown))
    }
  }
  return said
}

export function everyFileIn(root: string): readonly string[] {
  const found: string[] = []
  for (const path of pagesIn(root)) {
    found.push(path)
    const stated = statedIn(join(root, path), slugOf(path))
    if (stated === null) continue
    const stem = path.slice(0, -".ts".length)
    for (const held of HELD_IN_A_FILE) {
      const said = stated[held]
      if (typeof said === "string") found.push(`${stem}.${held}.${said}`)
    }
  }
  return [...new Set(found)].sort()
}

export function everythingIn(root: string): Leaving {
  return { root, changed: everyFileIn(root), at: onDisk(root) }
}

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    over: (leaving) => {
      const said: Judged[] = []
      for (const one of every) said.push(...overOne(one, leaving))
      return said
    },
  }
}

export function judgingIn(root: string, phase: Phase): Judging {
  return judgingBy(checksAt(checksIn(root), phase))
}

export function auditingIn(root: string): Judging {
  return judgingBy(checksIn(root))
}

export function onDisk(root: string): (path: string) => Uint8Array | null {
  return (path) => {
    const full = join(root, path)
    try {
      return readFileSync(full)
    } catch {
      return null
    }
  }
}

export function bodyOf(given: Body): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(given.bytes)
  } catch {
    return null
  }
}
