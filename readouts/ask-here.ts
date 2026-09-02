import type { Ask, Given, QueryAnswer, QueryRow } from "./readout-resolver.ts"
import { type ReadoutQuery, readoutCatalog } from "./readout-catalog.ts"
import { answered } from "../tools/lib/page-query-answer.ts"
import { UNREACHED } from "../tools/lib/page-query.ts"
import { askingFor } from "@akasha/pages-system-service/calling"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"

// A readout names a saved query and asks it with the day filled in. Two stores answer between them,
// and neither answers alone.
//
// A page type that has moved into akasha has TypeScript pages, and `pages-system-service` is the
// only thing holding them. A page type that has not moved has markdown pages in the checkout, and
// the engine reading the checkout is the only thing holding those. `value` and `persona-day` are
// the second kind, and they stay that kind: Alan directed that the old pages and page types stay,
// with only `error` treated otherwise, so they are read where they stand rather than moved to
// where one store could answer for both.
//
// What stood here threw for every slug alike. It was written when `@shared/pages-query` was
// severed, and it took the checkout engine down with it, two reach sets having been read as one.
// The severed one is the HTTP client. The checkout engine is not severed, and it answers
// `value-all`, `persona-days-on-day` and `value-green-day-units-on-day` today.

const NOTHING_HOLDS_IT =
  "no store holds its page type: the service's index does not name it, and the checkout has no " +
  "pages of it either"

const SERVICE_REDUCES_NOTHING =
  "the service answers rows and reduces nothing, and it takes no argument a saved query would " +
  "fill, so a query naming `function:` or `takes:` over a page type that has moved into akasha " +
  "has to be rewritten where the readout is drawn"

let rootsHeld: Roots | null = null

function roots(): Roots {
  rootsHeld ??= resolveRoots()
  return rootsHeld
}

/**
 * A page moving into the store has its keys camelized on the way in, so the store answers
 * `valueSlug` where the page type declares `value-slug`. Everything asking still spells the
 * declared key, so both spellings are answered on the way back. Eleven lines of string work is not
 * worth a road out of here, so they are written where they are used.
 */
function camelizeKey(key: string): string {
  const segments = key.split(/[^A-Za-z0-9]+/).filter((one) => one.length > 0)
  const [first, ...rest] = segments
  if (first === undefined) return ""
  const head = first.charAt(0).toLowerCase() + first.slice(1)
  return head + rest.map((one) => one.charAt(0).toUpperCase() + one.slice(1)).join("")
}

function kebabizeKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

function bothSpellings(values: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const held: Record<string, unknown> = { ...values }
  for (const [key, value] of Object.entries(values)) {
    const kebab = kebabizeKey(key)
    if (kebab !== key && !(kebab in held)) held[kebab] = value
  }
  return held
}

function objectIn(held: unknown): Record<string, unknown> {
  return typeof held === "object" && held !== null ? (held as Record<string, unknown>) : {}
}

function numberIn(body: Record<string, unknown>, key: string): number | null {
  const held = body[key]
  return typeof held === "number" && Number.isFinite(held) ? held : null
}

function textsIn(body: Record<string, unknown>, key: string): readonly string[] {
  const held = body[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function rowsIn(body: Record<string, unknown>): readonly QueryRow[] {
  const held = body.rows
  if (!Array.isArray(held)) return []
  const rows: QueryRow[] = []
  for (const one of held) {
    const row = objectIn(one)
    if (typeof row.values !== "object" || row.values === null) continue
    const values = row.values as Record<string, unknown>
    rows.push(typeof row.at === "string" ? { at: row.at, values } : { values })
  }
  return rows
}

function answerOf(body: Record<string, unknown>): QueryAnswer {
  return {
    n: numberIn(body, "n") ?? 0,
    value: numberIn(body, "value"),
    over: numberIn(body, "over"),
    rows: rowsIn(body),
    faults: textsIn(body, "faults"),
    omitted: textsIn(body, "omitted"),
    unfound: textsIn(body, "unfound"),
  }
}

function paramsOf(given: Given): URLSearchParams {
  const params = new URLSearchParams()
  for (const [name, held] of Object.entries(given)) {
    if (typeof held === "string") params.append(name, held)
    else for (const one of held) params.append(name, one)
  }
  return params
}

function whyIn(body: Record<string, unknown>, status: number): string {
  const error = body.error
  return typeof error === "string" ? error : `the checkout answered ${status}`
}

/**
 * The keys a query named that no row came back carrying.
 *
 * The store leaves out a key it has no column for and answers null for one it has, so a key absent
 * from every row of a non-empty answer is one it could not answer rather than one standing empty.
 */
function unfoundAmong(keys: readonly string[], rows: readonly QueryRow[]): readonly string[] {
  if (rows.length === 0) return []
  return [...keys].filter((key) => !rows.some((row) => camelizeKey(key) in row.values)).sort()
}

async function askedOfTheService(query: ReadoutQuery, pageTypeSlug: string): Promise<QueryAnswer> {
  if (query.reducesToOneNumber || Object.keys(query.takes).length > 0) {
    throw new Error(`\`${query.slug}\` went unanswered: ${SERVICE_REDUCES_NOTHING}`)
  }
  // Asked with no keys named, because a key the page type does not declare is refused outright
  // rather than answered absent, and a query naming one would then answer nothing at all. Every
  // key comes back and the caller takes the ones it spells.
  const asked = await askingFor({ pageTypeSlug, sortBy: "slug" })
  if ("refused" in asked) {
    throw new Error(`\`${query.slug}\` went unanswered: ${asked.refused}`)
  }
  const rows = asked.rows.map((row) => ({ values: bothSpellings(row) }))
  return {
    n: rows.length,
    value: null,
    over: null,
    rows,
    faults: [],
    omitted: [],
    unfound: unfoundAmong(query.keys, rows),
  }
}

function askedOfTheCheckout(querySlug: string, given: Given): QueryAnswer | null {
  const said = answered(roots(), querySlug, paramsOf(given))
  const body = objectIn(said.body)
  if (said.status === 200) return answerOf(body)
  const why = whyIn(body, said.status)
  // The checkout says a page type's pages are not files when that type has moved into akasha. That
  // is the one refusal the service can still answer past, so it is carried rather than thrown.
  if (why.endsWith(UNREACHED)) return null
  throw new Error(`\`${querySlug}\` went unanswered: ${why}`)
}

export function askHere(): Ask {
  return async (querySlug, given) => {
    const query = readoutCatalog().queries.get(querySlug)
    if (query === undefined) {
      throw new Error(`\`${querySlug}\` went unanswered: no \`page-query\` page answers to it`)
    }
    const answer = askedOfTheCheckout(querySlug, given)
    if (answer !== null) return answer
    const pageTypeSlug = query.pageTypeSlug
    if (pageTypeSlug === null) {
      throw new Error(`\`${querySlug}\` went unanswered: ${NOTHING_HOLDS_IT}`)
    }
    return askedOfTheService(query, pageTypeSlug)
  }
}
