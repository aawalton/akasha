import { existsSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { everyOfType, everyPath, indexIn } from "../data-system/index/index-reading.module.code.ts"
import { exportedAs } from "../pages-system/page/page-export-name.module.code.ts"
import { besideAt } from "../pages-system/page/page-file-name.module.code.ts"
import type { Judged, Judging, Leaving } from "./judging.module.code.ts"

export type Body = {
  readonly root: string
  readonly path: string
  readonly bytes: Uint8Array
}

export type Phase = "patch" | "worktree" | "deploy" | "audit"

export type Running = (leaving: Leaving) => readonly Judged[]

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOn: readonly Phase[]
  readonly run: Running
}

const CHECK = "check"

const IDENTITY = "identity"

const SLUG = "slug"

const PAGE = "page"

const PATH = "path"

const CODE = "code"

const TS = "ts"

const CHECKS_AT = ".git/data/index/identity/check/slug"

const PATHS_AT = ".git/data/index/identity/page/path"

const reach_ = createRequire(import.meta.url)

export function checkPagesIn(root: string): readonly string[] {
  if (!existsSync(join(indexIn(root), IDENTITY, CHECK, SLUG))) {
    throw new Error(
      `\`${CHECKS_AT}\` is not there, so which checks stand could not be answered — an index that is missing is not an index naming no check`
    )
  }
  return [...new Set(everyOfType(root, CHECK).map((one) => one.path))].sort()
}

const STATED: readonly (readonly [Phase, string])[] = [
  ["patch", "runsOnPatch"],
  ["worktree", "runsOnWorktree"],
  ["deploy", "runsOnDeploy"],
  ["audit", "runsOnAudit"],
]

function runsOnIn(value: Record<string, unknown>): readonly Phase[] | null {
  const held: Phase[] = []
  for (const [phase, named] of STATED) {
    const said = value[named]
    if (typeof said !== "boolean") return null
    if (said) held.push(phase)
  }
  return held
}

function statedIn(at: string, slug: string): Record<string, unknown> | null {
  let mod: Record<string, unknown>
  try {
    mod = reach_(at) as Record<string, unknown>
  } catch {
    return null
  }
  const named = mod[exportedAs(slug)]
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
  const named = mod[exportedAs(slug)]
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
      throw new Error(
        `${path} is a check page, and answers to no \`${exportedAs(slug)}\` a runner can read`
      )
    }
    const runsOn = runsOnIn(stated)
    if (runsOn === null) {
      throw new Error(`${path} is a check page, and states no phase a runner can honour`)
    }
    const beside = besideAt(path, CODE, TS)
    if (beside === null) {
      throw new Error(`${path} is a check page, and no code file can stand beside a name like it`)
    }
    const run = runningIn(join(root, beside), slug)
    if (run === null) {
      throw new Error(`${path} is a check page, and ${beside} answers to nothing that can be run`)
    }
    found.push({ slug, page: path, runsOn, run })
  }
  if (found.length === 0) {
    throw new Error(
      `\`${CHECKS_AT}\` names no check, so nothing would judge this change and a clean answer would mean nothing`
    )
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function checksAt(every: readonly Gathered[], phase: Phase): readonly Gathered[] {
  return every.filter((one) => one.runsOn.includes(phase))
}

export function overEachFile(
  leaving: Leaving,
  judge: (given: Body) => readonly string[]
): readonly Judged[] {
  const said: Judged[] = []
  for (const path of leaving.changed) {
    const bytes = leaving.at(path)
    if (bytes === null) continue
    for (const reason of judge({ root: leaving.root, path, bytes })) said.push({ path, reason })
  }
  return said
}

function threw(one: Gathered, thrown: unknown): Judged {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return {
    path: one.page,
    reason: `the check \`${one.slug}\` threw, so it judged nothing — ${why}`,
  }
}

export function everyFileIn(root: string): readonly string[] {
  if (!existsSync(join(indexIn(root), IDENTITY, PAGE, PATH))) {
    throw new Error(
      `\`${PATHS_AT}\` is not there, so which files stand could not be answered — an index that is missing is not an index naming no file`
    )
  }
  return [...new Set(everyPath(root))].sort()
}

export function everythingIn(root: string): Leaving {
  const at = onDisk(root)
  return { root, changed: everyFileIn(root), at, was: at }
}

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    over: (leaving) => {
      const said: Judged[] = []
      for (const one of every) {
        try {
          said.push(...one.run(leaving))
        } catch (thrown) {
          said.push(threw(one, thrown))
        }
      }
      return said
    },
  }
}

export function judgingIn(root: string, phase: Phase): Judging {
  return judgingBy(checksAt(checksIn(root), phase))
}

export function auditingIn(root: string): Judging {
  return judgingBy(checksAt(checksIn(root), "audit"))
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
