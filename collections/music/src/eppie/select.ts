export const MUSIC_RATINGS = [
  "F",
  "D-",
  "D",
  "D+",
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S",
  "S+",
] as const
export type MusicRating = (typeof MUSIC_RATINGS)[number]

const LIKED_RATINGS: ReadonlySet<MusicRating> = new Set<MusicRating>([
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S",
  "S+",
])

const RANK_SCORE: Readonly<Record<string, number>> = {
  "S-Rank": 5,
  "A-Rank": 4,
  "B-Rank": 3,
  "C-Rank": 2,
  "D-Rank": 1,
}

export interface EppieArtist {
  readonly id: string
  readonly title: string
  readonly genres: readonly string[]
  readonly rating?: MusicRating
  readonly rank?: string
  readonly externalId?: string
  readonly relatedExternalIds?: readonly string[]
}

export interface EppieSong {
  readonly id: string
  readonly title: string
  readonly artistId: string
  readonly trackType?: string
  readonly songType?: "original" | "derivative"
  readonly written?: "solo" | "collab"
  readonly performed?: boolean
  readonly rating?: MusicRating
  readonly sortOrder?: number
}

export interface EppieCatalog {
  readonly artists: readonly EppieArtist[]
  readonly songs: readonly EppieSong[]
}

export type EppieSelection =
  | {
      readonly kind: "song-in-liked-artist"
      readonly artist: EppieArtist
      readonly song: EppieSong
    }
  | { readonly kind: "new-artist"; readonly artist: EppieArtist; readonly firstSong: EppieSong }
  | { readonly kind: "exhausted" }

function isLiked(rating: MusicRating | undefined): boolean {
  return rating !== undefined && LIKED_RATINGS.has(rating)
}

function ratingValue(rating: MusicRating | undefined): number {
  return rating === undefined ? -1 : MUSIC_RATINGS.indexOf(rating)
}

function rankScore(rank: string | undefined): number {
  return rank === undefined ? 0 : (RANK_SCORE[rank] ?? 0)
}

function isRecordedOriginal(song: EppieSong): boolean {
  return (
    song.songType === "original" &&
    song.performed === true &&
    (song.trackType === undefined || song.trackType === "song")
  )
}

function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "")
}

function compareSongs(a: EppieSong, b: EppieSong): number {
  const sa = a.sortOrder ?? 0
  const sb = b.sortOrder ?? 0
  if (sa !== sb) return sa - sb
  if (a.title !== b.title) return a.title < b.title ? -1 : 1
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}

export function selectNextSong(catalog: EppieCatalog, artistId: string): EppieSong | null {
  const candidates = catalog.songs
    .filter((s) => s.artistId === artistId && s.rating === undefined && isRecordedOriginal(s))
    .sort(compareSongs)

  const seen = new Set<string>()
  for (const song of candidates) {
    const key = normalizeTitle(song.title)
    if (seen.has(key)) continue
    seen.add(key)
    return song
  }
  return null
}

function hasRatingSignal(
  artist: EppieArtist,
  songsByArtist: ReadonlyMap<string, readonly EppieSong[]>
): boolean {
  if (artist.rating !== undefined) return true
  const songs = songsByArtist.get(artist.id) ?? []
  return songs.some((s) => s.rating !== undefined)
}

function artistIsLiked(
  artist: EppieArtist,
  songsByArtist: ReadonlyMap<string, readonly EppieSong[]>
): boolean {
  if (isLiked(artist.rating)) return true
  const songs = songsByArtist.get(artist.id) ?? []
  return songs.some((s) => isLiked(s.rating))
}

function loveScore(
  artist: EppieArtist,
  songsByArtist: ReadonlyMap<string, readonly EppieSong[]>
): number {
  const songs = songsByArtist.get(artist.id) ?? []
  const likedSongs = songs.filter((s) => isLiked(s.rating)).length
  return ratingValue(artist.rating) * 100 + likedSongs
}

function genreOverlap(a: readonly string[], b: ReadonlySet<string>): number {
  let n = 0
  for (const g of a) if (b.has(g)) n++
  return n
}

function genreJaccard(a: readonly string[], b: readonly string[]): number {
  if (a.length === 0 && b.length === 0) return 0
  const setB = new Set(b)
  const inter = genreOverlap(a, setB)
  const union = new Set([...a, ...b]).size
  return union === 0 ? 0 : inter / union
}

function relatedBoost(candidate: EppieArtist, loved: EppieArtist): number {
  const candId = candidate.externalId
  const lovedId = loved.externalId
  const lovedRelated = loved.relatedExternalIds ?? []
  const candRelated = candidate.relatedExternalIds ?? []
  if (candId !== undefined && lovedRelated.includes(candId)) return 2
  if (lovedId !== undefined && candRelated.includes(lovedId)) return 2
  return 0
}

function buildSongsByArtist(catalog: EppieCatalog): Map<string, EppieSong[]> {
  const map = new Map<string, EppieSong[]>()
  for (const song of catalog.songs) {
    const list = map.get(song.artistId)
    if (list === undefined) map.set(song.artistId, [song])
    else list.push(song)
  }
  return map
}

interface ScoredArtist {
  readonly artist: EppieArtist
  readonly adjacency: number
  readonly sharedWithUnion: number
}

export function selectNextArtist(catalog: EppieCatalog): EppieArtist | null {
  const songsByArtist = buildSongsByArtist(catalog)
  const candidates = catalog.artists.filter(
    (a) => !hasRatingSignal(a, songsByArtist) && selectNextSong(catalog, a.id) !== null
  )
  if (candidates.length === 0) return null

  const loved = catalog.artists.filter((a) => artistIsLiked(a, songsByArtist))

  if (loved.length === 0) {
    const sorted = [...candidates].sort((a, b) => {
      const ra = rankScore(a.rank)
      const rb = rankScore(b.rank)
      if (ra !== rb) return rb - ra
      if (a.title !== b.title) return a.title < b.title ? -1 : 1
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    })
    return sorted[0] ?? null
  }

  const lovedGenreUnion = new Set<string>()
  for (const l of loved) for (const g of l.genres) lovedGenreUnion.add(g)

  const scored: ScoredArtist[] = candidates.map((artist) => {
    let adjacency = 0
    for (const l of loved) {
      const score = genreJaccard(artist.genres, l.genres) + relatedBoost(artist, l)
      if (score > adjacency) adjacency = score
    }
    return { artist, adjacency, sharedWithUnion: genreOverlap(artist.genres, lovedGenreUnion) }
  })

  scored.sort((a, b) => {
    if (a.adjacency !== b.adjacency) return b.adjacency - a.adjacency
    if (a.sharedWithUnion !== b.sharedWithUnion) return b.sharedWithUnion - a.sharedWithUnion
    const ra = rankScore(a.artist.rank)
    const rb = rankScore(b.artist.rank)
    if (ra !== rb) return rb - ra
    if (a.artist.title !== b.artist.title) return a.artist.title < b.artist.title ? -1 : 1
    return a.artist.id < b.artist.id ? -1 : a.artist.id > b.artist.id ? 1 : 0
  })

  return scored[0]?.artist ?? null
}

export function selectNextExploration(catalog: EppieCatalog): EppieSelection {
  const songsByArtist = buildSongsByArtist(catalog)

  const likedWithRemaining = catalog.artists
    .filter((a) => artistIsLiked(a, songsByArtist) && selectNextSong(catalog, a.id) !== null)
    .sort((a, b) => {
      const la = loveScore(a, songsByArtist)
      const lb = loveScore(b, songsByArtist)
      if (la !== lb) return lb - la
      if (a.title !== b.title) return a.title < b.title ? -1 : 1
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    })

  const likedArtist = likedWithRemaining[0]
  if (likedArtist !== undefined) {
    const song = selectNextSong(catalog, likedArtist.id)
    if (song !== null) return { kind: "song-in-liked-artist", artist: likedArtist, song }
  }

  const newArtist = selectNextArtist(catalog)
  if (newArtist !== null) {
    const firstSong = selectNextSong(catalog, newArtist.id)
    if (firstSong !== null) return { kind: "new-artist", artist: newArtist, firstSong }
  }

  return { kind: "exhausted" }
}
