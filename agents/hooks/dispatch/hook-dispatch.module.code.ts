import { existsSync, realpathSync } from "node:fs"
import { join } from "node:path"
import {
  type Answer,
  ASIDE,
  LET_THROUGH,
  parseHookPayload,
  parseRefusal,
  refusing,
  rewriting,
  said,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { linksMade } from "akasha/agents/hooks/links/hook-links.module.code.ts"
import {
  type Cost,
  closing,
  costOf,
  opening,
  recordCost,
} from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { textAt } from "akasha/utils/narrow/text-at/text-at.module.code.ts"

const HOOK = "hook-dispatch"

const PAGE_TYPE = "agent-hook"

const ASKING_TYPE = "inference-hook"

export const HOOK_TYPES: readonly string[] = [PAGE_TYPE, ASKING_TYPE]

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

export type Held = { readonly slug: string; readonly at: string; readonly page: string }

export type Ran = { readonly code: number; readonly out: string; readonly err: string }

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

export function hooksIn(root: string): readonly Valued[] {
  const found: Valued[] = []
  for (const one of HOOK_TYPES) {
    try {
      found.push(...(valuesOfType(root, one) as readonly Valued[]))
    } catch {}
  }
  return found
}

export function inputAnew(out: string): Record<string, unknown> | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(out)
  } catch {
    return null
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) return null
  const spoke = (parsed as Record<string, unknown>)["hookSpecificOutput"]
  if (spoke === null || typeof spoke !== "object" || Array.isArray(spoke)) return null
  const anew = (spoke as Record<string, unknown>)["updatedInput"]
  if (anew === null || typeof anew !== "object" || Array.isArray(anew)) return null
  return anew as Record<string, unknown>
}

export function reasonIn(given: Ran): string {
  try {
    return parseRefusal(given.out).reason
  } catch {
    return given.err.trim()
  }
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

function costKept(root: string, page: string, cost: Cost): undefined {
  try {
    recordCost(root, page, cost)
  } catch {}
}

async function answerFor(root: string, payload: Record<string, unknown>): Promise<Answer> {
  const listed = hooksIn(root)
  if (listed.length === 0) {
    return refusing(`${HOOK}: the index names no \`${PAGE_TYPE}\`, so nothing judged this call`)
  }
  linksMade(root, eventsIn(listed))
  const event = textAt(payload, EVENT)
  if (event === null) {
    return refusing(`${HOOK}: the payload names no \`${EVENT}\`, so nothing judged this call`)
  }
  let carried = payload
  let rewrote = false
  const runId = Bun.randomUUIDv7()
  let before = opening()
  for (const one of heldFor(listed, event, textAt(payload, TOOL))) {
    const at = join(root, one.at)
    if (!existsSync(at)) {
      return refusing(`${HOOK}: \`${one.slug}\` names \`${one.at}\`, and nothing is there to run`)
    }
    const answered = await ranAt(at, JSON.stringify(carried))
    const after = closing()
    const refusals = answered.code === BLOCKED ? 1 : 0
    costKept(root, one.page, costOf(before, after, runId, event, one.slug, 0, refusals))
    before = after
    if (answered.code === BLOCKED) return refusing(reasonIn(answered))
    if (answered.code !== ASIDE) {
      return refusing(
        `${HOOK}: \`${one.slug}\` exited ${answered.code} — ${answered.err.trim()}, judging nothing`
      )
    }
    const anew = inputAnew(answered.out)
    if (anew !== null) {
      carried = { ...carried, [INPUT]: anew }
      rewrote = true
    }
  }
  if (!rewrote) return LET_THROUGH
  return rewriting(event, carried[INPUT] as Record<string, unknown>)
}

export async function ran(): Promise<number> {
  const raw = await Bun.stdin.text()
  let payload: Record<string, unknown> | null
  try {
    payload = parseHookPayload(raw)
  } catch {
    payload = null
  }
  if (payload === null) {
    return said(refusing(`${HOOK}: the payload would not read, so nothing judged this call`))
  }
  try {
    return said(await answerFor(rootOf(realpathSync(import.meta.path)), payload))
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return said(refusing(`${HOOK}: ${why}, so nothing judged this call`))
  }
}

if (import.meta.main) process.exit(await ran())
