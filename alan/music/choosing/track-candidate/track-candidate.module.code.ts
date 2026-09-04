import type { SearchItem } from "@akasha/spotify/search"
import { z } from "zod"

const artistRefSchema = z.object({ name: z.string() }).passthrough()

const albumRefSchema = z.object({ name: z.string() }).passthrough()

const trackFieldsSchema = z
  .object({
    artists: z.array(artistRefSchema).optional(),
    album: albumRefSchema.optional(),
  })
  .passthrough()

export type TrackCandidate = {
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
    artists: (fields.artists ?? []).map((one) => one.name),
    album: fields.album?.name ?? null,
    uri: item.uri,
    id: item.id,
  }
}

export function toCandidates(items: readonly SearchItem[]): readonly TrackCandidate[] {
  const kept: TrackCandidate[] = []
  for (const item of items) {
    const candidate = toCandidate(item)
    if (candidate !== null) kept.push(candidate)
  }
  return kept
}

export function matchesArtist(candidate: TrackCandidate, artist: string): boolean {
  const wanted = artist.toLowerCase()
  return candidate.artists.some((name) => name.toLowerCase().includes(wanted))
}

export function selectCandidates(
  items: readonly SearchItem[],
  artist: string | undefined,
  limit: number
): readonly TrackCandidate[] {
  const all = toCandidates(items)
  const kept =
    artist === undefined || artist === ""
      ? all
      : all.filter((candidate) => matchesArtist(candidate, artist))
  return kept.slice(0, limit)
}
