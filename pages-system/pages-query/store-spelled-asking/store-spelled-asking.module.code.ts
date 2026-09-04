import {
  type Asked,
  askComposed as askComposedThere,
  type ComposedQuery,
} from "../store-page-asking/store-page-asking.module.code.ts"
import type { Fetcher, Sleeper } from "../store-reaching/store-reaching.module.code.ts"
import { askedAsSpelled } from "../store-spelling/store-spelling.module.code.ts"

export async function askComposed(
  query: ComposedQuery,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  return askedAsSpelled(query, (asked) => askComposedThere(asked, fetcher, naps))
}
