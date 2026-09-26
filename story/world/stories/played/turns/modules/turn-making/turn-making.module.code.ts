import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import type {
  Query,
  Row,
  Asked as Rows,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  readingFor,
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type {
  Read,
  Asked as Sought,
} from "akasha/page/service/modules/page-reading/page-reading.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  type Latest,
  stepIn,
  turnAfter,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

export const MAKER = "action bar <action-bar@alanwalton.com>"

const SLUG = "slug"

const POSITION = "position"

const COLLECTIONS = "partOfCollections"

const UNIT = "unit"

const STATUS = "turnStatus"

const PARTED = "/"

const PAGE_ENDING = ".ts"

export type Calls = {
  readonly ask: (query: Query) => Promise<Rows>
  readonly read: (sought: Sought) => Promise<Read>
  readonly write: (asked: Writing) => Promise<Wrote>
}

export type TurnMade =
  | { readonly kind: "made"; readonly slug: string; readonly at: string }
  | { readonly kind: "refused"; readonly said: string }
  | { readonly kind: "unread"; readonly why: string }

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  read: (sought) => readingFor(sought),
  write: (asked) => writingFor(asked),
}

export function latestIn(row: Row | undefined): Latest | null {
  if (row === undefined) return null
  const slug = textIn(row[SLUG])
  const position = row[POSITION]
  if (slug === null || typeof position !== "number") return null
  return {
    slug,
    position,
    collections: stringsIn(row[COLLECTIONS]),
    unit: textIn(row[UNIT]),
    status: stepIn(row[STATUS]),
  }
}

export function besideTurn(path: string, slug: string): string {
  return `${path.slice(0, path.lastIndexOf(PARTED) + 1)}${slug}.${storyTurnPlayed.slug}${PAGE_ENDING}`
}

export function latestAsked(game: string): Query {
  return {
    pageTypeSlug: storyTurnPlayed.slug,
    where: { [COLLECTIONS]: { has: `${storyPlayed.slug}${PARTED}${game}` } },
    keys: [SLUG, POSITION, COLLECTIONS, UNIT, STATUS],
    sortBy: POSITION,
    descending: true,
    limit: 1,
  }
}

export async function turnMadeFor(
  game: string,
  action: string,
  calls: Calls = CALLS
): Promise<TurnMade> {
  const asked = await calls.ask(latestAsked(game))
  if ("refused" in asked) return { kind: "unread", why: asked.refused }
  const latest = latestIn(asked.rows[0])
  const made = turnAfter(latest, action)
  if ("refused" in made || latest === null) {
    return { kind: "refused", said: "refused" in made ? made.refused : "" }
  }
  const read = await calls.read({
    pages: [{ pageTypeSlug: storyTurnPlayed.slug, slug: latest.slug }],
  })
  if ("refused" in read) return { kind: "unread", why: read.refused }
  const held = read.bodies[0]
  if (held === undefined) return { kind: "unread", why: `\`${latest.slug}\` was read nowhere` }
  const at = besideTurn(held.path, made.slug)
  const wrote = await calls.write({
    writer: MAKER,
    message: `${made.slug} is made from the player's action`,
    pages: [
      {
        pageTypeSlug: storyTurnPlayed.slug,
        slug: made.slug,
        path: at,
        fresh: true,
        values: made.values,
      },
    ],
  })
  if ("refused" in wrote) return { kind: "unread", why: wrote.refused }
  return { kind: "made", slug: made.slug, at }
}
