import { createRequire } from "node:module"
import { join } from "node:path"
import {
  everyOfTypeAnswered,
  standingByIdAnswered,
} from "../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  namedIn,
} from "../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import { shadowAsked } from "../../pages-system/shadow/shadow.module.code.ts"
import type { Judged, Judging, Running } from "../judging/judging.module.code.ts"

export type Phase = "patch" | "worktree" | "deploy" | "audit"

export type Gathered = {
  readonly slug: string
  readonly page: string
  readonly runsOn: readonly Phase[]
  readonly run: Running
}

const CHECK_TYPE = "01a04bc4-7e86-7beb-8dfb-3666785dd3d5"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export function checkSlugIn(root: string): string {
  const standing = standingByIdAnswered(root, CHECK_TYPE)
  if (standing === null) {
    throw new Error(
      `no page carries the id \`${CHECK_TYPE}\`, so nothing says which pages are checks`
    )
  }
  const said = namedIn(standing.path)
  if (said === null) {
    throw new Error(`${standing.path} carries the check page type, and its name says no slug`)
  }
  return said.stem
}

export function checkPagesIn(root: string): readonly string[] {
  return [...new Set(everyOfTypeAnswered(root, checkSlugIn(root)).map((one) => one.path))].sort()
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
    mod = loadFrom(at) as Record<string, unknown>
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
    mod = loadFrom(at) as Record<string, unknown>
  } catch {
    return null
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
      "the index names no check, so nothing would judge this change and a clean answer would mean nothing"
    )
  }
  return found.sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function checksAt(every: readonly Gathered[], phase: Phase): readonly Gathered[] {
  return every.filter((one) => one.runsOn.includes(phase))
}

function threw(one: Gathered, thrown: unknown): Judged {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return {
    path: one.page,
    reason: `the check \`${one.slug}\` threw, so it judged nothing — ${why}`,
  }
}

export function judgingBy(every: readonly Gathered[]): Judging {
  return {
    named: every.map((one) => one.slug),
    over: (change) => {
      const shadow = shadowAsked(change)
      const said: Judged[] = []
      for (const one of every) {
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
