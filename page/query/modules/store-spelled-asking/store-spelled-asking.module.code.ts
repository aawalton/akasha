import { askComposed as askComposedThere } from "akasha/page/query/modules/store-page-asking/store-page-asking.module.code.ts"
import type {
  Asked,
  ComposedQuery,
} from "akasha/page/query/modules/store-questioning/store-questioning.module.code.ts"
import type {
  Fetcher,
  Sleeper,
} from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { askedAsSpelled } from "akasha/page/query/modules/store-spelling/store-spelling.module.code.ts"

export async function askComposed(
  query: ComposedQuery,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Asked> {
  return askedAsSpelled(query, (asked) => askComposedThere(asked, fetcher, naps))
}
