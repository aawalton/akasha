import { DataError, OperationalError } from "@akasha/errors-core/exit-code"
import { getDevices, getPlaybackState } from "@akasha/spotify/player"
import { search } from "@akasha/spotify/search"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { selectCandidates } from "../track-candidate/track-candidate.module.code.ts"

const SEARCH_LIMIT = 5

const MAX_FETCH = 10

export type ResolvedTrack = {
  readonly name: string | null
  readonly uri: string
  readonly id: string | null
  readonly artists: readonly string[]
}

export type ResolvableTrack = {
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
    artists: (track.artists ?? []).map((one) => one.name),
  }
}

export async function resolveQueryToTrack(
  query: string,
  artist: string | undefined
): Promise<ResolvedTrack> {
  const fetchLimit =
    artist !== undefined && artist !== "" ? MAX_FETCH : Math.min(SEARCH_LIMIT, MAX_FETCH)
  const answered = await search({ q: query, types: ["track"], limit: fetchLimit })
  const candidate = selectCandidates(answered.tracks?.items ?? [], artist, 1)[0]
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
    devices.find((one) => one.is_active && one.id !== null) ??
    devices.find((one) => one.id !== null)
  const id = target?.id
  if (id == null) {
    throw new OperationalError(
      "no active Spotify device — open Spotify on a device and press play on anything, then retry"
    )
  }
  return id
}
