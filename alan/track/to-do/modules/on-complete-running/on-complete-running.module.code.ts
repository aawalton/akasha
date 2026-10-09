import { existsSync } from "node:fs"
import { join } from "node:path"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { completionShapeAlong } from "akasha/page/core/modules/task-lifecycle/task-lifecycle.module.code.ts"
import {
  everyOfType,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  changeUncommitted,
  uncommittedIn,
} from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const TO_DO = "to-do"

const CODE = "on-complete.code"

const TS = "ts"

export const RUNS = "onComplete"

export const DONE_AT = "onCompleteDoneAt"

const SLUG = "slug"

export type Completion = {
  readonly slug: string
  readonly values: Value
  readonly completedAt: Date
}

export type OnCompleteCode = (completion: Completion) => Promise<unknown>

export type Hooked = {
  readonly path: string
  readonly slug: string
  readonly values: Value
  readonly code: string
}

export type Verdict = {
  readonly act: "run" | "seed" | "none"
  readonly doneAt: string
}

export type Deps = {
  readonly hooked: () => readonly Hooked[]
  readonly claim: (hooked: Hooked, now: Date) => Verdict
  readonly load: (code: string) => Promise<Readonly<Record<string, unknown>>>
}

export type Ran = {
  readonly said: readonly string[]
  readonly wrong: readonly string[]
}

export function stampKey(): string {
  const shape = completionShapeAlong([TO_DO])
  if (shape === null || shape.kind !== "task") {
    throw new Error(
      `\`${TO_DO}\` has no task completion shape, so nothing says when one was completed`
    )
  }
  return shape.stampKey
}

export function verdictFor(stamp: string | null, doneAt: string | null, now: Date): Verdict {
  if (doneAt === null) return { act: "seed", doneAt: stamp ?? now.toISOString() }
  if (stamp === null || !(Date.parse(stamp) > Date.parse(doneAt))) return { act: "none", doneAt }
  return { act: "run", doneAt: stamp }
}

export function hookedIn(root: string): readonly Hooked[] {
  const found: Hooked[] = []
  for (const one of everyOfType(root, TO_DO)) {
    const code = besideAt(one.path, CODE, TS)
    if (code === null || !existsSync(join(root, code))) continue
    const values = valueByPath(root, one.path)
    if (values === null) throw new Error(`\`${one.path}\` is filed as a to-do and carries no value`)
    const slug = textAt(values, SLUG)
    if (slug === null) throw new Error(`\`${one.path}\` is filed as a to-do and states no slug`)
    found.push({ path: one.path, slug, values, code })
  }
  return found
}

export function claimedAt(root: string, hooked: Hooked, now: Date): Verdict {
  const stamp = textAt(hooked.values, stampKey())
  const held = uncommittedIn(root, hooked.path)
  const seen = verdictFor(stamp, held === null ? null : textAt(held, DONE_AT), now)
  if (seen.act === "none") return seen
  let verdict = seen
  changeUncommitted(root, hooked.path, (there) => {
    verdict = verdictFor(stamp, there === null ? null : textAt(there, DONE_AT), now)
    return { ...(there ?? {}), [DONE_AT]: verdict.doneAt }
  })
  return verdict
}

export function depsAt(root: string): Deps {
  return {
    hooked: () => hookedIn(root),
    claim: (hooked, now) => claimedAt(root, hooked, now),
    load: async (code) => (await import(join(root, code))) as Readonly<Record<string, unknown>>,
  }
}

function runIn(loaded: Readonly<Record<string, unknown>>): OnCompleteCode | null {
  const held = loaded[RUNS]
  return typeof held === "function" ? (held as OnCompleteCode) : null
}

async function ranFor(deps: Deps, hooked: Hooked, now: Date): Promise<string | null> {
  const verdict = deps.claim(hooked, now)
  if (verdict.act === "seed") {
    return `\`${hooked.slug}\` is seen first, and only a completion after ${verdict.doneAt} runs its code`
  }
  if (verdict.act === "none") return null
  const run = runIn(await deps.load(hooked.code))
  if (run === null) throw new Error(`\`${hooked.code}\` exports no \`${RUNS}\` function`)
  await run({ slug: hooked.slug, values: hooked.values, completedAt: new Date(verdict.doneAt) })
  return `ran the on-complete code of \`${hooked.slug}\` for its completion at ${verdict.doneAt}`
}

export async function ranOnce(deps: Deps, now: Date): Promise<Ran> {
  const said: string[] = []
  const wrong: string[] = []
  for (const hooked of deps.hooked()) {
    try {
      const one = await ranFor(deps, hooked, now)
      if (one !== null) said.push(one)
    } catch (thrown) {
      wrong.push(`the on-complete code of \`${hooked.slug}\` did not finish: ${whyOf(thrown)}`)
    }
  }
  return { said, wrong }
}
