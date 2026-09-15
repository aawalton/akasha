import {
  ROUND_AT,
  SERVICE_SLUG,
} from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import type { Ran } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { portFor } from "akasha/infrastructure/service/workstation/modules/service-binding/service-binding.module.code.ts"

const LOOPBACK = "http://127.0.0.1"

const WORKING_MS = 21_600_000

export const ATTEMPTS = 3

const WAITED_MS = 500

const REFUSED_CONNECTION = "ConnectionRefused"

const PUTS_IT_UP = "`akasha deploy service-workstation` puts that service up"

const UNJUDGED = "so no check was judged"

const NO_PORT = `no page states the port a round of the audit service is asked for on, ${UNJUDGED}`

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Sleeper = (waited: number) => Promise<void>

export type Answered = { readonly ran: readonly Ran[] } | { readonly refused: string }

export function originOf(port: number): string {
  return `${LOOPBACK}:${port}${ROUND_AT}`
}

export function connectionRefused(thrown: unknown): boolean {
  if (thrown === null || typeof thrown !== "object") return false
  return (thrown as { readonly code?: unknown }).code === REFUSED_CONNECTION
}

export function notAnswering(at: string): string {
  return (
    `nothing is listening at \`${at}\`, where a round of the audit service is asked for, ` +
    `${UNJUDGED} — ${PUTS_IT_UP}`
  )
}

export function brokeOff(at: string, thrown: unknown): string {
  const why = thrown instanceof Error ? thrown.message : String(thrown)
  return `the round asked for at \`${at}\` did not answer, ${UNJUDGED} — ${why}`
}

export function ranIn(said: unknown): Answered {
  if (said === null || typeof said !== "object" || Array.isArray(said)) {
    return { refused: "the audit service answered a round with something no runs read out of" }
  }
  const held = said as { readonly refused?: unknown; readonly ran?: unknown }
  if (typeof held.refused === "string") return { refused: held.refused }
  if (!Array.isArray(held.ran))
    return { refused: "the audit service answered a round naming no runs" }
  return { ran: held.ran as readonly Ran[] }
}

const fetchThrough: Fetcher = (url, init) => fetch(url, init)

const sleep: Sleeper = (waited) =>
  new Promise((settle) => {
    setTimeout(settle, waited)
  })

export async function roundAsked(
  root: string,
  checks: readonly string[],
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Answered> {
  const port = portFor(root, SERVICE_SLUG)
  if (port === null) return { refused: NO_PORT }
  const at = originOf(port)
  for (let taken = 1; ; taken += 1) {
    try {
      const answered = await fetcher(at, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ checks }),
        signal: AbortSignal.timeout(WORKING_MS),
      })
      return ranIn(await answered.json())
    } catch (thrown) {
      if (!connectionRefused(thrown)) return { refused: brokeOff(at, thrown) }
      if (taken >= ATTEMPTS) return { refused: notAnswering(at) }
      await naps(WAITED_MS * taken)
    }
  }
}
