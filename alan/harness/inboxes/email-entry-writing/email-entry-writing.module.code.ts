import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { listedAt } from "@akasha/indexes"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { refuseALiveTestWrite } from "@akasha/pages-system/live-store-write-guard"
import { bodyOf, importedFrom, unnamedIn } from "@akasha/pages-system/page-body"
import { nameFaultIn } from "@akasha/pages-system/page-export-name"
import { asking } from "@akasha/pages-system-service/asking"
import { wakeDayOf } from "../../../tracking/daily/day-opening/day-opening.module.code.ts"

const EMAIL_ENTRY_PAGE_TYPE_SLUG = "email-entry"

const PAGE_TYPE = "page-type"

const PAGES_UNDER = "pages"

const LOWEST_INBOX_COUNT = "lowestInboxCount"

export const INBOX_WRITER = "inbox-tracking"

export type PersistOutcome = "created" | "patched"

type Standing = Readonly<Record<string, unknown>> | undefined

function numberOf(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    if (Number.isFinite(parsed)) return parsed
  }
  return null
}

export function keptLow(standing: unknown, count: number): number | null {
  const held = numberOf(standing)
  return held === null || count < held ? count : null
}

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function standingRow(day: string): Standing {
  const asked = asking(checkoutRoot(), {
    pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
    where: { date: { is: day } },
  } as never)
  if ("refused" in asked) {
    throw new Error(`reading ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${day}: ${asked.refused}`)
  }
  return asked.rows[0]
}

export function slugFor(day: string): string {
  return `${EMAIL_ENTRY_PAGE_TYPE_SLUG}-${day}`
}

const PAGE_KEYS: readonly string[] = [
  "id",
  "pageTypeSlug",
  "slug",
  "title",
  "date",
  LOWEST_INBOX_COUNT,
]

function pageTypeAt(root: string): string {
  const listed = listedAt(root, PAGE_TYPE, EMAIL_ENTRY_PAGE_TYPE_SLUG)
  const one = listed[0]
  if (listed.length !== 1 || one === undefined) {
    throw new Error(
      `\`${EMAIL_ENTRY_PAGE_TYPE_SLUG}\` names ${listed.length} page types, not one, so nothing ` +
        `says which of them an entry belongs to: ${listed.map((held) => held.path).join(", ")}`
    )
  }
  return one.path
}

function pageAt(root: string, slug: string): string {
  const listed = listedAt(root, EMAIL_ENTRY_PAGE_TYPE_SLUG, slug)
  const one = listed[0]
  if (listed.length > 1) {
    throw new Error(
      `\`${slug}\` names ${listed.length} pages, not one: ${listed.map((h) => h.path).join(", ")}`
    )
  }
  if (one !== undefined) return one.path
  return join(dirname(pageTypeAt(root)), PAGES_UNDER, `${slug}.${EMAIL_ENTRY_PAGE_TYPE_SLUG}.ts`)
}

async function landPage(
  root: string,
  slug: string,
  values: Readonly<Record<string, unknown>>
): Promise<undefined> {
  const fault = nameFaultIn(slug)
  if (fault !== null) throw new Error(`\`${slug}\` is no slug an entry is filed under: ${fault}`)
  const dropped = unnamedIn(PAGE_KEYS, values as never)
  if (dropped.length > 0) {
    throw new Error(
      `the \`${EMAIL_ENTRY_PAGE_TYPE_SLUG}\` page \`${slug}\` carries ${dropped.join(", ")}, which ` +
        `this writer does not know how to write down, and writing it without them would take them ` +
        `off the page — name them in \`PAGE_KEYS\` or leave the page alone`
    )
  }
  const at = pageAt(root, slug)
  refuseALiveTestWrite(root, `write ${EMAIL_ENTRY_PAGE_TYPE_SLUG}/${slug}`, "`landPage`")
  const body = bodyOf({
    pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
    slug,
    importFrom: importedFrom(at, pageTypeAt(root)),
    keys: PAGE_KEYS,
    values: values as never,
  })
  const message =
    `Alan's mail on ${String(values.date)} reached ` +
    `${String(values[LOWEST_INBOX_COUNT])} at its lowest`
  const answer = await landedMechanically(
    root,
    INBOX_WRITER,
    [{ path: at, body: encoded(body) }],
    message
  )
  if (answer.code !== 0) {
    throw new Error(
      `writing ${EMAIL_ENTRY_PAGE_TYPE_SLUG} for ${slug} at ${at}: ${answer.refusals.join("; ")}`
    )
  }
  stoodAs(root, at, body, slug)
  return undefined
}

function encoded(body: string): Uint8Array {
  return new TextEncoder().encode(body)
}

function stoodAs(root: string, at: string, body: string, slug: string): undefined {
  let stood: string
  try {
    stood = readFileSync(join(root, at), "utf8")
  } catch (thrown) {
    throw new Error(
      `the landing of \`${slug}\` reported no fault and ${at} cannot be read back, so nothing says ` +
        `the entry was written: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }
  if (stood !== body) {
    throw new Error(
      `the landing of \`${slug}\` reported no fault and ${at} does not hold what it was handed, so ` +
        `the entry on disk is not the entry this tick wrote`
    )
  }
  return undefined
}

export async function persistEmailEntry(count: number, now: Date): Promise<PersistOutcome> {
  const root = checkoutRoot()
  const day = wakeDayOf(resolveRoots(), now)
  const slug = slugFor(day)
  const row = standingRow(day)
  if (row === undefined) {
    landPage(root, slug, {
      id: Bun.randomUUIDv7(),
      pageTypeSlug: EMAIL_ENTRY_PAGE_TYPE_SLUG,
      slug,
      title: `Email ${day}`,
      date: day,
      [LOWEST_INBOX_COUNT]: count,
    })
    return "created"
  }
  const lower = keptLow(row[LOWEST_INBOX_COUNT], count)
  if (lower !== null) landPage(root, slug, { ...row, [LOWEST_INBOX_COUNT]: lower })
  return "patched"
}
