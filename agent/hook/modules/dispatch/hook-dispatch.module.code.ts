import { realpathSync } from "node:fs"
import { join } from "node:path"
import {
  type Answer,
  ASIDE,
  JUDGE,
  type Judging,
  LET_THROUGH,
  parseHookPayload,
  parseRefusal,
  passing,
  refusing,
  rewriting,
  said,
  UNREADABLE,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { linksMade } from "akasha/agent/hook/modules/links/hook-links.module.code.ts"
import {
  type Cost,
  closing,
  costOf,
  opening,
  recordCost,
} from "akasha/check/modules/cost/check-cost.module.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { readingFrom } from "akasha/page/index/modules/commit-surface/commit-surface.module.code.ts"
import {
  everyOfType,
  readingIn,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

const HOOK = "hook-dispatch"

const PACKAGE = "akasha/"

const PAGE_TYPE = "agent-hook"

const ASKING_TYPE = "inference-hook"

const HOOK_TYPES: readonly string[] = [PAGE_TYPE, ASKING_TYPE]

const CODE = "code"

const TS = "ts"

const EVENT = "hook_event_name"

const TOOL = "tool_name"

const INPUT = "tool_input"

const RUNS_AT = "runsAt"

const OVER_TOOLS = "overTools"

const SLUG = "slug"

const BLOCKED = 2

export type Valued = { readonly path: string; readonly value: Record<string, unknown> }

type Held = { readonly slug: string; readonly at: string; readonly page: string }

type Ran = { readonly code: number; readonly out: string; readonly err: string }

function namesIn(given: unknown): readonly string[] | null {
  if (!Array.isArray(given)) return null
  return given.every((one) => typeof one === "string" && one !== "")
    ? (given as readonly string[])
    : null
}

export function eventsIn(listed: readonly Valued[]): readonly string[] {
  const found = new Set<string>()
  for (const one of listed) {
    for (const event of namesIn(one.value[RUNS_AT]) ?? []) found.add(event)
  }
  return [...found].sort()
}

export function heldFor(
  listed: readonly Valued[],
  event: string,
  tool: string | null
): readonly Held[] {
  const found: Held[] = []
  for (const one of listed) {
    const runsAt = namesIn(one.value[RUNS_AT])
    if (runsAt === null || !runsAt.includes(event)) continue
    const overTools = namesIn(one.value[OVER_TOOLS])
    if (overTools !== null && (tool === null || !overTools.includes(tool))) continue
    const slug = one.value[SLUG]
    const beside = besideAt(one.path, CODE, TS)
    if (typeof slug !== "string" || beside === null) {
      throw new Error(`\`${one.path}\` is an agent hook naming no code a dispatch could run`)
    }
    found.push({ slug, at: beside, page: one.path })
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function hooksIn(given: string | Reading): readonly Valued[] {
  const found: Valued[] = []
  for (const one of HOOK_TYPES) {
    for (const listed of everyOfType(given, one)) {
      const value = valueByPath(given, listed.path)
      if (value !== null) found.push({ path: listed.path, value })
    }
  }
  return found
}

const REWROTE = z.looseObject({
  hookSpecificOutput: z.looseObject({ updatedInput: z.looseObject({}) }),
})

export function inputAnew(out: string): Record<string, unknown> | null {
  try {
    return REWROTE.safeParse(JSON.parse(out)).data?.hookSpecificOutput.updatedInput ?? null
  } catch {
    return null
  }
}

export function reasonIn(given: Ran): string {
  try {
    return parseRefusal(given.out).reason
  } catch {
    return given.err.trim()
  }
}

export function judgedOf(answered: Ran): Answer | null {
  return answered.code === BLOCKED ? refusing(reasonIn(answered)) : null
}

export function asideOf(slug: string, answered: Ran): string | null {
  if (answered.code === ASIDE || answered.code === BLOCKED) return null
  return `${HOOK}: \`${slug}\` exited ${answered.code} — ${answered.err.trim()}, judging nothing`
}

async function ranAt(at: string, payload: string): Promise<Ran> {
  const child = Bun.spawn([process.execPath, at], {
    stdin: "pipe",
    stdout: "pipe",
    stderr: "pipe",
  })
  child.stdin.write(payload)
  await child.stdin.end()
  const out = await new Response(child.stdout).text()
  const err = await new Response(child.stderr).text()
  return { code: await child.exited, out, err }
}

function judgingIn(held: unknown): Judging | null {
  if (held === null || typeof held !== "object") return null
  const found = (held as Record<string, unknown>)[JUDGE]
  return typeof found === "function" ? (found as Judging) : null
}

async function importedAt(at: string): Promise<unknown> {
  try {
    return await import(at)
  } catch {
    return null
  }
}

async function judgingAt(root: string, at: string): Promise<Judging | null> {
  const held = (await importedAt(`${PACKAGE}${at}`)) ?? (await importedAt(join(root, at)))
  return held === null ? null : judgingIn(held)
}

function ranIn(given: unknown): Ran | null {
  if (given === null || typeof given !== "object" || Array.isArray(given)) return null
  const held = given as Record<string, unknown>
  const code = held["code"]
  const out = held["out"]
  const err = held["err"]
  if (typeof code !== "number" || typeof out !== "string" || typeof err !== "string") return null
  return { code, out, err }
}

async function judgedBy(judging: Judging, payload: Record<string, unknown>): Promise<Ran> {
  try {
    const given = ranIn(await judging(payload))
    if (given !== null) return given
    return { code: UNREADABLE, out: "", err: `${HOOK}: the judgement answered no exit` }
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return { code: UNREADABLE, out: "", err: why }
  }
}

async function answeredAt(
  root: string,
  at: string,
  payload: Record<string, unknown>
): Promise<Ran> {
  const judging = await judgingAt(root, at)
  if (judging === null) return await ranAt(join(root, at), JSON.stringify(payload))
  return await judgedBy(judging, structuredClone(payload))
}

function costKept(root: string, page: string, cost: Cost): undefined {
  try {
    recordCost(root, page, cost)
  } catch {}
}

export async function answerFor(
  root: string,
  reading: Reading,
  payload: Record<string, unknown>
): Promise<Answer> {
  const listed = hooksIn(reading)
  if (listed.length === 0) {
    return passing(`${HOOK}: the index names no \`${PAGE_TYPE}\`, so nothing judged this call`)
  }
  linksMade(root, eventsIn(listed))
  const event = textAt(payload, EVENT)
  if (event === null) {
    return passing(`${HOOK}: the payload names no \`${EVENT}\`, so nothing judged this call`)
  }
  let carried = payload
  let rewrote = false
  const aside: string[] = []
  const runId = Bun.randomUUIDv7()
  let before = opening()
  for (const one of heldFor(listed, event, textAt(payload, TOOL))) {
    if (reading.read(one.at) === null) {
      aside.push(`${HOOK}: \`${one.slug}\` names \`${one.at}\`, and nothing is there to run`)
      continue
    }
    const answered = await answeredAt(root, one.at, carried)
    const after = closing()
    const refusals = answered.code === BLOCKED ? 1 : 0
    costKept(root, one.page, costOf(before, after, runId, event, one.slug, 0, refusals))
    before = after
    const judged = judgedOf(answered)
    if (judged !== null) return judged
    const unjudged = asideOf(one.slug, answered)
    if (unjudged !== null) aside.push(unjudged)
    const anew = inputAnew(answered.out)
    if (anew !== null) {
      carried = { ...carried, [INPUT]: anew }
      rewrote = true
    }
  }
  const why = aside.join("\n")
  if (!rewrote) return why === "" ? LET_THROUGH : passing(why)
  return { ...rewriting(event, carried[INPUT] as Record<string, unknown>), err: why }
}

function readingOver(root: string, base: string | null): Reading {
  if (base !== null) {
    try {
      const found = readingFrom(root, base)
      if (found !== null && hooksIn(found).length > 0) return found
    } catch {}
  }
  return readingIn(root)
}

export async function ran(root: string | null = null, base: string | null = null): Promise<number> {
  const raw = await Bun.stdin.text()
  let payload: Record<string, unknown> | null
  try {
    payload = parseHookPayload(raw)
  } catch {
    payload = null
  }
  if (payload === null) {
    return said(passing(`${HOOK}: the payload would not read, so nothing judged this call`))
  }
  try {
    const at = root ?? rootOf(realpathSync(import.meta.path))
    return said(await answerFor(at, readingOver(at, base), payload))
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return said(passing(`${HOOK}: ${why}, so nothing judged this call`))
  }
}

if (import.meta.main) process.exit(await ran())
