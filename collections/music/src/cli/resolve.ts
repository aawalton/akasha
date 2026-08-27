import { getDevices, getPlaybackState } from "@collections/music-spotify/endpoints/player"
import { search } from "@collections/music-spotify/endpoints/search"
import { DataError, OperationalError } from "@shared/errors-core/exit"
import { requireMatchPositional } from "@shared/utils-narrow/require-match-positional"
import { z } from "zod"
import { selectCandidates } from "./track-candidate"

const SEARCH_LIMIT = 5
const MAX_FETCH = 10

export interface ResolvedTrack {
  readonly name: string | null
  readonly uri: string
  readonly id: string | null
  readonly artists: readonly string[]
}

export interface ResolvableTrack {
  readonly id: string
  readonly name: string
  readonly artists?: readonly { readonly name: string }[]
}

export function parseTrackId(uri: string): string | null {
  try {
    const [id] = requireMatchPositional(
      /^spotify:track:([A-Za-z0-9]+)$/,
      z.tuple([z.string()]),
      uri
    )
    return id
  } catch {
    return null
  }
}

export function trackToResolved(uri: string, track: ResolvableTrack): ResolvedTrack {
  return {
    name: track.name,
    uri,
    id: track.id,
    artists: (track.artists ?? []).map((a) => a.name),
  }
}

export async function resolveQueryToTrack(
  query: string,
  artist: string | undefined
): Promise<ResolvedTrack> {
  const fetchLimit =
    artist !== undefined && artist !== "" ? MAX_FETCH : Math.min(SEARCH_LIMIT, MAX_FETCH)
  const result = await search({ q: query, types: ["track"], limit: fetchLimit })
  const candidate = selectCandidates(result.tracks?.items ?? [], artist, 1)[0]
  if (candidate === undefined) {
    const scope = artist !== undefined && artist !== "" ? ` by artist "${artist}"` : ""
    throw new DataError(`no Spotify track matched "${query}"${scope}`)
  }
  return {
    name: candidate.trackName,
    uri: candidate.uri,
    id: candidate.id,
    artists: candidate.artists,
  }
}

export async function resolveDeviceId(flag: string | undefined): Promise<string | undefined> {
  if (flag !== undefined && flag !== "") return flag
  const state = await getPlaybackState()
  if (state !== null) return undefined
  const { devices } = await getDevices()
  const target =
    devices.find((d) => d.is_active && d.id !== null) ?? devices.find((d) => d.id !== null)
  const id = target?.id
  if (id == null) {
    throw new OperationalError(
      "no active Spotify device — open Spotify on a device and press play on anything, then retry"
    )
  }
  return id
}
