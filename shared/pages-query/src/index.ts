import { z } from "zod"

import { AnswerSchema, type QueryAnswer } from "./answer-schema.ts"
import { openedRows } from "./opened.ts"
import { pagesFetcher } from "./fetcher.ts"
import { backoffFor, type Sleeper, sleep, WRITE_ATTEMPTS, worthRetrying } from "./retry.ts"
import { inATestRun } from "./test-run.ts"

export const PAGE_QUERY_ORIGIN =
  "http://page-query-service.page-query-service.svc.cluster.local:8787"

export const PAGE_QUERY_BROWSER_PREFIX = "/api"

const BrowserGlobalSchema = z.object({ location: z.object({ origin: z.string() }) })

function browserOrigin(): string | null {
  const held = BrowserGlobalSchema.safeParse(globalThis)
  if (!held.success) return null
  const origin = held.data.location.origin
  if (origin === "" || origin === "null") return null
  return origin
}

const STATED_ORIGIN = z.string().optional()

function statedOrigin(): string | undefined {
  if (typeof process === "undefined") return undefined
  return STATED_ORIGIN.parse(process.env?.PAGE_QUERY_ORIGIN)
}

const NATIVE_FETCH: unknown = typeof fetch === "function" ? fetch : null

function isNativeFetch(candidate: unknown): boolean {
  return candidate === NATIVE_FETCH
}

function writingLiveFromATest(fetcher: Fetcher): boolean {
  if (typeof Bun === "undefined") return false
  if (statedOrigin() !== undefined) return false
  if (!inATestRun()) return false
  return isNativeFetch(fetcher)
}

export function pageQueryOrigin(): string {
  const stated = statedOrigin()
  if (stated !== undefined && stated.trim() !== "") return stated.trim().replace(/\/+$/, "")
  const origin = browserOrigin()
  if (origin !== null) return `${origin}${PAGE_QUERY_BROWSER_PREFIX}`
  return PAGE_QUERY_ORIGIN
}

export const ASK_CEILING_MS = 5_000

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Read<T> =
  | { readonly ok: true; readonly body: T }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export async function readFromPageQueryService(
  url: string,
  what: string,
  fetcher: Fetcher = pagesFetcher()
): Promise<Read<unknown>> {
  let response: Response
  try {
    response = await fetcher(url, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(ASK_CEILING_MS),
    })
  } catch (cause) {
    return {
      ok: false,
      why: `\`${what}\` went unasked: ${url} gave no answer within ${ASK_CEILING_MS}ms (${String(cause)})`,
    }
  }
  if (!response.ok) {
    return {
      ok: false,
      why: `\`${what}\` went unanswered: the page query service replied ${response.status}${await refusalIn(response)}`,
      status: response.status,
    }
  }
  try {
    return { ok: true, body: await response.json() }
  } catch (cause) {
    return { ok: false, why: `\`${what}\` replied with what is not JSON (${String(cause)})` }
  }
}

export async function refusalIn(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (typeof body !== "object" || body === null || !("error" in body)) return ""
    return `: ${String(body.error)}`
  } catch {
    return ""
  }
}


export type Asked =
  | { readonly ok: true; readonly answer: QueryAnswer }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Given = Readonly<Record<string, string | readonly string[]>>

function takingUrl(slug: string, given: Given): string {
  const params = new URLSearchParams()
  for (const [name, held] of Object.entries(given)) {
    if (typeof held === "string") params.append(name, held)
    else for (const one of held) params.append(name, one)
  }
  const stated = params.toString()
  return `${pageQueryOrigin()}/q/${slug}${stated === "" ? "" : `?${stated}`}`
}

export async function askNamed(
  slug: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  return askTaking(slug, {}, fetcher, naps)
}

export async function askTaking(
  slug: string,
  given: Given,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  const url = takingUrl(slug, given)
  let read = await readFromPageQueryService(url, slug, fetcher)
  for (
    let round = 1;
    round < WRITE_ATTEMPTS && !read.ok && worthRetrying(read.status);
    round += 1
  ) {
    await naps(backoffFor(round))
    read = await readFromPageQueryService(url, slug, fetcher)
  }
  if (!read.ok) return read
  const parsed = AnswerSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `\`${slug}\` replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  const answer = parsed.data
  return { ok: true, answer: { ...answer, rows: [...openedRows(answer.rows)] } }
}

export const WRITE_CEILING_MS = 30_000


export type Value = string | number | boolean | readonly string[]

const WrittenSchema = z.object({ ok: z.literal(true), at: z.string() })

export type Written =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string; readonly status?: number }

type WriteAct =
  | "write"
  | "patch"
  | "patch-if"
  | "patch-state"
  | "remove"
  | "write-row"
  | "patch-row"
  | "remove-row"

function writeUrl(act: WriteAct, pageType: string, name: string): string {
  const safeName = name.split("/").map(encodeURIComponent).join("/")
  return `${pageQueryOrigin()}/${act}/${encodeURIComponent(pageType)}/${safeName}`
}

function refuseALiveTestWrite(act: WriteAct, pageType: string, name: string): undefined {
  throw new Error(
    `@shared/pages-query: a test asked to ${act} ${pageType}/${name} against the live page query service, which would land in Alan's real repositories. Nothing states PAGE_QUERY_ORIGIN and no fetcher was supplied. Mock @shared/pages-query, pass a fetcher, or state PAGE_QUERY_ORIGIN.`
  )
}

async function attemptWrite(
  act: WriteAct,
  pageType: string,
  name: string,
  body: Readonly<Record<string, unknown>>,
  fetcher: Fetcher
): Promise<Written> {
  const what = `${act} ${pageType}/${name}`
  if (writingLiveFromATest(fetcher)) refuseALiveTestWrite(act, pageType, name)
  const url = writeUrl(act, pageType, name)
  let response: Response
  try {
    response = await fetcher(url, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(WRITE_CEILING_MS),
    })
  } catch (cause) {
    return {
      ok: false,
      why: `\`${what}\` never landed: ${url} gave no answer within ${WRITE_CEILING_MS}ms (${String(cause)})`,
    }
  }
  if (!response.ok) {
    let named = ""
    try {
      const refusal: unknown = await response.json()
      if (typeof refusal === "object" && refusal !== null && "error" in refusal) {
        named = `: ${String(refusal.error)}`
      }
    } catch {
      named = ""
    }
    return {
      ok: false,
      why: `\`${what}\` was refused: the page query service replied ${response.status}${named}`,
      status: response.status,
    }
  }
  let parsed: unknown
  try {
    parsed = await response.json()
  } catch (cause) {
    return { ok: false, why: `\`${what}\` replied with what is not JSON (${String(cause)})` }
  }
  const read = WrittenSchema.safeParse(parsed)
  if (!read.success) {
    return {
      ok: false,
      why: `\`${what}\` replied in a shape this writer cannot read: ${read.error.message}`,
    }
  }
  return { ok: true, at: read.data.at }
}

async function writtenBy(
  act: WriteAct,
  pageType: string,
  name: string,
  body: Readonly<Record<string, unknown>>,
  fetcher: Fetcher,
  rest: Sleeper = sleep
): Promise<Written> {
  let last: Written = { ok: false, why: `${act} ${pageType}/${name} was never attempted` }
  for (let attempt = 1; attempt <= WRITE_ATTEMPTS; attempt += 1) {
    last = await attemptWrite(act, pageType, name, body, fetcher)
    if (last.ok) return last
    if (!worthRetrying(last.status)) return last
    if (attempt === WRITE_ATTEMPTS) break
    await rest(backoffFor(attempt))
  }
  return {
    ...last,
    why: `${last.why} — this was attempt ${WRITE_ATTEMPTS} of ${WRITE_ATTEMPTS}; the write did not land and nothing holds it but this caller`,
  }
}

export async function writePage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("write", pageType, name, { writer, values }, fetcher, rest)
}

export async function patchPage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, Value>>,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("patch", pageType, name, { writer, values }, fetcher, rest)
}

const LostSchema = z.object({
  outcome: z.literal("lost"),
  key: z.string(),
  expected: z.string(),
  found: z.string(),
  error: z.string(),
})

export type Compared =
  | { readonly outcome: "won"; readonly at: string }
  | {
      readonly outcome: "lost"
      readonly key: string
      readonly expected: string
      readonly found: string
      readonly why: string
    }
  | { readonly outcome: "absent"; readonly why: string }
  | { readonly outcome: "failed"; readonly why: string; readonly status?: number }

type Failed = Extract<Compared, { outcome: "failed" }>

function errorIn(body: unknown): string {
  if (typeof body !== "object" || body === null || !("error" in body)) return ""
  return `: ${String(body.error)}`
}

async function comparedOnce(
  pageType: string,
  name: string,
  body: Readonly<Record<string, unknown>>,
  fetcher: Fetcher
): Promise<Compared> {
  const what = `patch-if ${pageType}/${name}`
  if (writingLiveFromATest(fetcher)) refuseALiveTestWrite("patch-if", pageType, name)
  const url = writeUrl("patch-if", pageType, name)
  let response: Response
  try {
    response = await fetcher(url, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(WRITE_CEILING_MS),
    })
  } catch (cause) {
    return {
      outcome: "failed",
      why: `\`${what}\` never compared: ${url} gave no answer within ${WRITE_CEILING_MS}ms (${String(cause)})`,
    }
  }
  let parsed: unknown
  try {
    parsed = await response.json()
  } catch (cause) {
    return {
      outcome: "failed",
      why: `\`${what}\` replied with what is not JSON (${String(cause)})`,
      status: response.status,
    }
  }
  if (response.status === 409) {
    const lost = LostSchema.safeParse(parsed)
    if (!lost.success) {
      return {
        outcome: "failed",
        why: `\`${what}\` lost its compare but did not say against what, so nothing states what beat it: ${lost.error.message}`,
        status: 409,
      }
    }
    const { key, expected, found, error } = lost.data
    return { outcome: "lost", key, expected, found, why: error }
  }
  if (response.status === 404) {
    return { outcome: "absent", why: `\`${what}\` compared nothing${errorIn(parsed)}` }
  }
  if (!response.ok) {
    return {
      outcome: "failed",
      why: `\`${what}\` was refused: the page query service replied ${response.status}${errorIn(parsed)}`,
      status: response.status,
    }
  }
  const read = WrittenSchema.safeParse(parsed)
  if (!read.success) {
    return {
      outcome: "failed",
      why: `\`${what}\` replied in a shape this writer cannot read: ${read.error.message}`,
    }
  }
  return { outcome: "won", at: read.data.at }
}

export async function patchPageIfMatch(
  pageType: string,
  name: string,
  key: string,
  expected: string | null,
  values: Readonly<Record<string, Value>>,
  writer: string,
  clear: readonly string[] = [],
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Compared> {
  const body = {
    writer,
    values,
    "if-key": key,
    ...(expected === null ? { "if-empty": true } : { "if-value": expected }),
    ...(clear.length > 0 ? { clear } : {}),
  }
  let last: Failed = {
    outcome: "failed",
    why: `patch-if ${pageType}/${name} was never attempted`,
  }
  for (let attempt = 1; attempt <= WRITE_ATTEMPTS; attempt += 1) {
    const done = await comparedOnce(pageType, name, body, fetcher)
    if (done.outcome !== "failed") return done
    last = done
    if (!worthRetrying(done.status)) return done
    if (attempt === WRITE_ATTEMPTS) break
    await rest(backoffFor(attempt))
  }
  return {
    ...last,
    why: `${last.why} — this was attempt ${WRITE_ATTEMPTS} of ${WRITE_ATTEMPTS}; nothing was compared and nothing landed`,
  }
}

export async function patchState(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("patch-state", pageType, name, { writer, values }, fetcher, rest)
}

export async function writeRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("write-row", pageType, parentName, { writer, values }, fetcher, rest)
}

export async function patchRow(
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("patch-row", pageType, parentName, { writer, values }, fetcher, rest)
}

export async function writeRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("write-row", pageType, parentName, { writer, rows }, fetcher, rest)
}

export async function patchRows(
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("patch-row", pageType, parentName, { writer, rows }, fetcher, rest)
}

export async function removeRow(
  pageType: string,
  parentName: string,
  named: string,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("remove-row", pageType, parentName, { writer, named }, fetcher, rest)
}

export async function removePage(
  pageType: string,
  name: string,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  return writtenBy("remove", pageType, name, { writer }, fetcher, rest)
}
