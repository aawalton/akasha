import { z } from "zod"
import { forceRefresh, getOAuthAccessToken } from "../auth/spotify-auth.module.code.ts"
import { fetchSpotify } from "../fetching/spotify-fetching.module.code.ts"

const BASE_URL = "https://api.spotify.com/v1"

const DEFAULT_RATE_LIMIT_MS = 100

const DEFAULT_RETRY_AFTER_MS = 1000

const MAX_RETRY_AFTER_MS = 60_000

const MAX_AUTH_RETRIES = 1

const MAX_RATE_LIMIT_RETRIES = 1

export function resolveRateLimitMs(raw: string | undefined): number {
  if (raw === undefined) return DEFAULT_RATE_LIMIT_MS
  const parsed = Number(raw)
  if (!Number.isInteger(parsed) || parsed <= 0) return DEFAULT_RATE_LIMIT_MS
  return parsed
}

export function rateLimitMs(): number {
  return resolveRateLimitMs(process.env.SPOTIFY_RATE_LIMIT_MS)
}

export function retryAfterMs(header: string | null): number {
  const parsed = Number.parseFloat(header ?? "")
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_RETRY_AFTER_MS
  return parsed * 1000
}

function waiting(ms: number): Promise<void> {
  return new Promise((settle) => {
    setTimeout(settle, ms)
  })
}

function paced(): Promise<void> {
  return waiting(rateLimitMs())
}

let pending: Promise<unknown> = Promise.resolve()

function enqueue<T>(run: () => Promise<T>): Promise<T> {
  const result = pending.then(run)
  pending = result.then(paced, paced)
  return result
}

export type RequestOptions = {
  readonly method?: string
  readonly body?: unknown
  readonly rawContentType?: string
}

type RawResponse = {
  readonly status: number
  readonly headers: Headers
  readonly url: string
  readonly statusText: string
  readonly json: unknown
  readonly errorBody: string | undefined
}

export function resolveUrl(endpointOrUrl: string): string {
  if (endpointOrUrl.startsWith("http://") || endpointOrUrl.startsWith("https://")) {
    return endpointOrUrl
  }
  return `${BASE_URL}${endpointOrUrl}`
}

async function performRequest(url: string, options?: RequestOptions): Promise<RawResponse> {
  const token = await getOAuthAccessToken()
  const method = options?.method ?? "GET"
  const hasBody = options?.body !== undefined
  const rawContentType = options?.rawContentType
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    ...(hasBody && { "Content-Type": rawContentType ?? "application/json" }),
  }
  const body = hasBody
    ? rawContentType !== undefined
      ? String(options?.body)
      : JSON.stringify(options?.body)
    : undefined
  const response = await fetchSpotify(url, { method, headers, ...(hasBody && { body }) })
  return {
    status: response.status,
    headers: response.headers,
    url,
    statusText: response.statusText,
    json: response.ok ? await response.json().catch(() => null) : undefined,
    errorBody: response.ok ? undefined : await response.text(),
  }
}

export async function spotifyRequest<T extends z.ZodTypeAny>(
  endpointOrUrl: string,
  shape: T,
  options?: RequestOptions,
  authRetries = 0,
  rateLimitRetries = 0
): Promise<z.infer<T>> {
  const url = resolveUrl(endpointOrUrl)
  const result = await enqueue(() => performRequest(url, options))

  if (result.status === 429) {
    const waitMs = retryAfterMs(result.headers.get("Retry-After"))
    const seconds = waitMs / 1000
    if (waitMs > MAX_RETRY_AFTER_MS) {
      throw new Error(
        `spotify API 429 rate limited — the server asked for Retry-After ${seconds}s, ` +
          `over the ${MAX_RETRY_AFTER_MS / 1000}s cap, so it refuses to block.\nURL: ${result.url}`
      )
    }
    if (rateLimitRetries >= MAX_RATE_LIMIT_RETRIES) {
      throw new Error(
        `spotify API 429 rate limited — ${MAX_RATE_LIMIT_RETRIES} retry is all it takes ` +
          `(the last Retry-After was ${seconds}s).\nURL: ${result.url}`
      )
    }
    await waiting(waitMs)
    return spotifyRequest(endpointOrUrl, shape, options, authRetries, rateLimitRetries + 1)
  }

  if (result.status === 401 && authRetries < MAX_AUTH_RETRIES) {
    await forceRefresh()
    return spotifyRequest(endpointOrUrl, shape, options, authRetries + 1)
  }

  if (result.json === undefined) {
    throw new Error(
      `spotify API ${result.status} ${result.statusText}\nURL: ${result.url}\nBody: ${result.errorBody}`
    )
  }

  return shape.parse(result.json)
}

export function spotifyGet<T extends z.ZodTypeAny>(
  endpointOrUrl: string,
  shape: T
): Promise<z.infer<T>> {
  return spotifyRequest(endpointOrUrl, shape)
}

export type OffsetPage<TItem> = {
  readonly items: readonly TItem[]
  readonly total: number
  readonly limit: number
  readonly offset: number
  readonly next: string | null
  readonly previous: string | null
}

export type CursorPage<TItem> = {
  readonly items: readonly TItem[]
  readonly limit: number
  readonly next: string | null
  readonly cursors: { after?: string | null; before?: string | null } | null
}

export function offsetPageSchema<TItem extends z.ZodTypeAny>(
  item: TItem
): z.ZodType<OffsetPage<z.infer<TItem>>> {
  return z
    .object({
      items: z.array(item),
      total: z.number(),
      limit: z.number(),
      offset: z.number(),
      next: z.string().nullable(),
      previous: z.string().nullable(),
    })
    .passthrough()
}

export function cursorPageSchema<TItem extends z.ZodTypeAny>(
  item: TItem
): z.ZodType<CursorPage<z.infer<TItem>>> {
  return z
    .object({
      items: z.array(item),
      limit: z.number(),
      next: z.string().nullable(),
      cursors: z
        .object({
          after: z.string().nullable().optional(),
          before: z.string().nullable().optional(),
        })
        .passthrough()
        .nullable(),
    })
    .passthrough()
}

export type PaginateOptions = {
  readonly max?: number
}

export async function paginateOffset<TItem extends z.ZodTypeAny>(
  firstPath: string,
  item: TItem,
  options: PaginateOptions = {}
): Promise<z.infer<TItem>[]> {
  const shape = offsetPageSchema(item)
  const all: z.infer<TItem>[] = []
  let next: string | null = firstPath
  while (next != null) {
    const page: OffsetPage<z.infer<TItem>> = await spotifyRequest(next, shape)
    all.push(...page.items)
    if (options.max !== undefined && all.length >= options.max) {
      return all.slice(0, options.max)
    }
    next = page.next
  }
  return all
}

export async function paginateCursor<TItem extends z.ZodTypeAny>(
  firstPath: string,
  item: TItem
): Promise<z.infer<TItem>[]> {
  const shape = cursorPageSchema(item)
  const all: z.infer<TItem>[] = []
  let next: string | null = firstPath
  while (next != null) {
    const page: CursorPage<z.infer<TItem>> = await spotifyRequest(next, shape)
    all.push(...page.items)
    next = page.next
  }
  return all
}
