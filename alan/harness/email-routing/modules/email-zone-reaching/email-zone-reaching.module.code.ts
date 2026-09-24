import type {
  RoutingRule,
  RuleToWrite,
} from "akasha/alan/harness/email-routing/modules/email-rule-planning/email-rule-planning.module.code.ts"
import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { z } from "zod"
import "akasha/temper/eso/type/eso-timers/eso-timers.type-declaration.d.ts"

const API = "https://api.cloudflare.com/client/v4"

const TOKEN = "CLOUDFLARE_API_TOKEN"

const TIMEOUT_MS = 30_000

const PER_PAGE = 50

const PAGES = 20

const UNAUTHORIZED = 401

const FORBIDDEN = 403

export const READING_RULES = "read routing rules"

export const WRITING_RULES = "write routing rules"

const READING_ZONES = "read zones"

const envelopeSchema = z.object({
  success: z.boolean(),
  errors: z.array(z.object({ message: z.string() })).default([]),
  result: z.unknown().optional(),
})

const ruleSchema = z.object({
  name: z.string().optional(),
  enabled: z.boolean().optional(),
  matchers: z.array(
    z.object({ type: z.string(), field: z.string().optional(), value: z.string().optional() })
  ),
  actions: z.array(z.object({ type: z.string(), value: z.array(z.string()).optional() })),
})

const zoneSchema = z.object({ id: z.string() })

export async function answeredOf(answer: Response, doing: string): Promise<unknown> {
  const said = await answer.text()
  if (answer.status === UNAUTHORIZED || answer.status === FORBIDDEN) {
    throw new Error(`the token cannot ${doing} — Cloudflare answered ${String(answer.status)}`)
  }
  let held: ReturnType<typeof envelopeSchema.safeParse>
  try {
    held = envelopeSchema.safeParse(JSON.parse(said))
  } catch {
    throw new Error(
      `Cloudflare answered ${String(answer.status)} with what is not JSON when asked to ${doing}`
    )
  }
  if (!held.success) throw held.error
  const body = held.data
  if (answer.ok && body.success) return body.result
  const why = body.errors.map((one) => one.message).join("; ")
  throw new Error(
    `Cloudflare refused to ${doing} with ${String(answer.status)}: ` +
      `${why === "" ? "no reason given" : why}`
  )
}

async function askedOf(
  token: string,
  path: string,
  doing: string,
  init: RequestInit = {}
): Promise<unknown> {
  const stopping = new AbortController()
  const timer = setTimeout(() => {
    stopping.abort()
  }, TIMEOUT_MS)
  try {
    const answer = await fetch(`${API}${path}`, {
      ...init,
      signal: stopping.signal,
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
    })
    return await answeredOf(answer, doing)
  } finally {
    clearTimeout(timer)
  }
}

export function tokenStated(): string {
  return requireEnv(TOKEN)
}

export async function zoneIdOf(token: string, name: string): Promise<string> {
  const held = await askedOf(token, `/zones?name=${encodeURIComponent(name)}`, READING_ZONES)
  const one = z.array(zoneSchema).parse(held)[0]
  if (one === undefined) {
    throw new Error(`\`${name}\` names no zone this token can read, so no rule can be read for it`)
  }
  return one.id
}

export async function rulesIn(token: string, zoneId: string): Promise<readonly RoutingRule[]> {
  const held: RoutingRule[] = []
  for (let page = 1; page <= PAGES; page += 1) {
    const at = `/zones/${zoneId}/email/routing/rules?per_page=${String(PER_PAGE)}&page=${String(page)}`
    const rules = z.array(ruleSchema).parse(await askedOf(token, at, READING_RULES))
    held.push(...rules)
    if (rules.length < PER_PAGE) return held
  }
  throw new Error(
    `the zone carries more than ${String(PER_PAGE * PAGES)} routing rules, which this run cannot read whole`
  )
}

export async function writeRule(
  token: string,
  zoneId: string,
  rule: RuleToWrite
): Promise<undefined> {
  await askedOf(token, `/zones/${zoneId}/email/routing/rules`, WRITING_RULES, {
    method: "POST",
    body: JSON.stringify(rule),
  })
}
