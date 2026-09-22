import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"
import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"
import { gradeProperty } from "akasha/page/grade-property/grade-property.page-type.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Grade } from "akasha/page/properties/grade.grade-property.types.ts"

export type CatalogArtist = Pick<Artist, "slug" | "title" | "genre" | "grade">

export type CatalogSong = Pick<Song, "slug" | "artist">

export type CatalogTrack = {
  readonly slug: string
  readonly title: string
  readonly artist: string
  readonly song: string
  readonly spotifyId: string
  readonly grade?: Grade
}

export type Catalog = {
  readonly artists: readonly CatalogArtist[]
  readonly songs: readonly CatalogSong[]
  readonly tracks: readonly CatalogTrack[]
}

export type Exploration =
  | {
      readonly kind: "track-in-liked-artist"
      readonly artist: CatalogArtist
      readonly track: CatalogTrack
    }
  | {
      readonly kind: "new-artist"
      readonly artist: CatalogArtist
      readonly firstTrack: CatalogTrack
    }
  | { readonly kind: "exhausted" }

type Named = { readonly title: string; readonly slug: string }

type Made = { readonly artist: string }

const GRADE_WEIGHT = 100

const LIKED_FROM: Grade = "B-"

const LIKED_GRADES: ReadonlySet<Grade> = new Set<Grade>(
  gradeProperty.values.slice(gradeProperty.values.indexOf(LIKED_FROM))
)

export function isLiked(grade: Grade | undefined): boolean {
  return grade !== undefined && LIKED_GRADES.has(grade)
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function byTitleThenSlug(a: Named, b: Named): number {
  if (a.title !== b.title) return a.title < b.title ? -1 : 1
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0
}

function artistSlugOf(one: Made): string {
  return slugOf(one.artist)
}

type Kept = {
  readonly tracks: ReadonlyMap<string, readonly CatalogTrack[]>
}

function gatheredBy<T extends Made>(all: readonly T[]): ReadonlyMap<string, readonly T[]> {
  const byArtist = new Map<string, T[]>()
  for (const one of all) {
    const slug = artistSlugOf(one)
    const held = byArtist.get(slug)
    if (held === undefined) byArtist.set(slug, [one])
    else held.push(one)
  }
  return byArtist
}

function keptIn(catalog: Catalog): Kept {
  return { tracks: gatheredBy(catalog.tracks) }
}

function judged(track: CatalogTrack): boolean {
  return track.grade !== undefined
}

function trackFrom(kept: Kept, artistSlug: string): CatalogTrack | null {
  const mine = [...(kept.tracks.get(artistSlug) ?? [])].sort(byTitleThenSlug)
  const settled = new Set<string>()
  const offered = new Map<string, CatalogTrack>()
  for (const track of mine) {
    const key = normalizeTitle(track.title)
    if (judged(track)) {
      settled.add(key)
      continue
    }
    if (!offered.has(key)) offered.set(key, track)
  }
  for (const [key, track] of offered) {
    if (!settled.has(key)) return track
  }
  return null
}

export function selectNextTrack(catalog: Catalog, artistSlug: string): CatalogTrack | null {
  return trackFrom(keptIn(catalog), artistSlug)
}

function tracksOf(kept: Kept, artist: CatalogArtist): readonly CatalogTrack[] {
  return kept.tracks.get(artist.slug) ?? []
}

function isGraded(artist: CatalogArtist, kept: Kept): boolean {
  if (artist.grade !== undefined) return true
  return tracksOf(kept, artist).some((one) => one.grade !== undefined)
}

function artistIsLiked(artist: CatalogArtist, kept: Kept): boolean {
  if (isLiked(artist.grade)) return true
  return tracksOf(kept, artist).some((one) => isLiked(one.grade))
}

function likedIn(kept: Kept, artist: CatalogArtist): number {
  return tracksOf(kept, artist).filter((one) => isLiked(one.grade)).length
}

function loveOf(artist: CatalogArtist, kept: Kept): number {
  const rung = artist.grade === undefined ? -1 : gradeProperty.values.indexOf(artist.grade)
  return rung * GRADE_WEIGHT + likedIn(kept, artist)
}

function genresOf(artist: CatalogArtist): readonly string[] {
  return artist.genre ?? []
}

function sharedCount(genres: readonly string[], among: ReadonlySet<string>): number {
  let shared = 0
  for (const genre of genres) if (among.has(genre)) shared += 1
  return shared
}

function likeness(mine: readonly string[], theirs: readonly string[]): number {
  const either = new Set([...mine, ...theirs])
  if (either.size === 0) return 0
  return sharedCount(mine, new Set(theirs)) / either.size
}

type ScoredArtist = {
  readonly artist: CatalogArtist
  readonly likeness: number
  readonly shared: number
}

function artistFrom(catalog: Catalog, kept: Kept): CatalogArtist | null {
  const candidates = catalog.artists.filter(
    (artist) => !isGraded(artist, kept) && trackFrom(kept, artist.slug) !== null
  )
  if (candidates.length === 0) return null

  const loved = catalog.artists.filter((artist) => artistIsLiked(artist, kept))
  if (loved.length === 0) return [...candidates].sort(byTitleThenSlug)[0] ?? null

  const lovedGenres = new Set<string>()
  for (const one of loved) for (const genre of genresOf(one)) lovedGenres.add(genre)

  const scored: ScoredArtist[] = candidates.map((artist) => {
    let best = 0
    for (const one of loved) {
      const score = likeness(genresOf(artist), genresOf(one))
      if (score > best) best = score
    }
    return { artist, likeness: best, shared: sharedCount(genresOf(artist), lovedGenres) }
  })

  scored.sort((a, b) => {
    if (a.likeness !== b.likeness) return b.likeness - a.likeness
    if (a.shared !== b.shared) return b.shared - a.shared
    return byTitleThenSlug(a.artist, b.artist)
  })

  return scored[0]?.artist ?? null
}

export function selectNextArtist(catalog: Catalog): CatalogArtist | null {
  return artistFrom(catalog, keptIn(catalog))
}

export function selectNextExploration(catalog: Catalog): Exploration {
  const kept = keptIn(catalog)

  const likedWithMore = catalog.artists
    .filter((artist) => artistIsLiked(artist, kept) && trackFrom(kept, artist.slug) !== null)
    .sort((a, b) => {
      const mine = loveOf(a, kept)
      const theirs = loveOf(b, kept)
      if (mine !== theirs) return theirs - mine
      return byTitleThenSlug(a, b)
    })

  const likedArtist = likedWithMore[0]
  if (likedArtist !== undefined) {
    const track = trackFrom(kept, likedArtist.slug)
    if (track !== null) return { kind: "track-in-liked-artist", artist: likedArtist, track }
  }

  const newArtist = artistFrom(catalog, kept)
  if (newArtist !== null) {
    const firstTrack = trackFrom(kept, newArtist.slug)
    if (firstTrack !== null) return { kind: "new-artist", artist: newArtist, firstTrack }
  }

  return { kind: "exhausted" }
}
