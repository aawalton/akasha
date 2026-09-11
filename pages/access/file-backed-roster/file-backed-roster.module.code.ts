import {
  rosterOverServer,
  writesOverServer,
} from "akasha/pages/access/over-server/over-server.module.code.ts"
import type { Asked, Query } from "akasha/pages/service/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"

const PAGE_TYPE = "page-type"

const ROSTER_HELD_MS = 60_000

const NO_ROSTER =
  "the page types `@akasha/pages-service` lists are the page types whose pages it holds as files, and that listing did not come back"

const NO_PAGE_TYPE =
  "`@akasha/pages-service` listed no page type at all, and an empty roster would read as a tree where no page is a file"

export class RosterUnreachable extends Error {
  readonly why: string
  constructor(why: string) {
    super(
      `what is file-backed went unread, so nothing can be said to be file-backed or not: ${why}`
    )
    this.name = "RosterUnreachable"
    this.why = why
  }
}

let known: ReadonlySet<string> | null = null
let knownAt = 0
let pending: Promise<ReadonlySet<string>> | null = null

export function forgetFileBackedPageTypes(): undefined {
  known = null
  knownAt = 0
  pending = null
}

async function rosterAsked(ask: (query: Query) => Promise<Asked>): Promise<ReadonlySet<string>> {
  const asked = await ask({ pageTypeSlug: PAGE_TYPE, keys: ["slug"] })
  if ("refused" in asked) throw new RosterUnreachable(`${NO_ROSTER}: ${asked.refused}`)
  const slugs = new Set<string>()
  for (const row of asked.rows) {
    const slug = row.slug
    if (typeof slug === "string" && slug !== "") slugs.add(slug)
  }
  return slugs
}

async function rosterInABrowser(): Promise<ReadonlySet<string>> {
  const answered = await rosterOverServer()
  if ("refused" in answered) throw new RosterUnreachable(`${NO_ROSTER}: ${answered.refused}`)
  return answered.slugs
}

async function rosterFrom(ask: (query: Query) => Promise<Asked>): Promise<ReadonlySet<string>> {
  const slugs = writesOverServer() ? await rosterInABrowser() : await rosterAsked(ask)
  if (slugs.size === 0) throw new RosterUnreachable(NO_PAGE_TYPE)
  return slugs
}

export async function fileBackedPageTypes(
  ask: (query: Query) => Promise<Asked> = askingFor
): Promise<ReadonlySet<string>> {
  if (known !== null && Date.now() - knownAt < ROSTER_HELD_MS) return known
  pending ??= rosterFrom(ask).then(
    (slugs) => {
      pending = null
      known = slugs
      knownAt = Date.now()
      return slugs
    },
    (thrown: unknown) => {
      pending = null
      throw thrown
    }
  )
  return pending
}
