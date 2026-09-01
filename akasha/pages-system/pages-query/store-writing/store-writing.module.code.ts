import {
  pagesFetcher,
  postingTo,
  sleep,
  WRITE_CEILING_MS,
} from "../store-reaching/store-reaching.module.code.ts"

export type Fetcher = (url: string, init: RequestInit) => Promise<Response>

export type Sleeper = (ms: number) => Promise<void>

export type Given = Readonly<Record<string, string | readonly string[]>>

export type Value = string | number | boolean | readonly string[]

export type QueryRow = { readonly at?: string; readonly values: Record<string, unknown> }

export type QueryAnswer = {
  readonly n: number
  readonly value: number | null
  readonly over: number | null
  readonly rows: readonly QueryRow[]
  readonly faults: readonly string[]
  readonly omitted: readonly string[]
  readonly unfound: readonly string[]
}

export type Asked =
  | { readonly ok: true; readonly answer: QueryAnswer }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Written =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Put = { readonly path: string; readonly content: string }

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

const WRITER_SHAPE = /^[^<>]+<[^<>@\s]+@[^<>@\s]+>$/

const NO_PLACE_SAYS =
  "the store writes a path and a whole body, and nothing it answers says where a page of a given page type stands, so nothing here can place this write"

const NO_COMPARE_SAYS =
  "a patch would read the page, change some keys and write the whole body back, and the store takes no compare, so a change landing in between would be lost without a word"

const INSTEAD_SAYS =
  "land it with `writeFiles` naming the path and the whole body, or through the akasha command line"

function refusedFor(act: string, named: string, saying: string): Written {
  return { ok: false, why: `\`${act} ${named}\` did not land: ${saying} — ${INSTEAD_SAYS}` }
}

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
  rest: Sleeper = sleep
): Promise<Written> {
  if (puts.length === 0) return { ok: false, why: "a write carries at least one path" }
  const what = `a write of ${puts.map((one) => one.path).join(", ")}`
  return landing(what, { writer, message, puts: [...puts] }, writer, fetcher, rest)
}

export async function removeFiles(
  paths: readonly string[],
  writer: string,
  message: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  if (paths.length === 0) return { ok: false, why: "a write carries at least one path" }
  const what = `a taking of ${paths.join(", ")}`
  return landing(what, { writer, message, removes: [...paths] }, writer, fetcher, rest)
}

export async function writePage(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, Value>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write", `${pageType}/${name}`, NO_PLACE_SAYS)
}

export async function patchPage(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, Value>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch", `${pageType}/${name}`, NO_COMPARE_SAYS)
}

export async function patchState(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-state", `${pageType}/${name}`, NO_COMPARE_SAYS)
}

export async function removePage(
  pageType: string,
  name: string,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("remove", `${pageType}/${name}`, NO_PLACE_SAYS)
}

export async function writeRow(
  pageType: string,
  parentName: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write-row", `${pageType}/${parentName}`, NO_PLACE_SAYS)
}

export async function patchRow(
  pageType: string,
  parentName: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-row", `${pageType}/${parentName}`, NO_COMPARE_SAYS)
}

export async function writeRows(
  pageType: string,
  parentName: string,
  _rows: readonly Readonly<Record<string, unknown>>[],
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write-row", `${pageType}/${parentName}`, NO_PLACE_SAYS)
}

export async function patchRows(
  pageType: string,
  parentName: string,
  _rows: readonly Readonly<Record<string, unknown>>[],
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-row", `${pageType}/${parentName}`, NO_COMPARE_SAYS)
}

export async function removeRow(
  pageType: string,
  parentName: string,
  _named: string,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("remove-row", `${pageType}/${parentName}`, NO_PLACE_SAYS)
}

export async function patchPageIfMatch(
  pageType: string,
  name: string,
  _key: string,
  _expected: string | null,
  _values: Readonly<Record<string, Value>>,
  _writer: string,
  _clear: readonly string[] = [],
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Compared> {
  return {
    outcome: "failed",
    why: `\`patch-if ${pageType}/${name}\` compared nothing: the store takes no compare-and-set, so a win here would be claimed without anything having been compared — ${INSTEAD_SAYS}`,
  }
}

const NO_SAVED_QUERY_SAYS =
  "the store answers one composed query at a time and holds no page under `page-query`, so nothing here can look up a query by name"

export async function askNamed(
  slug: string,
  _fetcher: Fetcher = pagesFetcher(),
  _naps: Sleeper = sleep
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\` went unasked: ${NO_SAVED_QUERY_SAYS}` }
}

export async function askTaking(
  slug: string,
  _given: Given,
  _fetcher: Fetcher = pagesFetcher(),
  _naps: Sleeper = sleep
): Promise<Asked> {
  return { ok: false, why: `\`${slug}\` went unasked: ${NO_SAVED_QUERY_SAYS}` }
}
