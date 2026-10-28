import { movie } from "akasha/alan/collection/watching/movie/movie.page-type.ts"
import {
  NO_SERVICES,
  relatingBy,
  type Services,
  servicesKnown,
} from "akasha/command/pages/watching/modules/service-relating/service-relating.module.code.ts"
import {
  type Calls,
  servicesIn,
  tmdbAnswer,
  tokenSaid,
} from "akasha/command/pages/watching/modules/tmdb-reading/tmdb-reading.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

type Streamed = {
  readonly values: Readonly<Record<string, unknown>>
  readonly clears: readonly string[]
  readonly pages: readonly Naming[]
}

export const STREAMING_ON = "streamingOn"

const TMDB = "tmdb"

const UNSTREAMED: Streamed = { values: {}, clears: [], pages: [] }

export function streamedFrom(
  said: unknown,
  identities: readonly Row[],
  was: readonly string[],
  today: string,
  known: Services = NO_SERVICES
): Streamed {
  const relating = relatingBy(known)
  const services = relating.related(servicesIn(said))
  const synced = identities.map((one) =>
    one.source === TMDB ? { ...one, lastSyncedAt: today } : one
  )
  const stated =
    JSON.stringify(synced) === JSON.stringify(identities) ? {} : { externalIdentity: synced }
  if (JSON.stringify(services) === JSON.stringify(was)) {
    return { values: stated, clears: [], pages: [] }
  }
  if (services.length === 0) return { values: stated, clears: [STREAMING_ON], pages: [] }
  return { values: { ...stated, [STREAMING_ON]: services }, clears: [], pages: relating.fresh() }
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
  if (said === null) return UNSTREAMED
  const known = await servicesKnown(calls)
  return typeof known === "string" ? UNSTREAMED : streamedFrom(said, identities, was, today, known)
}
