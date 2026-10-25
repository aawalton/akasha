import { recordingRun } from "akasha/alan/collection/modules/sync-run-recording/sync-run-recording.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { plan as planArgument } from "akasha/command/argument/pages/plan.argument.ts"
import {
  DATA,
  faulted,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { listedFetched } from "akasha/command/pages/watching/hallmark/modules/hallmark-listing/hallmark-listing.module.code.ts"
import {
  airedShows,
  matchedAll,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-matching/hallmark-matching.module.code.ts"
import type { Gone } from "akasha/command/pages/watching/hallmark/modules/hallmark-misfiling/hallmark-misfiling.module.code.ts"
import {
  type Held,
  shelved,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-shelving/hallmark-shelving.module.code.ts"
import { watchingHallmark as page } from "akasha/command/pages/watching/hallmark/watching-hallmark.command.ts"
import {
  type Calls,
  TOKEN_UNSET,
  tokenSaid,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

type Counted = {
  readonly created: number
  readonly updated: number
  readonly skipped: number
  readonly failed: number
}

export type Recording = <Run extends Counted>(
  source: string,
  run: () => Promise<Run>
) => Promise<Run>

type Ran = Counted & { readonly commits: readonly string[]; readonly refused: string | null }

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  write: (asked) => writingFor(asked),
  fetch: (url, init) => fetch(url, init),
}

const WRITER = "watching hallmark <watching-hallmark@alanwalton.com>"

const SYNC = "hallmark"

const BATCH = 100

const KEYS: readonly string[] = [
  "slug",
  "title",
  "partOfCollections",
  "externalIdentity",
  "publishedAt",
]

const STREAMED: ReadonlySet<string> = new Set(["movie", "show"])

const ORDER: readonly string[] = ["show-collection", "franchise", "movie", "show"]

const UNDER_SHOWS: readonly string[] = ["season", "episode"]

const A_DAY = 10

type Removed = { readonly read: string | undefined; readonly refused: string | null }

async function removedAll(
  gone: readonly Gone[],
  root: string,
  calls: Calls,
  read: string | undefined
): Promise<Removed> {
  if (gone.length === 0) return { read, refused: null }
  const paths = gone.flatMap((one) =>
    listedAt(root, one.pageTypeSlug, one.slug).map((at) => at.path)
  )
  const wrote = await calls.write({
    writer: WRITER,
    message: `the Hallmark shelf takes away ${String(paths.length)} pages a refused match left`,
    ...(read === undefined ? {} : { read }),
    removes: paths,
  })
  if ("refused" in wrote) return { read, refused: wrote.refused }
  return { read: wrote.commit ?? read, refused: null }
}

type Asked = { readonly held: Held; readonly at: string | undefined }

async function heldFor(calls: Calls): Promise<Asked | string> {
  const held = new Map<string, readonly Row[]>()
  let at: string | undefined
  for (const pageTypeSlug of ORDER) {
    const keys = STREAMED.has(pageTypeSlug) ? [...KEYS, "streamingOn"] : KEYS
    const rows = await calls.ask({ pageTypeSlug, keys })
    if ("refused" in rows) return rows.refused
    at ??= rows.at
    held.set(pageTypeSlug, rows.rows)
  }
  for (const pageTypeSlug of UNDER_SHOWS) {
    const rows = await calls.ask({ pageTypeSlug, keys: ["slug", "partOfCollections"] })
    if ("refused" in rows) return rows.refused
    held.set(pageTypeSlug, rows.rows)
  }
  const rowsOf = (slug: string): readonly Row[] => held.get(slug) ?? []
  return {
    held: {
      movie: rowsOf("movie"),
      show: rowsOf("show"),
      franchise: rowsOf("franchise"),
      "show-collection": rowsOf("show-collection"),
      season: rowsOf("season"),
      episode: rowsOf("episode"),
    },
    at,
  }
}

function ordered(pages: readonly Naming[]): readonly Naming[] {
  const rank = (one: Naming): number => ORDER.indexOf(one.pageTypeSlug)
  return [...pages].sort((one, other) => rank(one) - rank(other))
}

async function written(
  pages: readonly Naming[],
  calls: Calls,
  readAt: string | undefined
): Promise<Ran> {
  const commits: string[] = []
  const sorted = ordered(pages)
  let read = readAt
  let created = 0
  let updated = 0
  for (let at = 0; at < sorted.length; at += BATCH) {
    const batch = sorted.slice(at, at + BATCH)
    const wrote = await calls.write({
      writer: WRITER,
      message: `the Hallmark shelf takes ${String(batch.length)} more titles and series`,
      ...(read === undefined ? {} : { read }),
      pages: batch,
    })
    if ("refused" in wrote) {
      const failed = sorted.length - at
      return { created, updated, skipped: 0, failed, commits, refused: wrote.refused }
    }
    if (wrote.commit !== null) {
      commits.push(wrote.commit)
      read = wrote.commit
    }
    for (const one of batch) {
      if (one.fresh === true) created += 1
      else updated += 1
    }
  }
  return { created, updated, skipped: 0, failed: 0, commits, refused: null }
}

export async function watchingHallmark(
  argv: readonly string[],
  given: Given,
  calls: Calls = CALLS,
  recording: Recording = recordingRun
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [planArgument])
  if ("refused" in read) return refusedBy(read.refused)
  const token = tokenSaid()
  if (token === null) return refusedBy([TOKEN_UNSET], OPERATIONAL)
  try {
    const listed = await listedFetched(calls)
    if (typeof listed === "string") return refusedBy([listed], DATA)
    const asked = await heldFor(calls)
    if (typeof asked === "string") return refusedBy([asked], OPERATIONAL)
    const held = asked.held
    const matched = await matchedAll(calls, token, listed)
    const shows = await airedShows(calls, token)
    const day = new Date().toISOString().slice(0, A_DAY)
    const shelf = shelved({ listed: matched, shows, held, day })
    const fresh = shelf.pages.filter((one) => one.fresh === true).length
    const counted = `${String(fresh)} pages to write fresh and ${String(shelf.pages.length - fresh)} to update`
    if (read.taken.plan) return told([...shelf.report, counted])
    const removed = await removedAll(shelf.removes, given.root, calls, asked.at)
    if (removed.refused !== null) return refusedBy([...shelf.report, removed.refused], OPERATIONAL)
    const ran = await recording(SYNC, () => written(shelf.pages, calls, removed.read))
    const said = [...shelf.report, counted, ...ran.commits.map((one) => `committed as ${one}`)]
    if (ran.refused !== null) return refusedBy([...said, ran.refused], OPERATIONAL)
    return told(said)
  } catch (thrown) {
    return faulted(thrown)
  }
}
