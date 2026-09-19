import type { Told } from "akasha/check/modules/audit-serving/audit-serving.module.code.ts"
import {
  bindsFor,
  portFor,
  SERVICE_PAGE_TYPE,
} from "akasha/infrastructure/service/workstation/modules/service-binding/service-binding.module.code.ts"

export const SERVICE_SLUG = "audit-running"

export const ROUND_AT = "/round"

const JSON_SAID = "application/json"

export type Asked = { readonly checks: readonly string[] } | { readonly refused: string }

export function askedIn(given: unknown): Asked {
  if (given === null || typeof given !== "object" || Array.isArray(given)) {
    return { refused: "a round is asked for by a JSON object" }
  }
  const held = (given as { readonly checks?: unknown }).checks
  if (held === undefined) return { checks: [] }
  if (!Array.isArray(held) || held.some((one) => typeof one !== "string")) {
    return { refused: "a round names the checks it asks for as `checks`, a list of slugs" }
  }
  return { checks: held as readonly string[] }
}

export type Rounding = (checks: readonly string[]) => Promise<Told>

function said(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": JSON_SAID } })
}

const UNREAD = Symbol("unread")

export async function answering(request: Request, round: Rounding): Promise<Response> {
  const at = new URL(request.url).pathname
  if (at !== ROUND_AT) return said({ refused: `nothing is asked at ${at}` }, 404)
  if (request.method !== "POST") {
    return said({ refused: `a round is asked for by POST rather than by ${request.method}` }, 405)
  }
  const body: unknown = await request.json().catch(() => UNREAD)
  if (body === UNREAD) return said({ refused: "the body did not parse as JSON" }, 400)
  const sought = askedIn(body)
  if ("refused" in sought) return said({ refused: sought.refused }, 400)
  return said(await round(sought.checks), 200)
}

export function runAuditListening(root: string, round: Rounding): undefined {
  const port = portFor(root, SERVICE_SLUG)
  if (port === null) {
    throw new Error(
      `the \`${SERVICE_PAGE_TYPE}\` slugged \`${SERVICE_SLUG}\` states no port to listen on`
    )
  }
  const bound = bindsFor(root, SERVICE_SLUG).map(
    (hostname) =>
      Bun.serve({ port, hostname, fetch: (request) => answering(request, round) }).url.href
  )
  process.stdout.write(`a round of the audit is asked for at ${bound.join(" ")}\n`)
}
