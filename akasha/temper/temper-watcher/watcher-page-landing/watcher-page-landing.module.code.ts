import { readFiles, removeFiles, writeFiles } from "@akasha/pages-query"

export const PAGE_LANDING_WRITER = "temper watcher <watcher@alanwalton.com>"

export const LANDING_ATTEMPTS = 4

export const LANDING_PAUSE_MS = 1_500

export type ReadFiles = typeof readFiles

export type WriteFiles = typeof writeFiles

export type RemoveFiles = typeof removeFiles

export type Waiting = (ms: number) => Promise<undefined>

export type LandedBody = { readonly path: string; readonly content: string | null }

export type Landing = Awaited<ReturnType<WriteFiles>>

export type Landed =
  | { readonly outcome: "landed"; readonly at: string }
  | { readonly outcome: "already"; readonly at: string }
  | { readonly outcome: "refused"; readonly why: string }

export type Tried = Landed | { readonly outcome: "again"; readonly why: string }

export type LandingDeps = {
  readonly read?: ReadFiles
  readonly write?: WriteFiles
  readonly remove?: RemoveFiles
  readonly waiting?: Waiting
}

export function waitFor(ms: number): Promise<undefined> {
  return new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })
}

export function readingFor(deps: LandingDeps): ReadFiles {
  return deps.read ?? readFiles
}

export function writingFor(deps: LandingDeps): WriteFiles {
  return deps.write ?? writeFiles
}

export function removingFor(deps: LandingDeps): RemoveFiles {
  return deps.remove ?? removeFiles
}

export function triedFrom(landing: Landing): Tried {
  return landing.ok ? { outcome: "landed", at: landing.at } : { outcome: "again", why: landing.why }
}

export function contentIn(bodies: readonly LandedBody[], path: string): string | null {
  return bodies.find((one) => one.path === path)?.content ?? null
}

export async function landOverAttempts(
  unattempted: string,
  tryOnce: (attempt: number) => Promise<Tried>,
  deps: LandingDeps = {}
): Promise<Landed> {
  const waiting = deps.waiting ?? waitFor
  let why = unattempted
  for (let attempt = 1; attempt <= LANDING_ATTEMPTS; attempt++) {
    if (attempt > 1) await waiting(LANDING_PAUSE_MS)
    const tried = await tryOnce(attempt)
    if (tried.outcome !== "again") return tried
    why = tried.why
  }
  return { outcome: "refused", why: `${why} — ${LANDING_ATTEMPTS} attempts were spent` }
}

export function pagePathIn(folder: string, slug: string, pageTypeSlug: string): string {
  return `${folder}/${slug}/${slug}.${pageTypeSlug}.ts`
}

export function rowsPathIn(
  folder: string,
  slug: string,
  pageTypeSlug: string,
  property: string
): string {
  return `${folder}/${slug}/${slug}.${pageTypeSlug}.${property}.jsonl`
}

export function exportNameFor(slug: string): string {
  const parts = slug.split("-").filter((one) => one !== "")
  const first = parts[0]
  if (first === undefined) return ""
  const rest = parts.slice(1).map((one) => one.charAt(0).toUpperCase() + one.slice(1))
  return first + rest.join("")
}

export function typeNameFor(pageTypeSlug: string): string {
  const named = exportNameFor(pageTypeSlug)
  return named.charAt(0).toUpperCase() + named.slice(1)
}

export function pageTypeImportFor(pageTypeSlug: string): string {
  return `../../${pageTypeSlug}.page-type.ts`
}

export function closingFor(pageTypeSlug: string): string {
  return `} as const satisfies ${typeNameFor(pageTypeSlug)}`
}

export type PageKey = readonly [string, string | number | boolean]

export function pageBodyFor(
  pageTypeSlug: string,
  slug: string,
  id: string,
  keys: readonly PageKey[]
): string {
  const lines = [
    `import type { ${typeNameFor(pageTypeSlug)} } from "${pageTypeImportFor(pageTypeSlug)}"`,
    "",
    `export const ${exportNameFor(slug)} = {`,
    `  id: ${JSON.stringify(id)},`,
    `  pageTypeSlug: ${JSON.stringify(pageTypeSlug)},`,
    `  slug: ${JSON.stringify(slug)},`,
  ]
  for (const [key, value] of keys) lines.push(`  ${key}: ${JSON.stringify(value)},`)
  lines.push(closingFor(pageTypeSlug), "")
  return lines.join("\n")
}

export function jsonlLinesOf(body: string | null): readonly string[] {
  return body === null ? [] : body.split("\n").filter((one) => one.trim() !== "")
}

export function jsonlBodyOf(lines: readonly string[]): string {
  return lines.length === 0 ? "" : `${lines.join("\n")}\n`
}

export function jsonIn(line: string): unknown {
  try {
    return JSON.parse(line) as unknown
  } catch {
    return null
  }
}

export function textOf(held: unknown, key: string): string {
  if (held === null || held === undefined) return ""
  const value = (held as Record<string, unknown>)[key]
  return typeof value === "string" ? value : ""
}

export function textIn(line: string, key: string): string {
  return textOf(jsonIn(line), key)
}

export function insertedByInstant(
  lines: readonly string[],
  line: string,
  instantKey: string,
  instant: string
): readonly string[] {
  const put = [...lines]
  let at = put.length
  while (at > 0 && textIn(put[at - 1] ?? "", instantKey) > instant) at--
  put.splice(at, 0, line)
  return put
}

export type RowValue = readonly [string, unknown]

export function jsonRowOf(keys: readonly RowValue[]): string {
  const out: Record<string, unknown> = {}
  for (const [key, value] of keys) {
    if (value !== undefined) out[key] = value
  }
  return JSON.stringify(out)
}
