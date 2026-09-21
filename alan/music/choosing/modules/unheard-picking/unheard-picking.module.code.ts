import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  numberAt,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SPOTIFY = "spotify"

const IDENTITY = "externalIdentity"

const PART_OF = "partOfCollections"

const TRACK_KEY = "trackKey"

const STATUS = "status"

const COMPLETED = "completed"

const ARTIST_UNDER = "artist/"

const RELEASE_UNDER = "release/"

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
  readonly disc: number
  readonly position: number
}

export function namedUnder(held: unknown, under: string): string | null {
  if (!Array.isArray(held)) return null
  for (const one of held) {
    if (typeof one === "string" && one.startsWith(under)) return one.slice(under.length)
  }
  return null
}

export function heard(value: Value): boolean {
  return textIn(value, STATUS) === COMPLETED
}

export function artistsByRelease(releases: readonly Value[]): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  for (const one of releases) {
    const slug = textIn(one, "slug")
    const artist = namedUnder(one[PART_OF], ARTIST_UNDER)
    if (slug === null || artist === null) continue
    held.set(slug, artist)
  }
  return held
}

export function heldOver(
  tracks: readonly Value[],
  byRelease: ReadonlyMap<string, string>,
  followed: ReadonlySet<string>
): readonly Held[] {
  const rows: Held[] = []
  for (const one of tracks) {
    if (heard(one)) continue
    const releaseSlug = namedUnder(one[PART_OF], RELEASE_UNDER)
    if (releaseSlug === null) continue
    const artistSlug = byRelease.get(releaseSlug)
    if (artistSlug === undefined || !followed.has(artistSlug)) continue
    const trackId = idFrom(one[IDENTITY], SPOTIFY)
    const slug = textIn(one, "slug")
    if (trackId === null || slug === null) continue
    rows.push({
      picked: { trackId, slug, title: textIn(one, "title") ?? slug, artistSlug, releaseSlug },
      key: textIn(one, TRACK_KEY),
      disc: numberAt(one, "discNumber") ?? 0,
      position: numberAt(one, "position") ?? 0,
    })
  }
  return rows
}

export function ordered(rows: readonly Held[]): readonly Held[] {
  return [...rows].sort((a, b) => {
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

export function byArtistIn(rows: readonly Held[]): ReadonlyMap<string, readonly Picked[]> {
  const taken = new Set<string>()
  const held = new Map<string, Picked[]>()
  for (const one of ordered(rows)) {
    if (one.key !== null) {
      if (taken.has(one.key)) continue
      taken.add(one.key)
    }
    const carried = held.get(one.picked.artistSlug) ?? []
    carried.push(one.picked)
    held.set(one.picked.artistSlug, carried)
  }
  return held
}

export function takingTurns(byArtist: ReadonlyMap<string, readonly Picked[]>): readonly Picked[] {
  const artists = [...byArtist.keys()].sort()
  const rows: Picked[] = []
  let turn = 0
  let more = true
  while (more) {
    more = false
    for (const one of artists) {
      const picked = (byArtist.get(one) ?? [])[turn]
      if (picked === undefined) continue
      rows.push(picked)
      more = true
    }
    turn += 1
  }
  return rows
}

export function pickingOver(
  tracks: readonly Value[],
  releases: readonly Value[],
  followed: ReadonlySet<string>
): readonly Picked[] {
  return takingTurns(byArtistIn(heldOver(tracks, artistsByRelease(releases), followed)))
}
