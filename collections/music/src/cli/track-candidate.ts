import type { SearchItem } from "@collections/music-spotify/endpoints/search"
import { z } from "zod"

const artistRefSchema = z.object({ name: z.string() }).passthrough()
const albumRefSchema = z.object({ name: z.string() }).passthrough()

const trackFieldsSchema = z
  .object({
    artists: z.array(artistRefSchema).optional(),
    album: albumRefSchema.optional(),
  })
  .passthrough()

export interface TrackCandidate {
  readonly trackName: string
  readonly artists: readonly string[]
  readonly album: string | null
  readonly uri: string
  readonly id: string | null
}

export function toCandidate(item: SearchItem): TrackCandidate | null {
  if (typeof item.uri !== "string" || item.uri.length === 0) return null
  const fields = trackFieldsSchema.parse(item)
  return {
    trackName: item.name,
    artists: (fields.artists ?? []).map((a) => a.name),
    album: fields.album?.name ?? null,
    uri: item.uri,
    id: item.id,
  }
}

export function toCandidates(items: readonly SearchItem[]): readonly TrackCandidate[] {
  const out: TrackCandidate[] = []
  for (const item of items) {
    const candidate = toCandidate(item)
    if (candidate !== null) out.push(candidate)
  }
  return out
}

export function matchesArtist(candidate: TrackCandidate, artist: string): boolean {
  const needle = artist.toLowerCase()
  return candidate.artists.some((name) => name.toLowerCase().includes(needle))
}

export function selectCandidates(
  items: readonly SearchItem[],
  artist: string | undefined,
  limit: number
): readonly TrackCandidate[] {
  const all = toCandidates(items)
  const filtered =
    artist === undefined || artist === ""
      ? all
      : all.filter((candidate) => matchesArtist(candidate, artist))
  return filtered.slice(0, limit)
}
