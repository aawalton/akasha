import {
  numberAt,
  recordsIn,
  slugOf,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const CARRIED_BY = "carriedBy"

const RELEASE = "release"

const EXTERNAL_ID = "externalId"

const DISC_NUMBER = "discNumber"

const POSITION = "position"

const PART_OF = "partOfCollections"

const TRACK_KEY = "trackKey"

const STATUS = "status"

const COMPLETED = "completed"

const ARTIST_UNDER = "artist/"

const PUBLISHED_AT = "publishedAt"

export type Picked = {
  readonly trackId: string
  readonly slug: string
  readonly title: string
  readonly artistSlug: string
  readonly releaseSlug: string
}

export type Held = {
  readonly picked: Picked
  readonly key: string | null
  readonly publishedAt: string | null
  readonly disc: number
  readonly position: number
}

export type Came = {
  readonly artistSlug: string
  readonly publishedAt: string | null
}

export type Carriage = {
  readonly releaseSlug: string
  readonly trackId: string
  readonly disc: number
  readonly position: number
}

export type Wanting = (track: Value) => boolean

function namedUnder(held: unknown, under: string): string | null {
  if (!Array.isArray(held)) return null
  for (const one of held) {
    if (typeof one === "string" && one.startsWith(under)) return one.slice(under.length)
  }
  return null
}

export function heard(value: Value): boolean {
  return textIn(value, STATUS) === COMPLETED
}

function releasesIn(releases: readonly Value[]): ReadonlyMap<string, Came> {
  const held = new Map<string, Came>()
  for (const one of releases) {
    const slug = textIn(one, "slug")
    const artistSlug = namedUnder(one[PART_OF], ARTIST_UNDER)
    if (slug === null || artistSlug === null) continue
    held.set(slug, { artistSlug, publishedAt: textIn(one, PUBLISHED_AT) })
  }
  return held
}

function carriageIn(value: Value): readonly Carriage[] {
  const rows: Carriage[] = []
  for (const one of recordsIn(value[CARRIED_BY])) {
    const named = textIn(one, RELEASE)
    const trackId = textIn(one, EXTERNAL_ID)
    if (named === null || trackId === null) continue
    rows.push({
      releaseSlug: slugOf(named),
      trackId,
      disc: numberAt(one, DISC_NUMBER) ?? 0,
      position: numberAt(one, POSITION) ?? 0,
    })
  }
  return rows
}

function heldOver(
  tracks: readonly Value[],
  byRelease: ReadonlyMap<string, Came>,
  followed: ReadonlySet<string>,
  wanting: Wanting
): readonly Held[] {
  const rows: Held[] = []
  for (const one of tracks) {
    if (!wanting(one)) continue
    const slug = textIn(one, "slug")
    if (slug === null) continue
    for (const carried of carriageIn(one)) {
      const came = byRelease.get(carried.releaseSlug)
      if (came === undefined || !followed.has(came.artistSlug)) continue
      rows.push({
        picked: {
          trackId: carried.trackId,
          slug,
          title: textIn(one, "title") ?? slug,
          artistSlug: came.artistSlug,
          releaseSlug: carried.releaseSlug,
        },
        key: textIn(one, TRACK_KEY),
        publishedAt: came.publishedAt,
        disc: carried.disc,
        position: carried.position,
      })
    }
  }
  return rows
}

function byPublished(mine: string | null, theirs: string | null): number {
  if (mine === theirs) return 0
  if (mine === null) return 1
  if (theirs === null) return -1
  return mine < theirs ? -1 : 1
}

function ordered(rows: readonly Held[]): readonly Held[] {
  return [...rows].sort((a, b) => {
    const came = byPublished(a.publishedAt, b.publishedAt)
    if (came !== 0) return came
    const mine = a.picked
    const theirs = b.picked
    if (mine.releaseSlug !== theirs.releaseSlug) {
      return mine.releaseSlug < theirs.releaseSlug ? -1 : 1
    }
    if (a.disc !== b.disc) return a.disc - b.disc
    if (a.position !== b.position) return a.position - b.position
    return mine.slug < theirs.slug ? -1 : mine.slug > theirs.slug ? 1 : 0
  })
}

function byArtistIn(rows: readonly Held[]): ReadonlyMap<string, readonly Picked[]> {
  const taken = new Set<string>()
  const held = new Map<string, Picked[]>()
  for (const one of ordered(rows)) {
    const key = one.key ?? one.picked.slug
    if (taken.has(key)) continue
    taken.add(key)
    const carried = held.get(one.picked.artistSlug) ?? []
    carried.push(one.picked)
    held.set(one.picked.artistSlug, carried)
  }
  return held
}

function artistAfterArtist(byArtist: ReadonlyMap<string, readonly Picked[]>): readonly Picked[] {
  const rows: Picked[] = []
  for (const one of [...byArtist.keys()].sort()) rows.push(...(byArtist.get(one) ?? []))
  return rows
}

export function pickingOver(
  tracks: readonly Value[],
  releases: readonly Value[],
  followed: ReadonlySet<string>,
  wanting: Wanting
): readonly Picked[] {
  return artistAfterArtist(byArtistIn(heldOver(tracks, releasesIn(releases), followed, wanting)))
}
