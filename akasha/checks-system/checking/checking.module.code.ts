import { createRequire } from "node:module"
import { join } from "node:path"
import type { Change } from "../../pages-system/change/change.module.code.ts"
import {
  everyOfType,
  typeSlugOf,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  namedIn,
} from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { type Shadow, shadowAsked } from "../../pages-system/shadow/shadow.module.code.ts"
import type { Input } from "../change-walking/change-walking.module.code.ts"
import type { Judged, Judging, Running } from "../judging/judging.module.code.ts"

export type Phase = "patch" | "worktree" | "deploy" | "audit"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOn: readonly Phase[]
  readonly isInput: Input | null
  readonly run: Running
}

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export function checkSlugIn(root: string): string {
  return typeSlugOf(root, CHECK_TYPE)
}

export function checkPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfType(root, checkSlugIn(root)).map((one) => one.path))].sort()
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

function wakingIn(run: Running): Input | null {
  const said = (run as { readonly isInput?: unknown }).isInput
  return typeof said === "function" ? (said as Input) : null
}

function saidBy(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function statedIn(at: string, slug: string, page: string): Record<string, unknown> | null {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    throw new Error(`${page} is a check page, and would not load — ${saidBy(thrown)}`)
  }
  const named = mod[exportedAs(slug)]
  if (named === null || typeof named !== "object") return null
  return named as Record<string, unknown>
}

function runningIn(at: string, slug: string, beside: string): Running | null {
  let mod: Record<string, unknown>
  try {
    mod = loadFrom(at) as Record<string, unknown>
  } catch (thrown) {
    throw new Error(`${beside} is a check's code, and would not load — ${saidBy(thrown)}`)
  }
  const named = mod[exportedAs(slug)]
  if (typeof named === "function") return named as Running
  const every = Object.values(mod).filter((one) => typeof one === "function")
  return every.length === 1 && every[0] !== undefined ? (every[0] as Running) : null
}

export function checksIn(root: string): readonly Gathered[] {
  const found: Gathered[] = []
  for (const path of checkPagesIn(root)) {
    const said = namedIn(path)
    if (said === null) {
      throw new Error(`${path} is a check page, and its name says no slug a runner can read`)
    }
    const slug = said.stem
    const full = join(root, path)
    const stated = statedIn(full, slug, path)
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
    const run = runningIn(join(root, beside), slug, beside)
    if (run === null) {
      throw new Error(`${path} is a check page, and ${beside} answers to nothing that can be run`)
    }
    found.push({ slug, page: path, runsOn, isInput: wakingIn(run), run })
  }
  if (found.length === 0) {
    throw new Error(
      "the index names no check, so nothing would judge this change and a clean answer would mean nothing"
    )
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function checksAt(every: readonly Gathered[], phase: Phase): readonly Gathered[] {
  return every.filter((one) => one.runsOn.includes(phase))
}

function takesFrom(one: Gathered, change: Change, shadow: Shadow): boolean {
  const wakes = one.isInput
  if (wakes === null) return true
  try {
    return change.changed.some((path) => wakes(path, shadow))
  } catch {
    return true
  }
}

export function checksFor(
  every: readonly Gathered[],
  change: Change,
  shadow: Shadow
): readonly Gathered[] {
  return every.filter((one) => takesFrom(one, change, shadow))
}

function threw(one: Gathered, thrown: unknown): Judged {
  return {
    path: one.page,
    reason: `the check \`${one.slug}\` threw, so it judged nothing — ${saidBy(thrown)}`,
  }
}

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    wokenBy: (change) => checksFor(every, change, shadowAsked(change)).map((one) => one.slug),
    over: (change) => {
      const shadow = shadowAsked(change)
      const said: Judged[] = []
      for (const one of checksFor(every, change, shadow)) {
        try {
          said.push(...one.run(change, shadow))
        } catch (thrown) {
          said.push(threw(one, thrown))
        }
      }
      return said
    },
  }
}

export function auditingIn(root: string): Judging {
  return judgingBy(checksAt(checksIn(root), "audit"))
}
