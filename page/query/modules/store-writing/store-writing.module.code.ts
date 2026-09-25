import {
  ASK_CEILING_MS,
  pagesFetcher,
  postingTo,
  sleep,
  WRITE_CEILING_MS,
} from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"

type Fetcher = (url: string, init: RequestInit) => Promise<Response>

type Sleeper = (ms: number) => Promise<void>

type Written =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Put = { readonly path: string; readonly content: string }

type Body = { readonly path: string; readonly content: string | null }

type Named = { readonly pageTypeSlug: string; readonly slug: string }

type Read = {
  readonly at: string
  readonly bodies: readonly Body[]
  readonly unplaced: readonly string[]
}

export type Found =
  | ({ readonly ok: true } & Read)
  | { readonly ok: false; readonly why: string; readonly status?: number }

const WRITER_SHAPE = /^[^<>]+<[^<>@\s]+@[^<>@\s]+>$/

function commitIn(body: unknown): { at: string | null; wrote: readonly string[] } | null {
  if (typeof body !== "object" || body === null) return null
  if (!("commit" in body) || !("wrote" in body)) return null
  const at = (body as { commit: unknown }).commit
  const wrote = (body as { wrote: unknown }).wrote
  if (at !== null && typeof at !== "string") return null
  if (!Array.isArray(wrote)) return null
  return { at, wrote: wrote.map((one) => String(one)) }
}

async function landing(
  what: string,
  body: Readonly<Record<string, unknown>>,
  writer: string,
  fetcher: Fetcher,
  rest: Sleeper
): Promise<Written> {
  if (!WRITER_SHAPE.test(writer)) {
    return {
      ok: false,
      why: `\`${what}\` names its writer as \`${writer}\`, and the store takes a name and an address, as \`Amy <amy@alanwalton.com>\``,
    }
  }
  const reached = await postingTo("/write", what, body, fetcher, WRITE_CEILING_MS, rest)
  if (!reached.ok) return reached
  const read = commitIn(reached.body)
  if (read === null) {
    return { ok: false, why: `\`${what}\` answered in a shape this writer cannot read` }
  }
  if (read.at === null) {
    return { ok: false, why: `\`${what}\` changed nothing, so nothing was committed` }
  }
  return { ok: true, at: read.at }
}

export async function writeFiles(
  puts: readonly Put[],
  writer: string,
  message: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep,
  read: string | null = null,
  writtenBy: string | null = null
): Promise<Written> {
  if (puts.length === 0) return { ok: false, why: "a write carries at least one path" }
  const what = `a write of ${puts.map((one) => one.path).join(", ")}`
  const body = {
    writer,
    message,
    puts: [...puts],
    ...(read === null ? {} : { read }),
    ...(writtenBy === null ? {} : { writtenBy }),
  }
  return landing(what, body, writer, fetcher, rest)
}

type Naming = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: Readonly<Record<string, unknown>>
  readonly merge?: boolean
  readonly fresh?: boolean
}

export async function writePages(
  pages: readonly Naming[],
  writer: string,
  message: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep,
  read: string | null = null
): Promise<Written> {
  if (pages.length === 0) return { ok: false, why: "a write carries at least one page" }
  const what = `a write of ${pages.map((one) => `${one.pageTypeSlug}/${one.slug}`).join(", ")}`
  const body =
    read === null
      ? { writer, message, pages: [...pages] }
      : { writer, message, pages: [...pages], read }
  return landing(what, body, writer, fetcher, rest)
}

function bodiesIn(body: unknown): Read | null {
  if (typeof body !== "object" || body === null) return null
  const held = body as { at?: unknown; bodies?: unknown; unplaced?: unknown }
  if (typeof held.at !== "string" || !Array.isArray(held.bodies)) return null
  const bodies: Body[] = []
  for (const one of held.bodies) {
    if (typeof one !== "object" || one === null) return null
    const each = one as { path?: unknown; content?: unknown }
    if (typeof each.path !== "string") return null
    if (each.content !== null && typeof each.content !== "string") return null
    bodies.push({ path: each.path, content: each.content })
  }
  const unplaced = Array.isArray(held.unplaced) ? held.unplaced.map((one) => String(one)) : []
  return { at: held.at, bodies, unplaced }
}

async function finding(
  what: string,
  body: Readonly<Record<string, unknown>>,
  fetcher: Fetcher,
  rest: Sleeper
): Promise<Found> {
  const reached = await postingTo("/read", what, body, fetcher, ASK_CEILING_MS, rest)
  if (!reached.ok) return reached
  const held = bodiesIn(reached.body)
  if (held === null) {
    return { ok: false, why: `\`${what}\` answered in a shape this reader cannot read` }
  }
  return { ok: true, ...held }
}

export async function readFiles(
  paths: readonly string[],
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Found> {
  if (paths.length === 0) return { ok: false, why: "a read carries at least one path" }
  return finding(`a read of ${paths.join(", ")}`, { paths: [...paths] }, fetcher, rest)
}

export async function readPages(
  pages: readonly Named[],
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Found> {
  if (pages.length === 0) return { ok: false, why: "a read carries at least one page" }
  const what = `a read of ${pages.map((one) => `${one.pageTypeSlug}/${one.slug}`).join(", ")}`
  return finding(what, { pages: [...pages] }, fetcher, rest)
}
