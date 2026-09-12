import type { TrackCandidate } from "akasha/alan/music/choosing/track-candidate/track-candidate.module.code.ts"
import { selectCandidates } from "akasha/alan/music/choosing/track-candidate/track-candidate.module.code.ts"
import type {
  SearchParams,
  SearchResponse,
} from "akasha/alan/music/spotify/search/spotify-search.module.code.ts"
import { search } from "akasha/alan/music/spotify/search/spotify-search.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { artist as artistArgument } from "akasha/commands/arguments/pages/artist.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import { query as queryArgument } from "akasha/commands/arguments/pages/query.argument.ts"
import {
  INPUT,
  OK,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { musicSearch as page } from "akasha/commands/pages/music/search/music-search.command.ts"

const DEFAULT_LIMIT = 5

const MAX_FETCH = 10

const NAMED = [artistArgument, json, limitArgument, queryArgument]

export type SearchEnvelope = {
  readonly query: string
  readonly artist: string | null
  readonly candidates: readonly TrackCandidate[]
}

export type Finding = (params: SearchParams) => Promise<SearchResponse>

export function wrongIn(said: string): string | null {
  return said === "" ? "supply a track query to search for" : null
}

export function linesOf(envelope: SearchEnvelope): readonly string[] {
  const scope = envelope.artist !== null ? ` (artist: ${envelope.artist})` : ""
  const count = String(envelope.candidates.length)
  const header = `Search "${envelope.query}"${scope} — ${count} candidate(s):`
  if (envelope.candidates.length === 0) return [header, "  (none)"]
  const lines: string[] = [header]
  for (const [at, one] of envelope.candidates.entries()) {
    const artists = one.artists.length > 0 ? one.artists.join(", ") : "(unknown artist)"
    const album = one.album !== null ? ` · ${one.album}` : ""
    lines.push(`  ${String(at + 1)}. ${one.trackName} — ${artists}${album}`, `     ${one.uri}`)
  }
  return lines
}

export async function searchWith(
  find: Finding,
  argv: readonly string[],
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const wrong = wrongIn(taken.query)
  if (wrong !== null) return refused(wrong, INPUT)
  const query = taken.query
  const limit = taken.limit ?? DEFAULT_LIMIT
  const artist = taken.artist
  const wide = artist !== undefined && artist !== ""
  const fetchLimit = wide ? MAX_FETCH : Math.min(limit, MAX_FETCH)
  const result = await find({ q: query, types: ["track"], limit: fetchLimit })
  const candidates = selectCandidates(result.tracks?.items ?? [], artist, limit)
  const envelope: SearchEnvelope = { query, artist: artist ?? null, candidates }
  const report = taken.json ? [JSON.stringify(envelope)] : linesOf(envelope)
  return { report, refusals: [], code: OK }
}

export function musicSearch(argv: readonly string[], given: Given): Promise<Answer> {
  return searchWith(search, argv, given.calledAs)
}
