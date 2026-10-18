import { status as statusProperty } from "akasha/alan/collection/properties/status.select-property.ts"
import { minutes } from "akasha/alan/collection/unit/pages/minutes.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import { show } from "akasha/alan/collection/watching/show/show.page-type.ts"
import { mountainWallAt } from "akasha/alan/harness/day-boundary/modules/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { collectionStatus } from "akasha/command/argument/pages/collection-status.argument.ts"
import { day as dayArgument } from "akasha/command/argument/pages/day.argument.ts"
import { episode as episodeArgument } from "akasha/command/argument/pages/episode.argument.ts"
import { link } from "akasha/command/argument/pages/link.argument.ts"
import {
  DATA,
  faulted,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  type HeldShow,
  heldUnder,
  plannedFor,
  tmdbIdentityOf,
  tmdbIdOf,
} from "akasha/command/pages/watching/log/modules/episode-watching/episode-watching.module.code.ts"
import {
  type Kind,
  type Known,
  knownBy,
  type Linked,
  linkedBy,
  slugOf,
} from "akasha/command/pages/watching/log/modules/title-knowing/title-knowing.module.code.ts"
import {
  airedFor,
  type Calls,
  TOKEN_UNSET,
  tmdbSearched,
  tokenSaid,
} from "akasha/command/pages/watching/log/modules/tmdb-reading/tmdb-reading.module.code.ts"
import { watchingLog as page } from "akasha/command/pages/watching/log/watching-log.command.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { padTwo } from "akasha/text/writing/modules/pad-two/pad-two.computed-property-module.code.ts"

type Held = {
  readonly kind: Kind
  readonly slug: string
  readonly title: string
  readonly status: string | null
  readonly identities: readonly Row[]
}

type Found = {
  readonly held: Held | null
  readonly known: Known | null
  readonly at: string | null
}

const CALLS: Calls = {
  ask: (query) => askingFor(query),
  write: (asked) => writingFor(asked),
  fetch: (url, init) => fetch(url, init),
}

const WRITER = "watching logging <watching-logging@alanwalton.com>"

const KINDS: readonly Kind[] = [show.slug, movie.slug]

const COMPLETED = "completed"

const IN_PROGRESS = "in-progress"

const MINUTES = `${unit.slug}/${minutes.slug}`

const A_DAY = /^\d{4}-\d{2}-\d{2}$/

function dayNow(now: Date): string {
  const wall = mountainWallAt(now)
  return `${String(wall.year)}-${padTwo(wall.month)}-${padTwo(wall.day)}`
}

function heldIn(kind: Kind, row: Row): Held | null {
  const slug = row.slug
  const title = row.title
  if (typeof slug !== "string" || typeof title !== "string") return null
  const status = typeof row.status === "string" ? row.status : null
  const said = row.externalIdentity
  const identities = Array.isArray(said)
    ? said.filter((one): one is Row => one !== null && typeof one === "object")
    : []
  return { kind, slug, title, status, identities }
}

function names(held: Held, linked: Linked): boolean {
  return held.identities.some(
    (one) => one.source === linked.source && one.externalId === linked.externalId
  )
}

function titled(title: string): string {
  return slugOf(title).replace(/-/g, "")
}

function heldFor(every: readonly Held[], linked: Linked, known: Known | null): Held | null {
  const named = every.find((one) => names(one, linked))
  if (named !== undefined || known === null) return named ?? null
  const sought = titled(known.title)
  return every.find((one) => one.kind === known.kind && titled(one.title) === sought) ?? null
}

async function found(linked: Linked, calls: Calls): Promise<Found | string> {
  const every: Held[] = []
  let at: string | null = null
  for (const kind of KINDS) {
    const rows = await calls.ask({
      pageTypeSlug: kind,
      keys: ["slug", "title", "status", "externalIdentity"],
    })
    if ("refused" in rows) return rows.refused
    at = rows.at ?? at
    for (const row of rows.rows) {
      const held = heldIn(kind, row)
      if (held !== null) every.push(held)
    }
  }
  const first = heldFor(every, linked, null)
  const known = first === null ? await knownBy(linked, calls) : null
  return { held: first ?? heldFor(every, linked, known), known, at }
}

function identityOf(linked: Linked): Row {
  return {
    source: linked.source,
    externalId: linked.externalId,
    externalLink: linked.externalLink,
  }
}

export function freshValues(
  known: Known,
  linked: Linked,
  status: string,
  day: string
): Readonly<Record<string, unknown>> {
  const done = status === COMPLETED
  const length = known.minutes ?? 0
  return {
    title: known.title,
    ownLength: length,
    ownProgress: done ? length : 0,
    unit: MINUTES,
    status,
    ...(done ? { completedAt: day } : {}),
    ...(known.publishedAt === null ? {} : { publishedAt: known.publishedAt }),
    externalIdentity: [identityOf(linked)],
  }
}

function keptValues(
  held: Held,
  linked: Linked,
  status: string,
  day: string
): Readonly<Record<string, unknown>> {
  const identity = names(held, linked)
    ? {}
    : { externalIdentity: [...held.identities, identityOf(linked)] }
  if (held.status === COMPLETED || held.status === status) return identity
  return { status, ...(status === COMPLETED ? { completedAt: day } : {}), ...identity }
}

function unknownSaid(linked: Linked): string {
  return `no title is known for ${linked.source} ${linked.externalId}, so nothing was logged`
}

function readOf(at: Found): { readonly read?: string } {
  return at.at === null ? {} : { read: at.at }
}

async function titleLogged(
  linked: Linked,
  status: string,
  day: string,
  calls: Calls,
  at: Found
): Promise<Answer> {
  const { held, known } = at
  if (held !== null) {
    const values = keptValues(held, linked, status, day)
    const named = `${held.kind}/${held.slug}`
    if (Object.keys(values).length === 0) return told([`${named}  ${held.status ?? ""}  unchanged`])
    const wrote = await calls.write({
      writer: WRITER,
      message: `${held.title} is logged as ${status}`,
      ...readOf(at),
      pages: [{ pageTypeSlug: held.kind, slug: held.slug, merge: true, values }],
    })
    if ("refused" in wrote) return refusedBy([wrote.refused], OPERATIONAL)
    const now = typeof values.status === "string" ? values.status : (held.status ?? "")
    return told([`${named}  ${now}  updated`])
  }
  if (known === null) return refusedBy([unknownSaid(linked)], DATA)
  const slug = slugOf(known.title)
  const wrote = await calls.write({
    writer: WRITER,
    message: `${known.title} is logged as ${status}`,
    pages: [
      {
        pageTypeSlug: known.kind,
        slug,
        fresh: true,
        values: freshValues(known, linked, status, day),
      },
    ],
  })
  if ("refused" in wrote) return refusedBy([wrote.refused], OPERATIONAL)
  return told([`${known.kind}/${slug}  ${status}  created`])
}

async function tmdbFor(
  shown: HeldShow,
  known: Known | null,
  linked: Linked,
  token: string,
  calls: Calls
): Promise<string | null> {
  const held = tmdbIdOf(shown)
  if (held !== null) return held
  const looked = (known ?? (await knownBy(linked, calls)))?.tmdbId ?? null
  return looked ?? (await tmdbSearched(calls, token, shown.title))
}

async function episodeLogged(
  linked: Linked,
  day: string,
  calls: Calls,
  at: Found
): Promise<Answer> {
  const { held, known } = at
  const kind = held?.kind ?? known?.kind ?? null
  if (kind === null) return refusedBy([unknownSaid(linked)], DATA)
  if (kind === movie.slug) {
    return refusedBy([`a film has no episodes, so this link takes no \`${episodeArgument.said}\``])
  }
  const token = tokenSaid()
  if (token === null) return refusedBy([TOKEN_UNSET], OPERATIONAL)
  const title = held?.title ?? known?.title ?? ""
  const slug = held?.slug ?? slugOf(title)
  const opened: HeldShow = {
    slug,
    title,
    status: held?.status ?? IN_PROGRESS,
    identities: held?.identities ?? [identityOf(linked)],
  }
  const tv = await tmdbFor(opened, known, linked, token, calls)
  if (tv === null) return refusedBy([`TMDB holds no show titled ${title}`], DATA)
  const shown: HeldShow =
    held === null ? { ...opened, identities: [identityOf(linked), tmdbIdentityOf(tv)] } : opened
  const aired = await airedFor(calls, token, tv)
  if (aired === null) return refusedBy([`TMDB answered nothing for its show ${tv}`], OPERATIONAL)
  const under = held === null ? { seasons: [], episodes: [] } : await heldUnder(calls, shown)
  if (typeof under === "string") return refusedBy([under], OPERATIONAL)
  const planned = plannedFor(shown, tv, aired, under.seasons, under.episodes, day)
  if (typeof planned === "string") return refusedBy([planned], DATA)
  const opening =
    held === null && known !== null
      ? [
          {
            pageTypeSlug: show.slug,
            slug,
            fresh: true,
            values: {
              ...freshValues(known, linked, IN_PROGRESS, day),
              externalIdentity: shown.identities,
            },
          },
        ]
      : []
  const wrote = await calls.write({
    writer: WRITER,
    message: `${title} has one more episode watched`,
    ...readOf(at),
    pages: [...opening, ...planned.pages],
  })
  if ("refused" in wrote) return refusedBy([wrote.refused], OPERATIONAL)
  const created = opening.length === 0 ? [] : [`${show.slug}/${slug}  ${IN_PROGRESS}  created`]
  return told([...created, ...planned.report])
}

export async function watchingLog(
  argv: readonly string[],
  given: Given,
  calls: Calls = CALLS
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [
    link,
    collectionStatus,
    episodeArgument,
    dayArgument,
  ])
  if ("refused" in read) return refusedBy(read.refused)
  const linked = linkedBy(read.taken.link)
  const status = read.taken.collectionStatus ?? IN_PROGRESS
  const day = read.taken.day ?? dayNow(new Date())
  const refusals: string[] = []
  if (typeof linked === "string") refusals.push(linked)
  if (!(statusProperty.values as readonly string[]).includes(status)) {
    refusals.push(`\`${status}\` is no status, which is one of ${statusProperty.values.join(", ")}`)
  }
  if (!A_DAY.test(day)) refusals.push(`\`${day}\` is no day, which is written as YYYY-MM-DD`)
  if (refusals.length > 0 || typeof linked === "string") return refusedBy(refusals)
  try {
    const at = await found(linked, calls)
    if (typeof at === "string") return refusedBy([at], OPERATIONAL)
    if (read.taken.episode) return await episodeLogged(linked, day, calls, at)
    return await titleLogged(linked, status, day, calls, at)
  } catch (thrown) {
    return faulted(thrown)
  }
}
