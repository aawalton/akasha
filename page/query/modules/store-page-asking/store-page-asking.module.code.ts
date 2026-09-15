import {
  type Asked,
  type ComposedQuery,
  askComposed as composedAnswer,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import {
  type Fetcher,
  pagesFetcher,
  type Sleeper,
  sleep,
} from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"

export async function askComposed(
  query: ComposedQuery,
  fetcher: Fetcher = pagesFetcher(),
  naps: Sleeper = sleep
): Promise<Asked> {
  return composedAnswer(query, fetcher, naps)
}
