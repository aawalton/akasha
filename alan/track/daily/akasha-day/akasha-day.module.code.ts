import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "@akasha/indexes"
import { resolveRoots } from "@akasha/pages/checkout-roots"
import { entriesIn } from "@akasha/pages/page-entries"
import { besideAt } from "@akasha/pages/page-file-name"
import { valueAt } from "@akasha/pages/page-value"
import { composedFor, type Put } from "@akasha/pages/service/composing"
import { camelizeKey } from "@akasha/pages-access/file-rows"
import { landTracking } from "../../landing/track-landing.module.code.ts"
import type { Landed } from "../day-narrow-types/day-narrow-types.module.code.ts"
import {
  AKASHA_DAY_PAGE_TYPE,
  COMPLETED_TASKS_SLUG,
  ENTRY_EXTENSION,
  SESSIONS_SLUG,
} from "../track-shape/track-shape.module.code.ts"

export type Values = Readonly<Record<string, unknown>>

type Row = Record<string, unknown>

const ID = "id"

const AKASHA_REPO = "akasha"

export const ROW_PROPERTIES: Readonly<Record<string, string>> = {
  [SESSIONS_SLUG]: camelizeKey(SESSIONS_SLUG),
  [COMPLETED_TASKS_SLUG]: camelizeKey(COMPLETED_TASKS_SLUG),
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

export function dayStanding(root: string, slug: string): Standing | null {
  const listed = listedAt(root, AKASHA_DAY_PAGE_TYPE, slug)
  const path = listed.length === 1 ? listed[0]?.path : undefined
  if (path === undefined) return null
  return { path, value: valueAt(path, root) ?? {} }
}

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

export async function written(puts: readonly Put[], message: string): Promise<Landed> {
  if (puts.length === 0) return { ok: false, why: "nothing was composed to write" }
  const said = await landTracking({
    root: rootOf(),
    changes: puts.map((one) => ({ path: one.path, body: one.content })),
    message,
  })
  if ("refused" in said) return { ok: false, why: `the tracking landing refused: ${said.refused}` }
  return { ok: true, at: puts[0]?.path ?? "" }
}

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
  if ("refused" in composed) return { ok: false, why: composed.refused }
  if (composed.kept !== null) {
    const why =
      `\`${AKASHA_DAY_PAGE_TYPE}\` declares a property kept outside the commit and this writes ` +
      `none; ${composed.kept.path} would carry ` +
      Object.keys(composed.kept.values).join(", ")
    return { ok: false, why }
  }
  return written([composed.put], `${writer}: the day ${slug}`)
}

export type RowAct = "write-row" | "patch-row" | "remove-row"

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
    const why =
      `no \`${AKASHA_DAY_PAGE_TYPE}\` page is filed under '${slug}', and a row is beside a ` +
      "day rather than on its own"
    return { ok: false, why }
  }
  const held = rowsBeside(root, standing.path, propertySlug)
  if ("refused" in held) return { ok: false, why: held.refused }

  const at = besideAt(standing.path, propertySlug, ENTRY_EXTENSION)
  if (at === null)
    return { ok: false, why: `'${standing.path}' is no page file, so no rows are beside it` }

  const turned = turnedRows(act, held, values, named, propertySlug)
  if ("refused" in turned) return { ok: false, why: turned.refused }

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
    if ("refused" in composed) return { ok: false, why: composed.refused }
    puts.push(composed.put)
  }
  return written(puts, `${writer}: a ${propertySlug} row beside the day ${slug}`)
}

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
