import { z } from "zod"
import { AnswerSchema } from "./answer-schema.ts"
import {
  ASK_CEILING_MS,
  type Asked,
  type Fetcher,
  pageQueryOrigin,
  type Read,
  readFromPageQueryService,
  refusalIn,
} from "./index.ts"
import { pagesFetcher } from "./fetcher.ts"
import { openedRows, openedValues } from "./opened.ts"
import { backoffFor, type Sleeper, sleep, WRITE_ATTEMPTS, worthRetrying } from "./retry.ts"

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
  fetcher: Fetcher = pagesFetcher(),
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

const ABSENT = 404

export type PageAsked =
  | { readonly outcome: "found"; readonly page: WholePage }
  | { readonly outcome: "absent"; readonly why: string }
  | { readonly outcome: "unasked"; readonly why: string; readonly status?: number }

export async function askPage(
  pageType: string,
  name: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<PageAsked> {
  const safeName = name.split("/").map(encodeURIComponent).join("/")
  const what = `${pageType}/${name}`
  const url = `${pageQueryOrigin()}/page/${encodeURIComponent(pageType)}/${safeName}`
  const read = await asking((one) => readFromPageQueryService(url, what, one), fetcher, naps)
  if (!read.ok) {
    if (read.status === ABSENT) {
      return {
        outcome: "absent",
        why: `\`${what}\`: the corpus was read and holds no page under that name — ${read.why}`,
      }
    }
    return {
      outcome: "unasked",
      why: read.why,
      ...(read.status === undefined ? {} : { status: read.status }),
    }
  }
  const parsed = WholeSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      outcome: "unasked",
      why: `\`${what}\` replied in a shape this reader cannot read, so nothing here saw whether that page stands: ${parsed.error.message}`,
    }
  }
  const page = parsed.data
  return { outcome: "found", page: { ...page, values: openedValues(page.values) } }
}

const NamingSchema = z.object({
  key: z.string(),
  name: z.string(),
  n: z.number(),
  naming: z
    .array(
      z.object({
        pageType: z.string(),
        key: z.string(),
        rows: z
          .array(z.object({ at: z.string().optional(), values: z.record(z.string(), z.unknown()) }))
          .default([]),
      })
    )
    .default([]),
})

export type Naming = z.infer<typeof NamingSchema>["naming"][number]

export type NamingAsked =
  | { readonly ok: true; readonly naming: readonly Naming[] }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type NamingAsk = {
  readonly key: string
  readonly name: string
  readonly pageTypes?: readonly string[]
  readonly limit?: number
}

export async function askNaming(
  ask: NamingAsk,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<NamingAsked> {
  const safeName = ask.name.split("/").map(encodeURIComponent).join("/")
  const what = `the pages naming \`${ask.name}\` through \`${ask.key}\``
  const asked = new URLSearchParams()
  if (ask.pageTypes !== undefined) asked.set("page-types", ask.pageTypes.join(","))
  if (ask.limit !== undefined) asked.set("limit", String(ask.limit))
  const query = asked.toString()
  const url = `${pageQueryOrigin()}/naming/${encodeURIComponent(ask.key)}/${safeName}${query === "" ? "" : `?${query}`}`
  const read = await asking((one) => readFromPageQueryService(url, what, one), fetcher, naps)
  if (!read.ok) return read
  const parsed = NamingSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `${what} replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  return {
    ok: true,
    naming: parsed.data.naming.map((one) => ({ ...one, rows: [...openedRows(one.rows)] })),
  }
}

const DeclarationSchema = z.object({
  key: z.string(),
  type: z.string(),
  title: z.string(),
  pageId: z.string(),
  on: z.string(),
  values: z.unknown().default(null),
  targetSlug: z.string().nullable().default(null),
  slugProperty: z.string().nullable().default(null),
  mayBeGone: z.boolean().default(false),
})

const ShapeSchema = z.object({
  pageType: z.string(),
  pageTypeId: z.string(),
  ownerSlug: z.string().nullable().default(null),
  declarations: z.array(DeclarationSchema).default([]),
})

export type Declaration = z.infer<typeof DeclarationSchema>

export type PageTypeShape = z.infer<typeof ShapeSchema>

export type ShapeAsked =
  | { readonly ok: true; readonly shape: PageTypeShape }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export async function askShape(
  pageType: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<ShapeAsked> {
  const what = `the shape of \`${pageType}\``
  const url = `${pageQueryOrigin()}/shape/${encodeURIComponent(pageType)}`
  const read = await asking((one) => readFromPageQueryService(url, what, one), fetcher, naps)
  if (!read.ok) return read
  const parsed = ShapeSchema.safeParse(read.body)
  if (!parsed.success) {
    return {
      ok: false,
      why: `${what} replied in a shape this reader cannot read: ${parsed.error.message}`,
    }
  }
  return { ok: true, shape: parsed.data }
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
  fetcher: Fetcher = pagesFetcher(),
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
