import type { Asked } from "@akasha/pages/service/asking"
import { askingFor } from "@akasha/pages/service/calling"
import { isRecord } from "@akasha/utils/narrow/is-record"
import {
  fileBackedPageTypes,
  RosterUnreachable,
  valuedRows,
} from "../file-read/file-read.module.code.ts"
import { buildRawPageRows } from "../file-rows/file-rows.module.code.ts"
import { getPageTypeBySlug } from "../page-type/page-type.module.code.ts"
import {
  getPropertyDefinitions,
  type PropertyDefinition,
} from "../page-type-config/page-type-config.module.code.ts"
import type { RawPageRow } from "../raw-page-row/raw-page-row.module.code.ts"

export const LISTING_CEILING = 5_000

export const DEFINITIONS_AT_ONCE = 4

const PAGE_TYPE = "page-type"

const NO_DEFINITIONS: readonly PropertyDefinition[] = []

const UNREAD_ROSTER =
  "the page types did not answer, so this route holds no roster to report; an empty roster would read as a tree where no page type is backed by files at all"

const UNREAD_PAGES =
  "the pages did not answer, so this route holds no pages to report; an empty list would read as a page type with nothing in it"

const UNREAD_PAGE_TYPE =
  "the page type behind this listing went unread, because what is file-backed went unread; this route refuses rather than raising a 500, which would say the site is broken where only one road is"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

export type ReadUser = (
  request: Request
) => Promise<{ user: { id: string } | null; headers: Headers }>

export type PageTypesDeps = {
  readonly readUser: ReadUser
  readonly roster: () => Promise<ReadonlySet<string>>
}

export function pageTypesDeps(readUser: ReadUser): PageTypesDeps {
  return { readUser, roster: () => fileBackedPageTypes() }
}

export async function answerPageTypes(request: Request, deps: PageTypesDeps): Promise<Response> {
  const { user, headers } = await deps.readUser(request)
  if (user === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401, headers })
  }
  let slugs: ReadonlySet<string>
  try {
    slugs = await deps.roster()
  } catch (thrown) {
    if (!(thrown instanceof RosterUnreachable)) throw thrown
    return Response.json({ error: UNREAD_ROSTER, unread: [thrown.why] }, { status: 503, headers })
  }
  const types = [...slugs].sort().map((slug) => ({ slug }))
  return Response.json({ types }, { headers })
}

export type PageTypeReading = {
  readonly pageTypeId: string
  readonly definitions: readonly PropertyDefinition[]
}

export type PagesDeps = {
  readonly readUser: ReadUser
  readonly ask: (pageTypeSlug: string) => Promise<Asked>
  readonly readPageType: (pageTypeSlug: string) => Promise<PageTypeReading | null>
  readonly definitionsFor: (pageTypeSlug: string) => Promise<readonly PropertyDefinition[]>
}

export function pagesDeps(readUser: ReadUser): PagesDeps {
  return {
    readUser,
    ask: (pageTypeSlug) => askingFor({ pageTypeSlug }),
    readPageType: async (pageTypeSlug) => {
      const pageType = await getPageTypeBySlug(pageTypeSlug)
      if (pageType === null) return null
      return {
        pageTypeId: pageType.id,
        definitions: await getPropertyDefinitions({ pageTypeSlug }),
      }
    },
    definitionsFor: (pageTypeSlug) => getPropertyDefinitions({ pageTypeSlug }),
  }
}

function carrying(row: RawPageRow, definitions: readonly PropertyDefinition[]): RawPageRow {
  const held = isRecord(row.attributes) ? row.attributes : {}
  return { ...row, attributes: { ...held, propertyDefinitions: definitions } }
}

async function definitionsOr(
  slug: string | null,
  definitionsFor: PagesDeps["definitionsFor"]
): Promise<readonly PropertyDefinition[] | null> {
  if (slug === null) return NO_DEFINITIONS
  try {
    return await definitionsFor(slug)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    console.warn(`withDefinitions(${slug}): this row states no properties, because ${why}`)
    return null
  }
}

export async function withDefinitions(
  rows: readonly RawPageRow[],
  definitionsFor: PagesDeps["definitionsFor"]
): Promise<readonly RawPageRow[]> {
  const out: RawPageRow[] = []
  for (let at = 0; at < rows.length; at += DEFINITIONS_AT_ONCE) {
    const batch = rows.slice(at, at + DEFINITIONS_AT_ONCE)
    const every = await Promise.all(batch.map((row) => definitionsOr(row.slug, definitionsFor)))
    batch.forEach((row, which) => {
      const defs = every[which]
      out.push(defs === null || defs === undefined ? row : carrying(row, defs))
    })
  }
  return out
}

export async function answerPages(
  request: Request,
  pageTypeSlug: string,
  deps: PagesDeps
): Promise<Response> {
  const { user, headers } = await deps.readUser(request)
  if (user === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401, headers })
  }

  const asked = await deps.ask(pageTypeSlug)
  if ("refused" in asked) {
    return Response.json({ error: UNREAD_PAGES, unread: [asked.refused] }, { status: 503, headers })
  }

  let reading: PageTypeReading | null
  try {
    reading = await deps.readPageType(pageTypeSlug)
  } catch (thrown) {
    if (!(thrown instanceof RosterUnreachable)) throw thrown
    return Response.json(
      { error: UNREAD_PAGE_TYPE, unread: [thrown.why] },
      { status: 501, headers }
    )
  }
  if (reading === null) {
    return Response.json(
      { error: `no page type is named \`${pageTypeSlug}\`` },
      { status: 404, headers }
    )
  }

  const held = asked.rows.length
  const built = buildRawPageRows({
    rows: valuedRows(asked.rows.slice(0, LISTING_CEILING)),
    definitions: reading.definitions,
    pageTypeId: reading.pageTypeId,
    pageTypeSlug,
  })
  const rows =
    pageTypeSlug === PAGE_TYPE ? await withDefinitions(built, deps.definitionsFor) : built
  if (held > rows.length) {
    console.warn(
      `answerPages(${pageTypeSlug}): ${held} pages are filed and this answer carries ${rows.length}; the listing stops at ${LISTING_CEILING}`
    )
  }
  return Response.json({ rows, held, cut: held > rows.length }, { headers })
}
