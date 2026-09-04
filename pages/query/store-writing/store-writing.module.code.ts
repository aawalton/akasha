import {
  askNamed as namedAnswer,
  askTaking as takingAnswer,
} from "../store-page-asking/store-page-asking.module.code.ts"
import {
  ASK_CEILING_MS,
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

export type Body = { readonly path: string; readonly content: string | null }

export type Named = { readonly pageTypeSlug: string; readonly slug: string }

export type Read = {
  readonly at: string
  readonly bodies: readonly Body[]
  readonly unplaced: readonly string[]
}

export type Found =
  | ({ readonly ok: true } & Read)
  | { readonly ok: false; readonly why: string; readonly status?: number }

export type Changing = (bodies: readonly Body[]) => readonly Put[] | null

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

const NO_RENDER_SAYS =
  "the store writes a path and a whole body, and nothing in akasha renders a page's body out of the keys it carries, so these values cannot become the file this would write"

const NO_ROW_SAYS =
  "a row stands inside a page's body rather than at a path of its own, and nothing the store answers addresses one, so nothing here can reach the row this names"

const INSTEAD_SAYS =
  "land it with `writeFiles` or `patchFiles` naming the path and the whole body, or through the akasha command line"

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
  rest: Sleeper = sleep,
  read: string | null = null
): Promise<Written> {
  if (puts.length === 0) return { ok: false, why: "a write carries at least one path" }
  const what = `a write of ${puts.map((one) => one.path).join(", ")}`
  const body =
    read === null
      ? { writer, message, puts: [...puts] }
      : { writer, message, puts: [...puts], read }
  return landing(what, body, writer, fetcher, rest)
}

export async function removeFiles(
  paths: readonly string[],
  writer: string,
  message: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep,
  read: string | null = null
): Promise<Written> {
  if (paths.length === 0) return { ok: false, why: "a write carries at least one path" }
  const what = `a taking of ${paths.join(", ")}`
  const body =
    read === null
      ? { writer, message, removes: [...paths] }
      : { writer, message, removes: [...paths], read }
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

export async function patchFiles(
  paths: readonly string[],
  changing: Changing,
  writer: string,
  message: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  const found = await readFiles(paths, fetcher, rest)
  if (!found.ok) return { ok: false, why: found.why, status: found.status }
  const puts = changing(found.bodies)
  if (puts === null || puts.length === 0) {
    return { ok: false, why: `a patch of ${paths.join(", ")} left every body as it stood` }
  }
  return writeFiles(puts, writer, message, fetcher, rest, found.at)
}

export async function writePage(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, Value>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write", `${pageType}/${name}`, NO_RENDER_SAYS)
}

export async function patchPage(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, Value>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch", `${pageType}/${name}`, NO_RENDER_SAYS)
}

export async function patchState(
  pageType: string,
  name: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-state", `${pageType}/${name}`, NO_RENDER_SAYS)
}

export async function removePage(
  pageType: string,
  name: string,
  writer: string,
  fetcher: Fetcher = pagesFetcher(),
  rest: Sleeper = sleep
): Promise<Written> {
  const named = `${pageType}/${name}`
  const found = await readPages([{ pageTypeSlug: pageType, slug: name }], fetcher, rest)
  if (!found.ok) return { ok: false, why: found.why, status: found.status }
  if (found.unplaced.length > 0) {
    return { ok: false, why: `\`remove ${named}\` did not land: no page stands at ${named}` }
  }
  const paths = found.bodies.map((one) => one.path)
  return removeFiles(paths, writer, `remove ${named}`, fetcher, rest, found.at)
}

export async function writeRow(
  pageType: string,
  parentName: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write-row", `${pageType}/${parentName}`, NO_ROW_SAYS)
}

export async function patchRow(
  pageType: string,
  parentName: string,
  _values: Readonly<Record<string, unknown>>,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-row", `${pageType}/${parentName}`, NO_ROW_SAYS)
}

export async function writeRows(
  pageType: string,
  parentName: string,
  _rows: readonly Readonly<Record<string, unknown>>[],
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("write-row", `${pageType}/${parentName}`, NO_ROW_SAYS)
}

export async function patchRows(
  pageType: string,
  parentName: string,
  _rows: readonly Readonly<Record<string, unknown>>[],
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("patch-row", `${pageType}/${parentName}`, NO_ROW_SAYS)
}

export async function removeRow(
  pageType: string,
  parentName: string,
  _named: string,
  _writer: string,
  _fetcher: Fetcher = pagesFetcher(),
  _rest: Sleeper = sleep
): Promise<Written> {
  return refusedFor("remove-row", `${pageType}/${parentName}`, NO_ROW_SAYS)
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
    why: `\`patch-if ${pageType}/${name}\` compared nothing: ${NO_RENDER_SAYS} — ${INSTEAD_SAYS}`,
  }
}

export async function askNamed(
  slug: string,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  return namedAnswer(slug, fetcher, naps)
}

export async function askTaking(
  slug: string,
  given: Given,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  return takingAnswer(slug, given, fetcher, naps)
}
