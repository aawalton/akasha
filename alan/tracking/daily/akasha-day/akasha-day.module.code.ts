/**
 * The akasha half of every write the tracking funnel makes.
 *
 * `tools/lib/tracking/day-place.ts` says where one of Alan's days is kept. This is what happens when
 * the answer is akasha: a day is a TypeScript page under `akasha/`, and the sessions and finished
 * to-dos of that day are jsonl rows in a file named beside it.
 *
 * Almost nothing here is new. Where a page of a type stands, which of its values are committed, what
 * order its keys are written in and what the file's text is are all `composedFor`, which is what the
 * pages system service composes every akasha write from. What a row file beside a page is named is
 * `besideAt`. What that file holds is `entriesIn`. What a page declares is `valueAt`. This file is
 * the four of them put in a row, plus the one thing none of them does: hand the composed bodies to
 * `akasha tracking`, because nothing writes under `akasha/` but akasha's own verb.
 *
 * A page body states its keys camel, because a page is a TypeScript object literal, and a row beside
 * an akasha page states them camel too, because a row is judged against the fields its entry
 * property declares and a property is read by its slug written in camel. Callers here spell either
 * way — `inbox-tasks` from the inbox and `startTime` from a session — so everything on its way to
 * akasha is camelised once, in this file, and nothing above it has to know.
 */

import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { entriesIn } from "@akasha/pages-system/page-entries"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { valueAt } from "@akasha/pages-system/page-value"
import { composedFor, type Put } from "@akasha/pages-system-service/composing"
import type { Landed } from "../day-narrow-types/day-narrow-types.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"
import {
  AKASHA_DAY_PAGE_TYPE,
  COMPLETED_TASKS_SLUG,
  ENTRY_EXTENSION,
  SESSIONS_SLUG,
} from "../tracking-shape/tracking-shape.module.code.ts"

export type Values = Readonly<Record<string, unknown>>

type Row = Record<string, unknown>

const ID = "id"

const AKASHA_REPO = "akasha"

const TRACKING = "tracking"

/** The property each kind of row beside a day is declared under. */
export const ROW_PROPERTIES: Readonly<Record<string, string>> = {
  [SESSIONS_SLUG]: camelizeKey(SESSIONS_SLUG),
  [COMPLETED_TASKS_SLUG]: camelizeKey(COMPLETED_TASKS_SLUG),
}

function refused(why: string): Landed {
  return { ok: false, why }
}

export function rootOf(): string {
  const root = resolveRoots()[AKASHA_REPO]
  if (root === undefined)
    throw new Error("no akasha checkout is resolved, so no day can be written")
  return root
}

export function camelised(values: Values): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, held] of Object.entries(values)) {
    if (held === null || held === undefined) continue
    out[camelizeKey(key)] = held
  }
  return out
}

/**
 * A row's keys as akasha reads them.
 *
 * `sessions.page-property-entry.ts` declares `start-time`, and a property is reached by its slug and
 * read by its key, which is that slug written in camel. So a row beside an akasha page states
 * `startTime`, the same spelling the page itself states.
 *
 * What is NOT true is that akasha refuses a row keyed any other way. The 2026-09-01 measurement that
 * said so handed a day page and one session to `akasha write` together, and the kebab refusal it saw
 * came from the page in that call rather than from the row. Measured again 2026-09-02 over the row
 * file alone, with the day page already declaring `sessions`: nine checks reach a `.jsonl` beside a
 * page — file-has-its-page, file-length, manifest-lands-on-a-file, manifest-names-what-is-reached,
 * name-format-judges-by-one-shape, no-raw-nul-bytes, package-reached-where-named, page-named-as-
 * stated and page-property-has-its-file — and all nine admitted a row with kebab keys, a row naming
 * a `dailyTracking` no page carries, a row whose `id` is no uuid, a row carrying a key no property
 * declares, and a line that is not JSON at all. Every one of the nine judges the file: that a page
 * claims it, what it is named, how long it is, what bytes it holds. None of them opens a line.
 *
 * What would have to exist is one check that does: read the page standing beside the file, find the
 * `page-property-entry` that page names for it, and judge every line against the properties that
 * entry declares — the file parses as one JSON object to a line, every required property is there,
 * no key is one the entry does not declare, and `id` is a uuid. `entriesIn` in
 * `pages/entries` already parses; the declaration is already on the entry
 * page; nothing puts the two together. Until it does, camelising here is what keeps a row readable
 * rather than what makes it right.
 *
 * This is the opposite of what `tools/daily-tracking-migration/shape.ts` says: it carries the 780
 * markdown rows across untouched, and those are kebab. What reads a row is turned back the other way
 * by `kebabisedRow` in tools/lib/akasha-page-values.ts, so the query engine sees one spelling
 * whichever half a row came out of.
 */
export function camelisedRow(values: Values): Row {
  const out: Row = {}
  for (const [key, held] of Object.entries(values)) {
    if (held === null || held === undefined) continue
    out[camelizeKey(key)] = held
  }
  return out
}

export interface Standing {
  readonly path: string
  readonly value: Readonly<Record<string, unknown>>
}

/**
 * The day page the index holds for this slug, and what it declares.
 *
 * Nothing is a day that has not been written yet, which is a different thing from a day that is
 * empty: a row has nowhere to stand beside a page that is not there, and saying so is the whole
 * reason this funnel exists.
 */
export function dayStanding(root: string, slug: string): Standing | null {
  const listed = listedAt(root, AKASHA_DAY_PAGE_TYPE, slug)
  const path = listed.length === 1 ? listed[0]?.path : undefined
  if (path === undefined) return null
  return { path, value: valueAt(path, root) ?? {} }
}

/** Every row the file beside a page holds, or nothing where a file that stands will not read. */
export function rowsBeside(
  root: string,
  page: string,
  propertySlug: string
): readonly Row[] | { readonly refused: string } {
  const at = besideAt(page, propertySlug, ENTRY_EXTENSION)
  if (at === null) return { refused: `'${page}' is no page file, so nothing stands beside it` }
  const full = join(root, at)
  if (!existsSync(full)) return []
  const read = entriesIn(at, readFileSync(full, "utf8"))
  if ("refused" in read) return read
  return read.entries as readonly Row[]
}

export function rowsText(rows: readonly Row[]): string {
  return rows.length === 0 ? "" : `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`
}

function namedIn(row: Row): string {
  const held = row[ID]
  return typeof held === "string" ? held : ""
}

/**
 * Every composed body handed to `akasha write` as one call, so they land together or not at all.
 *
 * The bodies go to a scratch directory rather than onto the command line because the verb takes a
 * file and never text said in an argument, and the scratch is cleared whether the write landed or
 * refused.
 */
export async function written(puts: readonly Put[], message: string): Promise<Landed> {
  if (puts.length === 0) return refused("nothing was composed to write")
  const scratch = mkdtempSync(join(tmpdir(), "akasha-day-"))
  try {
    const args: string[] = []
    puts.forEach((one, at) => {
      const body = join(scratch, `body-${String(at)}`)
      writeFileSync(body, one.content)
      args.push("--file-path", one.path, "--content-file", body)
    })
    args.push("--message", message)
    const ran = Bun.spawn(["akasha", TRACKING, ...args], {
      cwd: rootOf(),
      stdout: "pipe",
      stderr: "pipe",
    })
    const [out, err, code] = await Promise.all([
      new Response(ran.stdout).text(),
      new Response(ran.stderr).text(),
      ran.exited,
    ])
    if (code !== 0) return refused(`\`akasha ${TRACKING}\` refused: ${(err + out).trim()}`)
    return { ok: true, at: puts[0]?.path ?? "" }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

/**
 * A day page written or patched.
 *
 * A patch is read, merged and composed whole rather than written as a difference, because a page
 * body is the whole value: composing from the patch alone would land a day carrying four keys and
 * take the other twenty-nine away. So the page that stands is read first, and a day that stands
 * nowhere is written from what the caller gave and nothing else.
 */
export async function landAkashaDayPage(
  act: "write" | "patch",
  slug: string,
  values: Values,
  writer: string
): Promise<Landed> {
  const root = rootOf()
  const standing = act === "patch" ? dayStanding(root, slug) : null
  const whole = {
    ...(standing?.value ?? {}),
    ...camelised(values),
    pageTypeSlug: AKASHA_DAY_PAGE_TYPE,
    slug,
  }
  const composed = composedFor(root, { pageTypeSlug: AKASHA_DAY_PAGE_TYPE, slug, values: whole })
  if ("refused" in composed) return refused(composed.refused)
  if (composed.kept !== null) {
    return refused(
      `\`${AKASHA_DAY_PAGE_TYPE}\` declares a property kept outside the commit and this writes ` +
        `none; ${composed.kept.path} would carry ` +
        Object.keys(composed.kept.values).join(", ")
    )
  }
  return written([composed.put], `${writer}: the day ${slug}`)
}

export type RowAct = "write-row" | "patch-row" | "remove-row"

/**
 * One row beside a day, written, amended or taken away.
 *
 * The rows are read whole, turned, and written whole. A row file is small — the busiest day Alan has
 * tracked holds thirty — and reading it is what makes an amendment an amendment rather than a second
 * row for one session.
 *
 * Where the day page does not yet declare the property, the page is composed again with the
 * declaration on it and lands in the same call as the rows. A file of rows no page names is a file
 * nothing would ever read.
 */
export async function landAkashaRow(
  act: RowAct,
  slug: string,
  propertySlug: string,
  values: Values,
  named: string,
  writer: string
): Promise<Landed> {
  const root = rootOf()
  const standing = dayStanding(root, slug)
  if (standing === null) {
    return refused(
      `no \`${AKASHA_DAY_PAGE_TYPE}\` page is filed under '${slug}', and a row stands beside a ` +
        "day rather than on its own"
    )
  }
  const held = rowsBeside(root, standing.path, propertySlug)
  if ("refused" in held) return refused(held.refused)

  const at = besideAt(standing.path, propertySlug, ENTRY_EXTENSION)
  if (at === null) return refused(`'${standing.path}' is no page file, so no rows stand beside it`)

  const turned = turnedRows(act, held, values, named, propertySlug)
  if ("refused" in turned) return refused(turned.refused)

  const puts: Put[] = [{ path: at, content: rowsText(turned.rows) }]
  const key = ROW_PROPERTIES[propertySlug] ?? camelizeKey(propertySlug)
  if (standing.value[key] !== ENTRY_EXTENSION) {
    const composed = composedFor(root, {
      pageTypeSlug: AKASHA_DAY_PAGE_TYPE,
      slug,
      values: {
        ...standing.value,
        [key]: ENTRY_EXTENSION,
        pageTypeSlug: AKASHA_DAY_PAGE_TYPE,
        slug,
      },
    })
    if ("refused" in composed) return refused(composed.refused)
    puts.push(composed.put)
  }
  return written(puts, `${writer}: a ${propertySlug} row beside the day ${slug}`)
}

/** A session beside a day, which is the one row kind the funnel writes. */
export function landAkashaSessionRow(
  act: RowAct,
  slug: string,
  values: Values,
  named: string,
  writer: string
): Promise<Landed> {
  return landAkashaRow(act, slug, SESSIONS_SLUG, values, named, writer)
}

export function turnedRows(
  act: RowAct,
  held: readonly Row[],
  values: Values,
  named: string,
  propertySlug: string
): { readonly rows: readonly Row[] } | { readonly refused: string } {
  if (act === "write-row") {
    const row = camelisedRow(values)
    const id = namedIn(row)
    if (id === "") return { refused: "a row states no identity, so nothing could ever amend it" }
    if (held.some((one) => namedIn(one) === id)) {
      return { refused: `a '${propertySlug}' row named ${id} already stands, and one is one` }
    }
    return { rows: [...held, row] }
  }
  const at = held.findIndex((one) => namedIn(one) === named)
  if (at === -1) {
    return { refused: `no '${propertySlug}' row named ${named} stands, so there is none to ${act}` }
  }
  if (act === "remove-row") return { rows: held.filter((_, index) => index !== at) }
  const was = held[at] as Row
  return {
    rows: held.map((one, index) => (index === at ? { ...was, ...camelisedRow(values) } : one)),
  }
}
