import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import {
  type Calls,
  servicesIn,
  tmdbAnswer,
  tokenSaid,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"

export type Streamed = {
  readonly values: Readonly<Record<string, unknown>>
  readonly clears: readonly string[]
}

export const STREAMING_ON = "streamingOn"

const TMDB = "tmdb"

const UNSTREAMED: Streamed = { values: {}, clears: [] }

export function streamedFrom(
  said: unknown,
  identities: readonly Row[],
  was: readonly string[],
  today: string
): Streamed {
  const services = servicesIn(said)
  const synced = identities.map((one) =>
    one.source === TMDB ? { ...one, lastSyncedAt: today } : one
  )
  const stated =
    JSON.stringify(synced) === JSON.stringify(identities) ? {} : { externalIdentity: synced }
  if (JSON.stringify(services) === JSON.stringify(was)) return { values: stated, clears: [] }
  if (services.length === 0) return { values: stated, clears: [STREAMING_ON] }
  return { values: { ...stated, [STREAMING_ON]: services }, clears: [] }
}

export async function streamedFor(
  kind: string,
  identities: readonly Row[],
  was: readonly string[],
  today: string,
  calls: Calls,
  token: string | null = tokenSaid()
): Promise<Streamed> {
  const tmdb = identities.find((one) => one.source === TMDB)?.externalId
  if (typeof tmdb !== "string" || token === null) return UNSTREAMED
  const path = `/${kind === movie.slug ? "movie" : "tv"}/${tmdb}/watch/providers`
  const said = await tmdbAnswer(calls, token, path)
  return said === null ? UNSTREAMED : streamedFrom(said, identities, was, today)
}
