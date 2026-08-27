import { askComposed, askPageTypes } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"
import { buildRawPageRows } from "./file-rows"
import { getPageTypeBySlug } from "./page-type"
import { getPropertyDefinitions, type PropertyDefinition } from "./page-type-config"

/**
 * What a web app answers on `/api/page-types` and `/api/pages/:pageTypeSlug`.
 *
 * A browser cannot reach the page query service: it stands on the workstation
 * behind a cluster DNS name nothing outside the cluster resolves. So each app
 * answers these two on its own origin, and every app answers them the same way
 * — hence here rather than once per app.
 *
 * Nothing here imports a router or a server client. Both are handed in, so this
 * module carries no server-only import into an app that reads it.
 */

export const LISTING_CEILING = 5_000

const UNREAD_ROSTER =
  "the page query service did not answer, so this route holds no roster to report; an empty roster would read as a store with nothing in files"

const UNREAD_PAGES =
  "the page query service did not answer, so this route holds no pages to report; an empty list would read as a page type with nothing in it"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

export type ReadUser = (
  request: Request
) => Promise<{ user: { id: string } | null; headers: Headers }>

export type PageTypesDeps = {
  readonly readUser: ReadUser
  readonly askRoster: typeof askPageTypes
}

export function pageTypesDeps(readUser: ReadUser): PageTypesDeps {
  return { readUser, askRoster: askPageTypes }
}

export async function answerPageTypes(request: Request, deps: PageTypesDeps): Promise<Response> {
  const { user, headers } = await deps.readUser(request)
  if (user === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401, headers })
  }
  const asked = await deps.askRoster()
  if (!asked.ok) {
    return Response.json({ error: UNREAD_ROSTER, unread: [asked.why] }, { status: 503, headers })
  }
  // The whole backing goes out, not just the slug. `readRosterBody` in the
  // pages store reads `slug` alone, and `askPageTypes` in a browser reads this
  // same route as its stand-in for the service and wants every field back.
  return Response.json({ types: asked.types }, { headers })
}

/** What the page type states about itself, as one read. */
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
    ask: (pageTypeSlug) => askComposed({ "page-type": pageTypeSlug, limit: LISTING_CEILING }),
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
  // `readUser` returns the session-refresh cookie on `headers`. Every response
  // below carries it, a refusal included: a refusal that dropped it would leave
  // the browser holding a token this route had just declined to renew.
  const { user, headers } = await deps.readUser(request)
  if (user === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401, headers })
  }

  const asked = await deps.ask(pageTypeSlug)
  if (!asked.ok) {
    if (asked.status === 404) {
      return Response.json(
        {
          error: `\`${pageTypeSlug}\` names no page type whose pages are files, so it is not listable`,
        },
        { status: 404, headers }
      )
    }
    return Response.json({ error: UNREAD_PAGES, unread: [asked.why] }, { status: 503, headers })
  }

  const reading = await deps.readPageType(pageTypeSlug)
  if (reading === null) {
    return Response.json(
      { error: `no page type is named \`${pageTypeSlug}\`` },
      { status: 404, headers }
    )
  }

  const rows = buildRawPageRows({
    rows: asked.answer.rows,
    definitions: reading.definitions,
    pageTypeId: reading.pageTypeId,
    pageTypeSlug,
  })
  const held = asked.answer.n
  if (held > rows.length) {
    console.warn(
      `answerPages(${pageTypeSlug}): ${held} pages stand and this answer carries ${rows.length}; the listing is cut at ${LISTING_CEILING}`
    )
  }
  return Response.json({ rows, held, cut: held > rows.length }, { headers })
}
