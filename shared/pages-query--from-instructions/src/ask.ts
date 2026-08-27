import { z } from "zod"
import { AnswerSchema } from "./answer-schema"
import {
  ASK_CEILING_MS,
  type Asked,
  type Fetcher,
  pageQueryOrigin,
  type Read,
  readFromPageQueryService,
  refusalIn,
} from "./index"
import { openedRows, openedValues } from "./opened"
import { backoffFor, type Sleeper, sleep, WRITE_ATTEMPTS, worthRetrying } from "./retry"

export const ASK_ATTEMPTS = WRITE_ATTEMPTS

type Answered = { readonly ok: boolean; readonly status?: number }

async function asking<T extends Answered>(
  attempt: (fetcher: Fetcher) => Promise<T>,
  fetcher: Fetcher,
  naps: Sleeper
): Promise<T> {
  let held = await attempt(fetcher)
  for (let round = 1; round < ASK_ATTEMPTS && !held.ok && worthRetrying(held.status); round += 1) {
    await naps(backoffFor(round))
    held = await attempt(fetcher)
  }
  return held
}


export type ComposedQuery = {
  readonly "page-type": string
  readonly where?: Readonly<Record<string, unknown>>
  readonly "count-by"?: readonly string[]
  readonly keys?: readonly string[]
  readonly "sort-by"?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
  readonly function?: "sum" | "mean"
  readonly target?: string
}

async function postToPageQueryService(
  url: string,
  what: string,
  body: unknown,
  fetcher: Fetcher
): Promise<Read<unknown>> {
  let response: Response
  try {
    response = await fetcher(url, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify(body),
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

export async function askComposed(
  query: ComposedQuery,
  fetcher: Fetcher = fetch,
  naps: Sleeper = sleep
): Promise<Asked> {
  const what = `a composed query over \`${query["page-type"]}\``
  const posted = await asking(
    (one) => postToPageQueryService(`${pageQueryOrigin()}/q`, what, query, one),
    fetcher,
    naps
  )
  if (!posted.ok) return posted
  const parsed = AnswerSchema.safeParse(posted.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `${what} replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  const answer = parsed.data
  return { ok: true, answer: { ...answer, rows: [...openedRows(answer.rows)] } }
}

const NamedSchema = z.object({
  pageType: z.string(),
  name: z.string(),
  title: z.string().nullable(),
  at: z.string().nullable(),
})

const WholeSchema = z.object({
  pageType: z.string(),
  name: z.string(),
  at: z.string(),
  values: z.record(z.string(), z.unknown()),
  relations: z.record(z.string(), z.array(NamedSchema)).default({}),
})

export type WholePage = z.infer<typeof WholeSchema>

export type PageAsked =
  | { readonly ok: true; readonly page: WholePage }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export async function askPage(
  pageType: string,
  name: string,
  fetcher: Fetcher = fetch,
  naps: Sleeper = sleep
): Promise<PageAsked> {
  const safeName = name.split("/").map(encodeURIComponent).join("/")
  const what = `${pageType}/${name}`
  const url = `${pageQueryOrigin()}/page/${encodeURIComponent(pageType)}/${safeName}`
  const read = await asking((one) => readFromPageQueryService(url, what, one), fetcher, naps)
  if (!read.ok) return read
  const parsed = WholeSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `\`${what}\` replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  const page = parsed.data
  return { ok: true, page: { ...page, values: openedValues(page.values) } }
}

const BackedSchema = z.object({
  slug: z.string(),
  repo: z.string().nullable(),
  glob: z.string().nullable(),
  heldBy: z.array(z.string()).default([]),
  namedFor: z.string().nullable().default(null),
})

const RosterSchema = z.object({ types: z.array(BackedSchema) })

export type Backed = z.infer<typeof BackedSchema>

export type RosterAsked =
  | { readonly ok: true; readonly types: readonly Backed[] }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export async function askPageTypes(
  fetcher: Fetcher = fetch,
  naps: Sleeper = sleep
): Promise<RosterAsked> {
  const what = "the file-backed page types"
  const read = await asking(
    (one) => readFromPageQueryService(`${pageQueryOrigin()}/page-types`, what, one),
    fetcher,
    naps
  )
  if (!read.ok) return read
  const parsed = RosterSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `${what} replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  return { ok: true, types: parsed.data.types }
}
