import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { z } from "zod"

export type SupabaseServiceRoleClient = SupabaseClient

export type CreateServiceRoleClientOptions = {
  url?: string
  serviceRoleKey?: string
  requestTimeoutMs?: number
}

export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>

export function makeTimeoutFetch(timeoutMs: number, baseFetch: FetchLike = fetch): FetchLike {
  return (input, init) => {
    const timeoutSignal = AbortSignal.timeout(timeoutMs)
    const signal =
      init?.signal != null ? AbortSignal.any([init.signal, timeoutSignal]) : timeoutSignal
    return baseFetch(input, { ...init, signal })
  }
}

export const ERROR_BODY_SUMMARY_CHARS = 200

export function makeErrorBodySummaryFetch(baseFetch: FetchLike): FetchLike {
  return async (input, init) => {
    const res = await baseFetch(input, init)
    if (res.ok) return res
    const contentType = res.headers.get("content-type") ?? ""
    if (contentType.toLowerCase().includes("json")) return res
    const raw = await res.text().catch(() => "")
    const headers = new Headers(res.headers)
    headers.delete("content-length")
    headers.delete("content-encoding")
    headers.delete("transfer-encoding")
    if (raw === "") {
      return new Response(null, { status: res.status, statusText: res.statusText, headers })
    }
    const oneLine = raw.replace(/\s+/g, " ").trim()
    const summary = `HTTP ${res.status} ${contentType === "" ? "(no content-type)" : contentType} non-JSON body (${raw.length} chars, first ${ERROR_BODY_SUMMARY_CHARS}): ${oneLine.slice(0, ERROR_BODY_SUMMARY_CHARS)}`
    return new Response(summary, { status: res.status, statusText: res.statusText, headers })
  }
}

export function graftPreconnect(
  wrapped: FetchLike,
  baseFetch: FetchLike & { preconnect?: typeof fetch.preconnect } = fetch
): typeof fetch {
  const preconnect: typeof fetch.preconnect =
    typeof baseFetch.preconnect === "function" ? baseFetch.preconnect.bind(baseFetch) : () => {}
  return Object.assign(wrapped, { preconnect })
}

export function createServiceRoleClient(
  options: CreateServiceRoleClientOptions = {}
): SupabaseServiceRoleClient {
  const url = options.url ?? z.string().optional().parse(process.env.SUPABASE_URL)
  const serviceRoleKey =
    options.serviceRoleKey ?? z.string().optional().parse(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (url == null) {
    throw new Error("createServiceRoleClient: SUPABASE_URL is not set")
  }
  if (serviceRoleKey == null) {
    throw new Error("createServiceRoleClient: SUPABASE_SERVICE_ROLE_KEY is not set")
  }
  const requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS
  const timeoutFetch: typeof fetch = graftPreconnect(
    makeErrorBodySummaryFetch(makeTimeoutFetch(requestTimeoutMs))
  )
  const client = createClient(url, serviceRoleKey, {
    global: {
      fetch: timeoutFetch,
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    realtime: {
      logLevel: "info",
    },
  })
  void client.realtime.setAuth(serviceRoleKey)
  return client
}
