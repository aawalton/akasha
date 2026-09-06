import type { Asked } from "@akasha/pages-service/asking"
import { askingFor } from "@akasha/pages-service/calling"
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

export const LISTING_CEILING = 5_000

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

// A ROSTER ENTRY CARRIES A SLUG AND NOTHING ELSE. The roster this route once answered named, for
// each page type, the repository its pages were kept in and the glob those files were filed under.
// `@akasha/pages-service` answers for every page akasha holds and draws no such line, so a page
// type it lists is a page type backed by files, and the slug is the whole of what a reader needs.
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
  }
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
  const rows = buildRawPageRows({
    rows: valuedRows(asked.rows.slice(0, LISTING_CEILING)),
    definitions: reading.definitions,
    pageTypeId: reading.pageTypeId,
    pageTypeSlug,
  })
  if (held > rows.length) {
    console.warn(
      `answerPages(${pageTypeSlug}): ${held} pages are filed and this answer carries ${rows.length}; the listing stops at ${LISTING_CEILING}`
    )
  }
  return Response.json({ rows, held, cut: held > rows.length }, { headers })
}
