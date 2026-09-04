import type { Artist } from "../../catalog/artists/artist.page-type.ts"
import type { Song } from "../../catalog/songs/song.page-type.ts"
import { isLiked, ratingRung } from "../rating-ladder/rating-ladder.module.code.ts"

export type CatalogArtist = Pick<Artist, "slug" | "title" | "genre" | "rank">

export type CatalogSong = Pick<
  Song,
  "slug" | "title" | "artistSlug" | "songType" | "performed" | "rank"
>

export type Catalog = {
  readonly artists: readonly CatalogArtist[]
  readonly songs: readonly CatalogSong[]
}

export type Exploration =
  | {
      readonly kind: "song-in-liked-artist"
      readonly artist: CatalogArtist
      readonly song: CatalogSong
    }
  | {
      readonly kind: "new-artist"
      readonly artist: CatalogArtist
      readonly firstSong: CatalogSong
    }
  | { readonly kind: "exhausted" }

type Named = { readonly title: string; readonly slug: string }

const GRADE_WEIGHT = 100

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function byTitleThenSlug(a: Named, b: Named): number {
  if (a.title !== b.title) return a.title < b.title ? -1 : 1
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0
}

function isRecordedOriginal(song: CatalogSong): boolean {
  return song.songType === "original" && song.performed
}

export function selectNextSong(catalog: Catalog, artistSlug: string): CatalogSong | null {
  const recorded = catalog.songs
    .filter((song) => song.artistSlug === artistSlug && isRecordedOriginal(song))
    .sort(byTitleThenSlug)
  const graded = new Set<string>()
  const offered = new Map<string, CatalogSong>()
  for (const song of recorded) {
    const key = normalizeTitle(song.title)
    if (song.rank !== undefined) {
      graded.add(key)
      continue
    }
    if (!offered.has(key)) offered.set(key, song)
  }
  for (const [key, song] of offered) {
    if (!graded.has(key)) return song
  }
  return null
}

function songsByArtist(catalog: Catalog): Map<string, CatalogSong[]> {
  const byArtist = new Map<string, CatalogSong[]>()
  for (const song of catalog.songs) {
    const held = byArtist.get(song.artistSlug)
    if (held === undefined) byArtist.set(song.artistSlug, [song])
    else held.push(song)
  }
  return byArtist
}

type SongsByArtist = ReadonlyMap<string, readonly CatalogSong[]>

function songsOf(byArtist: SongsByArtist, artist: CatalogArtist): readonly CatalogSong[] {
  return byArtist.get(artist.slug) ?? []
}

function isGraded(artist: CatalogArtist, byArtist: SongsByArtist): boolean {
  if (artist.rank !== undefined) return true
  return songsOf(byArtist, artist).some((song) => song.rank !== undefined)
}

function artistIsLiked(artist: CatalogArtist, byArtist: SongsByArtist): boolean {
  if (isLiked(artist.rank)) return true
  return songsOf(byArtist, artist).some((song) => isLiked(song.rank))
}

function loveOf(artist: CatalogArtist, byArtist: SongsByArtist): number {
  const liked = songsOf(byArtist, artist).filter((song) => isLiked(song.rank)).length
  return ratingRung(artist.rank) * GRADE_WEIGHT + liked
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

export function selectNextArtist(catalog: Catalog): CatalogArtist | null {
  const byArtist = songsByArtist(catalog)
  const candidates = catalog.artists.filter(
    (artist) => !isGraded(artist, byArtist) && selectNextSong(catalog, artist.slug) !== null
  )
  if (candidates.length === 0) return null

  const loved = catalog.artists.filter((artist) => artistIsLiked(artist, byArtist))
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

export function selectNextExploration(catalog: Catalog): Exploration {
  const byArtist = songsByArtist(catalog)

  const likedWithMore = catalog.artists
    .filter(
      (artist) => artistIsLiked(artist, byArtist) && selectNextSong(catalog, artist.slug) !== null
    )
    .sort((a, b) => {
      const mine = loveOf(a, byArtist)
      const theirs = loveOf(b, byArtist)
      if (mine !== theirs) return theirs - mine
      return byTitleThenSlug(a, b)
    })

  const likedArtist = likedWithMore[0]
  if (likedArtist !== undefined) {
    const song = selectNextSong(catalog, likedArtist.slug)
    if (song !== null) return { kind: "song-in-liked-artist", artist: likedArtist, song }
  }

  const newArtist = selectNextArtist(catalog)
  if (newArtist !== null) {
    const firstSong = selectNextSong(catalog, newArtist.slug)
    if (firstSong !== null) return { kind: "new-artist", artist: newArtist, firstSong }
  }

  return { kind: "exhausted" }
}
