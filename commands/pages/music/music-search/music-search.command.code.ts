import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { TrackCandidate } from "@akasha/music-choosing/track-candidate"
import { selectCandidates } from "@akasha/music-choosing/track-candidate"
import type { SearchParams, SearchResponse } from "@akasha/spotify/search"
import { search } from "@akasha/spotify/search"

const INPUT = 1

const DEFAULT_LIMIT = 5

const MAX_FETCH = 10

const ARTIST = "--artist"

const LIMIT = "--limit"

const TOP = "--top"

const JSON_SAID = "--json"

const REST = "--"

const VALUED: readonly string[] = [ARTIST, LIMIT, TOP]

export type SearchEnvelope = {
  readonly query: string
  readonly artist: string | null
  readonly candidates: readonly TrackCandidate[]
}

export type Finding = (params: SearchParams) => Promise<SearchResponse>

type Told = {
  readonly query: string | undefined
  readonly artist: string | undefined
  readonly limitSaid: string | undefined
  readonly json: boolean
}

function canonical(said: string): string {
  return said === TOP ? LIMIT : said
}

export function toldIn(argv: readonly string[]): Told | string {
  const named: Record<string, string> = {}
  const spelled: Record<string, string> = {}
  const loose: string[] = []
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] as string
    if (one === REST) {
      loose.push(...argv.slice(at + 1))
      break
    }
    const eq = one.startsWith(REST) ? one.indexOf("=") : -1
    const said = eq > 0 ? one.slice(0, eq) : one
    const inline = eq > 0 ? one.slice(eq + 1) : undefined
    if (VALUED.includes(said)) {
      const value = inline ?? argv[at + 1]
      if (value === undefined) return `\`${said}\` was said with nothing after it`
      if (inline === undefined) at += 1
      const key = canonical(said)
      const held = named[key]
      if (held !== undefined && (held !== value || spelled[key] === said)) {
        return `\`${key}\` was said more than once`
      }
      named[key] = value
      spelled[key] = said
      continue
    }
    if (said === JSON_SAID) {
      if (inline !== undefined) return `\`${JSON_SAID}\` takes nothing after it`
      json = true
      continue
    }
    if (one.startsWith(REST)) return `\`${said}\` is nothing \`akasha music-search\` takes`
    loose.push(one)
  }
  return { query: loose[0], artist: named[ARTIST], limitSaid: named[LIMIT], json }
}

function countIn(said: string): number | string {
  const count = Number(said)
  if (!Number.isInteger(count) || count < 0) {
    return `${LIMIT} must be a non-negative integer, got: ${said}`
  }
  return count
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

export async function searchWith(find: Finding, argv: readonly string[]): Promise<Answer> {
  const read = toldIn(argv)
  if (typeof read === "string") return refused(read, INPUT)
  const query = read.query
  if (query === undefined || query === "") {
    return refused("supply a track query to search for", INPUT)
  }
  const limit = read.limitSaid === undefined ? DEFAULT_LIMIT : countIn(read.limitSaid)
  if (typeof limit === "string") return refused(limit, INPUT)
  const artist = read.artist
  const wide = artist !== undefined && artist !== ""
  const fetchLimit = wide ? MAX_FETCH : Math.min(limit, MAX_FETCH)
  const result = await find({ q: query, types: ["track"], limit: fetchLimit })
  const candidates = selectCandidates(result.tracks?.items ?? [], artist, limit)
  const envelope: SearchEnvelope = { query, artist: artist ?? null, candidates }
  const report = read.json ? [JSON.stringify(envelope)] : linesOf(envelope)
  return { report, refusals: [], code: 0 }
}

export function musicSearch(argv: readonly string[] = []): Promise<Answer> {
  return searchWith(search, argv)
}
