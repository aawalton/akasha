import {
  ROUND_AT,
  SERVICE_SLUG,
} from "akasha/check/modules/audit-listening/audit-listening.module.code.ts"
import type { Ran } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import { portFor } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-binding/service-binding.module.code.ts"

const LOOPBACK = "http://127.0.0.1"

const WORKING_MS = 21_600_000

export const ATTEMPTS = 3

export const RESTARTS = 4

const WAITED_MS = 500

const SETTLING_MS = 2_000

const REFUSED_CONNECTION = "ConnectionRefused"

const CLOSED_CONNECTION = "ECONNRESET"

const PUTS_IT_UP = "`akasha deploy service-workstation` puts that service up"

const UNJUDGED = "so no check was judged"

const NO_PORT = `no page states the port a round of the audit service is asked for on, ${UNJUDGED}`

export type Sending = RequestInit & { readonly timeout?: boolean }

export type Fetcher = (url: string, init: Sending) => Promise<Response>

export type Sleeper = (waited: number) => Promise<void>

export type Answered = { readonly ran: readonly Ran[] } | { readonly refused: string }

export function originOf(port: number): string {
  return `${LOOPBACK}:${port}${ROUND_AT}`
}

export function connectionRefused(thrown: unknown): boolean {
  if (thrown === null || typeof thrown !== "object") return false
  return (thrown as { readonly code?: unknown }).code === REFUSED_CONNECTION
}

export function connectionClosed(thrown: unknown): boolean {
  if (thrown === null || typeof thrown !== "object") return false
  return (thrown as { readonly code?: unknown }).code === CLOSED_CONNECTION
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

export function keptClosing(at: string, closed: number): string {
  return (
    `the round asked for at \`${at}\` broke off ${closed} times, the audit service having ` +
    `gone down under it each time, ${UNJUDGED} — a deploy restarts that service and a round ` +
    "runs for minutes, so ask for a round again"
  )
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
  commit: string,
  fetcher: Fetcher = fetchThrough,
  naps: Sleeper = sleep
): Promise<Answered> {
  const port = portFor(root, SERVICE_SLUG)
  if (port === null) return { refused: NO_PORT }
  const at = originOf(port)
  let taken = 1
  let closed = 0
  for (;;) {
    try {
      const answered = await fetcher(at, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ checks, commit }),
        signal: AbortSignal.timeout(WORKING_MS),
        timeout: false,
      })
      return ranIn(await answered.json())
    } catch (thrown) {
      if (connectionClosed(thrown)) {
        closed += 1
        if (closed > RESTARTS) return { refused: keptClosing(at, closed) }
        taken = 1
        await naps(SETTLING_MS)
        continue
      }
      if (!connectionRefused(thrown)) return { refused: brokeOff(at, thrown) }
      if (taken >= ATTEMPTS) return { refused: notAnswering(at) }
      await naps(WAITED_MS * taken)
      taken += 1
    }
  }
}
